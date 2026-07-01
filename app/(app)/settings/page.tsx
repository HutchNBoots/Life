import { getCurrentProfile } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { SettingsScreen } from "@/components/settings/SettingsScreen";

export default async function SettingsPage() {
  const profile = await getCurrentProfile();
  if (!profile) return null;

  const goals = await prisma.binaryGoal.findMany({
    where: { profileId: profile.id, active: true },
    orderBy: { sortOrder: "asc" },
    select: { id: true, label: true },
  });

  return <SettingsScreen profileName={profile.name} goals={goals} />;
}
