import HeroCharacter from "@/components/hero-character";

const animatedAccent = Array.from("simple and powerful");

function ArrowUpRight() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M7 17 17 7M7 7h10v10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function HeroSection() {
  return (
    <section id="top" className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-5 pb-24 pt-28 sm:px-6 sm:pb-28 sm:pt-32 lg:min-h-screen lg:grid-cols-[1.08fr_0.92fr] lg:gap-8 lg:px-8 lg:pb-20 lg:pt-28">
      <div className="relative z-10 max-w-2xl">
        <p className="hero-role mb-4 inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300 sm:text-sm"><span className="size-1.5 rounded-full bg-cyan-300" />Full-stack developer</p>
        <h1 className="hero-title text-[clamp(2.5rem,5vw,4rem)] font-semibold leading-[1.02] tracking-[-0.055em]">I build digital products that feel<span className="hero-title-accent block bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">{animatedAccent.map((letter, index) => <span key={index} className="hero-title-letter" style={{ animationDelay: String(index * 70) + "ms" }}>{letter === " " ? "\u00a0" : letter}</span>)}</span></h1>
        <p className="mt-6 max-w-xl text-sm leading-6 text-zinc-400 sm:text-base sm:leading-7">Hi, I&apos;m Ritik. I turn complex ideas into thoughtful, scalable software experiences combining clean code, useful design, and reliable technology.</p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a href="#projects" className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-cyan-200">Discover my work<span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"><ArrowUpRight /></span></a>
          <a href="#expertise" className="inline-flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-zinc-300 transition hover:text-white">See what I do <span aria-hidden="true">↓</span></a>
        </div>
      </div>
      <HeroCharacter />
    </section>
  );
}
