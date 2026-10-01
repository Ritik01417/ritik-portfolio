import type { Metadata } from "next";
import AdminDashboard from "@/components/admin-dashboard";

export const metadata: Metadata = { title: "Testimonial Dashboard | Ritik Kamwal", robots: { index: false, follow: false } };

export default function AdminDashboardPage() {
  return <AdminDashboard />;
}
