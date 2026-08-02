"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function HomeScrollAnimations({ children }: { children: ReactNode }) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const scope = container.current;
    if (!scope) return;

    let context: gsap.Context | undefined;
    let revealFrame = 0;
    const hydrationFrame = window.requestAnimationFrame(() => {
      revealFrame = window.requestAnimationFrame(() => {
        context = gsap.context(() => {
          const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
          intro
            .from(".home-index-rail", { autoAlpha: 0, y: -12, duration: 0.55 })
            .from(".home-index-wordmark", {
              autoAlpha: 0,
              y: 48,
              duration: 0.85,
              force3D: false,
            }, "<0.08")
            .from(".home-index-stat", { autoAlpha: 0, x: -28, duration: 0.65 }, "<0.18")
            .from(".home-index-copy > *", { autoAlpha: 0, y: 24, duration: 0.62, stagger: 0.1 }, "<0.1")
            .from(".home-index-photo-label", { autoAlpha: 0, duration: 0.45 }, "<0.12");

          gsap.to(".home-index-photo", {
            yPercent: 10,
            scale: 1.09,
            ease: "none",
            scrollTrigger: {
              trigger: ".home-index-hero",
              start: "top top",
              end: "bottom top",
              scrub: 0.7,
            },
          });

          gsap.utils.toArray<HTMLElement>("[data-home-reveal]", scope).forEach((section) => {
            const targets = section.matches(".current-strip")
              ? [section]
              : Array.from(section.querySelectorAll<HTMLElement>(".section-heading, .card-grid > *, .standings-split > *, .explore-intro, .explore-links a"));

            gsap.from(targets, {
              autoAlpha: 0,
              y: 32,
              duration: 0.75,
              stagger: 0.09,
              ease: "power3.out",
              scrollTrigger: {
                trigger: section,
                start: "top 82%",
                toggleActions: "play none none reverse",
              },
            });
          });
        }, scope);
      });
    });

    return () => {
      window.cancelAnimationFrame(hydrationFrame);
      window.cancelAnimationFrame(revealFrame);
      context?.revert();
    };
  }, []);

  return <div ref={container}>{children}</div>;
}
