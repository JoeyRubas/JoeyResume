namespace Cta.Exercise.Application.ServiceClients;

public interface ICatFactServiceClient
{
    public Task<string?> GetCatFact();
}
