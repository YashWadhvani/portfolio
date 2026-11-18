import { NextResponse } from "next/server";
import { getSpotifySnapshot } from "@/lib/spotify";

export const revalidate = 60;

export async function GET() {
  const snapshot = await getSpotifySnapshot();
  return NextResponse.json(snapshot, {
    headers: {
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
    },
  });
}
