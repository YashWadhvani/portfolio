import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const adminToken = process.env.SPOTIFY_ADMIN_TOKEN;
  if (!adminToken) {
    return NextResponse.json({ error: "SPOTIFY_ADMIN_TOKEN is not configured" }, { status: 503 });
  }

  const { token } = await request.json();
  if (!token || token !== adminToken) {
    return NextResponse.json({ error: "Invalid admin token" }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set("spotify_admin", adminToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 600,
    path: "/",
  });
  return response;
}
