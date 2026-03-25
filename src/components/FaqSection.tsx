import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ChevronDown } from "lucide-react";

const faqKeys = [
  "first_visit",
  "parking",
  "insurance",
  "prescription",
  "appointment",
  "documents",
] as const;

const FaqItem = ({ qKey }: { qKey: string }) => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left bg-card hover:bg-muted/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        aria-expanded={open}
      >
        <span className="text-sm md:text-base font-semibold text-foreground">
          {t(`faq.${qKey}_q`)}
        </span>
        <ChevronDown
          className={`w-5 h-5 shrink-0 text-muted-foreground transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        />
      </button>
      <div
        className={`grid transition-all duration-200 ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
        role="region"
      >
        <div className="overflow-hidden">
          <p className="px-5 pb-4 pt-1 text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
            {t(`faq.${qKey}_a`)}
          </p>
        </div>
      </div>
    </div>
  );
};

const FaqSection = () => {
  const { t } = useTranslation();

  return (
    <section className="py-16 md:py-24" aria-label={t("faq.label")}>
      <div className="container max-w-3xl">
        <div className="text-center mb-10">
          <span className="text-sm font-semibold text-accent uppercase tracking-wider">
            {t("faq.label")}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
            {t("faq.title")}
          </h2>
        </div>
        <div className="flex flex-col gap-3">
          {faqKeys.map((key) => (
            <FaqItem key={key} qKey={key} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
