// // lib/supabase.ts
// import { createClient } from "@supabase/supabase-js";

// // const supabaseUrl = process.env.NODE_ENV === "production"
// //   ? "/supabase-api" // Production မှာ Next.js Proxy သုံးမည်
// //   : process.env.NEXT_PUBLIC_SUPABASE_URL!;
// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Supabase မသုံးတော့ဘဲ Vercel Postgres သို့ ပြောင်းထားသဖြင့် Build Error အဟန့်အတား မဖြစ်စေရန် Dummy Export လုပ်ထားခြင်းဖြစ်ပါသည်။
export const supabase = null as any;
