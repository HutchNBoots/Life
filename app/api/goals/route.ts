import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireProfileId, handleApiError, ApiError } from "@/lib/api";
import { getGoalsWithTodayState } from "@/lib/queries";

export async function GET() {
  try {
    const profileId = requireProfileId();
    return NextResponse.json({ goals: await getGoalsWithTodayState(profileId) });
  } catch (e) {
    return handleApiError(e);
  }
}

/**
 * Add a goal (ready_MVP2_5.md Epic 12), scoped to the current profile.
 * Returns the goal already shaped like `GoalWithMilestones` (all tiers
 * locked, zero streak) so the Goals tab can append it without a refetch.
 */
export async function POST(req: NextRequest) {
  try {
    const profileId = requireProfileId();
    const { label } = await req.json();
    if (typeof label !== "string" || !label.trim()) {
      throw new ApiError(400, "label is required.");
    }

    const [count, tiers] = await Promise.all([
      prisma.binaryGoal.count({ where: { profileId } }),
      prisma.goalMilestoneTier.findMany({ orderBy: { sortOrder: "asc" } }),
    ]);
    const goal = await prisma.binaryGoal.create({
      data: { profileId, label: label.trim(), sortOrder: count },
    });

    return NextResponse.json({
      goal: {
        id: goal.id,
        label: goal.label,
        currentStreak: 0,
        longestStreak: 0,
        milestones: tiers.map((t) => ({ id: t.id, dayThreshold: t.dayThreshold, unlocked: false })),
        nextMilestoneDaysAway: tiers[0]?.dayThreshold ?? null,
        justUnlockedTierId: null,
      },
    });
  } catch (e) {
    return handleApiError(e);
  }
}
