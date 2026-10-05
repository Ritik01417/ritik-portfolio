"use client";

import { useEffect } from "react";

export default function SectionAnimations() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const sections = Array.from(document.querySelectorAll<HTMLElement>("main > section"));
    const animations = new Map<Element, Animation>();

    sections.forEach((section) => {
      const animation = section.animate(
        [
          { opacity: 0, transform: "translateY(42px) scale(0.992)", filter: "blur(5px)" },
          { opacity: 1, transform: "translateY(0) scale(1)", filter: "blur(0)" },
        ],
        { duration: 900, easing: "cubic-bezier(0.2, 0.75, 0.2, 1)", fill: "both" },
      );
      animation.pause();
      animations.set(section, animation);
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animations.get(entry.target)?.play();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });

    sections.forEach((section) => observer.observe(section));
    return () => {
      observer.disconnect();
      animations.forEach((animation) => animation.cancel());
    };
  }, []);

  return null;
}
