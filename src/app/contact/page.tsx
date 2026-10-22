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
  AlertCircle,
  ExternalLink,
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [needsActivation, setNeedsActivation] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const emailSubject = encodeURIComponent(
    formData.subject || `Portfolio Inquiry from ${formData.name || "Visitor"}`
  );
  const emailBody = encodeURIComponent(
    `Hi Yash,\n\n${formData.message}\n\n---\nSender: ${formData.name || "Anonymous"}\nEmail: ${formData.email || "Not specified"}`
  );
  const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=${emailSubject}&body=${emailBody}`;
  const gmailWebUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    PERSONAL_INFO.email
  )}&su=${emailSubject}&body=${emailBody}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setErrorMessage(null);
    setNeedsActivation(false);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && data.success) {
        setIsSubmitting(false);
        setSubmitted(true);
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else if (data.needsActivation) {
        setIsSubmitting(false);
        setNeedsActivation(true);
        setErrorMessage(data.message);
      } else {
        setIsSubmitting(false);
        setErrorMessage(
          data.message ||
            "Unable to dispatch directly. Click below to launch your email client."
        );
      }
    } catch (err: any) {
      setIsSubmitting(false);
      setErrorMessage(
        "Network connection issue. Click below to open in your default email client."
      );
    }
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
                  <p className="font-bold">Transmission Dispatched Successfully!</p>
                  <p className="text-editor-textSecondary font-sans">
                    Your message was sent directly to <span className="font-code text-editor-textHeading font-semibold">{PERSONAL_INFO.email}</span>. Yash will reply to your email address promptly.
                  </p>
                </div>
              </div>
            )}

            {needsActivation && (
              <div className="p-4 rounded bg-editor-bg border border-syntax-keyword/50 text-xs font-code space-y-3">
                <div className="flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-syntax-keyword flex-shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-bold text-syntax-keyword">Action Required: One-Time Activation</p>
                    <p className="text-editor-textSecondary font-sans text-xs leading-relaxed">
                      FormSubmit sent an authorization email to <strong className="text-editor-textHeading font-mono">{PERSONAL_INFO.email}</strong>.
                      Please open your Gmail (or Spam folder) and click <strong className="text-syntax-type">"Activate Form"</strong> once. Afterwards, all form submissions will deliver automatically to your inbox!
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 pt-1 border-t border-editor-border">
                  <a
                    href={gmailWebUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#0E639C] hover:bg-[#1177BB] text-white font-medium text-xs transition font-code"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Send via Gmail Web Instantly</span>
                  </a>
                  <a
                    href={mailtoUrl}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-editor-card hover:bg-editor-hover text-editor-textSecondary font-medium text-xs transition border border-editor-border font-code"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Send via Default Mail App</span>
                  </a>
                </div>
              </div>
            )}

            {errorMessage && !needsActivation && (
              <div className="p-3.5 rounded bg-editor-bg border border-syntax-string/40 text-syntax-string text-xs font-code space-y-2">
                <div className="flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-syntax-string flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">Transmission Notice</p>
                    <p className="text-editor-textSecondary font-sans text-xs mt-0.5">
                      {errorMessage}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  <a
                    href={gmailWebUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#0E639C] hover:bg-[#1177BB] text-white font-medium text-xs transition font-code"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Send via Gmail Web</span>
                  </a>
                  <a
                    href={mailtoUrl}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-editor-card hover:bg-editor-hover text-editor-textSecondary font-medium text-xs transition border border-editor-border font-code"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Send via Default Mail App</span>
                  </a>
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

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded bg-[#0E639C] hover:bg-[#1177BB] text-white font-medium text-xs transition font-code disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Transmitting Payload...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Dispatch Message</span>
                    </>
                  )}
                </button>

                <a
                  href={gmailWebUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded bg-editor-card hover:bg-editor-hover text-editor-textSecondary hover:text-editor-textPrimary font-medium text-xs transition font-code border border-editor-border cursor-pointer"
                  title="Open directly in Gmail web composer with message pre-filled"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-syntax-type" />
                  <span>Open in Gmail</span>
                </a>
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
