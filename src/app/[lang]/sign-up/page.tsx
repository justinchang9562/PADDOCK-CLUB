import { notFound } from "next/navigation";
import { AuthForm } from "@/components/auth-form";
import { isLocale } from "@/lib/i18n";

export default async function SignUpPage({ params, searchParams }: PageProps<"/[lang]/sign-up">) {
  const { lang } = await params;
  const query = await searchParams;
  if (!isLocale(lang)) notFound();

  return (
    <AuthForm
      locale={lang}
      page="sign-up"
      error={typeof query.error === "string" ? query.error : undefined}
      sent={query.sent === "1"}
    />
  );
}
