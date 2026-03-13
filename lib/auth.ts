import { redirect } from "next/navigation";

import { AppRole } from "@lib/supabase/database.types";
import { createClient } from "@lib/supabase/server";

export interface AppSession {
  userId: string;
  email: string | null;
  role: AppRole;
  fullName: string | null;
}

export async function getAppSession(): Promise<AppSession | null> {
  const supabase = createClient();
  const { data: authData } = await supabase.auth.getUser();
  const user = authData.user;

  if (!user) {
    return null;
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role, full_name")
    .eq("id", user.id)
    .maybeSingle();

  return {
    userId: user.id,
    email: user.email ?? null,
    role: profile?.role ?? "BUYER",
    fullName: profile?.full_name ?? null,
  };
}

export async function requireAppSession(): Promise<AppSession> {
  const session = await getAppSession();
  if (!session) {
    redirect("/auth/login?next=/dashboard");
  }
  return session;
}

export async function requireAnyRole(roles: AppRole[]): Promise<AppSession> {
  const session = await requireAppSession();
  if (!roles.includes(session.role)) {
    redirect("/");
  }
  return session;
}
