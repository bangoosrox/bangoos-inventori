import { supabase } from "./supabase";
import { User } from "./supabase";

export async function signIn(email: string, password: string) {
  console.log("🔐 Login attempt:", { email, hasPassword: !!password });

  if (!supabase) {
    console.error("❌ Supabase not initialized");
    return { data: null, error: new Error("Supabase not initialized") };
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    console.log("🔍 Supabase response:", { data: !!data, error: error?.message });

    if (error) {
      console.error("❌ Login error:", error.message);
    } else {
      console.log("✅ Login successful for:", email);
    }

    return { data, error };
  } catch (err) {
    console.error("❌ Unexpected error:", err);
    return { data: null, error: new Error("Unexpected error during login") };
  }
}

export async function signUp(email: string, password: string, name: string, role: "admin" | "manager" | "employee") {
  if (!supabase) {
    return { data: null, error: new Error("Supabase not initialized") };
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        role,
      },
    },
  });
  return { data, error };
}

export async function signOut() {
  if (!supabase) {
    return { error: new Error("Supabase not initialized") };
  }

  const { error } = await supabase.auth.signOut();
  return { error };
}

export async function getCurrentUser() {
  if (!supabase) {
    return null;
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export async function getUserProfile(userId: string) {
  if (!supabase) {
    return { data: null, error: new Error("Supabase not initialized") };
  }

  const { data, error } = await supabase.from("users").select("*").eq("id", userId).single();
  return { data, error };
}

export async function updateUserRole(userId: string, role: "admin" | "manager" | "employee") {
  if (!supabase) {
    return { data: null, error: new Error("Supabase not initialized") };
  }

  const { data, error } = await supabase.from("users").update({ role }).eq("id", userId);
  return { data, error };
}
