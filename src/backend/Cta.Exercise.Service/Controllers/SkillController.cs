using Cta.Exercise.Application.Services;
using Cta.Exercise.Core.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace Cta.Exercise.Service.Controllers;

[ApiController]
[Route("skill")]
public class SkillController : ControllerBase
{
    private readonly IBaseService _service;

    public SkillController(IBaseService service)
    {
        _service = service;
    }

    [HttpGet]
    public ActionResult<List<SkillGetDto>> GetAllSkills()
    {
        return _service.GetByType<SkillGetDto>();
    }

    [HttpGet("{id}")]
    public ActionResult<SkillGetDto> GetSkillById(string? id)
    {
        return _service.GetById<SkillGetDto>(id);
    }

    [HttpDelete("{id}")]
    public ActionResult<string> DeleteSkill(string id)
    {
        return _service.Delete(id);
    }

    [HttpPost]
    public ActionResult<SkillGetDto> AddSkill([FromBody] SkillCreateDto? skill)
    {
        return _service.Create<SkillCreateDto, SkillGetDto>(skill);
    }

    [HttpPut("{id}")]
    public ActionResult<SkillGetDto> UpdateSkill(string id, [FromBody] SkillUpdateDto skill)
    {
        return _service.Update<SkillUpdateDto, SkillGetDto>(id, skill);
    }
}
