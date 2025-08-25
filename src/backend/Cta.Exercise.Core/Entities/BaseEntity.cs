using Cta.Exercise.Core.Enums;

namespace Cta.Exercise.Core.Entities;

public abstract class BaseEntity
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public abstract BaseType Type { get; }
    public required string Name { get; set; }
    public required string Description { get; set; }

    public int HoursExperience { get; set; }


    public static BaseType GetTypeByConstraint(Type type) => type switch
    {
        not null when type == typeof(HobbyEntity) => BaseType.Hobby,
        not null when type == typeof(SkillEntity) => BaseType.Skill,
        _ => throw new NotImplementedException()
    };
}
