using Cta.Exercise.Core.Dtos;
using System.Text.Json;

namespace Cta.Exercise.Application.ServiceClients;

public class CatFactServiceClient : ICatFactServiceClient
{
    private readonly HttpClient _httpClient;

    public CatFactServiceClient(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<string?> GetCatFact()
    {
        var response = await _httpClient.GetAsync(new Uri(_httpClient.BaseAddress, "/fact"));

        if (!response.IsSuccessStatusCode)
        {
            return null;
        }

        var parsedString = await response.Content.ReadAsStringAsync();
        var deserializedResponse = JsonSerializer.Deserialize<CatFactResponse>(parsedString);

        return deserializedResponse?.fact;

    }
}
