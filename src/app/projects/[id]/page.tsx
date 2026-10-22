"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Star,
  GitFork,
  ExternalLink,
  Copy,
  Check,
  Layers,
  Terminal,
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
        <div className="w-8 h-8 border-2 border-editor-borderFocus border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-editor-textMuted text-xs">Fetching repository metadata from GitHub...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-2 sm:py-6 text-editor-textPrimary">
      {/* Back button */}
      <div>
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-xs font-code text-editor-textMuted hover:text-syntax-variable transition group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>&larr; Return to projects.tsx</span>
        </Link>
      </div>

      {/* Hero Header */}
      <div className="rounded-lg border border-editor-border bg-editor-card p-6 sm:p-8 space-y-6 shadow-vscode">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-code px-2 py-0.5 rounded bg-editor-bg border border-editor-border text-syntax-type">
                {repo.category || "Project"}
              </span>
              <span className="text-xs font-code text-editor-textMuted">
                YashWadhvani / {repo.name}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-editor-textHeading font-sans">
              {repo.title || repo.name}
            </h1>
          </div>

          <div className="flex items-center gap-2.5">
            <a
              href={repo.html_url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded bg-editor-cardElevated hover:bg-editor-hover text-xs font-code text-editor-textPrimary border border-editor-border transition"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>

            {repo.homepage && (
              <a
                href={repo.homepage}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded bg-[#0E639C] hover:bg-[#1177BB] text-xs font-code text-white font-medium transition"
              >
                <span>Live Preview</span>
              </a>
            )}
          </div>
        </div>

        <p className="text-editor-textSecondary text-xs sm:text-sm leading-relaxed font-sans">
          {repo.longDescription || repo.description}
        </p>

        {/* Clone Command Bar */}
        <div className="flex items-center justify-between p-3 rounded bg-editor-bg border border-editor-border font-code text-xs text-editor-textMuted">
          <div className="flex items-center gap-2 truncate">
            <Terminal className="w-4 h-4 text-syntax-type flex-shrink-0" />
            <span className="text-editor-textMuted select-none">$</span>
            <span className="text-editor-textPrimary truncate">
              git clone https://github.com/YashWadhvani/{repo.name}.git
            </span>
          </div>

          <button
            onClick={copyCloneCommand}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-editor-card hover:bg-editor-hover text-editor-textSecondary text-[11px] transition ml-3 flex-shrink-0 border border-editor-border cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-syntax-type" />
                <span className="text-syntax-type">Copied!</span>
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
          <div className="p-3 rounded bg-editor-bg border border-editor-border space-y-0.5">
            <span className="text-editor-textMuted">Stars</span>
            <div className="flex items-center gap-1 text-syntax-func font-bold text-sm">
              <Star className="w-4 h-4 fill-current" />
              <span>{repo.stargazers_count ?? 0}</span>
            </div>
          </div>

          <div className="p-3 rounded bg-editor-bg border border-editor-border space-y-0.5">
            <span className="text-editor-textMuted">Forks</span>
            <div className="flex items-center gap-1 text-syntax-variable font-bold text-sm">
              <GitFork className="w-4 h-4" />
              <span>{repo.forks_count ?? 0}</span>
            </div>
          </div>

          <div className="p-3 rounded bg-editor-bg border border-editor-border space-y-0.5">
            <span className="text-editor-textMuted">Language</span>
            <div className="text-editor-textHeading font-bold text-sm">
              {repo.language || "TypeScript"}
            </div>
          </div>

          <div className="p-3 rounded bg-editor-bg border border-editor-border space-y-0.5">
            <span className="text-editor-textMuted">License</span>
            <div className="text-syntax-type font-bold text-sm">
              {repo.license?.name || "MIT"}
            </div>
          </div>
        </div>
      </div>

      {/* Technologies & Topics */}
      <section className="space-y-3">
        <h3 className="text-base font-bold text-editor-textHeading font-sans flex items-center gap-2">
          <Layers className="w-4 h-4 text-syntax-storage" />
          <span>Technologies &amp; Architecture Topics</span>
        </h3>

        <div className="flex flex-wrap gap-1.5">
          {repo.topics && repo.topics.length > 0 ? (
            repo.topics.map((topic: string, idx: number) => (
              <span
                key={idx}
                className="px-2.5 py-0.5 rounded bg-editor-card border border-editor-border text-xs font-code text-editor-textSecondary"
              >
                #{topic}
              </span>
            ))
          ) : (
            <span className="text-xs font-code text-editor-textMuted">
              No specific topics tagged.
            </span>
          )}
        </div>
      </section>
    </div>
  );
}
