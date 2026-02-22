import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonPublicKey = import.meta.env.VITE_SUPABASE_ANON_PUBLIC_KEY;

//console.log("Supabase URL:", supabaseUrl);
if (!supabaseUrl || !supabaseAnonPublicKey) {
  throw new Error("Missing Supabase environment variables!");
}


export const supabase = createClient(supabaseUrl, supabaseAnonPublicKey);