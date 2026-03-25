export interface GitHubLanguageStats {
  date: string;
  additions: number;
  deletions: number;
}

type StatsCache = Record<string, GitHubLanguageStats[]>;

let cachedData: StatsCache | null = null;

async function loadStats(): Promise<StatsCache> {
  if (cachedData) return cachedData;
  try {
    const response = await fetch('/data/github-stats.json');
    if (!response.ok) return {};
    cachedData = await response.json();
    return cachedData!;
  } catch {
    return {};
  }
}

class GitHubService {
  async getLanguageStats(languageName: string, gitHubAlias?: string): Promise<GitHubLanguageStats[]> {
    const data = await loadStats();
    const key = gitHubAlias || languageName;
    return data[key] ?? [];
  }
}

export const githubService = new GitHubService();
