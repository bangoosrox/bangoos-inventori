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
    setLoading(true);
    setError("");

    try {
      const { signIn } = await import("@/lib/auth");
      const { error } = await signIn(email, password);

      if (error) {
        setError("Email atau password salah");
      } else {
        router.refresh();
      }
    } catch (err) {
      setError("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderColor: "rgba(255, 255, 255, 0.2)",
    color: "white",
    paddingLeft: "2.5rem",
    paddingRight: "2.5rem",
  };

  const buttonStyle = {
    backgroundColor: "white",
    color: "#2563eb",
    fontWeight: "600",
    padding: "0.75rem 1rem",
    borderRadius: "0.75rem",
    border: "none",
    cursor: "pointer",
    transition: "all 0.2s",
    width: "100%",
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <label htmlFor="email" style={{ color: "white", fontSize: "0.875rem", fontWeight: "500" }}>
            Email
          </label>
          <div style={{ position: "relative" }}>
            <Mail className="absolute left-3 top-3 h-4 w-4" style={{ color: "#BFDBFE" }} />
            <input
              id="email"
              type="email"
              placeholder="nama@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                ...inputStyle,
                width: "100%",
                padding: "0.5rem 0.75rem 0.5rem 2.5rem",
                borderRadius: "0.375rem",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                fontSize: "0.875rem",
                outline: "none",
              }}
            />
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <label htmlFor="password" style={{ color: "white", fontSize: "0.875rem", fontWeight: "500" }}>
            Password
          </label>
          <div style={{ position: "relative" }}>
            <Lock className="absolute left-3 top-3 h-4 w-4" style={{ color: "#BFDBFE" }} />
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                ...inputStyle,
                width: "100%",
                padding: "0.5rem 2.5rem 0.5rem 2.5rem",
                borderRadius: "0.375rem",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                fontSize: "0.875rem",
                outline: "none",
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
              }}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div
          style={{
            backgroundColor: "rgba(239, 68, 68, 0.2)",
            borderColor: "rgba(239, 68, 68, 0.3)",
            borderWidth: "1px",
            borderRadius: "0.5rem",
            padding: "1rem",
          }}
        >
          <p style={{ color: "#FCA5A5", fontSize: "0.875rem" }}>{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        style={{
          ...buttonStyle,
          opacity: loading ? 0.5 : 1,
          cursor: loading ? "not-allowed" : "pointer",
        }}
        onMouseOver={(e) => {
          if (!loading) {
            e.currentTarget.style.backgroundColor = "#EFF6FF";
            e.currentTarget.style.transform = "scale(1.02)";
          }
        }}
        onMouseOut={(e) => {
          if (!loading) {
            e.currentTarget.style.backgroundColor = "white";
            e.currentTarget.style.transform = "scale(1)";
          }
        }}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" style={{ display: "inline-block", marginRight: "0.5rem" }} />
            Masuk...
          </>
        ) : (
          <>
            <LogIn className="mr-2 h-4 w-4" style={{ display: "inline-block", marginRight: "0.5rem" }} />
            Masuk
          </>
        )}
      </button>

      <div style={{ textAlign: "center" }}>
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
