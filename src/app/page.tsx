"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FileDown,
  ArrowRight,
  FolderGit2,
  ExternalLink,
  Star,
  GitFork,
  Code2,
  Music2,
  CheckCircle2,
  Terminal,
} from "lucide-react";
import confetti from "canvas-confetti";
import { PERSONAL_INFO, ALL_REPOSITORIES, ProjectItem } from "@/data/portfolioData";
import SpotifyNowPlaying from "@/components/SpotifyNowPlaying";

export default function HomePage() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [projects, setProjects] = useState<ProjectItem[]>(() =>
    [...ALL_REPOSITORIES].sort((a, b) => b.stars - a.stars).slice(0, 3)
  );
  const [isLiveGitHub, setIsLiveGitHub] = useState(false);

  // Typewriter effect for developer titles
  useEffect(() => {
    const currentRole = PERSONAL_INFO.roles[roleIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && displayText === currentRole) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % PERSONAL_INFO.roles.length);
    } else {
      timeout = setTimeout(
        () => {
          setDisplayText((prev) =>
            isDeleting
              ? currentRole.substring(0, prev.length - 1)
              : currentRole.substring(0, prev.length + 1)
          );
        },
        isDeleting ? 30 : 60
      );
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  // Fetch real project data dynamically from GitHub API
  useEffect(() => {
    const fetchTopRepos = async () => {
      try {
        const res = await fetch("/api/github/repos");
        if (!res.ok) throw new Error("Failed to fetch GitHub repos");
        const data: ProjectItem[] = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          const sorted = [...data].sort((a, b) => b.stars - a.stars);
          setProjects(sorted.slice(0, 3));
          setIsLiveGitHub(true);
        }
      } catch (err) {
        console.warn("Using offline portfolio repository data:", err);
      }
    };

    fetchTopRepos();
  }, []);

  const handleDownloadResume = () => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 },
    });
    window.open(PERSONAL_INFO.resumeUrl, "_blank");
  };

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

  return (
    <div className="max-w-6xl mx-auto space-y-12 py-2 sm:py-6 text-editor-textPrimary">
      {/* Hero Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Code Window & Narrative */}
        <div className="lg:col-span-7 space-y-5">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-editor-card border border-editor-border text-xs font-code">
            <span className="w-2 h-2 rounded-full bg-syntax-type"></span>
            <span className="text-editor-textMuted">STATUS:</span>
            <span className="text-editor-textPrimary font-medium">M.Tech Scholar @ MANIT Bhopal</span>
          </div>

          {/* Heading with trimmed dynamic typing */}
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-editor-textHeading font-sans">
              Hey, I'm <span className="text-syntax-variable">{PERSONAL_INFO.name}</span>
            </h1>

            {/* Trimmed, clean typewriter prompt line */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-editor-card border border-editor-border font-code text-xs sm:text-sm text-editor-textPrimary">
              <span className="text-syntax-storage">const</span>
              <span className="text-syntax-type">role</span>
              <span className="text-editor-textPrimary">=</span>
              <span className="text-syntax-string">"{displayText}"</span>
              <span className="inline-block w-1.5 h-4 bg-syntax-storage animate-cursor ml-0.5"></span>
            </div>
          </div>

          <p className="text-editor-textSecondary text-sm sm:text-base leading-relaxed font-sans">
            Pursuing <span className="text-editor-textHeading font-medium">M.Tech in Advanced Computing</span> at{" "}
            <span className="text-syntax-variable font-medium">MANIT Bhopal</span> &amp; B.Tech CSE (AI/ML) Graduate from{" "}
            <span className="text-syntax-type font-medium">Karnavati University (CGPA: 8.72)</span>. Industry internship experience at Logion Solutions building Nuxt.js, React Native, and enterprise CRM solutions.
          </p>

          {/* VS Code Theme Code Block */}
          <div className="rounded-lg border border-editor-border bg-editor-card p-4 font-code text-xs sm:text-sm shadow-vscode relative">
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-editor-border text-[11px] text-editor-textMuted">
              <span className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-syntax-storage" />
                <span>developer_profile.ts</span>
              </span>
              <span>TypeScript</span>
            </div>
            <div className="space-y-1 text-editor-textPrimary">
              <div>
                <span className="text-syntax-storage">const</span>{" "}
                <span className="text-syntax-variable">yash</span>:{" "}
                <span className="text-syntax-type">Engineer</span> = &#123;
              </div>
              <div className="pl-4">
                <span className="text-syntax-variable">postgrad</span>:{" "}
                <span className="text-syntax-string">"M.Tech Advanced Computing @ MANIT Bhopal"</span>,
              </div>
              <div className="pl-4">
                <span className="text-syntax-variable">undergrad</span>:{" "}
                <span className="text-syntax-string">"B.Tech CSE (AI/ML) @ UIT, CGPA: 8.72"</span>,
              </div>
              <div className="pl-4">
                <span className="text-syntax-variable">industry</span>:{" "}
                <span className="text-syntax-string">"Logion Solutions (Full Stack Intern)"</span>,
              </div>
              <div className="pl-4">
                <span className="text-syntax-variable">published</span>:{" "}
                <span className="text-syntax-string">"IEEE AIEI 2026 (SafeRoute Navigation)"</span>,
              </div>
              <div className="pl-4">
                <span className="text-syntax-variable">stack</span>: [
                <span className="text-syntax-string">"Flutter"</span>,{" "}
                <span className="text-syntax-string">"React Native"</span>,{" "}
                <span className="text-syntax-string">"Next.js"</span>,{" "}
                <span className="text-syntax-string">"Python"</span>],
              </div>
              <div className="pl-4">
                <span className="text-syntax-variable">availableForHire</span>:{" "}
                <span className="text-syntax-storage">true</span>
              </div>
              <div>&#125;;</div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              onClick={handleDownloadResume}
              className="inline-flex items-center gap-2 px-4 py-2 rounded bg-[#0E639C] hover:bg-[#1177BB] text-white font-medium text-xs font-code transition shadow-sm cursor-pointer"
            >
              <FileDown className="w-4 h-4 text-syntax-string" />
              <span>Download Resume (PDF)</span>
            </button>

            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-4 py-2 rounded bg-editor-cardElevated hover:bg-editor-hover text-editor-textPrimary border border-editor-border font-medium text-xs font-code transition"
            >
              <FolderGit2 className="w-4 h-4 text-syntax-type" />
              <span>Explore Projects</span>
              <ArrowRight className="w-3.5 h-3.5 text-editor-textSecondary" />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded bg-editor-card hover:bg-editor-hover text-editor-textSecondary hover:text-editor-textPrimary border border-editor-border text-xs font-code transition"
            >
              <span>Connect</span>
            </Link>
          </div>
        </div>

        {/* Right Column: Profile Card */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="w-full max-w-sm rounded-lg border border-editor-border bg-editor-card p-5 shadow-vscode space-y-5">
            {/* Window Controls Header */}
            <div className="flex items-center justify-between pb-3 border-b border-editor-border">
              <div className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ED6A5E]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#F5BF4F]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#62C554]" />
              </div>
              <span className="text-[11px] font-code text-editor-textMuted">yash_profile.png</span>
            </div>

            {/* Avatar Image */}
            <div className="relative mx-auto w-44 h-44 sm:w-52 sm:h-52 rounded-md overflow-hidden border border-editor-border bg-editor-bg">
              <Image
                src={PERSONAL_INFO.avatar}
                alt={PERSONAL_INFO.name}
                fill
                sizes="(max-width: 768px) 176px, 208px"
                priority
                className="object-cover object-center"
              />
            </div>

            {/* Identity & Tags */}
            <div className="text-center space-y-1">
              <h3 className="text-base font-bold text-editor-textHeading font-sans">
                {PERSONAL_INFO.name}
              </h3>
              <p className="text-xs text-syntax-variable font-code">
                MANIT Bhopal &bull; UIT Karnavati
              </p>
            </div>

            {/* Clean Tech Badges */}
            <div className="flex flex-wrap justify-center gap-1.5 pt-1">
              {["Flutter", "React Native", "Next.js", "Python", "Nuxt.js", "AI/ML"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded bg-editor-bg border border-editor-border text-[11px] font-code text-editor-textSecondary"
                  >
                    {tag}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Counter Bar */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {PERSONAL_INFO.stats.map((stat, idx) => (
          <div
            key={idx}
            className="rounded-lg border border-editor-border bg-editor-card p-4 text-center hover:border-editor-borderFocus transition"
          >
            <div className="text-2xl font-bold text-syntax-variable font-code">
              {stat.value}
            </div>
            <div className="text-xs text-editor-textMuted mt-1 font-sans">
              {stat.label}
            </div>
          </div>
        ))}
      </section>

      {/* Spotify "Now Playing" Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-editor-border pb-2.5">
          <div className="flex items-center gap-2 text-xs font-code text-[#1DB954]">
            <Music2 className="w-4 h-4" />
            <span>SPOTIFY_SERVICE.TS</span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-code text-editor-textMuted">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1DB954]" />
            <span>Live Audio Frequency</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {/* Informational description panel */}
          <div className="lg:col-span-7 flex flex-col justify-between rounded-lg border border-editor-border bg-editor-card p-5 sm:p-6 space-y-4">
            <div className="space-y-2.5">
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-editor-bg border border-editor-border text-[#1DB954] text-[11px] font-code">
                <span>Spotify Web API &bull; OAuth 2.0 PKCE</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-editor-textHeading font-sans">
                Real-Time Listening Activity
              </h2>
              <p className="text-editor-textSecondary text-xs sm:text-sm leading-relaxed font-sans">
                Music directly influences focus and code flow. This component queries my active Spotify playback via serverless API routes to broadcast what's currently spinning through my headphones.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-3 text-xs font-code border-t border-editor-border">
              <div className="flex items-center gap-2 text-editor-textSecondary">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#1DB954] flex-shrink-0" />
                <span>Live Status Sync</span>
              </div>
              <div className="flex items-center gap-2 text-editor-textSecondary">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#1DB954] flex-shrink-0" />
                <span>Last Played Cache</span>
              </div>
              <div className="flex items-center gap-2 text-editor-textSecondary">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#1DB954] flex-shrink-0" />
                <span>15s Interval Polling</span>
              </div>
            </div>
          </div>

          {/* Interactive Spotify Card */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <SpotifyNowPlaying variant="card" />
          </div>
        </div>
      </section>

      {/* Featured Projects Grid */}
      <section className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-editor-border pb-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-code text-syntax-storage mb-1">
              <Code2 className="w-4 h-4" />
              <span>TOP_REPOSITORIES.JSON</span>
              {isLiveGitHub && (
                <span className="inline-flex items-center gap-1 text-[10px] text-syntax-type bg-editor-bg border border-editor-border px-1.5 py-0.2 rounded font-code">
                  live sync
                </span>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-editor-textHeading tracking-tight">
              Top Starred GitHub Repositories
            </h2>
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-xs font-code text-syntax-storage hover:text-syntax-variable font-medium transition"
          >
            <span>View All Repositories ({ALL_REPOSITORIES.length}+)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project) => (
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

                {/* Repo title */}
                <h3 className="text-base font-bold text-editor-textHeading group-hover:text-syntax-variable transition font-sans">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-editor-textSecondary text-xs leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                {/* Topics / Tags */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {project.topics.slice(0, 3).map((topic) => (
                    <span
                      key={topic}
                      className="text-[10px] font-code text-editor-textMuted bg-editor-bg px-2 py-0.5 rounded border border-editor-border"
                    >
                      #{topic}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="flex items-center justify-between pt-4 mt-4 border-t border-editor-border text-xs font-code">
                <Link
                  href={`/projects/${project.name}`}
                  className="text-syntax-storage hover:text-syntax-variable font-medium transition"
                >
                  Inspect details &rarr;
                </Link>

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
          ))}
        </div>
      </section>
    </div>
  );
}
