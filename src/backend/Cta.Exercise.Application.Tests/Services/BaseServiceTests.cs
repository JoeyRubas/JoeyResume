using Cta.Exercise.Application.Services;
using Cta.Exercise.Core.Dtos;
using Cta.Exercise.Core.Repositories;
using NSubstitute;

namespace Cta.Exercise.Application.Tests.Services;

public class BaseServiceTests
{
    private readonly IBaseRepository _repository;
    private readonly IBaseService _service;

    public BaseServiceTests()
    {
        _repository = Substitute.For<IBaseRepository>();
        _service = new BaseService(_repository);
    }

    [Fact]
    public void Create_ShouldThrowNotImplementedException()
    {
        Assert.Throws<NotImplementedException>(() =>
        {
            _service.Create<HobbyCreateDto, HobbyGetDto>(new HobbyCreateDto());
        });
    }
}
