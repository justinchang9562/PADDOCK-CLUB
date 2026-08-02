import Image from "next/image";
import Link from "next/link";
import { copy } from "@/lib/i18n";
import type { Locale } from "@/lib/types";
import { Icon } from "./icons";

type AccountIdentity = {
  displayName: string | null;
  avatarUrl: string | null;
} | null;

export function AuthControls({ locale, signedIn, identity }: { locale: Locale; signedIn: boolean; identity: AccountIdentity }) {
  if (signedIn) {
    return (
      <Link className="header-auth-button" href={`/${locale}/account`} title={identity?.displayName || copy[locale].account}>
        {identity?.avatarUrl
          ? <Image className="header-auth-avatar" src={identity.avatarUrl} alt="" width={22} height={22} unoptimized />
          : <Icon name="user" />}
        <span>{identity?.displayName || copy[locale].account}</span>
      </Link>
    );
  }

  return (
    <Link className="header-auth-button" href={`/${locale}/sign-in`}>
      <Icon name="user" />
      <span>{copy[locale].signIn}</span>
    </Link>
  );
}
