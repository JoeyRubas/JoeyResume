export interface GitHubLanguageStats {
  date: string;
  additions: number;
  deletions: number;
}

class GitHubService {
  // Backend API URL - adjust if your backend runs on a different port or path
  private readonly apiBaseUrl: string;
  private readonly MAX_LINES_PER_COMMIT = 2500;
  
  constructor() {
    const apiUrl = import.meta.env.VITE_API_URL || 'https://wapp-joeytest2321.azurewebsites.net';
    this.apiBaseUrl = `${apiUrl}/api/github`;
  }
  
  async getLanguageStats(languageName: string, gitHubAlias?: string): Promise<GitHubLanguageStats[]> {
    try {
      let url = `${this.apiBaseUrl}/language-stats/${encodeURIComponent(languageName)}`;
      
      // Add alias as query parameter if provided
      if (gitHubAlias) {
        url += `?alias=${encodeURIComponent(gitHubAlias)}`;
      }
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch language stats: ${response.statusText}`);
      }
      
      const stats = await response.json();
      return stats.map((stat: any) => ({
        date: stat.date,
        additions: stat.additions,
        deletions: stat.deletions
      }));
    } catch (error) {
      console.error('Error fetching GitHub language stats from backend:', error);
      return [];
    }
  }
  
  // The GitHub API handling is now done on the backend
  // Frontend only needs to fetch the processed data
}

export const githubService = new GitHubService();
