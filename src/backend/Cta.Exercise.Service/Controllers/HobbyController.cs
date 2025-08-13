using Cta.Exercise.Application.Services;
using Cta.Exercise.Core.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace Cta.Exercise.Service.Controllers;

[ApiController]
[Route("hobby")]
public class HobbyController : ControllerBase
{
    private readonly IBaseService _service;

    public HobbyController(IBaseService service)
    {
        _service = service;
    }

    [HttpGet]
    public ActionResult<List<HobbyGetDto>> GetAllHobbies()
    {
        return _service.GetByType<HobbyGetDto>();
    }

    [HttpGet("{id}")]
    public ActionResult<HobbyGetDto> GetHobbyById(string? id)
    {
        return _service.GetById<HobbyGetDto>(id);
    }

    [HttpDelete("{id}")]
    public ActionResult<string> DeleteHobby(string id)
    {
        return _service.Delete(id);
    }

    [HttpPost]
    public ActionResult<HobbyGetDto> AddHobby([FromBody] HobbyCreateDto? hobby)
    {
        return _service.Create<HobbyCreateDto, HobbyGetDto>(hobby);
    }
    [HttpPut("{id}")]
    public ActionResult<HobbyGetDto> UpdateHobby(string id, [FromBody] HobbyUpdateDto hobby)
    {
        return _service.Update<HobbyUpdateDto, HobbyGetDto>(id, hobby);
    }
}
