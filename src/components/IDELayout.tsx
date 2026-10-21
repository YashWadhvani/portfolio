"use client";

import React, { useState, useEffect } from "react";
import TitleBar from "./TitleBar";
import Sidebar from "./Sidebar";
import TabBar from "./TabBar";
import StatusBar from "./StatusBar";
import TerminalDrawer from "./TerminalDrawer";
import CommandPalette from "./CommandPalette";
import PageTransition from "./PageTransition";

export default function IDELayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Responsive check for screen size on mount and resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Keyboard shortcut listener: Ctrl+` for terminal, Ctrl+K for command palette, Ctrl+B for sidebar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "`") {
        e.preventDefault();
        setIsTerminalOpen((prev) => !prev);
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsPaletteOpen((prev) => !prev);
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "b") {
        e.preventDefault();
        setIsSidebarOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-editor-bg text-slate-100 select-text">
      {/* Top VS Code Titlebar */}
      <TitleBar
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        onOpenCommandPalette={() => setIsPaletteOpen(true)}
      />

      {/* Main workspace layout: ActivityBar + Sidebar + Editor Window */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Mobile Backdrop when sidebar is open */}
        {isMobile && isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs z-20"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar container */}
        <div
          className={`${
            isMobile
              ? `fixed top-9 bottom-7 left-0 z-30 transition-transform duration-300 shadow-2xl ${
                  isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                }`
              : "relative flex h-full"
          }`}
        >
          <Sidebar
            isOpen={isMobile ? true : isSidebarOpen}
            onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
          />
        </div>

        {/* Central Editor Area */}
        <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-editor-bg relative bg-grid-pattern">
          {/* File Tabs & Breadcrumbs */}
          <TabBar />

          {/* Code/Page Content Area */}
          <div className="flex-1 overflow-y-auto pb-14 bg-radial-glow px-2 sm:px-4">
            <PageTransition>{children}</PageTransition>
          </div>
        </main>
      </div>

      {/* Integrated Terminal Drawer */}
      <TerminalDrawer
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
      />

      {/* Command Palette Modal */}
      <CommandPalette
        isOpen={isPaletteOpen}
        onClose={() => setIsPaletteOpen(false)}
        onToggleTerminal={() => setIsTerminalOpen((prev) => !prev)}
      />

      {/* Bottom Status Bar */}
      <StatusBar
        isTerminalOpen={isTerminalOpen}
        onToggleTerminal={() => setIsTerminalOpen(!isTerminalOpen)}
      />
    </div>
  );
}
