import { cookies } from "next/headers";
import { prisma } from "./prisma";

/**
 * No real auth (see ready_CLAUDE.md non-negotiable #1) — this cookie just
 * remembers which of the 3 fixed profiles this device last picked. Every
 * query elsewhere must be scoped by the profile id this resolves to
 * (non-negotiable #9).
 */
export const PROFILE_COOKIE = "life_profile_id";

export function getCurrentProfileId(): string | null {
  return cookies().get(PROFILE_COOKIE)?.value ?? null;
}

export async function getCurrentProfile() {
  const id = getCurrentProfileId();
  if (!id) return null;
  return prisma.profile.findUnique({ where: { id } });
}
