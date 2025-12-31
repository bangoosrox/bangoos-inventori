import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { getUserProfile } from "@/lib/auth";

export default async function AdminDashboard() {
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
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(8px)",
          borderRadius: "1rem",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          padding: "2rem",
        }}
      >
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            color: "white",
            marginBottom: "1rem",
          }}
        >
          Admin Dashboard
        </h1>

        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            borderRadius: "0.5rem",
            padding: "1rem",
            marginBottom: "1rem",
          }}
        >
          <h2 style={{ color: "white", marginBottom: "0.5rem" }}>Welcome, {profile.name}!</h2>
          <p style={{ color: "#BFDBFE", marginBottom: "0.5rem" }}>Email: {profile.email}</p>
          <p style={{ color: "#BFDBFE", marginBottom: "0.5rem" }}>Role: {profile.role}</p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "1rem",
            marginBottom: "2rem",
          }}
        >
          <div
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              borderRadius: "0.5rem",
              padding: "1.5rem",
              textAlign: "center",
            }}
          >
            <h3 style={{ color: "white", marginBottom: "0.5rem" }}>Total Users</h3>
            <p style={{ fontSize: "2rem", fontWeight: "bold", color: "#60A5FA", margin: 0 }}>0</p>
          </div>

          <div
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              borderRadius: "0.5rem",
              padding: "1.5rem",
              textAlign: "center",
            }}
          >
            <h3 style={{ color: "white", marginBottom: "0.5rem" }}>Total Items</h3>
            <p style={{ fontSize: "2rem", fontWeight: "bold", color: "#60A5FA", margin: 0 }}>0</p>
          </div>

          <div
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              borderRadius: "0.5rem",
              padding: "1.5rem",
              textAlign: "center",
            }}
          >
            <h3 style={{ color: "white", marginBottom: "0.5rem" }}>Low Stock</h3>
            <p style={{ fontSize: "2rem", fontWeight: "bold", color: "#F87171", margin: 0 }}>0</p>
          </div>
        </div>

        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            borderRadius: "0.5rem",
            padding: "1rem",
          }}
        >
          <h3 style={{ color: "white", marginBottom: "1rem" }}>Quick Actions</h3>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <button
              style={{
                backgroundColor: "white",
                color: "#2563eb",
                padding: "0.5rem 1rem",
                borderRadius: "0.5rem",
                border: "none",
                cursor: "pointer",
                fontWeight: "500",
              }}
            >
              Add User
            </button>
            <button
              style={{
                backgroundColor: "white",
                color: "#2563eb",
                padding: "0.5rem 1rem",
                borderRadius: "0.5rem",
                border: "none",
                cursor: "pointer",
                fontWeight: "500",
              }}
            >
              Add Item
            </button>
            <button
              style={{
                backgroundColor: "white",
                color: "#2563eb",
                padding: "0.5rem 1rem",
                borderRadius: "0.5rem",
                border: "none",
                cursor: "pointer",
                fontWeight: "500",
              }}
            >
              View Reports
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
