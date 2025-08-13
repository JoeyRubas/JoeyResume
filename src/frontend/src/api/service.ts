import { Hobby } from '../types/hobby';
import { Skill } from '../types/skill';

const apiUrl = import.meta.env.VITE_API_URL;

const api = {
  // Get all hobbies
  getHobbies: async () => {
    const response = await fetch(`${apiUrl}/hobby`);
    const hobbies = await response.json();
    return hobbies;
  },

  // Get a single hobby by ID
  getHobby: async (id: string) => {
    const response = await fetch(`${apiUrl}/hobby/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch hobby: ${response.statusText}`);
    }
    return await response.json();
  },

  // Create a new hobby
  createHobby: async (hobby: Hobby): Promise<Hobby> => {
    const response = await fetch(`${apiUrl}/hobby`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(hobby),
    });
    if (!response.ok) {
      throw new Error(`Failed to create hobby: ${response.statusText}`);
    }
    return await response.json();
  },

  // Update an existing hobby
  editHobby: async (hobby: Hobby) => {
    const response = await fetch(`${apiUrl}/hobby/${hobby.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(hobby),
    });
    if (!response.ok) {
      throw new Error(`Failed to update hobby: ${response.statusText}`);
    }
    return await response.json();
  },

  // Delete a hobby
  deleteHobby: async (id: string) => {
    const response = await fetch(`${apiUrl}/hobby/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Failed to delete hobby: ${response.statusText}`);
    }
    return response.status === 204 ? true : response.json();
  },

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

export default api;
