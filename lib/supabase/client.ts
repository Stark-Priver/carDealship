"use client";

import { createBrowserClient } from "@supabase/ssr";

import { getRequiredEnv } from "@lib/env";
import { Database } from "@lib/supabase/database.types";

export function createClient() {
  return createBrowserClient<Database>(
    getRequiredEnv("NEXT_PUBLIC_SUPABASE_URL"),
    getRequiredEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY")
  );
}
