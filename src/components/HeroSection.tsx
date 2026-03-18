import { Link } from "react-router-dom";
import { ArrowRight, Calendar } from "lucide-react";
import { useTranslation } from "react-i18next";
import heroImg from "@/assets/praxis-interior.jpg";
import { practice } from "@/config/practice";

const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImg} alt="IDA-Praxis Empfangsbereich" className="w-full h-full object-cover" loading="eager" />
        <div className="absolute inset-0 bg-primary/75" />
      </div>
      <div className="relative container py-24 md:py-36 lg:py-44">
        <div className="max-w-2xl animate-fade-in-up">
          <p className="text-accent font-semibold text-sm md:text-base mb-3 tracking-wide uppercase">
            {t("hero.subtitle")}
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary-foreground leading-tight mb-6 whitespace-pre-line">
            {t("hero.title")}
          </h1>
          <p className="text-primary-foreground/85 text-base md:text-lg leading-relaxed mb-8 max-w-lg">
            {t("hero.description", { doctor1: practice.doctor1, doctor2: practice.doctor2 })}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/kontakt"
              className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors text-sm md:text-base"
            >
              <Calendar className="w-4 h-4" />
              {t("hero.cta_appointment")}
            </Link>
            <Link
              to="/kontakt"
              className="inline-flex items-center gap-2 border-2 border-primary-foreground/40 text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary-foreground/10 transition-colors text-sm md:text-base"
            >
              {t("hero.cta_call")}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
