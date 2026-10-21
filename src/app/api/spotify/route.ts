import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const NOW_PLAYING_ENDPOINT = "https://api.spotify.com/v1/me/player/currently-playing";
const RECENTLY_PLAYED_ENDPOINT = "https://api.spotify.com/v1/me/player/recently-played?limit=1";
const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";

function getEnvConfig() {
  let client_id = process.env.SPOTIFY_CLIENT_ID;
  let client_secret = process.env.SPOTIFY_CLIENT_SECRET;
  let refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

  // Also read directly from .env.local if available to pick up hot changes
  try {
    const envPath = path.resolve(process.cwd(), ".env.local");
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, "utf-8");
      const idMatch = content.match(/^SPOTIFY_CLIENT_ID=(.*)$/m);
      const secMatch = content.match(/^SPOTIFY_CLIENT_SECRET=(.*)$/m);
      const refMatch = content.match(/^SPOTIFY_REFRESH_TOKEN=(.*)$/m);

      if (idMatch && idMatch[1]) client_id = idMatch[1].trim();
      if (secMatch && secMatch[1]) client_secret = secMatch[1].trim();
      if (refMatch && refMatch[1]) refresh_token = refMatch[1].trim();
    }
  } catch (err) {
    // ignore
  }

  return { client_id, client_secret, refresh_token };
}

const getAccessToken = async () => {
  const { client_id, client_secret, refresh_token } = getEnvConfig();

  if (!client_id || !client_secret || !refresh_token) {
    return null;
  }

  const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");

  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refresh_token,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    return null;
  }

  return response.json();
};

export async function GET() {
  try {
    const { client_id, refresh_token } = getEnvConfig();

    const tokenData = await getAccessToken();

    // If Spotify environment variables are not configured yet, return a clean fallback track
    if (!tokenData || !tokenData.access_token) {
      return NextResponse.json({
        isPlaying: false,
        isLastPlayed: true,
        title: "Starboy",
        artist: "The Weeknd, Daft Punk",
        album: "Starboy",
        albumImageUrl: "https://i.scdn.co/image/ab67616d0000b2734718e2b124f79258be7bc452",
        songUrl: "https://open.spotify.com/track/7MXVkk9YM5IZxh0WSlVIh0",
        isDemo: true,
        needsAuth: !refresh_token,
        hasClientId: !!client_id,
      });
    }

    const { access_token } = tokenData;

    // 1. Check if currently playing
    const nowPlayingRes = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      cache: "no-store",
    });

    if (nowPlayingRes.status === 200) {
      const song = await nowPlayingRes.json();

      if (song && song.item && song.is_playing) {
        return NextResponse.json({
          isPlaying: true,
          isLastPlayed: false,
          title: song.item.name,
          artist: song.item.artists.map((_artist: any) => _artist.name).join(", "),
          album: song.item.album.name,
          albumImageUrl: song.item.album.images[0]?.url || "",
          songUrl: song.item.external_urls.spotify,
          progressMs: song.progress_ms,
          durationMs: song.item.duration_ms,
          isDemo: false,
        });
      }
    }

    // 2. If nothing is currently playing, fetch recently played track
    const recentlyPlayedRes = await fetch(RECENTLY_PLAYED_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      cache: "no-store",
    });

    if (recentlyPlayedRes.status === 200) {
      const recentData = await recentlyPlayedRes.json();
      const item = recentData.items?.[0];

      if (item && item.track) {
        return NextResponse.json({
          isPlaying: false,
          isLastPlayed: true,
          title: item.track.name,
          artist: item.track.artists.map((_artist: any) => _artist.name).join(", "),
          album: item.track.album.name,
          albumImageUrl: item.track.album.images[0]?.url || "",
          songUrl: item.track.external_urls.spotify,
          playedAt: item.played_at,
          isDemo: false,
        });
      }
    }

    // Default fallback if no tracks returned
    return NextResponse.json({
      isPlaying: false,
      isLastPlayed: true,
      title: "Starboy",
      artist: "The Weeknd, Daft Punk",
      album: "Starboy",
      albumImageUrl: "https://i.scdn.co/image/ab67616d0000b2734718e2b124f79258be7bc452",
      songUrl: "https://open.spotify.com/track/7MXVkk9YM5IZxh0WSlVIh0",
      isDemo: true,
      needsAuth: false,
    });
  } catch (error) {
    return NextResponse.json(
      {
        isPlaying: false,
        isLastPlayed: true,
        title: "Starboy",
        artist: "The Weeknd, Daft Punk",
        album: "Starboy",
        albumImageUrl: "https://i.scdn.co/image/ab67616d0000b2734718e2b124f79258be7bc452",
        songUrl: "https://open.spotify.com/track/7MXVkk9YM5IZxh0WSlVIh0",
        isDemo: true,
      },
      { status: 200 }
    );
  }
}
