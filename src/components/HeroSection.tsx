import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar } from "lucide-react";
import { useTranslation } from "react-i18next";
import { practice } from "@/config/practice";
import { useIsMobile } from "@/hooks/use-mobile";

const HeroSection = () => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <section className="relative overflow-hidden bg-primary" aria-label="Willkommen">
      {/* Skeleton pulse – visible until hero image loads */}
      {!imgLoaded && (
        <div className="absolute inset-0 animate-pulse" style={{ background: 'linear-gradient(135deg, hsl(204 100% 20%), hsl(204 100% 30%))' }} />
      )}
      <div className="absolute inset-0">
        <img
          src="/hero-960.webp"
          srcSet="/hero-640.webp 640w, /hero-960.webp 960w, /hero-1200.webp 1200w"
          sizes="100vw"
          alt="IDA-Praxis Empfangsbereich"
          className={`w-full h-full object-cover transition-opacity duration-500 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
          width={960}
          height={540}
          loading="eager"
          fetchPriority="high"
          decoding="sync"
          onLoad={() => setImgLoaded(true)}
        />
        <div className="absolute inset-0" style={{ backgroundColor: 'hsl(204 100% 25% / 0.75)' }} />
      </div>
      <div className="relative container py-24 md:py-36 lg:py-44">
        <div className="max-w-2xl">
          <p className="text-primary-foreground/80 font-semibold text-sm md:text-base mb-3 tracking-wide uppercase">
            {t("hero.subtitle")}
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary-foreground leading-tight mb-6 whitespace-pre-line">
            {t("hero.title")}
          </h1>
          <p className="text-primary-foreground/85 text-base md:text-lg leading-relaxed mb-8 max-w-lg" style={{ contentVisibility: 'auto' }}>
            {t("hero.description", { doctor1: practice.doctor1, doctor2: practice.doctor2 })}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/termin"
              className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-lg font-semibold hover:brightness-110 transition-all text-sm md:text-base"
            >
              <Calendar className="w-4 h-4" />
              {t("hero.cta_appointment")}
            </Link>
            {isMobile ? (
              <a
                href={`tel:${practice.phoneFull}`}
                className="inline-flex items-center gap-2 border-2 border-primary-foreground/40 text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary-foreground/10 transition-colors text-sm md:text-base"
              >
                {t("hero.cta_call")}
                <ArrowRight className="w-4 h-4" />
              </a>
            ) : (
              <Link
                to="/kontakt"
                className="inline-flex items-center gap-2 border-2 border-primary-foreground/40 text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary-foreground/10 transition-colors text-sm md:text-base"
              >
                {t("hero.cta_call")}
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
