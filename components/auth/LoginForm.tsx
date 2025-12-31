"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, LogIn, Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("📝 Form submitted:", { email, hasPassword: !!password });

    setLoading(true);
    setError("");

    try {
      console.log("🔄 Calling signIn function...");
      const { signIn } = await import("@/lib/auth");
      const { error } = await signIn(email, password);

      console.log("📊 Login result:", { error: error?.message });

      if (error) {
        console.error("❌ Setting error message:", error.message);
        setError(error.message);
      } else {
        console.log("✅ Login successful, redirecting to /admin...");

        // Try direct redirect first
        window.location.href = "/admin";

        // Fallback: if redirect fails, show manual link
        setTimeout(() => {
          console.log("🔄 Checking if redirect worked...");
          if (window.location.pathname === "/") {
            console.log("⚠️ Redirect failed, showing manual link");
            setError("Login successful! Click here to go to dashboard: <a href='/admin' style='color: white; text-decoration: underline;'>Go to Admin Dashboard</a>");
          }
        }, 2000);
      }
    } catch (err) {
      console.error("💥 Unexpected error in handleSubmit:", err);
      setError("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setLoading(false);
      console.log("🏁 Form submission completed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: "1.5rem" }}>
        <div style={{ marginBottom: "1rem" }}>
          <label
            htmlFor="email"
            style={{
              display: "block",
              color: "white",
              fontSize: "0.875rem",
              fontWeight: "500",
              marginBottom: "0.5rem",
            }}
          >
            Email
          </label>
          <div style={{ position: "relative" }}>
            <Mail
              style={{
                position: "absolute",
                left: "0.75rem",
                top: "0.75rem",
                width: "1rem",
                height: "1rem",
                color: "#BFDBFE",
                zIndex: 1,
              }}
            />
            <input
              id="email"
              type="email"
              placeholder="nama@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "0.75rem",
                paddingLeft: "2.5rem",
                backgroundColor: "rgba(255, 255, 255, 0.15)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                borderRadius: "0.5rem",
                color: "white",
                fontSize: "0.875rem",
                outline: "none",
                boxSizing: "border-box",
                transition: "all 0.2s",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "rgba(255, 255, 255, 0.5)";
                e.target.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "rgba(255, 255, 255, 0.3)";
                e.target.style.backgroundColor = "rgba(255, 255, 255, 0.15)";
              }}
            />
          </div>
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label
            htmlFor="password"
            style={{
              display: "block",
              color: "white",
              fontSize: "0.875rem",
              fontWeight: "500",
              marginBottom: "0.5rem",
            }}
          >
            Password
          </label>
          <div style={{ position: "relative" }}>
            <Lock
              style={{
                position: "absolute",
                left: "0.75rem",
                top: "0.75rem",
                width: "1rem",
                height: "1rem",
                color: "#BFDBFE",
                zIndex: 1,
              }}
            />
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "0.75rem",
                paddingLeft: "2.5rem",
                paddingRight: "2.5rem",
                backgroundColor: "rgba(255, 255, 255, 0.15)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                borderRadius: "0.5rem",
                color: "white",
                fontSize: "0.875rem",
                outline: "none",
                boxSizing: "border-box",
                transition: "all 0.2s",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "rgba(255, 255, 255, 0.5)";
                e.target.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "rgba(255, 255, 255, 0.3)";
                e.target.style.backgroundColor = "rgba(255, 255, 255, 0.15)";
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "0.75rem",
                top: "0.75rem",
                background: "none",
                border: "none",
                color: "#BFDBFE",
                cursor: "pointer",
                padding: "0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.color = "white";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.color = "#BFDBFE";
              }}
            >
              {showPassword ? <EyeOff style={{ width: "1rem", height: "1rem" }} /> : <Eye style={{ width: "1rem", height: "1rem" }} />}
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div
          style={{
            backgroundColor: "rgba(239, 68, 68, 0.2)",
            border: "1px solid rgba(239, 68, 68, 0.3)",
            borderRadius: "0.5rem",
            padding: "0.75rem",
            marginBottom: "1.5rem",
          }}
        >
          <p
            style={{
              color: "#FCA5A5",
              fontSize: "0.875rem",
              margin: 0,
            }}
          >
            {error}
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        style={{
          width: "100%",
          backgroundColor: "white",
          color: "#2563eb",
          fontWeight: "600",
          padding: "0.75rem 1rem",
          borderRadius: "0.75rem",
          border: "none",
          cursor: loading ? "not-allowed" : "pointer",
          fontSize: "0.875rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.5rem",
          transition: "all 0.2s",
          opacity: loading ? 0.5 : 1,
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        }}
        onMouseOver={(e) => {
          if (!loading) {
            e.currentTarget.style.backgroundColor = "#F0F9FF";
            e.currentTarget.style.transform = "translateY(-1px)";
            e.currentTarget.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1)";
          }
        }}
        onMouseOut={(e) => {
          if (!loading) {
            e.currentTarget.style.backgroundColor = "white";
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1)";
          }
        }}
      >
        {loading ? (
          <>
            <Loader2 style={{ width: "1rem", height: "1rem", animation: "spin 1s linear infinite" }} />
            Masuk...
          </>
        ) : (
          <>
            <LogIn style={{ width: "1rem", height: "1rem" }} />
            Masuk
          </>
        )}
      </button>

      <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
        <p style={{ color: "#BFDBFE", fontSize: "0.875rem" }}>
          Belum punya akun?{" "}
          <button
            type="button"
            style={{
              background: "none",
              border: "none",
              color: "white",
              textDecoration: "underline",
              cursor: "pointer",
              fontSize: "0.875rem",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.color = "#DBEAFE";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.color = "white";
            }}
          >
            Hubungi Admin
          </button>
        </p>
      </div>
    </form>
  );
}
