export interface GitHubLanguageStats {
  date: string;
  additions: number;
  deletions: number;
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
      
      // Use GraphQL to get commit stats in batches
      return await this.getCommitStatsWithGraphQL(repoName);
    } catch {
      return [];
    }
  }

  private async getCommitStatsWithGraphQL(repoName: string): Promise<GitHubLanguageStats[]> {
    if (!this.token) return [];
    
    const query = `
      query($owner: String!, $name: String!, $first: Int!) {
        repository(owner: $owner, name: $name) {
          defaultBranchRef {
            target {
              ... on Commit {
                history(first: $first) {
                  nodes {
                    committedDate
                    additions
                    deletions
                  }
                }
              }
            }
          }
        }
      }
    `;

    try {
      const response = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          variables: {
            owner: this.username,
            name: repoName,
            first: 50 // Get 50 most recent commits
          }
        })
      });

      if (!response.ok) return [];
      
      const data = await response.json();
      const commits = data?.data?.repository?.defaultBranchRef?.target?.history?.nodes || [];
      
      return commits.map((commit: any) => ({
        date: commit.committedDate.split('T')[0],
        additions: commit.additions || 0,
        deletions: commit.deletions || 0
      }));
    } catch {
      return [];
    }
  }
  
  private makeCumulative(stats: GitHubLanguageStats[]): GitHubLanguageStats[] {
    const sorted = stats.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    let cumulativeAdditions = 0;
    let cumulativeDeletions = 0;
    
    return sorted.map(stat => {
      const additionIncrement = Math.min(stat.additions, this.MAX_LINES_PER_COMMIT);
      const deletionIncrement = Math.min(stat.deletions, this.MAX_LINES_PER_COMMIT);
      
      cumulativeAdditions += Math.max(additionIncrement, 0);
      cumulativeDeletions += Math.max(deletionIncrement, 0);
      
      return { 
        date: stat.date, 
        additions: cumulativeAdditions,
        deletions: cumulativeDeletions
      };
    });
  }
}

export const githubService = new GitHubService();
