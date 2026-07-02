import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireProfileId, handleApiError, ApiError } from "@/lib/api";
import { todayString, dayStringToDate } from "@/lib/date";
import { getGoalsWithMilestones } from "@/lib/queries";

/**
 * Toggle (or set) a binary goal's achieved state for today, scoped to
 * profile. Reports back whether this crossed a new milestone threshold
 * (ready_MVP2_5.md Epic 13), so the Today screen can show the "prize won"
 * celebration right at the moment it happens.
 */
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

    let milestoneUnlock: { dayThreshold: number; goalLabel: string } | null = null;
    if (achieved) {
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
