import { ALL_REPOSITORIES, ProjectItem } from "@/data/portfolioData";

const GITHUB_API = "https://api.github.com/users/YashWadhvani/repos?per_page=100&sort=updated";

export function mapGitHubRepository(repo: any): ProjectItem {
  const curated = ALL_REPOSITORIES.find(
    (item) => item.name.toLowerCase() === String(repo.name).toLowerCase(),
  );

  let category: ProjectItem["category"] = "Frontend";
  if (repo.language === "Python") category = "Backend";
  if (repo.language === "Dart") category = "Mobile App";
  if (["Java", "C", "C++"].includes(repo.language)) category = "Systems";
  if (/backend|api/i.test(repo.name)) category = "Backend";
  if (/frontend/i.test(repo.name)) category = "Frontend";
  if (curated?.category) category = curated.category;

  return {
    ...curated,
    id: repo.name,
    name: repo.name,
    title:
      curated?.title ||
      repo.name.replace(/[-_]/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase()),
    description:
      repo.description ||
      curated?.description ||
      `Open source ${repo.language || "software"} repository developed by Yash Wadhvani.`,
    longDescription: curated?.longDescription,
    language: repo.language || curated?.language || "JavaScript",
    topics: repo.topics?.length ? repo.topics : curated?.topics || ["code"],
    stars: repo.stargazers_count ?? 0,
    forks: repo.forks_count ?? 0,
    html_url: repo.html_url,
    homepage: repo.homepage || curated?.homepage,
    featured: (repo.stargazers_count ?? 0) > 0 || !!curated?.featured,
    category,
    screenshot:
      curated?.screenshot || `https://opengraph.githubassets.com/1/YashWadhvani/${repo.name}`,
  };
}

export async function fetchGitHubRepositories(): Promise<ProjectItem[]> {
  const response = await fetch(GITHUB_API, {
    headers: {
      Accept: "application/vnd.github+json",
      "User-Agent": "YashWadhvani-Portfolio",
    },
    next: { revalidate: 900 },
  });

  if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
  const repositories = await response.json();
  if (!Array.isArray(repositories)) throw new Error("Invalid GitHub response");

  return repositories.filter((repo) => !repo.fork).map(mapGitHubRepository);
}
