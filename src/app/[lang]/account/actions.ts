"use server";

import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import type { Locale } from "@/lib/types";

function localeFrom(formData: FormData): Locale {
  return String(formData.get("locale")) === "en" ? "en" : "zh";
}

export async function deleteAccount(formData: FormData) {
  const locale = localeFrom(formData);
  const confirmation = String(formData.get("confirmation") ?? "").trim();
  const expected = locale === "zh" ? "删除账户" : "DELETE";
  if (confirmation !== expected) redirect(`/${locale}/account?deleteError=confirmation`);

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect(`/${locale}/sign-in`);

  const admin = createAdminClient();
  if (!admin) redirect(`/${locale}/account?deleteError=unavailable`);

  const avatarPath = `${user.id}/avatar`;
  const { error: storageError } = await admin.storage.from("avatars").remove([avatarPath]);
  if (storageError && !storageError.message.toLowerCase().includes("not found")) {
    console.warn(JSON.stringify({ event: "account_deletion_avatar_failed" }));
    redirect(`/${locale}/account?deleteError=storage`);
  }

  const { error: deleteError } = await admin.auth.admin.deleteUser(user.id);
  if (deleteError) {
    console.error(JSON.stringify({ event: "account_deletion_failed" }));
    redirect(`/${locale}/account?deleteError=account`);
  }
  await supabase.auth.signOut({ scope: "local" });
  redirect(`/${locale}?accountDeleted=1`);
}
