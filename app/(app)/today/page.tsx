import { getCurrentProfile } from "@/lib/session";
import { getTodayEntry, getGoalsWithTodayState } from "@/lib/queries";
import { todayString, formatDayLabel } from "@/lib/date";
import { EntryForm } from "@/components/ledger/EntryForm";

export default async function TodayPage() {
  const profile = await getCurrentProfile();
  if (!profile) return null;

  const [{ entry, filledCount }, goals] = await Promise.all([
    getTodayEntry(profile.id),
    getGoalsWithTodayState(profile.id),
  ]);

  return (
    <EntryForm
      profileName={profile.name}
      dateLabel={formatDayLabel(todayString())}
      initialFields={{
        goodThing1: entry?.goodThing1 ?? "",
        goodThing2: entry?.goodThing2 ?? "",
        goodThing3: entry?.goodThing3 ?? "",
        toSort: entry?.toSort ?? "",
        sorted: entry?.sorted ?? "",
      }}
      initialFilledCount={filledCount}
      initialGoals={goals}
    />
  );
}
