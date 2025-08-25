using Cta.Exercise.Core.Entities;
using Cta.Exercise.Core.Enums;
using Cta.Exercise.Core.Data;

namespace Cta.Exercise.Core.Repositories;

public class BaseRepository : IBaseRepository
{
    private List<BaseEntity> _baseEntities;

    public BaseRepository()
    {
        _baseEntities = SeedData.GetSkillsAndHobbies();
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
}