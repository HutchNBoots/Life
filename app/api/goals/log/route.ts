import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireProfileId, handleApiError, ApiError } from "@/lib/api";
import { todayString, dayStringToDate } from "@/lib/date";
import { getGoalsWithMilestones } from "@/lib/queries";

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const VALID_STATES = ["met", "missed", "unset"] as const;
type LogState = (typeof VALID_STATES)[number];

/**
 * Set a binary goal's state for a given day (defaults to today), scoped to
 * profile — also used when backfilling a past day's entry. "met"/"missed"
 * upsert an explicit log row; "missed" is a deliberate "didn't do this"
 * mark, distinct from "unset" (no row — not indicated either way), which
 * deletes any existing row. Reports back whether this crossed a new
 * milestone threshold (ready_MVP2_5.md Epic 13), so the caller can show
 * the "prize won" celebration right at the moment it happens.
 */
export async function POST(req: NextRequest) {
  try {
    const profileId = requireProfileId();
    const { goalId, state, date: day = todayString() } = await req.json();
    if (typeof goalId !== "string" || !VALID_STATES.includes(state)) {
      throw new ApiError(400, "goalId and a valid state (met/missed/unset) are required.");
    }
    if (typeof day !== "string" || !DATE_RE.test(day)) {
      throw new ApiError(400, "date must be YYYY-MM-DD.");
    }
    if (day > todayString()) {
      throw new ApiError(400, "Cannot log a future day.");
    }

    const goal = await prisma.binaryGoal.findUnique({ where: { id: goalId } });
    if (!goal || goal.profileId !== profileId) {
      throw new ApiError(404, "Unknown goal.");
    }

    const date = dayStringToDate(day);
    const logState = state as LogState;

    let log = null;
    if (logState === "unset") {
      await prisma.binaryGoalLog.deleteMany({ where: { binaryGoalId: goalId, date } });
    } else {
      log = await prisma.binaryGoalLog.upsert({
        where: { binaryGoalId_date: { binaryGoalId: goalId, date } },
        update: { achieved: logState === "met" },
        create: { binaryGoalId: goalId, date, achieved: logState === "met" },
      });
    }

    let milestoneUnlock: { dayThreshold: number; goalLabel: string } | null = null;
    if (logState === "met") {
      const goals = await getGoalsWithMilestones(profileId);
      const updatedGoal = goals.find((g) => g.id === goalId);
      const unlockedTier = updatedGoal?.milestones.find((m) => m.id === updatedGoal.justUnlockedTierId);
      if (updatedGoal?.justUnlockedTierId && unlockedTier) {
        milestoneUnlock = { dayThreshold: unlockedTier.dayThreshold, goalLabel: updatedGoal.label };
      }
    }

    return NextResponse.json({ log, milestoneUnlock });
  } catch (e) {
    return handleApiError(e);
  }
}
