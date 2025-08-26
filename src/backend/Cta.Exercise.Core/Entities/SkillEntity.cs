using Cta.Exercise.Core.Enums;

namespace Cta.Exercise.Core.Entities;

public class SkillEntity : BaseEntity
{
    public SkillLevel SkillLevel { get; set; }
    
    public bool CanTrackInGitHub { get; set; }
    
    public string GitHubAlias { get; set; }
    
    public override BaseType Type { get => BaseType.Skill; }
}
