type Skill = { name: string; level: number; color: string };
type SkillGroup = { title: string; eyebrow: string; skills: Skill[] };

// Keep proficiency values here so they are easy to update as your skills grow.
const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    eyebrow: "Interfaces & experiences",
    skills: [
      { name: "HTML & CSS", level: 92, color: "from-orange-400 to-rose-400" },
      { name: "JavaScript", level: 88, color: "from-yellow-300 to-amber-400" },
      { name: "React", level: 86, color: "from-cyan-300 to-blue-400" },
      { name: "Next.js", level: 82, color: "from-zinc-200 to-zinc-400" },
      { name: "Tailwind CSS", level: 88, color: "from-cyan-300 to-teal-400" },
    ],
  },
  {
    title: "Backend & data",
    eyebrow: "APIs, services & storage",
    skills: [
      { name: "Node.js", level: 82, color: "from-lime-400 to-emerald-500" },
      { name: "Express.js", level: 80, color: "from-zinc-200 to-zinc-400" },
      { name: "Firebase", level: 76, color: "from-amber-300 to-orange-500" },
      { name: "MongoDB", level: 78, color: "from-green-400 to-emerald-500" },
      { name: "REST APIs", level: 84, color: "from-violet-400 to-fuchsia-400" },
    ],
  },
];

function SkillBar({ skill }: { skill: Skill }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-4 text-sm">
        <span className="font-medium text-zinc-200">{skill.name}</span>
        <span className="font-mono text-[11px] text-zinc-500">{skill.level}%</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.07]" role="progressbar" aria-label={`${skill.name} proficiency`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={skill.level}>
        <div className={`h-full rounded-full bg-gradient-to-r ${skill.color} shadow-[0_0_16px_rgba(103,232,249,0.16)]`} style={{ width: `${skill.level}%` }} />
      </div>
    </div>
  );
}

export default function ExpertiseSection() {
  return (
    <section id="expertise" className="relative bg-white/[0.015] pb-20 sm:pb-24 lg:pb-28">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
        <div className="mb-9 border-t border-white/[0.07] pt-16 sm:mb-11 sm:pt-20">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-cyan-300">02 / Expertise</p>
          <div className="mt-4 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <h2 className="max-w-lg text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">Tools I use to turn ideas into products.</h2>
            <p className="max-w-sm text-sm leading-6 text-zinc-500">A practical snapshot of my current technical toolkit and confidence across the stack.</p>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {skillGroups.map((group, groupIndex) => (
            <article key={group.title} className="rounded-2xl border border-white/[0.08] bg-[#0b0e13] p-5 sm:p-7">
              <div className="flex items-start justify-between gap-4 border-b border-white/[0.07] pb-5">
                <div><p className="text-base font-semibold text-white sm:text-lg">{group.title}</p><p className="mt-1 text-xs text-zinc-500">{group.eyebrow}</p></div>
                <span className="grid size-8 place-items-center rounded-lg border border-cyan-300/15 bg-cyan-300/[0.06] font-mono text-[10px] text-cyan-300">0{groupIndex + 1}</span>
              </div>
              <div className="mt-6 space-y-5">{group.skills.map((skill) => <SkillBar key={skill.name} skill={skill} />)}</div>
            </article>
          ))}
        </div>

        <p className="mt-5 text-[11px] leading-5 text-zinc-600">Proficiency is self-assessed and reflects hands-on project experience.</p>
      </div>
    </section>
  );
}
