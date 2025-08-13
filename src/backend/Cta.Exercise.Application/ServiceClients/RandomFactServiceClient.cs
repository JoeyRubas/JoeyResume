using Cta.Exercise.Core.Dtos;
using System.Net.Http;
using System.Text.Json;

namespace Cta.Exercise.Application.ServiceClients;

public class RandomFactServiceClient : IRandomFactServiceClient
{
    private readonly HttpClient _httpClient;

    public RandomFactServiceClient(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<string?> GetRandomFact()
    {
        throw new NotImplementedException();
    }
}
