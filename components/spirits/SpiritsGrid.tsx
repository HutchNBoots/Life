import { SpiritIcon } from "./SpiritIcon";
import type { SpiritTierState } from "@/lib/queries";

export function SpiritsGrid({ tiers }: { tiers: SpiritTierState[] }) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {tiers.map((tier) => (
        <div key={tier.id} className="flex flex-col items-center gap-2">
          {tier.unlocked ? (
            <>
              <div className="flex aspect-square w-full items-center justify-center rounded-full bg-paper">
                <SpiritIcon name={tier.name} className="h-[60%] w-[60%]" />
              </div>
              <div className="text-center text-base leading-[1.3] text-[rgba(255,218,185,0.7)]">{tier.name}</div>
            </>
          ) : (
            <>
              <div className="aspect-square w-full rounded-full border-[1.5px] border-dashed border-[rgba(255,218,185,0.14)]" />
              <div className="text-center text-base leading-[1.3] text-[rgba(255,218,185,0.25)]">Day {tier.day}</div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
