"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { GoalEditRow } from "./GoalEditRow";
import { PrefToggle } from "./PrefToggle";
import { getMotionPref, setMotionPref, getHapticsPref, setHapticsPref } from "@/lib/preferences";

export function SettingsScreen({
  profileName,
  goals,
}: {
  profileName: string;
  goals: { id: string; label: string }[];
}) {
  const router = useRouter();
  const [fullMotion, setFullMotion] = useState(true);
  const [hapticsOn, setHapticsOn] = useState(true);

  useEffect(() => {
    setFullMotion(getMotionPref() === "full");
    setHapticsOn(getHapticsPref() === "on");
  }, []);

  async function switchProfile() {
    await fetch("/api/session", { method: "DELETE" });
    router.push("/picker");
    router.refresh();
  }

  return (
    <div className="flex-1 overflow-y-auto pb-2">
      <div className="mb-1 font-display text-[22px] text-paper">Settings</div>
      <div className="mb-5 text-xs text-[rgba(255,218,185,0.55)]">Signed in as {profileName}</div>

      <div className="mb-6">
        <div className="mb-2.5 text-[11px] uppercase tracking-[.09em] text-[rgba(255,218,185,0.5)]">Your goals</div>
        {goals.map((goal) => (
          <GoalEditRow key={goal.id} id={goal.id} label={goal.label} />
        ))}
      </div>

      <div className="mb-6">
        <div className="mb-2.5 text-[11px] uppercase tracking-[.09em] text-[rgba(255,218,185,0.5)]">Motion & haptics</div>
        <div className="mb-2 flex items-center justify-between rounded-[10px] border border-[rgba(255,218,185,0.14)] bg-dusk-raised px-4 py-3.5">
          <div>
            <div className="text-sm text-paper">Full motion</div>
            <div className="mt-0.5 text-[11px] text-[rgba(255,218,185,0.45)]">Tally strokes and stamp animation</div>
          </div>
          <PrefToggle
            on={fullMotion}
            onToggle={(next) => {
              setFullMotion(next);
              setMotionPref(next ? "full" : "reduced");
            }}
          />
        </div>
        <div className="mb-2 flex items-center justify-between rounded-[10px] border border-[rgba(255,218,185,0.14)] bg-dusk-raised px-4 py-3.5">
          <div>
            <div className="text-sm text-paper">Haptics</div>
            <div className="mt-0.5 text-[11px] text-[rgba(255,218,185,0.45)]">Short pulse on save</div>
          </div>
          <PrefToggle
            on={hapticsOn}
            onToggle={(next) => {
              setHapticsOn(next);
              setHapticsPref(next ? "on" : "off");
            }}
          />
        </div>
      </div>

      <div className="mb-6">
        <div className="mb-2.5 text-[11px] uppercase tracking-[.09em] text-[rgba(255,218,185,0.5)]">Device</div>
        <button
          type="button"
          onClick={switchProfile}
          className="w-full rounded-[10px] border border-[rgba(255,218,185,0.14)] bg-transparent py-3.5 text-center text-[13px] text-[rgba(255,218,185,0.7)]"
        >
          Switch profile
        </button>
      </div>
    </div>
  );
}
