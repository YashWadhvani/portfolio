import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const client_id = process.env.SPOTIFY_CLIENT_ID;

  if (!client_id) {
    return NextResponse.json(
      { error: "SPOTIFY_CLIENT_ID is not configured in .env.local" },
      { status: 400 }
    );
  }

  const { searchParams } = new URL(request.url);
  // Default to localhost:3000/callback which the user configured in Spotify dashboard
  const redirect_uri =
    searchParams.get("redirect_uri") || "http://localhost:3000/callback";

  const scopes = [
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-read-playback-state",
  ].join(" ");

  const authUrl = new URL("https://accounts.spotify.com/authorize");
  authUrl.searchParams.set("response_type", "code");
  authUrl.searchParams.set("client_id", client_id);
  authUrl.searchParams.set("scope", scopes);
  authUrl.searchParams.set("redirect_uri", redirect_uri);
  authUrl.searchParams.set("show_dialog", "true");

  return NextResponse.redirect(authUrl.toString());
}
