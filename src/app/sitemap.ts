import { MetadataRoute } from "next";
import { ALL_REPOSITORIES } from "@/data/portfolioData";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://yashwadhvani.vercel.app";
  const pages = ["", "/about", "/projects", "/contact"].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "/projects" ? 0.9 : 0.7,
  }));
  const projects = ALL_REPOSITORIES.map((project) => ({
    url: `${baseUrl}/projects/${project.name}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));
  return [...pages, ...projects];
}
