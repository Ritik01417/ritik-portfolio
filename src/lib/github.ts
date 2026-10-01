export type GitHubRepository = {
  id: number;
  name: string;
  html_url: string;
  homepage: string | null;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
  archived: boolean;
  topics: string[];
  pushed_at: string;
};

const GITHUB_USERNAME = "Ritik01417";

export async function getPublicRepositories(): Promise<GitHubRepository[]> {
  try {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?type=owner&sort=updated&direction=desc&per_page=100`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
        },
        next: { revalidate: 3600 },
      },
    );

    if (!response.ok) return [];

    const repositories = (await response.json()) as GitHubRepository[];

    return repositories
      .filter((repository) => !repository.fork && !repository.archived)
      .sort((a, b) => {
        const popularity = b.stargazers_count - a.stargazers_count;
        return popularity || Date.parse(b.pushed_at) - Date.parse(a.pushed_at);
      })
      .slice(0, 6);
  } catch {
    return [];
  }
}

export const githubProfileUrl = `https://github.com/${GITHUB_USERNAME}`;
