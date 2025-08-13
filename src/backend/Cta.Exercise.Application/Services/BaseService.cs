using Cta.Exercise.Application.Mappers;
using Cta.Exercise.Core.Dtos;
using Cta.Exercise.Core.Entities;
using Cta.Exercise.Core.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Cta.Exercise.Application.Services;

public class BaseService : IBaseService
{
    private readonly IBaseRepository _repository;

    public BaseService(IBaseRepository repository)
    {
        _repository = repository;
    }

    public ActionResult<U> Create<T, U>(T entity) where T : BaseCreateDto where U : BaseGetDto
    {

        var newEntity = BaseMapper.Map(entity);
        _repository.Add(newEntity);
        var dto = BaseMapper.Map(newEntity);
        return new OkObjectResult(dto);
    }

    public ActionResult<string> Delete(string id)
    {
        _repository.Delete(id);
        return new OkObjectResult(id);
    }

    public ActionResult<T?> GetById<T>(string id) where T : BaseGetDto
    {
        var entity = _repository.GetById(id);
        
        if (entity is not null)
        {
            var dto = BaseMapper.Map(entity);
            return new OkObjectResult(dto);
        }

        else {
            return new NotFoundResult();
        }
    }

    public ActionResult<List<T?>> GetByType<T>() where T : BaseGetDto
    {
        var entities = _repository.GetByType(BaseGetDto.GetTypeByConstraint(typeof(T)));
        var dtos = entities.Select(x => BaseMapper.Map(x) as T).ToList();

        return new OkObjectResult(dtos);
    }

    public ActionResult<U> Update<T, U>(string id, T entity)
        where T : BaseUpdateDto
        where U : BaseGetDto
    {
        var DBEntity = _repository.GetById(id);
        if (DBEntity is null)
        {
            return new NotFoundResult();
        }
        DBEntity.Name = entity.Name;
        DBEntity.Description = entity.Description;
        _repository.Update(DBEntity);
        return GetById<U>(id);
        
    }
}
