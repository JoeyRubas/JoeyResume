export type Project = {
    // Data Variables
    id: string;
    name: string;
    description: string;
    githubUrl?: string;
    liveUrl?: string;


    projectMaturity : number; 


    showNumberCommits?: boolean;
    skillsUsed: string[]; 

}


