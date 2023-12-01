// GithubUser.ts
export interface GithubUser {
    avatar_url: string;
    name: string;
    login: string;
    location: string;
    id: number;
    followers: number;
    public_repos: number;
    repos: Array<{
      name: string;
      language: string;
      description: string;
      created_at: string;
      pushed_at: string;
      html_url: string;
    }>;
  }
  