import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireProfileId, handleApiError } from "@/lib/api";
import { dateToDayString } from "@/lib/date";
import { currentStreak, longestStreak } from "@/lib/streaks";
import { todayString } from "@/lib/date";
import { getStreakSummary } from "@/lib/queries";

export async function GET() {
  try {
    const profileId = requireProfileId();
    const today = todayString();

    const [{ current, longest }, goals] = await Promise.all([
      getStreakSummary(profileId),
      prisma.binaryGoal.findMany({
        where: { profileId, active: true },
        orderBy: { sortOrder: "asc" },
        include: { logs: { where: { achieved: true } } },
      }),
    ]);

    const perGoal = goals.map((goal) => {
      const achievedDays = goal.logs.map((log) => dateToDayString(log.date));
      return {
        id: goal.id,
        label: goal.label,
        current: currentStreak(achievedDays, today),
        longest: longestStreak(achievedDays),
      };
    });

    return NextResponse.json({ current, longest, perGoal });
  } catch (e) {
    return handleApiError(e);
  }
}
