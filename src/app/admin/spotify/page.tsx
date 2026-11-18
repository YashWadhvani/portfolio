"use client";

import { FormEvent, useState } from "react";
import { Music2, ShieldCheck } from "lucide-react";

export default function SpotifyAdminPage() {
    const [token, setToken] = useState("");
    const [error, setError] = useState("");

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();
        setError("");
        const response = await fetch("/api/spotify/admin/session", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token }),
        });
        if (!response.ok) {
            setError((await response.json()).error || "Authentication failed");
            return;
        }
        window.location.href = "/api/spotify/admin/login";
    }

    return (
        <main className="mx-auto flex min-h-[70vh] max-w-lg items-center px-4 py-10">
            <section className="w-full space-y-6 rounded-lg border border-editor-border bg-editor-card p-6 shadow-vscode">
                <header className="flex items-center gap-3 border-b border-editor-border pb-4">
                    <div className="rounded border border-editor-border bg-editor-bg p-2 text-[#1DB954]">
                        <Music2 className="h-5 w-5" />
                    </div>
                    <div>
                        <h1 className="font-sans text-lg font-bold text-editor-textHeading">
                            Spotify private setup
                        </h1>
                        <p className="font-code text-xs text-editor-textMuted">
                            Admin-only authorization for the server integration
                        </p>
                    </div>
                </header>
                <div className="flex gap-2 rounded border border-editor-border bg-editor-bg p-3 text-xs text-editor-textSecondary">
                    <ShieldCheck className="h-4 w-4 shrink-0 text-syntax-type" />
                    <p>
                        Your token is exchanged server-side. Refresh tokens are
                        never displayed in the browser.
                    </p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-3">
                    <label
                        htmlFor="admin-token"
                        className="block font-code text-xs text-editor-textMuted"
                    >
                        Admin setup token
                    </label>
                    <input
                        id="admin-token"
                        type="password"
                        value={token}
                        onChange={(event) => setToken(event.target.value)}
                        required
                        autoComplete="current-password"
                        className="w-full rounded border border-editor-borderInput bg-editor-input px-3 py-2 text-xs text-editor-textInput outline-none focus-visible:border-editor-borderFocus focus-visible:ring-2 focus-visible:ring-[#007ACC]/40"
                    />
                    {error && (
                        <p role="alert" className="text-xs text-red-400">
                            {error}
                        </p>
                    )}
                    <button
                        type="submit"
                        className="w-full rounded bg-[#0E639C] px-4 py-2 text-xs font-medium text-white hover:bg-[#1177BB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38bdf8]"
                    >
                        Continue to Spotify
                    </button>
                </form>
                <p className="font-code text-[11px] text-editor-textMuted">
                    After authorization, configure the generated refresh token
                    as `SPOTIFY_REFRESH_TOKEN` in your deployment environment.
                </p>
            </section>
        </main>
    );
}
