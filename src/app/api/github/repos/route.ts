import { NextResponse } from "next/server";
import { ALL_REPOSITORIES, ProjectItem } from "@/data/portfolioData";

export const revalidate = 120; // Cache for 2 minutes

export async function GET() {
  try {
    const res = await fetch(
      "https://api.github.com/users/YashWadhvani/repos?per_page=100&sort=updated",
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          "User-Agent": "YashWadhvani-Portfolio",
        },
        next: { revalidate: 120 },
      }
    );

    if (!res.ok) {
      throw new Error(`GitHub API error: ${res.statusText}`);
    }

    const repos = await res.json();

    if (!Array.isArray(repos)) {
      throw new Error("Invalid GitHub response format");
    }

    // Map each repo using REAL GitHub metadata (real stars and forks)
    const mapped: ProjectItem[] = repos
      .filter((repo: any) => !repo.fork) // primary focus on original repos, or keep all
      .map((repo: any) => {
        const curated = ALL_REPOSITORIES.find(
          (c) => c.name.toLowerCase() === repo.name.toLowerCase()
        );

        let cat: "Full Stack" | "Mobile App" | "Frontend" | "Backend" | "AI/ML" | "Systems" =
          "Frontend";
        if (repo.language === "Python") cat = "Backend";
        if (repo.language === "Dart") cat = "Mobile App";
        if (repo.language === "Java" || repo.language === "C" || repo.language === "C++")
          cat = "Systems";
        if (repo.name.toLowerCase().includes("backend") || repo.name.toLowerCase().includes("api"))
          cat = "Backend";
        if (repo.name.toLowerCase().includes("frontend")) cat = "Frontend";
        if (curated?.category) cat = curated.category;

        const cleanTitle =
          curated?.title ||
          repo.name
            .replace(/[-_]/g, " ")
            .replace(/\b\w/g, (c: string) => c.toUpperCase());

        const desc =
          repo.description ||
          curated?.description ||
          `Open source ${repo.language || "software"} repository developed by Yash Wadhvani.`;

        return {
          id: repo.name,
          name: repo.name,
          title: cleanTitle,
          description: desc,
          longDescription: curated?.longDescription,
          language: repo.language || (curated ? curated.language : "JavaScript"),
          topics:
            repo.topics && repo.topics.length > 0
              ? repo.topics
              : curated?.topics || [repo.language?.toLowerCase() || "code"],
          stars: repo.stargazers_count ?? 0, // REAL stars from GitHub
          forks: repo.forks_count ?? 0, // REAL forks from GitHub
          html_url: repo.html_url,
          homepage: repo.homepage || curated?.homepage,
          featured: (repo.stargazers_count ?? 0) > 0 || !!curated?.featured,
          category: cat,
        };
      });

    return NextResponse.json(mapped, {
      headers: {
        "Cache-Control": "public, s-maxage=120, stale-while-revalidate=300",
      },
    });
  } catch (error) {
    console.warn("Failed to fetch from live GitHub API, serving fallback repository data:", error);
    // Serve fallback list of real repositories with their real stars & forks
    return NextResponse.json(ALL_REPOSITORIES, {
      headers: {
        "Cache-Control": "public, s-maxage=60",
      },
    });
  }
}
