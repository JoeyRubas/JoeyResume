using Cta.Exercise.Application.ServiceClients;
using Microsoft.AspNetCore.Mvc;

namespace Cta.Exercise.Service.Controllers;

[ApiController]
[Route("facts")]
public class ServiceClientController : ControllerBase
{
    private readonly ICatFactServiceClient _catFactServiceClient;
    private readonly IRandomFactServiceClient _randomFactServiceClient;

    public ServiceClientController(ICatFactServiceClient catFactServiceClient, IRandomFactServiceClient randomFactServiceClient)
    {
        _catFactServiceClient = catFactServiceClient;
        _randomFactServiceClient = randomFactServiceClient;
    }

    [HttpGet("cat-fact")]
    public async Task<ActionResult<string?>> GetCatFact()
    {
        var fact = await _catFactServiceClient.GetCatFact();

        if (fact == null)
        {
            return new BadRequestResult();
        }

        return Ok(fact);
    }

    [HttpGet("random-fact")]
    public async Task<ActionResult<string?>> GetRandomFact()
    {
        var fact = await _randomFactServiceClient.GetRandomFact();

        if (fact == null)
        {
            return new BadRequestResult();
        }

        return Ok(fact);
    }
}
