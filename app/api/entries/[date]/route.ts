import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireProfileId, handleApiError, ApiError } from "@/lib/api";
import { todayString, dayStringToDate } from "@/lib/date";
import { filledCount, isDayComplete } from "@/lib/tally";
import { getEntryForDate } from "@/lib/queries";

const EDITABLE_FIELDS = ["goodThing1", "goodThing2", "goodThing3", "toSort", "sorted"] as const;
type EditableField = (typeof EDITABLE_FIELDS)[number];
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

export async function GET(_req: NextRequest, { params }: { params: { date: string } }) {
  try {
    const profileId = requireProfileId();
    if (!DATE_RE.test(params.date)) throw new ApiError(400, "date must be YYYY-MM-DD.");
    return NextResponse.json(await getEntryForDate(profileId, params.date));
  } catch (e) {
    return handleApiError(e);
  }
}

/**
 * Save (or backfill) a day's entry, scoped to profile. Any day up to and
 * including today is editable, unlocked — see ready_BACKLOG.md Epic 5:
 * gating backfill behind a streak would lock out exactly the person who
 * missed a day and most needs to catch up.
 */
export async function PUT(req: NextRequest, { params }: { params: { date: string } }) {
  try {
    const profileId = requireProfileId();
    const day = params.date;
    if (!DATE_RE.test(day)) throw new ApiError(400, "date must be YYYY-MM-DD.");

    const today = todayString();
    if (day > today) throw new ApiError(400, "Cannot log a future day.");

    const date = dayStringToDate(day);
    const body = await req.json();

    const data: Partial<Record<EditableField, string>> = {};
    for (const field of EDITABLE_FIELDS) {
      if (field in body) {
        if (typeof body[field] !== "string") {
          throw new ApiError(400, `${field} must be a string.`);
        }
        data[field] = body[field];
      }
    }

    const backfilled = day !== today;
    const entry = await prisma.dailyEntry.upsert({
      where: { profileId_date: { profileId, date } },
      update: { ...data, ...(backfilled ? { backfilled: true } : {}) },
      create: { profileId, date, backfilled, ...data },
    });

    return NextResponse.json({
      entry,
      filledCount: filledCount(entry),
      dayComplete: isDayComplete(entry),
    });
  } catch (e) {
    return handleApiError(e);
  }
}
