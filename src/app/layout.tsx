import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ritik Kamwal | Full-stack Developer",
  description:
    "Ritik Kamwal builds thoughtful, scalable digital products and modern web experiences.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
