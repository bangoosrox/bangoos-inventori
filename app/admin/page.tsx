import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { getUserProfile } from "@/lib/auth";

export default async function AdminPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/");
  }

  const { data: profile } = await getUserProfile(user.id);

  if (!profile || profile.role !== "admin") {
    redirect("/");
  }

  // Redirect to dashboard
  redirect("/admin/dashboard");
}
