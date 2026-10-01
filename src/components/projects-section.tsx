import { getPublicRepositories, githubProfileUrl } from "@/lib/github";

const languageColors: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572a5",
  Java: "#b07219",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Dart: "#00b4ab",
};

function ExternalLinkIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M7 17 17 7M7 7h10v10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="currentColor">
      <path d="M12 .7a11.5 11.5 0 0 0-3.64 22.4c.58.1.79-.25.79-.56v-2.23c-3.22.7-3.9-1.37-3.9-1.37-.52-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.57-.3-5.28-1.29-5.28-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.47.11-3.05 0 0 .97-.31 3.16 1.18a10.9 10.9 0 0 1 5.76 0c2.2-1.49 3.16-1.18 3.16-1.18.63 1.58.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.71 5.39-5.29 5.68.42.36.79 1.07.79 2.16v3.2c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .7Z" />
    </svg>
  );
}

export default async function ProjectsSection() {
  const repositories = await getPublicRepositories();

  return (
    <section id="projects" className="relative border-t border-white/[0.07] bg-[#080b10]">
      <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-cyan-300">02 / Selected projects</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">Things I&apos;ve built.</h2>
            <p className="mt-4 max-w-xl text-sm leading-6 text-zinc-400 sm:text-base sm:leading-7">A live selection of my public GitHub work, refreshed automatically as I build and ship new projects.</p>
          </div>
          <a href={githubProfileUrl} target="_blank" rel="noreferrer" className="inline-flex w-fit items-center gap-2 text-sm font-medium text-zinc-300 transition hover:text-cyan-300">
            <GitHubIcon /> View GitHub profile <ExternalLinkIcon />
          </a>
        </div>

        {repositories.length > 0 ? (
          <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {repositories.map((repository, index) => {
              const tags = repository.topics.slice(0, 3);
              return (
                <article key={repository.id} className="group flex min-h-60 flex-col rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.045] to-white/[0.015] p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/25">
                  <div className="flex items-start justify-between gap-4">
                    <span className="font-mono text-xs text-zinc-600">PROJECT / {String(index + 1).padStart(2, "0")}</span>
                    <div className="flex items-center gap-2">
                      {repository.homepage && (
                        <a href={repository.homepage} target="_blank" rel="noreferrer" aria-label={`Open ${repository.name} live site`} className="grid size-9 place-items-center rounded-full border border-white/10 text-zinc-400 transition hover:border-cyan-300/30 hover:text-cyan-300"><ExternalLinkIcon /></a>
                      )}
                      <a href={repository.html_url} target="_blank" rel="noreferrer" aria-label={`Open ${repository.name} source code`} className="grid size-9 place-items-center rounded-full border border-white/10 text-zinc-400 transition hover:border-cyan-300/30 hover:text-cyan-300"><GitHubIcon /></a>
                    </div>
                  </div>

                  <h3 className="mt-6 text-lg font-semibold tracking-[-0.02em] transition-colors group-hover:text-cyan-200">{repository.name.replaceAll("-", " ")}</h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-zinc-500">{repository.description || "Explore the repository to learn more about this project, its implementation, and source code."}</p>

                  <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-8 text-xs text-zinc-500">
                    {repository.language && <span className="inline-flex items-center gap-2"><span className="size-2 rounded-full" style={{ backgroundColor: languageColors[repository.language] || "#67e8f9" }} />{repository.language}</span>}
                    {repository.stargazers_count > 0 && <span>★ {repository.stargazers_count}</span>}
                    {repository.forks_count > 0 && <span>⑂ {repository.forks_count}</span>}
                  </div>

                  {tags.length > 0 && <div className="mt-4 flex flex-wrap gap-2">{tags.map((tag) => <span key={tag} className="rounded-full bg-white/[0.05] px-2.5 py-1 text-[10px] text-zinc-500">{tag}</span>)}</div>}
                </article>
              );
            })}
          </div>
        ) : (
          <div className="mt-10 rounded-2xl border border-dashed border-white/10 px-6 py-14 text-center">
            <p className="text-zinc-400">GitHub projects are temporarily unavailable.</p>
            <a href={githubProfileUrl} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm text-cyan-300">Browse projects directly on GitHub <ExternalLinkIcon /></a>
          </div>
        )}
      </div>
    </section>
  );
}

export function ProjectsSkeleton() {
  return (
    <section className="border-t border-white/[0.07] bg-[#080b10] px-5 py-20 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-6xl"><div className="h-4 w-36 animate-pulse rounded bg-white/10" /><div className="mt-5 h-10 w-64 animate-pulse rounded-xl bg-white/10" /><div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{[1, 2, 3].map((item) => <div key={item} className="h-60 animate-pulse rounded-2xl border border-white/[0.06] bg-white/[0.03]" />)}</div></div>
    </section>
  );
}
