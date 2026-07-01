import { redirect } from "next/navigation";
import { getCurrentProfileId } from "@/lib/session";

export default function Home() {
  redirect(getCurrentProfileId() ? "/today" : "/picker");
}
