import { useTranslation } from "react-i18next";
import { practice } from "@/config/practice";

const Impressum = () => {
  const { t } = useTranslation();

  return (
    <section className="py-20 md:py-28">
      <div className="container max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">{t("imprint.title")}</h1>
        <div className="prose prose-sm max-w-none text-foreground space-y-6">
          <div>
            <h2 className="text-xl font-bold mb-2">{t("imprint.legal_notice")}</h2>
            <p className="text-muted-foreground leading-relaxed">
              {practice.fullName}<br />
              {practice.doctor1} & {practice.doctor2}<br />
              {practice.address.street}<br />
              {practice.address.zip} {t("common.city_name")}
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-2">{t("imprint.contact")}</h2>
            <p className="text-muted-foreground">
              {t("contact.phone")}: {practice.phone}<br />
              {t("contact.fax")}: {practice.fax}<br />
              {t("contact.email")}: {practice.email}
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-2">{t("imprint.profession_title")}</h2>
            <p className="text-muted-foreground whitespace-pre-line">{t("imprint.profession_desc")}</p>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-2">{t("imprint.regulations_title")}</h2>
            <p className="text-muted-foreground whitespace-pre-line">{t("imprint.regulations_desc")}</p>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-2">{t("imprint.disclaimer_title")}</h2>
            <p className="text-muted-foreground leading-relaxed">{t("imprint.disclaimer_desc")}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Impressum;
