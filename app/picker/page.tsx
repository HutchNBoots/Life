import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentProfileId } from "@/lib/session";
import { PickerScreen } from "@/components/picker/PickerScreen";

export default async function PickerPage() {
  if (getCurrentProfileId()) redirect("/today");

  const profiles = await prisma.profile.findMany({
    orderBy: { sortOrder: "asc" },
    select: { id: true, name: true },
  });

  return <PickerScreen profiles={profiles} />;
}
