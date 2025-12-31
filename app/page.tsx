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
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 50%, #4f46e5 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.2)",
          backdropFilter: "blur(4px)",
        }}
      ></div>

      <div
        style={{
          width: "100%",
          maxWidth: "28rem",
          position: "relative",
          zIndex: 10,
        }}
      >
        {/* Logo/Branding */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "5rem",
              height: "5rem",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(8px)",
              borderRadius: "1rem",
              marginBottom: "1rem",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            <svg style={{ width: "2.5rem", height: "2.5rem", color: "white" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <h1 style={{ fontSize: "2.25rem", fontWeight: "bold", color: "white", marginBottom: "0.5rem" }}>Inventori System</h1>
          <p style={{ color: "#BFDBFE", fontSize: "1.125rem" }}>BangOos Solutions</p>
          <p style={{ color: "#93C5FD", fontSize: "0.875rem", marginTop: "0.5rem" }}>Sistem Manajemen Inventori Modern</p>
        </div>

        {/* Login Card */}
        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(8px)",
            borderRadius: "1rem",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          }}
        >
          <div style={{ padding: "2rem" }}>
            <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
              <h2 style={{ fontSize: "1.5rem", fontWeight: "600", color: "white", marginBottom: "0.5rem" }}>Selamat Datang</h2>
              <p style={{ color: "#BFDBFE" }}>Masuk ke sistem inventori</p>
            </div>
            <LoginForm />
          </div>
        </div>

        {/* Footer */}
        <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
          <p style={{ color: "#93C5FD", fontSize: "0.875rem" }}>
            Powered by <span style={{ color: "white", fontWeight: "600" }}>BangOos</span>
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
