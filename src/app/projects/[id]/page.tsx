"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Star,
  GitFork,
  ExternalLink,
  Code2,
  Copy,
  Check,
  Calendar,
  Layers,
  Terminal,
  FileCode,
  BookOpen,
} from "lucide-react";
import { ALL_REPOSITORIES } from "@/data/portfolioData";

export default function ProjectDetailPage() {
  const params = useParams();
  const id = (params?.id as string) || "";
  const [repo, setRepo] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepoDetails = async () => {
      // Find curated fallback first
      const curated = ALL_REPOSITORIES.find(
        (p) => p.name.toLowerCase() === id.toLowerCase()
      );

      try {
        setLoading(true);
        const res = await fetch(`https://api.github.com/repos/YashWadhvani/${id}`);
        if (!res.ok) throw new Error("Could not fetch repo details");
        const data = await res.json();
        setRepo({
          ...data,
          longDescription: curated?.longDescription,
          title: curated?.title || data.name,
          category: curated?.category || "Open Source",
        });
      } catch (err) {
        // Fallback to curated if offline or rate limited
        if (curated) {
          setRepo({
            name: curated.name,
            title: curated.title,
            description: curated.description,
            longDescription: curated.longDescription,
            html_url: curated.html_url,
            homepage: curated.homepage,
            stargazers_count: curated.stars,
            forks_count: curated.forks,
            language: curated.language,
            topics: curated.topics,
            category: curated.category,
            clone_url: `https://github.com/YashWadhvani/${curated.name}.git`,
          });
        } else {
          setRepo({
            name: id,
            title: id.replace(/[-_]/g, " "),
            description: "Repository by Yash Wadhvani.",
            html_url: `https://github.com/YashWadhvani/${id}`,
            language: "JavaScript",
            topics: ["code", "developer-tools"],
            stargazers_count: 0,
            forks_count: 0,
            category: "Repository",
            clone_url: `https://github.com/YashWadhvani/${id}.git`,
          });
        }
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchRepoDetails();
  }, [id]);

  const copyCloneCommand = () => {
    const cmd = `git clone https://github.com/YashWadhvani/${id}.git`;
    navigator.clipboard.writeText(cmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center font-code space-y-3">
        <div className="w-8 h-8 border-2 border-sky-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-slate-400 text-xs">Fetching repository metadata from GitHub...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Back button */}
      <div>
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-xs font-code text-slate-400 hover:text-sky-300 transition group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>&larr; Return to projects.tsx</span>
        </Link>
      </div>

      {/* Hero Header */}
      <div className="rounded-2xl border border-editor-border bg-editor-card p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-code px-2 py-0.5 rounded bg-sky-950/60 border border-sky-800/40 text-sky-300 font-semibold">
                {repo.category || "Project"}
              </span>
              <span className="text-xs font-code text-slate-500">
                YashWadhvani / {repo.name}
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-sans">
              {repo.title || repo.name}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={repo.html_url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-code text-slate-200 transition"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>

            {repo.homepage && (
              <a
                href={repo.homepage}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-xs font-code text-white font-medium transition shadow-md shadow-sky-500/25"
              >
                <span>Live Preview</span>
              </a>
            )}
          </div>
        </div>

        <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-sans">
          {repo.longDescription || repo.description}
        </p>

        {/* Clone Command Bar */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-editor-bg border border-editor-border font-code text-xs text-slate-400">
          <div className="flex items-center gap-2 truncate">
            <Terminal className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span className="text-slate-500 select-none">$</span>
            <span className="text-slate-200 truncate">
              git clone https://github.com/YashWadhvani/{repo.name}.git
            </span>
          </div>

          <button
            onClick={copyCloneCommand}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-[11px] transition ml-3 flex-shrink-0"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Badges / Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs font-code">
          <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 space-y-0.5">
            <span className="text-slate-500">Stars</span>
            <div className="flex items-center gap-1 text-amber-400 font-bold text-sm">
              <Star className="w-4 h-4" />
              <span>{repo.stargazers_count ?? 0}</span>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 space-y-0.5">
            <span className="text-slate-500">Forks</span>
            <div className="flex items-center gap-1 text-sky-400 font-bold text-sm">
              <GitFork className="w-4 h-4" />
              <span>{repo.forks_count ?? 0}</span>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 space-y-0.5">
            <span className="text-slate-500">Language</span>
            <div className="text-purple-300 font-bold text-sm">
              {repo.language || "TypeScript"}
            </div>
          </div>

          <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 space-y-0.5">
            <span className="text-slate-500">License</span>
            <div className="text-emerald-400 font-bold text-sm">
              {repo.license?.name || "MIT"}
            </div>
          </div>
        </div>
      </div>

      {/* Technologies & Topics */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-white font-sans flex items-center gap-2">
          <Layers className="w-4 h-4 text-sky-400" />
          <span>Technologies &amp; Architecture Topics</span>
        </h3>

        <div className="flex flex-wrap gap-2">
          {repo.topics && repo.topics.length > 0 ? (
            repo.topics.map((topic: string, idx: number) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-md bg-editor-card border border-editor-border text-xs font-code text-slate-300"
              >
                #{topic}
              </span>
            ))
          ) : (
            <span className="text-xs font-code text-slate-500">
              No specific topics tagged.
            </span>
          )}
        </div>
      </section>
    </div>
  );
}
