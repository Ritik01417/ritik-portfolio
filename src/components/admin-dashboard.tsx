"use client";

import { type ChangeEvent, useEffect, useMemo, useState } from "react";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import { collection, deleteDoc, doc, onSnapshot, updateDoc } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getFirebaseAuth, getFirebaseDb, isAdminEmail, isFirebaseConfigured } from "@/lib/firebase";
import type { Testimonial, TestimonialStatus } from "@/types/testimonial";

const tabs: Array<TestimonialStatus | "all"> = ["pending", "approved", "rejected", "all"];
type ResumeStatus = { available: boolean; fileName: string | null };
type ResumeApiResponse = ResumeStatus & { error?: string; message?: string };

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [authorized, setAuthorized] = useState<boolean | null>(isFirebaseConfigured ? null : false);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [activeTab, setActiveTab] = useState<TestimonialStatus | "all">("pending");
  const [notice, setNotice] = useState(isFirebaseConfigured ? "" : "Firebase configuration is missing from .env.local.");
  const [resume, setResume] = useState<ResumeStatus>({ available: false, fileName: null });
  const [uploadingResume, setUploadingResume] = useState(false);

  useEffect(() => {
    if (!isFirebaseConfigured) return;
    const auth = getFirebaseAuth();
    return onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        router.replace("/admin/login");
        return;
      }
      if (!isAdminEmail(currentUser.email)) {
        await signOut(auth);
        router.replace("/admin/login");
        return;
      }
      setUser(currentUser);
      setAuthorized(true);
    });
  }, [router]);

  useEffect(() => {
    if (!authorized) return;
    return onSnapshot(collection(getFirebaseDb(), "testimonials"), (snapshot) => {
      const items = snapshot.docs.map((item) => ({ id: item.id, ...item.data() }) as Testimonial);
      items.sort((a, b) => (b.createdAt?.toMillis() ?? 0) - (a.createdAt?.toMillis() ?? 0));
      setTestimonials(items);
    }, () => setNotice("Unable to load testimonials. Verify your Firestore rules."));
  }, [authorized]);

  async function resumeRequest(method: "GET" | "POST" | "DELETE", body?: FormData) {
    if (!user) throw new Error("Your admin session has not loaded yet.");
    const idToken = await user.getIdToken();
    const response = await fetch("/api/admin/resume", {
      method,
      headers: { Authorization: `Bearer ${idToken}` },
      ...(body ? { body } : {}),
    });
    const data = await response.json() as ResumeApiResponse;
    if (!response.ok) throw new Error(data.error || "The resume request failed.");
    return data;
  }

  useEffect(() => {
    if (!authorized || !user) return;
    void resumeRequest("GET")
      .then((data) => setResume({ available: data.available, fileName: data.fileName }))
      .catch((error: unknown) => setNotice(error instanceof Error ? error.message : "Unable to check the current resume."));
  // resumeRequest uses the current Firebase user and is intentionally called after sign-in.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authorized, user]);

  const visibleTestimonials = useMemo(() => activeTab === "all" ? testimonials : testimonials.filter((item) => item.status === activeTab), [activeTab, testimonials]);

  async function changeStatus(id: string, status: TestimonialStatus) {
    setNotice("");
    try {
      await updateDoc(doc(getFirebaseDb(), "testimonials", id), { status });
      setNotice(`Testimonial marked as ${status}.`);
    } catch {
      setNotice("The testimonial could not be updated.");
    }
  }

  async function removeTestimonial(id: string) {
    if (!window.confirm("Permanently delete this testimonial?")) return;
    try {
      await deleteDoc(doc(getFirebaseDb(), "testimonials", id));
      setNotice("Testimonial deleted.");
    } catch {
      setNotice("The testimonial could not be deleted.");
    }
  }

  async function uploadResume(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if ((!file.type.includes("pdf") && !file.name.toLowerCase().endsWith(".pdf")) || file.size > 5 * 1024 * 1024) {
      setNotice("Please select a PDF resume smaller than 5 MB.");
      return;
    }

    setUploadingResume(true);
    setNotice("");
    try {
      const formData = new FormData();
      formData.set("resume", file);
      const data = await resumeRequest("POST", formData);
      setResume({ available: data.available, fileName: data.fileName });
      setNotice(data.message || "Resume committed to GitHub. It will be available after deployment.");
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "CV upload failed.");
    } finally {
      setUploadingResume(false);
    }
  }

  async function deleteResume() {
    if (!window.confirm("Remove the current resume from the portfolio repository?")) return;
    setUploadingResume(true);
    setNotice("");
    try {
      const data = await resumeRequest("DELETE");
      setResume({ available: false, fileName: null });
      setNotice(data.message || "Resume removal was committed to GitHub.");
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "CV deletion failed.");
    } finally {
      setUploadingResume(false);
    }
  }

  if (authorized === null) return <div className="grid min-h-screen place-items-center bg-[#07090d] text-sm text-zinc-500">Checking administrator access...</div>;
  if (authorized === false) return <div className="grid min-h-screen place-items-center bg-[#07090d] px-6 text-center text-sm leading-6 text-rose-300">{notice || "Administrator access is unavailable."}</div>;

  return (
    <main className="min-h-screen bg-[#07090d] px-5 py-8 text-white sm:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-col justify-between gap-5 border-b border-white/10 pb-7 sm:flex-row sm:items-center">
          <div><p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-300">Admin workspace</p><h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">Portfolio management</h1><p className="mt-2 text-xs text-zinc-500">Signed in as {user?.email}</p></div>
          <div className="flex gap-3"><Link href="/" className="rounded-full border border-white/10 px-4 py-2 text-xs text-zinc-300 transition hover:border-white/30">View portfolio</Link><button onClick={() => signOut(getFirebaseAuth())} className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-zinc-950">Sign out</button></div>
        </header>

        {notice && <p aria-live="polite" className="mt-5 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-xs text-zinc-300">{notice}</p>}

        <section className="mt-7 rounded-2xl border border-cyan-300/15 bg-cyan-300/[0.04] p-5 sm:p-6">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <div><p className="font-mono text-[10px] uppercase tracking-[0.18em] text-cyan-300">Portfolio CV</p><h2 className="mt-2 text-lg font-semibold">Publish the downloadable resume</h2><p className="mt-1 text-xs text-zinc-500">{resume.available ? "Live repository file: public/uploads/resume.pdf" : "No CV is published yet."}</p></div>
            <div className="flex flex-wrap gap-2"><label className="inline-flex cursor-pointer items-center justify-center rounded-full bg-cyan-300 px-4 py-2.5 text-xs font-semibold text-cyan-950 transition hover:bg-cyan-200"><input type="file" accept="application/pdf" onChange={uploadResume} disabled={uploadingResume} className="sr-only" />{uploadingResume ? "Publishing..." : resume.available ? "Replace CV" : "Upload CV"}</label>{resume.available && <button type="button" onClick={deleteResume} disabled={uploadingResume} className="rounded-full border border-rose-300/30 px-4 py-2.5 text-xs font-semibold text-rose-200 transition hover:bg-rose-300/10 disabled:opacity-50">Delete CV</button>}</div>
          </div>
          <p className="mt-4 text-[10px] uppercase tracking-[0.12em] text-zinc-600">PDF only · maximum size 5 MB · commits to GitHub, then your host deploys it</p>
        </section>

        <div className="mt-7 flex flex-wrap gap-2">{tabs.map((tab) => {
          const count = tab === "all" ? testimonials.length : testimonials.filter((item) => item.status === tab).length;
          return <button key={tab} onClick={() => setActiveTab(tab)} className={activeTab === tab ? "rounded-full bg-cyan-300 px-4 py-2 text-xs capitalize text-zinc-950 transition" : "rounded-full border border-white/10 px-4 py-2 text-xs capitalize text-zinc-400 transition hover:text-white"}>{tab} <span className="ml-1 opacity-60">{count}</span></button>;
        })}</div>

        <div className="mt-7 grid gap-4 lg:grid-cols-2">{visibleTestimonials.map((testimonial) => <article key={testimonial.id} className="rounded-2xl border border-white/[0.08] bg-[#0b0e13] p-5 sm:p-6"><div className="flex items-start justify-between gap-4"><div><h2 className="font-semibold">{testimonial.name}</h2><p className="mt-1 text-xs text-zinc-500">{testimonial.role}{testimonial.company ? ` · ${testimonial.company}` : ""}</p></div><span className={testimonial.status === "approved" ? "rounded-full bg-emerald-300/10 px-2.5 py-1 text-[10px] capitalize text-emerald-300" : testimonial.status === "rejected" ? "rounded-full bg-rose-300/10 px-2.5 py-1 text-[10px] capitalize text-rose-300" : "rounded-full bg-amber-300/10 px-2.5 py-1 text-[10px] capitalize text-amber-300"}>{testimonial.status}</span></div><p className="mt-5 text-sm leading-6 text-zinc-300">{testimonial.message}</p><p className="mt-4 text-[10px] text-zinc-600">{testimonial.createdAt?.toDate().toLocaleString() || "Just submitted"}</p><div className="mt-5 flex flex-wrap gap-2 border-t border-white/[0.07] pt-5">{testimonial.status !== "approved" && <button onClick={() => changeStatus(testimonial.id, "approved")} className="rounded-lg bg-emerald-300 px-3 py-2 text-xs font-semibold text-emerald-950">Approve</button>}{testimonial.status !== "rejected" && <button onClick={() => changeStatus(testimonial.id, "rejected")} className="rounded-lg border border-amber-300/20 px-3 py-2 text-xs text-amber-200">Reject</button>}<button onClick={() => removeTestimonial(testimonial.id)} className="ml-auto rounded-lg border border-rose-300/20 px-3 py-2 text-xs text-rose-300">Delete</button></div></article>)}</div>
        {visibleTestimonials.length === 0 && <div className="mt-7 rounded-2xl border border-dashed border-white/10 py-16 text-center text-sm text-zinc-500">No {activeTab === "all" ? "" : activeTab} testimonials found.</div>}
      </div>
    </main>
  );
}
