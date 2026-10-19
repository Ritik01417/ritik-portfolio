"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

function SunIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><circle cx="12" cy="12" r="3.5" /><path d="M12 2v2.5M12 19.5V22M4.93 4.93 6.7 6.7m10.6 10.6 1.77 1.77M2 12h2.5M19.5 12H22M4.93 19.07 6.7 17.3m10.6-10.6 1.77-1.77" strokeLinecap="round" /></svg>;
}

function MoonIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M20.4 15.1A8.6 8.6 0 0 1 8.9 3.6 8.6 8.6 0 1 0 20.4 15.1Z" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("portfolio-theme");
    const nextTheme: Theme = savedTheme === "light" || savedTheme === "dark" ? savedTheme : "dark";
    document.documentElement.dataset.theme = nextTheme;
    const frame = window.requestAnimationFrame(() => setTheme(nextTheme));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  function toggleTheme() {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("portfolio-theme", nextTheme);
  }

  const isLight = theme === "light";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isLight ? "dark" : "light"} theme`}
      title={`Switch to ${isLight ? "dark" : "light"} theme`}
      className="theme-toggle grid size-9 shrink-0 place-items-center rounded-full border border-white/15 bg-white/[0.04] text-cyan-200 transition hover:border-cyan-300/50 hover:bg-cyan-300/10"
    >
      <span className="size-4">{isLight ? <MoonIcon /> : <SunIcon />}</span>
    </button>
  );
}
