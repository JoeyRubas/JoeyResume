using Cta.Exercise.Core.Enums;

namespace Cta.Exercise.Core.Dtos;

public class SkillUpdateDto : BaseUpdateDto
{
    public SkillLevel SkillLevel { get; set; }
}
