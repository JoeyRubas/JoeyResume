using Cta.Exercise.Core.Entities;
using Cta.Exercise.Core.Enums;

namespace Cta.Exercise.Core.Repositories;

public interface IBaseRepository
{
    public BaseEntity? GetById(string id);
    public void Add<T>(T entity) where T : BaseEntity;
    public List<BaseEntity> GetAll();
    public void Delete(string id);
    public List<BaseEntity> GetByType(BaseType baseType);
    public void Update(BaseEntity entity);
}
