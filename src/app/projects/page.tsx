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
  RefreshCw,
  SlidersHorizontal,
} from "lucide-react";
import { ALL_REPOSITORIES, ProjectItem } from "@/data/portfolioData";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<ProjectItem[]>(ALL_REPOSITORIES);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState<"stars" | "updated" | "name">("stars");
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchedLive, setIsFetchedLive] = useState(false);

  // Fetch ALL repositories dynamically from GitHub API
  useEffect(() => {
    const fetchAllGitHubRepos = async () => {
      try {
        setIsLoading(true);
        // First try the internal cached API endpoint
        let res = await fetch("/api/github/repos");
        if (!res.ok) {
          // Direct fallback to GitHub API
          res = await fetch(
            "https://api.github.com/users/YashWadhvani/repos?per_page=100&sort=updated"
          );
        }
        if (!res.ok) throw new Error("GitHub API request failed");
        const data = await res.json();

        if (Array.isArray(data) && data.length > 0) {
          const mapped: ProjectItem[] = data.map((repo: any) => {
            // Find curated details if available
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
              stars: repo.stars ?? repo.stargazers_count ?? 0, // REAL stars
              forks: repo.forks ?? repo.forks_count ?? 0, // REAL forks
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

  // Filtering & Pure Sorting by real stars and forks
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
          return b.stars - a.stars; // Real stars strictly
        }
        return b.forks - a.forks; // Real forks secondary
      }
      if (sortBy === "name") {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Page Header */}
      <div className="space-y-2 border-b border-editor-border pb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-code text-emerald-400">
            <FolderGit2 className="w-4 h-4" />
            <span>ALL_REPOSITORIES.JSON ({projects.length} Total)</span>
          </div>

          <span
            className={`flex items-center gap-1.5 text-[11px] font-code px-2 py-0.5 rounded border ${
              isFetchedLive
                ? "text-emerald-400 bg-emerald-950/40 border-emerald-800/40"
                : "text-sky-400 bg-sky-950/40 border-sky-800/40"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isFetchedLive ? "bg-emerald-400 animate-pulse" : "bg-sky-400"
              }`}
            ></span>
            {isFetchedLive ? "Live GitHub API Connected" : "Local Data Ready"}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          All GitHub Repositories &amp; Projects
        </h1>
        <p className="text-slate-400 text-sm sm:text-base font-sans max-w-3xl">
          Browse all {projects.length}+ open-source repositories from{" "}
          <a
            href="https://github.com/YashWadhvani"
            target="_blank"
            rel="noreferrer"
            className="text-sky-400 hover:underline font-code font-semibold"
          >
            github.com/YashWadhvani
          </a>
          , spanning research systems, mobile applications (Flutter &amp; React Native), full-stack portals, and developer tools.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search all repos by title, language, or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-editor-card border border-editor-border rounded-lg text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500/60 font-sans"
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-1.5 items-center">
          <Filter className="w-3.5 h-3.5 text-slate-500 mr-1 hidden sm:inline" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-md text-xs font-code transition ${
                selectedCategory === cat
                  ? "bg-emerald-500 text-white font-semibold shadow-md shadow-emerald-500/20"
                  : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="py-20 text-center rounded-2xl border border-editor-border bg-editor-card/40 space-y-3">
          <Code2 className="w-8 h-8 text-slate-500 mx-auto" />
          <p className="text-slate-300 font-code text-sm">
            No projects matched your search "{searchQuery}".
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All");
            }}
            className="text-xs text-sky-400 hover:underline font-code"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="flex flex-col justify-between rounded-xl border border-editor-border bg-editor-card/70 p-6 hover:border-sky-500/40 hover:bg-slate-900/60 transition-all duration-300 group shadow-lg"
            >
              <div className="space-y-4">
                {/* Header row */}
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-code px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-purple-300 font-semibold">
                    {project.category}
                  </span>

                  <div className="flex items-center gap-3 text-xs text-slate-400 font-code">
                    <span className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-amber-400" />
                      {project.stars}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="w-3.5 h-3.5 text-sky-400" />
                      {project.forks}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-sky-300 transition font-sans line-clamp-1">
                    {project.title}
                  </h3>
                  <span className="text-[11px] font-code text-slate-500">
                    repo: {project.name}
                  </span>
                </div>

                {/* Description */}
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed line-clamp-3 font-sans">
                  {project.description}
                </p>

                {/* Language & Topics */}
                <div className="space-y-2 pt-1">
                  <div className="flex items-center gap-2 text-xs font-code text-slate-300">
                    <span className="w-2 h-2 rounded-full bg-sky-400"></span>
                    <span>{project.language}</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {project.topics.slice(0, 4).map((topic, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] font-code text-slate-400 bg-slate-900/90 px-2 py-0.5 rounded border border-slate-800"
                      >
                        #{topic}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-5 mt-4 border-t border-editor-border/60 flex items-center justify-between text-xs font-code">
                <Link
                  href={`/projects/${project.name}`}
                  className="inline-flex items-center gap-1 text-sky-400 hover:text-sky-300 font-medium"
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
                      className="text-emerald-400 hover:underline"
                    >
                      Demo
                    </a>
                  )}

                  <a
                    href={project.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-slate-400 hover:text-white transition"
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
