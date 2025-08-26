using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Cta.Exercise.Core.Dtos;

namespace Cta.Exercise.Application.Services
{
    public interface IGitHubService
    {
        Task<IEnumerable<GitHubLanguageStatsDto>> GetLanguageStats(string languageName, string gitHubAlias = null);
        string GetUsername();
    }
}
