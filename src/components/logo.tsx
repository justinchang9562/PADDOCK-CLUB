import Link from "next/link";

export function Logo({ locale = "zh" }: { locale?: string }) {
  return (
    <Link className="brand" href={`/${locale}`} aria-label="PADDOCK INDEX home">
      <span className="brand-mark" aria-hidden="true">
        <span />
        <span />
        <span />
      </span>
      <span className="brand-wordmark">PADDOCK INDEX</span>
    </Link>
  );
}
