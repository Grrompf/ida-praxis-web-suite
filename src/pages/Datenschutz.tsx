import { useTranslation } from "react-i18next";
import { practice } from "@/config/practice";

const Datenschutz = () => {
  const { t } = useTranslation();

  return (
    <section className="py-20 md:py-28">
      <div className="container max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">{t("privacy_page.title")}</h1>
        <div className="space-y-6 text-muted-foreground text-sm leading-relaxed">
          <div>
            <h2 className="text-xl font-bold text-foreground mb-2">{t("privacy_page.s1_title")}</h2>
            <p>{t("privacy_page.s1_text")}</p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground mb-2">{t("privacy_page.s2_title")}</h2>
            <p>
              {practice.fullName}<br />
              {practice.doctor1} & {practice.doctor2}<br />
              {practice.address.street}, {practice.address.zipCity}<br />
              {t("contact.email")}: {practice.email}<br />
              {t("contact.phone")}: {practice.phone}
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground mb-2">{t("privacy_page.s3_title")}</h2>
            <p>{t("privacy_page.s3_text")}</p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground mb-2">{t("privacy_page.s4_title")}</h2>
            <p>{t("privacy_page.s4_text")}</p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground mb-2">{t("privacy_page.s5_title")}</h2>
            <p>{t("privacy_page.s5_text")}</p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground mb-2">{t("privacy_page.s6_title")}</h2>
            <p>{t("privacy_page.s6_text")}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Datenschutz;
