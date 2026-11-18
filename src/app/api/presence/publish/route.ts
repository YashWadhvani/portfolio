import { NextResponse } from "next/server";
import { publishPresence, PresenceActivity } from "@/lib/presence";

export const runtime = "nodejs";

function normalizeToken(value: string | null | undefined) {
  return String(value || "").trim().replace(/^("|')(.*)\1$/, "$2");
}

export async function POST(request: Request) {
  const expectedToken = normalizeToken(process.env.PRESENCE_PUBLISH_TOKEN);
  const suppliedToken = normalizeToken(
    request.headers.get("x-presence-token") ||
      request.headers.get("authorization")?.replace(/^Bearer\s+/i, ""),
  );

  if (!expectedToken) {
    return NextResponse.json(
      { error: "PRESENCE_PUBLISH_TOKEN is not configured on the production server" },
      { status: 503 },
    );
  }
  if (!suppliedToken) {
    return NextResponse.json({ error: "Presence publish token was not supplied" }, { status: 401 });
  }
  if (suppliedToken !== expectedToken) {
    return NextResponse.json({ error: "Presence publish token does not match the production server" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const activity: PresenceActivity = {
      app: String(body.app || "").trim().slice(0, 80),
      detail: String(body.detail || "").trim().slice(0, 160),
      icon: String(body.icon || "💻").slice(0, 4),
      source: "desktop",
      status: String(body.app || "").trim().toLowerCase() === "away" ? "away" : "online",
    };

    if (!activity.app || !activity.detail) {
      return NextResponse.json({ error: "app and detail are required" }, { status: 400 });
    }

    await publishPresence(activity);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Presence publish failed:", error);
    return NextResponse.json(
      {
        error: "Presence storage is unavailable",
        detail: error instanceof Error ? error.message : "Check KV_REST_API_URL and KV_REST_API_TOKEN",
      },
      { status: 502 },
    );
  }
}
