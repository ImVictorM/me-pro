"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PropsWithChildren, useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function AnimationContainer({ children }: PropsWithChildren) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        if (!container.current) return;

        const heroItems =
          container.current.querySelectorAll<HTMLElement>("[data-reveal-hero]");

        const sections = container.current.querySelectorAll<HTMLElement>(
          "[data-reveal-section]",
        );

        gsap.from(heroItems, {
          autoAlpha: 0.1,
          y: 40,
          duration: 0.75,
          stagger: 0.1,
          ease: "power2.out",
        });

        sections.forEach((section) => {
          const items = section.querySelectorAll<HTMLElement>("[data-reveal]");

          if (!items.length) return;

          gsap.from(items, {
            autoAlpha: 0,
            y: 30,
            duration: 0.75,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 82%",
              once: true,
            },
          });
        });
      });
    },
    { scope: container },
  );

  return <div ref={container}>{children}</div>;
}
