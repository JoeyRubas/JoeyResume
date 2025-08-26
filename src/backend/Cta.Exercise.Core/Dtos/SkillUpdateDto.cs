using Cta.Exercise.Core.Enums;

namespace Cta.Exercise.Core.Dtos;

public class SkillUpdateDto : BaseUpdateDto
{
    public SkillLevel SkillLevel { get; set; }
    
    public bool CanTrackInGitHub { get; set; }
    

    public string GitHubAlias { get; set; }
}
