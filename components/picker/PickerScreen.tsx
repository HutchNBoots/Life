"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function PickerScreen({ profiles }: { profiles: { id: string; name: string }[] }) {
  const router = useRouter();
  const [pending, setPending] = useState<string | null>(null);

  async function selectProfile(profileId: string) {
    setPending(profileId);
    const res = await fetch("/api/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ profileId }),
    });
    if (res.ok) {
      router.push("/today");
      router.refresh();
    } else {
      setPending(null);
    }
  }

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[400px] flex-col px-4 pt-1">
      <div className="relative mb-6 overflow-hidden rounded-card leading-none">
        <Image src="/splash.jpg" alt="" width={1344} height={784} priority className="block w-full" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(36,52,61,0) 55%, #24343D 100%)" }}
        />
      </div>

      <div className="mb-1.5 text-center">
        <span className="font-display text-[40px] text-ember">Life</span>
      </div>
      <div className="mb-4 text-center font-display text-[13px] italic text-[rgba(255,218,185,0.5)]">
        capture the small joys of the day
      </div>
      <div className="mb-7 text-center text-sm text-[rgba(255,218,185,0.6)]">Who&rsquo;s living today?</div>

      {profiles.map((profile) => (
        <button
          key={profile.id}
          type="button"
          disabled={pending !== null}
          onClick={() => selectProfile(profile.id)}
          className="mb-2.5 flex w-full items-center justify-between rounded-card border border-[rgba(255,218,185,0.14)] bg-dusk-raised px-5 py-[18px] text-left font-display text-[19px] text-paper active:border-ember disabled:opacity-60"
        >
          {profile.name} <span className="font-sans text-ember">→</span>
        </button>
      ))}
    </div>
  );
}
