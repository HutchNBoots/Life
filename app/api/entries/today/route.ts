import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireProfileId, handleApiError } from "@/lib/api";
import { todayString, dayStringToDate } from "@/lib/date";
import { filledCount, isDayComplete } from "@/lib/tally";
import { getTodayEntry } from "@/lib/queries";

const EDITABLE_FIELDS = ["goodThing1", "goodThing2", "goodThing3", "toSort", "sorted"] as const;
type EditableField = (typeof EDITABLE_FIELDS)[number];

export async function GET() {
  try {
    const profileId = requireProfileId();
    return NextResponse.json(await getTodayEntry(profileId));
  } catch (e) {
    return handleApiError(e);
  }
}

export async function PUT(req: NextRequest) {
  try {
    const profileId = requireProfileId();
    const date = dayStringToDate(todayString());
    const body = await req.json();

    const data: Partial<Record<EditableField, string>> = {};
    for (const field of EDITABLE_FIELDS) {
      if (field in body) {
        if (typeof body[field] !== "string") {
          return NextResponse.json({ error: `${field} must be a string.` }, { status: 400 });
        }
        data[field] = body[field];
      }
    }

    const entry = await prisma.dailyEntry.upsert({
      where: { profileId_date: { profileId, date } },
      update: data,
      create: { profileId, date, ...data },
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
