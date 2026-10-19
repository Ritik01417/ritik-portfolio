"use client";

import { useEffect, useState } from "react";

export default function PortfolioLoader() {
  const [phase, setPhase] = useState<"loading" | "leaving" | "hidden">("loading");

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const leaveTimer = window.setTimeout(() => setPhase("leaving"), 1700);
    const hideTimer = window.setTimeout(() => {
      setPhase("hidden");
      document.body.style.overflow = previousOverflow;
    }, 2350);
    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(hideTimer);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  if (phase === "hidden") return null;

  return (
    <div className={`portfolio-loader ${phase === "leaving" ? "portfolio-loader-leaving" : ""}`} role="status" aria-label="Loading portfolio">
      <div className="portfolio-loader-grid" />
      <div className="relative z-10 flex flex-col items-center">
        <div className="loader-mark" aria-label="Ritik Kamwal">
          <span className="loader-word loader-word-left" aria-hidden="true">
            {Array.from("RITIK").map((letter, index) => <span key={`${letter}-${index}`} className="loader-name-letter" style={{ animationDelay: `${550 + index * 95}ms` }}>{letter}</span>)}
          </span>
          <span className="loader-word loader-word-right" aria-hidden="true">
            {Array.from("KAMWAL").map((letter, index) => <span key={`${letter}-${index}`} className="loader-name-letter" style={{ animationDelay: `${550 + index * 95}ms` }}>{letter}</span>)}
          </span>
        </div>
        <p className="mt-7 font-mono text-[10px] uppercase tracking-[0.34em] text-zinc-500">Preparing the experience</p>
        <div className="mt-5 h-px w-56 overflow-hidden bg-white/10"><span className="loader-progress block h-full bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400" /></div>
        <div className="mt-3 flex w-56 justify-between font-mono text-[9px] uppercase tracking-[0.15em] text-zinc-700"><span>Initializing</span><span>100%</span></div>
      </div>
    </div>
  );
}
