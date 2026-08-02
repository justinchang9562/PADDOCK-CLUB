import { createBrowserClient } from "@supabase/ssr";
import { supabaseConfig } from "./config";
import type { Database } from "./database.types";

export function createClient() {
  const { url, publishableKey } = supabaseConfig();
  return createBrowserClient<Database>(url, publishableKey);
}
