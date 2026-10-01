import type { Metadata } from "next";
import Link from "next/link";
import AdminLoginForm from "@/components/admin-login-form";

export const metadata: Metadata = { title: "Admin Login | Ritik Kamwal", robots: { index: false, follow: false } };

export default function AdminLoginPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#07090d] px-5 py-12 text-white">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#0b0e13] p-6 shadow-2xl sm:p-8">
        <Link href="/" className="font-mono text-xs text-cyan-300">← Back to portfolio</Link>
        <p className="mt-10 font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">Secure access</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">Admin login</h1>
        <p className="mt-3 text-sm leading-6 text-zinc-500">Sign in with the administrator account configured in Firebase Authentication.</p>
        <AdminLoginForm />
      </div>
    </main>
  );
}
