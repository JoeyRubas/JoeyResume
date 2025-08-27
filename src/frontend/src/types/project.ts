export type Project = {
    // Data Variables
    id: string;
    name: string;
    description: string;
    githubUrl?: string;
    liveUrl?: string;
    projectMaturity: number; 
    showNumberCommits?: boolean;
    skillsUsed: string[];
    
    // Additional detailed fields
    longDescription: string;
    startDate: string;
    endDate?: string;
    status: ProjectStatus;
    role: string;
    teamSize?: number;
    keyFeatures: string[];
    challengesFaced: string[];
    lessonsLearned: string[];
    screenshots?: string[];
}

export enum ProjectStatus {
    InProgress = 'In Progress',
    Completed = 'Completed',
    Maintenance = 'Maintenance',
    Archived = 'Archived'
}


