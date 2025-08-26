using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Threading;
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
        private readonly HttpClient _httpClient;
        private readonly string _baseUrl = "https://api.github.com";
        private readonly string _username;
        private readonly string _token;
        private readonly IMemoryCache _cache;
        private readonly TimeSpan _cacheDuration = TimeSpan.FromHours(24);
        private readonly ILogger<GitHubService> _logger;
        private readonly IBaseRepository _repository;
        
        public string GetUsername() => _username;
        
        public GitHubService(IConfiguration configuration, IMemoryCache memoryCache, 
            IBaseRepository repository, ILogger<GitHubService> logger = null)
        {
            _httpClient = new HttpClient();
            _httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/vnd.github.v3+json"));
            _httpClient.DefaultRequestHeaders.UserAgent.Add(new ProductInfoHeaderValue("JoeyResume", "1.0"));
            
            _username = configuration["GitHub:Username"] ?? "JoeyRubas";
            _token = configuration["GitHub:Token"];
            _repository = repository;
            _cache = memoryCache;
            _logger = logger;
            
            if (!string.IsNullOrEmpty(_token))
                _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("token", _token);
            
            PreloadLanguageStats().GetAwaiter().GetResult();
        }
        
        private async Task PreloadLanguageStats()
        {
            try
            {
                var skills = _repository.GetByType(Core.Enums.BaseType.Skill)
                    .OfType<Core.Entities.SkillEntity>()
                    .Where(s => s.CanTrackInGitHub)
                    .ToList();
                
                if (!skills.Any()) return;
                
                var firstLang = !string.IsNullOrEmpty(skills[0].GitHubAlias) ? skills[0].GitHubAlias : skills[0].Name;
                if (_cache.TryGetValue($"github_language_stats_{firstLang}_last_updated", out DateTime lastUpdated) && 
                    (DateTime.UtcNow - lastUpdated) < TimeSpan.FromHours(20))
                {
                    return;
                }
                
                var skillsMap = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase);
                var rawCommitsBySkill = new Dictionary<string, Dictionary<string, CommitStat>>(StringComparer.OrdinalIgnoreCase);
                
                foreach (var skill in skills)
                {
                    string langName = !string.IsNullOrEmpty(skill.GitHubAlias) ? skill.GitHubAlias : skill.Name;
                    skillsMap[langName] = skill.Name;
                    rawCommitsBySkill[langName] = new Dictionary<string, CommitStat>();
                }
                
                var repos = await GetUserRepositories();
                
                foreach (var repo in repos)
                {
                    string repoName = repo.GetProperty("name").GetString();
                    string repoFullName = repo.GetProperty("full_name").GetString();
                    var repoLanguages = await GetRepositoryLanguages(repoFullName);
                    bool isFork = repo.TryGetProperty("fork", out var forkProp) && forkProp.GetBoolean();
                    
                    if (!repoLanguages.Keys.Any(l => skillsMap.ContainsKey(l)))
                    {
                        continue;
                    }
                    
                    var repoCommits = await GetCommitStatsWithGraphQL(repoName, repo);
                    if (!repoCommits.Any()) continue;
                    
                    foreach (var lang in repoLanguages.Keys.Where(l => skillsMap.ContainsKey(l)))
                    {
                        double langPct = repoLanguages[lang];
                        var skillCommits = rawCommitsBySkill[lang];
                        
                        foreach (var commit in repoCommits)
                        {
                            int additions = (int)Math.Round(commit.Additions * langPct);
                            int deletions = (int)Math.Round(commit.Deletions * langPct);
                            
                            if (additions == 0 && deletions == 0) continue;
                            
                            if (!skillCommits.TryGetValue(commit.Date, out var existingStat))
                            {
                                skillCommits[commit.Date] = new CommitStat { 
                                    Date = commit.Date, 
                                    Additions = additions, 
                                    Deletions = deletions 
                                };
                            }
                            else
                            {
                                existingStat.Additions += additions;
                                existingStat.Deletions += deletions;
                            }
                        }
                    }
                }
                
                var options = new MemoryCacheEntryOptions().SetAbsoluteExpiration(_cacheDuration);
                foreach (var lang in rawCommitsBySkill.Keys)
                {
                    var commits = rawCommitsBySkill[lang];
                    if (commits.Count == 0) 
                    {
                        continue;
                    }
                    
                    var cumulativeStats = CalculateCumulativeStats(commits.Values);
                    
                    string cacheKey = $"github_language_stats_{lang}";
                    _cache.Set(cacheKey, cumulativeStats, options);
                    _cache.Set($"{cacheKey}_last_updated", DateTime.UtcNow, options);
                }
            }
            catch (Exception ex)
            {
                _logger?.LogError(ex, "Error during GitHub stats preload");
            }
        }
        
        private class CommitStat
        {
            public string Date { get; set; }
            public int Additions { get; set; }
            public int Deletions { get; set; }
        }

        public async Task<IEnumerable<GitHubLanguageStatsDto>> GetLanguageStats(string languageName, string gitHubAlias = null)
        {
            string effectiveName = !string.IsNullOrEmpty(gitHubAlias) ? gitHubAlias : languageName;
            string cacheKey = $"github_language_stats_{effectiveName}";
            
            if (_cache.TryGetValue(cacheKey, out IEnumerable<GitHubLanguageStatsDto> stats))
            {
                if (_cache.TryGetValue($"{cacheKey}_last_updated", out DateTime lastUpdated) && 
                    DateTime.UtcNow - lastUpdated > TimeSpan.FromHours(23) && 
                    !_cache.TryGetValue($"{cacheKey}_refreshing", out _))
                {
                    _ = Task.Run(async () => {
                        try {
                            _cache.Set($"{cacheKey}_refreshing", true, TimeSpan.FromMinutes(5));
                            await PreloadLanguageStats();
                        }
                        catch (Exception ex) {
                            _logger?.LogError(ex, $"Failed to refresh stats for {effectiveName}");
                        }
                        finally {
                            _cache.Remove($"{cacheKey}_refreshing");
                        }
                    });
                }
                return stats;
            }
            
            await PreloadLanguageStats();
            return _cache.TryGetValue(cacheKey, out stats) ? stats : Enumerable.Empty<GitHubLanguageStatsDto>();
        }
        
        private async Task<IEnumerable<JsonElement>> GetUserRepositories()
        {
            var allRepos = new List<JsonElement>();
            
            var ownedResponse = await _httpClient.GetAsync($"{_baseUrl}/users/{_username}/repos?per_page=100&sort=updated");
            
            if (ownedResponse.IsSuccessStatusCode)
            {
                using var document = JsonDocument.Parse(
                    await ownedResponse.Content.ReadAsStringAsync(), 
                    new JsonDocumentOptions { AllowTrailingCommas = true }
                );
                
                allRepos.AddRange(document.RootElement.EnumerateArray().Select(x => x.Clone()));
                _logger?.LogInformation($"Found {document.RootElement.GetArrayLength()} owned repos");
            }
            
            if (!string.IsNullOrEmpty(_token))
            {
                var contributedResponse = await _httpClient.GetAsync($"{_baseUrl}/user/repos?per_page=100&affiliation=collaborator,organization_member");
                
                if (contributedResponse.IsSuccessStatusCode)
                {
                    using var document = JsonDocument.Parse(
                        await contributedResponse.Content.ReadAsStringAsync(),
                        new JsonDocumentOptions { AllowTrailingCommas = true }
                    );
                    
                    allRepos.AddRange(document.RootElement.EnumerateArray().Select(x => x.Clone()));
                _logger?.LogInformation($"Found {document.RootElement.GetArrayLength()} repos as collaborator/member");
                }
                
                // 3. Get starred repositories which may include forks you've contributed to
                var starredResponse = await _httpClient.GetAsync($"{_baseUrl}/users/{_username}/starred?per_page=100");
                
                if (starredResponse.IsSuccessStatusCode)
                {
                    using var document = JsonDocument.Parse(
                        await starredResponse.Content.ReadAsStringAsync(),
                        new JsonDocumentOptions { AllowTrailingCommas = true }
                    );
                    
                    allRepos.AddRange(document.RootElement.EnumerateArray().Select(x => x.Clone()));
                    _logger?.LogInformation($"Found {document.RootElement.GetArrayLength()} starred repos");
                }
                
                // 4. Search for repositories with your username in the name or description
                var searchResponse = await _httpClient.GetAsync($"{_baseUrl}/search/repositories?q=user:{_username}+fork:true&per_page=100");
                
                if (searchResponse.IsSuccessStatusCode)
                {
                    using var document = JsonDocument.Parse(
                        await searchResponse.Content.ReadAsStringAsync(),
                        new JsonDocumentOptions { AllowTrailingCommas = true }
                    );
                    
                    if (document.RootElement.TryGetProperty("items", out var items))
                    {
                        allRepos.AddRange(items.EnumerateArray().Select(x => x.Clone()));
                        _logger?.LogInformation($"Found {items.GetArrayLength()} repos via search");
                    }
                }
            }
            
            return allRepos
                .GroupBy(repo => repo.GetProperty("full_name").GetString())
                .Select(group => group.First())
                .ToList();
        }

        private async Task<IEnumerable<GitHubLanguageStatsDto>> GetCommitStatsWithGraphQL(string repoName, JsonElement repoInfo)
        {
            if (string.IsNullOrEmpty(_token))
                return Enumerable.Empty<GitHubLanguageStatsDto>();
            
            string repoOwner = _username;
            string repoFullName = $"{_username}/{repoName}";
            
            if (repoInfo.TryGetProperty("full_name", out var fullNameProp))
            {
                repoFullName = fullNameProp.GetString();
                
                var parts = repoFullName.Split('/');
                if (parts.Length == 2)
                {
                    repoOwner = parts[0];
                    repoName = parts[1];
                }
            }
            
            DateTime repoCreationDate = DateTime.MinValue;
            if (repoInfo.TryGetProperty("created_at", out var createdAtProp))
            {
                DateTime.TryParse(createdAtProp.GetString(), out repoCreationDate);
            }
            else
            {
                var repoResponse = await _httpClient.GetAsync($"{_baseUrl}/repos/{repoFullName}");
                if (repoResponse.IsSuccessStatusCode)
                {
                    using var doc = JsonDocument.Parse(await repoResponse.Content.ReadAsStringAsync());
                    if (doc.RootElement.TryGetProperty("created_at", out var dateElement))
                        DateTime.TryParse(dateElement.GetString(), out repoCreationDate);
                }
            }
            
            string query = @"
              query($owner: String!, $name: String!, $first: Int!, $after: String, $since: GitTimestamp) {
                repository(owner: $owner, name: $name) {
                  defaultBranchRef {
                    target {
                      ... on Commit {
                        history(first: $first, after: $after, since: $since) {
                          pageInfo { hasNextPage endCursor }
                          nodes {
                            committedDate additions deletions
                            author { 
                              user { login } 
                              email
                              name
                            }
                            committer { 
                              user { login } 
                              email
                              name
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }";

            var commits = new List<GitHubLanguageStatsDto>();
            
            try
            {
                string cursor = null;
                bool hasMore = true;
                int batchSize = 100;
                
                DateTime sinceDate = DateTime.UtcNow.AddYears(-5);
                if (repoCreationDate != DateTime.MinValue && repoCreationDate > sinceDate)
                    sinceDate = repoCreationDate;
                    
                string formattedSinceDate = sinceDate.ToString("yyyy-MM-ddTHH:mm:ssZ");
                
                int totalBatchCommits = 0;
                int userBatchCommits = 0;
                
                for (int batch = 0; hasMore && batch < 30 && commits.Count < 3000; batch++)
                {
                    int userCommitCount = 0;
                    int totalCommits = 0;
                    
                    var response = await _httpClient.SendAsync(new HttpRequestMessage(HttpMethod.Post, "https://api.github.com/graphql") {
                        Content = new StringContent(
                            JsonSerializer.Serialize(new { 
                                query, 
                                variables = new { 
                                    owner = repoOwner, 
                                    name = repoName, 
                                    first = batchSize, 
                                    after = cursor,
                                    since = formattedSinceDate 
                                } 
                            }), 
                            Encoding.UTF8, 
                            "application/json")
                    });
                    
                    if (!response.IsSuccessStatusCode) break;
                    
                    using var doc = JsonDocument.Parse(await response.Content.ReadAsStringAsync());
                    if (!TryGetHistoryElement(doc.RootElement, out var history)) break;
                    
                    if (history.TryGetProperty("pageInfo", out var pageInfo))
                    {
                        hasMore = pageInfo.GetProperty("hasNextPage").GetBoolean();
                        cursor = hasMore ? pageInfo.GetProperty("endCursor").GetString() : null;
                    }
                    else hasMore = false;
                    
                    if (history.TryGetProperty("nodes", out var nodes))
                    {                        
                        foreach (var node in nodes.EnumerateArray())
                        {
                            totalCommits++;
                            totalBatchCommits++;
                            
                            if (!IsUserCommit(node)) continue;
                            
                            userCommitCount++;
                            userBatchCommits++;
                            
                            string fullDate = node.GetProperty("committedDate").GetString();
                            if (string.IsNullOrEmpty(fullDate)) continue;
                            
                            string date = fullDate.Split('T')[0];
                            if (DateTime.TryParse(date, out DateTime commitDate) && 
                                repoCreationDate != DateTime.MinValue && 
                                commitDate < repoCreationDate.AddDays(-1))
                                continue;
                            
                            int additions = node.TryGetProperty("additions", out var addProp) ? 
                                Math.Min(addProp.GetInt32(), 1500) : 0;
                                
                            int deletions = node.TryGetProperty("deletions", out var delProp) ? 
                                Math.Min(delProp.GetInt32(), 1500) : 0;
                            
                            if (additions == 0 && deletions == 0) continue;
                            
                            commits.Add(new GitHubLanguageStatsDto {
                                Date = date,
                                Additions = additions,
                                Deletions = deletions
                            });
                        }
                    }
                    
                    if (hasMore) await Task.Delay(300);
                }
                return commits;
            }
            catch
            {
                return Enumerable.Empty<GitHubLanguageStatsDto>();
            }
        }
        
        private bool TryGetHistoryElement(JsonElement root, out JsonElement history)
        {
            history = default;
            
            return root.TryGetProperty("data", out var data) &&
                   data.TryGetProperty("repository", out var repo) &&
                   repo.TryGetProperty("defaultBranchRef", out var defaultBranchRef) &&
                   defaultBranchRef.ValueKind != JsonValueKind.Null &&
                   defaultBranchRef.TryGetProperty("target", out var target) &&
                   target.TryGetProperty("history", out history);
        }
        

        
        private IEnumerable<GitHubLanguageStatsDto> CalculateCumulativeStats(IEnumerable<CommitStat> commits)
        {
            if (!commits.Any())
                return Enumerable.Empty<GitHubLanguageStatsDto>();
            
            var sortedCommits = commits
                .OrderBy(c => DateTime.Parse(c.Date))
                .ToList();
            
            var result = new List<GitHubLanguageStatsDto>();
            int cumulativeAdditions = 0;
            int cumulativeDeletions = 0;
            
            foreach (var commit in sortedCommits)
            {
                cumulativeAdditions += commit.Additions;
                cumulativeDeletions += commit.Deletions;
                
                result.Add(new GitHubLanguageStatsDto {
                    Date = commit.Date,
                    Additions = cumulativeAdditions,
                    Deletions = cumulativeDeletions
                });
            }
            
            return result;
        }

        private async Task<Dictionary<string, double>> GetRepositoryLanguages(string repoFullName)
        {
            var result = new Dictionary<string, double>(StringComparer.OrdinalIgnoreCase);
            try
            {
                string repoShortName = repoFullName;
                int lastSlashIndex = repoFullName.LastIndexOf('/');
                if (lastSlashIndex >= 0 && lastSlashIndex < repoFullName.Length - 1)
                    repoShortName = repoFullName.Substring(lastSlashIndex + 1);
        
                var response = await _httpClient.GetAsync($"{_baseUrl}/repos/{repoFullName}/languages");
                
                if (!response.IsSuccessStatusCode)
                {
                    return result;
                }
                
                using var doc = JsonDocument.Parse(await response.Content.ReadAsStringAsync());
                
                long totalBytes = 0;
                foreach (var prop in doc.RootElement.EnumerateObject())
                    totalBytes += prop.Value.GetInt64();
                
                if (totalBytes == 0) return result;
                
                foreach (var prop in doc.RootElement.EnumerateObject())
                {
                
                    string langName = prop.Name;
                    double percentage = (double)prop.Value.GetInt64() / totalBytes;
                    result[langName] = percentage;
                }
            }
            catch (Exception ex)
            {
                _logger?.LogError(ex, $"Error getting language stats for {repoFullName}");
            }
            return result;
        }
        
        private bool IsUserCommit(JsonElement node)
        {
            TryGetUserLoginFromProperty(node, "author", out string authorLogin);
            TryGetUserLoginFromProperty(node, "committer", out string committerLogin);
            TryGetUserEmailFromProperty(node, "author", out string authorEmail, out string authorName);
            TryGetUserEmailFromProperty(node, "committer", out string committerEmail, out string committerName);
            
            if (!string.IsNullOrEmpty(authorLogin) && 
                string.Equals(authorLogin, _username, StringComparison.OrdinalIgnoreCase))
                return true;
                
            if (!string.IsNullOrEmpty(committerLogin) && 
                string.Equals(committerLogin, _username, StringComparison.OrdinalIgnoreCase))
                return true;
                
            if (node.TryGetProperty("repository", out var repo) && 
                repo.TryGetProperty("name", out var repoNameProp) &&
                repoNameProp.GetString() is string repoNameStr &&
                !string.IsNullOrEmpty(repoNameStr) &&
                (repoNameStr.Contains("python", StringComparison.OrdinalIgnoreCase) ||
                 repoNameStr.Contains("ml-", StringComparison.OrdinalIgnoreCase) ||
                 repoNameStr.Contains("machine-learning", StringComparison.OrdinalIgnoreCase)))
            {
                return true;
            }
                
            string[] emailPatterns = new[] {
                "joey", "rubas", "jrubas", "jr" 
            };
            
            string[] namePatterns = new[] {
                "Joey", "Rubas", "Joseph"
            };
            
            if (!string.IsNullOrEmpty(authorEmail))
            {
                foreach (var pattern in emailPatterns)
                {
                    if (authorEmail.IndexOf(pattern, StringComparison.OrdinalIgnoreCase) >= 0)
                        return true;
                }
            }
            
            if (!string.IsNullOrEmpty(committerEmail))
            {
                foreach (var pattern in emailPatterns)
                {
                    if (committerEmail.IndexOf(pattern, StringComparison.OrdinalIgnoreCase) >= 0)
                        return true;
                }
            }
            
            if (!string.IsNullOrEmpty(authorName))
            {
                foreach (var pattern in namePatterns)
                {
                    if (authorName.IndexOf(pattern, StringComparison.OrdinalIgnoreCase) >= 0)
                        return true;
                }
            }
            
            if (!string.IsNullOrEmpty(committerName))
            {
                foreach (var pattern in namePatterns)
                {
                    if (committerName.IndexOf(pattern, StringComparison.OrdinalIgnoreCase) >= 0)
                        return true;
                }
            }
            return false;
        }
        
        private bool TryGetUserLoginFromProperty(JsonElement element, string propertyName, out string login)
        {
            login = string.Empty; 
            return element.TryGetProperty(propertyName, out var prop) &&
                   prop.TryGetProperty("user", out var user) &&
                   user.ValueKind != JsonValueKind.Null &&
                   user.TryGetProperty("login", out var loginProp) &&
                   !string.IsNullOrEmpty(login = loginProp.GetString() ?? string.Empty);
        }
        
        private bool TryGetUserEmailFromProperty(JsonElement element, string propertyName, out string email, out string name)
        {
            email = string.Empty; 
            name = string.Empty; 
            
            if (!element.TryGetProperty(propertyName, out var prop))
                return false;
                
            bool hasEmail = prop.TryGetProperty("email", out var emailProp) &&
                          emailProp.ValueKind != JsonValueKind.Null &&
                          !string.IsNullOrEmpty(email = emailProp.GetString() ?? string.Empty);
                          
            bool hasName = prop.TryGetProperty("name", out var nameProp) &&
                         nameProp.ValueKind != JsonValueKind.Null &&
                         !string.IsNullOrEmpty(name = nameProp.GetString() ?? string.Empty);
                         
            return hasEmail || hasName;
        }
    }
}
