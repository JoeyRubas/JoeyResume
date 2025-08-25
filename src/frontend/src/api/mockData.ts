import { Skill } from '../types/skill';
import { Project } from '../types/project';
import { skillsData } from '../data/skills';
import { projectsData } from '../data/projects';

export const mockProjects: Project[] = [...projectsData];
export const mockSkills: Skill[] = [...skillsData];

// Mock API functions for managing skills and projects
export const mockApi = {
  getSkills: (): Promise<Skill[]> => {
    return Promise.resolve(mockSkills);
  },
  
  getSkill: (id: string): Skill | undefined => {
    return mockSkills.find(s => s.id === id);
  },
  
  createSkill: (skill: Omit<Skill, 'id'>): boolean => {
    const newSkill = { ...skill, id: Math.random().toString(36).substr(2, 9) };
    mockSkills.push(newSkill);
    return true;
  },
  
  updateSkill: (id: string, skill: Partial<Skill>): boolean => {
    const index = mockSkills.findIndex(s => s.id === id);
    if (index !== -1) {
      mockSkills[index] = { ...mockSkills[index], ...skill };
      return true;
    }
    return false;
  },
  
  editSkill: (skill: Skill): boolean => {
    const index = mockSkills.findIndex(s => s.id === skill.id);
    if (index !== -1) {
      mockSkills[index] = skill;
      return true;
    }
    return false;
  },
  
  deleteSkill: (id: string): boolean => {
    const index = mockSkills.findIndex(s => s.id === id);
    if (index !== -1) {
      mockSkills.splice(index, 1);
      return true;
    }
    return false;
  },
  
  getProjects: (): Project[] => {
    return mockProjects;
  }
};