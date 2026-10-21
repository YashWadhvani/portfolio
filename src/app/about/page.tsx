"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  GraduationCap,
  Layers,
  Sparkles,
  GitCommit,
  CheckCircle2,
  Calendar,
  MapPin,
  ExternalLink,
  Briefcase,
  BookOpen,
  Award,
  Terminal,
  Users,
  FileCheck,
} from "lucide-react";
import {
  PERSONAL_INFO,
  EDUCATION,
  EXPERIENCES,
  PUBLICATIONS,
  LEADERSHIP,
  SKILL_CATEGORIES,
} from "@/data/portfolioData";

export default function AboutPage() {
  const [activeSkillCategory, setActiveSkillCategory] = useState("All");

  const allSkills = SKILL_CATEGORIES.flatMap((c) => c.skills);
  const categoriesList = ["All", ...SKILL_CATEGORIES.map((c) => c.title)];

  const displayedSkills =
    activeSkillCategory === "All"
      ? allSkills
      : SKILL_CATEGORIES.find((c) => c.title === activeSkillCategory)?.skills || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      {/* Header Breadcrumb Banner */}
      <div className="space-y-2 border-b border-editor-border pb-6">
        <div className="flex items-center gap-2 text-xs font-code text-purple-400">
          <Terminal className="w-4 h-4" />
          <span>ABOUT_ME.MD</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Background, Experience &amp; Skills
        </h1>
        <p className="text-slate-400 text-sm sm:text-base font-sans max-w-3xl">
          Comprehensive curriculum vitae detailing postgraduate engineering at MANIT Bhopal, full-stack industry experience at Logion Solutions, research publications, and technical competencies.
        </p>
      </div>

      {/* Bio & Profile Spotlight */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Avatar & Quick Info */}
        <div className="lg:col-span-4">
          <div className="rounded-2xl border border-editor-border bg-editor-card p-6 space-y-5 shadow-xl">
            <div className="relative mx-auto w-44 h-44 rounded-xl overflow-hidden border border-slate-800 bg-slate-900 shadow-lg">
              <Image
                src={PERSONAL_INFO.avatar}
                alt={PERSONAL_INFO.name}
                fill
                sizes="176px"
                className="object-cover"
              />
            </div>

            <div className="text-center space-y-1">
              <h3 className="text-lg font-bold text-white font-sans">
                {PERSONAL_INFO.name}
              </h3>
              <p className="text-xs text-purple-400 font-code">
                M.Tech Scholar @ MANIT Bhopal
              </p>
              <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 font-sans pt-1">
                <MapPin className="w-3.5 h-3.5 text-rose-400" />
                <span>Bhopal / Ahmedabad, India</span>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="border-t border-editor-border/60 pt-4 space-y-2.5 text-xs font-code">
              <div className="flex justify-between text-slate-400">
                <span>Postgraduate:</span>
                <span className="text-emerald-400 font-semibold">M.Tech MANIT Bhopal</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>B.Tech Distinction:</span>
                <span className="text-sky-300 font-semibold">CGPA: 8.72</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Industry Experience:</span>
                <span className="text-slate-200">Logion Solutions</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Research:</span>
                <span className="text-purple-400">IEEE AIEI 2026</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Markdown-Style Story */}
        <div className="lg:col-span-8 space-y-6">
          <div className="rounded-2xl border border-editor-border bg-editor-card/70 p-6 sm:p-8 space-y-4 shadow-xl">
            <div className="flex items-center gap-2 text-xs font-code text-slate-400 pb-3 border-b border-editor-border">
              <span className="text-purple-400 font-bold">PROFILE_SUMMARY.MD</span>
              <span>&bull;</span>
              <span>Verified Resume Record</span>
            </div>

            <div className="prose prose-invert max-w-none text-slate-300 space-y-4 font-sans text-sm sm:text-base leading-relaxed">
              <p>
                👋 Hello! I'm <strong className="text-sky-300 font-semibold">{PERSONAL_INFO.name}</strong>, an Advanced Computing postgrad scholar at Maulana Azad National Institute of Technology (MANIT), Bhopal and a Computer Science Engineering graduate from Karnavati University (CGPA 8.72).
              </p>
              <p>
                During my tenure as a <strong>Full Stack Development Intern at Logion Solutions</strong>, I architected production CRM modules (invoicing, quotation, KOT, delivery workflows, automated notifications), integrated payment gateways (Razorpay, CCAvenue), and built cross-platform mobile apps like IPI Connect and Metal Rates deployed to the Google Play Store and Apple App Store.
              </p>
              <p>
                In academic research, I authored <em>"A Multi-Factor Risk-Minimization Framework for Integrated Personal Safety and Navigation"</em>, accepted at the IEEE International Conference on AI Engineering and Innovations (AIEI 2026), combining urban safety indicators with XGBoost, LSTM, and GeoHash spatial discretization.
              </p>
            </div>

            {/* Quick Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-editor-border/60">
              <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 text-xs font-code text-slate-300">
                <span className="text-slate-500 block text-[10px]">DEGREE</span>
                <span className="text-sky-300 font-semibold">M.Tech Advanced Comp</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 text-xs font-code text-slate-300">
                <span className="text-slate-500 block text-[10px]">UNDERGRAD</span>
                <span className="text-emerald-400 font-semibold">B.Tech (8.72 CGPA)</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 text-xs font-code text-slate-300">
                <span className="text-slate-500 block text-[10px]">INTERNSHIP</span>
                <span className="text-purple-300 font-semibold">Logion Solutions</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 text-xs font-code text-slate-300">
                <span className="text-slate-500 block text-[10px]">PUBLICATION</span>
                <span className="text-amber-300 font-semibold">IEEE AIEI 2026</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Experience Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 text-xs font-code text-purple-400">
          <Briefcase className="w-4 h-4" />
          <span>WORK_EXPERIENCE.LOG</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Industry Work Experience
        </h2>

        <div className="space-y-6 mt-4">
          {EXPERIENCES.map((exp, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-editor-border bg-editor-card/70 p-6 hover:border-purple-500/40 transition shadow-lg space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-editor-border/50 pb-3">
                <div>
                  <h3 className="text-lg font-bold text-white font-sans">
                    {exp.role} <span className="text-purple-400 font-medium">@ {exp.company}</span>
                  </h3>
                  <span className="text-xs font-code text-slate-400">
                    {exp.type} &bull; {exp.period}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {exp.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] font-code text-slate-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <ul className="space-y-2 text-xs sm:text-sm text-slate-300 font-sans">
                {exp.description.map((point, pIdx) => (
                  <li key={pIdx} className="flex items-start gap-2 leading-relaxed">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 mt-1 flex-shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Publications Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 text-xs font-code text-emerald-400">
          <BookOpen className="w-4 h-4" />
          <span>ACADEMIC_PUBLICATIONS.BIB</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Research &amp; Publications
        </h2>

        <div className="space-y-4">
          {PUBLICATIONS.map((pub, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-editor-border bg-editor-card/70 p-6 hover:border-emerald-500/40 transition shadow-lg space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-code px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-800/40 text-emerald-300 font-semibold">
                  {pub.status}
                </span>
                <span className="text-xs font-code text-slate-400">{pub.year}</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white font-sans">
                {pub.title}
              </h3>
              <p className="text-xs sm:text-sm text-sky-400 font-code font-semibold">
                {pub.conference}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Leadership & Volunteering */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 text-xs font-code text-amber-400">
          <Users className="w-4 h-4" />
          <span>LEADERSHIP_AND_VOLUNTEERING.TSX</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Leadership &amp; Volunteering
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {LEADERSHIP.map((item, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-editor-border bg-editor-card/70 p-5 hover:border-amber-500/40 transition shadow-lg space-y-3"
            >
              <div>
                <span className="text-[11px] font-code text-amber-400 font-semibold">
                  {item.period}
                </span>
                <h3 className="text-base font-bold text-white font-sans">
                  {item.role}
                </h3>
                <span className="text-xs font-code text-slate-400">
                  {item.organization}
                </span>
              </div>

              <div className="space-y-1.5 text-xs text-slate-300 font-sans">
                {item.description.map((d, dIdx) => (
                  <p key={dIdx} className="leading-relaxed">
                    &bull; {d}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education Timeline (Git Commits Style) */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 text-xs font-code text-sky-400">
          <GraduationCap className="w-4 h-4" />
          <span>EDUCATION_TIMELINE.LOG</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Educational Qualifications
        </h2>

        <div className="relative pl-6 sm:pl-8 border-l-2 border-editor-border space-y-8 mt-6">
          {EDUCATION.map((item, index) => (
            <div key={index} className="relative group">
              {/* Git commit dot indicator */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-editor-card border-2 border-sky-400 group-hover:bg-sky-400 group-hover:scale-125 transition-all shadow-md shadow-sky-500/30"></div>

              <div className="rounded-xl border border-editor-border bg-editor-card/70 p-5 sm:p-6 hover:border-sky-500/40 hover:bg-slate-900/50 transition shadow-lg space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="space-y-0.5">
                    <span className="text-xs font-code text-purple-400 font-semibold">
                      milestone #{EDUCATION.length - index} &bull; {item.period}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-white font-sans">
                      {item.degree}
                    </h3>
                  </div>

                  {item.score && (
                    <span className="text-xs font-code px-2.5 py-1 rounded bg-sky-950/70 border border-sky-800/40 text-sky-300 font-bold w-fit">
                      {item.score}
                    </span>
                  )}
                  {item.status && (
                    <span className="text-xs font-code px-2.5 py-1 rounded bg-purple-950/70 border border-purple-800/40 text-purple-300 font-bold w-fit">
                      {item.status}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 text-xs font-code text-slate-400">
                  <span className="text-sky-300 font-semibold">{item.institution}</span>
                  <span>&bull;</span>
                  <span>{item.location}</span>
                </div>

                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-sans">
                  {item.description}
                </p>

                {/* Highlights */}
                <div className="pt-2 space-y-1">
                  {item.highlights.map((h, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-2 text-xs text-slate-300 font-sans">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills Matrix */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-editor-border pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-code text-emerald-400 mb-1">
              <Layers className="w-4 h-4" />
              <span>SKILLS_AND_TECH_MATRIX</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Verified Technical Skills
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5">
            {categoriesList.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveSkillCategory(cat)}
                className={`px-3 py-1 rounded-md text-xs font-code transition ${
                  activeSkillCategory === cat
                    ? "bg-sky-500 text-white font-semibold shadow-md shadow-sky-500/30"
                    : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {displayedSkills.map((skill, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center p-4 rounded-xl border border-editor-border bg-editor-card/60 hover:bg-slate-900 hover:border-sky-500/50 hover:scale-105 transition-all duration-300 group shadow-md"
            >
              <div className="relative w-12 h-12 mb-3">
                <img
                  src={skill.icon}
                  alt={skill.name}
                  className="w-full h-full object-contain filter group-hover:drop-shadow-[0_0_12px_rgba(56,189,248,0.5)] transition duration-300"
                  loading="lazy"
                />
              </div>
              <span className="text-xs font-semibold text-slate-200 text-center font-sans group-hover:text-sky-300 transition">
                {skill.name}
              </span>
              <span className="text-[10px] text-slate-500 font-code mt-0.5">
                {skill.level}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
