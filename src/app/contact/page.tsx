"use client";

import React, { useState } from "react";
import {
  Mail,
  Send,
  MessageSquare,
  Github,
  Linkedin,
  Copy,
  Check,
  Sparkles,
  Terminal,
  MapPin,
  Clock,
  Phone,
  CheckCircle2,
} from "lucide-react";
import confetti from "canvas-confetti";
import { PERSONAL_INFO } from "@/data/portfolioData";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#38bdf8", "#c084fc", "#4ade80", "#fbbf24"],
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 900);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Page Header */}
      <div className="space-y-2 border-b border-editor-border pb-6">
        <div className="flex items-center gap-2 text-xs font-code text-amber-400">
          <Terminal className="w-4 h-4" />
          <span>CONTACT_DISPATCHER.TSX</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Get in Touch
        </h1>
        <p className="text-slate-400 text-sm sm:text-base font-sans max-w-2xl">
          Interested in collaborating on software engineering, AI/ML initiatives, or discussing open roles? Drop a message or reach out directly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Contact Form */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl border border-editor-border bg-editor-card p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-editor-border/60">
              <span className="text-xs font-code text-slate-400">
                sendMessage(payload: MessagePayload)
              </span>
              <span className="text-[11px] font-code text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/40">
                REST ENDPOINT: ACTIVE
              </span>
            </div>

            {submitted && (
              <div className="p-4 rounded-xl bg-emerald-950/50 border border-emerald-800/60 text-emerald-300 text-xs font-code flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-bold text-sm">Transmission Acknowledged! 🚀</p>
                  <p className="text-emerald-400/90 font-sans">
                    Thank you for reaching out! Your message was recorded, and Yash will reply promptly.
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-code text-slate-300">
                    sender.name <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ada Lovelace"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 bg-editor-bg border border-editor-border rounded-lg text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-sky-500 font-sans"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-code text-slate-300">
                    sender.email <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="ada@computing.org"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 bg-editor-bg border border-editor-border rounded-lg text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-sky-500 font-sans"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-code text-slate-300">
                  payload.subject
                </label>
                <input
                  type="text"
                  placeholder="Software Engineering Collaboration / Role"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 bg-editor-bg border border-editor-border rounded-lg text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-sky-500 font-sans"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-code text-slate-300">
                  payload.message <span className="text-rose-400">*</span>
                </label>
                <textarea
                  rows={5}
                  required
                  placeholder="Hey Yash, I saw your portfolio and would love to connect about..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 bg-editor-bg border border-editor-border rounded-lg text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-sky-500 font-sans resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-medium text-sm transition shadow-lg shadow-sky-500/25 font-code disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Transmitting Payload...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Dispatch Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Direct Channels & Information */}
        <div className="lg:col-span-5 space-y-6">
          {/* Quick Copy Email Card */}
          <div className="rounded-2xl border border-editor-border bg-editor-card p-6 space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-white font-sans flex items-center gap-2">
              <Mail className="w-4 h-4 text-sky-400" />
              <span>Direct Electronic Mail</span>
            </h3>

            <div className="flex items-center justify-between p-3 rounded-lg bg-editor-bg border border-editor-border font-code text-xs">
              <span className="text-slate-300 truncate">{PERSONAL_INFO.email}</span>
              <button
                onClick={handleCopyEmail}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] transition ml-2 flex-shrink-0"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Social Links List */}
          <div className="rounded-2xl border border-editor-border bg-editor-card p-6 space-y-4 shadow-xl font-sans">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>Network &amp; Direct Messaging</span>
            </h3>

            <div className="space-y-3 font-code text-xs">
              {/* WhatsApp */}
              <a
                href={PERSONAL_INFO.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/50 hover:bg-emerald-950/20 transition group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-emerald-950/60 text-emerald-400 border border-emerald-800/40">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-slate-200 font-semibold group-hover:text-emerald-300 transition">
                      WhatsApp Instant Chat
                    </div>
                    <div className="text-slate-500 text-[11px] font-sans">
                      {PERSONAL_INFO.phone}
                    </div>
                  </div>
                </div>
                <span className="text-emerald-400 text-xs font-semibold">&rarr;</span>
              </a>

              {/* LinkedIn */}
              <a
                href={PERSONAL_INFO.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-sky-500/50 hover:bg-sky-950/20 transition group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-sky-950/60 text-sky-400 border border-sky-800/40">
                    <Linkedin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-slate-200 font-semibold group-hover:text-sky-300 transition">
                      LinkedIn Professional Profile
                    </div>
                    <div className="text-slate-500 text-[11px] font-sans">
                      yash-wadhvani
                    </div>
                  </div>
                </div>
                <span className="text-sky-400 text-xs font-semibold">&rarr;</span>
              </a>

              {/* GitHub */}
              <a
                href={PERSONAL_INFO.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-purple-500/50 hover:bg-purple-950/20 transition group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-950/60 text-purple-400 border border-purple-800/40">
                    <Github className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-slate-200 font-semibold group-hover:text-purple-300 transition">
                      GitHub Repositories &amp; Code
                    </div>
                    <div className="text-slate-500 text-[11px] font-sans">
                      github.com/YashWadhvani
                    </div>
                  </div>
                </div>
                <span className="text-purple-400 text-xs font-semibold">&rarr;</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
