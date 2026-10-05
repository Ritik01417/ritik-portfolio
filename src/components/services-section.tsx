import type { ReactNode } from "react";

type Service = {
  title: string;
  description: string;
  features: string[];
  icon: ReactNode;
};

const iconClass = "size-8 stroke-current";

const services: Service[] = [
  {
    title: "Mobile & Web Architecture",
    description:
      "Thoughtful application architecture for fast, accessible, and maintainable experiences across web and mobile.",
    features: [
      "Responsive web applications",
      "Scalable frontend systems",
      "Cross-platform mobile flows",
    ],
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className={iconClass} aria-hidden="true">
        <rect x="4" y="5" width="16" height="21" rx="2.5" strokeWidth="1.7" />
        <path d="M4 10h16M9 22h6" strokeWidth="1.7" strokeLinecap="round" />
        <rect x="18" y="11" width="10" height="16" rx="2" fill="#0b0e13" strokeWidth="1.7" />
        <path d="M21.5 23.5h3" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Database Design",
    description:
      "Reliable data models and storage strategies designed for clean access patterns, consistency, and growth.",
    features: [
      "Relational & NoSQL modeling",
      "Query and index optimization",
      "Migration-ready schemas",
    ],
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className={iconClass} aria-hidden="true">
        <ellipse cx="16" cy="7" rx="10" ry="4" strokeWidth="1.7" />
        <path d="M6 7v8c0 2.2 4.5 4 10 4s10-1.8 10-4V7" strokeWidth="1.7" />
        <path d="M6 15v8c0 2.2 4.5 4 10 4s10-1.8 10-4v-8" strokeWidth="1.7" />
      </svg>
    ),
  },
  {
    title: "High-Throughput API Design",
    description:
      "Secure, low-latency APIs built to handle demanding traffic while staying simple for product teams to consume.",
    features: [
      "RESTful & real-time APIs",
      "Caching and rate limiting",
      "Observability & resilient scaling",
    ],
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className={iconClass} aria-hidden="true">
        <rect x="8" y="8" width="16" height="16" rx="3" strokeWidth="1.7" />
        <path d="M12 1v5m8-5v5M12 26v5m8-5v5M1 12h5m-5 8h5m20-8h5m-5 8h5" strokeWidth="1.7" strokeLinecap="round" />
        <path d="m12 17 3-3 2.5 2.5L21 13" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="relative py-20 sm:py-24 lg:py-28">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
        <div className="mb-9 border-t border-white/[0.07] pt-16 sm:mb-11 sm:pt-20">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-cyan-300">
            03 / Services
          </p>
          <div className="mt-4 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <h2 className="max-w-xl text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
              Systems designed to perform and scale.
            </h2>
            <p className="max-w-sm text-sm leading-6 text-zinc-500">
              From product interfaces to the data and APIs behind them, I build dependable foundations for digital products.
            </p>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {services.map((service, index) => (
            <article
              key={service.title}
              className="group relative flex min-h-[420px] flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0b0e13] p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/25 sm:p-7"
            >
              <div className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full bg-cyan-300/[0.05] blur-3xl transition group-hover:bg-cyan-300/[0.09]" />
              <div className="relative grid size-14 place-items-center rounded-2xl border border-cyan-300/20 bg-cyan-300/[0.07] text-cyan-300 shadow-[0_0_28px_rgba(103,232,249,0.06)]">
                {service.icon}
              </div>

              <div className="relative mt-9">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600">
                  Service 0{index + 1}
                </p>
                <h3 className="mt-3 text-2xl font-semibold leading-tight tracking-[-0.03em] text-white">
                  {service.title}
                </h3>
                <p className="mt-4 text-sm leading-6 text-zinc-400">
                  {service.description}
                </p>
              </div>

              <ul className="relative mt-auto space-y-3 border-t border-white/[0.07] pt-6">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm font-medium text-zinc-300">
                    <span className="grid size-4 shrink-0 place-items-center rounded-full border border-cyan-300/45 text-[9px] text-cyan-300">
                      ✓
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
