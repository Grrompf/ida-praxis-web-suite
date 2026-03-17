import { Clock } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const OfficeHoursSection = () => {
  const { t } = useTranslation();
  const { ref, isVisible } = useScrollReveal();

  const days = [
    { dayKey: "hours.monday", morning: "08:00 – 12:00", afternoon: "14:00 – 18:00" },
    { dayKey: "hours.tuesday", morning: "08:00 – 12:00", afternoon: "14:00 – 18:00" },
    { dayKey: "hours.wednesday", morning: "08:00 – 12:00", afternoon: null },
    { dayKey: "hours.thursday", morning: "08:00 – 12:00", afternoon: "14:00 – 18:00" },
    { dayKey: "hours.friday", morning: "08:00 – 12:00", afternoon: null },
  ];

  return (
    <section className="py-20 md:py-28 bg-muted/50">
      <div className="container">
        <div
          ref={ref}
          className={`max-w-2xl mx-auto transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="text-center mb-10">
            <p className="text-accent font-semibold text-sm uppercase tracking-wide mb-2">
              {t("hours.label")}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              {t("hours.title")}
            </h2>
          </div>

          <div className="bg-card rounded-xl border shadow-lg overflow-hidden">
            <div className="flex items-center gap-3 bg-primary px-6 py-4">
              <Clock className="w-5 h-5 text-primary-foreground" />
              <span className="font-semibold text-primary-foreground">
                {t("hours.label")}
              </span>
            </div>
            <div className="divide-y divide-border">
              {days.map((d, i) => (
                <div
                  key={d.dayKey}
                  className={`flex items-center justify-between gap-4 px-4 sm:px-6 py-4 ${
                    i % 2 === 0 ? "bg-card" : "bg-muted/30"
                  }`}
                >
                  <span className="font-medium text-foreground shrink-0">{t(d.dayKey)}</span>
                  <span className="text-muted-foreground text-sm text-right">
                    {d.morning}
                    {d.afternoon && (
                      <>
                        <span className="hidden sm:inline"> | </span>
                        <br className="sm:hidden" />
                        {d.afternoon}
                      </>
                    )}
                  </span>
                </div>
              ))}
            </div>
            <div className="px-6 py-4 bg-accent/10 text-center">
              <p className="text-sm text-muted-foreground">{t("hours.note")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OfficeHoursSection;
