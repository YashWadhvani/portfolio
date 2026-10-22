"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, AlertCircle, Music, ArrowRight, Copy, Check, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";

function CallbackContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const codeParam = searchParams.get("code");
  const errorParam = searchParams.get("error");

  const [status, setStatus] = useState<"loading" | "success" | "idle">(
    codeParam ? "loading" : "idle"
  );
  const [errorMessage, setErrorMessage] = useState(errorParam || "");
  const [refreshToken, setRefreshToken] = useState("");
  const [copied, setCopied] = useState(false);
  const [manualInput, setManualInput] = useState("");
  const [isSubmittingManual, setIsSubmittingManual] = useState(false);

  const exchangeCode = async (codeToUse: string, redirectUriToUse?: string) => {
    try {
      setStatus("loading");
      setErrorMessage("");
      const redirect_uri = redirectUriToUse || window.location.origin + "/callback";
      const res = await fetch("/api/spotify/callback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: codeToUse, redirect_uri }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to exchange authorization code");
      }

      setRefreshToken(data.refresh_token);
      setStatus("success");

      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#1DB954", "#38bdf8", "#4ade80", "#a855f7"],
      });
    } catch (err: any) {
      setStatus("idle");
      setErrorMessage(err.message || "An unexpected error occurred.");
    } finally {
      setIsSubmittingManual(false);
    }
  };

  useEffect(() => {
    if (codeParam) {
      exchangeCode(codeParam);
    }
  }, [codeParam]);

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualInput.trim()) return;
    setIsSubmittingManual(true);

    let code = manualInput.trim();
    let redirectUri: string | undefined;

    if (code.includes("code=")) {
      try {
        const url = new URL(code);
        code = url.searchParams.get("code") || code;
        redirectUri = `${url.origin}${url.pathname}`;
      } catch (err) {
        const match = code.match(/code=([^&]+)/);
        if (match) code = match[1];
      }
    }

    exchangeCode(code, redirectUri);
  };

  const copyToken = () => {
    if (!refreshToken) return;
    navigator.clipboard.writeText(refreshToken);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-lg rounded-lg border border-editor-border bg-[#252526] p-6 sm:p-8 space-y-6 shadow-vscode relative overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-editor-border pb-4">
          <div className="p-2 rounded bg-[#1E1E1E] border border-editor-border text-[#1DB954]">
            <Music className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base font-bold text-white font-sans">
              Spotify 1-Time Authorization
            </h1>
            <p className="text-xs text-[#858585] font-code">
              One-time setup so visitors can see what you are listening to
            </p>
          </div>
        </div>

        {/* State: Loading */}
        {status === "loading" && (
          <div className="py-8 text-center space-y-3 font-code">
            <div className="w-7 h-7 border-2 border-[#1DB954] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs text-[#D4D4D4]">
              Exchanging code for permanent Spotify Refresh Token...
            </p>
            <p className="text-[11px] text-[#858585]">
              Saving credentials to .env.local automatically
            </p>
          </div>
        )}

        {/* State: Success */}
        {status === "success" && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 rounded bg-[#1E1E1E] border border-[#1DB954]/40 text-[#1DB954] text-xs font-code">
              <CheckCircle2 className="w-4 h-4 text-[#1DB954] flex-shrink-0" />
              <div>
                <p className="font-semibold text-white">
                  Spotify Successfully Connected!
                </p>
                <p className="text-[11px] text-[#CCCCCC] mt-0.5 font-sans">
                  Your refresh token has been automatically saved to .env.local. Visitors can now see your live tracks!
                </p>
              </div>
            </div>

            <div className="space-y-1 font-code text-xs">
              <label className="text-[#858585] text-[11px]">
                Generated Refresh Token:
              </label>
              <div className="flex items-center gap-2 bg-[#1E1E1E] border border-editor-border rounded p-2">
                <span className="truncate text-[#D4D4D4] flex-1 font-mono text-[11px]">
                  {refreshToken}
                </span>
                <button
                  onClick={copyToken}
                  className="p-1 rounded hover:bg-[#2A2D2E] text-[#858585] hover:text-[#D4D4D4] transition"
                  title="Copy token"
                >
                  {copied ? (
                    <Check className="w-3.5 h-3.5 text-[#1DB954]" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>

            <Link
              href="/"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded bg-[#0E639C] hover:bg-[#1177BB] text-white font-medium text-xs transition font-code"
            >
              <span>View Now Playing on Portfolio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}

        {/* State: Idle / Manual / Error */}
        {status === "idle" && (
          <div className="space-y-5 font-code">
            {errorMessage && (
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-rose-950/40 border border-rose-800/50 text-rose-300 text-xs">
                <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-rose-200">Notice</p>
                  <p className="text-[11px] text-rose-400/90 mt-0.5">{errorMessage}</p>
                </div>
              </div>
            )}

            <div className="rounded-xl bg-slate-900/60 border border-editor-border p-4 text-xs space-y-3 font-sans">
              <p className="text-slate-300 font-medium">
                💡 <span className="font-semibold text-white">How this works for visitors:</span>
              </p>
              <p className="text-slate-400 text-xs leading-relaxed">
                Visitors <strong className="text-slate-200">never log in</strong>. You only do this one-time setup so your server has permission to read your current track and broadcast it to your portfolio visitors.
              </p>
            </div>

            {/* Quick Connect / Paste Form */}
            <form onSubmit={handleManualSubmit} className="space-y-3">
              <label className="block text-xs text-slate-300 font-sans font-medium">
                Paste Redirected URL or Code:
              </label>
              <input
                type="text"
                placeholder="Paste URL (e.g. https://.../?code=AQD...) or code"
                value={manualInput}
                onChange={(e) => setManualInput(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-200 focus:outline-none focus:border-[#1DB954] transition placeholder:text-slate-600"
              />
              <button
                type="submit"
                disabled={isSubmittingManual || !manualInput.trim()}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#1DB954] hover:bg-[#1ed760] disabled:opacity-50 text-black font-semibold text-xs font-code transition shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isSubmittingManual ? "Connecting..." : "Exchange & Save to .env.local"}</span>
              </button>
            </form>

            <div className="pt-2 border-t border-editor-border/40 text-center">
              <a
                href="/api/spotify/login"
                className="text-xs text-emerald-400 hover:underline font-code"
              >
                &larr; Re-open Spotify Authorization
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function CallbackPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center font-code text-xs text-slate-400">Loading callback...</div>}>
      <CallbackContent />
    </Suspense>
  );
}
