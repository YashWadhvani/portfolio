"use client";

import React from "react";
import {
  Code,
  Search,
  PanelLeft,
  Sun,
  Moon,
} from "lucide-react";
import { useTheme } from "./ThemeContext";

interface TitleBarProps {
  onToggleSidebar: () => void;
  onOpenCommandPalette: () => void;
}

export default function TitleBar({
  onToggleSidebar,
  onOpenCommandPalette,
}: TitleBarProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="h-8 bg-editor-titleBar border-b border-editor-border flex items-center justify-between px-3 select-none text-xs text-editor-textMuted font-code z-40 shrink-0">
      {/* Left traffic lights & branding */}
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 rounded-full bg-[#ED6A5E] border border-[#CF554A] cursor-pointer" />
          <span className="w-3 h-3 rounded-full bg-[#F5BF4F] border border-[#D5A035] cursor-pointer" />
          <span className="w-3 h-3 rounded-full bg-[#62C554] border border-[#4EA840] cursor-pointer" />
        </div>

        <button
          onClick={onToggleSidebar}
          className="p-1 text-editor-textMuted hover:text-editor-textPrimary hover:bg-editor-hover rounded transition ml-1"
          title="Toggle Primary Side Bar (Ctrl + B)"
        >
          <PanelLeft className="w-3.5 h-3.5" />
        </button>

        <div className="hidden sm:flex items-center gap-1.5 text-editor-textSecondary font-medium text-xs">
          <Code className="w-3.5 h-3.5 text-syntax-storage" />
          <span>Yash Wadhvani — Portfolio</span>
        </div>
      </div>

      {/* Center Search Input / Command Palette Trigger */}
      <div className="flex-1 max-w-xs sm:max-w-md mx-2 sm:mx-4">
        <button
          onClick={onOpenCommandPalette}
          className="w-full flex items-center justify-center gap-2 bg-editor-input border border-editor-borderInput hover:border-editor-borderFocus px-3 py-0.5 rounded text-editor-textInput transition text-[11px]"
        >
          <Search className="w-3 h-3 text-syntax-variable flex-shrink-0" />
          <span className="truncate">yash-wadhvani &bull; Search files &amp; commands (Ctrl + K)</span>
        </button>
      </div>

      {/* Right: Interactive VS Code Theme Toggle Button */}
      <div className="flex items-center space-x-2">
        <button
          onClick={toggleTheme}
          className="flex items-center gap-1.5 px-2 py-0.5 rounded transition text-[11px] font-code bg-editor-bg border border-editor-border text-editor-textPrimary hover:border-editor-borderFocus shadow-xs cursor-pointer"
          title={`Click to switch to ${theme === "dark" ? "VS Code Light+" : "VS Code Dark+"}`}
        >
          {theme === "dark" ? (
            <>
              <Moon className="w-3.5 h-3.5 text-syntax-variable" />
              <span>VS Code Dark+</span>
            </>
          ) : (
            <>
              <Sun className="w-3.5 h-3.5 text-syntax-string" />
              <span>VS Code Light+</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
}
