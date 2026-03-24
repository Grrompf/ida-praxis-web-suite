import { useTranslation } from "react-i18next";
import { practice } from "@/config/practice";

const sections = [
  "s1", "s2", "s3", "s3b", "s4", "s5", "s6", "s7", "s8", "s9", "s10",
] as const;

const Datenschutz = () => {
  const { t } = useTranslation();

  return (
    <section className="py-20 md:py-28">
      <div className="container max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">{t("privacy_page.title")}</h1>
        <div className="space-y-6 text-muted-foreground text-sm leading-relaxed">
          {sections.map((key) => (
            <div key={key}>
              <h2 className="text-xl font-bold text-foreground mb-2">{t(`privacy_page.${key}_title`)}</h2>
              {key === "s2" ? (
                <p>
                  {practice.fullName}<br />
                  {practice.doctor1} & {practice.doctor2}<br />
                  {practice.address.street}, {practice.address.zip} {t("common.city_name")}<br />
                  {t("contact.email")}: {practice.email}<br />
                  {t("contact.phone")}: {practice.phone}
                </p>
              ) : (
                <p>{t(`privacy_page.${key}_text`)}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Datenschutz;
