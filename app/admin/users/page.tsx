import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { getUserProfile } from "@/lib/auth";

export default async function AdminUsers() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/");
  }

  const { data: profile } = await getUserProfile(user.id);

  if (!profile || profile.role !== "admin") {
    redirect("/");
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 50%, #4f46e5 100%)",
        padding: "2rem",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* Header */}
        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(8px)",
            borderRadius: "1rem",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            padding: "2rem",
            marginBottom: "2rem",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <h1
                style={{
                  fontSize: "2rem",
                  fontWeight: "bold",
                  color: "white",
                  marginBottom: "0.5rem",
                }}
              >
                👥 User Management
              </h1>
              <p style={{ color: "#BFDBFE" }}>Manage system users and roles</p>
            </div>
            <button
              style={{
                backgroundColor: "white",
                color: "#2563eb",
                padding: "0.75rem 1.5rem",
                borderRadius: "0.5rem",
                border: "none",
                cursor: "pointer",
                fontWeight: "500",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              ➕ Add New User
            </button>
          </div>
        </div>

        {/* Users Table */}
        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(8px)",
            borderRadius: "1rem",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            padding: "1.5rem",
          }}
        >
          <div style={{ color: "#BFDBFE", textAlign: "center", padding: "3rem" }}>
            <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>👥</div>
            <h3 style={{ color: "white", marginBottom: "0.5rem" }}>No Users Found</h3>
            <p>Invite team members to manage inventory</p>
            <button
              style={{
                backgroundColor: "white",
                color: "#2563eb",
                padding: "0.75rem 1.5rem",
                borderRadius: "0.5rem",
                border: "none",
                cursor: "pointer",
                fontWeight: "500",
                marginTop: "1rem",
              }}
            >
              Invite First User
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
