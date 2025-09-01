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
    public ActionResult<List<SkillGetDto?>> GetAllSkills()
    {
        return _service.GetByType<SkillGetDto>();
    }

    [HttpGet("{id}")]
    public ActionResult<SkillGetDto?> GetSkillById(string? id)
    {
        if (string.IsNullOrEmpty(id))
        {
            return BadRequest("Skill ID is required");
        }
        return _service.GetById<SkillGetDto>(id);
    }


}
