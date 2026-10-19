import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type GithubResume = { download_url?: string | null; sha?: string };

export async function GET() {
  const token = process.env.GITHUB_ACCESS_TOKEN?.trim();
  const repository = process.env.GITHUB_REPOSITORY?.trim();

  if (!token || !repository || !/^[\w.-]+\/[\w.-]+$/.test(repository)) {
    return NextResponse.json({ available: false });
  }

  try {
    const response = await fetch(`https://api.github.com/repos/${repository}/contents/public/uploads/resume.pdf`, {
      cache: "no-store",
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${token}`,
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });

    if (!response.ok) return NextResponse.json({ available: false });
    const data = await response.json() as GithubResume;
    const downloadUrl = data.download_url && data.sha
      ? `${data.download_url}?v=${encodeURIComponent(data.sha)}`
      : null;
    return NextResponse.json({ available: Boolean(downloadUrl), downloadUrl });
  } catch {
    return NextResponse.json({ available: false });
  }
}
