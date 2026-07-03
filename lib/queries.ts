import { prisma } from "./prisma";
import { todayString, dayStringToDate, dateToDayString, monthBounds } from "./date";
import { filledCount, isDayComplete } from "./tally";
import { currentStreak, longestStreak } from "./streaks";

/** Entry for an arbitrary day (today or a backfilled past day), scoped to profile. */
export async function getEntryForDate(profileId: string, day: string) {
  const date = dayStringToDate(day);
  const entry = await prisma.dailyEntry.findUnique({
    where: { profileId_date: { profileId, date } },
  });
  return { entry, filledCount: filledCount(entry), dayComplete: isDayComplete(entry) };
}

export async function getTodayEntry(profileId: string) {
  return getEntryForDate(profileId, todayString());
}

export interface GoalWithTodayState {
  id: string;
  label: string;
  sortOrder: number;
  achievedToday: boolean;
}

/** Goals + their achieved state for an arbitrary day, scoped to profile. */
export async function getGoalsForDate(profileId: string, day: string): Promise<GoalWithTodayState[]> {
  const date = dayStringToDate(day);
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

export async function getGoalsWithTodayState(profileId: string): Promise<GoalWithTodayState[]> {
  return getGoalsForDate(profileId, todayString());
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

export interface GoalMilestoneState {
  id: string;
  dayThreshold: number;
  unlocked: boolean;
}

export interface GoalWithMilestones {
  id: string;
  label: string;
  currentStreak: number;
  longestStreak: number;
  milestones: GoalMilestoneState[];
  nextMilestoneDaysAway: number | null;
  justUnlockedTierId: string | null;
}

/**
 * Per-goal "prize" milestones (ready_MVP2_5.md Epic 13) — a streak ladder
 * per binary goal, separate from the profile-wide spirit-animal ladder.
 * Unlock detection/recording mirrors getSpiritSummary below: driven by
 * longest streak (permanent), recorded the first time it's observed.
 */
export async function getGoalsWithMilestones(profileId: string): Promise<GoalWithMilestones[]> {
  const [goals, tiers] = await Promise.all([
    prisma.binaryGoal.findMany({
      where: { profileId, active: true },
      orderBy: { sortOrder: "asc" },
      include: { logs: { where: { achieved: true } } },
    }),
    prisma.goalMilestoneTier.findMany({ orderBy: { sortOrder: "asc" } }),
  ]);

  const existingUnlocks = await prisma.goalMilestoneUnlock.findMany({
    where: { binaryGoalId: { in: goals.map((g) => g.id) } },
    select: { binaryGoalId: true, goalMilestoneTierId: true },
  });
  const recordedKey = (goalId: string, tierId: string) => `${goalId}:${tierId}`;
  const recorded = new Set(existingUnlocks.map((u) => recordedKey(u.binaryGoalId, u.goalMilestoneTierId)));

  const toRecord: { binaryGoalId: string; goalMilestoneTierId: string }[] = [];
  const results: GoalWithMilestones[] = goals.map((goal) => {
    const achievedDays = goal.logs.map((l) => dateToDayString(l.date));
    const current = currentStreak(achievedDays, todayString());
    const longest = longestStreak(achievedDays);

    const milestones: GoalMilestoneState[] = tiers.map((tier) => ({
      id: tier.id,
      dayThreshold: tier.dayThreshold,
      unlocked: longest >= tier.dayThreshold,
    }));

    let justUnlockedTierId: string | null = null;
    for (const m of milestones) {
      if (m.unlocked && !recorded.has(recordedKey(goal.id, m.id))) {
        toRecord.push({ binaryGoalId: goal.id, goalMilestoneTierId: m.id });
        justUnlockedTierId = justUnlockedTierId ?? m.id;
      }
    }

    const nextTier = milestones.find((t) => !t.unlocked);

    return {
      id: goal.id,
      label: goal.label,
      currentStreak: current,
      longestStreak: longest,
      milestones,
      nextMilestoneDaysAway: nextTier ? nextTier.dayThreshold - current : null,
      justUnlockedTierId,
    };
  });

  if (toRecord.length > 0) {
    await prisma.goalMilestoneUnlock.createMany({ data: toRecord, skipDuplicates: true });
  }

  return results;
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

  const matchedTier = [...tierList].reverse().find((t) => current >= t.day) ?? null;
  // Default to the first tier before any streak exists, so the dashboard
  // always has a companion to show rather than a blank badge. In that case
  // "next" skips past it too, since it's already the one being shown.
  const companion = matchedTier ?? tierList[0] ?? null;
  const next = matchedTier ? tierList.find((t) => t.day > current) ?? null : tierList[1] ?? null;

  // Unlocks are permanent and recorded the first time we notice them —
  // recording IS the reveal trigger, so a tier only ever comes back as
  // `justUnlocked` once, on whichever request first observes it unlocked.
  const unlockedTiers = tierList.filter((t) => t.unlocked);
  const existing = await prisma.profileSpiritUnlock.findMany({
    where: { profileId, spiritTierId: { in: unlockedTiers.map((t) => t.id) } },
    select: { spiritTierId: true },
  });
  const alreadyRecorded = new Set(existing.map((u) => u.spiritTierId));
  const newlyUnlocked = unlockedTiers.filter((t) => !alreadyRecorded.has(t.id));

  if (newlyUnlocked.length > 0) {
    await prisma.profileSpiritUnlock.createMany({
      data: newlyUnlocked.map((t) => ({ profileId, spiritTierId: t.id })),
      skipDuplicates: true,
    });
  }

  return {
    current,
    longest,
    companion,
    next: next ? { name: next.name, daysAway: next.day - current } : null,
    tiers: tierList,
    justUnlocked: newlyUnlocked[0] ?? null,
  };
}
