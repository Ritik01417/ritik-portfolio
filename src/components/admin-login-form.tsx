"use client";

import { FormEvent, useEffect, useState } from "react";
import { FirebaseError } from "firebase/app";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { getFirebaseAuth, isAdminEmail, isFirebaseConfigured } from "@/lib/firebase";

export default function AdminLoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(
    isFirebaseConfigured ? "" : "Firebase is not configured locally. Add your Web app values to .env.local, then restart the development server.",
  );

  useEffect(() => {
    if (!isFirebaseConfigured) {
      return;
    }
    const auth = getFirebaseAuth();
    return onAuthStateChanged(auth, async (user) => {
      if (!user) return;

      if (isAdminEmail(user.email)) {
        router.replace("/admin/dashboard");
      } else {
        await signOut(auth);
      }
    });
  }, [router]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const data = new FormData(event.currentTarget);

    if (!isFirebaseConfigured) {
      setError("Firebase configuration is missing from .env.local.");
      setLoading(false);
      return;
    }

    try {
      const auth = getFirebaseAuth();
      const credential = await signInWithEmailAndPassword(auth, String(data.get("email")), String(data.get("password")));
      if (!isAdminEmail(credential.user.email)) {
        await signOut(auth);
        setError("This account is not authorized as an administrator.");
        return;
      }
      router.replace("/admin/dashboard");
    } catch (error) {
      if (error instanceof FirebaseError && error.code === "auth/invalid-credential") {
        setError("The email or password is incorrect.");
      } else if (error instanceof FirebaseError && error.code === "auth/operation-not-allowed") {
        setError("Email/password sign-in is not enabled in Firebase Authentication.");
      } else {
        setError("Sign-in failed. Check your Firebase configuration, Firestore rules, and administrator record.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-4">
      <div><label htmlFor="email" className="mb-2 block text-xs font-medium text-zinc-400">Email address</label><input id="email" name="email" type="email" autoComplete="email" required className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm outline-none transition focus:border-cyan-300/40" /></div>
      <div><label htmlFor="password" className="mb-2 block text-xs font-medium text-zinc-400">Password</label><input id="password" name="password" type="password" autoComplete="current-password" required className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm outline-none transition focus:border-cyan-300/40" /></div>
      {error && <p role="alert" className="text-xs leading-5 text-rose-300">{error}</p>}
      <button type="submit" disabled={loading || !isFirebaseConfigured} className="w-full rounded-xl bg-white px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-60">{loading ? "Signing in..." : "Sign in to dashboard"}</button>
    </form>
  );
}
