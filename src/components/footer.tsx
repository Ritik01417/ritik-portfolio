const footerLinks = [
  { label: "Home", href: "#top" },
  { label: "About", href: "#about" },
  { label: "Expertise", href: "#expertise" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
];

const socials = [
  { label: "GitHub", href: "https://github.com/Ritik01417", icon: <path d="M9 18.5c-4 .8-4-2-5-2.5m10 5v-3.1c0-.9.1-1.3-.4-1.9 2.8-.3 5.7-1.4 5.7-6.2A4.8 4.8 0 0 0 18 6.5a4.5 4.5 0 0 0-.1-3.3s-1-.3-3.4 1.3a11.6 11.6 0 0 0-6 0C6.1 2.9 5 3.2 5 3.2a4.5 4.5 0 0 0-.1 3.3 4.8 4.8 0 0 0-1.3 3.3c0 4.8 3 5.9 5.7 6.2-.4.5-.5 1-.4 1.9V21" /> },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/ritik-kamwal-9968b4250/", icon: <><path d="M6.5 8.5V18M6.5 5.5v.01M10.5 18v-5.3c0-2.2 3-2.6 3 0V18m0-5.6c.3-2.1 4-2.4 4 1.1V18" /></> },
  { label: "Instagram", href: "https://www.instagram.com/", icon: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.5 6.5h.01" /></> },
];

function ArrowIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14m-6-6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export default function Footer() {
  return (
    <footer className="signal-footer relative overflow-hidden border-t border-white/[0.08] px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="signal-footer-grid pointer-events-none absolute inset-0" />
      <div className="signal-footer-glow pointer-events-none absolute right-[12%] top-0 size-96 rounded-full bg-cyan-400/10 blur-[110px]" />
      <div className="relative mx-auto w-full max-w-6xl">
        <div className="grid gap-6 lg:grid-cols-[1.35fr_.65fr]">
          <section className="signal-footer-cta relative overflow-hidden rounded-[1.5rem] border border-white/[0.1] p-7 sm:p-10">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-cyan-300">Start a conversation</p>
            <h2 className="mt-5 max-w-xl text-4xl font-semibold leading-[.98] tracking-[-0.055em] text-white sm:text-6xl">Bring the next idea <span className="text-cyan-300">to life.</span></h2>
            <p className="mt-5 max-w-md text-sm leading-6 text-zinc-400 sm:text-base">Have a product to shape, a system to scale, or a difficult problem to solve? Let&apos;s talk through it.</p>
            <a href="#testimonials" className="signal-footer-button group mt-8 inline-flex items-center gap-3 rounded-full px-5 py-3 text-sm font-semibold text-slate-950 transition">Send a message <span className="transition-transform group-hover:translate-x-1"><ArrowIcon /></span></a>
          </section>
          <aside className="signal-status flex flex-col justify-between rounded-[1.5rem] border border-white/[0.1] p-7 sm:p-8">
            <div>
              <div className="flex items-center justify-between"><p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">Current signal</p><span className="size-2 rounded-full bg-emerald-300 shadow-[0_0_14px_#6ee7b7]" /></div>
              <p className="mt-7 text-2xl font-semibold tracking-[-0.035em] text-white">Product-minded engineering from interface to infrastructure.</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {["Product systems", "API design", "Web performance"].map((focus) => <span key={focus} className="rounded-full border border-cyan-300/20 bg-cyan-300/[0.07] px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.12em] text-cyan-100">{focus}</span>)}
              </div>
            </div>
            <div className="mt-8 border-t border-white/[0.08] pt-5 font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-500"><p>Based in India</p><p className="mt-2 text-cyan-200">Working worldwide / remote</p></div>
          </aside>
        </div>

        <div className="mt-6 grid gap-6 border-y border-white/[0.08] py-7 sm:grid-cols-[1fr_auto] sm:items-center">
          <div><p className="footer-signature">Ritik Kamwal</p><p className="mt-2 text-xs text-zinc-500">Full-stack developer · interfaces, APIs, and scalable product systems.</p></div>
          <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-5 gap-y-2 sm:justify-end">{footerLinks.map((link) => <a key={link.label} href={link.href} className="text-xs font-medium text-zinc-400 transition hover:text-cyan-300">{link.label}</a>)}</nav>
        </div>

        <div className="flex flex-col gap-5 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">{socials.map((social) => <a key={social.label} href={social.href} target="_blank" rel="noreferrer" aria-label={"Open " + social.label + " profile"} title={social.label} className="signal-social grid size-10 place-items-center rounded-xl border border-white/10 text-zinc-400 transition hover:-translate-y-1 hover:border-cyan-300/50 hover:text-cyan-300"><svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{social.icon}</svg></a>)}</div>
          <div className="flex items-center justify-between gap-6 text-[10px] uppercase tracking-[0.14em] text-zinc-600 sm:justify-end"><p>© {new Date().getFullYear()} Ritik Kamwal</p><a href="#top" className="transition hover:text-cyan-300">Return to top ↑</a></div>
        </div>
      </div>
    </footer>
  );
}
