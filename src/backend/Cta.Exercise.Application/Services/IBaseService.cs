using Cta.Exercise.Core.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace Cta.Exercise.Application.Services;

public interface IBaseService
{
    public ActionResult<U> Create<T, U>(T entity) where T : BaseCreateDto where U : BaseGetDto;
    public ActionResult<T?> GetById<T>(string id) where T : BaseGetDto;
    public ActionResult<List<T?>> GetByType<T>() where T : BaseGetDto;
    public ActionResult<string> Delete(string id);
    public ActionResult<U> Update<T, U>(string id, T entity) where T : BaseUpdateDto where U : BaseGetDto;
}
