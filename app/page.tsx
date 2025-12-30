import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import LoginForm from "@/components/auth/LoginForm";

export default async function Home() {
  const user = await getCurrentUser();

  if (user) {
    const { data: profile } = await getUserProfile(user.id);
    if (profile) {
      switch (profile.role) {
        case "admin":
          redirect("/admin");
        case "manager":
          redirect("/manager");
        case "employee":
          redirect("/employee");
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Inventori System</h1>
          <p className="text-gray-600">BangOos Solutions</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}

async function getUserProfile(userId: string) {
  const { supabase } = await import("@/lib/supabase");
  const { data, error } = await supabase.from("users").select("*").eq("id", userId).single();
  return { data, error };
}
