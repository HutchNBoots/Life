import { getCurrentProfile } from "@/lib/session";
import { getSpiritSummary } from "@/lib/queries";
import { SpiritsGrid } from "@/components/spirits/SpiritsGrid";

export default async function SpiritsPage() {
  const profile = await getCurrentProfile();
  if (!profile) return null;

  const { tiers } = await getSpiritSummary(profile.id);
  const unlockedCount = tiers.filter((t) => t.unlocked).length;

  return (
    <div className="no-scrollbar flex-1 overflow-y-auto pb-2">
      <div className="mb-1 font-display text-[44px] leading-tight text-paper">Your spirits</div>
      <div className="mb-5 text-base text-[rgba(255,218,185,0.55)]">
        {unlockedCount} of {tiers.length} earned — kept even if a streak breaks.
      </div>
      <SpiritsGrid tiers={tiers} />
    </div>
  );
}
