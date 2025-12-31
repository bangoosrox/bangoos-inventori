import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";

export default async function AdminPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/");
  }

  // Temporarily allow any logged-in user to access admin
  // TODO: Add proper role validation after user profiles are created

  // Redirect to dashboard
  redirect("/admin/dashboard");
}
