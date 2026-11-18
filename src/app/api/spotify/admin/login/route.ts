import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import crypto from "crypto";

export async function GET(request: Request) {
  const adminToken = process.env.SPOTIFY_ADMIN_TOKEN;
  const cookieToken = cookies().get("spotify_admin")?.value;
  const providedToken = new URL(request.url).searchParams.get("token");

  if (!adminToken || (cookieToken !== adminToken && providedToken !== adminToken)) {
    return NextResponse.json({ error: "Admin authentication required" }, { status: 401 });
  }

  const state = crypto.randomBytes(24).toString("hex");
  const redirectUri = `${new URL(request.url).origin}/api/spotify/admin/callback`;
  const authUrl = new URL("https://accounts.spotify.com/authorize");
  authUrl.searchParams.set("response_type", "code");
  authUrl.searchParams.set("client_id", process.env.SPOTIFY_CLIENT_ID || "");
  authUrl.searchParams.set("scope", "user-read-currently-playing user-read-recently-played user-read-playback-state");
  authUrl.searchParams.set("redirect_uri", redirectUri);
  authUrl.searchParams.set("state", state);

  const response = NextResponse.redirect(authUrl.toString());
  response.cookies.set("spotify_oauth_state", state, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 600,
    path: "/",
  });
  if (providedToken) {
    response.cookies.set("spotify_admin", adminToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 600,
      path: "/",
    });
  }
  return response;
}
