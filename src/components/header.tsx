import ThemeToggle from "@/components/theme-toggle";

export default function Header() {
  return (
    <header className="site-header fixed inset-x-0 top-0 z-40 mx-auto mt-3 flex w-[calc(100%-1.5rem)] max-w-6xl items-center justify-between rounded-2xl border border-white/[0.1] bg-[#090c12]/70 px-4 py-3 shadow-[0_12px_45px_rgba(0,0,0,.28),inset_0_1px_0_rgba(255,255,255,.04)] backdrop-blur-2xl sm:mt-4 sm:w-[calc(100%-2.5rem)] sm:px-5">
      <a href="#top" className="brand-signature" aria-label="Ritik Kamwal home">
        Ritik Kamwal
      </a>

      <nav aria-label="Primary navigation" className="site-nav hidden items-center gap-5 text-xs text-zinc-400 md:flex lg:gap-7">
        <a className="transition-colors hover:text-white" href="#top">Home</a>
        <a className="transition-colors hover:text-white" href="#about">About</a>
        <a className="transition-colors hover:text-white" href="#expertise">Expertise</a>
        <a className="transition-colors hover:text-white" href="#services">Services</a>
        <a className="transition-colors hover:text-white" href="#projects">Projects</a>
        <a className="transition-colors hover:text-white" href="#testimonials">Testimonials</a>
      </nav>

      <div className="flex items-center gap-2">
        <ThemeToggle />
        <a href="#testimonials" className="site-connect rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-2 text-xs font-medium transition hover:border-cyan-300/50 hover:bg-cyan-300/10 sm:text-sm">
          Let&apos;s connect
        </a>
      </div>
    </header>
  );
}
