"use client";

import { useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function PageScrollAnimations({ children }: { children: ReactNode }) {
  const container = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useGSAP(() => {
    if (pathname === "/zh" || pathname === "/en" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const main = container.current?.querySelector<HTMLElement>("main.page-main");
    if (!main) return;

    const [hero, ...sections] = Array.from(main.children).filter((element): element is HTMLElement => element instanceof HTMLElement);
    const heroTargets = hero ? Array.from(hero.children).filter((element) => !element.classList.contains("directory-hero-backdrop")) : [];

    if (heroTargets.length) {
      gsap.from(heroTargets, {
        autoAlpha: 0,
        y: 28,
        duration: 0.72,
        stagger: 0.1,
        ease: "power3.out",
      });
    }

    sections.forEach((section) => {
      const directContent = Array.from(section.children).filter((element) =>
        !element.matches(".card-grid, .standings-split, .credits-list, .explore-links"),
      );
      const repeatedItems = Array.from(section.querySelectorAll<HTMLElement>(
        ".card-grid > *, .standings-split > *, .credits-list > *, .explore-links > a, .race-session-grid > *, .record-strip > *",
      ));
      const targets = [...directContent, ...repeatedItems];

      gsap.from(targets.length ? targets : section, {
        autoAlpha: 0,
        y: 30,
        duration: 0.7,
        stagger: 0.07,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 84%",
          toggleActions: "play none none reverse",
        },
      });
    });
  }, { scope: container, dependencies: [pathname], revertOnUpdate: true });

  return <div ref={container} className="page-animation-scope">{children}</div>;
}
