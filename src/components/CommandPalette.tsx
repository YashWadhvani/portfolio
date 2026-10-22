"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  FileCode2,
  User,
  FolderGit2,
  Mail,
  FileDown,
  Terminal,
  ExternalLink,
  X,
  Sun,
  Moon,
} from "lucide-react";
import confetti from "canvas-confetti";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { useTheme } from "./ThemeContext";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onToggleTerminal?: () => void;
}

export default function CommandPalette({
  isOpen,
  onClose,
  onToggleTerminal,
}: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) {
          onClose();
        }
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const actions = [
    {
      id: "theme",
      title: `Switch Theme to ${theme === "dark" ? "VS Code Light+" : "VS Code Dark+"}`,
      description: "Toggle between VS Code Default Dark+ and Light+ themes",
      icon: theme === "dark" ? <Sun className="w-4 h-4 text-syntax-string" /> : <Moon className="w-4 h-4 text-syntax-variable" />,
      run: () => {
        toggleTheme();
        onClose();
      },
    },
    {
      id: "home",
      title: "Go to Home (home.tsx)",
      description: "Hero, Overview, and Quick Stats",
      icon: <FileCode2 className="w-4 h-4 text-syntax-storage" />,
      run: () => {
        router.push("/");
        onClose();
      },
    },
    {
      id: "about",
      title: "Go to About (about.tsx)",
      description: "Bio, Education Timeline, and Skills Matrix",
      icon: <User className="w-4 h-4 text-syntax-keyword" />,
      run: () => {
        router.push("/about");
        onClose();
      },
    },
    {
      id: "projects",
      title: "Go to Projects (projects.tsx)",
      description: "Browse GitHub repositories & featured apps",
      icon: <FolderGit2 className="w-4 h-4 text-syntax-type" />,
      run: () => {
        router.push("/projects");
        onClose();
      },
    },
    {
      id: "contact",
      title: "Go to Contact (contact.tsx)",
      description: "Send message, email, WhatsApp, or socials",
      icon: <Mail className="w-4 h-4 text-syntax-string" />,
      run: () => {
        router.push("/contact");
        onClose();
      },
    },
    {
      id: "terminal",
      title: "Toggle Integrated Terminal",
      description: "Open the interactive bash terminal (Ctrl + `)",
      icon: <Terminal className="w-4 h-4 text-syntax-variable" />,
      run: () => {
        if (onToggleTerminal) onToggleTerminal();
        onClose();
      },
    },
    {
      id: "resume",
      title: "Download Resume (PDF)",
      description: "Download Yash's latest verified resume with celebratory confetti",
      icon: <FileDown className="w-4 h-4 text-syntax-string" />,
      run: () => {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 },
        });
        window.open(PERSONAL_INFO.resumeUrl, "_blank");
        onClose();
      },
    },
    {
      id: "github",
      title: "Open GitHub Profile",
      description: "github.com/YashWadhvani",
      icon: <ExternalLink className="w-4 h-4 text-editor-textMuted" />,
      run: () => {
        window.open(PERSONAL_INFO.githubUrl, "_blank");
        onClose();
      },
    },
  ];

  const filteredActions = actions.filter(
    (action) =>
      action.title.toLowerCase().includes(query.toLowerCase()) ||
      action.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/60 animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-xl bg-editor-card border border-editor-border rounded-lg shadow-vscode overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-2.5 border-b border-editor-border bg-editor-bg">
          <Search className="w-4 h-4 text-syntax-storage mr-3 flex-shrink-0" />
          <input
            type="text"
            placeholder="Type a command or file name... (e.g. projects, resume, theme, terminal)"
            className="w-full bg-transparent text-xs text-editor-textPrimary placeholder-editor-textMuted focus:outline-none font-code"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          <button
            onClick={onClose}
            className="p-1 rounded text-editor-textMuted hover:text-editor-textPrimary hover:bg-editor-hover transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-1.5 divide-y divide-editor-border/50">
          {filteredActions.length === 0 ? (
            <div className="p-8 text-center text-editor-textMuted text-xs font-code">
              No matching commands or files found for "{query}".
            </div>
          ) : (
            filteredActions.map((action) => (
              <button
                key={action.id}
                onClick={action.run}
                className="w-full text-left flex items-center gap-3 px-3 py-2 rounded hover:bg-editor-hover transition group text-xs cursor-pointer"
              >
                <div className="p-1.5 rounded bg-editor-bg border border-editor-border group-hover:border-editor-borderFocus transition">
                  {action.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-editor-textPrimary font-medium font-code group-hover:text-editor-textHeading transition">
                    {action.title}
                  </div>
                  <div className="text-editor-textMuted text-[11px] truncate group-hover:text-editor-textSecondary">
                    {action.description}
                  </div>
                </div>
                <span className="text-[10px] text-editor-textMuted bg-editor-bg px-1.5 py-0.5 rounded border border-editor-border font-code">
                  ↵
                </span>
              </button>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="px-3.5 py-1.5 border-t border-editor-border bg-editor-bg text-[10px] text-editor-textMuted flex justify-between items-center font-code">
          <span>Navigation and actions available via keyboard</span>
          <span>ESC to close</span>
        </div>
      </div>
    </div>
  );
}
