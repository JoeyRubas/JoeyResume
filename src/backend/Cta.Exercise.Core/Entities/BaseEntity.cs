using Cta.Exercise.Core.Enums;

namespace Cta.Exercise.Core.Entities;

public abstract class BaseEntity
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public abstract BaseType Type { get; }
    public string Name { get; set; }
    public string Description { get; set; }

    public int HoursExperience { get; set; }


    public static BaseType GetTypeByConstraint(Type type) => type switch
    {
        not null when type == typeof(SkillEntity) => BaseType.Skill,
        _ => throw new NotImplementedException()
    };
}
