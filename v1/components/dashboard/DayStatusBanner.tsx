import Link from "next/link";
import { TallyCluster } from "@/components/ledger/TallyCluster";

export function DayStatusBanner({ dayComplete }: { dayComplete: boolean }) {
  if (dayComplete) {
    return (
      <div className="mb-[22px] flex items-center gap-3 rounded-[10px] border border-ember bg-ember/[0.12] px-4 py-3">
        <TallyCluster filledCount={5} size={26} />
        <div className="font-mono text-base text-paper">Today&rsquo;s logged.</div>
      </div>
    );
  }

  return (
    <Link
      href="/today"
      className="mb-[22px] block w-full rounded-[10px] bg-ember px-3.5 py-3.5 text-center text-base font-semibold text-dusk"
    >
      Log today →
    </Link>
  );
}
