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
  Code,
  Sparkles,
} from "lucide-react";
import confetti from "canvas-confetti";
import { PERSONAL_INFO } from "@/data/portfolioData";

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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Trigger open via custom event or parent
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
      id: "home",
      title: "Go to Home (home.tsx)",
      description: "Hero, Overview, and Quick Stats",
      icon: <FileCode2 className="w-4 h-4 text-sky-400" />,
      run: () => {
        router.push("/");
        onClose();
      },
    },
    {
      id: "about",
      title: "Go to About (about.tsx)",
      description: "Bio, Education Timeline, and Skills Matrix",
      icon: <User className="w-4 h-4 text-purple-400" />,
      run: () => {
        router.push("/about");
        onClose();
      },
    },
    {
      id: "projects",
      title: "Go to Projects (projects.tsx)",
      description: "Browse GitHub repositories & featured apps",
      icon: <FolderGit2 className="w-4 h-4 text-emerald-400" />,
      run: () => {
        router.push("/projects");
        onClose();
      },
    },
    {
      id: "contact",
      title: "Go to Contact (contact.tsx)",
      description: "Send message, email, WhatsApp, or socials",
      icon: <Mail className="w-4 h-4 text-amber-400" />,
      run: () => {
        router.push("/contact");
        onClose();
      },
    },
    {
      id: "terminal",
      title: "Toggle Integrated Terminal",
      description: "Open the interactive bash terminal (Ctrl + `)",
      icon: <Terminal className="w-4 h-4 text-cyan-400" />,
      run: () => {
        if (onToggleTerminal) onToggleTerminal();
        onClose();
      },
    },
    {
      id: "resume",
      title: "Download Resume (PDF)",
      description: "Download Yash's latest verified resume with celebratory confetti",
      icon: <FileDown className="w-4 h-4 text-rose-400" />,
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
      icon: <ExternalLink className="w-4 h-4 text-slate-300" />,
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
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-xl bg-editor-card border border-editor-border rounded-xl shadow-2xl shadow-black/80 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3 border-b border-editor-border bg-editor-bg/80">
          <Search className="w-5 h-5 text-sky-400 mr-3 flex-shrink-0" />
          <input
            type="text"
            placeholder="Type a command or file name... (e.g. projects, resume, terminal)"
            className="w-full bg-transparent text-sm text-slate-200 placeholder-slate-500 focus:outline-none font-code"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 divide-y divide-slate-800/40">
          {filteredActions.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-sm">
              No matching commands or files found for "{query}".
            </div>
          ) : (
            filteredActions.map((action) => (
              <button
                key={action.id}
                onClick={action.run}
                className="w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-800/70 transition group text-sm"
              >
                <div className="p-2 rounded-md bg-slate-900 border border-slate-800 group-hover:border-sky-500/40 transition">
                  {action.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-slate-200 font-medium font-code text-xs group-hover:text-sky-300 transition">
                    {action.title}
                  </div>
                  <div className="text-slate-400 text-xs truncate">
                    {action.description}
                  </div>
                </div>
                <span className="text-[10px] text-slate-500 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-800 font-code">
                  Press ↵
                </span>
              </button>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 border-t border-editor-border bg-editor-sidebar text-[11px] text-slate-500 flex justify-between items-center font-code">
          <span>Tip: Navigation and actions available via keyboard</span>
          <span>ESC to close</span>
        </div>
      </div>
    </div>
  );
}
