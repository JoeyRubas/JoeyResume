import { Project } from '../types/project';

function generateProjectId(): string {
  return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
}

export const projectsData: Project[] = [
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