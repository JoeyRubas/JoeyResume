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
                    Description = "Extensive experience developing robust applications and automation solutions using Python across multiple domains. Proficient in leveraging Python's ecosystem for data processing, web development, and enterprise-level software engineering.",
                    SkillLevel = SkillLevel.Expert,
                    HoursExperience = 2000,
                    CanTrackInGitHub = true,
                    GitHubAlias = null
                },
                new SkillEntity {
                    Id = "Django",
                    Name = "Django",
                    Description = "Demonstrated proficiency in developing scalable web applications using Django's full-stack framework. Experience includes building RESTful APIs, implementing authentication systems, and managing complex database relationships in production environments.",
                    SkillLevel = SkillLevel.Intermediate,
                    HoursExperience = 800,
                    CanTrackInGitHub = false,
                    GitHubAlias = null
                },
                new SkillEntity {
                    Id = "HTML",
                    Name = "HTML",
                    Description = "Proficient in creating semantic, accessible, and standards-compliant web markup structures. Experience includes implementing modern HTML5 features, optimizing for SEO, and ensuring cross-browser compatibility.",
                    SkillLevel = SkillLevel.Intermediate,
                    HoursExperience = 1000,
                    CanTrackInGitHub = true,
                    GitHubAlias = null
                },
                new SkillEntity {
                    Id = "CSS",
                    Name = "CSS",
                    Description = "Skilled in developing responsive, mobile-first designs using modern CSS techniques and frameworks. Expertise includes CSS Grid, Flexbox, animations, and implementing design systems for consistent user experiences.",
                    SkillLevel = SkillLevel.Intermediate,
                    HoursExperience = 1000,
                    CanTrackInGitHub = true,
                    GitHubAlias = null
                },
                new SkillEntity {
                    Id = "JavaScript",
                    Name = "JavaScript",
                    Description = "Competent in developing dynamic web applications using modern JavaScript ES6+ features and best practices. Experience spans both client-side development and server-side Node.js applications with focus on performance optimization.",
                    SkillLevel = SkillLevel.Intermediate,
                    HoursExperience = 900,
                    CanTrackInGitHub = true,
                    GitHubAlias = null
                },
                new SkillEntity {
                    Id = "TypeScript",
                    Name = "TypeScript",
                    Description = "Proficient in leveraging TypeScript's static typing system to build maintainable and scalable JavaScript applications. Experience includes configuring complex type systems, implementing interfaces, and integrating with modern development workflows.",
                    SkillLevel = SkillLevel.Intermediate,
                    HoursExperience = 400,
                    CanTrackInGitHub = true,
                    GitHubAlias = null
                },
                new SkillEntity {
                    Id = "React",
                    Name = "React",
                    Description = "Developing proficiency in building interactive user interfaces using React's component-based architecture. Currently expanding knowledge in hooks, state management, and modern React development patterns.",
                    SkillLevel = SkillLevel.Basic,
                    HoursExperience = 100,
                    CanTrackInGitHub = false,
                    GitHubAlias = null
                },
                new SkillEntity {
                    Id = "Vue",
                    Name = "Vue",
                    Description = "Acquiring hands-on experience with Vue.js progressive framework and its ecosystem. Focused on understanding component composition, reactive data binding, and the Vue CLI for efficient development workflows.",
                    SkillLevel = SkillLevel.Basic,
                    HoursExperience = 80,
                    CanTrackInGitHub = true,
                    GitHubAlias = null
                },
                new SkillEntity {
                    Id = "Expressjs",
                    Name = "Express.js",
                    Description = "Building foundational knowledge in Express.js for developing RESTful APIs and web server applications. Experience includes middleware implementation, routing configuration, and integration with database systems.",
                    SkillLevel = SkillLevel.Basic,
                    HoursExperience = 120,
                    CanTrackInGitHub = false,
                    GitHubAlias = null
                },
                new SkillEntity {
                    Id = "Azure",
                    Name = "Azure",
                    Description = "Competent in deploying and managing applications on Microsoft Azure cloud platform. Experience includes working with Azure App Services, storage solutions, and implementing cloud-based architectures.",
                    SkillLevel = SkillLevel.Intermediate,
                    HoursExperience = 400,
                    CanTrackInGitHub = false,
                    GitHubAlias = null
                },
                new SkillEntity {
                    Id = "Digital Ocean",
                    Name = "Digital Ocean",
                    Description = "Experienced in provisioning and managing cloud infrastructure using DigitalOcean's platform. Proficient in deploying applications, configuring droplets, and implementing scalable hosting solutions.",
                    SkillLevel = SkillLevel.Intermediate,
                    HoursExperience = 300,
                    CanTrackInGitHub = false,
                    GitHubAlias = null
                },
                new SkillEntity {
                    Id = "Linode",
                    Name = "Linode",
                    Description = "Skilled in utilizing Linode's cloud infrastructure for application deployment and server management. Experience includes configuring virtual private servers, implementing backup strategies, and optimizing performance.",
                    SkillLevel = SkillLevel.Intermediate,
                    HoursExperience = 400,
                    CanTrackInGitHub = false,
                    GitHubAlias = null
                },
                new SkillEntity {
                    Id = "AWS",
                    Name = "AWS",
                    Description = "Developing foundational knowledge of Amazon Web Services cloud ecosystem and core services. Currently expanding understanding of AWS infrastructure, deployment strategies, and cloud architecture principles.",
                    SkillLevel = SkillLevel.Novice,
                    HoursExperience = 20,
                    CanTrackInGitHub = false,
                    GitHubAlias = null
                },
                new SkillEntity {
                    Id = "Google Cloud",
                    Name = "Google Cloud",
                    Description = "Building introductory experience with Google Cloud Platform services and cloud computing concepts. Focused on understanding GCP's core offerings, deployment models, and integration capabilities.",
                    SkillLevel = SkillLevel.Novice,
                    HoursExperience = 20,
                    CanTrackInGitHub = false,
                    GitHubAlias = null
                },
                new SkillEntity {
                    Id = "CI-CD",
                    Name = "CI/CD",
                    Description = "Proficient in designing and implementing continuous integration and deployment pipelines for automated software delivery. Experience includes configuring build processes, automated testing workflows, and deployment strategies across multiple environments.",
                    SkillLevel = SkillLevel.Intermediate,
                    HoursExperience = 400,
                    CanTrackInGitHub = false,
                    GitHubAlias = null
                },
                new SkillEntity {
                    Id = "Infrastructure as Code",
                    Name = "Infrastructure as Code",
                    Description = "Competent in implementing infrastructure automation using declarative configuration and version-controlled provisioning tools. Experience includes managing cloud resources programmatically and ensuring consistent, reproducible infrastructure deployments.",
                    SkillLevel = SkillLevel.Intermediate,
                    HoursExperience = 250,
                    CanTrackInGitHub = false,
                    GitHubAlias = null
                },
                new SkillEntity {
                    Id = "Csharp",
                    Name = "C#",
                    Description = "Proficient in developing robust applications using C# and object-oriented programming principles. Experience includes building enterprise-grade solutions, implementing design patterns, and working with modern C# features.",
                    SkillLevel = SkillLevel.Intermediate,
                    HoursExperience = 500,
                    CanTrackInGitHub = true,
                    GitHubAlias = null
                },
                new SkillEntity {
                    Id = "dotNET",
                    Name = ".NET",
                    Description = "Skilled in leveraging the .NET ecosystem for building scalable, cross-platform applications and web services. Experience includes working with ASP.NET Core, Entity Framework, and implementing microservices architectures.",
                    SkillLevel = SkillLevel.Intermediate,
                    HoursExperience = 500,
                    CanTrackInGitHub = true,
                    GitHubAlias = "C#"
                },
                new SkillEntity {
                    Id = "Java",
                    Name = "Java",
                    Description = "Competent in developing enterprise-level applications using Java's robust programming paradigms and extensive library ecosystem. Experience includes working with Spring framework, implementing RESTful services, and managing complex business logic.",
                    SkillLevel = SkillLevel.Intermediate,
                    HoursExperience = 600,
                    CanTrackInGitHub = true,
                    GitHubAlias = null
                },
                new SkillEntity {
                    Id = "Docker",
                    Name = "Docker",
                    Description = "Proficient in containerizing applications and managing Docker-based deployment workflows. Experience includes creating optimized Dockerfiles, orchestrating multi-container applications, and implementing containerization best practices.",
                    SkillLevel = SkillLevel.Intermediate,
                    HoursExperience = 150,
                    CanTrackInGitHub = true,
                    GitHubAlias = "Dockerfile"
                },
                new SkillEntity {
                    Id = "GitHub Actions",
                    Name = "GitHub Actions",
                    Description = "Competent in designing and implementing automated CI/CD workflows using GitHub Actions for streamlined development processes. Experience includes configuring build pipelines, automated testing, and deployment strategies across multiple environments.",
                    SkillLevel = SkillLevel.Intermediate,
                    HoursExperience = 100,
                    CanTrackInGitHub = false,
                    GitHubAlias = null
                },
            };
    }
}
