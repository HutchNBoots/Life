import { getCurrentProfile } from "@/lib/session";
import { getGoalsWithMilestones } from "@/lib/queries";
import { GoalsScreen } from "@/components/goals/GoalsScreen";

export default async function GoalsPage() {
  const profile = await getCurrentProfile();
  if (!profile) return null;

  const goals = await getGoalsWithMilestones(profile.id);

  return <GoalsScreen initialGoals={goals} />;
}
