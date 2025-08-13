using Cta.Exercise.Core.Enums;

namespace Cta.Exercise.Core.Dtos;

public class SkillGetDto : BaseGetDto
{
    public SkillLevel SkillLevel { get; set; }
}
