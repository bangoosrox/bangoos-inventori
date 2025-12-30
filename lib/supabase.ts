import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string;
          role: "admin" | "manager" | "employee";
          created_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          name: string;
          role: "admin" | "manager" | "employee";
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string;
          role?: "admin" | "manager" | "employee";
          created_at?: string;
        };
      };
      inventory: {
        Row: {
          id: string;
          name: string;
          description: string;
          quantity: number;
          category: string;
          location: string;
          status: "available" | "low_stock" | "out_of_stock";
          created_by: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description: string;
          quantity: number;
          category: string;
          location: string;
          status?: "available" | "low_stock" | "out_of_stock";
          created_by: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string;
          quantity?: number;
          category?: string;
          location?: string;
          status?: "available" | "low_stock" | "out_of_stock";
          created_by?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
};

export type User = Database["public"]["Tables"]["users"]["Row"];
export type Inventory = Database["public"]["Tables"]["inventory"]["Row"];
