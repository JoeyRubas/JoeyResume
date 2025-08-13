using Cta.Exercise.Core.Dtos;
using Cta.Exercise.Core.Entities;
using Cta.Exercise.Core.Enums;
using System.Text.Json;

namespace Cta.Exercise.Core.Repositories;

public class JsonRepository : IBaseRepository
{
    private List<BaseEntity> _baseEntities;
    private string _skillfilename = "skillRepository.json";
    private string _hobbyfilename = "hobbyRepository.json";

    public JsonRepository()
    {
        _baseEntities = new List<BaseEntity>();
        _baseEntities.AddRange(ReadJsonFile<SkillEntity>(_skillfilename));
        _baseEntities.AddRange(ReadJsonFile<HobbyEntity>(_hobbyfilename));
    }

    public static List<T> ReadJsonFile<T>(string filename) where T : BaseEntity {
        string json;
        try
        {
            json = File.ReadAllText(filename);
            return JsonSerializer.Deserialize<List<T>>(json);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error reading or deserializing file {filename}:");
            Console.WriteLine(ex);
            return new List<T>();
        }
    }

    public void UpdateJsonFile() {
        var entities = GetByType(BaseType.Skill);
        string jsonString = JsonSerializer.Serialize(entities);
        File.WriteAllText(_skillfilename, jsonString);
        entities = GetByType(BaseType.Hobby);
        jsonString = JsonSerializer.Serialize(entities);
        File.WriteAllText(_hobbyfilename, jsonString);


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
        UpdateJsonFile();
    }

    public void Delete(string id)
    {
        var target = GetById(id);
        if (target == null)
            return;

        _baseEntities = _baseEntities.Where(v => v.Id != id).ToList();
        UpdateJsonFile();
    }

    public void Update(BaseEntity entity)
    {
        Delete(entity.Id);
        Add(entity);
    }

}
