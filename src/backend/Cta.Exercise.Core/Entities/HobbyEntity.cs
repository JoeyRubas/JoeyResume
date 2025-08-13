using Cta.Exercise.Core.Enums;

namespace Cta.Exercise.Core.Entities;

public class HobbyEntity : BaseEntity
{
    public override BaseType Type { get => BaseType.Hobby; }
}