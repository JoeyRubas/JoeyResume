import { Skill } from '../types/skill';
import { Project } from '../types/project';
import { mockApi, mockProjects } from './mockData';

const apiUrl = import.meta.env.VITE_API_URL || 'https://wapp-joeytest2321.azurewebsites.net';
const useMockData = import.meta.env.VITE_USE_MOCK_DATA === 'true';

const shouldUseMockData = useMockData || !apiUrl;

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

  getProjects: async (): Promise<Array<Project>> => {
      return await mockApi.getProjects();
  },

  getProject: async (id: string): Promise<Project> => {
      return await mockApi.getProject(id);
  },

}

export default apiService;
