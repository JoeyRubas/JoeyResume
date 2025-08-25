namespace Cta.Exercise.Core.Dtos;

public record CatFactResponse
{
    public required string fact { get; set; }
    public int length { get; set; }
}
