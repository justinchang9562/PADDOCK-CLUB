import Link from "next/link";
import { Icon } from "./icons";

export function SectionHeading({
  eyebrow,
  title,
  description,
  href,
  linkLabel,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  href?: string;
  linkLabel?: string;
}) {
  const displayTitle = title.replace(/[。.]+$/u, "");

  return (
    <div className="section-heading">
      <div>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h2>{displayTitle}</h2>
        {description && <p>{description}</p>}
      </div>
      {href && linkLabel && <Link className="text-link" href={href}>{linkLabel}<Icon name="arrow" /></Link>}
    </div>
  );
}
