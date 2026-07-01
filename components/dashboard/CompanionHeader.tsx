import Link from "next/link";
import { SpiritIcon } from "@/components/spirits/SpiritIcon";

export function CompanionHeader({
  profileName,
  companionName,
  companionCopy,
}: {
  profileName: string;
  companionName: string | null;
  companionCopy: string;
}) {
  return (
    <Link href="/spirits" className="mb-[18px] flex items-center gap-3.5">
      <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-paper">
        {companionName && <SpiritIcon name={companionName} className="h-[52px] w-[52px]" />}
      </div>
      <div>
        <div className="mb-[3px] font-display text-[44px] leading-tight text-paper">{profileName}</div>
        <div className="font-mono text-base text-[rgba(255,218,185,0.55)]">
          {companionName && <span className="text-ember">{companionName}</span>}
          {companionName && " · "}
          {companionCopy}
        </div>
      </div>
    </Link>
  );
}
