import { createClient, SupabaseClient } from "@supabase/supabase-js";

export type UUID = string;

export type Todo = {
  id: UUID;
  user_id: UUID;
  text: string;
  done: boolean;
  inserted_at: string;
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase: SupabaseClient = createClient(
  supabaseUrl,
  supabaseAnonKey,
);
