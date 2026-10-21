"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Files,
  Search,
  GitFork,
  Bug,
  Boxes,
  Settings,
  ChevronDown,
  ChevronRight,
  FileCode,
  FileText,
  FileDown,
  Github,
  Linkedin,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import confetti from "canvas-confetti";
import { PERSONAL_INFO } from "@/data/portfolioData";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function Sidebar({
  isOpen,
  onToggle,
}: SidebarProps) {
  const pathname = usePathname();
  const [explorerOpen, setExplorerOpen] = useState(true);
  const [pagesOpen, setPagesOpen] = useState(true);

  const files = [
    {
      name: "home.tsx",
      path: "/",
      icon: <FileCode className="w-4 h-4 text-sky-400" />,
      tag: "Home",
    },
    {
      name: "about.tsx",
      path: "/about",
      icon: <FileCode className="w-4 h-4 text-purple-400" />,
      tag: "About",
    },
    {
      name: "projects.tsx",
      path: "/projects",
      icon: <FileCode className="w-4 h-4 text-emerald-400" />,
      tag: "Projects",
    },
    {
      name: "contact.tsx",
      path: "/contact",
      icon: <FileCode className="w-4 h-4 text-amber-400" />,
      tag: "Contact",
    },
  ];

  const handleResumeClick = () => {
    confetti({ particleCount: 75, spread: 60, origin: { y: 0.6 } });
    window.open(PERSONAL_INFO.resumeUrl, "_blank");
  };

  return (
    <div className="flex h-full select-none">
      {/* Activity Bar (Vertical Strip) */}
      <div className="w-12 bg-editor-sidebar border-r border-editor-border flex flex-col items-center py-3 justify-between z-30">
        <div className="flex flex-col items-center space-y-4">
          <button
            onClick={onToggle}
            className={`p-2 rounded-md transition ${
              isOpen
                ? "text-sky-400 border-l-2 border-sky-400 bg-slate-900/40"
                : "text-slate-400 hover:text-slate-200"
            }`}
            title="Explorer (Toggle Sidebar)"
          >
            <Files className="w-5 h-5" />
          </button>

          <a
            href={PERSONAL_INFO.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-md text-slate-400 hover:text-purple-400 transition"
            title="Source Control (GitHub)"
          >
            <GitFork className="w-5 h-5" />
          </a>

          <a
            href={PERSONAL_INFO.linkedinUrl}
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-md text-slate-400 hover:text-sky-400 transition"
            title="LinkedIn Profile"
          >
            <Linkedin className="w-5 h-5" />
          </a>

          <a
            href={PERSONAL_INFO.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-md text-slate-400 hover:text-emerald-400 transition"
            title="WhatsApp Direct Contact"
          >
            <MessageSquare className="w-5 h-5" />
          </a>
        </div>

        <div className="flex flex-col items-center space-y-3">
          <button
            onClick={handleResumeClick}
            className="p-2 rounded-md text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 transition group relative"
            title="Download Resume PDF"
          >
            <FileDown className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Primary Explorer Side Panel */}
      {isOpen && (
        <aside className="w-60 md:w-64 bg-editor-card/90 backdrop-blur-sm border-r border-editor-border flex flex-col font-code text-xs">
          {/* Explorer Header */}
          <div className="flex items-center justify-between px-4 py-2.5 text-slate-400 font-semibold uppercase tracking-wider text-[11px] border-b border-editor-border/50">
            <span>Explorer</span>
            <span className="text-[10px] text-sky-400/80 bg-sky-950/40 px-1.5 py-0.5 rounded border border-sky-800/30">
              PORTFOLIO
            </span>
          </div>

          <div className="flex-1 overflow-y-auto py-2">
            {/* Root Folder */}
            <div>
              <button
                onClick={() => setExplorerOpen(!explorerOpen)}
                className="w-full flex items-center gap-1.5 px-3 py-1 text-slate-300 hover:bg-slate-800/50 transition font-bold"
              >
                {explorerOpen ? (
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                )}
                <span className="truncate">YASH-PORTFOLIO</span>
              </button>

              {explorerOpen && (
                <div className="pl-3 mt-1">
                  {/* Pages Folder */}
                  <div>
                    <button
                      onClick={() => setPagesOpen(!pagesOpen)}
                      className="w-full flex items-center gap-1.5 px-3 py-1 text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition"
                    >
                      {pagesOpen ? (
                        <ChevronDown className="w-3.5 h-3.5 text-sky-400" />
                      ) : (
                        <ChevronRight className="w-3.5 h-3.5 text-sky-400" />
                      )}
                      <span>src / pages</span>
                    </button>

                    {pagesOpen && (
                      <div className="pl-5 space-y-0.5 mt-0.5">
                        {files.map((file) => {
                          const isActive =
                            file.path === "/"
                              ? pathname === "/"
                              : pathname.startsWith(file.path);
                          return (
                            <Link
                              key={file.name}
                              href={file.path}
                              className={`flex items-center gap-2 px-3 py-1.5 rounded-sm transition ${
                                isActive
                                  ? "bg-slate-800/90 text-sky-300 font-semibold border-l-2 border-sky-400"
                                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
                              }`}
                            >
                              {file.icon}
                              <span>{file.name}</span>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Other standalone project files */}
                  <div className="pl-3 mt-3 pt-2 border-t border-slate-800/60 space-y-0.5">
                    <button
                      onClick={handleResumeClick}
                      className="w-full flex items-center gap-2 px-3 py-1.5 rounded-sm text-slate-400 hover:text-rose-400 hover:bg-rose-950/20 transition group text-left"
                    >
                      <FileDown className="w-4 h-4 text-rose-400" />
                      <span className="truncate">Yash_Resume.pdf</span>
                    </button>

                    <a
                      href={PERSONAL_INFO.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 px-3 py-1.5 rounded-sm text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition"
                    >
                      <Github className="w-4 h-4 text-purple-400" />
                      <span className="truncate">github.url</span>
                    </a>

                    <div className="flex items-center gap-2 px-3 py-1.5 text-slate-500">
                      <FileText className="w-4 h-4 text-amber-500" />
                      <span>package.json</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quick Stats / Info Widget at bottom of sidebar */}
          <div className="p-3 border-t border-editor-border bg-editor-sidebar/80 text-[11px] text-slate-400">
            <div className="flex items-center justify-between mb-1">
              <span className="text-slate-500 font-semibold">STATUS</span>
              <span className="flex items-center gap-1 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Open for roles
              </span>
            </div>
            <p className="text-slate-400 text-[10px] leading-relaxed">
              B.Tech AI/ML @ Karnavati University
            </p>
          </div>
        </aside>
      )}
    </div>
  );
}
