import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import fs from "fs";
import path from "path";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const adminToken = process.env.SPOTIFY_ADMIN_TOKEN;
  const adminCookie = cookies().get("spotify_admin")?.value;
  const stateCookie = cookies().get("spotify_oauth_state")?.value;
  const state = url.searchParams.get("state");
  const code = url.searchParams.get("code");

  if (!adminToken || adminCookie !== adminToken || !state || state !== stateCookie) {
    return NextResponse.json({ error: "Unauthorized Spotify callback" }, { status: 401 });
  }
  if (!code) return NextResponse.json({ error: "Spotify authorization failed" }, { status: 400 });

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    return NextResponse.json({ error: "Spotify client credentials are not configured" }, { status: 503 });
  }

  const redirectUri = `${url.origin}/api/spotify/admin/callback`;
  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  const tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ grant_type: "authorization_code", code, redirect_uri: redirectUri }),
  });
  const data = await tokenResponse.json();
  if (!tokenResponse.ok || !data.refresh_token) {
    return NextResponse.json({ error: data.error_description || "Token exchange failed" }, { status: 400 });
  }

  // Local development convenience only. Production deployments must set the secret in their platform environment.
  try {
    const envPath = path.resolve(process.cwd(), ".env.local");
    let content = fs.existsSync(envPath) ? fs.readFileSync(envPath, "utf8") : "";
    if (/^SPOTIFY_REFRESH_TOKEN=/m.test(content)) {
      content = content.replace(/^SPOTIFY_REFRESH_TOKEN=.*$/m, `SPOTIFY_REFRESH_TOKEN=${data.refresh_token}`);
    } else {
      content += `\nSPOTIFY_REFRESH_TOKEN=${data.refresh_token}\n`;
    }
    fs.writeFileSync(envPath, content.trim() + "\n", "utf8");
  } catch {
    // Serverless deployments are read-only; configure the returned token as a platform secret instead.
  }

  const response = NextResponse.redirect(`${url.origin}/admin/spotify?success=1`);
  response.cookies.delete("spotify_oauth_state");
  return response;
}
