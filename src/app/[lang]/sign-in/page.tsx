import { notFound } from "next/navigation";
import { AuthForm } from "@/components/auth-form";
import { isLocale } from "@/lib/i18n";

export default async function SignInPage({ params, searchParams }: PageProps<"/[lang]/sign-in">) {
  const { lang } = await params;
  const query = await searchParams;
  if (!isLocale(lang)) notFound();

  return (
    <AuthForm
      locale={lang}
      page="sign-in"
      error={typeof query.error === "string" ? query.error : undefined}
    />
  );
}
