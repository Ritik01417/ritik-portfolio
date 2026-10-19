"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import portrait from "../../public/ritik-about.png";

type Box = { left: number; top: number; width: number; height: number };

export default function HeroCharacter() {
  const anchorRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const mountTimer = window.setTimeout(() => setMounted(true), 0);
    return () => window.clearTimeout(mountTimer);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const anchor = anchorRef.current;
    const movingPortrait = portraitRef.current;
    const target = document.getElementById("about-profile-target");
    if (!anchor || !movingPortrait || !target) return;

    let startBox: Box;
    let targetBox: Box;
    let travelDistance = 1;
    let frame = 0;

    const measure = () => {
      const scrollY = window.scrollY;
      const start = anchor.getBoundingClientRect();
      const end = target.getBoundingClientRect();
      startBox = { left: start.left, top: start.top + scrollY, width: start.width, height: start.height };
      targetBox = { left: end.left, top: end.top + scrollY, width: end.width, height: end.height };
      travelDistance = Math.max(1, targetBox.top - startBox.top);
    };

    const render = () => {
      const liveTarget = target.getBoundingClientRect();
      targetBox = { left: liveTarget.left, top: liveTarget.top + window.scrollY, width: liveTarget.width, height: liveTarget.height };
      travelDistance = Math.max(1, targetBox.top - startBox.top);
      const progress = Math.max(0, Math.min(1, window.scrollY / travelDistance));
      const ease = progress * progress * (3 - 2 * progress);
      const left = startBox.left + (targetBox.left - startBox.left) * ease;
      const top = startBox.top + (targetBox.top - startBox.top) * ease - window.scrollY;
      const width = startBox.width + (targetBox.width - startBox.width) * ease;
      const height = startBox.height + (targetBox.height - startBox.height) * ease;

      movingPortrait.style.left = `${left}px`;
      movingPortrait.style.top = `${top}px`;
      movingPortrait.style.width = `${width}px`;
      movingPortrait.style.height = `${height}px`;
      movingPortrait.style.opacity = "1";
      movingPortrait.style.visibility = "visible";
    };

    const update = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(render);
    };
    const updateMeasurements = () => {
      measure();
      render();
    };

    measure();
    render();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", updateMeasurements);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", updateMeasurements);
    };
  }, [mounted]);

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[420px]">
      <div className="absolute inset-[5%] rounded-full border border-dashed border-white/[0.08]" />
      <div ref={anchorRef} className="absolute inset-[9%] rounded-full" aria-hidden="true" />
      {mounted && createPortal(
        <div ref={portraitRef} style={{ width: 352, height: 352 }} className="travelling-portrait fixed z-30 invisible rounded-full border border-cyan-300/45 bg-cyan-300/[0.08] p-4 shadow-[0_0_65px_rgba(103,232,249,0.16)]">
          <div className="relative size-full overflow-hidden rounded-full border-2 border-white/10">
            <Image src={portrait} alt="Ritik Kamwal wearing a navy suit" fill priority sizes="(max-width: 1024px) 80vw, 380px" className="object-cover object-top" placeholder="blur" />
          </div>
        </div>,
        document.body,
      )}
      <div className="portrait-journey absolute -bottom-10 left-1/2 z-40 inline-flex -translate-x-1/2 items-center gap-2 rounded-full px-3 py-2 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] whitespace-nowrap"><span className="portrait-journey-orbit" aria-hidden="true" /><span>Portrait journey</span><span aria-hidden="true">↘</span></div>
    </div>
  );
}
