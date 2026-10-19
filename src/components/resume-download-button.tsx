"use client";

import { useEffect, useState } from "react";

type ResumeResponse = { available?: boolean; downloadUrl?: string };

export default function ResumeDownloadButton() {
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/resume", { cache: "no-store" })
      .then((response) => response.ok ? response.json() as Promise<ResumeResponse> : null)
      .then((data) => setDownloadUrl(data?.available && data.downloadUrl ? data.downloadUrl : null))
      .catch(() => setDownloadUrl(null));
  }, []);

  const className = "group mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border border-slate-500/25 bg-white/55 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-cyan-500/40 hover:bg-white/80 disabled:cursor-not-allowed disabled:opacity-55";

  if (!downloadUrl) {
    return <button type="button" disabled className={className}>Download CV <span aria-hidden="true">↓</span></button>;
  }

  return <a href={downloadUrl} download="Ritik-Kamwal-CV.pdf" target="_blank" rel="noreferrer" className={className}>Download CV <span className="transition-transform group-hover:translate-y-0.5" aria-hidden="true">↓</span></a>;
}
