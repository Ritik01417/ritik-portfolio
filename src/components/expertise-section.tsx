import TechStackBackground from "@/components/tech-stack-background";

type Skill = { name: string; icon: string; level: number; color: string };
type SkillGroup = { title: string; eyebrow: string; skills: Skill[] };

const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    eyebrow: "Interfaces & experiences",
    skills: [
      { name: "HTML & CSS", icon: "<>", level: 92, color: "from-orange-400 to-rose-400" },
      { name: "JavaScript", icon: "JS", level: 88, color: "from-yellow-300 to-amber-400" },
      { name: "React", icon: "⚛", level: 86, color: "from-cyan-300 to-blue-400" },
      { name: "Next.js", icon: "N", level: 82, color: "from-zinc-100 to-zinc-400" },
      { name: "Tailwind CSS", icon: "≈", level: 88, color: "from-cyan-300 to-teal-400" },
    ],
  },
  {
    title: "Backend & data",
    eyebrow: "APIs, services & storage",
    skills: [
      { name: "Node.js", icon: "JS", level: 82, color: "from-lime-400 to-emerald-500" },
      { name: "Express.js", icon: "ex", level: 80, color: "from-zinc-100 to-zinc-400" },
      { name: "Firebase", icon: "♨", level: 76, color: "from-amber-300 to-orange-500" },
      { name: "MongoDB", icon: "M", level: 78, color: "from-green-400 to-emerald-500" },
      { name: "REST APIs", icon: "↔", level: 84, color: "from-violet-400 to-fuchsia-400" },
    ],
  },
];

function SkillBar({ skill }: { skill: Skill }) {
  return (
    <div className="expertise-skill group">
      <div className="mb-2 flex items-center justify-between gap-4 text-sm">
        <span className="flex items-center gap-2.5 font-medium text-zinc-100"><span className="grid size-5 place-items-center rounded-md border border-white/10 bg-white/[0.06] font-mono text-[9px] text-cyan-200">{skill.icon}</span>{skill.name}</span>
        <span className="font-mono text-[11px] text-zinc-400">{skill.level}%</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.08]" role="progressbar" aria-label={`${skill.name} proficiency`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={skill.level}>
        <div className={`expertise-progress h-full rounded-full bg-gradient-to-r ${skill.color}`} style={{ width: `${skill.level}%` }} />
      </div>
    </div>
  );
}

export default function ExpertiseSection() {
  return (
    <section id="expertise" className="relative isolate overflow-hidden bg-[#06111e] py-20 sm:py-24 lg:py-28">
      <TechStackBackground />
      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
        <div className="mb-9 border-t border-cyan-200/[0.12] pt-12 text-center sm:mb-11 sm:pt-16">
          <h2 className="text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">Expertise</h2>
          <div className="mt-5 flex flex-col items-center justify-between gap-4 md:flex-row md:items-end md:text-left">
            <h3 className="max-w-lg text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">Tools I use to turn ideas into products.</h3>
            <p className="max-w-sm text-sm leading-6 text-cyan-50/55">A practical snapshot of my current technical toolkit and confidence across the stack.</p>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {skillGroups.map((group, groupIndex) => (
            <article key={group.title} className="expertise-card relative overflow-hidden rounded-2xl border border-cyan-200/20 bg-[#0a1b2b]/70 p-5 shadow-[0_20px_50px_rgba(1,9,19,.42),inset_0_1px_0_rgba(255,255,255,.08)] backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:border-cyan-300/55 sm:p-7">
              <div className="pointer-events-none absolute -right-12 -top-14 size-40 rounded-full bg-cyan-300/[0.1] blur-3xl" />
              <div className="relative flex items-start justify-between gap-4 border-b border-cyan-100/[0.12] pb-5">
                <div><p className="text-base font-semibold text-white sm:text-lg">{group.title}</p><p className="mt-1 text-xs text-cyan-50/45">{group.eyebrow}</p></div>
                <span className="grid size-9 place-items-center rounded-lg border border-cyan-300/20 bg-cyan-300/[0.08] font-mono text-[10px] text-cyan-200 shadow-[0_0_18px_rgba(103,232,249,.1)]">0{groupIndex + 1}</span>
              </div>
              <div className="relative mt-6 space-y-5">{group.skills.map((skill) => <SkillBar key={skill.name} skill={skill} />)}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
