using Cta.Exercise.Core.Entities;
using Cta.Exercise.Core.Enums;

namespace Cta.Exercise.Core.Repositories;

public class BaseRepository : IBaseRepository
{
    private List<BaseEntity> _baseEntities;

    public BaseRepository()
    {
        _baseEntities = Populate();
    }

    public BaseEntity? GetById(string id)
    {
        return _baseEntities.Where(v => v.Id == id).FirstOrDefault();
    }

    public List<BaseEntity> GetByType(BaseType baseType)
    {
        return _baseEntities
            .Where(v => v.Type == baseType)
            .ToList();
    }


    public List<BaseEntity> GetAll()
    {
        return _baseEntities;
    }

    public void Add<T>(T entity) where T : BaseEntity
    {
        _baseEntities.Add(entity);
    }

    public void Delete(string id)
    {
        _baseEntities = _baseEntities.Where(v => v.Id != id).ToList();
    }

    public void Update(BaseEntity entity)
    {
        Delete(entity.Id);
        Add(entity);
    }

    private static List<BaseEntity> Populate()
    {
        return new List<BaseEntity>()
            {
                new SkillEntity {
                    Id = Guid.NewGuid().ToString(),
                    Name = "React",
                    Description = "I have 2 years of experience using React",
                    SkillLevel = SkillLevel.Novice
                },
                new SkillEntity {
                    Id = Guid.NewGuid().ToString(),
                    Name = "Next.js",
                    Description = "I have very little experience here, but excited and hopeful to learn more!",
                    SkillLevel = SkillLevel.Basic
                },
                new SkillEntity {
                    Id = Guid.NewGuid().ToString(),
                    Name = "Javascript",
                    Description = "I have 3 years of experience using JavaScript",
                    SkillLevel = SkillLevel.Expert
                },
                new SkillEntity {
                    Id = Guid.NewGuid().ToString(),
                    Name = "C#",
                    Description = "I am still learning!",
                    SkillLevel = SkillLevel.Novice
                },
                new SkillEntity {
                    Id = Guid.NewGuid().ToString(),
                    Name = "Azure",
                    Description = "I have been working with Azure for a little now",
                    SkillLevel = SkillLevel.Intermediate
                },
                new HobbyEntity
                {
                    Id  = Guid.NewGuid().ToString(),
                    Name = "Kickball",
                    Description = "I've been playing with my friends from CarMax for two months now!"
                },
                new HobbyEntity
                {
                    Id  = Guid.NewGuid().ToString(),
                    Name = "Escape Room Connoisseur",
                    Description = "I have done every escape room in Richmond"
                },
                new HobbyEntity
                {
                    Id  = Guid.NewGuid().ToString(),
                    Name = "Buying Used Cars",
                    Description = "All I want to do is shop at CarMax! 3 cars a year really isn't enough"
                },
                new HobbyEntity
                {
                    Id  = Guid.NewGuid().ToString(),
                    Name = "Guitar",
                    Description = "Lately I have been trying to master the guitar riff in Enter Sandman"
                }
            };
    }
}
