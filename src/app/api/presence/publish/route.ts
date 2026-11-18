import { NextResponse } from "next/server";
import { publishPresence, PresenceActivity } from "@/lib/presence";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const expectedToken = process.env.PRESENCE_PUBLISH_TOKEN;
  const suppliedToken = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");

  if (!expectedToken || !suppliedToken || suppliedToken !== expectedToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const activity: PresenceActivity = {
      app: String(body.app || "").trim().slice(0, 80),
      detail: String(body.detail || "").trim().slice(0, 160),
      icon: String(body.icon || "💻").slice(0, 4),
      source: "desktop",
    };

    if (!activity.app || !activity.detail) {
      return NextResponse.json({ error: "app and detail are required" }, { status: 400 });
    }

    await publishPresence(activity);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid presence payload" }, { status: 400 });
  }
}
