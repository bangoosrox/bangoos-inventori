"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
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

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-white text-sm font-medium">
            Email
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-blue-200" />
            <Input
              id="email"
              type="email"
              placeholder="nama@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="pl-10 bg-white/10 border-white/20 text-white placeholder-blue-200 focus:border-white/40 focus:ring-white/20"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-white text-sm font-medium">
            Password
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-blue-200" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder-blue-200 focus:border-white/40 focus:ring-white/20"
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-blue-200 hover:text-white transition-colors">
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>

      {error && (
        <Alert className="bg-red-500/20 border-red-500/30">
          <AlertDescription className="text-red-100">{error}</AlertDescription>
        </Alert>
      )}

      <Button type="submit" className="w-full bg-white text-blue-600 hover:bg-blue-50 font-semibold py-3 rounded-xl transition-all transform hover:scale-[1.02] shadow-lg" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Masuk...
          </>
        ) : (
          <>
            <LogIn className="mr-2 h-4 w-4" />
            Masuk
          </>
        )}
      </Button>

      <div className="text-center">
        <p className="text-blue-200 text-sm">
          Belum punya akun? <button className="text-white hover:text-blue-100 underline transition-colors">Hubungi Admin</button>
        </p>
      </div>
    </form>
  );
}
