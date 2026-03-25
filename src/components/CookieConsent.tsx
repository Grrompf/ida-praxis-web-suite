import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Shield } from "lucide-react";

const CONSENT_KEY = "ida-cookie-consent";

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY);
    if (!consent) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem(CONSENT_KEY, "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 p-4 md:p-6" role="dialog" aria-label="Cookie-Hinweis" aria-modal="false">
      <div className="container max-w-4xl">
        <div className="bg-card border rounded-xl shadow-lg p-5 md:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <Shield className="w-6 h-6 text-accent shrink-0 mt-0.5 sm:mt-0" />
          <div className="flex-1 text-sm text-muted-foreground">
            <p>
              {t("cookie.text")}{" "}
              <Link to="/datenschutz" className="text-primary underline hover:text-primary/80">
                {t("cookie.more")}
              </Link>
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <button
              onClick={decline}
              className="px-4 py-2 rounded-lg text-sm font-semibold border border-border text-foreground hover:bg-muted transition-colors"
            >
              {t("cookie.decline")}
            </button>
            <button
              onClick={accept}
              className="px-4 py-2 rounded-lg text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              {t("cookie.accept")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
