function ArrowUpRight() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M7 17 17 7M7 7h10v10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function HeroSection() {
  return (
    <section id="top" className="relative mx-auto grid w-full max-w-6xl items-center gap-16 px-5 pb-24 pt-28 sm:px-6 sm:pb-28 sm:pt-32 lg:min-h-screen lg:grid-cols-[1.12fr_0.88fr] lg:gap-12 lg:px-8 lg:pb-20 lg:pt-28">
      <div className="relative z-10 max-w-2xl">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/[0.07] px-3 py-1.5 text-[11px] font-medium tracking-wide text-emerald-200 sm:text-xs">
          <span className="size-1.5 rounded-full bg-emerald-300 shadow-[0_0_12px_#6ee7b7]" />
          Available for new opportunities
        </div>

        <p className="mb-3 font-mono text-xs uppercase tracking-[0.22em] text-cyan-300 sm:text-sm">Full-stack developer</p>
        <h1 className="text-[clamp(2.75rem,5vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.055em]">
          I build digital products that feel
          <span className="block bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">simple and powerful.</span>
        </h1>
        <p className="mt-6 max-w-xl text-sm leading-6 text-zinc-400 sm:text-base sm:leading-7">
          Hi, I&apos;m Ritik. I turn complex ideas into thoughtful, scalable web experiences—combining clean code, useful design, and reliable technology.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a href="#projects" className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-cyan-200">
            Discover my work
            <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"><ArrowUpRight /></span>
          </a>
          <a href="#expertise" className="inline-flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-zinc-300 transition hover:text-white">See what I do <span aria-hidden="true">↓</span></a>
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-sm sm:max-w-md lg:mr-0 lg:max-w-[410px]">
        <div className="absolute -inset-10 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="relative rotate-2 rounded-[1.6rem] border border-white/10 bg-gradient-to-br from-white/[0.09] to-white/[0.02] p-2.5 shadow-2xl shadow-blue-950/30 backdrop-blur-xl transition-transform duration-500 hover:rotate-0">
          <div className="overflow-hidden rounded-[1.25rem] border border-white/10 bg-[#0b0e14]">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3.5">
              <div className="flex gap-1.5"><span className="size-2 rounded-full bg-[#ff5f57]" /><span className="size-2 rounded-full bg-[#febc2e]" /><span className="size-2 rounded-full bg-[#28c840]" /></div>
              <span className="font-mono text-[10px] text-zinc-500">ritik.profile.ts</span>
            </div>
            <div className="space-y-3 p-5 font-mono text-[11px] leading-5 sm:p-6 sm:text-xs sm:leading-6">
              <p><span className="text-violet-400">const</span> <span className="text-cyan-300">developer</span> <span className="text-zinc-500">=</span> <span className="text-yellow-200">&#123;</span></p>
              <div className="space-y-1 pl-4">
                <p><span className="text-blue-300">name</span>: <span className="text-emerald-300">&quot;Ritik Kamwal&quot;</span>,</p>
                <p><span className="text-blue-300">role</span>: <span className="text-emerald-300">&quot;Full-stack Developer&quot;</span>,</p>
                <p><span className="text-blue-300">focus</span>: [</p>
                <div className="pl-4 text-emerald-300"><p>&quot;Useful products&quot;,</p><p>&quot;Clean experiences&quot;,</p><p>&quot;Scalable systems&quot;</p></div>
                <p>],</p>
                <p><span className="text-blue-300">curious</span>: <span className="text-orange-300">true</span>,</p>
                <p><span className="text-blue-300">alwaysLearning</span>: <span className="text-orange-300">true</span></p>
              </div>
              <p><span className="text-yellow-200">&#125;</span>;</p>
              <div className="flex items-center gap-2 pt-2 text-zinc-500"><span className="text-emerald-300">❯</span><span className="h-3.5 w-1 animate-pulse bg-cyan-300" /></div>
            </div>
          </div>
        </div>
        <div className="absolute -bottom-6 -left-2 rounded-xl border border-white/10 bg-[#10141c]/90 px-4 py-3 shadow-xl backdrop-blur-xl sm:-left-7">
          <p className="text-lg font-semibold tracking-tight sm:text-xl">Ideas → Impact</p>
          <p className="mt-0.5 text-[10px] text-zinc-500 sm:text-xs">One thoughtful build at a time</p>
        </div>
      </div>
    </section>
  );
}
