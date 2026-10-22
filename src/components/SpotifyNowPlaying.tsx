"use client";

import React, { useState, useEffect } from "react";
import { Music2, ExternalLink, Disc3, LogIn } from "lucide-react";

export interface SpotifyTrack {
  isPlaying: boolean;
  isLastPlayed?: boolean;
  title: string;
  artist: string;
  album: string;
  albumImageUrl: string;
  songUrl: string;
  isDemo?: boolean;
  needsAuth?: boolean;
  hasClientId?: boolean;
}

interface SpotifyNowPlayingProps {
  variant?: "card" | "ticker";
}

export default function SpotifyNowPlaying({
  variant = "card",
}: SpotifyNowPlayingProps) {
  const [data, setData] = useState<SpotifyTrack>({
    isPlaying: false,
    isLastPlayed: true,
    title: "Starboy",
    artist: "The Weeknd, Daft Punk",
    album: "Starboy",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2734718e2b124f79258be7bc452",
    songUrl: "https://open.spotify.com/track/7MXVkk9YM5IZxh0WSlVIh0",
    isDemo: true,
    needsAuth: false,
  });

  const fetchSpotify = async () => {
    try {
      const res = await fetch("/api/spotify");
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (err) {
      // Fallback retained
    }
  };

  useEffect(() => {
    fetchSpotify();
    const interval = setInterval(fetchSpotify, 15000);
    return () => clearInterval(interval);
  }, []);

  // Ticker variant for Bottom Status Bar
  if (variant === "ticker") {
    return (
      <a
        href={data.songUrl}
        target="_blank"
        rel="noreferrer"
        className="flex items-center gap-1.5 px-1.5 py-0.5 rounded hover:bg-[#0E639C] transition text-[11px] font-code text-white max-w-[210px] truncate"
        title={`${data.isPlaying ? "Now Playing" : "Last Played"}: ${data.title} - ${data.artist}`}
      >
        <span
          className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
            data.isPlaying ? "bg-[#1DB954]" : "bg-white/60"
          }`}
        />
        <Music2 className="w-3 h-3 text-[#1DB954] flex-shrink-0" />
        <span className="truncate">
          {data.title} &bull; {data.artist}
        </span>
      </a>
    );
  }

  // Full Card Variant (VS Code Extension aesthetic)
  return (
    <div className="rounded-lg border border-editor-border bg-editor-card p-5 shadow-vscode relative overflow-hidden group">
      {/* Header Row */}
      <div className="flex items-center justify-between pb-3.5 border-b border-editor-border">
        <div className="flex items-center gap-2">
          {/* Official Spotify Icon */}
          <svg
            className="w-4 h-4 text-[#1DB954] flex-shrink-0 fill-current"
            viewBox="0 0 24 24"
          >
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.494 17.307c-.216.353-.675.467-1.028.25-2.817-1.722-6.363-2.112-10.54-1.157-.402.092-.803-.16-.895-.562-.092-.403.16-.804.562-.896 4.571-1.045 8.492-.596 11.646 1.336.353.217.468.676.255 1.029zm1.467-3.262c-.272.443-.852.584-1.295.312-3.225-1.982-8.14-2.556-11.954-1.398-.498.152-1.028-.135-1.18-.633-.151-.498.136-1.028.634-1.18 4.364-1.325 9.782-.684 13.483 1.593.443.272.585.852.312 1.306zm.126-3.41c-3.867-2.296-10.248-2.508-13.94-1.387-.594.18-1.226-.155-1.406-.75-.18-.593.156-1.226.75-1.406 4.24-1.288 11.283-1.037 15.727 1.601.533.316.707 1.01.391 1.543-.316.533-1.01.708-1.543.399z" />
          </svg>
          <span className="text-xs font-code font-medium tracking-wide text-editor-textSecondary">
            SPOTIFY &bull; DEV AUDIO
          </span>
        </div>

        {/* Status Badge */}
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-editor-bg border border-editor-border">
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              data.isPlaying ? "bg-[#1DB954]" : "bg-editor-textMuted"
            }`}
          />
          <span
            className={`text-[10px] font-code uppercase tracking-wider font-semibold ${
              data.isPlaying ? "text-[#1DB954]" : "text-editor-textMuted"
            }`}
          >
            {data.isPlaying ? "Now Playing" : "Last Played"}
          </span>
        </div>
      </div>

      {/* Main Track Details */}
      <div className="flex items-center gap-4 pt-4">
        {/* Album Cover */}
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded border border-editor-border bg-editor-bg flex-shrink-0 overflow-hidden">
          {data.albumImageUrl ? (
            <img
              src={data.albumImageUrl}
              alt={data.album}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-editor-bg text-editor-textMuted">
              <Disc3 className="w-8 h-8" />
            </div>
          )}
        </div>

        {/* Track Title, Artist, Album */}
        <div className="flex-1 min-w-0 space-y-1">
          <a
            href={data.songUrl}
            target="_blank"
            rel="noreferrer"
            className="text-base font-semibold text-editor-textHeading hover:text-[#1DB954] transition truncate block font-sans"
            title={data.title}
          >
            {data.title}
          </a>

          <p className="text-xs text-syntax-variable truncate font-code" title={data.artist}>
            {data.artist}
          </p>

          <p className="text-[11px] text-editor-textMuted truncate font-sans">
            {data.album}
          </p>

          {/* Equalizer Audio Waves & Listen Link */}
          <div className="pt-2 flex items-center justify-between">
            <div className="flex items-end gap-1 h-3.5">
              <span
                className={`w-1 bg-[#1DB954] rounded-xs transition-all ${
                  data.isPlaying ? "h-3 animate-[pulse_0.6s_ease-in-out_infinite]" : "h-1 bg-editor-textMuted/40"
                }`}
              />
              <span
                className={`w-1 bg-[#1DB954] rounded-xs transition-all ${
                  data.isPlaying ? "h-3.5 animate-[pulse_0.9s_ease-in-out_infinite]" : "h-1.5 bg-editor-textMuted/40"
                }`}
              />
              <span
                className={`w-1 bg-[#1DB954] rounded-xs transition-all ${
                  data.isPlaying ? "h-2 animate-[pulse_0.7s_ease-in-out_infinite]" : "h-1 bg-editor-textMuted/40"
                }`}
              />
              <span
                className={`w-1 bg-[#1DB954] rounded-xs transition-all ${
                  data.isPlaying ? "h-3 animate-[pulse_0.8s_ease-in-out_infinite]" : "h-2 bg-editor-textMuted/40"
                }`}
              />
            </div>

            <a
              href={data.songUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-[11px] font-code text-editor-textSecondary hover:text-[#1DB954] transition"
            >
              <span>Listen</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* 1-Click Connect Button if refresh token is needed */}
      {(data.needsAuth || data.isDemo) && (
        <div className="mt-4 pt-3 border-t border-editor-border flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-editor-bg/60 -mx-5 -mb-5 px-5 py-3">
          <div className="text-[11px] font-code text-editor-textSecondary">
            <span>Connect Spotify to broadcast your real-time tracks:</span>
          </div>
          <a
            href="/api/spotify/login"
            className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded bg-[#1DB954] hover:bg-[#1ed760] text-black font-semibold text-xs font-code transition"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Login with Spotify</span>
          </a>
        </div>
      )}
    </div>
  );
}
