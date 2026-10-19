import { getPublicRepositories, githubProfileUrl } from "@/lib/github";

const languageColors: Record<string, string> = { TypeScript: "#38bdf8", JavaScript: "#facc15", Python: "#60a5fa", Java: "#fb923c", HTML: "#fb7185", CSS: "#a78bfa", Dart: "#2dd4bf" };

function ExternalLinkIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17 17 7M7 7h10v10" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function GitHubIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="currentColor"><path d="M12 .7a11.5 11.5 0 0 0-3.64 22.4c.58.1.79-.25.79-.56v-2.23c-3.22.7-3.9-1.37-3.9-1.37-.52-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.57-.3-5.28-1.29-5.28-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.47.11-3.05 0 0 .97-.31 3.16 1.18a10.9 10.9 0 0 1 5.76 0c2.2-1.49 3.16-1.18 3.16-1.18.63 1.58.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.71 5.39-5.29 5.68.42.36.79 1.07.79 2.16v3.2c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .7Z" /></svg>;
}

export default async function ProjectsSection() {
  const repositories = await getPublicRepositories();
  return (
    <section id="projects" className="projects-section relative isolate overflow-hidden border-t border-white/[0.07]">
      <div className="project-constellation pointer-events-none absolute inset-0" />
      <div className="project-stars pointer-events-none absolute inset-0" />
      <div className="relative mx-auto w-full max-w-6xl px-5 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <h2 className="mb-8 text-center text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">Projects</h2>
        <div className="flex flex-col justify-between gap-7 sm:flex-row sm:items-end">
          <div>
            <h3 className="text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">Things I&apos;ve built.</h3>
            <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-400 sm:text-base sm:leading-7">A live selection of my public GitHub work, refreshed automatically as I build and ship new projects.</p>
          </div>
          <a href={githubProfileUrl} target="_blank" rel="noreferrer" className="project-profile-link group inline-flex w-fit items-center gap-2 rounded-xl border px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] transition sm:text-sm"><GitHubIcon /> Explore full GitHub profile <span className="transition-transform group-hover:translate-x-0.5"><ExternalLinkIcon /></span></a>
        </div>
        {repositories.length > 0 ? (
          <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {repositories.map((repository, index) => {
              const tags = repository.topics.slice(0, 2);
              const accent = ["project-card-cyan", "project-card-blue", "project-card-violet", "project-card-teal", "project-card-amber", "project-card-pink"][index % 6];
              return <article key={repository.id} className={"project-card " + accent + " group relative flex min-h-60 flex-col overflow-hidden rounded-2xl border p-5"}>
                <div className="project-card-sheen pointer-events-none absolute inset-0" />
                <div className="relative flex items-start justify-between gap-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-500">Project / {String(index + 1).padStart(2, "0")}</span>
                  <div className="flex items-center gap-1.5">
                    {repository.homepage && <a href={repository.homepage} target="_blank" rel="noreferrer" aria-label={"Open " + repository.name + " live site"} className="grid size-8 place-items-center rounded-full border border-white/10 text-zinc-400 transition hover:border-current hover:text-current"><ExternalLinkIcon /></a>}
                    <a href={repository.html_url} target="_blank" rel="noreferrer" aria-label={"Open " + repository.name + " source code"} className="grid size-8 place-items-center rounded-full border border-white/10 text-zinc-400 transition hover:border-current hover:text-current"><GitHubIcon /></a>
                  </div>
                </div>
                <h3 className="relative mt-7 text-lg font-semibold tracking-[-0.025em] text-white transition-colors group-hover:text-current">{repository.name.replaceAll("-", " ")}</h3>
                <p className="relative mt-3 line-clamp-3 text-sm leading-5 text-zinc-400">{repository.description || "Explore the repository to learn more about this project, its implementation, and source code."}</p>
                <div className="relative mt-auto flex flex-wrap items-center justify-between gap-2 border-t border-white/[0.07] pt-4 text-[11px] text-zinc-500">
                  <span className="inline-flex items-center gap-2">{repository.language && <><span className="size-2 rounded-full" style={{ backgroundColor: languageColors[repository.language] || "#67e8f9" }} />{repository.language}</>}{!repository.language && "Open source"}</span>
                  <span className="flex items-center gap-2">{repository.stargazers_count > 0 && <span>★ {repository.stargazers_count}</span>}{repository.forks_count > 0 && <span>⑂ {repository.forks_count}</span>}</span>
                </div>
                {tags.length > 0 && <div className="relative mt-3 flex flex-wrap gap-1.5">{tags.map((tag) => <span key={tag} className="rounded-full border border-white/[0.07] bg-white/[0.035] px-2 py-1 text-[9px] text-zinc-500">{tag}</span>)}</div>}
              </article>;
            })}
          </div>
        ) : (
          <div className="mt-10 rounded-2xl border border-dashed border-white/10 px-6 py-14 text-center"><p className="text-zinc-400">GitHub projects are temporarily unavailable.</p><a href={githubProfileUrl} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm text-cyan-300">Browse projects directly on GitHub <ExternalLinkIcon /></a></div>
        )}
      </div>
    </section>
  );
}

export function ProjectsSkeleton() {
  return <section className="projects-section border-t border-white/[0.07] px-5 py-20 sm:px-6 sm:py-24 lg:px-8"><div className="mx-auto max-w-6xl"><div className="h-4 w-36 animate-pulse rounded bg-white/10" /><div className="mt-5 h-10 w-64 animate-pulse rounded-xl bg-white/10" /><div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{[1, 2, 3, 4, 5, 6].map((item) => <div key={item} className="h-60 animate-pulse rounded-2xl border border-white/[0.06] bg-white/[0.03]" />)}</div></div></section>;
}
