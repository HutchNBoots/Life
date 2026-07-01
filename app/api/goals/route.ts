import { NextResponse } from "next/server";
import { requireProfileId, handleApiError } from "@/lib/api";
import { getGoalsWithTodayState } from "@/lib/queries";

export async function GET() {
  try {
    const profileId = requireProfileId();
    return NextResponse.json({ goals: await getGoalsWithTodayState(profileId) });
  } catch (e) {
    return handleApiError(e);
  }
}
