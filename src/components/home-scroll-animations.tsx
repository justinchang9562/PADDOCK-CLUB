"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function HomeScrollAnimations({ children }: { children: ReactNode }) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
    intro
      .from(".home-index-rail", { autoAlpha: 0, y: -12, duration: 0.55 })
      .from(".home-index-wordmark span", { autoAlpha: 0, yPercent: 70, duration: 0.85, stagger: 0.12 }, "<0.08")
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

    gsap.utils.toArray<HTMLElement>("[data-home-reveal]").forEach((section) => {
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
  }, { scope: container });

  return <div ref={container}>{children}</div>;
}
