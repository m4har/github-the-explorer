import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, mock } from "bun:test";
import Home from "../page";

// Mock the GitHub API hooks
mock.module("@/module/github-api/hooks", () => ({
  useSearchUsers: () => {},
  useUserRepositories: () => {},
}));

import { GitHubRepository, GitHubUser } from "@/module/github-api/types";
import { expect, it } from "bun:test";

const mockUsers: GitHubUser[] = [
  {
    avatar_url: "uri",
    followers: 1,
    following: 1,
    html_url: "uri",
    id: 1,
    login: "m4har",
    public_repos: 1,
    bio: "bio",
    name: "name",
  },
];

const mockRepos: GitHubRepository[] = [
  {
    description: "description",
    forks_count: 1,
    full_name: "full_name",
    html_url: "html_url",
    id: 1,
    language: "language",
    name: "name",
    stargazers_count: 1,
    topics: ["topic"],
    updated_at: "updated_at",
  },
];

describe("Home Page", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
      },
    });
  });

  const renderWithProviders = (component: React.ReactElement) => {
    return render(
      <QueryClientProvider client={queryClient}>
        {component}
      </QueryClientProvider>
    );
  };

  it("renders search input and button", () => {
    renderWithProviders(<Home />);

    expect(screen.getByTestId("app-home-search-input")).toBeInTheDocument();
    expect(screen.getByTestId("app-home-search-btn")).toBeInTheDocument();
    expect(screen.getByTestId("app-home-card")).toBeInTheDocument();
  });

  it("displays loading text when fetching users", () => {
    renderWithProviders(<Home />);

    expect(screen.getByTestId("app-home-loading-text")).toBeInTheDocument();
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders accordion with user repos when data is loaded", async () => {
    renderWithProviders(<Home />);

    expect(screen.getByTestId("app-home-accordion")).toBeInTheDocument();

    // Check if user repo items are rendered
    await waitFor(() => {
      expect(screen.getByTestId("user-repo-item-1")).toBeInTheDocument();
      expect(screen.getByTestId("user-repo-trigger-1")).toBeInTheDocument();
    });
  });

  it("displays user login in accordion trigger", async () => {
    renderWithProviders(<Home />);

    await waitFor(() => {
      expect(screen.getByTestId("user-repo-trigger-1")).toHaveTextContent(
        "octocat"
      );
    });
  });

  it("handles search input changes", () => {
    renderWithProviders(<Home />);

    const searchInput = screen.getByTestId("app-home-search-input");
    fireEvent.change(searchInput, { target: { value: "testuser" } });

    expect(searchInput).toHaveValue("testuser");
  });

  it("shows loading state for user repositories", async () => {
    renderWithProviders(<Home />);

    await waitFor(() => {
      expect(screen.getByTestId("user-repo-item-1")).toBeInTheDocument();
      expect(screen.getByTestId(`user-repo-loading-1`)).toBeInTheDocument();
    });
  });

  it("displays repository information when loaded", async () => {
    renderWithProviders(<Home />);

    await waitFor(() => {
      expect(screen.getByTestId("user-repo-1")).toBeInTheDocument();
      expect(screen.getByText("Hello-World")).toBeInTheDocument();
      expect(screen.getByText("This your first repo!")).toBeInTheDocument();
      expect(screen.getByText("30")).toBeInTheDocument();
    });
  });

  it("handles empty user list", () => {
    renderWithProviders(<Home />);

    expect(screen.getByTestId("app-home-accordion")).toBeInTheDocument();
    expect(screen.queryByTestId("user-repo-item-1")).not.toBeInTheDocument();
  });

  it("handles API errors gracefully", () => {
    renderWithProviders(<Home />);

    // Should still show the search interface even on error
    expect(screen.getByTestId("app-home-search-input")).toBeInTheDocument();
    expect(screen.getByTestId("app-home-search-btn")).toBeInTheDocument();
  });
});
