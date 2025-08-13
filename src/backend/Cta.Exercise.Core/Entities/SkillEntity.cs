using Cta.Exercise.Core.Enums;

namespace Cta.Exercise.Core.Entities;

public class SkillEntity : BaseEntity
{
    public SkillLevel SkillLevel { get; set; }
    public override BaseType Type { get => BaseType.Skill; }
}
