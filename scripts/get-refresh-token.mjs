/**
 * Spotify Refresh Token Generator
 * Automatically opens your browser, receives the Spotify callback,
 * and saves SPOTIFY_REFRESH_TOKEN to .env.local.
 */
import http from "http";
import fs from "fs";
import path from "path";
import { exec } from "child_process";

// Read client credentials from .env.local
const envPath = path.resolve(process.cwd(), ".env.local");
let clientId = process.env.SPOTIFY_CLIENT_ID;
let clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, "utf-8");
  const idMatch = content.match(/^SPOTIFY_CLIENT_ID=(.*)$/m);
  const secMatch = content.match(/^SPOTIFY_CLIENT_SECRET=(.*)$/m);
  if (idMatch && idMatch[1]) clientId = idMatch[1].trim();
  if (secMatch && secMatch[1]) clientSecret = secMatch[1].trim();
}

if (!clientId || !clientSecret) {
  console.error("❌ Error: SPOTIFY_CLIENT_ID or SPOTIFY_CLIENT_SECRET is missing in .env.local");
  process.exit(1);
}

const REDIRECT_URI = "http://localhost:3000/callback";
const SCOPES = "user-read-currently-playing user-read-recently-played user-read-playback-state";

const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&scope=${encodeURIComponent(
  SCOPES
)}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&show_dialog=true`;

console.log("\n========================================================");
console.log("🎵 Spotify Refresh Token Authorization Helper");
console.log("========================================================\n");
console.log("1. Opening your browser to authorize with Spotify...");
console.log(`URL: ${authUrl}\n`);

// Open browser
const startCmd =
  process.platform === "win32"
    ? `start "" "${authUrl}"`
    : process.platform === "darwin"
    ? `open "${authUrl}"`
    : `xdg-open "${authUrl}"`;

exec(startCmd);

console.log("2. Waiting for authorization callback on http://localhost:3000/callback ...");
console.log("   (Or open http://localhost:3000/api/spotify/login in your browser)\n");
