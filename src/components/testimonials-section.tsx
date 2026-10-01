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

  useEffect(() => {
    if (!isFirebaseConfigured) {
      return;
    }
    const db = getFirebaseDb();
    const approvedQuery = query(collection(db, "testimonials"), where("status", "==", "approved"), limit(12));
    return onSnapshot(
      approvedQuery,
      (snapshot) => {
        const items = snapshot.docs.map((item) => ({ id: item.id, ...item.data() }) as Testimonial);
        items.sort((a, b) => (b.createdAt?.toMillis() ?? 0) - (a.createdAt?.toMillis() ?? 0));
        setTestimonials(items);
        setLoading(false);
        setLoadError(false);
      },
      () => {
        setLoading(false);
        setLoadError(true);
      },
    );
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    // Honeypot: bots commonly fill fields hidden from real users.
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
      const db = getFirebaseDb();
      await addDoc(collection(db, "testimonials"), {
        name: String(data.get("name") || "").trim(),
        role: String(data.get("role") || "").trim(),
        company: String(data.get("company") || "").trim(),
        message: String(data.get("message") || "").trim(),
        status: "pending",
        createdAt: serverTimestamp(),
      });
      form.reset();
      setFormState("success");
    } catch {
      setFormState("error");
    }
  }

  return (
    <section id="testimonials" className="relative border-t border-white/[0.07] bg-white/[0.015]">
      <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-cyan-300">04 / Testimonials</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">What people say.</h2>
            <p className="mt-4 max-w-lg text-sm leading-6 text-zinc-400 sm:text-base sm:leading-7">Worked with me? Share an honest note about the experience. Every submission is reviewed before it appears here.</p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-3 rounded-2xl border border-white/[0.08] bg-[#0b0e13] p-5 sm:p-6">
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="sr-only" htmlFor="testimonial-name">Your name</label>
                <input className={inputClass} id="testimonial-name" name="name" placeholder="Your name" minLength={2} maxLength={80} required />
                <label className="sr-only" htmlFor="testimonial-role">Your role</label>
                <input className={inputClass} id="testimonial-role" name="role" placeholder="Role / Position" minLength={2} maxLength={100} required />
              </div>
              <label className="sr-only" htmlFor="testimonial-company">Company</label>
              <input className={inputClass} id="testimonial-company" name="company" placeholder="Company (optional)" maxLength={100} />
              <label className="sr-only" htmlFor="testimonial-message">Testimonial</label>
              <textarea className={`${inputClass} min-h-28 resize-y`} id="testimonial-message" name="message" placeholder="Write your testimonial..." minLength={20} maxLength={800} required />
              <div className="hidden" aria-hidden="true"><label htmlFor="website">Website</label><input id="website" name="website" tabIndex={-1} autoComplete="off" /></div>

              <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
                <p aria-live="polite" className={`text-xs ${formState === "success" ? "text-emerald-300" : formState === "error" ? "text-rose-300" : "text-zinc-600"}`}>
                  {formState === "success" && "Thank you! Your testimonial was submitted for review."}
                  {formState === "error" && "Submission failed. Please check your connection and try again."}
                  {(formState === "idle" || formState === "submitting") && "Testimonials are published only after approval."}
                </p>
                <button disabled={formState === "submitting"} className="shrink-0 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-60" type="submit">
                  {formState === "submitting" ? "Submitting..." : "Submit testimonial"}
                </button>
              </div>
            </form>
          </div>

          <div className="grid content-start gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {loading && [1, 2].map((item) => <div key={item} className="h-52 animate-pulse rounded-2xl border border-white/[0.06] bg-white/[0.03]" />)}
            {!loading && testimonials.map((testimonial) => (
              <article key={testimonial.id} className="flex min-h-52 flex-col rounded-2xl border border-white/[0.08] bg-[#0b0e13] p-6">
                <span className="font-serif text-4xl leading-none text-cyan-300/40">“</span>
                <blockquote className="mt-2 text-sm leading-6 text-zinc-300">{testimonial.message}</blockquote>
                <div className="mt-auto border-t border-white/[0.07] pt-5">
                  <p className="text-sm font-semibold text-white">{testimonial.name}</p>
                  <p className="mt-1 text-xs text-zinc-500">{testimonial.role}{testimonial.company ? ` · ${testimonial.company}` : ""}</p>
                </div>
              </article>
            ))}
            {!loading && testimonials.length === 0 && !loadError && <div className="rounded-2xl border border-dashed border-white/10 p-8 text-center text-sm leading-6 text-zinc-500 sm:col-span-2 lg:col-span-1 xl:col-span-2">No published testimonials yet. Be the first to submit one.</div>}
            {loadError && <div className="rounded-2xl border border-rose-300/10 bg-rose-300/[0.03] p-8 text-center text-sm text-zinc-500 sm:col-span-2 lg:col-span-1 xl:col-span-2">Testimonials could not be loaded. Check the Firestore rules and try again.</div>}
          </div>
        </div>
      </div>
    </section>
  );
}
