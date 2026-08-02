import { notFound } from "next/navigation";
import { AuthForm } from "@/components/auth-form";
import { isLocale } from "@/lib/i18n";

export default async function ResetPasswordPage({ params, searchParams }: PageProps<"/[lang]/reset-password">) {
  const { lang } = await params;
  const query = await searchParams;
  if (!isLocale(lang)) notFound();

  return (
    <AuthForm
      locale={lang}
      page="reset-password"
      error={typeof query.error === "string" ? query.error : undefined}
    />
  );
}
