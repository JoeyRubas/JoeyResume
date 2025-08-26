using Cta.Exercise.Core.Enums;

namespace Cta.Exercise.Core.Dtos;

public class BaseGetDto
{
    public string Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }

    public int HoursExperience { get; set; }

    public static BaseType GetTypeByConstraint(Type type) => type switch
    {
        not null when type == typeof(SkillGetDto) => BaseType.Skill,
        _ => throw new NotImplementedException()
    };
}
