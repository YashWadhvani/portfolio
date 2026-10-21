"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FileCode,
  X,
  ChevronRight,
  Code2,
} from "lucide-react";

export default function TabBar() {
  const pathname = usePathname();

  const tabs = [
    {
      id: "home",
      name: "home.tsx",
      path: "/",
      color: "text-sky-400",
      crumb: "home.tsx",
    },
    {
      id: "about",
      name: "about.tsx",
      path: "/about",
      color: "text-purple-400",
      crumb: "about.tsx",
    },
    {
      id: "projects",
      name: "projects.tsx",
      path: "/projects",
      color: "text-emerald-400",
      crumb: "projects.tsx",
    },
    {
      id: "contact",
      name: "contact.tsx",
      path: "/contact",
      color: "text-amber-400",
      crumb: "contact.tsx",
    },
  ];

  const currentTab =
    tabs.find((t) =>
      t.path === "/" ? pathname === "/" : pathname.startsWith(t.path)
    ) || tabs[0];

  return (
    <div className="border-b border-editor-border bg-editor-sidebar select-none font-code text-xs">
      {/* File Tabs Strip */}
      <div className="flex items-center justify-between overflow-x-auto scrollbar-none">
        <div className="flex items-center">
          {tabs.map((tab) => {
            const isActive =
              tab.path === "/"
                ? pathname === "/"
                : pathname.startsWith(tab.path);
            return (
              <Link
                key={tab.id}
                href={tab.path}
                className={`group flex items-center gap-2 px-4 py-2.5 border-r border-editor-border transition relative ${
                  isActive
                    ? "bg-editor-bg text-slate-100 font-semibold border-t-2 border-t-sky-400"
                    : "bg-editor-inactiveTab text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"
                }`}
              >
                <FileCode className={`w-3.5 h-3.5 ${tab.color}`} />
                <span className="text-xs">{tab.name}</span>
                <span className="opacity-0 group-hover:opacity-100 p-0.5 rounded hover:bg-slate-700/80 text-slate-400 hover:text-white transition">
                  <X className="w-3 h-3" />
                </span>
              </Link>
            );
          })}
        </div>

      </div>

      {/* Breadcrumb Trail */}
      <div className="flex items-center gap-1.5 px-4 py-1.5 bg-editor-bg/60 text-[11px] text-slate-500 border-t border-editor-border/30">
        <span className="hover:text-slate-300 cursor-pointer">portfolio</span>
        <ChevronRight className="w-3 h-3" />
        <span className="hover:text-slate-300 cursor-pointer">src</span>
        <ChevronRight className="w-3 h-3" />
        <span className="hover:text-slate-300 cursor-pointer">pages</span>
        <ChevronRight className="w-3 h-3" />
        <div className="flex items-center gap-1 text-sky-400 font-semibold">
          <Code2 className="w-3 h-3" />
          <span>{currentTab.crumb}</span>
        </div>
      </div>
    </div>
  );
}
