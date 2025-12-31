import { supabase } from "./supabase";
import { User } from "./supabase";

export async function signIn(email: string, password: string) {
  if (!supabase) {
    return { data: null, error: new Error("Supabase not initialized") };
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
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
