import Image from "next/image";
import portrait from "../../public/ritik-about.png";
import avatar from "../../public/ritik-avatar.png";

const technologies = ["Next.js", "React", "TypeScript", "Node.js", "Firebase", "Tailwind CSS"];

function ArrowUpRight() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M7 17 17 7M7 7h10v10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function AboutSection() {
  return (
    <section id="about" className="relative border-t border-white/[0.07] bg-white/[0.015] py-20 sm:py-24 lg:py-28">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[12%] top-1/2 size-72 -translate-y-1/2 rounded-full bg-cyan-500/[0.05] blur-3xl" />
        <div className="absolute right-[8%] top-10 size-72 rounded-full bg-violet-500/[0.05] blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-center gap-3">
          <span className="h-7 w-px bg-cyan-300 shadow-[0_0_12px_#67e8f9]" />
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-cyan-300">01 / About me</p>
        </div>

        <div className="grid overflow-hidden rounded-[1.75rem] border border-white/[0.09] bg-[#0b0e13]/95 shadow-2xl shadow-black/20 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="border-b border-white/[0.08] p-4 sm:p-6 lg:border-b-0 lg:border-r">
            <div className="relative mx-auto min-h-[470px] max-w-md overflow-hidden rounded-[1.35rem] border border-white/[0.1] bg-[#090c12] sm:min-h-[540px] lg:min-h-[570px]">
              <div className="profile-flip absolute left-1/2 top-8 size-[280px] -translate-x-1/2 rounded-full sm:size-[320px] lg:size-[330px]" tabIndex={0} aria-label="Hover or focus to see Ritik's cartoon avatar">
                <div className="profile-flip-inner relative size-full">
                  <div className="profile-flip-face overflow-hidden rounded-full border border-cyan-300/30 bg-[#0d1118] shadow-[0_0_45px_rgba(103,232,249,0.12)]">
                    <Image
                      src={portrait}
                      alt="Ritik Kamwal wearing a navy suit"
                      fill
                      sizes="(max-width: 640px) 280px, (max-width: 1024px) 320px, 330px"
                      className="object-cover object-top"
                      placeholder="blur"
                    />
                  </div>
                  <div className="profile-flip-face profile-flip-back overflow-hidden rounded-full border border-violet-300/40 bg-[#0d1118] shadow-[0_0_55px_rgba(139,92,246,0.22)]">
                    <Image
                      src={avatar}
                      alt="Cartoon avatar of Ritik Kamwal wearing glasses"
                      fill
                      sizes="(max-width: 640px) 280px, (max-width: 1024px) 320px, 330px"
                      className="object-cover"
                      placeholder="blur"
                    />
                  </div>
                </div>
              </div>
              <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#090c12] via-[#090c12]/90 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-center sm:p-7">
                <h3 className="text-xl font-semibold tracking-[-0.03em] text-white sm:text-2xl">Ritik Kamwal</h3>
                <p className="mt-1 text-xs text-zinc-400 sm:text-sm">Full-stack Developer</p>
                <a href="#testimonials" className="group mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-300 to-blue-400 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:brightness-110">
                  Let&apos;s connect
                  <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"><ArrowUpRight /></span>
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">Engineering meets product thinking</p>
            <h2 className="mt-4 max-w-xl text-3xl font-semibold leading-tight tracking-[-0.045em] sm:text-4xl lg:text-5xl">
              Building thoughtful products with
              <span className="block bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">scalable foundations.</span>
            </h2>
            <div className="mt-7 max-w-2xl space-y-4 text-sm leading-7 text-zinc-400 sm:text-base">
              <p className="text-zinc-200">I&apos;m a developer who enjoys understanding the real problem before writing the solution.</p>
              <p>My approach brings engineering and product thinking together. I care about the small details people notice, the architecture they don&apos;t, and building software that stays maintainable as it grows.</p>
            </div>
            <div className="mt-8 border-t border-white/[0.08] pt-7">
              <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-600">Technologies I work with</p>
              <div className="flex flex-wrap gap-2">
                {technologies.map((technology) => (
                  <span key={technology} className="rounded-lg border border-white/10 bg-white/[0.05] px-3 py-1.5 text-[11px] font-medium text-zinc-300 transition hover:border-cyan-300/25 hover:text-cyan-200 sm:text-xs">{technology}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
