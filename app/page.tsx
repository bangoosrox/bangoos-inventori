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
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo/Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-md rounded-2xl mb-4 border border-white/20">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Inventori System</h1>
          <p className="text-blue-100 text-lg">BangOos Solutions</p>
          <p className="text-blue-200 text-sm mt-2">Sistem Manajemen Inventori Modern</p>
        </div>

        {/* Login Card */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl">
          <div className="p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold text-white mb-2">Selamat Datang</h2>
              <p className="text-blue-100">Masuk ke sistem inventori</p>
            </div>
            <LoginForm />
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-blue-200 text-sm">
            Powered by <span className="text-white font-semibold">BangOos</span>
          </p>
        </div>
      </div>
    </div>
  );
}

async function getUserProfile(userId: string) {
  const { supabase } = await import("@/lib/supabase");

  if (!supabase) {
    return { data: null, error: new Error("Supabase not initialized") };
  }

  const { data, error } = await supabase.from("users").select("*").eq("id", userId).single();
  return { data, error };
}
