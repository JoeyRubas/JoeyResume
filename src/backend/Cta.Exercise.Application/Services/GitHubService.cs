using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using Cta.Exercise.Core.Dtos;
using Cta.Exercise.Core.Repositories;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace Cta.Exercise.Application.Services
{
    public class GitHubService : IGitHubService, IDisposable
    {
        private readonly HttpClient _http;
        private readonly string _baseUrl = "https://api.github.com";
        private readonly string _username;
        private readonly string _token;
        private readonly IMemoryCache _cache;
        private readonly TimeSpan _refreshInterval = TimeSpan.FromHours(24);
        private readonly ILogger<GitHubService>? _log;
        private readonly IBaseRepository _repository;
        private readonly HashSet<string> _myEmails = new HashSet<string>(StringComparer.OrdinalIgnoreCase);
        private readonly SemaphoreSlim _refreshGate = new SemaphoreSlim(1, 1);
        private readonly Timer _refreshTimer;
        private const string LastUpdatedCacheKey = "github_language_stats_last_updated";
        private bool _disposed;

        public string GetUsername() => _username;

        public GitHubService(IConfiguration cfg, IMemoryCache memoryCache, IBaseRepository repository, ILogger<GitHubService>? logger = null)
        {
            _http = new HttpClient();
            _http.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/vnd.github.v3+json"));
            _http.DefaultRequestHeaders.UserAgent.Add(new ProductInfoHeaderValue("JoeyResume", "1.0"));

            _username = cfg["GitHub:Username"] ?? "JoeyRubas";
            _token = cfg["GitHub:Token"];
            if (!string.IsNullOrWhiteSpace(_token))
                _http.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("token", _token);

            _repository = repository;
            _cache = memoryCache;
            _log = logger;

            try { LoadOwnEmails().GetAwaiter().GetResult(); } catch {  }
            try { PreloadLanguageStats().GetAwaiter().GetResult(); } catch {  }

            _refreshTimer = new Timer(OnRefreshTimer, null, _refreshInterval, _refreshInterval);
        }

        private record CommitAgg(string Date, int Additions, int Deletions);

        public async Task<IEnumerable<GitHubLanguageStatsDto>> GetLanguageStats(string languageName, string? gitHubAlias = null)
        {
            var key = string.IsNullOrWhiteSpace(gitHubAlias) ? languageName : gitHubAlias;
            var cacheKey = $"github_language_stats_{key}";

            if (_cache.Get(cacheKey) is IEnumerable<GitHubLanguageStatsDto> cached)
            {
                if (IsRefreshDue()) _ = RefreshLanguageStatsAsync();
                return cached;
            }

            await RefreshLanguageStatsAsync(force: true);
            return _cache.Get(cacheKey) as IEnumerable<GitHubLanguageStatsDto> ?? Enumerable.Empty<GitHubLanguageStatsDto>();
        }

        private bool IsRefreshDue()
        {
            return !_cache.TryGetValue(LastUpdatedCacheKey, out DateTime last) || DateTime.UtcNow - last >= _refreshInterval;
        }

        private async Task RefreshLanguageStatsAsync(bool force = false)
        {
            try
            {
                if (!force && !IsRefreshDue())
                    return;

                if (!await _refreshGate.WaitAsync(0))
                {
                    _log?.LogInformation("GitHub refresh already running.");
                    return;
                }

                _log?.LogInformation("GitHub refresh started.");
                try
                {
                    await PreloadLanguageStats();
                }
                finally
                {
                    _refreshGate.Release();
                }
            }
            catch (Exception ex)
            {
                _log?.LogError(ex, "GitHub refresh failed");
            }
        }

        private async Task PreloadLanguageStats()
        {
            if (string.IsNullOrWhiteSpace(_token))
            {
                _log?.LogInformation("GitHub token missing; skipping preload.");
                _cache.Set(LastUpdatedCacheKey, DateTime.UtcNow);
                return;
            }

            _log?.LogInformation("Preloading GitHub language stats.");

            var skills = _repository.GetByType(Core.Enums.BaseType.Skill)
                .OfType<Core.Entities.SkillEntity>()
                .Where(s => s.CanTrackInGitHub)
                .ToList();
            _log?.LogInformation($"Loaded {skills.Count} trackable skills.");
            if (!skills.Any())
            {
                _log?.LogInformation("No GitHub-trackable skills configured.");
                _cache.Set(LastUpdatedCacheKey, DateTime.UtcNow);
                return;
            }

            var skillNameMap = skills.GroupBy(s => s.GitHubAlias ?? s.Name, StringComparer.OrdinalIgnoreCase)
                .ToDictionary(g => g.Key, g => g.First().Name, StringComparer.OrdinalIgnoreCase);
            var repos = await GetAllUserRepos(_username);
            _log?.LogInformation($"Fetched {repos.Count} repositories.");

            var repoLangWeights = new Dictionary<string, Dictionary<string, double>>(StringComparer.OrdinalIgnoreCase);
            _log?.LogInformation("Fetching language weights for repositories.");
            foreach (var repo in repos)
            {
                if (!repo.TryGetProperty("full_name", out var fullNameProp)) continue;
                var fullName = fullNameProp.GetString();
                if (string.IsNullOrEmpty(fullName)) continue;
                repoLangWeights[fullName] = await GetRepositoryLanguages(fullName);
            }
            _log?.LogInformation("Language weights fetched for all repos.");

            var perLangDaily = skillNameMap.Keys.ToDictionary(k => k, _ => new Dictionary<string, CommitAgg>(StringComparer.Ordinal));
            var processedCommits = 0;

            _log?.LogInformation("Processing commits from repositories.");
            foreach (var repo in repos)
            {
                if (!repo.TryGetProperty("full_name", out var fullNameProp)) continue;
                var fullName = fullNameProp.GetString();
                if (string.IsNullOrEmpty(fullName)) continue;

                if (!repoLangWeights.TryGetValue(fullName, out var weights) || weights.Count == 0) continue;
                var interested = weights.Keys.Where(skillNameMap.ContainsKey).ToList();
                if (interested.Count == 0) continue;

                await foreach (var commit in GetDefaultBranchCommitStats_All(fullName))
                {
                    var contributed = false;
                    foreach (var lang in interested)
                    {
                        var pct = weights[lang];
                        var add = (int)Math.Round(commit.Additions * pct);
                        var del = (int)Math.Round(commit.Deletions * pct);
                        if (add == 0 && del == 0) continue;

                        contributed = true;
                        var bucket = perLangDaily[lang];
                        if (!bucket.TryGetValue(commit.Date, out var agg))
                            bucket[commit.Date] = new CommitAgg(commit.Date, add, del);
                        else
                            bucket[commit.Date] = agg with { Additions = agg.Additions + add, Deletions = agg.Deletions + del };
                    }

                    if (contributed) processedCommits++;
                }
            }
            _log?.LogInformation($"Processed {processedCommits} commits.");

            var languagesWithData = 0;

            _log?.LogInformation("Aggregating daily language statistics.");
            foreach (var lang in perLangDaily.Keys)
            {
                var series = perLangDaily[lang].Values
                    .OrderBy(c => DateTime.Parse(c.Date))
                    .Aggregate(new List<GitHubLanguageStatsDto>(), (list, c) =>
                    {
                        var prevAdd = list.Count > 0 ? list[^1].Additions : 0;
                        var prevDel = list.Count > 0 ? list[^1].Deletions : 0;
                        list.Add(new GitHubLanguageStatsDto { Date = c.Date, Additions = prevAdd + c.Additions, Deletions = prevDel + c.Deletions });
                        return list;
                    });

                if (series.Count > 0) languagesWithData++;
                _cache.Set($"github_language_stats_{lang}", series);
            }
            _log?.LogInformation($"Aggregated stats for {languagesWithData} languages.");

            _log?.LogInformation("Caching aggregated statistics.");
            _cache.Set(LastUpdatedCacheKey, DateTime.UtcNow);
            _log?.LogInformation($"GitHub stats cached. skills={skills.Count}, repos={repos.Count}, languages={languagesWithData}, commits={processedCommits}.");
        }

        private async Task<List<JsonElement>> GetAllUserRepos(string user)
        {
            var acc = new List<JsonElement>();
            var page = 1;
            var endpoint = $"{_baseUrl}/users/{user}/repos?per_page=100&type=all&sort=created&direction=asc";

            while (true)
            {
                var resp = await _http.GetAsync($"{endpoint}&page={page}");
                if (!resp.IsSuccessStatusCode) break;
                using var doc = JsonDocument.Parse(await resp.Content.ReadAsStringAsync());
                var arr = doc.RootElement.EnumerateArray().Select(e => e.Clone()).ToList();
                if (arr.Count == 0) break;
                acc.AddRange(arr);
                if (arr.Count < 100) break;
                page++;
                await Task.Delay(50);
            }

            return acc.GroupBy(r => r.GetProperty("full_name").GetString())
                      .Select(g => g.First())
                      .ToList();
        }

        private async Task<Dictionary<string, double>> GetRepositoryLanguages(string fullName)
        {
            var result = new Dictionary<string, double>(StringComparer.OrdinalIgnoreCase);
            try
            {
                var resp = await _http.GetAsync($"{_baseUrl}/repos/{fullName}/languages");
                if (!resp.IsSuccessStatusCode) return result;

                using var doc = JsonDocument.Parse(await resp.Content.ReadAsStringAsync());
                long total = 0;
                var langs = new Dictionary<string, long>();
                foreach (var p in doc.RootElement.EnumerateObject())
                    langs[p.Name] = (total += p.Value.GetInt64());
                if (total == 0) return result;
                foreach (var kv in langs)
                    result[kv.Key] = (double)kv.Value / total;
            }
            catch (Exception ex) { _log?.LogError(ex, $"languages failed for {fullName}"); }
            return result;
        }

        private async IAsyncEnumerable<CommitAgg> GetDefaultBranchCommitStats_All(string fullName)
        {
            if (string.IsNullOrWhiteSpace(_token))
                yield break;

            var parts = fullName.Split('/');
            var owner = parts[0];
            var name = parts[1];

            const string query = @"
query($owner:String!, $name:String!, $first:Int!, $after:String) {
  repository(owner:$owner, name:$name) {
    defaultBranchRef {
      target {
        ... on Commit {
          history(first:$first, after:$after) {
            pageInfo { hasNextPage endCursor }
            nodes {
              committedDate
              additions
              deletions
              author { user { login } email name }
              committer { user { login } email name }
            }
          }
        }
      }
    }
  }
}";

            string? cursor = null;
            int pageCount = 0;

            while (true)
            {
                var payload = new
                {
                    query,
                    variables = new { owner, name, first = 100, after = cursor }
                };

                using var req = new HttpRequestMessage(HttpMethod.Post, "https://api.github.com/graphql")
                {
                    Content = new StringContent(JsonSerializer.Serialize(payload), Encoding.UTF8, "application/json")
                };
                var resp = await _http.SendAsync(req);
                if (!resp.IsSuccessStatusCode) yield break;

                using var doc = JsonDocument.Parse(await resp.Content.ReadAsStringAsync());
                if (!TryHistory(doc.RootElement, out var history)) yield break;

                if (history.TryGetProperty("nodes", out var nodes))
                {
                    foreach (var node in nodes.EnumerateArray())
                    {
                        if (!IsUserCommit(node)) continue;

                        var dtStr = GetPathStringOrEmpty(node, "committedDate");
                        if (string.IsNullOrEmpty(dtStr)) continue;
                        var dateOnly = dtStr.Split('T')[0];

                        var adds = node.TryGetProperty("additions", out var a) ? Math.Min(a.GetInt32(), 5000) : 0;
                        var dels = node.TryGetProperty("deletions", out var d) ? Math.Min(d.GetInt32(), 5000) : 0;
                        if (adds == 0 && dels == 0) continue;

                        yield return new CommitAgg(dateOnly, adds, dels);
                    }
                }

                if (history.TryGetProperty("pageInfo", out var pi))
                {
                    var hasNext = pi.GetProperty("hasNextPage").GetBoolean();
                    cursor = hasNext ? pi.GetProperty("endCursor").GetString() : null;
                    if (!hasNext) yield break;
                }
                else yield break;

                pageCount++;
                if (pageCount > 500) yield break;

                await Task.Delay(100);
            }

            static bool TryHistory(JsonElement root, out JsonElement history)
            {
                history = default;
                return root.TryGetProperty("data", out var data) &&
                       data.TryGetProperty("repository", out var repo) &&
                       repo.TryGetProperty("defaultBranchRef", out var dbr) &&
                       dbr.ValueKind != JsonValueKind.Null &&
                       dbr.TryGetProperty("target", out var target) &&
                       target.TryGetProperty("history", out history);
            }
        }

        private bool IsUserCommit(JsonElement node)
        {
            var authorLogin = GetPathStringOrEmpty(node, "author", "user", "login");
            var committerLogin = GetPathStringOrEmpty(node, "committer", "user", "login");
            var authorEmail = GetPathStringOrEmpty(node, "author", "email");
            var committerEmail = GetPathStringOrEmpty(node, "committer", "email");
            return (!string.IsNullOrEmpty(authorLogin) && authorLogin.Equals(_username, StringComparison.OrdinalIgnoreCase)) ||
                   (!string.IsNullOrEmpty(committerLogin) && committerLogin.Equals(_username, StringComparison.OrdinalIgnoreCase)) ||
                   (_myEmails.Count > 0 && ((!string.IsNullOrEmpty(authorEmail) && _myEmails.Contains(authorEmail)) ||
                   (!string.IsNullOrEmpty(committerEmail) && _myEmails.Contains(committerEmail))));
        }

        private async Task LoadOwnEmails()
        {
            if (string.IsNullOrWhiteSpace(_token)) return;

            try
            {
                var resp = await _http.GetAsync($"{_baseUrl}/user/emails");
                if (!resp.IsSuccessStatusCode) return;

                using var doc = JsonDocument.Parse(await resp.Content.ReadAsStringAsync());
                foreach (var e in doc.RootElement.EnumerateArray())
                    if (e.TryGetProperty("email", out var ep) && ep.ValueKind == JsonValueKind.String &&
                        e.TryGetProperty("verified", out var vp) && vp.GetBoolean() &&
                        !string.IsNullOrEmpty(ep.GetString()))
                        _myEmails.Add(ep.GetString()!);
            }
            catch (Exception ex)
            {
                _log?.LogWarning(ex, "Could not load viewer emails (non-fatal). Add user:email scope for stricter matching.");
            }
        }

        private string GetPathStringOrEmpty(JsonElement el, params string[] path)
        {
            var cur = el;
            foreach (var segment in path)
            {
                if (cur.ValueKind != JsonValueKind.Object) return "";
                if (!cur.TryGetProperty(segment, out cur)) return "";
                if (cur.ValueKind == JsonValueKind.Null) return "";
            }
            return cur.ValueKind == JsonValueKind.String ? (cur.GetString() ?? "") : "";
        }

        private void OnRefreshTimer(object? state)
        {
            _ = RefreshLanguageStatsAsync(force: true);
        }

        public void Dispose()
        {
            if (_disposed) return;
            _disposed = true;
            _refreshTimer?.Dispose();
            _http.Dispose();
        }
    }
}
