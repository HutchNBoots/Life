import { prisma } from "./prisma";
import { todayString, dayStringToDate, dateToDayString, monthBounds } from "./date";
import { filledCount, isDayComplete } from "./tally";
import { currentStreak, longestStreak } from "./streaks";

export async function getTodayEntry(profileId: string) {
  const date = dayStringToDate(todayString());
  const entry = await prisma.dailyEntry.findUnique({
    where: { profileId_date: { profileId, date } },
  });
  return { entry, filledCount: filledCount(entry), dayComplete: isDayComplete(entry) };
}

export interface GoalWithTodayState {
  id: string;
  label: string;
  sortOrder: number;
  achievedToday: boolean;
}

export async function getGoalsWithTodayState(profileId: string): Promise<GoalWithTodayState[]> {
  const date = dayStringToDate(todayString());
  const goals = await prisma.binaryGoal.findMany({
    where: { profileId, active: true },
    orderBy: { sortOrder: "asc" },
    include: { logs: { where: { date } } },
  });
  return goals.map((g) => ({
    id: g.id,
    label: g.label,
    sortOrder: g.sortOrder,
    achievedToday: g.logs[0]?.achieved ?? false,
  }));
}

export interface MonthCalendarDay {
  date: string;
  filledCount: number;
  goals: { goalId: string; achieved: boolean }[];
}

/** Calendar data for the month containing `monthAnchor`, scoped to profile. */
export async function getMonthCalendarData(profileId: string, monthAnchor: string) {
  const { start, end } = monthBounds(monthAnchor);
  const range = { gte: dayStringToDate(start), lte: dayStringToDate(end) };

  const [entries, goals] = await Promise.all([
    prisma.dailyEntry.findMany({ where: { profileId, date: range } }),
    prisma.binaryGoal.findMany({ where: { profileId, active: true }, orderBy: { sortOrder: "asc" } }),
  ]);

  const goalLogs = await prisma.binaryGoalLog.findMany({
    where: { binaryGoalId: { in: goals.map((g) => g.id) }, date: range },
  });

  const days: MonthCalendarDay[] = entries.map((entry) => {
    const entryDay = dateToDayString(entry.date);
    return {
      date: entryDay,
      filledCount: filledCount(entry),
      goals: goals.map((goal) => ({
        goalId: goal.id,
        achieved:
          goalLogs.find((log) => log.binaryGoalId === goal.id && dateToDayString(log.date) === entryDay)?.achieved ??
          false,
      })),
    };
  });

  return { days, goalCount: goals.length };
}

/** Current/longest streak, based on "day complete" entries (all 5 slots filled). */
export async function getStreakSummary(profileId: string) {
  const entries = await prisma.dailyEntry.findMany({ where: { profileId } });
  const completeDays = entries.filter(isDayComplete).map((e) => dateToDayString(e.date));
  return { current: currentStreak(completeDays, todayString()), longest: longestStreak(completeDays) };
}

export interface SpiritTierState {
  id: string;
  name: string;
  day: number;
  unlocked: boolean;
}

/**
 * Spirit-animal ladder for a profile (ready_SPIRIT_ANIMALS.md). Unlock state
 * is driven by longest streak (permanent); the current companion reflects
 * only the live current streak.
 */
export async function getSpiritSummary(profileId: string) {
  const [entries, tiers] = await Promise.all([
    prisma.dailyEntry.findMany({ where: { profileId } }),
    prisma.spiritTier.findMany({ orderBy: { sortOrder: "asc" } }),
  ]);

  const completeDays = entries.filter(isDayComplete).map((e) => dateToDayString(e.date));
  const current = currentStreak(completeDays, todayString());
  const longest = longestStreak(completeDays);

  const tierList: SpiritTierState[] = tiers.map((tier) => ({
    id: tier.id,
    name: tier.name,
    day: tier.streakDayThreshold,
    unlocked: longest >= tier.streakDayThreshold,
  }));

  const companion = [...tierList].reverse().find((t) => current >= t.day) ?? null;
  const next = tierList.find((t) => t.day > current) ?? null;

  return {
    current,
    longest,
    companion,
    next: next ? { name: next.name, daysAway: next.day - current } : null,
    tiers: tierList,
  };
}
