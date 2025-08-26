export type Skill = {
    id: string;
    name: string;
    description: string;
    hoursExperience: number;
    skillLevel: SkillLevel;
    canTrackInGitHub: boolean;
    gitHubAlias?: string;
}

export enum SkillLevel {
    Basic,
    Novice,
    Intermediate,
    Advanced,
    Expert
}