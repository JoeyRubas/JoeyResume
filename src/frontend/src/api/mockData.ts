
import { Skill, SkillLevel } from '../types/skill';
import { Project } from '../types/project';


function generateProjectId(): string {
  return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
}

export const mockProjects: Project[] = [
  {
    id: 'proj1',
    name: 'Personal Website',
    description: 'The website you\'re viewing right now!.',
    githubUrl: 'https://github.com/joeyrubas/personal-website',
    liveUrl: 'https://joeyrubas.com',
    projectMaturity: 6,
    showNumberCommits: true,
    skillsUsed: ['React', 'TypeScript', 'CSS', 'Vite', 'Azure','CI/CD', 'DotNET']
  },
  {
    id: 'proj2',
    name: 'APDA Home Website',
    description: 'A wordpress site managed with custom stylings and CI/CD.',
    liveUrl: 'https://apda.online',
    projectMaturity: 7,
    showNumberCommits: false,
    skillsUsed: ["CSS", "Linode"]
  },
  {
    id: 'proj3',
    name: 'APDA Standings',
    description: 'Displays the current standings of the American Parliamentary Debate Association.',
    githubUrl: 'https://github.com/APDA-Tech-Committee/black-rod',
    liveUrl: 'https://results.apda.online',
    projectMaturity: 9,
    showNumberCommits: true,
    skillsUsed: ['Python', 'Django', 'HTML', 'CSS', 'JavaScript','CI/CD',]
  },
  {
    id: 'proj4',
    name: 'Mit-Tab',
    description: 'A debate tabulation tool with thousands of users.',
    githubUrl: 'https://github.com/MIT-Tab/mit-tab',
    liveUrl: 'https://nu-tab.com',
    projectMaturity: 9,
    showNumberCommits: false,
    skillsUsed: ['Python', 'Django', 'JavaScript', 'HTML', 'CSS', 'Digital Ocean', 'Docker', 'CI/CD']
  },
  {
    id: 'proj5',
    name: 'Nu-Tab Deployer',
    description: 'An automated deployment tool for Mit-Tab.',
    githubUrl: 'https://github.com/joeyrubas/static-blog',
    liveUrl: '',
    projectMaturity: 6,
    showNumberCommits: true,
    skillsUsed: ['Python', 'Django', 'JavaScript', 'HTML', 'CSS', 'Digital Ocean', 'Docker', 'CI/CD']
  },

  {
    id: 'proj6',
    name: 'Rubik\'s Cube Solver',
    description: 'An implementation of group theory based algorithms for solving rubik\'s cube.',
    githubUrl: 'https://github.com/JoeyRubas/rubiks',
    liveUrl: '',
    projectMaturity: 3,
    showNumberCommits: true,
    skillsUsed: ['Python']
  },
  {
    id: 'proj7',
    name: 'StockBot10000',
    description: 'A school project testing LLMs for stock trading.',
    githubUrl: 'https://github.com/JoeyRubas/StockBot10000',
    liveUrl: '',
    projectMaturity: 4,
    showNumberCommits: false,
    skillsUsed: ['Python', 'Django', 'HTML', 'CSS', 'Machine Learning']
  },
  {
    id: 'proj8',
    name: 'From Scratch Sandbox',
    description: 'A homeplace for low-level implementations of foundational algorithms like JPG compression, TCP or executing LLMs from weights.',
    githubUrl: 'https://github.com/JoeyRubas/from-scratch-sandbox',
    liveUrl: '',
    projectMaturity: 1,
    showNumberCommits: true,
    skillsUsed: ['C', 'Networking', 'Machine Learning']
  },
  {
    id: 'proj9',
    name: 'Bot Chess',
    description: 'A frontend for a chess bot built as a school project.',
    githubUrl: 'https://github.com/JoeyRubas/CS4640Proj',
    liveUrl: '',
    projectMaturity: 1,
    showNumberCommits: false,
    skillsUsed: ['PHP', 'JavaScript', 'HTML', 'CSS']
  },
  {
    id: 'proj10',
    name: 'Tech Committee Blog',
    description: 'A recently started homepage for APDA technical writeups.',
    githubUrl: 'https://github.com/APDA-Tech-Committee/apda-committee-blog',
    liveUrl: '',
    projectMaturity: 6,
    showNumberCommits: true,
    skillsUsed: ['Vue', 'TypeScript', 'CSS','CI/CD', "express.js", 'Google Cloud']
  },
  {
    id: 'proj11',
    name: 'Schedule Share',
    description: 'My first site with real users: a now defunct Flask app for aggregating highschool schedules.',
    githubUrl: 'https://github.com/JoeyRubas/Schedule-Share',
    liveUrl: '',
    projectMaturity: 2,
    showNumberCommits: false,
    skillsUsed: ['Python', 'Flask', 'HTML', 'CSS', 'JavaScript', 'Heroku', "MongoDB"]
  },
  {
    id: 'proj13',
    name: 'APDA Vesting',
    description: 'A week long pop-up app letting ~100 users manage a fake portfolio by "voting" on buys and sells.',
    githubUrl: 'https://github.com/JoeyRubas/apdavesting',
    liveUrl: '',
    projectMaturity: 2,
    showNumberCommits: false,
    skillsUsed: ['Python', 'Django', 'HTML', 'CSS', 'JavaScript']
  },
];

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

// Removed duplicate mockProjects and generateProjectId definitions

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockApi = {
  getSkills: async (): Promise<Skill[]> => {
    await delay(300); // Simulate network delay
    return [...mockSkills];
  },

  getProjects: async (): Promise<Project[]> => {
    return [...mockProjects];
  },
  getProject: async (id: string): Promise<Project> => {
    const project = mockProjects.find(p => p.id === id);
    if (!project) {
      throw new Error(`Project with id ${id} not found`);
    }
    return { ...project };
  },
  createProject: async (project: Project): Promise<Project> => {
    const newProject = {
      ...project,
      id: `proj${mockProjects.length + 1}`
    };
    mockProjects.push(newProject);
    return { ...newProject };
  },
  editProject: async (project: Project): Promise<Project> => {
    await delay(300);
    const index = mockProjects.findIndex(p => p.id === project.id);
    if (index === -1) {
      throw new Error(`Project with id ${project.id} not found`);
    }
    mockProjects[index] = { ...project };
    return { ...project };
  },
  deleteProject: async (id: string): Promise<boolean> => {
    await delay(300);
    const index = mockProjects.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error(`Project with id ${id} not found`);
    }
    mockProjects.splice(index, 1);
    return true;
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
