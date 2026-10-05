"use client";

import { useEffect, useState } from "react";

const socials = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/ritik-kamwal-9968b4250/",
    color: "hover:border-[#0a66c2]/70 hover:bg-[#0a66c2]/20 hover:text-[#70b7ff]",
    icon: <path d="M6.5 8.5V18M6.5 5.5v.01M10.5 18v-5.3c0-2.2 3-2.6 3 0V18m0-5.6c.3-2.1 4-2.4 4 1.1V18" />,
  },
  {
    name: "GitHub",
    href: "https://github.com/Ritik01417",
    color: "hover:border-white/40 hover:bg-white/10 hover:text-white",
    icon: <path d="M9 18.5c-4 .8-4-2-5-2.5m10 5v-3.1c0-.9.1-1.3-.4-1.9 2.8-.3 5.7-1.4 5.7-6.2A4.8 4.8 0 0 0 18 6.5a4.5 4.5 0 0 0-.1-3.3s-1-.3-3.4 1.3a11.6 11.6 0 0 0-6 0C6.1 2.9 5 3.2 5 3.2a4.5 4.5 0 0 0-.1 3.3 4.8 4.8 0 0 0-1.3 3.3c0 4.8 3 5.9 5.7 6.2-.4.5-.5 1-.4 1.9V21" />,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/",
    color: "hover:border-pink-400/60 hover:bg-pink-400/15 hover:text-pink-300",
    icon: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.5 6.5h.01" /></>,
  },
];

function ShareIcon({ open }: { open: boolean }) {
  return open ? (
    <path d="m7 7 10 10M17 7 7 17" />
  ) : (
    <><circle cx="18" cy="5" r="2.5" /><circle cx="6" cy="12" r="2.5" /><circle cx="18" cy="19" r="2.5" /><path d="m8.2 10.8 7.5-4.4m-7.5 6.8 7.5 4.4" /></>
  );
}

export default function SocialLauncher() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <aside className="fixed bottom-6 right-4 z-50 flex flex-col items-end gap-3 sm:bottom-8 sm:right-6" aria-label="Social links">
      <div className={`flex flex-col gap-2 transition-all duration-300 ${open ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-5 opacity-0"}`}>
        {socials.map((social, index) => (
          <a
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noreferrer"
            aria-label={`Open ${social.name} profile`}
            title={social.name}
            className={`group flex items-center justify-end gap-2 transition-all duration-300 ${open ? "translate-x-0" : "translate-x-6"}`}
            style={{ transitionDelay: open ? `${index * 55}ms` : "0ms" }}
          >
            <span className="rounded-lg border border-white/10 bg-[#0b0e13]/95 px-2.5 py-1.5 text-[10px] font-medium text-zinc-400 opacity-0 shadow-xl backdrop-blur-xl transition group-hover:opacity-100 sm:text-xs">{social.name}</span>
            <span className={`grid size-11 place-items-center rounded-xl border border-white/10 bg-[#0b0e13]/95 text-zinc-400 shadow-xl backdrop-blur-xl transition ${social.color}`}>
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{social.icon}</svg>
            </span>
          </a>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-label={open ? "Close social links" : "Open social links"}
        className="group relative grid size-13 place-items-center rounded-2xl border border-cyan-300/30 bg-[#0b0e13]/95 text-cyan-300 shadow-[0_12px_40px_rgba(0,0,0,.45),0_0_25px_rgba(103,232,249,.1)] backdrop-blur-xl transition hover:-translate-y-1 hover:border-cyan-300/60 hover:bg-cyan-300/10"
      >
        <span className="absolute -inset-1 -z-10 animate-pulse rounded-[1.15rem] bg-gradient-to-br from-cyan-400/20 to-violet-500/20 blur-md" />
        <svg viewBox="0 0 24 24" className={`size-5 transition-transform duration-500 ${open ? "rotate-180" : "rotate-0"}`} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><ShareIcon open={open} /></svg>
      </button>
    </aside>
  );
}
