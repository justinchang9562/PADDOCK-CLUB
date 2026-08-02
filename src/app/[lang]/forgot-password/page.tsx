import { notFound } from "next/navigation";
import { AuthForm } from "@/components/auth-form";
import { isLocale } from "@/lib/i18n";

export default async function ForgotPasswordPage({ params, searchParams }: PageProps<"/[lang]/forgot-password">) {
  const { lang } = await params;
  const query = await searchParams;
  if (!isLocale(lang)) notFound();

  return (
    <AuthForm
      locale={lang}
      page="forgot-password"
      error={typeof query.error === "string" ? query.error : undefined}
      sent={query.sent === "1"}
    />
  );
}
