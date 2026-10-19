import ResumeDownloadButton from "@/components/resume-download-button";

const technologies = ["Next.js", "React", "TypeScript", "Node.js", "Firebase", "Tailwind CSS","PostgreSQL"];

function ArrowUpRight() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M7 17 17 7M7 7h10v10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function AboutSection() {
  return (
    <section id="about" className="relative border-t border-white/[0.07] bg-[#080b10] py-20 sm:py-24 lg:py-28">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[12%] top-1/2 size-72 -translate-y-1/2 rounded-full bg-cyan-500/[0.08] blur-3xl" />
        <div className="absolute right-[8%] top-10 size-72 rounded-full bg-violet-500/[0.08] blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-5xl px-5 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-center text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">About Me</h2>

        <div className="relative overflow-hidden rounded-[1.5rem] border border-cyan-100/30 bg-[linear-gradient(125deg,#d9e7fb_0%,#bcd5f3_46%,#9cbef2_100%)] p-3 shadow-[0_24px_80px_rgba(11,29,55,.4)] sm:p-5">
          <div className="pointer-events-none absolute -right-20 -top-24 size-80 rounded-full bg-white/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-40 -left-24 size-80 rounded-full bg-cyan-300/35 blur-3xl" />

          <div className="relative grid overflow-hidden rounded-[1.15rem] border border-slate-700/15 bg-white/30 backdrop-blur-sm lg:grid-cols-[.72fr_1.28fr]">
            <div className="border-b border-slate-700/15 bg-white/35 p-6 sm:p-8 lg:border-b-0 lg:border-r">
              <div className="mx-auto flex max-w-[250px] flex-col items-center text-center">
                <div id="about-profile-target" className="profile-skeleton relative size-44 overflow-hidden rounded-full border-4 border-cyan-200/80 bg-[#101827] shadow-[0_0_0_7px_rgba(255,255,255,.45),0_12px_30px_rgba(36,84,139,.3)] sm:size-48" aria-hidden="true">
                  <span className="absolute inset-[12%] rounded-full border border-white/[0.08]" />
                  <span className="absolute bottom-[14%] left-1/2 h-[34%] w-[58%] -translate-x-1/2 rounded-t-full bg-white/[0.06]" />
                  <span className="absolute left-1/2 top-[20%] size-[35%] -translate-x-1/2 rounded-full bg-white/[0.07]" />
                </div>
                <h3 className="mt-7 text-xl font-bold tracking-[-0.035em] text-slate-900">Ritik Kamwal</h3>
                <p className="mt-1 text-xs font-medium text-slate-600">Full-stack Developer</p>
                <a href="#testimonials" className="group mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-violet-400 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-[0_8px_20px_rgba(14,165,233,.24)] transition hover:-translate-y-0.5 hover:brightness-105">
                  Let&apos;s connect <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"><ArrowUpRight /></span>
                </a>
                <ResumeDownloadButton />
              </div>
            </div>

            <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600">Engineering meets product thinking</p>
              <h2 className="mt-3 max-w-xl text-3xl font-bold leading-[1.05] tracking-[-0.045em] text-slate-900 sm:text-4xl">Building thoughtful products with scalable foundations.</h2>
              <div className="mt-6 max-w-2xl space-y-3 text-sm leading-6 text-slate-700 sm:text-[15px]">
                <p className="font-medium text-slate-800">I&apos;m a developer who enjoys understanding the real problem before writing the solution.</p>
                <p>My approach brings engineering and product thinking together. I care about the small details people notice, the architecture they don&apos;t, and building software that stays maintainable as it grows.</p>
              </div>
              <div className="mt-7 border-t border-slate-600/15 pt-5">
                <p className="mb-3 font-mono text-[9px] font-bold uppercase tracking-[0.17em] text-slate-500">Technologies I work with</p>
                <div className="flex flex-wrap gap-2">
                  {technologies.map((technology, index) => (
                    <span key={technology} className={`rounded-full border border-white/60 px-3 py-1.5 text-[10px] font-semibold text-slate-700 shadow-sm ${index % 3 === 0 ? "bg-cyan-100/80" : index % 3 === 1 ? "bg-violet-100/80" : "bg-white/70"}`}>{technology}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
