import { getSpotifySnapshot } from "@/lib/spotify";

export interface PresenceActivity {
  app: string;
  detail: string;
  icon: string;
  source: "spotify" | "github" | "desktop" | "default";
}

export type PresenceStatus = "online" | "away";

interface StoredPresence extends PresenceActivity {
  updatedAt: number;
}

let localPresence: StoredPresence | null = null;

const PRESENCE_KEY = "portfolio:presence";
const PRESENCE_TTL_SECONDS = 120;

function normalizeSecret(value: string | undefined) {
  return String(value || "")
    .trim()
    .replace(/^(["'])(.*)\1$/, "$2")
    .replace(/\/+$/, "");
}

function getKvConfig() {
  return {
    url: normalizeSecret(
      process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL,
    ),
    token: normalizeSecret(
      process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN,
    ),
  };
}

async function throwIfFailed(response: Response, operation: string) {
  if (response.ok) return;
  const details = (await response.text()).slice(0, 240);
  throw new Error(`Upstash ${operation} failed (${response.status}): ${details}`);
}

async function readPublishedPresence(): Promise<PresenceActivity | null> {
  const { url, token } = getKvConfig();
  let stored: StoredPresence | null = localPresence;

  if (url && token) {
    const response = await fetch(`${url}/get/${encodeURIComponent(PRESENCE_KEY)}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    await throwIfFailed(response, "presence read");
    const result = await response.json();
    stored = result.result ? JSON.parse(result.result) : null;
  }

  if (!stored || Date.now() - stored.updatedAt > PRESENCE_TTL_SECONDS * 1000) {
    return null;
  }

  const { updatedAt: _updatedAt, ...activity } = stored;
  return activity;
}

export async function publishPresence(activity: PresenceActivity) {
  const stored: StoredPresence = { ...activity, updatedAt: Date.now() };
  localPresence = stored;

  const { url, token } = getKvConfig();
  if (url && token) {
    const encodedValue = encodeURIComponent(JSON.stringify(stored));
    const response = await fetch(`${url}/set/${encodeURIComponent(PRESENCE_KEY)}/${encodedValue}/EX/${PRESENCE_TTL_SECONDS}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    await throwIfFailed(response, "presence write");
  }
}

const DEFAULT_ACTIVITY: PresenceActivity = {
  app: "Portfolio",
  detail: "Available online",
  icon: "🌐",
  source: "default",
};

export async function getPresence() {
  const spotify = await getSpotifySnapshot();

  try {
    const published = await readPublishedPresence();
    if (published) return { activity: published, spotify, status: "online" as const };
  } catch {
    // Continue with inferred activity if the optional persistence service is unavailable.
  }

  if (spotify.isPlaying) {
    return {
      activity: {
        app: "Spotify",
        detail: `Listening to ${spotify.title} by ${spotify.artist}`,
        icon: "🎵",
        source: "spotify" as const,
      },
      spotify,
      status: "away" as const,
    };
  }

  try {
    const response = await fetch(
      "https://api.github.com/users/YashWadhvani/events/public?per_page=10",
      {
        headers: {
          Accept: "application/vnd.github+json",
          "User-Agent": "YashWadhvani-Portfolio",
        },
        next: { revalidate: 300 },
      },
    );
    const events = await response.json();
    const latestPush = Array.isArray(events)
      ? events.find((event) => event.type === "PushEvent" && event.repo?.name)
      : null;

    if (latestPush) {
      const repository = latestPush.repo.name.split("/").pop();
      return {
        activity: {
          app: "GitHub",
          detail: `Recently updated ${repository}`,
          icon: "⌨️",
          source: "github" as const,
        },
        spotify,
        status: "away" as const,
      };
    }
  } catch {
    // Fall through to a neutral presence when the activity source is unavailable.
  }

  return { activity: DEFAULT_ACTIVITY, spotify, status: "away" as const };
}
