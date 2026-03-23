import { lazy, Suspense } from "react";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";

const TeamSection = lazy(() => import("@/components/TeamSection"));
const OfficeHoursSection = lazy(() => import("@/components/OfficeHoursSection"));
const ContactBar = lazy(() => import("@/components/ContactBar"));

const Index = () => (
  <>
    <HeroSection />
    <ServicesSection />
    <Suspense fallback={<div className="min-h-[200px]" />}>
      <TeamSection />
    </Suspense>
    <Suspense fallback={<div className="min-h-[200px]" />}>
      <OfficeHoursSection />
    </Suspense>
    <Suspense fallback={<div className="min-h-[200px]" />}>
      <ContactBar />
    </Suspense>
  </>
);

export default Index;
