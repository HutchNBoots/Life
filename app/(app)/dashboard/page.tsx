import { getCurrentProfile } from "@/lib/session";
import { getTodayEntry, getSpiritSummary, getMonthCalendarData, getGoalsWithMilestones } from "@/lib/queries";
import { todayString } from "@/lib/date";
import { CompanionHeader } from "@/components/dashboard/CompanionHeader";
import { FlashbackCard } from "@/components/dashboard/FlashbackCard";
import { StreakGoalGrid } from "@/components/dashboard/StreakGoalGrid";
import { DayStatusBanner } from "@/components/dashboard/DayStatusBanner";
import { CalendarGrid } from "@/components/calendar/CalendarGrid";

export default async function DashboardPage() {
  const profile = await getCurrentProfile();
  if (!profile) return null;

  const today = todayString();
  const [{ dayComplete }, spirits, calendar, goals] = await Promise.all([
    getTodayEntry(profile.id),
    getSpiritSummary(profile.id),
    getMonthCalendarData(profile.id, today),
    getGoalsWithMilestones(profile.id),
  ]);

  return (
    <div className="no-scrollbar flex-1 overflow-y-auto pb-2">
      <CompanionHeader
        profileName={profile.name}
        companionName={spirits.companion?.name ?? null}
        companionCopy={spirits.next ? `${spirits.next.daysAway} days to ${spirits.next.name}` : "Every tier unlocked"}
        justUnlocked={Boolean(spirits.justUnlocked && spirits.justUnlocked.id === spirits.companion?.id)}
      />
      <FlashbackCard />
      <StreakGoalGrid current={spirits.current} longest={spirits.longest} goals={goals} />
      <DayStatusBanner dayComplete={dayComplete} />
      <div className="mb-2.5 text-base uppercase tracking-[.09em] text-[rgba(255,218,185,0.55)]">Calendar</div>
      <CalendarGrid monthAnchor={today} days={calendar.days} goalCount={calendar.goalCount} />
    </div>
  );
}
