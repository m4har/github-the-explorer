import type {
  GitHubRepository,
  GitHubSearchResponse,
  GitHubUser,
} from "./types";

const GITHUB_API_BASE = "https://api.github.com";

export class GitHubAPIError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = "GitHubAPIError";
  }
}

export async function searchUsers(query: string): Promise<GitHubUser[]> {
  if (!query.trim()) {
    return [];
  }

  try {
    const response = await fetch(
      `${GITHUB_API_BASE}/search/users?q=${encodeURIComponent(
        query
      )}&per_page=5`
    );

    if (!response.ok) {
      if (response.status === 403) {
        throw new GitHubAPIError(
          "API rate limit exceeded. Please try again later.",
          403
        );
      }
      throw new GitHubAPIError(
        `Search failed: ${response.statusText}`,
        response.status
      );
    }

    const data: GitHubSearchResponse = await response.json();
    return data.items;
  } catch (error) {
    if (error instanceof GitHubAPIError) {
      throw error;
    }
    throw new GitHubAPIError("Network error. Please check your connection.");
  }
}

export async function getUserRepositories(
  username: string
): Promise<GitHubRepository[]> {
  try {
    const response = await fetch(
      `${GITHUB_API_BASE}/users/${encodeURIComponent(
        username
      )}/repos?sort=updated&per_page=100`
    );

    if (!response.ok) {
      if (response.status === 404) {
        throw new GitHubAPIError("User not found.", 404);
      }
      if (response.status === 403) {
        throw new GitHubAPIError(
          "API rate limit exceeded. Please try again later.",
          403
        );
      }
      throw new GitHubAPIError(
        `Failed to fetch repositories: ${response.statusText}`,
        response.status
      );
    }

    const data: GitHubRepository[] = await response.json();
    return data;
  } catch (error) {
    if (error instanceof GitHubAPIError) {
      throw error;
    }
    throw new GitHubAPIError("Network error. Please check your connection.");
  }
}
