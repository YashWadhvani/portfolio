import { NextResponse } from "next/server";
import { getPresence } from "@/lib/presence";

export const revalidate = 60;

export async function GET() {
  const presence = await getPresence();
  return NextResponse.json(presence, {
    headers: {
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
    },
  });
}
