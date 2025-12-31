export default function SimpleAdmin() {
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
                📦 Inventori System
              </h1>
              <p style={{ color: "#BFDBFE" }}>Admin Dashboard - BangOos Solutions</p>
            </div>
            <div
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                borderRadius: "0.5rem",
                padding: "1rem",
                textAlign: "right",
              }}
            >
              <p style={{ color: "white", fontWeight: "500" }}>Admin User</p>
              <p style={{ color: "#BFDBFE", fontSize: "0.875rem" }}>bangoosrox@gmail.com</p>
              <p style={{ color: "#60A5FA", fontSize: "0.875rem", textTransform: "uppercase" }}>admin</p>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
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
              backdropFilter: "blur(8px)",
              borderRadius: "1rem",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              padding: "1.5rem",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>👥</div>
            <h3 style={{ color: "white", marginBottom: "0.5rem" }}>Total Users</h3>
            <p style={{ fontSize: "2rem", fontWeight: "bold", color: "#60A5FA", margin: 0 }}>1</p>
          </div>

          <div
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(8px)",
              borderRadius: "1rem",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              padding: "1.5rem",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>📦</div>
            <h3 style={{ color: "white", marginBottom: "0.5rem" }}>Total Items</h3>
            <p style={{ fontSize: "2rem", fontWeight: "bold", color: "#60A5FA", margin: 0 }}>0</p>
          </div>

          <div
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(8px)",
              borderRadius: "1rem",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              padding: "1.5rem",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>⚠️</div>
            <h3 style={{ color: "white", marginBottom: "0.5rem" }}>Low Stock</h3>
            <p style={{ fontSize: "2rem", fontWeight: "bold", color: "#F87171", margin: 0 }}>0</p>
          </div>
        </div>

        {/* Main Content */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "2rem",
          }}
        >
          {/* Recent Items */}
          <div
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(8px)",
              borderRadius: "1rem",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              padding: "1.5rem",
            }}
          >
            <h3 style={{ color: "white", marginBottom: "1rem" }}>📋 Recent Inventory Items</h3>
            <div style={{ color: "#BFDBFE", textAlign: "center", padding: "2rem" }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📦</div>
              <p>No inventory items yet</p>
              <p style={{ fontSize: "0.875rem", marginTop: "0.5rem" }}>Start by adding your first item</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(8px)",
              borderRadius: "1rem",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              padding: "1.5rem",
            }}
          >
            <h3 style={{ color: "white", marginBottom: "1rem" }}>⚡ Quick Actions</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <a
                href="/admin/items"
                style={{
                  backgroundColor: "white",
                  color: "#2563eb",
                  padding: "0.75rem",
                  borderRadius: "0.5rem",
                  textDecoration: "none",
                  cursor: "pointer",
                  fontWeight: "500",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                ➕ Add New Item
              </a>
              <a
                href="/admin/users"
                style={{
                  backgroundColor: "white",
                  color: "#2563eb",
                  padding: "0.75rem",
                  borderRadius: "0.5rem",
                  textDecoration: "none",
                  cursor: "pointer",
                  fontWeight: "500",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                👤 Add User
              </a>
              <button
                style={{
                  backgroundColor: "white",
                  color: "#2563eb",
                  padding: "0.75rem",
                  borderRadius: "0.5rem",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: "500",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                📊 View Reports
              </button>
              <a
                href="/"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  color: "white",
                  padding: "0.75rem",
                  borderRadius: "0.5rem",
                  textDecoration: "none",
                  cursor: "pointer",
                  fontWeight: "500",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                🏠 Back to Login
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
