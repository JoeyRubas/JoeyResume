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
        };
    }

    public static BaseEntity Map(BaseUpdateDto dto, string id)
    {
        return dto switch
        {
            SkillUpdateDto skillCreateDto => Map(skillCreateDto, id),
        };
    }

    public static BaseGetDto Map(BaseEntity baseEntity)
    {
        return baseEntity switch
        {
            SkillEntity skillEntity => Map(skillEntity),
        };
    }

    private static SkillEntity Map(SkillCreateDto skillCreateDto)
    {
        return new SkillEntity
        {
            Id = Guid.NewGuid().ToString(),
            Name = skillCreateDto.Name,
            Description = skillCreateDto.Description,
            SkillLevel = skillCreateDto.SkillLevel,
            HoursExperience = skillCreateDto.HoursExperience,
            CanTrackInGitHub = skillCreateDto.CanTrackInGitHub,
            GitHubAlias = skillCreateDto.GitHubAlias
        };
    }

    private static SkillGetDto Map(SkillEntity skillEntity)
    {
        return new SkillGetDto
        {
            Id = skillEntity.Id,
            Name = skillEntity.Name,
            Description = skillEntity.Description,
            SkillLevel = skillEntity.SkillLevel,
            HoursExperience = skillEntity.HoursExperience,
            CanTrackInGitHub = skillEntity.CanTrackInGitHub,
            GitHubAlias = skillEntity.GitHubAlias
        };
    }

    private static SkillEntity Map(SkillUpdateDto skillCreateDto, string id)
    {
        return new SkillEntity
        {
            Id = id,
            Name = skillCreateDto.Name,
            Description = skillCreateDto.Description,
            SkillLevel = skillCreateDto.SkillLevel,
            HoursExperience = skillCreateDto.HoursExperience,
            CanTrackInGitHub = skillCreateDto.CanTrackInGitHub,
            GitHubAlias = skillCreateDto.GitHubAlias
        };
    }
}
