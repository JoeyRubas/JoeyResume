using Cta.Exercise.Application.Services;
using Cta.Exercise.Core.Dtos;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Cta.Exercise.Service.Controllers
{
    [ApiController]
    [Route("api/github")]
    public class GitHubController : ControllerBase
    {
        private readonly IGitHubService _gitHubService;

        public GitHubController(IGitHubService gitHubService)
        {
            _gitHubService = gitHubService;
        }

        [HttpGet("language-stats/{languageName}")]
        public async Task<ActionResult<IEnumerable<GitHubLanguageStatsDto>>> GetLanguageStats(string languageName, [FromQuery] string alias = null)
        {
            var result = await _gitHubService.GetLanguageStats(languageName, alias);
            return Ok(result);
        }
        
        [HttpGet("status")]
        public ActionResult<string> GetStatus()
        {
            // Simple endpoint to verify the GitHub controller is working
            return Ok(new { 
                status = "GitHub API controller is working", 
                timestamp = DateTime.UtcNow,
                username = _gitHubService.GetUsername(),
                cacheSettings = new {
                    ttl = "24 hours",
                    refreshPolicy = "Background refresh on access after TTL expires"
                }
            });
        }
    }
}
