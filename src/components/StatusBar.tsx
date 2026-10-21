"use client";

import React, { useState, useEffect } from "react";
import SpotifyNowPlaying from "./SpotifyNowPlaying";
import {
  GitBranch,
  XCircle,
  AlertTriangle,
  Terminal,
  CheckCheck,
  Radio,
  Clock,
  Sparkles,
} from "lucide-react";

interface StatusBarProps {
  isTerminalOpen: boolean;
  onToggleTerminal: () => void;
}

export default function StatusBar({
  isTerminalOpen,
  onToggleTerminal,
}: StatusBarProps) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="fixed bottom-0 left-0 right-0 h-7 bg-editor-status border-t border-editor-border text-[11px] text-slate-400 flex items-center justify-between px-3 z-50 select-none font-code">
      {/* Left items */}
      <div className="flex items-center space-x-3">
        <a
          href="https://github.com/YashWadhvani/portfolio"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1 text-sky-400 hover:text-sky-300 transition"
          title="Git Branch: master"
        >
          <GitBranch className="w-3.5 h-3.5" />
          <span>master*</span>
        </a>

        <div className="flex items-center gap-2 text-slate-500">
          <span className="flex items-center gap-1 hover:text-slate-300 cursor-pointer">
            <XCircle className="w-3 h-3 text-emerald-400" />
            <span>0</span>
          </span>
          <span className="flex items-center gap-1 hover:text-slate-300 cursor-pointer">
            <AlertTriangle className="w-3 h-3 text-amber-400" />
            <span>0</span>
          </span>
        </div>

        <button
          onClick={onToggleTerminal}
          className={`flex items-center gap-1.5 px-2 py-0.5 rounded transition ${
            isTerminalOpen
              ? "bg-sky-950 text-sky-300 border border-sky-800/40"
              : "hover:bg-slate-800 text-slate-400 hover:text-slate-200"
          }`}
          title="Toggle Integrated Terminal (Ctrl + `)"
        >
          <Terminal className="w-3 h-3 text-cyan-400" />
          <span>Terminal</span>
        </button>
      </div>

      {/* Right items */}
      <div className="flex items-center space-x-3 text-slate-400">
        <div className="hidden md:block">
          <SpotifyNowPlaying variant="ticker" />
        </div>
        <span className="hidden lg:inline text-slate-500">Ln 42, Col 18</span>
        <span className="hidden sm:inline text-slate-500">UTF-8</span>
        <span className="flex items-center gap-1 text-sky-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>TypeScript JSX</span>
        </span>
        <span className="flex items-center gap-1 text-slate-300 bg-slate-900/80 px-1.5 py-0.5 rounded border border-slate-800">
          <Clock className="w-3 h-3 text-sky-400" />
          <span>{time || "00:00:00"}</span>
        </span>
      </div>
    </footer>
  );
}
