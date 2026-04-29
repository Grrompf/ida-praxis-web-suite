import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock, Coffee } from "lucide-react";
import { useTranslation } from "react-i18next";
import { practice } from "@/config/practice";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-primary text-primary-foreground" role="contentinfo">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h3 className="text-lg font-bold mb-4">{t("footer.practice_name")}</h3>
            <p className="text-primary-foreground text-sm leading-relaxed">
              {t("footer.practice_desc")}<br />
              {practice.doctor1} & {practice.doctor2}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">{t("footer.contact")}</h3>
            <ul className="space-y-2 text-sm text-primary-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
                {practice.address.street}, {practice.address.zip} {t("common.city_name")}
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
                <a href={`tel:${practice.phoneFull}`} className="hover:text-primary-foreground transition-colors">{practice.phone}</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 shrink-0" aria-hidden="true" />
                <a href={`mailto:${practice.email}`} className="hover:text-primary-foreground transition-colors">{practice.email}</a>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
                {practice.hours}
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">{t("footer.legal")}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/impressum" className="text-primary-foreground hover:text-primary-foreground/80 transition-colors">{t("footer.imprint")}</Link>
              </li>
              <li>
                <Link to="/datenschutz" className="text-primary-foreground hover:text-primary-foreground/80 transition-colors">{t("footer.privacy")}</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-primary-foreground/20 flex flex-col sm:flex-row items-center justify-center gap-3 text-sm text-primary-foreground">
          <span>{t("footer.copyright")}</span>
          <Link
            to="/418"
            aria-label={t("footer.teapot_aria")}
            title={t("footer.teapot_aria")}
            className="opacity-30 hover:opacity-100 focus-visible:opacity-100 transition-opacity duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground rounded-sm p-1"
          >
            <Coffee className="w-3.5 h-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
