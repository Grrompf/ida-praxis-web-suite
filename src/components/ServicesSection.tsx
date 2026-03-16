import { Heart, Activity, Baby, Stethoscope, Pill, ShieldCheck } from "lucide-react";
import { useTranslation } from "react-i18next";

const ServicesSection = () => {
  const { t } = useTranslation();

  const services = [
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
        <div className="text-center mb-14">
          <p className="text-accent font-semibold text-sm uppercase tracking-wide mb-2">{t("services.label")}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">{t("services.title")}</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <div
              key={s.titleKey}
              className="bg-card rounded-xl p-6 border hover:shadow-lg hover:border-accent/30 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                <s.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-bold text-foreground mb-2">{t(s.titleKey)}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{t(s.descKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
