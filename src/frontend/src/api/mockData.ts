
import { Skill, SkillLevel } from '../types/skill';

function generateId(): string {
  return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
}

export const mockSkills: Skill[] = [
  {
    id: generateId(),
    name: 'Python',
    description: "This is my goto language, I've been programming in Python for a solid 8 years",
    skillLevel: SkillLevel.Expert,
    hoursExperience: 2000
  },
  {
    id: generateId(),
    name: 'Django',
    description: 'I have 3 years of experience building web applications with Django',
    skillLevel: SkillLevel.Intermediate,
    hoursExperience: 800
  },
  {
    id: generateId(),
    name: 'HTML',
    description: 'I have 5 years of experience creating web markup and structures',
    skillLevel: SkillLevel.Intermediate,
    hoursExperience: 1000
  },
  {
    id: generateId(),
    name: 'CSS',
    description: 'I have 5 years of experience styling web applications and creating responsive designs',
    skillLevel: SkillLevel.Intermediate,
    hoursExperience: 1000
  },
  {
    id: generateId(),
    name: 'JavaScript',
    description: 'I have 4 years of experience with JavaScript for frontend and backend development',
    skillLevel: SkillLevel.Intermediate,
    hoursExperience: 900
  },
  {
    id: generateId(),
    name: 'TypeScript',
    description: 'I have medium experience with TypeScript for type-safe JavaScript development',
    skillLevel: SkillLevel.Intermediate,
    hoursExperience: 400
  },
  {
    id: generateId(),
    name: 'React',
    description: ",I'm new to React but excited to build modern user interfaces",
    skillLevel: SkillLevel.Basic,
    hoursExperience: 100
  },
  {
    id: generateId(),
    name: 'Vue',
    description: "I'm new to Vue.js and learning this progressive framework",
    skillLevel: SkillLevel.Basic,
    hoursExperience: 80
  },
  {
    id: generateId(),
    name: 'Express.js',
    description: "I'm new to Express.js for building Node.js web applications",
    skillLevel: SkillLevel.Basic,
    hoursExperience: 120
  },
  {
    id: generateId(),
    name: 'Azure',
    description: "I have medium experience with Microsoft Azure cloud services",
    skillLevel: SkillLevel.Intermediate,
    hoursExperience: 400
  },
  {
    id: generateId(),
    name: 'Digital Ocean',
    description: "I have medium experience with Digital Ocean cloud infrastructure",
    skillLevel: SkillLevel.Intermediate,
    hoursExperience: 300
  },
  {
    id: generateId(),
    name: 'Linode',
    description: "I have medium experience with Linode cloud hosting services",
    skillLevel: SkillLevel.Intermediate,
    hoursExperience: 400
  },
  {
    id: generateId(),
    name: 'AWS',
    description: "I have novice experience with Amazon Web Services",
    skillLevel: SkillLevel.Novice,
    hoursExperience: 20
  },
  {
    id: generateId(),
    name: 'Google Cloud',
    description: "I have novice experience with Google Cloud Platform",
    skillLevel: SkillLevel.Novice,
    hoursExperience: 20
  },
  {
    id: generateId(),
    name: 'CI/CD',
    description: "I have medium experience with continuous integration and deployment pipelines",
    skillLevel: SkillLevel.Intermediate,
    hoursExperience: 400
  },
  {
    id: generateId(),
    name: 'Infrastructure as Code',
    description: "I have medium experience with infrastructure automation and provisioning",
    skillLevel: SkillLevel.Intermediate,
    hoursExperience: 250
  },
  {
    id: generateId(),
    name: 'C#',
    description: "I have medium experience with C# and .NET development",
    skillLevel: SkillLevel.Intermediate,
    hoursExperience: 500
  },
  {
    id: generateId(),
    name: '.NET',
    description: "I have medium experience with the .NET framework and ecosystem",
    skillLevel: SkillLevel.Intermediate,
    hoursExperience: 500
  },
  {
    id: generateId(),
    name: 'Java',
    description: "I have medium experience with Java programming and enterprise development",
    skillLevel: SkillLevel.Intermediate,
    hoursExperience: 600
  },
  {
    id: generateId(),
    name: 'Docker',
    description: "I have medium experience with containerization and Docker deployment",
    skillLevel: SkillLevel.Intermediate,
    hoursExperience: 150
  },
  {
    id: generateId(),
    name: 'GitHub Actions',
    description: "I have medium experience with GitHub Actions for CI/CD workflows",
    skillLevel: SkillLevel.Intermediate,
    hoursExperience: 100
  }
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockApi = {
  getSkills: async (): Promise<Skill[]> => {
    await delay(300); // Simulate network delay
    return [...mockSkills];
  },

  getSkill: async (id: string): Promise<Skill> => {
    await delay(200);
    const skill = mockSkills.find(s => s.id === id);
    if (!skill) {
      throw new Error(`Skill with id ${id} not found`);
    }
    return { ...skill };
  },

  createSkill: async (skill: Skill): Promise<Skill> => {
    await delay(300);
    const newSkill = {
      ...skill,
      id: (mockSkills.length + 1).toString()
    };
    mockSkills.push(newSkill);
    return { ...newSkill };
  },

  editSkill: async (skill: Skill): Promise<Skill> => {
    await delay(300);
    const index = mockSkills.findIndex(s => s.id === skill.id);
    if (index === -1) {
      throw new Error(`Skill with id ${skill.id} not found`);
    }
    mockSkills[index] = { ...skill };
    return { ...skill };
  },

  deleteSkill: async (id: string): Promise<boolean> => {
    await delay(300);
    const index = mockSkills.findIndex(s => s.id === id);
    if (index === -1) {
      throw new Error(`Skill with id ${id} not found`);
    }
    mockSkills.splice(index, 1);
    return true;
  }
};
