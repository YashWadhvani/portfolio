"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Files,
  GitFork,
  FileCode,
  FileText,
  FileDown,
  Github,
  Linkedin,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import confetti from "canvas-confetti";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

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
      icon: <FileCode className="w-4 h-4 text-syntax-storage" />,
      tag: "Home",
    },
    {
      name: "about.tsx",
      path: "/about",
      icon: <FileCode className="w-4 h-4 text-syntax-keyword" />,
      tag: "About",
    },
    {
      name: "projects.tsx",
      path: "/projects",
      icon: <FileCode className="w-4 h-4 text-syntax-type" />,
      tag: "Projects",
    },
    {
      name: "contact.tsx",
      path: "/contact",
      icon: <FileCode className="w-4 h-4 text-syntax-string" />,
      tag: "Contact",
    },
  ];

  const handleResumeClick = () => {
    confetti({ particleCount: 75, spread: 60, origin: { y: 0.6 } });
    window.open(PERSONAL_INFO.resumeUrl, "_blank");
  };

  return (
    <div className="flex h-full select-none">
      {/* Activity Bar (Far-Left Vertical Strip - 48px width) */}
      <div className="w-12 bg-editor-activityBar border-r border-editor-border flex flex-col items-center py-2 justify-between z-30 shrink-0 transition-colors">
        {/* Top Activity Icons */}
        <div className="flex flex-col items-center space-y-1 w-full">
          <button
            onClick={onToggle}
            className={`w-full py-2.5 flex justify-center transition relative ${
              isOpen
                ? "text-editor-activityBarActiveFg border-l-2 border-editor-activityBarActiveBorder"
                : "text-editor-activityBarFg hover:text-editor-activityBarActiveFg hover:bg-editor-hover"
            }`}
            title="Explorer (Toggle Sidebar)"
          >
            <Files className="w-5 h-5" />
          </button>

          <a
            href={PERSONAL_INFO.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="w-full py-2.5 flex justify-center text-editor-activityBarFg hover:text-editor-activityBarActiveFg hover:bg-editor-hover transition"
            title="Source Control (GitHub)"
          >
            <GitFork className="w-5 h-5" />
          </a>

          <a
            href={PERSONAL_INFO.linkedinUrl}
            target="_blank"
            rel="noreferrer"
            className="w-full py-2.5 flex justify-center text-editor-activityBarFg hover:text-editor-activityBarActiveFg hover:bg-editor-hover transition"
            title="LinkedIn Profile"
          >
            <Linkedin className="w-5 h-5" />
          </a>

          <a
            href={PERSONAL_INFO.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="w-full py-2.5 flex justify-center text-editor-activityBarFg hover:text-editor-activityBarActiveFg hover:bg-editor-hover transition"
            title="WhatsApp Direct Contact"
          >
            <WhatsAppIcon className="w-5 h-5" />
          </a>
        </div>

        {/* Bottom Activity Bar Icons: Resume PDF Download */}
        <div className="flex flex-col items-center space-y-2 pb-2 w-full">
          <button
            onClick={handleResumeClick}
            className="w-full py-2 flex flex-col items-center justify-center text-editor-activityBarFg hover:text-editor-activityBarActiveFg hover:bg-editor-hover transition group relative"
            title="Download Verified Resume PDF"
          >
            <FileDown className="w-5 h-5 text-syntax-string group-hover:scale-110 transition-transform" />
            <span className="text-[9px] font-code text-editor-activityBarFg group-hover:text-syntax-string mt-0.5">CV</span>
          </button>
        </div>
      </div>

      {/* Primary Explorer Side Panel */}
      {isOpen && (
        <aside className="w-60 md:w-64 bg-editor-sidebar border-r border-editor-border flex flex-col font-code text-xs">
          {/* Explorer Header */}
          <div className="flex items-center justify-between px-4 py-2.5 text-editor-textMuted font-semibold uppercase tracking-wider text-[11px] border-b border-editor-border">
            <span>Explorer</span>
            <span className="text-[10px] text-editor-textMuted bg-editor-bg px-1.5 py-0.5 rounded border border-editor-border">
              PORTFOLIO
            </span>
          </div>

          <div className="flex-1 overflow-y-auto py-2">
            {/* Root Folder */}
            <div>
              <button
                onClick={() => setExplorerOpen(!explorerOpen)}
                className="w-full flex items-center gap-1.5 px-3 py-1 text-editor-textPrimary hover:bg-editor-hover transition font-bold"
              >
                {explorerOpen ? (
                  <ChevronDown className="w-3.5 h-3.5 text-editor-textMuted" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5 text-editor-textMuted" />
                )}
                <span className="truncate">YASH-PORTFOLIO</span>
              </button>

              {explorerOpen && (
                <div className="pl-3 mt-1">
                  {/* Pages Folder */}
                  <div>
                    <button
                      onClick={() => setPagesOpen(!pagesOpen)}
                      className="w-full flex items-center gap-1.5 px-3 py-1 text-editor-textSecondary hover:text-editor-textPrimary hover:bg-editor-hover transition"
                    >
                      {pagesOpen ? (
                        <ChevronDown className="w-3.5 h-3.5 text-syntax-storage" />
                      ) : (
                        <ChevronRight className="w-3.5 h-3.5 text-syntax-storage" />
                      )}
                      <span>src / pages</span>
                    </button>

                    {pagesOpen && (
                      <div className="pl-4 space-y-0.5 mt-0.5">
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
                                  ? "bg-editor-hover text-editor-textPrimary font-medium border-l-2 border-editor-borderFocus"
                                  : "text-editor-textSecondary hover:text-editor-textPrimary hover:bg-editor-hover"
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
                  <div className="pl-3 mt-3 pt-2 border-t border-editor-border space-y-0.5">
                    <button
                      onClick={handleResumeClick}
                      className="w-full flex items-center gap-2 px-3 py-1.5 rounded-sm text-editor-textSecondary hover:text-syntax-string hover:bg-editor-hover transition group text-left cursor-pointer"
                    >
                      <FileDown className="w-4 h-4 text-syntax-string" />
                      <span className="truncate">Yash_Resume.pdf</span>
                    </button>

                    <a
                      href={PERSONAL_INFO.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 px-3 py-1.5 rounded-sm text-editor-textSecondary hover:text-editor-textPrimary hover:bg-editor-hover transition"
                    >
                      <Github className="w-4 h-4 text-syntax-keyword" />
                      <span className="truncate">github.url</span>
                    </a>

                    <div className="flex items-center gap-2 px-3 py-1.5 text-editor-textMuted">
                      <FileText className="w-4 h-4 text-syntax-func" />
                      <span>package.json</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quick Stats / Info Widget at bottom of sidebar */}
          <div className="p-3 border-t border-editor-border bg-editor-bg text-[11px] text-editor-textMuted">
            <div className="flex items-center justify-between mb-1">
              <span className="text-editor-textMuted font-semibold text-[10px]">STATUS</span>
              <span className="flex items-center gap-1.5 text-syntax-type">
                <span className="w-1.5 h-1.5 rounded-full bg-syntax-type"></span>
                <span>Open for roles</span>
              </span>
            </div>
            <p className="text-editor-textMuted text-[10px] leading-relaxed">
              M.Tech Scholar @ MANIT Bhopal
            </p>
          </div>
        </aside>
      )}
    </div>
  );
}
