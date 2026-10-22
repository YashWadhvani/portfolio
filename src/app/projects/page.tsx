"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FolderGit2,
  Search,
  Star,
  GitFork,
  ExternalLink,
  Code2,
  BookOpen,
  Filter,
} from "lucide-react";
import { ALL_REPOSITORIES, ProjectItem } from "@/data/portfolioData";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<ProjectItem[]>(ALL_REPOSITORIES);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState<"stars" | "name">("stars");
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchedLive, setIsFetchedLive] = useState(false);

  // Fetch ALL repositories dynamically from GitHub API
  useEffect(() => {
    const fetchAllGitHubRepos = async () => {
      try {
        setIsLoading(true);
        let res = await fetch("/api/github/repos");
        if (!res.ok) {
          res = await fetch(
            "https://api.github.com/users/YashWadhvani/repos?per_page=100&sort=updated"
          );
        }
        if (!res.ok) throw new Error("GitHub API request failed");
        const data = await res.json();

        if (Array.isArray(data) && data.length > 0) {
          const mapped: ProjectItem[] = data.map((repo: any) => {
            const curated = ALL_REPOSITORIES.find(
              (p) => p.name.toLowerCase() === repo.name.toLowerCase()
            );

            let cat: "Full Stack" | "Mobile App" | "Frontend" | "Backend" | "AI/ML" | "Systems" =
              repo.category || "Frontend";
            if (repo.language === "Python") cat = "Backend";
            if (repo.language === "Dart") cat = "Mobile App";
            if (repo.language === "Java" || repo.language === "C" || repo.language === "C++")
              cat = "Systems";
            if (repo.name.toLowerCase().includes("backend") || repo.name.toLowerCase().includes("api"))
              cat = "Backend";
            if (repo.name.toLowerCase().includes("frontend")) cat = "Frontend";
            if (curated?.category) cat = curated.category;

            return {
              id: repo.name,
              name: repo.name,
              title: repo.title || curated?.title || repo.name.replace(/[-_]/g, " "),
              description:
                repo.description ||
                curated?.description ||
                "Open-source repository engineered by Yash Wadhvani.",
              longDescription: curated?.longDescription || repo.longDescription,
              language: repo.language || (curated ? curated.language : "JavaScript"),
              topics:
                repo.topics && repo.topics.length > 0
                  ? repo.topics
                  : curated?.topics || [repo.language?.toLowerCase() || "code"],
              stars: repo.stars ?? repo.stargazers_count ?? 0,
              forks: repo.forks ?? repo.forks_count ?? 0,
              html_url: repo.html_url || `https://github.com/YashWadhvani/${repo.name}`,
              homepage: repo.homepage || curated?.homepage,
              featured: (repo.stars ?? repo.stargazers_count ?? 0) > 0,
              category: cat,
            };
          });

          setProjects(mapped);
          setIsFetchedLive(true);
        }
      } catch (err) {
        console.warn("Using offline portfolio repository data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllGitHubRepos();
  }, []);

  const categories = [
    "All",
    "Full Stack",
    "Mobile App",
    "AI/ML",
    "Frontend",
    "Backend",
    "Systems",
  ];

  const getLanguageColor = (lang: string) => {
    switch (lang?.toLowerCase()) {
      case "python":
        return "#3572A5";
      case "javascript":
        return "#F7DF1E";
      case "typescript":
        return "#3178C6";
      case "dart":
        return "#00B4AB";
      case "java":
        return "#B07219";
      case "c++":
      case "cpp":
        return "#F34B7D";
      case "html":
        return "#E34C26";
      default:
        return "#569CD6";
    }
  };

  const filteredProjects = projects
    .filter((project) => {
      const matchesCategory =
        selectedCategory === "All" || project.category === selectedCategory;
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.language.toLowerCase().includes(query) ||
        project.name.toLowerCase().includes(query) ||
        project.topics.some((t) => t.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === "stars") {
        if (b.stars !== a.stars) {
          return b.stars - a.stars;
        }
        return b.forks - a.forks;
      }
      return a.title.localeCompare(b.title);
    });

  return (
    <div className="max-w-6xl mx-auto space-y-8 py-2 sm:py-6 text-editor-textPrimary">
      {/* Page Header */}
      <div className="space-y-2 border-b border-editor-border pb-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-code text-syntax-type">
            <FolderGit2 className="w-4 h-4" />
            <span>ALL_REPOSITORIES.JSON ({projects.length} Total)</span>
          </div>

          <span className="flex items-center gap-1.5 text-[11px] font-code px-2 py-0.5 rounded bg-editor-bg border border-editor-border text-syntax-type">
            <span className="w-1.5 h-1.5 rounded-full bg-syntax-type" />
            {isFetchedLive ? "Live GitHub API Sync" : "Local Data Ready"}
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-editor-textHeading tracking-tight">
          GitHub Repositories &amp; Workspaces
        </h1>
        <p className="text-editor-textSecondary text-xs sm:text-sm font-sans max-w-3xl leading-relaxed">
          Explore {projects.length}+ open-source codebases from{" "}
          <a
            href="https://github.com/YashWadhvani"
            target="_blank"
            rel="noreferrer"
            className="text-syntax-storage hover:underline font-code"
          >
            github.com/YashWadhvani
          </a>
          , spanning research systems, mobile applications (Flutter &amp; React Native), full-stack portals, and developer tools.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-3 justify-between items-stretch md:items-center">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-editor-textMuted" />
          <input
            type="text"
            placeholder="Filter repositories by title, keyword, or language..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-editor-input border border-editor-borderInput rounded text-xs text-editor-textInput placeholder-editor-textMuted focus:outline-none focus:border-editor-borderFocus font-sans"
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-1 items-center">
          <Filter className="w-3.5 h-3.5 text-editor-textMuted mr-1 hidden sm:inline" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded text-xs font-code transition cursor-pointer ${
                selectedCategory === cat
                  ? "bg-[#0E639C] text-white font-medium"
                  : "bg-editor-card border border-editor-border text-editor-textMuted hover:text-editor-textPrimary hover:bg-editor-hover"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="py-16 text-center rounded-lg border border-editor-border bg-editor-card space-y-2">
          <Code2 className="w-8 h-8 text-editor-textMuted mx-auto" />
          <p className="text-editor-textPrimary font-code text-xs">
            No projects matched your search "{searchQuery}".
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All");
            }}
            className="text-xs text-syntax-storage hover:underline font-code cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="flex flex-col justify-between rounded-lg border border-editor-border bg-editor-card p-5 hover:border-editor-borderFocus transition group shadow-vscode"
            >
              <div className="space-y-3">
                {/* Header info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: getLanguageColor(project.language) }}
                    />
                    <span className="text-[11px] font-code text-editor-textSecondary">
                      {project.language}
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5 text-xs text-editor-textMuted font-code">
                    <span
                      className="flex items-center gap-1 font-medium text-syntax-func"
                      title={`${project.stars} stars`}
                    >
                      <Star className="w-3.5 h-3.5 fill-current" />
                      {project.stars}
                    </span>
                    <span
                      className="flex items-center gap-1 font-medium text-syntax-variable"
                      title={`${project.forks} forks`}
                    >
                      <GitFork className="w-3.5 h-3.5" />
                      {project.forks}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <div>
                  <h3 className="text-base font-bold text-editor-textHeading group-hover:text-syntax-variable transition font-sans line-clamp-1">
                    {project.title}
                  </h3>
                  <span className="text-[11px] font-code text-editor-textMuted">
                    {project.name}
                  </span>
                </div>

                {/* Description */}
                <p className="text-editor-textSecondary text-xs leading-relaxed line-clamp-3 font-sans">
                  {project.description}
                </p>

                {/* Topics */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {project.topics.slice(0, 4).map((topic, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] font-code text-editor-textMuted bg-editor-bg px-2 py-0.5 rounded border border-editor-border"
                    >
                      #{topic}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 mt-4 border-t border-editor-border flex items-center justify-between text-xs font-code">
                <Link
                  href={`/projects/${project.name}`}
                  className="inline-flex items-center gap-1 text-syntax-storage hover:text-syntax-variable font-medium transition"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Inspect Code</span>
                </Link>

                <div className="flex items-center gap-3">
                  {project.homepage && (
                    <a
                      href={project.homepage}
                      target="_blank"
                      rel="noreferrer"
                      className="text-syntax-type hover:underline"
                    >
                      Demo
                    </a>
                  )}

                  <a
                    href={project.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-editor-textMuted hover:text-editor-textPrimary transition"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>GitHub</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
