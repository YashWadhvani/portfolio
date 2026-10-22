"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  GraduationCap,
  Layers,
  CheckCircle2,
  MapPin,
  Briefcase,
  BookOpen,
  Terminal,
  Users,
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
    <div className="max-w-6xl mx-auto space-y-12 py-2 sm:py-6 text-editor-textPrimary">
      {/* Header Breadcrumb Banner */}
      <div className="space-y-2 border-b border-editor-border pb-5">
        <div className="flex items-center gap-2 text-xs font-code text-syntax-keyword">
          <Terminal className="w-4 h-4" />
          <span>ABOUT_ME.MD</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-editor-textHeading tracking-tight">
          Background, Experience &amp; Skills
        </h1>
        <p className="text-editor-textSecondary text-xs sm:text-sm font-sans max-w-3xl leading-relaxed">
          Curriculum vitae detailing postgraduate engineering at MANIT Bhopal, full-stack industry experience at Logion Solutions, research publications, and technical competencies.
        </p>
      </div>

      {/* Bio & Profile Spotlight */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Avatar & Quick Info */}
        <div className="lg:col-span-4">
          <div className="rounded-lg border border-editor-border bg-editor-card p-5 space-y-4 shadow-vscode">
            <div className="relative mx-auto w-40 h-40 rounded-md overflow-hidden border border-editor-border bg-editor-bg">
              <Image
                src={PERSONAL_INFO.avatar}
                alt={PERSONAL_INFO.name}
                fill
                sizes="160px"
                className="object-cover"
              />
            </div>

            <div className="text-center space-y-1">
              <h3 className="text-base font-bold text-editor-textHeading font-sans">
                {PERSONAL_INFO.name}
              </h3>
              <p className="text-xs text-syntax-variable font-code">
                M.Tech Scholar @ MANIT Bhopal
              </p>
              <div className="flex items-center justify-center gap-1.5 text-xs text-editor-textMuted font-sans pt-0.5">
                <MapPin className="w-3.5 h-3.5 text-syntax-string" />
                <span>Bhopal / Ahmedabad, India</span>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="border-t border-editor-border pt-3.5 space-y-2 text-xs font-code">
              <div className="flex justify-between text-editor-textMuted">
                <span>Postgraduate:</span>
                <span className="text-syntax-type font-medium">M.Tech MANIT Bhopal</span>
              </div>
              <div className="flex justify-between text-editor-textMuted">
                <span>Undergrad CGPA:</span>
                <span className="text-syntax-variable font-medium">8.72 / 10.0</span>
              </div>
              <div className="flex justify-between text-editor-textMuted">
                <span>Industry:</span>
                <span className="text-editor-textHeading">Logion Solutions</span>
              </div>
              <div className="flex justify-between text-editor-textMuted">
                <span>Research:</span>
                <span className="text-syntax-keyword">IEEE AIEI 2026</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Markdown-Style Story */}
        <div className="lg:col-span-8 space-y-5">
          <div className="rounded-lg border border-editor-border bg-editor-card p-6 space-y-4 shadow-vscode">
            <div className="flex items-center gap-2 text-xs font-code text-editor-textMuted pb-2 border-b border-editor-border">
              <span className="text-syntax-storage font-medium">PROFILE_SUMMARY.MD</span>
              <span>&bull;</span>
              <span>Verified Engineering Record</span>
            </div>

            <div className="text-editor-textSecondary space-y-3 font-sans text-xs sm:text-sm leading-relaxed">
              <p>
                Hello! I'm <strong className="text-editor-textHeading font-semibold">{PERSONAL_INFO.name}</strong>, an Advanced Computing postgrad scholar at Maulana Azad National Institute of Technology (MANIT), Bhopal and a Computer Science Engineering graduate from Karnavati University (CGPA 8.72).
              </p>
              <p>
                During my tenure as a <strong>Full Stack Development Intern at Logion Solutions</strong>, I architected production CRM modules (invoicing, quotation, KOT, delivery workflows, automated notifications), integrated payment gateways (Razorpay, CCAvenue), and built cross-platform mobile apps like IPI Connect and Metal Rates deployed to both Google Play Store and Apple App Store.
              </p>
              <p>
                In academic research, I authored <em>"A Multi-Factor Risk-Minimization Framework for Integrated Personal Safety and Navigation"</em>, accepted at the IEEE International Conference on AI Engineering and Innovations (AIEI 2026), combining urban safety indicators with XGBoost, LSTM, and GeoHash spatial discretization.
              </p>
            </div>

            {/* Quick Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-3 border-t border-editor-border text-xs font-code">
              <div className="p-2.5 rounded bg-editor-bg border border-editor-border">
                <span className="text-editor-textMuted block text-[10px]">DEGREE</span>
                <span className="text-syntax-variable font-medium">M.Tech Adv Comp</span>
              </div>
              <div className="p-2.5 rounded bg-editor-bg border border-editor-border">
                <span className="text-editor-textMuted block text-[10px]">UNDERGRAD</span>
                <span className="text-syntax-type font-medium">B.Tech (8.72)</span>
              </div>
              <div className="p-2.5 rounded bg-editor-bg border border-editor-border">
                <span className="text-editor-textMuted block text-[10px]">INTERNSHIP</span>
                <span className="text-syntax-keyword font-medium">Logion Solutions</span>
              </div>
              <div className="p-2.5 rounded bg-editor-bg border border-editor-border">
                <span className="text-editor-textMuted block text-[10px]">PUBLICATION</span>
                <span className="text-syntax-func font-medium">IEEE AIEI 2026</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Experience Section */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-code text-syntax-keyword">
          <Briefcase className="w-4 h-4" />
          <span>WORK_EXPERIENCE.LOG</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-editor-textHeading tracking-tight">
          Industry Work Experience
        </h2>

        <div className="space-y-4 mt-2">
          {EXPERIENCES.map((exp, idx) => (
            <div
              key={idx}
              className="rounded-lg border border-editor-border bg-editor-card p-5 hover:border-editor-borderFocus transition shadow-vscode space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-editor-border pb-3">
                <div>
                  <h3 className="text-base font-bold text-editor-textHeading font-sans">
                    {exp.role} <span className="text-syntax-variable font-medium">@ {exp.company}</span>
                  </h3>
                  <span className="text-xs font-code text-editor-textMuted">
                    {exp.type} &bull; {exp.period}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {exp.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2 py-0.5 rounded bg-editor-bg border border-editor-border text-[10px] font-code text-editor-textSecondary"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <ul className="space-y-1.5 text-xs sm:text-sm text-editor-textSecondary font-sans">
                {exp.description.map((point, pIdx) => (
                  <li key={pIdx} className="flex items-start gap-2 leading-relaxed">
                    <CheckCircle2 className="w-3.5 h-3.5 text-syntax-storage mt-0.5 flex-shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Publications Section */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-code text-syntax-type">
          <BookOpen className="w-4 h-4" />
          <span>ACADEMIC_PUBLICATIONS.BIB</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-editor-textHeading tracking-tight">
          Research &amp; Publications
        </h2>

        <div className="space-y-3">
          {PUBLICATIONS.map((pub, idx) => (
            <div
              key={idx}
              className="rounded-lg border border-editor-border bg-editor-card p-5 hover:border-editor-borderFocus transition shadow-vscode space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-code px-2 py-0.5 rounded bg-editor-bg border border-editor-border text-syntax-type font-medium">
                  {pub.status}
                </span>
                <span className="text-xs font-code text-editor-textMuted">{pub.year}</span>
              </div>
              <h3 className="text-base font-bold text-editor-textHeading font-sans">
                {pub.title}
              </h3>
              <p className="text-xs text-syntax-storage font-code font-medium">
                {pub.conference}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Leadership & Volunteering */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-code text-syntax-func">
          <Users className="w-4 h-4" />
          <span>LEADERSHIP_AND_VOLUNTEERING.TSX</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-editor-textHeading tracking-tight">
          Leadership &amp; Volunteering
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {LEADERSHIP.map((item, idx) => (
            <div
              key={idx}
              className="rounded-lg border border-editor-border bg-editor-card p-4 hover:border-editor-borderFocus transition shadow-vscode space-y-2.5"
            >
              <div>
                <span className="text-[11px] font-code text-syntax-func font-medium">
                  {item.period}
                </span>
                <h3 className="text-sm font-bold text-editor-textHeading font-sans">
                  {item.role}
                </h3>
                <span className="text-xs font-code text-editor-textMuted">
                  {item.organization}
                </span>
              </div>

              <div className="space-y-1 text-xs text-editor-textSecondary font-sans">
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

      {/* Education Timeline */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-code text-syntax-storage">
          <GraduationCap className="w-4 h-4" />
          <span>EDUCATION_TIMELINE.LOG</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-editor-textHeading tracking-tight">
          Educational Qualifications
        </h2>

        <div className="relative pl-6 border-l border-editor-border space-y-6 mt-4">
          {EDUCATION.map((item, index) => (
            <div key={index} className="relative group">
              {/* Timeline indicator node */}
              <div className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-editor-bg border-2 border-syntax-storage"></div>

              <div className="rounded-lg border border-editor-border bg-editor-card p-5 hover:border-editor-borderFocus transition shadow-vscode space-y-2.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="space-y-0.5">
                    <span className="text-xs font-code text-editor-textMuted">
                      milestone #{EDUCATION.length - index} &bull; {item.period}
                    </span>
                    <h3 className="text-base font-bold text-editor-textHeading font-sans">
                      {item.degree}
                    </h3>
                  </div>

                  {item.score && (
                    <span className="text-xs font-code px-2 py-0.5 rounded bg-editor-bg border border-editor-border text-syntax-type font-medium w-fit">
                      {item.score}
                    </span>
                  )}
                  {item.status && (
                    <span className="text-xs font-code px-2 py-0.5 rounded bg-editor-bg border border-editor-border text-syntax-variable font-medium w-fit">
                      {item.status}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 text-xs font-code text-editor-textMuted">
                  <span className="text-editor-textSecondary">{item.institution}</span>
                  <span>&bull;</span>
                  <span>{item.location}</span>
                </div>

                <p className="text-editor-textSecondary text-xs sm:text-sm leading-relaxed font-sans">
                  {item.description}
                </p>

                {/* Highlights */}
                <div className="pt-1.5 space-y-1">
                  {item.highlights.map((h, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-2 text-xs text-editor-textSecondary font-sans">
                      <CheckCircle2 className="w-3.5 h-3.5 text-syntax-storage mt-0.5 flex-shrink-0" />
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
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-editor-border pb-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-code text-syntax-type mb-1">
              <Layers className="w-4 h-4" />
              <span>SKILLS_AND_TECH_MATRIX</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-editor-textHeading tracking-tight">
              Verified Technical Skills
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1">
            {categoriesList.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveSkillCategory(cat)}
                className={`px-2.5 py-1 rounded text-xs font-code transition cursor-pointer ${
                  activeSkillCategory === cat
                    ? "bg-[#0E639C] text-white font-medium"
                    : "bg-editor-card border border-editor-border text-editor-textMuted hover:text-editor-textPrimary hover:bg-editor-hover"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {displayedSkills.map((skill, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center p-3.5 rounded-lg border border-editor-border bg-editor-card hover:bg-editor-hover hover:border-editor-borderFocus transition group shadow-vscode"
            >
              <div className="relative w-10 h-10 mb-2">
                <img
                  src={skill.icon}
                  alt={skill.name}
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </div>
              <span className="text-xs font-medium text-editor-textPrimary text-center font-sans group-hover:text-editor-textHeading transition">
                {skill.name}
              </span>
              <span className="text-[10px] text-editor-textMuted font-code mt-0.5">
                {skill.level}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
