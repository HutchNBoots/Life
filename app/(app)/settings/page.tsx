import { getCurrentProfile } from "@/lib/session";
import { SettingsScreen } from "@/components/settings/SettingsScreen";
import packageJson from "@/package.json";

export default async function SettingsPage() {
  const profile = await getCurrentProfile();
  if (!profile) return null;

  return <SettingsScreen profileName={profile.name} version={packageJson.version} />;
}
