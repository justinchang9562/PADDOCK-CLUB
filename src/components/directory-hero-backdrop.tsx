import Image from "next/image";

type DirectoryHeroBackdropProps = {
  variant: "season" | "drivers" | "teams" | "cars" | "circuits";
  src?: string;
  mark: string;
  secondarySrc?: string;
};

export function DirectoryHeroBackdrop({ variant, src, mark, secondarySrc }: DirectoryHeroBackdropProps) {
  return (
    <div className={`directory-hero-backdrop is-${variant}`} data-mark={mark} aria-hidden="true">
      {src && <Image className="directory-hero-image" src={src} alt="" fill priority sizes="100vw" />}
      {secondarySrc && <Image className="directory-hero-secondary" src={secondarySrc} alt="" fill priority sizes="40vw" />}
      <span className="directory-hero-lines" />
    </div>
  );
}
