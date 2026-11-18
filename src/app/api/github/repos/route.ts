import { NextResponse } from "next/server";
import { ALL_REPOSITORIES } from "@/data/portfolioData";
import { fetchGitHubRepositories } from "@/lib/github";

export const revalidate = 900;

export async function GET() {
  try {
    const repositories = await fetchGitHubRepositories();
    return NextResponse.json(repositories, {
      headers: { "Cache-Control": "public, s-maxage=900, stale-while-revalidate=3600" },
    });
  } catch (error) {
    console.warn("Serving fallback repository data:", error);
    return NextResponse.json(ALL_REPOSITORIES, {
      headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=900" },
    });
  }
}
