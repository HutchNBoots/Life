import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireProfileId, handleApiError, ApiError } from "@/lib/api";
import { todayString, dayStringToDate } from "@/lib/date";

/** Toggle (or set) a binary goal's achieved state for today, scoped to profile. */
export async function POST(req: NextRequest) {
  try {
    const profileId = requireProfileId();
    const { goalId, achieved } = await req.json();
    if (typeof goalId !== "string" || typeof achieved !== "boolean") {
      throw new ApiError(400, "goalId and achieved are required.");
    }

    const goal = await prisma.binaryGoal.findUnique({ where: { id: goalId } });
    if (!goal || goal.profileId !== profileId) {
      throw new ApiError(404, "Unknown goal.");
    }

    const date = dayStringToDate(todayString());
    const log = await prisma.binaryGoalLog.upsert({
      where: { binaryGoalId_date: { binaryGoalId: goalId, date } },
      update: { achieved },
      create: { binaryGoalId: goalId, date, achieved },
    });

    return NextResponse.json({ log });
  } catch (e) {
    return handleApiError(e);
  }
}
