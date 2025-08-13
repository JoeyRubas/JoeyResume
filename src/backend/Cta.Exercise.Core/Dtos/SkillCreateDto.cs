using Cta.Exercise.Core.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cta.Exercise.Core.Dtos;

public class SkillCreateDto : BaseCreateDto
{
    public SkillLevel SkillLevel { get; set; }
}
