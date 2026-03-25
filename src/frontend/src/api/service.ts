import { Skill } from '../types/skill';
import { Project } from '../types/project';
import { mockApi } from './mockData';

const apiService = {
  getSkills: (): Promise<Array<Skill>> => mockApi.getSkills(),
  getSkill: (id: string): Promise<Skill> => mockApi.getSkill(id),
  getProjects: (): Promise<Array<Project>> => mockApi.getProjects(),
  getProject: (id: string): Promise<Project> => mockApi.getProject(id),
};

export default apiService;
