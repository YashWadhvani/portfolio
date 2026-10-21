import fs from "fs";
import path from "path";

// Read credentials from .env.local
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

const args = process.argv.slice(2);
const codeOrUrl = args[0];
const redirectUriArg = args[1];

if (!codeOrUrl) {
  console.log(`
Usage:
  node scripts/exchange-code.mjs <code-or-redirect-url> [redirect-uri]

Example:
  node scripts/exchange-code.mjs "https://example.com/callback?code=AQD123..."
`);
  process.exit(1);
}

let code = codeOrUrl;
let redirectUri = redirectUriArg || "https://example.com/callback";

// If a full URL was pasted, extract the code and the base URL
if (codeOrUrl.includes("code=")) {
  try {
    const parsed = new URL(codeOrUrl);
    code = parsed.searchParams.get("code") || codeOrUrl;
    if (!redirectUriArg) {
      redirectUri = `${parsed.origin}${parsed.pathname}`;
    }
  } catch (err) {
    const match = codeOrUrl.match(/code=([^&]+)/);
    if (match) code = match[1];
  }
}

console.log(`Exchanging code with Spotify using:`);
console.log(`  Client ID:    ${clientId}`);
console.log(`  Redirect URI: ${redirectUri}`);
console.log(`  Code:         ${code.substring(0, 15)}...`);

const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

try {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
    }),
  });

  const data = await response.json();

  if (!response.ok || !data.refresh_token) {
    console.error("\n❌ Spotify exchange error:", data);
    process.exit(1);
  }

  const refreshToken = data.refresh_token;
  console.log("\n✅ Success! Spotify Refresh Token received:");
  console.log(`SPOTIFY_REFRESH_TOKEN=${refreshToken}\n`);

  // Write to .env.local
  let envContent = fs.existsSync(envPath) ? fs.readFileSync(envPath, "utf-8") : "";
  if (envContent.includes("SPOTIFY_REFRESH_TOKEN=")) {
    envContent = envContent.replace(
      /SPOTIFY_REFRESH_TOKEN=.*/,
      `SPOTIFY_REFRESH_TOKEN=${refreshToken}`
    );
  } else {
    envContent = envContent.trim() + `\nSPOTIFY_REFRESH_TOKEN=${refreshToken}\n`;
  }

  fs.writeFileSync(envPath, envContent.trim() + "\n", "utf-8");
  console.log("💾 Automatically saved to .env.local!");
  console.log("🚀 Live Spotify playback is now active on your portfolio!");
} catch (err) {
  console.error("❌ Network error:", err.message);
}
