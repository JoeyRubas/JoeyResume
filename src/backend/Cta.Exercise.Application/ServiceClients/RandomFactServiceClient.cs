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
        var response = await _httpClient.GetAsync(new Uri(_httpClient.BaseAddress, "/api/v2/facts/random"));

        if (!response.IsSuccessStatusCode)
        {
            return null;
        }

        var parsedString = await response.Content.ReadAsStringAsync();
        var deserializedResponse = JsonSerializer.Deserialize<RandomFactResponse>(parsedString);

        return deserializedResponse?.text;
    }
}
