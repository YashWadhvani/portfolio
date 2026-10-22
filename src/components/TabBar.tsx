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
      color: "text-syntax-storage",
      crumb: "home.tsx",
    },
    {
      id: "about",
      name: "about.tsx",
      path: "/about",
      color: "text-syntax-keyword",
      crumb: "about.tsx",
    },
    {
      id: "projects",
      name: "projects.tsx",
      path: "/projects",
      color: "text-syntax-type",
      crumb: "projects.tsx",
    },
    {
      id: "contact",
      name: "contact.tsx",
      path: "/contact",
      color: "text-syntax-string",
      crumb: "contact.tsx",
    },
  ];

  const currentTab =
    tabs.find((t) =>
      t.path === "/" ? pathname === "/" : pathname.startsWith(t.path)
    ) || tabs[0];

  return (
    <div className="border-b border-editor-border bg-editor-sidebar select-none font-code text-xs shrink-0">
      {/* File Tabs Strip */}
      <div className="flex items-center overflow-x-auto scrollbar-none bg-editor-sidebar">
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
                className={`group flex items-center gap-2 px-3.5 py-2 border-r border-editor-border transition relative ${
                  isActive
                    ? "bg-editor-activeTab text-editor-textActiveTab font-medium border-t-2 border-t-[#007ACC]"
                    : "bg-editor-inactiveTab text-editor-textInactiveTab hover:bg-editor-hover hover:text-editor-textPrimary"
                }`}
              >
                <FileCode className={`w-3.5 h-3.5 ${tab.color}`} />
                <span className="text-xs">{tab.name}</span>
                <span className="opacity-0 group-hover:opacity-100 p-0.5 rounded hover:bg-editor-hover text-editor-textMuted hover:text-editor-textPrimary transition">
                  <X className="w-3 h-3" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Breadcrumb Trail */}
      <div className="flex items-center gap-1.5 px-4 py-1.5 bg-editor-bg text-[11px] text-editor-textMuted border-t border-editor-border">
        <span className="hover:text-editor-textPrimary cursor-pointer">portfolio</span>
        <ChevronRight className="w-3 h-3 opacity-60" />
        <span className="hover:text-editor-textPrimary cursor-pointer">src</span>
        <ChevronRight className="w-3 h-3 opacity-60" />
        <span className="hover:text-editor-textPrimary cursor-pointer">pages</span>
        <ChevronRight className="w-3 h-3 opacity-60" />
        <div className="flex items-center gap-1 text-editor-textPrimary font-medium">
          <Code2 className="w-3 h-3 text-syntax-storage" />
          <span>{currentTab.crumb}</span>
        </div>
      </div>
    </div>
  );
}
