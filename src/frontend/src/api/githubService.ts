export interface GitHubLanguageStats {
  date: string;
  totalLines: number;
}

class GitHubService {
  private readonly baseUrl = 'https://api.github.com';
  private readonly username = 'JoeyRubas';
  private readonly token = import.meta.env.VITE_GITHUB_TOKEN;
  private readonly MAX_LINES_PER_COMMIT = 2500;
  
  async getLanguageStats(languageName: string): Promise<GitHubLanguageStats[]> {
    try {
      const repos = await this.getUserRepositories();
      const allStats: GitHubLanguageStats[] = [];
      
      for (const repo of repos) {
        const repoStats = await this.getRepositoryLanguageStats(repo.name, languageName);
        allStats.push(...repoStats);
      }

      return this.makeCumulative(allStats);
    } catch (error) {
      console.error('Error fetching GitHub language stats:', error);
      return [];
    }
  }
  
  private async getUserRepositories(): Promise<any[]> {
    const headers: any = { 'Accept': 'application/vnd.github.v3+json' };
    if (this.token) headers['Authorization'] = `token ${this.token}`;
    
    const response = await fetch(`${this.baseUrl}/users/${this.username}/repos?per_page=100`, { headers });
    return response.ok ? response.json() : [];
  }
  
  private async getRepositoryLanguageStats(repoName: string, languageName: string): Promise<GitHubLanguageStats[]> {
    try {
      const headers: any = { 'Accept': 'application/vnd.github.v3+json' };
      if (this.token) headers['Authorization'] = `token ${this.token}`;
      
      // Get language bytes for this repo
      const languagesResponse = await fetch(`${this.baseUrl}/repos/${this.username}/${repoName}/languages`, { headers });
      if (!languagesResponse.ok) return [];
      
      const languages = await languagesResponse.json();
      const languageKey = Object.keys(languages).find(lang => lang.toLowerCase() === languageName.toLowerCase());
      if (!languageKey) return [];
      
      // Get commits
      const commitsResponse = await fetch(`${this.baseUrl}/repos/${this.username}/${repoName}/commits?per_page=100`, { headers });
      if (!commitsResponse.ok) return [];
      
      const commits = await commitsResponse.json();
      const totalLines = Math.round(languages[languageKey] / 50); // Estimate lines from bytes
      
      // Create stats for each commit
      return commits
        .sort((a: any, b: any) => new Date(a.commit.author.date).getTime() - new Date(b.commit.author.date).getTime())
        .map((commit: any, index: number) => ({
          date: commit.commit.author.date.split('T')[0],
          totalLines: Math.floor(totalLines * ((index + 1) / commits.length))
        }));
    } catch {
      return [];
    }
  }
  
  private makeCumulative(stats: GitHubLanguageStats[]): GitHubLanguageStats[] {
    const sorted = stats.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    let cumulative = 0;
    
    return sorted.map(stat => {
      const increment = Math.min(stat.totalLines - cumulative, this.MAX_LINES_PER_COMMIT);
      cumulative += Math.max(increment, 0);
      return { date: stat.date, totalLines: cumulative };
    });
  }
}

export const githubService = new GitHubService();
