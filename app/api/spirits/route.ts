import { NextResponse } from "next/server";
import { requireProfileId, handleApiError } from "@/lib/api";
import { getSpiritSummary } from "@/lib/queries";

export async function GET() {
  try {
    const profileId = requireProfileId();
    const summary = await getSpiritSummary(profileId);
    return NextResponse.json({
      currentStreak: summary.current,
      longestStreak: summary.longest,
      companion: summary.companion,
      next: summary.next,
      tiers: summary.tiers,
    });
  } catch (e) {
    return handleApiError(e);
  }
}
