"use client";

import { FormEvent, useEffect, useState } from "react";
import { addDoc, collection, limit, onSnapshot, query, serverTimestamp, where } from "firebase/firestore";
import { getFirebaseDb, isFirebaseConfigured } from "@/lib/firebase";
import type { Testimonial } from "@/types/testimonial";

type FormState = "idle" | "submitting" | "success" | "error";

const inputClass = "w-full rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-cyan-300/40 focus:bg-white/[0.05]";

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(isFirebaseConfigured);
  const [loadError, setLoadError] = useState(!isFirebaseConfigured);
  const [formState, setFormState] = useState<FormState>("idle");
  const [carouselPage, setCarouselPage] = useState(0);

  useEffect(() => {
    if (!isFirebaseConfigured) return;
    const db = getFirebaseDb();
    const approvedQuery = query(collection(db, "testimonials"), where("status", "==", "approved"), limit(24));
    return onSnapshot(approvedQuery, (snapshot) => {
      const items = snapshot.docs.map((item) => ({ id: item.id, ...item.data() }) as Testimonial);
      items.sort((a, b) => (b.createdAt?.toMillis() ?? 0) - (a.createdAt?.toMillis() ?? 0));
      setTestimonials(items);
      setLoading(false);
      setLoadError(false);
    }, () => {
      setLoading(false);
      setLoadError(true);
    });
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    if (data.get("website")) {
      setFormState("success");
      form.reset();
      return;
    }
    setFormState("submitting");
    if (!isFirebaseConfigured) {
      setFormState("error");
      return;
    }
    try {
      await addDoc(collection(getFirebaseDb(), "testimonials"), { name: String(data.get("name") || "").trim(), role: String(data.get("role") || "").trim(), company: String(data.get("company") || "").trim(), message: String(data.get("message") || "").trim(), status: "pending", createdAt: serverTimestamp() });
      form.reset();
      setFormState("success");
    } catch {
      setFormState("error");
    }
  }

  const pageCount = Math.max(1, Math.ceil(testimonials.length / 6));
  const activePage = Math.min(carouselPage, pageCount - 1);
  const visibleTestimonials = testimonials.slice(activePage * 6, activePage * 6 + 6);
  const rangeText = testimonials.length ? String(activePage * 6 + 1) + "-" + String(Math.min((activePage + 1) * 6, testimonials.length)) + " of " + String(testimonials.length) : "";

  function goToPage(direction: -1 | 1) {
    setCarouselPage((current) => (current + direction + pageCount) % pageCount);
  }

  return (
    <section id="testimonials" className="relative border-t border-white/[0.07] bg-white/[0.015]">
      <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <h2 className="mb-10 text-center text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">Testimonials</h2>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <h3 className="text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">What people say.</h3>
            <p className="mt-4 max-w-lg text-sm leading-6 text-zinc-400 sm:text-base sm:leading-7">Worked with me? Share an honest note about the experience. Every submission is reviewed before it appears here.</p>
            <form onSubmit={handleSubmit} className="mt-8 space-y-3 rounded-2xl border border-white/[0.08] bg-[#0b0e13] p-5 sm:p-6">
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="sr-only" htmlFor="testimonial-name">Your name</label><input className={inputClass} id="testimonial-name" name="name" placeholder="Your name" minLength={2} maxLength={80} required />
                <label className="sr-only" htmlFor="testimonial-role">Your role</label><input className={inputClass} id="testimonial-role" name="role" placeholder="Role / Position" minLength={2} maxLength={100} required />
              </div>
              <label className="sr-only" htmlFor="testimonial-company">Company</label><input className={inputClass} id="testimonial-company" name="company" placeholder="Company (optional)" maxLength={100} />
              <label className="sr-only" htmlFor="testimonial-message">Testimonial</label><textarea className={inputClass + " min-h-28 resize-y"} id="testimonial-message" name="message" placeholder="Write your testimonial..." minLength={20} maxLength={800} required />
              <div className="hidden" aria-hidden="true"><label htmlFor="website">Website</label><input id="website" name="website" tabIndex={-1} autoComplete="off" /></div>
              <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
                <p aria-live="polite" className={"text-xs " + (formState === "success" ? "text-emerald-300" : formState === "error" ? "text-rose-300" : "text-zinc-600")}>{formState === "success" ? "Thank you! Your testimonial was submitted for review." : formState === "error" ? "Submission failed. Please check your connection and try again." : "Testimonials are published only after approval."}</p>
                <button disabled={formState === "submitting"} className="shrink-0 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-60" type="submit">{formState === "submitting" ? "Submitting..." : "Submit testimonial"}</button>
              </div>
            </form>
          </div>
          <div className="min-w-0">
            <div className="mb-4 flex items-center justify-between gap-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500">Client notes {rangeText}</p>
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => goToPage(-1)} disabled={loading || pageCount === 1} aria-label="Show previous testimonials" className="grid size-9 place-items-center rounded-full border border-white/10 text-zinc-300 transition hover:border-cyan-300/50 hover:text-cyan-300 disabled:cursor-not-allowed disabled:opacity-35">←</button>
                <button type="button" onClick={() => goToPage(1)} disabled={loading || pageCount === 1} aria-label="Show next testimonials" className="grid size-9 place-items-center rounded-full border border-white/10 text-zinc-300 transition hover:border-cyan-300/50 hover:text-cyan-300 disabled:cursor-not-allowed disabled:opacity-35">→</button>
              </div>
            </div>
            <div key={activePage} className="testimonial-carousel-grid grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {loading && Array.from({ length: 6 }, (_, index) => <div key={index} className="h-44 animate-pulse rounded-2xl border border-white/[0.06] bg-white/[0.03]" />)}
              {!loading && visibleTestimonials.map((testimonial) => <article key={testimonial.id} className="flex min-h-44 flex-col rounded-2xl border border-white/[0.08] bg-[#0b0e13] p-4 sm:p-5"><span className="font-serif text-3xl leading-none text-cyan-300/40">“</span><blockquote className="mt-1 line-clamp-4 text-xs leading-5 text-zinc-300 sm:text-sm">{testimonial.message}</blockquote><div className="mt-auto border-t border-white/[0.07] pt-3"><p className="text-sm font-semibold text-white">{testimonial.name}</p><p className="mt-1 truncate text-xs text-zinc-500">{testimonial.role}{testimonial.company ? " · " + testimonial.company : ""}</p></div></article>)}
              {!loading && testimonials.length === 0 && !loadError && <div className="rounded-2xl border border-dashed border-white/10 p-8 text-center text-sm leading-6 text-zinc-500 sm:col-span-2 xl:col-span-3">No published testimonials yet. Be the first to submit one.</div>}
              {loadError && <div className="rounded-2xl border border-rose-300/10 bg-rose-300/[0.03] p-8 text-center text-sm text-zinc-500 sm:col-span-2 xl:col-span-3">Testimonials could not be loaded. Check the Firestore rules and try again.</div>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
