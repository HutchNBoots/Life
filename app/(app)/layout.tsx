import { redirect } from "next/navigation";
import { getCurrentProfile } from "@/lib/session";
import { BottomNav } from "@/components/nav/BottomNav";

export default async function AppShellLayout({ children }: { children: React.ReactNode }) {
  const profile = await getCurrentProfile();
  if (!profile) redirect("/picker");

  return (
    <div className="mx-auto flex h-screen w-full max-w-[400px] flex-col px-4 pb-[90px] pt-[22px]">
      <main className="flex min-h-0 flex-1 flex-col">{children}</main>
      <BottomNav />
    </div>
  );
}
