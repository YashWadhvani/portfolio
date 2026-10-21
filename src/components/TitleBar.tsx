"use client";

import React from "react";
import {
  Code,
  Search,
  PanelLeft,
  Terminal,
  Sparkles,
  Menu,
} from "lucide-react";

interface TitleBarProps {
  onToggleSidebar: () => void;
  onOpenCommandPalette: () => void;
}

export default function TitleBar({
  onToggleSidebar,
  onOpenCommandPalette,
}: TitleBarProps) {
  return (
    <header className="h-9 bg-editor-sidebar border-b border-editor-border flex items-center justify-between px-3 select-none text-xs text-slate-400 font-code z-40">
      {/* Left traffic lights & branding */}
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-1.5">
          <span className="w-3 h-3 rounded-full bg-rose-500/80 border border-rose-600 hover:opacity-80 transition cursor-pointer" />
          <span className="w-3 h-3 rounded-full bg-amber-500/80 border border-amber-600 hover:opacity-80 transition cursor-pointer" />
          <span className="w-3 h-3 rounded-full bg-emerald-500/80 border border-emerald-600 hover:opacity-80 transition cursor-pointer" />
        </div>

        <button
          onClick={onToggleSidebar}
          className="p-1 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded transition ml-2"
          title="Toggle Sidebar"
        >
          <PanelLeft className="w-3.5 h-3.5" />
        </button>

        <div className="hidden sm:flex items-center gap-1.5 text-slate-300 font-semibold">
          <Code className="w-3.5 h-3.5 text-sky-400" />
          <span className="text-slate-200">Yash Wadhvani</span>
        </div>
      </div>

      {/* Center Search Input / Command Palette Trigger */}
      <div className="flex-1 max-w-xs sm:max-w-md mx-2 sm:mx-4">
        <button
          onClick={onOpenCommandPalette}
          className="w-full flex items-center justify-center gap-2 bg-editor-bg border border-editor-border/80 hover:border-sky-500/50 px-2.5 sm:px-3 py-1 rounded text-slate-400 hover:text-slate-200 transition text-[10px] sm:text-[11px] shadow-sm"
        >
          <Search className="w-3 h-3 text-sky-400 flex-shrink-0" />
          <span className="truncate">yash-wadhvani — Search (Ctrl + K)</span>
        </button>
      </div>

      {/* Right Branding / Status */}
      <div className="flex items-center space-x-2">
        <div className="hidden md:flex items-center gap-1.5 bg-slate-900/60 border border-slate-800 px-2 py-0.5 rounded text-[11px] text-purple-300">
          <Sparkles className="w-3 h-3 text-purple-400" />
          <span>v2.0 Next.js</span>
        </div>
      </div>
    </header>
  );
}
