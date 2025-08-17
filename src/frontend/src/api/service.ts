import { Skill } from '../types/skill';
import { mockApi } from './mockData';

const apiUrl = import.meta.env.VITE_API_URL;
const useMockData = import.meta.env.VITE_USE_MOCK_DATA === 'true';

// If no API URL is configured, always use mock data
const shouldUseMockData = useMockData || !apiUrl;

console.log('API Configuration:', { 
  apiUrl, 
  useMockData, 
  shouldUseMockData,
  environment: import.meta.env.MODE 
});

// Use mock data in development when VITE_USE_MOCK_DATA is true OR when no API URL is set
const apiService = shouldUseMockData ? mockApi : {
  getSkills: async (): Promise<Array<Skill>> => {
    try {
      const response = await fetch(`${apiUrl}/skill`, {
        credentials: 'include'
      });
      
      // Check if response is actually JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        console.warn('API returned non-JSON response, falling back to mock data');
        return mockApi.getSkills();
      }
      
      if (!response.ok) {
        console.warn(`API returned ${response.status}, falling back to mock data`);
        return mockApi.getSkills();
      }
      
      const skills = await response.json();
      return skills;
    } catch (error) {
      console.warn('API request failed, falling back to mock data:', error);
      return mockApi.getSkills();
    }
  },

  // Get a single skill by ID
  getSkill: async (id: string): Promise<Skill> => {
    try {
      const response = await fetch(`${apiUrl}/skill/${id}`, {
        credentials: 'include'
      });
      
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        console.warn('API returned non-JSON response, falling back to mock data');
        return mockApi.getSkill(id);
      }
      
      if (!response.ok) {
        console.warn(`API returned ${response.status}, falling back to mock data`);
        return mockApi.getSkill(id);
      }
      
      return await response.json();
    } catch (error) {
      console.warn('API request failed, falling back to mock data:', error);
      return mockApi.getSkill(id);
    }
  },

  // Create a new skill
  createSkill: async (skill: Skill): Promise<Skill> => {
    try {
      const response = await fetch(`${apiUrl}/skill`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(skill),
      });
      
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Unauthorized - please log in first');
        }
        throw new Error(`Failed to create skill: ${response.statusText}`);
      }
      
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Server returned invalid response format');
      }
      
      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Network error - unable to create skill');
    }
  },

    // Update an existing skill
  editSkill: async (skill: Skill): Promise<Skill> => {
    const response = await fetch(`${apiUrl}/skill/${skill.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
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
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error(`Failed to delete skill: ${response.statusText}`);
    }
    return Promise.resolve();
  },
};

export default apiService;
