import { Heart, Activity, Baby, Stethoscope, Pill, ShieldCheck, UserCheck } from "lucide-react";
import { useTranslation } from "react-i18next";
import diabetologieImg from "@/assets/diabetologie-symbol.webp";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const RevealCard = ({ children, delay }: { children: React.ReactNode; delay: number }) => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const ServicesSection = () => {
  const { t } = useTranslation();
  const heroReveal = useScrollReveal();

  const services = [
    { icon: UserCheck, titleKey: "services.general", descKey: "services.general_desc" },
    { icon: Activity, titleKey: "services.diabetology", descKey: "services.diabetology_desc" },
    { icon: Baby, titleKey: "services.gestational", descKey: "services.gestational_desc" },
    { icon: Stethoscope, titleKey: "services.internal", descKey: "services.internal_desc" },
    { icon: Heart, titleKey: "services.cardio", descKey: "services.cardio_desc" },
    { icon: Pill, titleKey: "services.metabolism", descKey: "services.metabolism_desc" },
    { icon: ShieldCheck, titleKey: "services.checkup", descKey: "services.checkup_desc" },
  ];

  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <div
          ref={heroReveal.ref}
          className={`grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-14 transition-all duration-700 ease-out ${
            heroReveal.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <img
                src={diabetologieImg}
                alt="Diabetologie – Blutzuckermessgerät und grüner Apfel"
                className="w-full h-64 md:h-80 object-cover"
                width={600}
                height={450}
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
            </div>
          </div>
          <div className="lg:col-span-7 order-1 lg:order-2">
            <p className="text-accent font-semibold text-sm uppercase tracking-wide mb-2">{t("services.label")}</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t("services.title")}</h2>
            <p className="text-muted-foreground leading-relaxed max-w-xl">{t("services.diabetology_desc")}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <RevealCard key={s.titleKey} delay={i * 100}>
              <div className="bg-card rounded-xl p-6 border hover:shadow-lg hover:border-accent/30 transition-all duration-300 group h-full">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <s.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-bold text-foreground mb-2">{t(s.titleKey)}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{t(s.descKey)}</p>
              </div>
            </RevealCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
