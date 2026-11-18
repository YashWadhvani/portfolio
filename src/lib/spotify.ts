import fs from "fs";
import path from "path";

export interface SpotifySnapshot {
  isPlaying: boolean;
  isLastPlayed: boolean;
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

const FALLBACK: SpotifySnapshot = {
  isPlaying: false,
  isLastPlayed: true,
  title: "No track available",
  artist: "Spotify activity is unavailable",
  album: "Connect Spotify in the private admin setup",
  albumImageUrl: "",
  songUrl: "https://open.spotify.com",
  isDemo: true,
};

let accessToken = "";
let accessTokenExpiresAt = 0;
let snapshot: SpotifySnapshot | null = null;
let snapshotFetchedAt = 0;
let requestInFlight: Promise<SpotifySnapshot> | null = null;

function env(name: string) {
  if (process.env[name]) return process.env[name];
  try {
    const envPath = path.resolve(process.cwd(), ".env.local");
    const content = fs.readFileSync(envPath, "utf8");
    return content.match(new RegExp(`^${name}=(.*)$`, "m"))?.[1]?.trim();
  } catch {
    return undefined;
  }
}

export function getSpotifyConfig() {
  return {
    clientId: env("SPOTIFY_CLIENT_ID"),
    clientSecret: env("SPOTIFY_CLIENT_SECRET"),
    refreshToken: env("SPOTIFY_REFRESH_TOKEN"),
  };
}

async function getAccessToken() {
  const config = getSpotifyConfig();
  if (!config.clientId || !config.clientSecret || !config.refreshToken) return null;
  if (accessToken && Date.now() < accessTokenExpiresAt - 30_000) return accessToken;

  const basic = Buffer.from(`${config.clientId}:${config.clientSecret}`).toString("base64");
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: config.refreshToken,
    }),
    cache: "no-store",
  });

  if (!response.ok) return null;
  const data = await response.json();
  accessToken = data.access_token;
  accessTokenExpiresAt = Date.now() + (data.expires_in || 3600) * 1000;
  return accessToken;
}

async function fetchSnapshot(): Promise<SpotifySnapshot> {
  const token = await getAccessToken();
  const config = getSpotifyConfig();
  if (!token) return { ...FALLBACK, needsAuth: !config.refreshToken };

  const headers = { Authorization: `Bearer ${token}` };
  const current = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
    headers,
    cache: "no-store",
  });

  if (current.status === 200) {
    const data = await current.json();
    if (data?.item && data.is_playing) {
      return {
        isPlaying: true,
        isLastPlayed: false,
        title: data.item.name,
        artist: data.item.artists.map((artist: { name: string }) => artist.name).join(", "),
        album: data.item.album.name,
        albumImageUrl: data.item.album.images?.[0]?.url || "",
        songUrl: data.item.external_urls.spotify,
        progressMs: data.progress_ms,
        durationMs: data.item.duration_ms,
      };
    }
  }

  const recent = await fetch("https://api.spotify.com/v1/me/player/recently-played?limit=1", {
    headers,
    cache: "no-store",
  });
  if (recent.status === 200) {
    const data = await recent.json();
    const item = data.items?.[0];
    if (item?.track) {
      return {
        isPlaying: false,
        isLastPlayed: true,
        title: item.track.name,
        artist: item.track.artists.map((artist: { name: string }) => artist.name).join(", "),
        album: item.track.album.name,
        albumImageUrl: item.track.album.images?.[0]?.url || "",
        songUrl: item.track.external_urls.spotify,
        playedAt: item.played_at,
      };
    }
  }

  return FALLBACK;
}

export async function getSpotifySnapshot() {
  const cacheTtl = 60_000;
  if (snapshot && Date.now() - snapshotFetchedAt < cacheTtl) return snapshot;
  if (!requestInFlight) {
    requestInFlight = fetchSnapshot()
      .then((result) => {
        snapshot = result;
        snapshotFetchedAt = Date.now();
        return result;
      })
      .catch(() => snapshot || FALLBACK)
      .finally(() => {
        requestInFlight = null;
      });
  }
  return requestInFlight;
}
