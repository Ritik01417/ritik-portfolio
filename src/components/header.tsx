export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 mx-auto mt-3 flex w-[calc(100%-1.5rem)] max-w-6xl items-center justify-between rounded-2xl border border-white/[0.1] bg-[#090c12]/70 px-4 py-3 shadow-[0_12px_45px_rgba(0,0,0,.28),inset_0_1px_0_rgba(255,255,255,.04)] backdrop-blur-2xl sm:mt-4 sm:w-[calc(100%-2.5rem)] sm:px-5">
      <a href="#top" className="flex items-center gap-2.5 font-semibold tracking-tight" aria-label="Ritik Kamwal home">
        <span className="grid size-8 place-items-center rounded-lg border border-cyan-300/20 bg-cyan-300/[0.07] font-mono text-xs text-cyan-300 sm:size-9">RK</span>
        <span className="hidden text-sm sm:inline sm:text-base">Ritik Kamwal</span>
      </a>

      <nav aria-label="Primary navigation" className="hidden items-center gap-5 text-xs text-zinc-400 md:flex lg:gap-7">
        <a className="transition-colors hover:text-white" href="#top">Home</a>
        <a className="transition-colors hover:text-white" href="#about">About</a>
        <a className="transition-colors hover:text-white" href="#expertise">Expertise</a>
        <a className="transition-colors hover:text-white" href="#services">Services</a>
        <a className="transition-colors hover:text-white" href="#projects">Projects</a>
        <a className="transition-colors hover:text-white" href="#testimonials">Testimonials</a>
      </nav>

      <a href="#testimonials" className="rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-2 text-xs font-medium transition hover:border-cyan-300/50 hover:bg-cyan-300/10 sm:text-sm">
        Let&apos;s connect
      </a>
    </header>
  );
}
