namespace Cta.Exercise.Application.ServiceClients;

public interface IRandomFactServiceClient
{
    public Task<string?> GetRandomFact();
}
