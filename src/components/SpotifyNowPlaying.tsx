"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Music2, ExternalLink, Radio, Disc3, Sparkles, LogIn } from "lucide-react";

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
  const [loading, setLoading] = useState(true);

  const fetchSpotify = async () => {
    try {
      const res = await fetch("/api/spotify");
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (err) {
      // Fallback retained
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSpotify();
    const interval = setInterval(fetchSpotify, 15000); // Poll every 15 seconds
    return () => clearInterval(interval);
  }, []);

  // Ticker variant for Bottom Status Bar
  if (variant === "ticker") {
    return (
      <a
        href={data.songUrl}
        target="_blank"
        rel="noreferrer"
        className="flex items-center gap-1.5 px-2 py-0.5 rounded hover:bg-slate-800 transition text-[11px] font-code text-slate-400 hover:text-emerald-300 max-w-[200px] truncate"
        title={`${data.isPlaying ? "Now Playing" : "Last Played"}: ${data.title} - ${data.artist}`}
      >
        <span
          className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
            data.isPlaying ? "bg-emerald-400 animate-pulse" : "bg-slate-500"
          }`}
        />
        <Music2 className="w-3 h-3 text-emerald-400 flex-shrink-0" />
        <span className="truncate">
          {data.title} &bull; {data.artist}
        </span>
      </a>
    );
  }

  // Full Card Variant
  return (
    <div className="rounded-2xl border border-editor-border bg-editor-card p-5 shadow-xl relative overflow-hidden group">
      {/* Subtle ambient Spotify green glow */}
      <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-emerald-500/10 blur-2xl group-hover:bg-emerald-500/20 transition duration-700 pointer-events-none" />

      {/* Header Row */}
      <div className="flex items-center justify-between pb-3 border-b border-editor-border/60">
        <div className="flex items-center gap-2">
          {/* Official Spotify Icon */}
          <svg
            className="w-4 h-4 text-[#1DB954] flex-shrink-0 fill-current"
            viewBox="0 0 24 24"
          >
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.494 17.307c-.216.353-.675.467-1.028.25-2.817-1.722-6.363-2.112-10.54-1.157-.402.092-.803-.16-.895-.562-.092-.403.16-.804.562-.896 4.571-1.045 8.492-.596 11.646 1.336.353.217.468.676.255 1.029zm1.467-3.262c-.272.443-.852.584-1.295.312-3.225-1.982-8.14-2.556-11.954-1.398-.498.152-1.028-.135-1.18-.633-.151-.498.136-1.028.634-1.18 4.364-1.325 9.782-.684 13.483 1.593.443.272.585.852.312 1.306zm.126-3.41c-3.867-2.296-10.248-2.508-13.94-1.387-.594.18-1.226-.155-1.406-.75-.18-.593.156-1.226.75-1.406 4.24-1.288 11.283-1.037 15.727 1.601.533.316.707 1.01.391 1.543-.316.533-1.01.708-1.543.399z" />
          </svg>
          <span className="text-xs font-code font-semibold tracking-wider text-slate-300">
            SPOTIFY SOUNDTRACK
          </span>
        </div>

        {/* Status Pill */}
        <div className="flex items-center gap-1.5">
          <span
            className={`w-2 h-2 rounded-full ${
              data.isPlaying
                ? "bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]"
                : "bg-slate-500"
            }`}
          />
          <span
            className={`text-[10px] font-code font-bold uppercase tracking-wider ${
              data.isPlaying ? "text-emerald-400" : "text-slate-400"
            }`}
          >
            {data.isPlaying ? "Now Playing" : "Last Played"}
          </span>
        </div>
      </div>

      {/* Main Track Body */}
      <div className="flex items-center gap-4 pt-4">
        {/* Album Artwork with animated vinyl spin when playing */}
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border border-slate-800 bg-slate-900 flex-shrink-0 shadow-md">
          {data.albumImageUrl ? (
            <img
              src={data.albumImageUrl}
              alt={data.album}
              className={`w-full h-full object-cover ${
                data.isPlaying ? "scale-105" : "grayscale-[20%]"
              } transition-transform duration-500`}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-slate-900 text-slate-600">
              <Disc3 className="w-8 h-8" />
            </div>
          )}

          {data.isPlaying && (
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <Disc3 className="w-6 h-6 text-emerald-400 animate-spin" style={{ animationDuration: "8s" }} />
            </div>
          )}
        </div>

        {/* Track Metadata */}
        <div className="flex-1 min-w-0 space-y-1">
          <a
            href={data.songUrl}
            target="_blank"
            rel="noreferrer"
            className="text-base font-bold text-white hover:text-emerald-400 transition truncate block font-sans"
            title={data.title}
          >
            {data.title}
          </a>

          <p className="text-xs text-slate-400 truncate font-sans font-medium" title={data.artist}>
            {data.artist}
          </p>

          <p className="text-[11px] text-slate-500 truncate font-code">
            {data.album}
          </p>

          {/* Equalizer Sound Waves (Animated when playing) */}
          <div className="pt-1.5 flex items-end gap-1 h-4">
            <span
              className={`w-1 bg-emerald-400 rounded-full transition-all ${
                data.isPlaying ? "h-3.5 animate-[pulse_0.6s_ease-in-out_infinite]" : "h-1 bg-slate-600"
              }`}
            />
            <span
              className={`w-1 bg-emerald-400 rounded-full transition-all ${
                data.isPlaying ? "h-4 animate-[pulse_0.9s_ease-in-out_infinite]" : "h-2 bg-slate-600"
              }`}
            />
            <span
              className={`w-1 bg-emerald-400 rounded-full transition-all ${
                data.isPlaying ? "h-2.5 animate-[pulse_0.7s_ease-in-out_infinite]" : "h-1 bg-slate-600"
              }`}
            />
            <span
              className={`w-1 bg-emerald-400 rounded-full transition-all ${
                data.isPlaying ? "h-3 animate-[pulse_0.8s_ease-in-out_infinite]" : "h-1.5 bg-slate-600"
              }`}
            />

            <a
              href={data.songUrl}
              target="_blank"
              rel="noreferrer"
              className="ml-auto inline-flex items-center gap-1 text-[11px] font-code text-slate-400 hover:text-emerald-300 transition"
            >
              <span>Listen</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* 1-Click Connect Button if refresh token is needed */}
      {(data.needsAuth || data.isDemo) && (
        <div className="mt-4 pt-3 border-t border-editor-border/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-[11px] font-code text-amber-300/90">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
            <span>Connect your Spotify account to activate live playback:</span>
          </div>
          <a
            href="/api/spotify/login"
            className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1DB954] hover:bg-[#1ed760] text-black font-semibold text-xs font-code transition shadow-sm hover:scale-[1.02]"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Login with Spotify</span>
          </a>
        </div>
      )}
    </div>
  );
}
