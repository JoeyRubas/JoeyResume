export type Skill = {
    id: string;
    name: string;
    description: string;
    hoursExperience: number;
    skillLevel: SkillLevel
}

export enum SkillLevel {
    Basic,
    Novice,
    Intermediate,
    Advanced,
    Expert
}