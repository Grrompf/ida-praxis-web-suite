import { lazy, Suspense } from "react";
import HeroSection from "@/components/HeroSection";

const ServicesSection = lazy(() => import("@/components/ServicesSection"));
const TeamSection = lazy(() => import("@/components/TeamSection"));
const OfficeHoursSection = lazy(() => import("@/components/OfficeHoursSection"));
const ContactBar = lazy(() => import("@/components/ContactBar"));

const Index = () => (
  <>
    <HeroSection />
    <Suspense fallback={<div className="min-h-[400px] bg-background" />}>
      <ServicesSection />
    </Suspense>
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
