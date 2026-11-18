"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Disc3, ExternalLink, Music2 } from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolioData";

export interface SpotifyTrack {
    isPlaying: boolean;
    isLastPlayed?: boolean;
    title: string;
    artist: string;
    album: string;
    albumImageUrl: string;
    songUrl: string;
    progressMs?: number;
    durationMs?: number;
    playedAt?: string;
    isDemo?: boolean;
    needsAuth?: boolean;
}

interface PresenceActivity {
    app: string;
    detail: string;
    icon: string;
    source: "spotify" | "github" | "desktop" | "default";
}

interface PresenceResponse {
    activity: PresenceActivity;
    spotify: SpotifyTrack;
    status: "online" | "away";
}

interface SpotifyNowPlayingProps {
    variant?: "card" | "ticker";
}

const initialTrack: SpotifyTrack = {
    isPlaying: false,
    isLastPlayed: true,
    title: "Loading listening data…",
    artist: "Spotify activity",
    album: "Fetching the latest snapshot",
    albumImageUrl: "",
    songUrl: "https://open.spotify.com",
};

const initialPresence: PresenceResponse = {
    activity: {
        app: "Loading presence…",
        detail: "Checking current activity",
        icon: "…",
        source: "default",
    },
    spotify: initialTrack,
    status: "away",
};

export default function SpotifyNowPlaying({
    variant = "card",
}: SpotifyNowPlayingProps) {
    const [presence, setPresence] = useState<PresenceResponse>(initialPresence);
    const [loading, setLoading] = useState(true);
    const { activity, spotify: data, status } = presence;

    useEffect(() => {
        let mounted = true;
        const fetchSnapshot = async () => {
            try {
                const response = await fetch("/api/presence", {
                    cache: "no-store",
                });
                if (response.ok && mounted) setPresence(await response.json());
            } finally {
                if (mounted) setLoading(false);
            }
        };
        fetchSnapshot();
        const handleVisibilityChange = () => {
            if (document.visibilityState === "visible") fetchSnapshot();
        };
        document.addEventListener("visibilitychange", handleVisibilityChange);
        const interval = window.setInterval(fetchSnapshot, 30_000);
        return () => {
            mounted = false;
            window.clearInterval(interval);
            document.removeEventListener(
                "visibilitychange",
                handleVisibilityChange,
            );
        };
    }, []);

    if (variant === "ticker") {
        return (
            <a
                href={data.songUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`${data.isPlaying ? "Now playing" : "Last played"}: ${data.title} by ${data.artist}`}
                className="flex max-w-[210px] items-center gap-1.5 truncate rounded px-1.5 py-0.5 text-[11px] font-code text-white transition hover:bg-[#0E639C]"
            >
                <span
                    className={`h-1.5 w-1.5 shrink-0 rounded-full ${data.isPlaying ? "bg-[#1DB954]" : "bg-white/60"}`}
                />
                <Music2 className="h-3 w-3 shrink-0 text-[#1DB954]" />
                <span className="truncate">
                    {loading
                        ? "Loading Spotify…"
                        : `${data.title} • ${data.artist}`}
                </span>
            </a>
        );
    }

    if (loading) {
        return (
            <div
                className="grid grid-cols-1 gap-4 lg:grid-cols-2"
                aria-label="Loading current activity"
                aria-busy="true"
            >
                <div className="h-64 animate-pulse rounded-lg border border-editor-border bg-editor-card p-5" />
                <div className="h-64 animate-pulse rounded-lg border border-editor-border bg-editor-card p-5" />
            </div>
        );
    }

    const isOnline = status === "online";

    return (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {/* Desktop presence card */}
            <section
                className="rounded-lg border border-editor-border bg-editor-card p-5 shadow-vscode"
                aria-labelledby="desktop-activity-heading"
            >
                <div className="flex items-start justify-between gap-3 border-b border-editor-border pb-3">
                    <div>
                        <p className="text-[10px] font-code uppercase tracking-[0.18em] text-editor-textMuted">
                            DESKTOP_ACTIVITY
                        </p>
                        <h2
                            id="desktop-activity-heading"
                            className="mt-1 font-sans text-lg font-bold text-editor-textHeading"
                        >
                            Current activity
                        </h2>
                    </div>
                    <span
                        className={`flex shrink-0 items-center gap-1.5 rounded-full border border-editor-border bg-editor-bg px-2 py-1 text-[10px] font-code uppercase tracking-wider ${isOnline ? "text-[#1DB954]" : "text-editor-textMuted"}`}
                    >
                        <span
                            className={`h-1.5 w-1.5 rounded-full ${isOnline ? "bg-[#1DB954] shadow-[0_0_8px_#1DB954]" : "bg-editor-textMuted"}`}
                        />
                        {isOnline ? "Online" : "Away"}
                    </span>
                </div>

                <div className="flex items-center gap-3 pt-5">
                    <div className="relative shrink-0">
                        <Image
                            src={PERSONAL_INFO.avatar}
                            alt={PERSONAL_INFO.name}
                            width={64}
                            height={64}
                            className="h-16 w-16 rounded-full border-2 border-editor-border object-cover"
                        />
                        <span
                            className={`absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-editor-card ${isOnline ? "bg-[#1DB954]" : "bg-editor-textMuted"}`}
                        />
                    </div>
                    <div className="min-w-0">
                        <p className="truncate font-sans font-bold text-editor-textHeading">
                            {PERSONAL_INFO.name}
                        </p>
                        <p className="text-xs text-editor-textMuted">
                            {PERSONAL_INFO.title.split("|")[0].trim()}
                        </p>
                    </div>
                </div>

                <div className="mt-5 rounded-md border border-editor-border bg-editor-bg p-3">
                    <p className="mb-2 text-[10px] font-code uppercase tracking-widest text-editor-textMuted">
                        {isOnline ? "Activity" : "Last activity"}
                    </p>
                    <div className="flex items-center gap-3">
                        <span
                            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-[#007ACC]/20 text-2xl"
                            aria-hidden="true"
                        >
                            {activity.icon}
                        </span>
                        <div className="min-w-0">
                            <p className="truncate font-sans font-semibold text-editor-textHeading">
                                {activity.app}
                            </p>
                            <p className="truncate text-xs text-editor-textSecondary">
                                {activity.detail}
                            </p>
                        </div>
                    </div>
                </div>
                <p className="mt-4 text-[11px] font-code text-editor-textMuted">
                    {isOnline
                        ? "Desktop companion connected"
                        : "Desktop companion is offline"}
                </p>
            </section>

            {/* Spotify card */}
            <section
                className="rounded-lg border border-editor-border bg-editor-card p-5 shadow-vscode"
                aria-labelledby="spotify-activity-heading"
            >
                <div className="flex items-start justify-between gap-3 border-b border-editor-border pb-3">
                    <div>
                        <p className="flex items-center gap-1.5 text-[10px] font-code uppercase tracking-[0.18em] text-[#1DB954]">
                            <Music2 className="h-3 w-3" />
                            SPOTIFY_ACTIVITY
                        </p>
                        <h2
                            id="spotify-activity-heading"
                            className="mt-1 font-sans text-lg font-bold text-editor-textHeading"
                        >
                            {data.isPlaying ? "Now playing" : "Last played"}
                        </h2>
                    </div>
                    <span className="text-[10px] font-code text-editor-textMuted">
                        60s cache
                    </span>
                </div>

                <div className="flex items-center gap-4 pt-5">
                    <div
                        className={`relative h-28 w-28 shrink-0 overflow-hidden rounded-full border-4 border-editor-border bg-editor-bg shadow-vscode sm:h-32 sm:w-32 ${data.isPlaying ? "animate-[spin_12s_linear_infinite]" : ""}`}
                    >
                        {data.albumImageUrl ? (
                            <img
                                src={data.albumImageUrl}
                                alt={`${data.album} album artwork`}
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center text-editor-textMuted">
                                <Disc3 className="h-10 w-10" />
                            </div>
                        )}
                        <span className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-editor-card bg-[#1DB954]" />
                    </div>
                    <div className="min-w-0 flex-1">
                        <p className="text-[10px] font-code uppercase tracking-widest text-[#1DB954]">
                            {data.isPlaying
                                ? "Listening now"
                                : "Playback stopped"}
                        </p>
                        <a
                            href={data.songUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="block truncate font-sans text-lg font-bold text-editor-textHeading hover:text-[#1DB954]"
                            aria-label={`Open ${data.title} on Spotify`}
                        >
                            {data.title}
                        </a>
                        <p className="truncate font-code text-xs text-syntax-variable">
                            {data.artist}
                        </p>
                        <p className="truncate text-xs text-editor-textMuted">
                            {data.album}
                        </p>
                        <div
                            className="flex items-end gap-1 pt-3"
                            aria-label={
                                data.isPlaying ? "Playing" : "Playback stopped"
                            }
                        >
                            {["h-2", "h-4", "h-3", "h-5"].map(
                                (height, index) => (
                                    <span
                                        key={index}
                                        className={`w-1 rounded-full ${data.isPlaying ? `animate-pulse bg-[#1DB954] ${height}` : "h-1 bg-editor-textMuted/50"}`}
                                    />
                                ),
                            )}
                        </div>
                    </div>
                </div>
                <div className="mt-5 flex items-center justify-between border-t border-editor-border pt-3 text-[11px] font-code text-editor-textMuted">
                    <span>
                        {data.isPlaying
                            ? "Live playback"
                            : "Disc stopped · last known track"}
                    </span>
                    <a
                        href={data.songUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 hover:text-[#1DB954]"
                    >
                        Open Spotify <ExternalLink className="h-3 w-3" />
                    </a>
                </div>
            </section>
        </div>
    );
}
