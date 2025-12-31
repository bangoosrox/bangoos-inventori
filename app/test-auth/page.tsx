import { getCurrentUser } from "@/lib/auth";
import { supabase } from "@/lib/supabase";

export default async function TestAuthPage() {
  console.log("🔍 Test auth page loading...");

  const user = await getCurrentUser();
  console.log("👤 User result:", { user: !!user, userId: user?.id, email: user?.email });

  const { supabase: sb } = await import("@/lib/supabase");
  console.log("🗄️ Supabase client:", { supabase: !!sb });

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 50%, #4f46e5 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(8px)",
          borderRadius: "1rem",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          padding: "2rem",
          maxWidth: "600px",
          width: "100%",
        }}
      >
        <h1 style={{ color: "white", marginBottom: "1rem" }}>🔍 Authentication Debug</h1>

        <div style={{ backgroundColor: "rgba(255, 255, 255, 0.1)", borderRadius: "0.5rem", padding: "1rem", marginBottom: "1rem" }}>
          <h3 style={{ color: "white", marginBottom: "0.5rem" }}>Current User Status:</h3>
          <p style={{ color: "#BFDBFE", margin: "0.5rem 0" }}>Logged In: {user ? "✅ Yes" : "❌ No"}</p>
          {user && (
            <>
              <p style={{ color: "#BFDBFE", margin: "0.5rem 0" }}>ID: {user.id}</p>
              <p style={{ color: "#BFDBFE", margin: "0.5rem 0" }}>Email: {user.email}</p>
            </>
          )}
        </div>

        <div style={{ backgroundColor: "rgba(255, 255, 255, 0.1)", borderRadius: "0.5rem", padding: "1rem", marginBottom: "1rem" }}>
          <h3 style={{ color: "white", marginBottom: "0.5rem" }}>Supabase Client:</h3>
          <p style={{ color: "#BFDBFE", margin: "0.5rem 0" }}>Available: {sb ? "✅ Yes" : "❌ No"}</p>
        </div>

        <div style={{ display: "flex", gap: "1rem", flexDirection: "column" }}>
          <a
            href="/"
            style={{
              backgroundColor: "white",
              color: "#2563eb",
              padding: "0.75rem",
              borderRadius: "0.5rem",
              textDecoration: "none",
              textAlign: "center",
              fontWeight: "500",
            }}
          >
            🏠 Back to Login
          </a>

          {user && (
            <a
              href="/admin"
              style={{
                backgroundColor: "white",
                color: "#2563eb",
                padding: "0.75rem",
                borderRadius: "0.5rem",
                textDecoration: "none",
                textAlign: "center",
                fontWeight: "500",
              }}
            >
              ⚡ Go to Admin Dashboard
            </a>
          )}
        </div>

        <div style={{ marginTop: "1rem", fontSize: "0.875rem", color: "#BFDBFE" }}>
          <p>Check browser console for detailed debug logs</p>
        </div>
      </div>
    </div>
  );
}
