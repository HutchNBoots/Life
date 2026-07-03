import { notFound, redirect } from "next/navigation";
import { getCurrentProfile } from "@/lib/session";
import { getEntryForDate, getGoalsForDate } from "@/lib/queries";
import { todayString, formatDayLabel } from "@/lib/date";
import { EntryForm } from "@/components/ledger/EntryForm";

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

/**
 * View/edit a past day's entry, reached by tapping a day on the dashboard
 * calendar (ready_BACKLOG.md Epic 5). Backfilling is deliberately ungated —
 * gating it behind a streak would lock out exactly the person who missed a
 * day and needs to catch up.
 */
export default async function EntryDatePage({ params }: { params: { date: string } }) {
  const profile = await getCurrentProfile();
  if (!profile) return null;

  const { date } = params;
  if (!DATE_RE.test(date)) notFound();

  const today = todayString();
  if (date > today) notFound();
  if (date === today) redirect("/today");

  const [{ entry, filledCount }, goals] = await Promise.all([
    getEntryForDate(profile.id, date),
    getGoalsForDate(profile.id, date),
  ]);

  return (
    <EntryForm
      date={date}
      dateLabel={formatDayLabel(date)}
      initialFields={{
        goodThing1: entry?.goodThing1 ?? "",
        goodThing2: entry?.goodThing2 ?? "",
        goodThing3: entry?.goodThing3 ?? "",
        toSort: entry?.toSort ?? "",
        sorted: entry?.sorted ?? "",
      }}
      initialFilledCount={filledCount}
      initialGoals={goals}
      backfilled={entry?.backfilled ?? false}
      backHref="/dashboard"
    />
  );
}
