using Cta.Exercise.Core.Entities;
using Cta.Exercise.Core.Enums;

namespace Cta.Exercise.Core.Data;

public static class SeedData
{
    public static List<BaseEntity> GetSkillsAndHobbies()
    {
        return new List<BaseEntity>()
        {
            new SkillEntity {
                Id = Guid.NewGuid().ToString(),
                Name = "Python",
                Description = "This is my goto language, I've been programming in Python for a solid 8 years",
                SkillLevel = SkillLevel.Expert,
                HoursExperience = 2000
            },
            new SkillEntity {
                Id = Guid.NewGuid().ToString(),
                Name = "Django",
                Description = "I have 3 years of experience building web applications with Django",
                SkillLevel = SkillLevel.Intermediate,
                HoursExperience = 800
            },
            new SkillEntity {
                Id = Guid.NewGuid().ToString(),
                Name = "HTML",
                Description = "I have 5 years of experience creating web markup and structures",
                SkillLevel = SkillLevel.Intermediate,
                HoursExperience = 1000
            },
            new SkillEntity {
                Id = Guid.NewGuid().ToString(),
                Name = "CSS",
                Description = "I have 5 years of experience styling web applications and creating responsive designs",
                SkillLevel = SkillLevel.Intermediate,
                HoursExperience = 1000
            },
            new SkillEntity {
                Id = Guid.NewGuid().ToString(),
                Name = "JavaScript",
                Description = "I have 4 years of experience with JavaScript for frontend and backend development",
                SkillLevel = SkillLevel.Intermediate,
                HoursExperience = 900
            },
            new SkillEntity {
                Id = Guid.NewGuid().ToString(),
                Name = "TypeScript",
                Description = "I have medium experience with TypeScript for type-safe JavaScript development",
                SkillLevel = SkillLevel.Intermediate,
                HoursExperience = 400
            },
            new SkillEntity {
                Id = Guid.NewGuid().ToString(),
                Name = "React",
                Description = "I'm new to React but excited to build modern user interfaces",
                SkillLevel = SkillLevel.Basic,
                HoursExperience = 100
            },
            new SkillEntity {
                Id = Guid.NewGuid().ToString(),
                Name = "Vue",
                Description = "I'm new to Vue.js and learning this progressive framework",
                SkillLevel = SkillLevel.Basic,
                HoursExperience = 80
            },
            new SkillEntity {
                Id = Guid.NewGuid().ToString(),
                Name = "Express.js",
                Description = "I'm new to Express.js for building Node.js web applications",
                SkillLevel = SkillLevel.Basic,
                HoursExperience = 120
            },
            new SkillEntity {
                Id = Guid.NewGuid().ToString(),
                Name = "Azure",
                Description = "I have medium experience with Microsoft Azure cloud services",
                SkillLevel = SkillLevel.Intermediate,
                HoursExperience = 400
            },
            new SkillEntity {
                Id = Guid.NewGuid().ToString(),
                Name = "Digital Ocean",
                Description = "I have medium experience with Digital Ocean cloud infrastructure",
                SkillLevel = SkillLevel.Intermediate,
                HoursExperience = 300
            },
            new SkillEntity {
                Id = Guid.NewGuid().ToString(),
                Name = "Linode",
                Description = "I have medium experience with Linode cloud hosting services",
                SkillLevel = SkillLevel.Intermediate,
                HoursExperience = 400
            },
            new SkillEntity {
                Id = Guid.NewGuid().ToString(),
                Name = "AWS",
                Description = "I have novice experience with Amazon Web Services",
                SkillLevel = SkillLevel.Novice,
                HoursExperience = 20
            },
            new SkillEntity {
                Id = Guid.NewGuid().ToString(),
                Name = "Google Cloud",
                Description = "I have novice experience with Google Cloud Platform",
                SkillLevel = SkillLevel.Novice,
                HoursExperience = 20
            },
            new SkillEntity {
                Id = Guid.NewGuid().ToString(),
                Name = "CI/CD",
                Description = "I have medium experience with continuous integration and deployment pipelines",
                SkillLevel = SkillLevel.Intermediate,
                HoursExperience = 400
            },
            new SkillEntity {
                Id = Guid.NewGuid().ToString(),
                Name = "Infrastructure as Code",
                Description = "I have medium experience with infrastructure automation and provisioning",
                SkillLevel = SkillLevel.Intermediate,
                HoursExperience = 250
            },
            new SkillEntity {
                Id = Guid.NewGuid().ToString(),
                Name = "C#",
                Description = "I have medium experience with C# and .NET development",
                SkillLevel = SkillLevel.Intermediate,
                HoursExperience = 500
            },
            new SkillEntity {
                Id = Guid.NewGuid().ToString(),
                Name = ".NET",
                Description = "I have medium experience with the .NET framework and ecosystem",
                SkillLevel = SkillLevel.Intermediate,
                HoursExperience = 500
            },
            new HobbyEntity {
                Id = Guid.NewGuid().ToString(),
                Name = "Table Tennis",
                Description = "I play competitive table tennis and have been ranked nationally",
                HoursExperience = 2500
            },
            new HobbyEntity {
                Id = Guid.NewGuid().ToString(),
                Name = "Chess",
                Description = "I enjoy playing chess online and participate in local tournaments",
                HoursExperience = 800
            },
            new HobbyEntity {
                Id = Guid.NewGuid().ToString(),
                Name = "Cooking",
                Description = "I love experimenting with new recipes and cooking techniques",
                HoursExperience = 600
            }
        };
    }
}