import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";
import { practice } from "@/config/practice";
import { useIsMobile } from "@/hooks/use-mobile";

const ContactBar = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-accent text-accent-foreground py-10 md:py-14">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-1">{t("contact_bar.title")}</h2>
            <p className="text-accent-foreground text-sm">{t("contact_bar.subtitle")}</p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <a href={`tel:${practice.phoneFull}`} className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-3 rounded-lg font-semibold text-sm hover:brightness-110 transition-all">
              <Phone className="w-4 h-4" /> {t("contact_bar.call")}
            </a>
            <Link to="/kontakt" className="inline-flex items-center gap-2 text-accent-foreground border-2 border-accent-foreground/40 px-5 py-3 rounded-lg font-semibold text-sm hover:bg-accent-foreground/10 transition-colors">
              <Mail className="w-4 h-4" /> {t("contact_bar.message")}
            </Link>
            <Link to="/anfahrt" className="inline-flex items-center gap-2 text-accent-foreground border-2 border-accent-foreground/40 px-5 py-3 rounded-lg font-semibold text-sm hover:bg-accent-foreground/10 transition-colors">
              <MapPin className="w-4 h-4" /> {t("contact_bar.directions")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactBar;
