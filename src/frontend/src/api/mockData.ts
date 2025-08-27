
import { Skill, SkillLevel } from '../types/skill';
import { Project, ProjectStatus } from '../types/project';


function generateProjectId(): string {
  return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
}

export const mockProjects: Project[] = [
  {
    id: 'proj1',
    name: 'Personal Website',
    description: 'The website you\'re viewing right now!',
    longDescription: 'A comprehensive personal portfolio website built with modern web technologies. This project showcases my skills, projects, and professional experience in an interactive and responsive format. The site features exciting modern design with react and github GraphQL integration.',
    githubUrl: 'https://github.com/joeyrubas/personal-website',
    liveUrl: 'https://joeyrubas.com',
    projectMaturity: 6,
    showNumberCommits: true,
    skillsUsed: ['React', 'TypeScript', 'CSS', 'Vite', 'Azure','CI/CD', 'DotNET'],
    startDate: '2024-01-15',
    status: ProjectStatus.InProgress,
    role: 'Full Stack Developer',
    teamSize: 1,
    keyFeatures: [
      'Responsive design that works on all devices',
      'Dynamic skill and project management',
      'Integration with GitHub API for live statistics',
      'Automated CI/CD pipeline'
    ],
    challengesFaced: [
      'Implementing responsive design across all components',
      'Setting up efficient state management',
      'Integrating multiple data sources',
      'Optimizing performance for fast loading'
    ],
    lessonsLearned: [
      'Advanced React patterns and TypeScript integration',
      'Modern CSS techniques and responsive design',
      'API design and integration best practices',
      'Deployment and DevOps fundamentals'
    ]
  },
  {
    id: 'proj2',
    name: 'APDA Home Website',
    description: 'A wordpress site managed with custom stylings and CI/CD.',
    longDescription: 'The official website for the American Parliamentary Debate Association, built on WordPress with extensive customizations. This project involved creating a professional web presence for a national organization with hundreds of active members.',
    liveUrl: 'https://apda.online',
    projectMaturity: 7,
    showNumberCommits: false,
    skillsUsed: ["CSS", "Linode", "WordPress", "PHP"],
    startDate: '2024-03-10',
    status: ProjectStatus.Maintenance,
    role: 'Web Developer & System Administrator',
    teamSize: 1,
    keyFeatures: [
      'Custom WordPress theme development',
      'Member registration and posting forum',
      'Event calendar and blog posts',
      'Mobile-responsive design',
    ],
    challengesFaced: [
      'Working within WordPress limitations',
      'Managing content from multiple contributors',
      'Ensuring site security and performance',
      'Creating a cohesive brand experience'
    ],
    lessonsLearned: [
      'WordPress theme development and customization',
      'Content management system best practices',
      'Server administration and hosting management',
      'Working with stakeholders and content creators'
    ]
  },
  {
    id: 'proj3',
    name: 'APDA Standings',
    description: 'Displays the current standings of the American Parliamentary Debate Association.',
    longDescription: 'A comprehensive tournament results and standings tracking system for the American Parliamentary Debate Association. This application processes tournament data and displays real-time rankings for debaters across the country.',
    githubUrl: 'https://github.com/APDA-Tech-Committee/black-rod',
    liveUrl: 'https://results.apda.online',
    projectMaturity: 9,
    showNumberCommits: true,
    skillsUsed: ['Python', 'Django', 'HTML', 'CSS', 'JavaScript','CI/CD', 'SQL'],
    startDate: '2022-08-01',
    status: ProjectStatus.Completed,
    role: 'Lead Backend Developer',
    teamSize: 3,
    keyFeatures: [
      'Real-time tournament result processing',
      'Data visualization and analytics',
      'Tournament director dashboard',
      'Automated data validation'
    ],
    challengesFaced: [
      'Handling large datasets efficiently',
      'Managing cacheing for fast load times',
      'Modernizing UI and CI/CD approach',
      'Ensuring data accuracy and consistency'
    ],
    lessonsLearned: [
      'Django framework and Python web development',
      'Database design and optimization',
      'Algorithm design and implementation',
      'Project management and team collaboration'
    ]
  },
  {
    id: 'proj4',
    name: 'Mit-Tab',
    description: 'A debate tabulation tool with thousands of users.',
    longDescription: 'A sophisticated tournament tabulation system used by debate tournaments worldwide. This open-source project handles complex tournament logistics including pairing, judging assignments, and result calculation for various debate formats.',
    githubUrl: 'https://github.com/MIT-Tab/mit-tab',
    liveUrl: 'https://nu-tab.com',
    projectMaturity: 9,
    showNumberCommits: false,
    skillsUsed: ['Python', 'Django', 'JavaScript', 'HTML', 'CSS', 'Digital Ocean', 'Docker', 'CI/CD'],
    startDate: '2021-09-15',
    status: ProjectStatus.Maintenance,
    role: 'Core Contributor & Maintainer',
    teamSize: 5,
    keyFeatures: [
      'Multi-format tournament support',
      'Automated pairing algorithms',
      'Real-time result tracking',
      'Judge assignment optimization',
      'Comprehensive reporting system'
    ],
    challengesFaced: [
      'Maintaining legacy codebase',
      'Scaling for large tournaments',
      'Coordinating with distributed team',
      'Balancing feature requests with stability'
    ],
    lessonsLearned: [
      'Open source project maintenance',
      'Legacy code refactoring techniques',
      'Community management and collaboration',
      'Production system monitoring and debugging'
    ]
  },
  {
    id: 'proj5',
    name: 'Nu-Tab Deployer',
    description: 'An automated deployment tool for Mit-Tab.',
    longDescription: 'A specialized deployment and management tool designed to simplify the process of setting up Mit-Tab instances for tournament directors. This tool automates the complex process of environment setup, configuration, and deployment.',
    githubUrl: 'https://github.com/joeyrubas/nu-tab-deployer',
    liveUrl: '',
    projectMaturity: 6,
    showNumberCommits: true,
    skillsUsed: ['Python', 'Django', 'JavaScript', 'HTML', 'CSS', 'Digital Ocean', 'Docker', 'CI/CD'],
    startDate: '2023-01-10',
    status: ProjectStatus.InProgress,
    role: 'Solo Developer',
    teamSize: 1,
    keyFeatures: [
      'One-click Mit-Tab deployment',
      'Environment configuration management',
      'Automated backup systems',
      'Resource monitoring and scaling',
      'User-friendly admin interface'
    ],
    challengesFaced: [
      'Creating reliable automation scripts',
      'Managing multiple deployment environments',
      'Ensuring security across deployments',
      'Building intuitive user interfaces for complex operations'
    ],
    lessonsLearned: [
      'DevOps and deployment automation',
      'Infrastructure as Code principles',
      'Security best practices for automated systems',
      'User experience design for technical tools'
    ]
  },

  {
    id: 'proj6',
    name: 'Rubik\'s Cube Solver',
    description: 'An implementation of group theory based algorithms for solving rubik\'s cube.',
    longDescription: 'A mathematical approach to solving Rubik\'s cubes using group theory principles. This project implements various solving algorithms and provides educational insights into the mathematical foundations of cube solving.',
    githubUrl: 'https://github.com/JoeyRubas/rubiks',
    liveUrl: '',
    projectMaturity: 3,
    showNumberCommits: true,
    skillsUsed: ['Python'],
    startDate: '2023-05-01',
    endDate: '2023-07-15',
    status: ProjectStatus.Completed,
    role: 'Solo Developer',
    teamSize: 1,
    keyFeatures: [
      'Multiple solving algorithms implementation',
      'Visual cube representation',
      'Step-by-step solution display',
      'Performance optimization'
    ],
    challengesFaced: [
      'Understanding complex group theory concepts',
      'Optimizing algorithm performance',
      'Creating intuitive visualization'
    ],
    lessonsLearned: [
      'Advanced mathematical programming',
      'Algorithm optimization techniques',
      'Educational software design'
    ]
  },
  {
    id: 'proj7',
    name: 'StockBot10000',
    description: 'A school project testing LLMs for stock trading.',
    longDescription: 'An experimental trading bot that uses Large Language Models to analyze market sentiment and make trading decisions. This project explores the intersection of AI and financial markets.',
    githubUrl: 'https://github.com/JoeyRubas/StockBot10000',
    liveUrl: '',
    projectMaturity: 4,
    showNumberCommits: false,
    skillsUsed: ['Python', 'Django', 'HTML', 'CSS', 'Machine Learning'],
    startDate: '2024-02-01',
    endDate: '2024-05-15',
    status: ProjectStatus.Completed,
    role: 'Machine Learning Engineer',
    teamSize: 2,
    keyFeatures: [
      'LLM integration for market analysis',
      'Real-time stock data processing',
      'Trading strategy backtesting',
      'Performance analytics dashboard'
    ],
    challengesFaced: [
      'Integrating LLMs with financial data',
      'Handling real-time data streams',
      'Creating robust trading strategies'
    ],
    lessonsLearned: [
      'Machine learning in finance applications',
      'Real-time data processing',
      'Risk management in automated trading'
    ]
  },
  {
    id: 'proj8',
    name: 'From Scratch Sandbox',
    description: 'A homeplace for low-level implementations of foundational algorithms like JPG compression, TCP or executing LLMs from weights.',
    longDescription: 'A collection of low-level implementations of fundamental computer science algorithms and protocols. This educational project focuses on understanding core concepts by building them from scratch.',
    githubUrl: 'https://github.com/JoeyRubas/from-scratch-sandbox',
    liveUrl: '',
    projectMaturity: 1,
    showNumberCommits: true,
    skillsUsed: ['C', 'Networking', 'Machine Learning'],
    startDate: '2024-06-01',
    status: ProjectStatus.InProgress,
    role: 'Research Developer',
    teamSize: 1,
    keyFeatures: [
      'JPG compression algorithm implementation',
      'TCP protocol from scratch',
      'LLM inference engine',
      'Educational documentation'
    ],
    challengesFaced: [
      'Understanding low-level protocol details',
      'Optimizing performance in C',
      'Documenting complex algorithms'
    ],
    lessonsLearned: [
      'Low-level systems programming',
      'Network protocol implementation',
      'Algorithm design and optimization'
    ]
  },
  {
    id: 'proj9',
    name: 'Bot Chess',
    description: 'A frontend for a chess bot built as a school project.',
    longDescription: 'A web-based chess game interface that connects to a chess engine backend. This project demonstrates game development concepts and AI integration in web applications.',
    githubUrl: 'https://github.com/JoeyRubas/CS4640Proj',
    liveUrl: '',
    projectMaturity: 1,
    showNumberCommits: false,
    skillsUsed: ['PHP', 'JavaScript', 'HTML', 'CSS'],
    startDate: '2022-01-15',
    endDate: '2022-04-30',
    status: ProjectStatus.Completed,
    role: 'Frontend Developer',
    teamSize: 3,
    keyFeatures: [
      'Interactive chess board interface',
      'AI opponent integration',
      'Game state management',
      'Move validation system'
    ],
    challengesFaced: [
      'Creating responsive game interface',
      'Integrating with chess engine',
      'Implementing game logic validation'
    ],
    lessonsLearned: [
      'Game development fundamentals',
      'Frontend-backend integration',
      'User interface design for games'
    ]
  },
  {
    id: 'proj10',
    name: 'Tech Committee Blog',
    description: 'A recently started homepage for APDA technical writeups.',
    longDescription: 'A technical blog platform for the APDA Tech Committee to share knowledge, tutorials, and project updates. Features modern web technologies and a focus on developer experience.',
    githubUrl: 'https://github.com/APDA-Tech-Committee/apda-committee-blog',
    liveUrl: '',
    projectMaturity: 6,
    showNumberCommits: true,
    skillsUsed: ['Vue', 'TypeScript', 'CSS','CI/CD', "express.js", 'Google Cloud'],
    startDate: '2024-01-01',
    status: ProjectStatus.InProgress,
    role: 'Technical Lead',
    teamSize: 4,
    keyFeatures: [
      'Modern blog interface with Vue.js',
      'TypeScript for type safety',
      'Automated deployment pipeline',
      'Content management system',
      'SEO optimization'
    ],
    challengesFaced: [
      'Coordinating team development',
      'Setting up efficient CI/CD',
      'Creating scalable content architecture'
    ],
    lessonsLearned: [
      'Vue.js framework and ecosystem',
      'Team leadership and coordination',
      'Content management best practices'
    ]
  },
  {
    id: 'proj11',
    name: 'Schedule Share',
    description: 'My first site with real users: a now defunct Flask app for aggregating highschool schedules.',
    longDescription: 'My first web application that gained real user traction. A schedule sharing platform for high school students to coordinate and compare their class schedules with friends.',
    githubUrl: 'https://github.com/JoeyRubas/Schedule-Share',
    liveUrl: '',
    projectMaturity: 2,
    showNumberCommits: false,
    skillsUsed: ['Python', 'Flask', 'HTML', 'CSS', 'JavaScript', 'Heroku', "MongoDB"],
    startDate: '2019-08-01',
    endDate: '2020-06-30',
    status: ProjectStatus.Archived,
    role: 'Solo Developer',
    teamSize: 1,
    keyFeatures: [
      'User registration and authentication',
      'Schedule input and visualization',
      'Friend connections and sharing',
      'Mobile-responsive design'
    ],
    challengesFaced: [
      'First experience with web frameworks',
      'User authentication and security',
      'Database design and optimization',
      'Handling real user feedback'
    ],
    lessonsLearned: [
      'Full-stack web development basics',
      'User experience design principles',
      'Database management and design',
      'Product development lifecycle'
    ]
  },
  {
    id: 'proj13',
    name: 'APDA Vesting',
    description: 'A week long pop-up app letting ~100 users manage a fake portfolio by "voting" on buys and sells.',
    longDescription: 'A gamified investment simulation platform created for a week-long APDA event. Users could create virtual portfolios and vote on investment decisions in a social trading environment.',
    githubUrl: 'https://github.com/JoeyRubas/apdavesting',
    liveUrl: '',
    projectMaturity: 2,
    showNumberCommits: false,
    skillsUsed: ['Python', 'Django', 'HTML', 'CSS', 'JavaScript'],
    startDate: '2023-10-01',
    endDate: '2023-10-08',
    status: ProjectStatus.Completed,
    role: 'Full Stack Developer',
    teamSize: 1,
    keyFeatures: [
      'Real-time voting system',
      'Portfolio tracking and analytics',
      'Social features and leaderboards',
      'Mobile-optimized interface'
    ],
    challengesFaced: [
      'Rapid development timeline (one week)',
      'Real-time user interactions',
      'Scaling for concurrent users',
      'Creating engaging gamification'
    ],
    lessonsLearned: [
      'Rapid prototyping and development',
      'Real-time web application features',
      'User engagement and gamification',
      'Performance optimization under pressure'
    ]
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
    hoursExperience: 2000,
    canTrackInGitHub: true
  },
  {
    id: generateId(),
    name: 'Django',
    description: 'I have 3 years of experience building web applications with Django',
    skillLevel: SkillLevel.Intermediate,
    hoursExperience: 800,
    canTrackInGitHub: true
  },
  {
    id: generateId(),
    name: 'HTML',
    description: 'I have 5 years of experience creating web markup and structures',
    skillLevel: SkillLevel.Intermediate,
    hoursExperience: 1000,
    canTrackInGitHub: true
  },
  {
    id: generateId(),
    name: 'CSS',
    description: 'I have 5 years of experience styling web applications and creating responsive designs',
    skillLevel: SkillLevel.Intermediate,
    hoursExperience: 1000,
    canTrackInGitHub: true
  },
  {
    id: generateId(),
    name: 'JavaScript',
    description: 'I have 4 years of experience with JavaScript for frontend and backend development',
    skillLevel: SkillLevel.Intermediate,
    hoursExperience: 900,
    canTrackInGitHub: true
  },
  {
    id: generateId(),
    name: 'TypeScript',
    description: 'I have medium experience with TypeScript for type-safe JavaScript development',
    skillLevel: SkillLevel.Intermediate,
    hoursExperience: 400,
    canTrackInGitHub: true
  },
  {
    id: generateId(),
    name: 'React',
    description: ",I'm new to React but excited to build modern user interfaces",
    skillLevel: SkillLevel.Basic,
    hoursExperience: 100,
    canTrackInGitHub: true
  },
  {
    id: generateId(),
    name: 'Vue',
    description: "I'm new to Vue.js and learning this progressive framework",
    skillLevel: SkillLevel.Basic,
    hoursExperience: 80,
    canTrackInGitHub: true
  },
  {
    id: generateId(),
    name: 'Express.js',
    description: "I'm new to Express.js for building Node.js web applications",
    skillLevel: SkillLevel.Basic,
    hoursExperience: 120,
    canTrackInGitHub: true
  },
  {
    id: generateId(),
    name: 'Azure',
    description: "I have medium experience with Microsoft Azure cloud services",
    skillLevel: SkillLevel.Intermediate,
    hoursExperience: 400,
    canTrackInGitHub: false
  },
  {
    id: generateId(),
    name: 'Digital Ocean',
    description: "I have medium experience with Digital Ocean cloud infrastructure",
    skillLevel: SkillLevel.Intermediate,
    hoursExperience: 300,
    canTrackInGitHub: false
  },
  {
    id: generateId(),
    name: 'Linode',
    description: "I have medium experience with Linode cloud hosting services",
    skillLevel: SkillLevel.Intermediate,
    hoursExperience: 400,
    canTrackInGitHub: false
  },
  {
    id: generateId(),
    name: 'AWS',
    description: "I have novice experience with Amazon Web Services",
    skillLevel: SkillLevel.Novice,
    hoursExperience: 20,
    canTrackInGitHub: false
  },
  {
    id: generateId(),
    name: 'Google Cloud',
    description: "I have novice experience with Google Cloud Platform",
    skillLevel: SkillLevel.Novice,
    hoursExperience: 20,
    canTrackInGitHub: false
  },
  {
    id: generateId(),
    name: 'CI/CD',
    description: "I have medium experience with continuous integration and deployment pipelines",
    skillLevel: SkillLevel.Intermediate,
    hoursExperience: 400,
    canTrackInGitHub: true
  },
  {
    id: generateId(),
    name: 'Infrastructure as Code',
    description: "I have medium experience with infrastructure automation and provisioning",
    skillLevel: SkillLevel.Intermediate,
    hoursExperience: 250,
    canTrackInGitHub: true
  },
  {
    id: generateId(),
    name: 'C#',
    description: "I have medium experience with C# and .NET development",
    skillLevel: SkillLevel.Intermediate,
    hoursExperience: 500,
    canTrackInGitHub: true
  },
  {
    id: generateId(),
    name: '.NET',
    description: "I have medium experience with the .NET framework and ecosystem",
    skillLevel: SkillLevel.Intermediate,
    hoursExperience: 500,
    canTrackInGitHub: true
  },
  {
    id: generateId(),
    name: 'Java',
    description: "I have medium experience with Java programming and enterprise development",
    skillLevel: SkillLevel.Intermediate,
    hoursExperience: 600,
    canTrackInGitHub: true
  },
  {
    id: generateId(),
    name: 'Docker',
    description: "I have medium experience with containerization and Docker deployment",
    skillLevel: SkillLevel.Intermediate,
    hoursExperience: 150,
    canTrackInGitHub: false
  },
  {
    id: generateId(),
    name: 'GitHub Actions',
    description: "I have medium experience with GitHub Actions for CI/CD workflows",
    skillLevel: SkillLevel.Intermediate,
    hoursExperience: 100,
    canTrackInGitHub: true
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
