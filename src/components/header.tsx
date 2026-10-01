export default function Header() {
  return (
    <header className="relative z-20 mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-5 sm:px-6 lg:px-8">
      <a href="#top" className="flex items-center gap-2.5 font-semibold tracking-tight" aria-label="Ritik Kamwal home">
        <span className="grid size-8 place-items-center rounded-lg border border-white/10 bg-white/[0.06] font-mono text-xs text-cyan-300 sm:size-9">RK</span>
        <span className="text-sm sm:text-base">Ritik Kamwal</span>
      </a>

      <nav aria-label="Primary navigation" className="hidden items-center gap-6 text-sm text-zinc-400 md:flex lg:gap-8">
        <a className="transition-colors hover:text-white" href="#top">Home</a>
        <a className="transition-colors hover:text-white" href="#about">About</a>
        <a className="transition-colors hover:text-white" href="#expertise">Expertise</a>
        <a className="transition-colors hover:text-white" href="#projects">Projects</a>
      </nav>

      <a href="#projects" className="rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-2 text-xs font-medium transition hover:border-cyan-300/50 hover:bg-cyan-300/10 sm:text-sm">
        Let&apos;s connect
      </a>
    </header>
  );
}
