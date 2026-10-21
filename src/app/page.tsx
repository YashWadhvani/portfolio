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
  BookOpen,
  Sparkles,
  Music2,
  Radio,
  CheckCircle2,
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
      timeout = setTimeout(() => setIsDeleting(true), 1800);
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
        isDeleting ? 40 : 80
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
          // Sort by real stars descending, then take top 3
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
      particleCount: 85,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#38bdf8", "#c084fc", "#4ade80", "#fbbf24"],
    });
    window.open(PERSONAL_INFO.resumeUrl, "_blank");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      {/* Hero Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4">
        {/* Left Column: Code Window & Narrative */}
        <div className="lg:col-span-7 space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs font-code">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-slate-400">STATUS:</span>
            <span className="text-emerald-300 font-medium">M.Tech Scholar @ MANIT Bhopal</span>
          </div>

          {/* Heading with dynamic typing */}
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-sans">
              Hey, I'm{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-purple-400">
                {PERSONAL_INFO.name}
              </span>
            </h1>

            <div className="flex items-center gap-2 text-lg sm:text-2xl text-slate-300 font-code font-semibold min-h-[40px]">
              <span className="text-purple-400">&gt;</span>
              <span className="text-sky-300">{displayText}</span>
              <span className="inline-block w-2.5 h-6 bg-sky-400 animate-cursor"></span>
            </div>
          </div>

          <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-2xl font-sans">
            Pursuing <span className="text-slate-200 font-medium">M.Tech in Advanced Computing</span> at{" "}
            <span className="text-purple-300 font-medium">MANIT Bhopal</span> &amp; B.Tech CSE (AI/ML) Graduate from{" "}
            <span className="text-sky-300 font-medium">Karnavati University (CGPA: 8.72)</span>. Industry experience as a Full Stack Intern at Logion Solutions building Nuxt.js, React Native, and enterprise CRM solutions.
          </p>

          {/* Simulated IDE Code Object Box */}
          <div className="rounded-xl border border-editor-border bg-editor-card/80 p-4 font-code text-xs sm:text-sm shadow-xl relative overflow-hidden group">
            <div className="absolute top-2 right-3 text-[10px] text-slate-500 uppercase tracking-widest">
              developer.ts
            </div>
            <div className="text-slate-400 space-y-1">
              <div>
                <span className="text-syntax-keyword">const</span>{" "}
                <span className="text-syntax-func">yash</span>:{" "}
                <span className="text-syntax-keyword">Engineer</span> = &#123;
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
                <span className="text-syntax-string">"IEEE AIEI 2026 (SafeRoute)"</span>,
              </div>
              <div className="pl-4">
                <span className="text-syntax-variable">stack</span>: [
                <span className="text-syntax-string">"Flutter"</span>,{" "}
                <span className="text-syntax-string">"React Native"</span>,{" "}
                <span className="text-syntax-string">"Next.js"</span>,{" "}
                <span className="text-syntax-string">"Node.js"</span>,{" "}
                <span className="text-syntax-string">"Python"</span>],
              </div>
              <div className="pl-4">
                <span className="text-syntax-variable">availableForHire</span>:{" "}
                <span className="text-syntax-keyword">true</span>
              </div>
              <div>&#125;;</div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={handleDownloadResume}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-medium text-sm transition shadow-lg shadow-sky-500/25 group font-code"
            >
              <FileDown className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
              <span>Download Resume (PDF)</span>
            </button>

            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 hover:border-slate-700 font-medium text-sm transition font-code"
            >
              <FolderGit2 className="w-4 h-4 text-emerald-400" />
              <span>Explore Projects</span>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-900/60 hover:bg-slate-800/80 text-slate-300 border border-slate-800/80 text-sm transition font-code"
            >
              <span>Connect</span>
            </Link>
          </div>
        </div>

        {/* Right Column: Profile Card */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-full max-w-sm">
            {/* Ambient Background Glow */}
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-sky-500 to-purple-600 opacity-30 blur-xl group-hover:opacity-50 transition duration-1000"></div>

            <div className="relative rounded-2xl border border-editor-border bg-editor-card p-6 shadow-2xl space-y-6">
              {/* Window Controls Header */}
              <div className="flex items-center justify-between pb-3 border-b border-editor-border/60">
                <div className="flex items-center space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                </div>
                <span className="text-[11px] font-code text-slate-400">yash_profile.png</span>
              </div>

              {/* Avatar Image */}
              <div className="relative mx-auto w-48 h-48 sm:w-56 sm:h-56 rounded-xl overflow-hidden border border-slate-800/80 bg-slate-900/90 shadow-inner group">
                <Image
                  src={PERSONAL_INFO.avatar}
                  alt={PERSONAL_INFO.name}
                  fill
                  sizes="(max-width: 768px) 192px, 224px"
                  priority
                  className="object-cover object-center group-hover:scale-105 transition duration-500"
                />
              </div>

              {/* Identity & Tags */}
              <div className="text-center space-y-1">
                <h3 className="text-lg font-bold text-white font-sans">
                  {PERSONAL_INFO.name}
                </h3>
                <p className="text-xs text-sky-400 font-code font-medium">
                  MANIT Bhopal &bull; UIT Karnavati
                </p>
              </div>

              {/* Pill Tech Badges */}
              <div className="flex flex-wrap justify-center gap-1.5 pt-1">
                {["Flutter", "React Native", "Next.js", "Python", "Nuxt.js", "AI/ML"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-[11px] font-code text-slate-300"
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Counter Bar */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {PERSONAL_INFO.stats.map((stat, idx) => (
          <div
            key={idx}
            className="rounded-xl border border-editor-border bg-editor-card/60 p-4 text-center hover:border-sky-500/40 transition group"
          >
            <div className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-purple-400 font-code">
              {stat.value}
            </div>
            <div className="text-xs text-slate-400 mt-1 font-sans font-medium">
              {stat.label}
            </div>
          </div>
        ))}
      </section>

      {/* Spotify "Now Playing" Dedicated Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-editor-border pb-3">
          <div className="flex items-center gap-2 text-xs font-code text-[#1DB954]">
            <Music2 className="w-4 h-4 animate-bounce" />
            <span>SPOTIFY_NOW_PLAYING.TSX</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] font-code text-slate-400">
            <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>Live Audio Frequency</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Informational description panel */}
          <div className="lg:col-span-7 flex flex-col justify-between rounded-2xl border border-editor-border bg-editor-card/40 p-6 sm:p-8 space-y-4">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/40 text-emerald-400 text-xs font-code">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Spotify Web API Integration</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white font-sans">
                Real-Time Listening Activity
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed font-sans">
                Music powers my engineering workflow. This live component queries my Spotify account via OAuth 2.0 to display the track currently spinning through my headphones, or the most recent tune if I'm currently away from the keyboard.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs font-code border-t border-editor-border/40">
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Now Playing Detection</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Last Played Fallback</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>20s Live Polling</span>
              </div>
            </div>
          </div>

          {/* Interactive Spotify Card */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <SpotifyNowPlaying variant="card" />
          </div>
        </div>
      </section>

      {/* Featured Projects Grid (Fetched dynamically from GitHub with REAL stars and forks) */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-editor-border pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-code text-sky-400 mb-1">
              <Code2 className="w-4 h-4" />
              <span>GITHUB_TOP_REPOSITORIES.JSON</span>
              {isLiveGitHub && (
                <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded-full ml-1 font-normal">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  live github sync
                </span>
              )}
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Top Starred GitHub Repositories
            </h2>
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-xs font-code text-sky-400 hover:text-sky-300 font-medium group"
          >
            <span>View All Repositories ({ALL_REPOSITORIES.length}+)</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="flex flex-col justify-between rounded-xl border border-editor-border bg-editor-card/70 p-5 hover:border-sky-500/40 hover:bg-slate-900/60 transition group shadow-lg"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-code px-2 py-0.5 rounded bg-sky-950/60 border border-sky-800/40 text-sky-300 font-semibold">
                    {project.category}
                  </span>
                  <div className="flex items-center gap-3 text-xs text-slate-400 font-code">
                    <span
                      className="flex items-center gap-1 font-semibold text-amber-300"
                      title={`${project.stars} real stars on GitHub`}
                    >
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400/20" />
                      {project.stars}
                    </span>
                    <span
                      className="flex items-center gap-1 font-semibold text-purple-300"
                      title={`${project.forks} real forks on GitHub`}
                    >
                      <GitFork className="w-3.5 h-3.5 text-purple-400" />
                      {project.forks}
                    </span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-sky-400 transition font-sans">
                  {project.title}
                </h3>

                <p className="text-slate-400 text-xs leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.topics.slice(0, 3).map((topic) => (
                    <span
                      key={topic}
                      className="text-[10px] font-code text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800"
                    >
                      #{topic}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-5 mt-4 border-t border-editor-border/50 text-xs font-code">
                <Link
                  href={`/projects/${project.name}`}
                  className="text-sky-400 hover:underline font-medium"
                >
                  Inspect details &rarr;
                </Link>

                <a
                  href={project.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-slate-400 hover:text-slate-200 transition"
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
