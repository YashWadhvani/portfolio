import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";

export async function POST(request: Request) {
  try {
    const { code, redirect_uri } = await request.json();

    const client_id = process.env.SPOTIFY_CLIENT_ID;
    const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

    if (!client_id || !client_secret) {
      return NextResponse.json(
        { error: "SPOTIFY_CLIENT_ID or SPOTIFY_CLIENT_SECRET missing in .env.local" },
        { status: 400 }
      );
    }

    if (!code) {
      return NextResponse.json(
        { error: "Authorization code is required" },
        { status: 400 }
      );
    }

    const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");

    const response = await fetch(TOKEN_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Basic ${basic}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: redirect_uri || "http://localhost:3000/callback",
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.refresh_token) {
      return NextResponse.json(
        { error: data.error_description || data.error || "Failed to exchange token with Spotify" },
        { status: response.status }
      );
    }

    const refreshToken = data.refresh_token;

    // Automatically append/update SPOTIFY_REFRESH_TOKEN in .env.local
    try {
      const envPath = path.resolve(process.cwd(), ".env.local");
      let envContent = "";
      if (fs.existsSync(envPath)) {
        envContent = fs.readFileSync(envPath, "utf-8");
      }

      if (envContent.includes("SPOTIFY_REFRESH_TOKEN=")) {
        envContent = envContent.replace(
          /SPOTIFY_REFRESH_TOKEN=.*/,
          `SPOTIFY_REFRESH_TOKEN=${refreshToken}`
        );
      } else {
        envContent += `\nSPOTIFY_REFRESH_TOKEN=${refreshToken}\n`;
      }

      fs.writeFileSync(envPath, envContent.trim() + "\n", "utf-8");
      // Update running process environment as well
      process.env.SPOTIFY_REFRESH_TOKEN = refreshToken;
    } catch (fsErr) {
      console.warn("Could not write directly to .env.local:", fsErr);
    }

    return NextResponse.json({
      success: true,
      refresh_token: refreshToken,
      message: "Successfully generated and saved Spotify refresh token!",
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}
