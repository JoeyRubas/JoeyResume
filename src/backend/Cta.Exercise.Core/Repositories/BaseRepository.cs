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
                    Id = "Python",
                    Name = "Python",
                    Description = "This is my goto language, I've been programming in Python for a solid 8 years",
                    SkillLevel = SkillLevel.Expert,
                    HoursExperience = 2000,
                    CanTrackInGitHub = true,
                    GitHubAlias = null
                },
                new SkillEntity {
                    Id = "Django",
                    Name = "Django",
                    Description = "I have 3 years of experience building web applications with Django",
                    SkillLevel = SkillLevel.Intermediate,
                    HoursExperience = 800,
                    CanTrackInGitHub = false,
                    GitHubAlias = null
                },
                new SkillEntity {
                    Id = "HTML",
                    Name = "HTML",
                    Description = "I have 5 years of experience creating web markup and structures",
                    SkillLevel = SkillLevel.Intermediate,
                    HoursExperience = 1000,
                    CanTrackInGitHub = true,
                    GitHubAlias = null
                },
                new SkillEntity {
                    Id = "CSS",
                    Name = "CSS",
                    Description = "I have 5 years of experience styling web applications and creating responsive designs",
                    SkillLevel = SkillLevel.Intermediate,
                    HoursExperience = 1000,
                    CanTrackInGitHub = true,
                    GitHubAlias = null
                },
                new SkillEntity {
                    Id = "JavaScript",
                    Name = "JavaScript",
                    Description = "I have 4 years of experience with JavaScript for frontend and backend development",
                    SkillLevel = SkillLevel.Intermediate,
                    HoursExperience = 900,
                    CanTrackInGitHub = true,
                    GitHubAlias = null
                },
                new SkillEntity {
                    Id = "TypeScript",
                    Name = "TypeScript",
                    Description = "I have medium experience with TypeScript for type-safe JavaScript development",
                    SkillLevel = SkillLevel.Intermediate,
                    HoursExperience = 400,
                    CanTrackInGitHub = true,
                    GitHubAlias = null
                },
                new SkillEntity {
                    Id = "React",
                    Name = "React",
                    Description = "I'm new to React but excited to build modern user interfaces",
                    SkillLevel = SkillLevel.Basic,
                    HoursExperience = 100,
                    CanTrackInGitHub = false,
                    GitHubAlias = null
                },
                new SkillEntity {
                    Id = "Vue",
                    Name = "Vue",
                    Description = "I'm new to Vue.js and learning this progressive framework",
                    SkillLevel = SkillLevel.Basic,
                    HoursExperience = 80,
                    CanTrackInGitHub = true,
                    GitHubAlias = null
                },
                new SkillEntity {
                    Id = "Expressjs",
                    Name = "Express.js",
                    Description = "I'm new to Express.js for building Node.js web applications",
                    SkillLevel = SkillLevel.Basic,
                    HoursExperience = 120,
                    CanTrackInGitHub = false,
                    GitHubAlias = null
                },
                new SkillEntity {
                    Id = "Azure",
                    Name = "Azure",
                    Description = "I have medium experience with Microsoft Azure cloud services",
                    SkillLevel = SkillLevel.Intermediate,
                    HoursExperience = 400,
                    CanTrackInGitHub = false,
                    GitHubAlias = null
                },
                new SkillEntity {
                    Id = "Digital Ocean",
                    Name = "Digital Ocean",
                    Description = "I have medium experience with Digital Ocean cloud infrastructure",
                    SkillLevel = SkillLevel.Intermediate,
                    HoursExperience = 300,
                    CanTrackInGitHub = false,
                    GitHubAlias = null
                },
                new SkillEntity {
                    Id = "Linode",
                    Name = "Linode",
                    Description = "I have medium experience with Linode cloud hosting services",
                    SkillLevel = SkillLevel.Intermediate,
                    HoursExperience = 400,
                    CanTrackInGitHub = false,
                    GitHubAlias = null
                },
                new SkillEntity {
                    Id = "AWS",
                    Name = "AWS",
                    Description = "I have novice experience with Amazon Web Services",
                    SkillLevel = SkillLevel.Novice,
                    HoursExperience = 20,
                    CanTrackInGitHub = false,
                    GitHubAlias = null
                },
                new SkillEntity {
                    Id = "Google Cloud",
                    Name = "Google Cloud",
                    Description = "I have novice experience with Google Cloud Platform",
                    SkillLevel = SkillLevel.Novice,
                    HoursExperience = 20,
                    CanTrackInGitHub = false,
                    GitHubAlias = null
                },
                new SkillEntity {
                    Id = "CI-CD",
                    Name = "CI/CD",
                    Description = "I have medium experience with continuous integration and deployment pipelines",
                    SkillLevel = SkillLevel.Intermediate,
                    HoursExperience = 400,
                    CanTrackInGitHub = false,
                    GitHubAlias = null
                },
                new SkillEntity {
                    Id = "Infrastructure as Code",
                    Name = "Infrastructure as Code",
                    Description = "I have medium experience with infrastructure automation and provisioning",
                    SkillLevel = SkillLevel.Intermediate,
                    HoursExperience = 250,
                    CanTrackInGitHub = false,
                    GitHubAlias = null
                },
                new SkillEntity {
                    Id = "Csharp",
                    Name = "C#",
                    Description = "I have medium experience with C# and .NET development",
                    SkillLevel = SkillLevel.Intermediate,
                    HoursExperience = 500,
                    CanTrackInGitHub = true,
                    GitHubAlias = null
                },
                new SkillEntity {
                    Id = "dotNET",
                    Name = ".NET",
                    Description = "I have medium experience with the .NET framework and ecosystem",
                    SkillLevel = SkillLevel.Intermediate,
                    HoursExperience = 500,
                    CanTrackInGitHub = true,
                    GitHubAlias = "C#"
                },
                new SkillEntity {
                    Id = "Java",
                    Name = "Java",
                    Description = "I have medium experience with Java programming and enterprise development",
                    SkillLevel = SkillLevel.Intermediate,
                    HoursExperience = 600,
                    CanTrackInGitHub = true,
                    GitHubAlias = null
                },
                new SkillEntity {
                    Id = "Docker",
                    Name = "Docker",
                    Description = "I have medium experience with containerization and Docker deployment",
                    SkillLevel = SkillLevel.Intermediate,
                    HoursExperience = 150,
                    CanTrackInGitHub = true,
                    GitHubAlias = "Dockerfile"
                },
                new SkillEntity {
                    Id = "GitHub Actions",
                    Name = "GitHub Actions",
                    Description = "I have medium experience with GitHub Actions for CI/CD workflows",
                    SkillLevel = SkillLevel.Intermediate,
                    HoursExperience = 100,
                    CanTrackInGitHub = false,
                    GitHubAlias = null
                },
            };
    }
}
