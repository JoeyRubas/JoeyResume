using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Cta.Exercise.Core.Dtos;
using Cta.Exercise.Core.Repositories;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace Cta.Exercise.Application.Services
{
    public class GitHubService : IGitHubService
    {
        private readonly HttpClient _http;
        private readonly string _baseUrl = "https://api.github.com";
        private readonly string _username;
        private readonly string _token;
        private readonly IMemoryCache _cache;
        private readonly TimeSpan _cacheDuration = TimeSpan.FromHours(24);
        private readonly ILogger<GitHubService> _log;
        private readonly IBaseRepository _repository;
        private readonly HashSet<string> _myEmails = new HashSet<string>(StringComparer.OrdinalIgnoreCase);

        public string GetUsername() => _username;

        public GitHubService(IConfiguration cfg, IMemoryCache memoryCache, IBaseRepository repository, ILogger<GitHubService> logger = null)
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

            // Load verified emails for strict fallback matching (requires user:email scope)
            try { LoadOwnEmails().GetAwaiter().GetResult(); } catch { /* non-fatal */ }

            // Warm cache (non-blocking if already fresh)
            try { PreloadLanguageStats().GetAwaiter().GetResult(); } catch { /* ignore */ }
        }

        private record CommitAgg(string Date, int Additions, int Deletions);

        public async Task<IEnumerable<GitHubLanguageStatsDto>> GetLanguageStats(string languageName, string gitHubAlias = null)
        {
            var keyLang = string.IsNullOrWhiteSpace(gitHubAlias) ? languageName : gitHubAlias;
            var cacheKey = $"github_language_stats_{keyLang}";

            if (_cache.TryGetValue(cacheKey, out IEnumerable<GitHubLanguageStatsDto> cached))
            {
                // Opportunistic refresh if ~stale
                if (_cache.TryGetValue($"{cacheKey}_last_updated", out DateTime last) &&
                    DateTime.UtcNow - last > TimeSpan.FromHours(23) &&
                    !_cache.TryGetValue($"{cacheKey}_refreshing", out _))
                {
                    _ = Task.Run(async () =>
                    {
                        try
                        {
                            _cache.Set($"{cacheKey}_refreshing", true, TimeSpan.FromMinutes(5));
                            await PreloadLanguageStats();
                        }
                        catch (Exception ex) { _log?.LogError(ex, "Background refresh failed"); }
                        finally { _cache.Remove($"{cacheKey}_refreshing"); }
                    });
                }
                return cached;
            }

            await PreloadLanguageStats();
            return _cache.TryGetValue(cacheKey, out cached) ? cached : Enumerable.Empty<GitHubLanguageStatsDto>();
        }

        private async Task PreloadLanguageStats()
        {
            var skills = _repository.GetByType(Cta.Exercise.Core.Enums.BaseType.Skill)
                .OfType<Cta.Exercise.Core.Entities.SkillEntity>()
                .Where(s => s.CanTrackInGitHub)
                .ToList();
            if (!skills.Any()) return;

            // Early exit if we loaded recently
            var firstLang = skills[0].GitHubAlias ?? skills[0].Name;
            if (_cache.TryGetValue($"github_language_stats_{firstLang}_last_updated", out DateTime lastUpdated) &&
                (DateTime.UtcNow - lastUpdated) < TimeSpan.FromHours(20))
                return;

            var skillNameMap = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase);
            foreach (var s in skills)
                skillNameMap[s.GitHubAlias ?? s.Name] = s.Name;

            // 1) Get ALL repos (paginate; no silent ceiling)
            var repos = await GetAllUserRepos(_username);

            // 2) Build per-repo language weights once
            var repoLangWeights = new Dictionary<string, Dictionary<string, double>>(StringComparer.OrdinalIgnoreCase);
            foreach (var r in repos)
            {
                if (!r.TryGetProperty("full_name", out var fn) || fn.ValueKind != JsonValueKind.String) continue;
                var fullName = fn.GetString();
                var weights = await GetRepositoryLanguages(fullName);
                repoLangWeights[fullName] = weights;
            }

            // 3) For each repo, stream commits from HEAD of default branch (NO since cutoff)
            var perLangDaily = new Dictionary<string, Dictionary<string, CommitAgg>>(StringComparer.OrdinalIgnoreCase);
            foreach (var langKey in skillNameMap.Keys)
                perLangDaily[langKey] = new Dictionary<string, CommitAgg>(StringComparer.Ordinal);

            foreach (var repo in repos)
            {
                if (!repo.TryGetProperty("full_name", out var fullNameProp)) continue;
                var fullName = fullNameProp.GetString();
                if (string.IsNullOrEmpty(fullName)) continue;

                if (!repoLangWeights.TryGetValue(fullName, out var weights) || weights.Count == 0) continue;
                if (!weights.Keys.Any(skillNameMap.ContainsKey)) continue;

                await foreach (var commit in GetDefaultBranchCommitStats_All(fullName))
                {
                    // apportion this commit by language weights
                    foreach (var lang in weights.Keys.Where(skillNameMap.ContainsKey))
                    {
                        var pct = weights[lang];
                        var add = (int)Math.Round(commit.Additions * pct);
                        var del = (int)Math.Round(commit.Deletions * pct);
                        if (add == 0 && del == 0) continue;

                        var bucket = perLangDaily[lang];
                        if (!bucket.TryGetValue(commit.Date, out var agg))
                            bucket[commit.Date] = new CommitAgg(commit.Date, add, del);
                        else
                            bucket[commit.Date] = agg with { Additions = agg.Additions + add, Deletions = agg.Deletions + del };
                    }
                }
            }

            // 4) Store cumulative series per language
            var opts = new MemoryCacheEntryOptions().SetAbsoluteExpiration(_cacheDuration);
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

                var cacheKey = $"github_language_stats_{lang}";
                _cache.Set(cacheKey, series, opts);
                _cache.Set($"{cacheKey}_last_updated", DateTime.UtcNow, opts);
            }
        }

        // --- Helpers ----------------------------------------------------------

        private async Task<List<JsonElement>> GetAllUserRepos(string user)
        {
            // Pull *all* repos (public + private if token allows), paginated
            // We intentionally do *not* rely on sort=updated or the first page only.
            var acc = new List<JsonElement>();
            var page = 1;
            // type=all includes forks; if you want only sources, switch to type=owner
            var endpoint = $"{_baseUrl}/users/{user}/repos?per_page=100&type=all&sort=created&direction=asc";

            while (true)
            {
                var resp = await _http.GetAsync($"{endpoint}&page={page}");
                if (!resp.IsSuccessStatusCode) break;

                using var doc = JsonDocument.Parse(await resp.Content.ReadAsStringAsync());
                var arr = doc.RootElement.EnumerateArray().Select(e => e.Clone()).ToList();
                if (arr.Count == 0) break;
                acc.AddRange(arr);

                // If less than 100, we reached the end
                if (arr.Count < 100) break;
                page++;
                await Task.Delay(50);
            }

            // Deduplicate by full_name
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
                foreach (var p in doc.RootElement.EnumerateObject()) total += p.Value.GetInt64();
                if (total == 0) return result;
                foreach (var p in doc.RootElement.EnumerateObject())
                    result[p.Name] = (double)p.Value.GetInt64() / total;
            }
            catch (Exception ex) { _log?.LogError(ex, $"languages failed for {fullName}"); }
            return result;
        }

        private async IAsyncEnumerable<CommitAgg> GetDefaultBranchCommitStats_All(string fullName)
        {
            if (string.IsNullOrWhiteSpace(_token))
                yield break;

            // GraphQL: page through *entire* default branch history (no since cutoff)
            // We filter to your commits client-side with strict checks.
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

            string cursor = null;
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
                // Safety valve: extremely large histories—stop after ~50k commits scanned.
                if (pageCount > 500) yield break;

                await Task.Delay(100); // be gentle to rate limits
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
            // Strict matching: only exact login OR verified email (no substrings or name heuristics)
            string authorLogin = GetJsonPropertyOrEmpty(node, "author", "user", "login");
            if (!string.IsNullOrEmpty(authorLogin) && authorLogin.Equals(_username, StringComparison.OrdinalIgnoreCase))
                return true;

            string committerLogin = GetJsonPropertyOrEmpty(node, "committer", "user", "login");
            if (!string.IsNullOrEmpty(committerLogin) && committerLogin.Equals(_username, StringComparison.OrdinalIgnoreCase))
                return true;

            if (_myEmails.Count > 0)
            {
                string authorEmail = GetJsonPropertyOrEmpty(node, "author", "email");
                if (!string.IsNullOrEmpty(authorEmail) && _myEmails.Contains(authorEmail)) return true;

                string committerEmail = GetJsonPropertyOrEmpty(node, "committer", "email");
                if (!string.IsNullOrEmpty(committerEmail) && _myEmails.Contains(committerEmail)) return true;
            }

            return false;
        }

        // Load your verified emails for strict fallback identification
        private async Task LoadOwnEmails()
        {
            if (string.IsNullOrWhiteSpace(_token)) return;

            try
            {
                var resp = await _http.GetAsync($"{_baseUrl}/user/emails");
                if (!resp.IsSuccessStatusCode) return; // token may lack user:email scope; that's fine

                using var doc = JsonDocument.Parse(await resp.Content.ReadAsStringAsync());
                foreach (var e in doc.RootElement.EnumerateArray())
                {
                    if (e.TryGetProperty("email", out var ep) && ep.ValueKind == JsonValueKind.String)
                    {
                        var email = ep.GetString();
                        var verified = e.TryGetProperty("verified", out var vp) && vp.GetBoolean();
                        if (!string.IsNullOrEmpty(email) && verified)
                            _myEmails.Add(email);
                    }
                }
            }
            catch (Exception ex)
            {
                _log?.LogWarning(ex, "Could not load viewer emails (non-fatal). Add user:email scope for stricter matching.");
            }
        }

        // -------- JSON helpers (null-safe) --------
        private string GetJsonPropertyOrEmpty(JsonElement el, string name)
        {
            if (el.ValueKind != JsonValueKind.Object) return "";
            if (!el.TryGetProperty(name, out var v) || v.ValueKind == JsonValueKind.Null) return "";
            return v.ValueKind == JsonValueKind.String ? (v.GetString() ?? "") : "";
        }

        private string GetJsonPropertyOrEmpty(JsonElement el, string a, string b)
        {
            if (el.ValueKind != JsonValueKind.Object) return "";
            if (!el.TryGetProperty(a, out var v) || v.ValueKind != JsonValueKind.Object) return "";
            if (!v.TryGetProperty(b, out var w) || w.ValueKind == JsonValueKind.Null) return "";
            return w.ValueKind == JsonValueKind.String ? (w.GetString() ?? "") : "";
        }

        private string GetJsonPropertyOrEmpty(JsonElement el, string a, string b, string c)
        {
            if (el.ValueKind != JsonValueKind.Object) return "";
            if (!el.TryGetProperty(a, out var v) || v.ValueKind != JsonValueKind.Object) return "";
            if (!v.TryGetProperty(b, out var w) || w.ValueKind != JsonValueKind.Object) return "";
            if (!w.TryGetProperty(c, out var x) || x.ValueKind == JsonValueKind.Null) return "";
            return x.ValueKind == JsonValueKind.String ? (x.GetString() ?? "") : "";
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
    }
}
