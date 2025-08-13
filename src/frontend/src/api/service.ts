import { Skill } from '../types/skill';
import { mockApi } from './mockData';

const apiUrl = import.meta.env.VITE_API_URL;
const useMockData = import.meta.env.VITE_USE_MOCK_DATA === 'true';

// Use mock data in development when VITE_USE_MOCK_DATA is true
const apiService = useMockData ? mockApi : {
  getSkills: async (): Promise<Array<Skill>> => {
    const response = await fetch(`${apiUrl}/skill`);
    const skills = await response.json();
    return skills;
  },

  // Get a single skill by ID
  getSkill: async (id: string): Promise<Skill> => {
    const response = await fetch(`${apiUrl}/skill/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch skill: ${response.statusText}`);
    }
    return await response.json();
  },

  // Create a new skill
  createSkill: async (skill: Skill): Promise<Skill> => {
    const response = await fetch(`${apiUrl}/skill`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(skill),
    });
    if (!response.ok) {
      throw new Error(`Failed to create skill: ${response.statusText}`);
    }
    return await response.json();
  },

  // Update an existing skill
  editSkill: async (skill: Skill): Promise<Skill> => {
    const response = await fetch(`${apiUrl}/skill/${skill.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(skill),
    });
    if (!response.ok) {
      throw new Error(`Failed to update skill: ${response.statusText}`);
    }
    return await response.json();
  },

  // Delete a skill
  deleteSkill: async (id: string): Promise<boolean | any> => {
    const response = await fetch(`${apiUrl}/skill/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Failed to delete skill: ${response.statusText}`);
    }
    return Promise.resolve();
  },
};

export default apiService;
