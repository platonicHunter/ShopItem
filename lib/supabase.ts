// lib/supabase.ts
import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = process.env.NODE_ENV === "production"
//   ? "/supabase-api" // Production မှာ Next.js Proxy သုံးမည်
//   : process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
