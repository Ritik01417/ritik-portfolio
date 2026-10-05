import { Suspense } from "react";
import AboutSection from "@/components/about-section";
import ExpertiseSection from "@/components/expertise-section";
import Footer from "@/components/footer";
import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import ProjectsSection, { ProjectsSkeleton } from "@/components/projects-section";
import ServicesSection from "@/components/services-section";
import SectionAnimations from "@/components/section-animations";
import SocialLauncher from "@/components/social-launcher";
import TestimonialsSection from "@/components/testimonials-section";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#07090d] text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_75%_12%,rgba(42,107,255,0.13),transparent_28%),radial-gradient(circle_at_12%_65%,rgba(0,211,167,0.07),transparent_25%)]" />
      <SectionAnimations />
      <Header />
      <HeroSection />
      <AboutSection />
      <ExpertiseSection />
      <ServicesSection />
      <Suspense fallback={<ProjectsSkeleton />}>
        <ProjectsSection />
      </Suspense>
      <TestimonialsSection />
      <Footer />
      <SocialLauncher />
    </main>
  );
}
