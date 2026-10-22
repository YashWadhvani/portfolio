"use client";

import React, { useState } from "react";
import {
  Mail,
  Send,
  Github,
  Linkedin,
  Copy,
  Check,
  Terminal,
  CheckCircle2,
} from "lucide-react";
import confetti from "canvas-confetti";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.message) return;

    const emailSubject = encodeURIComponent(
      formData.subject || `Portfolio Inquiry from ${formData.name}`
    );
    const emailBody = encodeURIComponent(
      `Hi Yash,\n\n${formData.message}\n\n---\nSender: ${formData.name}\nEmail: ${formData.email || "Not specified"}`
    );
    const gmailWebUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      PERSONAL_INFO.email
    )}&su=${emailSubject}&body=${emailBody}`;

    // Directly open Gmail web composer with message pre-filled to yashwadhvani123@gmail.com
    window.open(gmailWebUrl, "_blank", "noopener,noreferrer");

    // Celebratory feedback
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });

    setSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 py-2 sm:py-6 text-editor-textPrimary">
      {/* Page Header */}
      <div className="space-y-2 border-b border-editor-border pb-5">
        <div className="flex items-center gap-2 text-xs font-code text-syntax-string">
          <Terminal className="w-4 h-4" />
          <span>CONTACT_DISPATCHER.TSX</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-editor-textHeading tracking-tight">
          Get in Touch
        </h1>
        <p className="text-editor-textSecondary text-xs sm:text-sm font-sans max-w-2xl leading-relaxed">
          Interested in collaborating on software engineering, AI/ML initiatives, or discussing open roles? Drop a message or reach out directly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Interactive Contact Form */}
        <div className="lg:col-span-7">
          <div className="rounded-lg border border-editor-border bg-editor-card p-5 sm:p-6 space-y-5 shadow-vscode relative">
            <div className="flex items-center justify-between pb-3 border-b border-editor-border">
              <span className="text-xs font-code text-editor-textMuted">
                sendMessage(payload: MessagePayload)
              </span>
              <span className="text-[10px] font-code text-syntax-type bg-editor-bg px-2 py-0.5 rounded border border-editor-border">
                TARGET: yashwadhvani123@gmail.com
              </span>
            </div>

            {submitted && (
              <div className="p-3.5 rounded bg-editor-bg border border-syntax-type/40 text-syntax-type text-xs font-code flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-syntax-type flex-shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <p className="font-bold">Gmail Web Composer Dispatched!</p>
                  <p className="text-editor-textSecondary font-sans">
                    A Gmail tab has opened with your message pre-filled to <span className="font-code text-editor-textHeading font-semibold">{PERSONAL_INFO.email}</span>. Click <strong>Send</strong> in Gmail to finish transmitting your message.
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-code text-editor-textMuted">
                    sender.name <span className="text-syntax-string">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ada Lovelace"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-editor-input border border-editor-borderInput rounded text-xs text-editor-textInput placeholder-editor-textMuted focus:outline-none focus:border-editor-borderFocus font-sans"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-code text-editor-textMuted">
                    sender.email <span className="text-syntax-string">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="ada@computing.org"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-editor-input border border-editor-borderInput rounded text-xs text-editor-textInput placeholder-editor-textMuted focus:outline-none focus:border-editor-borderFocus font-sans"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-code text-editor-textMuted">
                  payload.subject
                </label>
                <input
                  type="text"
                  placeholder="Software Engineering Collaboration / Role"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-editor-input border border-editor-borderInput rounded text-xs text-editor-textInput placeholder-editor-textMuted focus:outline-none focus:border-editor-borderFocus font-sans"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-code text-editor-textMuted">
                  payload.message <span className="text-syntax-string">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Hey Yash, I saw your portfolio and would love to connect about..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-editor-input border border-editor-borderInput rounded text-xs text-editor-textInput placeholder-editor-textMuted focus:outline-none focus:border-editor-borderFocus font-sans resize-none"
                />
              </div>

              <div className="pt-1">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded bg-[#0E639C] hover:bg-[#1177BB] text-white font-medium text-xs transition font-code cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Dispatch Message</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column: Direct Channels & Information */}
        <div className="lg:col-span-5 space-y-4">
          {/* Quick Copy Email Card */}
          <div className="rounded-lg border border-editor-border bg-editor-card p-5 space-y-3 shadow-vscode">
            <h3 className="text-sm font-bold text-editor-textHeading font-sans flex items-center gap-2">
              <Mail className="w-4 h-4 text-syntax-storage" />
              <span>Direct Electronic Mail</span>
            </h3>

            <div className="flex items-center justify-between p-2.5 rounded bg-editor-bg border border-editor-border font-code text-xs">
              <span className="text-editor-textSecondary truncate">{PERSONAL_INFO.email}</span>
              <button
                onClick={handleCopyEmail}
                className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-editor-card hover:bg-editor-hover text-editor-textSecondary text-[11px] transition ml-2 flex-shrink-0 border border-editor-border cursor-pointer"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-3 h-3 text-syntax-type" />
                    <span className="text-syntax-type">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Social Links List */}
          <div className="rounded-lg border border-editor-border bg-editor-card p-5 space-y-3 shadow-vscode font-sans">
            <h3 className="text-sm font-bold text-editor-textHeading flex items-center gap-2">
              <Terminal className="w-4 h-4 text-syntax-keyword" />
              <span>Network &amp; Direct Messaging</span>
            </h3>

            <div className="space-y-2 font-code text-xs">
              {/* WhatsApp */}
              <a
                href={PERSONAL_INFO.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-2.5 rounded bg-editor-bg border border-editor-border hover:border-editor-borderFocus transition group"
              >
                <div className="flex items-center gap-2.5">
                  <WhatsAppIcon className="w-4 h-4 text-syntax-type" />
                  <div>
                    <div className="text-editor-textSecondary font-medium group-hover:text-editor-textHeading transition">
                      WhatsApp Instant Chat
                    </div>
                    <div className="text-editor-textMuted text-[11px] font-sans">
                      {PERSONAL_INFO.phone}
                    </div>
                  </div>
                </div>
                <span className="text-editor-textMuted text-xs font-semibold">&rarr;</span>
              </a>

              {/* LinkedIn */}
              <a
                href={PERSONAL_INFO.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-2.5 rounded bg-editor-bg border border-editor-border hover:border-editor-borderFocus transition group"
              >
                <div className="flex items-center gap-2.5">
                  <Linkedin className="w-4 h-4 text-syntax-storage" />
                  <div>
                    <div className="text-editor-textSecondary font-medium group-hover:text-editor-textHeading transition">
                      LinkedIn Profile
                    </div>
                    <div className="text-editor-textMuted text-[11px] font-sans">
                      yash-wadhvani
                    </div>
                  </div>
                </div>
                <span className="text-editor-textMuted text-xs font-semibold">&rarr;</span>
              </a>

              {/* GitHub */}
              <a
                href={PERSONAL_INFO.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-2.5 rounded bg-editor-bg border border-editor-border hover:border-editor-borderFocus transition group"
              >
                <div className="flex items-center gap-2.5">
                  <Github className="w-4 h-4 text-syntax-keyword" />
                  <div>
                    <div className="text-editor-textSecondary font-medium group-hover:text-editor-textHeading transition">
                      GitHub Repositories
                    </div>
                    <div className="text-editor-textMuted text-[11px] font-sans">
                      github.com/YashWadhvani
                    </div>
                  </div>
                </div>
                <span className="text-editor-textMuted text-xs font-semibold">&rarr;</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
