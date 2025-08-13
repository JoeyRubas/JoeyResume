using Cta.Exercise.Core.Dtos;
using Cta.Exercise.Core.Entities;

namespace Cta.Exercise.Application.Mappers;

public static class BaseMapper
{
    public static BaseEntity Map(BaseCreateDto dto)
    {
        return dto switch
        {
            SkillCreateDto skillCreateDto => Map(skillCreateDto),
            HobbyCreateDto hobbyCreateDto => Map(hobbyCreateDto)
        };
    }

    public static BaseEntity Map(BaseUpdateDto dto, string id)
    {
        return dto switch
        {
            SkillUpdateDto skillCreateDto => Map(skillCreateDto, id),
            HobbyUpdateDto hobbyCreateDto => Map(hobbyCreateDto, id)
        };
    }

    public static BaseGetDto Map(BaseEntity baseEntity)
    {
        return baseEntity switch
        {
            SkillEntity skillEntity => Map(skillEntity),
            HobbyEntity hobbyEntity => Map(hobbyEntity)
        };
    }

    private static SkillEntity Map(SkillCreateDto skillCreateDto)
    {
        return new SkillEntity
        {
            Id = Guid.NewGuid().ToString(),
            Name = skillCreateDto.Name,
            Description = skillCreateDto.Description,
            SkillLevel = skillCreateDto.SkillLevel
        };
    }

    private static HobbyEntity Map(HobbyCreateDto hobbyCreateDto)
    {
        return new HobbyEntity
        {
            Id = Guid.NewGuid().ToString(),
            Name = hobbyCreateDto.Name,
            Description = hobbyCreateDto.Description
        };
    }

    private static SkillGetDto Map(SkillEntity skillEntity)
    {
        return new SkillGetDto
        {
            Id = skillEntity.Id,
            Name = skillEntity.Name,
            Description = skillEntity.Description,
            SkillLevel = skillEntity.SkillLevel
        };
    }

    private static HobbyGetDto Map(HobbyEntity hobbyEntity)
    {
        return new HobbyGetDto
        {
            Id = hobbyEntity.Id,
            Name = hobbyEntity.Name,
            Description = hobbyEntity.Description
        };
    }

    private static SkillEntity Map(SkillUpdateDto skillCreateDto, string id)
    {
        return new SkillEntity
        {
            Id = id,
            Name = skillCreateDto.Name,
            Description = skillCreateDto.Description,
            SkillLevel = skillCreateDto.SkillLevel
        };
    }

    private static HobbyEntity Map(HobbyUpdateDto hobbyCreateDto, string id)
    {
        return new HobbyEntity
        {
            Id = id,
            Name = hobbyCreateDto.Name,
            Description = hobbyCreateDto.Description
        };
    }
}
