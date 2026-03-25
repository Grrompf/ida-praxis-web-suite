import { lazy, Suspense } from "react";
import HeroSection from "@/components/HeroSection";

const ServicesSection = lazy(() => import("@/components/ServicesSection"));
const TeamSection = lazy(() => import("@/components/TeamSection"));
const OfficeHoursSection = lazy(() => import("@/components/OfficeHoursSection"));
const GallerySection = lazy(() => import("@/components/GallerySection"));
const FaqSection = lazy(() => import("@/components/FaqSection"));
const NewsSection = lazy(() => import("@/components/NewsSection"));
const ContactBar = lazy(() => import("@/components/ContactBar"));

const Index = () => (
  <>
    <HeroSection />
    <Suspense fallback={<div className="min-h-[400px]" />}>
      <ServicesSection />
    </Suspense>
    <Suspense fallback={<div className="min-h-[200px]" />}>
      <TeamSection />
    </Suspense>
    <Suspense fallback={<div className="min-h-[200px]" />}>
      <OfficeHoursSection />
    </Suspense>
    <Suspense fallback={<div className="min-h-[300px]" />}>
      <GallerySection />
    </Suspense>
    <Suspense fallback={<div className="min-h-[300px]" />}>
      <FaqSection />
    </Suspense>
    <Suspense fallback={<div className="min-h-[200px]" />}>
      <ContactBar />
    </Suspense>
  </>
);

export default Index;
