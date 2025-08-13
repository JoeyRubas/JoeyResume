import { Skill, SkillLevel } from '../types/skill';

// Mock skills data for development
export const mockSkills: Skill[] = [
  {
    id: '1',
    name: 'TypeScript',
    description: 'Strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.',
    hoursExperience: 2000,
    skillLevel: SkillLevel.Advanced
  },
  {
    id: '2',
    name: 'React',
    description: 'A JavaScript library for building user interfaces with component-based architecture.',
    hoursExperience: 1800,
    skillLevel: SkillLevel.Advanced
  },
  {
    id: '3',
    name: 'Node.js',
    description: 'JavaScript runtime built on Chrome\'s V8 JavaScript engine for server-side development.',
    hoursExperience: 1500,
    skillLevel: SkillLevel.Intermediate
  },
  {
    id: '4',
    name: 'Python',
    description: 'High-level programming language with emphasis on code readability and versatility.',
    hoursExperience: 1200,
    skillLevel: SkillLevel.Intermediate
  },
  {
    id: '5',
    name: 'SQL',
    description: 'Structured Query Language for managing and manipulating relational databases.',
    hoursExperience: 800,
    skillLevel: SkillLevel.Intermediate
  },
  {
    id: '6',
    name: 'Git',
    description: 'Distributed version control system for tracking changes in source code during development.',
    hoursExperience: 1000,
    skillLevel: SkillLevel.Advanced
  },
  {
    id: '7',
    name: 'AWS',
    description: 'Amazon Web Services cloud computing platform for scalable infrastructure and services.',
    hoursExperience: 600,
    skillLevel: SkillLevel.Novice
  },
  {
    id: '8',
    name: 'Docker',
    description: 'Platform for developing, shipping, and running applications using containerization.',
    hoursExperience: 400,
    skillLevel: SkillLevel.Basic
  },
  {
    id: '9',
    name: 'Material-UI',
    description: 'React component library implementing Google\'s Material Design system.',
    hoursExperience: 500,
    skillLevel: SkillLevel.Intermediate
  },
  {
    id: '10',
    name: 'C#',
    description: 'Object-oriented programming language developed by Microsoft for .NET framework.',
    hoursExperience: 900,
    skillLevel: SkillLevel.Intermediate
  }
];

// Simulate API delay for more realistic development experience
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
