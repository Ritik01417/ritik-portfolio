import { NextResponse, type NextRequest } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const resumePath = "public/uploads/resume.pdf";
const maxResumeSize = 5 * 1024 * 1024;

type GithubContent = { sha: string };
type FirebaseLookupResponse = { users?: Array<{ email?: string }> };

function getGithubConfig() {
  const token = process.env.GITHUB_ACCESS_TOKEN?.trim();
  const repository = process.env.GITHUB_REPOSITORY?.trim();

  if (!token || !repository || !/^[\w.-]+\/[\w.-]+$/.test(repository)) {
    throw new Error("GitHub resume publishing is not configured.");
  }

  return { token, repository };
}

async function verifyAdmin(request: NextRequest) {
  const idToken = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY?.trim();
  const adminEmail = process.env.NEXT_PUBLIC_FIREBASE_ADMIN_EMAIL?.trim().toLowerCase();

  if (!idToken || !apiKey || !adminEmail) return false;

  const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idToken }),
    cache: "no-store",
  });

  if (!response.ok) return false;
  const data = await response.json() as FirebaseLookupResponse;
  return data.users?.[0]?.email?.trim().toLowerCase() === adminEmail;
}

function unauthorized() {
  return NextResponse.json({ error: "Administrator access is required." }, { status: 401 });
}

async function githubRequest(path: string, init?: RequestInit) {
  const { token, repository } = getGithubConfig();
  return fetch(`https://api.github.com/repos/${repository}/contents/${path}`, {
    ...init,
    cache: "no-store",
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
      ...init?.headers,
    },
  });
}

async function getResumeSha() {
  const response = await githubRequest(resumePath);
  if (response.status === 404) return null;
  if (!response.ok) throw await githubError(response, "read the current resume");
  const data = await response.json() as GithubContent;
  return data.sha;
}

async function githubError(response: Response, action: string) {
  const payload = await response.json().catch(() => null) as { message?: string } | null;
  return new Error(`GitHub could not ${action} (HTTP ${response.status}): ${payload?.message || "unknown error"}`);
}

export async function GET(request: NextRequest) {
  if (!await verifyAdmin(request)) return unauthorized();

  try {
    const sha = await getResumeSha();
    return NextResponse.json({ available: Boolean(sha), fileName: sha ? "resume.pdf" : null });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to check the resume.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!await verifyAdmin(request)) return unauthorized();

  try {
    const formData = await request.formData();
    const file = formData.get("resume");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Select a PDF resume to upload." }, { status: 400 });
    }

    const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
    if (!isPdf || file.size > maxResumeSize) {
      return NextResponse.json({ error: "Use a PDF smaller than 5 MB." }, { status: 400 });
    }

    const existingSha = await getResumeSha();
    const content = Buffer.from(await file.arrayBuffer()).toString("base64");
    const response = await githubRequest(resumePath, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: existingSha ? "Replace portfolio resume" : "Add portfolio resume",
        content,
        ...(existingSha ? { sha: existingSha } : {}),
      }),
    });

    if (!response.ok) throw await githubError(response, "upload the resume. Check the token's Contents read/write permission");
    return NextResponse.json({ available: true, fileName: "resume.pdf", message: "Resume committed to GitHub. It will be available after the next deployment finishes." });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to upload the resume.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  if (!await verifyAdmin(request)) return unauthorized();

  try {
    const sha = await getResumeSha();
    if (!sha) return NextResponse.json({ error: "No resume is currently stored." }, { status: 404 });

    const response = await githubRequest(resumePath, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "Remove portfolio resume", sha }),
    });

    if (!response.ok) throw await githubError(response, "delete the resume. Check the token's Contents read/write permission");
    return NextResponse.json({ available: false, message: "Resume removal committed to GitHub. The change will apply after the next deployment." });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to delete the resume.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
