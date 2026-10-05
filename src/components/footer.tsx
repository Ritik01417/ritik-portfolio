const footerLinks = [
  { label: "Home", href: "#top" },
  { label: "Work", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#testimonials" },
];

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/Ritik01417",
    icon: <path d="M9 18.5c-4 .8-4-2-5-2.5m10 5v-3.1c0-.9.1-1.3-.4-1.9 2.8-.3 5.7-1.4 5.7-6.2A4.8 4.8 0 0 0 18 6.5a4.5 4.5 0 0 0-.1-3.3s-1-.3-3.4 1.3a11.6 11.6 0 0 0-6 0C6.1 2.9 5 3.2 5 3.2a4.5 4.5 0 0 0-.1 3.3 4.8 4.8 0 0 0-1.3 3.3c0 4.8 3 5.9 5.7 6.2-.4.5-.5 1-.4 1.9V21" />,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ritik-kamwal-9968b4250/",
    icon: <><path d="M6.5 8.5V18M6.5 5.5v.01M10.5 18v-5.3c0-2.2 3-2.6 3 0V18m0-5.6c.3-2.1 4-2.4 4 1.1V18" /></>,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/",
    icon: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.5 6.5h.01" /></>,
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.08] bg-[#05060a] px-5 pb-8 pt-24 sm:px-6 sm:pb-10 sm:pt-32 lg:px-8">
      <div className="footer-orb pointer-events-none absolute left-1/2 top-1/3 size-[34rem] -translate-x-1/2 rounded-full bg-violet-500/[0.06] blur-3xl" />
      <div className="footer-grid pointer-events-none absolute inset-0 opacity-30" />

      <div className="relative mx-auto flex min-h-[620px] w-full max-w-6xl flex-col items-center justify-center text-center sm:min-h-[700px]">
        <div className="mb-12 flex items-center gap-3">
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-cyan-300/70" />
          <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-cyan-300">Let&apos;s build what&apos;s next</p>
          <span className="h-px w-10 bg-gradient-to-l from-transparent to-cyan-300/70" />
        </div>

        <div className="footer-name group relative isolate w-full select-none py-8">
          <p aria-hidden="true" className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 whitespace-nowrap text-[clamp(4rem,12vw,10rem)] font-black leading-none tracking-[-0.08em] text-[#101522] transition duration-700 group-hover:-translate-y-2 group-hover:text-[#121a2b]">RITIK</p>
          <p className="relative whitespace-nowrap text-[clamp(2.6rem,7.5vw,6.5rem)] font-black leading-none tracking-[-0.06em] text-white transition duration-500 group-hover:tracking-[-0.035em]">RITIK KAMWAL</p>
          <p aria-hidden="true" className="absolute bottom-0 left-1/2 -z-10 -translate-x-1/2 whitespace-nowrap text-[clamp(4rem,12vw,10rem)] font-black leading-none tracking-[-0.08em] text-[#101522] transition duration-700 group-hover:translate-y-2 group-hover:text-[#121a2b]">KAMWAL</p>
        </div>

        <p className="mt-14 max-w-lg text-sm leading-6 text-zinc-500 sm:mt-20 sm:text-base">Full-stack developer building thoughtful interfaces, resilient APIs, and scalable digital products.</p>

        <nav aria-label="Footer navigation" className="mt-10 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 sm:gap-x-10">
          {footerLinks.map((link) => (
            <a key={link.label} href={link.href} className="footer-link relative py-2 text-xs font-medium uppercase tracking-[0.14em] text-zinc-400 transition hover:text-cyan-300 sm:text-sm">{link.label}</a>
          ))}
        </nav>

        <div className="mt-10 flex items-center gap-3">
          {socials.map((social) => (
            <a key={social.label} href={social.href} target="_blank" rel="noreferrer" aria-label={`Open ${social.label} profile`} title={social.label} className="group grid size-12 place-items-center rounded-full border border-white/10 bg-[#0b1019] text-zinc-500 transition duration-300 hover:-translate-y-2 hover:border-cyan-300/40 hover:bg-cyan-300/10 hover:text-cyan-300 hover:shadow-[0_12px_30px_rgba(34,211,238,.12)] sm:size-14">
              <svg viewBox="0 0 24 24" className="size-5 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{social.icon}</svg>
            </a>
          ))}
          <a href="#testimonials" aria-label="Start a conversation" title="Contact" className="group grid size-12 place-items-center rounded-full border border-white/10 bg-[#0b1019] text-zinc-500 transition duration-300 hover:-translate-y-2 hover:border-violet-300/40 hover:bg-violet-300/10 hover:text-violet-300 hover:shadow-[0_12px_30px_rgba(139,92,246,.12)] sm:size-14">
            <svg viewBox="0 0 24 24" className="size-5 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 6.5h16v11H4zM4.5 7l7.5 6 7.5-6" /></svg>
          </a>
        </div>
      </div>

      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-3 border-t border-white/[0.08] pt-6 text-center sm:flex-row sm:text-left">
        <p className="text-[10px] uppercase tracking-[0.16em] text-zinc-600">© {new Date().getFullYear()} Ritik Kamwal. All rights reserved.</p>
        <a href="#top" className="group inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-zinc-600 transition hover:text-cyan-300">Back to top <span className="transition-transform group-hover:-translate-y-1" aria-hidden="true">↑</span></a>
      </div>
    </footer>
  );
}
