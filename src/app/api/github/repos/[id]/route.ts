import { NextResponse } from "next/server";
import { ALL_REPOSITORIES } from "@/data/portfolioData";

export const revalidate = 900;

export async function GET(
  _request: Request,
  { params }: { params: { id: string } },
) {
  const id = decodeURIComponent(params.id);
  const curated = ALL_REPOSITORIES.find(
    (project) => project.name.toLowerCase() === id.toLowerCase(),
  );
  const repositoryName = curated?.repositories?.[0]?.name || id;

  try {
    const response = await fetch(`https://api.github.com/repos/YashWadhvani/${encodeURIComponent(repositoryName)}`, {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "YashWadhvani-Portfolio",
      },
      next: { revalidate: 900 },
    });
    if (!response.ok) throw new Error("GitHub repository unavailable");
    const repo = await response.json();
    let readme = "";
    const readmeResponse = await fetch(
      `https://api.github.com/repos/YashWadhvani/${encodeURIComponent(repositoryName)}/readme`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          "User-Agent": "YashWadhvani-Portfolio",
        },
        next: { revalidate: 900 },
      },
    );
    if (readmeResponse.ok) {
      const readmeData = await readmeResponse.json();
      if (typeof readmeData.content === "string") {
        readme = Buffer.from(readmeData.content, "base64").toString("utf8");
      }
    }

    return NextResponse.json({
      ...repo,
      ...curated,
      name: curated?.name || repo.name,
      title: curated?.title || repo.name,
      description: repo.description || curated?.description,
      longDescription: curated?.longDescription || repo.description,
      screenshot: curated?.screenshot || `https://opengraph.githubassets.com/1/YashWadhvani/${repo.name}`,
      impact: curated?.impact,
      category: curated?.category || "Frontend",
      readme,
    });
  } catch {
    if (!curated) return NextResponse.json({ error: "Repository not found" }, { status: 404 });
    return NextResponse.json({
      ...curated,
      stargazers_count: curated.stars,
      forks_count: curated.forks,
      screenshot: curated.screenshot,
    });
  }
}
