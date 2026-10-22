"use client";

import React, { useState, useEffect } from "react";
import SpotifyNowPlaying from "./SpotifyNowPlaying";
import {
  GitBranch,
  XCircle,
  AlertTriangle,
  Terminal,
  CheckCheck,
  Clock,
  Radio,
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
    <footer className="h-6 shrink-0 w-full bg-[#007ACC] text-white flex items-center justify-between px-2.5 z-40 select-none font-code text-[11px]">
      {/* Left items */}
      <div className="flex items-center space-x-1 sm:space-x-2">
        <a
          href="https://github.com/YashWadhvani/portfolio"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1 px-1.5 py-0.5 rounded hover:bg-[#0E639C] transition text-white"
          title="Git Branch: master"
        >
          <GitBranch className="w-3 h-3" />
          <span>master*</span>
        </a>

        <div className="flex items-center gap-1">
          <span className="flex items-center gap-1 px-1.5 py-0.5 rounded hover:bg-[#0E639C] cursor-pointer">
            <XCircle className="w-3 h-3" />
            <span>0</span>
          </span>
          <span className="flex items-center gap-1 px-1.5 py-0.5 rounded hover:bg-[#0E639C] cursor-pointer">
            <AlertTriangle className="w-3 h-3" />
            <span>0</span>
          </span>
        </div>

        <button
          onClick={onToggleTerminal}
          className={`flex items-center gap-1 px-1.5 py-0.5 rounded transition ${
            isTerminalOpen ? "bg-[#0E639C] font-semibold" : "hover:bg-[#0E639C]"
          }`}
          title="Toggle Integrated Terminal (Ctrl + `)"
        >
          <Terminal className="w-3 h-3" />
          <span>Terminal</span>
        </button>
      </div>

      {/* Right items */}
      <div className="flex items-center space-x-1.5 sm:space-x-3 text-white/90">
        <div className="hidden md:block">
          <SpotifyNowPlaying variant="ticker" />
        </div>
        <span className="hidden lg:inline hover:bg-[#0E639C] px-1 py-0.5 rounded cursor-pointer">
          Ln 42, Col 18
        </span>
        <span className="hidden sm:inline hover:bg-[#0E639C] px-1 py-0.5 rounded cursor-pointer">
          UTF-8
        </span>
        <span className="hover:bg-[#0E639C] px-1.5 py-0.5 rounded flex items-center gap-1 cursor-pointer">
          <CheckCheck className="w-3 h-3 text-emerald-300" />
          <span>Prettier</span>
        </span>
        <span className="hidden sm:flex items-center gap-1 hover:bg-[#0E639C] px-1.5 py-0.5 rounded cursor-pointer">
          <span>TypeScript JSX</span>
        </span>
        <span className="flex items-center gap-1 bg-[#0E639C] px-1.5 py-0.5 rounded">
          <Clock className="w-3 h-3" />
          <span>{time || "00:00:00"}</span>
        </span>
      </div>
    </footer>
  );
}
