"use client";

import { useState } from "react";
import { SpiritIcon } from "./SpiritIcon";
import { BadgeInfoModal, type BadgeInfo } from "@/components/BadgeInfoModal";
import { SPIRIT_DESCRIPTIONS } from "@/lib/spiritContent";
import type { SpiritTierState } from "@/lib/queries";

export function SpiritsGrid({ tiers }: { tiers: SpiritTierState[] }) {
  const [selected, setSelected] = useState<BadgeInfo | null>(null);

  function open(tier: SpiritTierState) {
    setSelected({
      icon: <SpiritIcon name={tier.name} className="h-[74%] w-[74%]" />,
      title: tier.name,
      body: SPIRIT_DESCRIPTIONS[tier.name] ?? `Unlocked at a ${tier.day}-day streak.`,
    });
  }

  return (
    <>
      <div className="grid grid-cols-3 gap-3">
        {tiers.map((tier) =>
          tier.unlocked ? (
            <button key={tier.id} type="button" onClick={() => open(tier)} className="flex flex-col items-center gap-2">
              <div className="flex aspect-square w-full items-center justify-center rounded-full bg-paper">
                <SpiritIcon name={tier.name} className="h-[60%] w-[60%]" />
              </div>
              <div className="text-center text-base leading-[1.3] text-[rgba(255,218,185,0.7)]">{tier.name}</div>
            </button>
          ) : (
            <div key={tier.id} className="flex flex-col items-center gap-2">
              <div className="aspect-square w-full rounded-full border-[1.5px] border-dashed border-[rgba(255,218,185,0.14)]" />
              <div className="text-center text-base leading-[1.3] text-[rgba(255,218,185,0.25)]">Day {tier.day}</div>
            </div>
          ),
        )}
      </div>
      <BadgeInfoModal info={selected} onDismiss={() => setSelected(null)} />
    </>
  );
}
