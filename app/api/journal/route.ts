import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireProfileId, handleApiError } from "@/lib/api";
import { todayString, dayStringToDate, dateToDayString } from "@/lib/date";

/**
 * Random past good thing for the "From the journal" dashboard card
 * (ready_BACKLOG.md Epic 1). Deliberately not cached — "tap for another"
 * needs a fresh pick each call.
 */
export async function GET() {
  try {
    const profileId = requireProfileId();
    const today = dayStringToDate(todayString());

    const entries = await prisma.dailyEntry.findMany({
      where: {
        profileId,
        date: { lt: today },
        OR: [
          { goodThing1: { not: null } },
          { goodThing2: { not: null } },
          { goodThing3: { not: null } },
        ],
      },
      select: { date: true, goodThing1: true, goodThing2: true, goodThing3: true },
    });

    const candidates = entries.flatMap((entry) =>
      [entry.goodThing1, entry.goodThing2, entry.goodThing3]
        .filter((text): text is string => Boolean(text && text.trim()))
        .map((text) => ({ text, date: dateToDayString(entry.date) })),
    );

    if (candidates.length === 0) {
      return NextResponse.json({ entry: null });
    }

    const pick = candidates[Math.floor(Math.random() * candidates.length)];
    return NextResponse.json({ entry: pick });
  } catch (e) {
    return handleApiError(e);
  }
}
