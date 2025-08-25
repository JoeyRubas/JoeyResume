namespace Cta.Exercise.Core.Dtos;

public class BaseCreateDto
{
    public required string Name { get; set; }
    public required string Description { get; set; }

    public int HoursExperience { get; set; }
}
