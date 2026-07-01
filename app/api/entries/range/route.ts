import { NextRequest, NextResponse } from "next/server";
import { requireProfileId, handleApiError } from "@/lib/api";
import { todayString } from "@/lib/date";
import { getMonthCalendarData } from "@/lib/queries";

/**
 * Calendar data for a month, scoped to the current profile. The POC calendar
 * only shows the current month (month navigation is gated behind a streak
 * milestone in ready_MVP2.md), so this defaults to the month containing
 * today unless `month` (a "YYYY-MM-DD" anchor) is given.
 */
export async function GET(req: NextRequest) {
  try {
    const profileId = requireProfileId();
    const { searchParams } = new URL(req.url);
    const monthAnchor = searchParams.get("month") ?? todayString();

    const { days, goalCount } = await getMonthCalendarData(profileId, monthAnchor);
    return NextResponse.json({ monthAnchor, days, goalCount });
  } catch (e) {
    return handleApiError(e);
  }
}
