const technologies = ["Next.js", "React", "TypeScript", "Node.js", "Firebase", "Tailwind CSS"];

export default function AboutSection() {
  return (
    <section id="about" className="relative border-t border-white/[0.07] bg-white/[0.015]">
      <div className="mx-auto grid w-full max-w-6xl gap-9 px-5 py-20 sm:px-6 sm:py-24 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16 lg:px-8 lg:py-28">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-cyan-300">01 / About me</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">More than just code.</h2>
        </div>
        <div>
          <p className="text-lg leading-7 tracking-[-0.015em] text-zinc-200 sm:text-xl sm:leading-8">I&apos;m a developer who enjoys understanding the real problem before writing the solution.</p>
          <p className="mt-5 max-w-3xl text-sm leading-6 text-zinc-400 sm:text-base sm:leading-7">My approach brings engineering and product thinking together. I care about the small details people notice, the architecture they don&apos;t, and building software that stays maintainable as it grows.</p>
          <div className="mt-7 flex flex-wrap gap-2">{technologies.map((technology) => <span key={technology} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] text-zinc-300 sm:text-xs">{technology}</span>)}</div>
        </div>
      </div>
    </section>
  );
}
