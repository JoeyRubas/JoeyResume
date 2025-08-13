import { FileRoutesByPath } from "@tanstack/react-router";

export type InstructionTopic = {
  name: string; //HTML, CSS, JavaScript, etc.
  listType: InstructionListType;
  instructions: Array<string>;
  topicGoalImgSrc?: string;
}

export type InstructionConfig = {
    heading: string;
    goalImgSrc?: string;
    topics: Array<InstructionTopic>;
}

export type ProfileInstructionsConfig = Record<keyof FileRoutesByPath, InstructionConfig>;

export enum ProfileRoutes {
    Home = '/',
    Hobbies = '/hobbies',
    Skills = '/skills',
}

export enum InstructionListType {
    Bulleted = 'bulleted',
    Numbered = 'numbered',
}
