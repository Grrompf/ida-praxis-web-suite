import { useTranslation } from "react-i18next";
import { Calendar, Sun, Newspaper } from "lucide-react";

const icons = { holiday: Calendar, health: Sun, news: Newspaper } as const;

const newsKeys = ["item1", "item2", "item3"] as const;

const NewsSection = () => {
  const { t } = useTranslation();

  return (
    <section className="py-16 md:py-24 bg-muted/50" aria-label={t("news.label")}>
      <div className="container">
        <div className="text-center mb-10">
          <span className="text-sm font-semibold text-accent uppercase tracking-wider">
            {t("news.label")}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
            {t("news.title")}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {newsKeys.map((key) => {
            const type = t(`news.${key}_type`) as keyof typeof icons;
            const Icon = icons[type] || Newspaper;
            return (
              <article
                key={key}
                className="bg-card rounded-xl border border-border p-6 flex flex-col gap-3 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-accent" />
                  </div>
                  <span className="text-xs font-medium text-muted-foreground">
                    {t(`news.${key}_date`)}
                  </span>
                </div>
                <h3 className="text-base font-bold text-foreground leading-snug">
                  {t(`news.${key}_title`)}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t(`news.${key}_text`)}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
