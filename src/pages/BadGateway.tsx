import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Home, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { practice } from "@/config/practice";
import badGatewayImage from "@/assets/502-team.webp";

const BadGateway = () => {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = `502 – ${t("badGateway.title")}`;
  }, [t]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted flex items-center justify-center px-4 py-12">
      <div className="container max-w-5xl">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="order-2 md:order-1 text-center md:text-left">
            <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">
              {t("badGateway.label")}
            </p>
            <h1 className="text-5xl md:text-6xl font-bold text-primary mb-4">502</h1>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              {t("badGateway.title")}
            </h2>
            <p className="text-muted-foreground text-base md:text-lg mb-8 leading-relaxed">
              {t("badGateway.description")}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <Button asChild size="lg">
                <Link to="/">
                  <Home className="w-4 h-4" aria-hidden="true" />
                  {t("badGateway.cta_home")}
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href={`tel:${practice.phoneFull}`}>
                  <Phone className="w-4 h-4" aria-hidden="true" />
                  {t("badGateway.cta_call")}
                </a>
              </Button>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <img
              src={badGatewayImage}
              alt={t("badGateway.image_alt")}
              className="w-full h-auto rounded-2xl shadow-lg"
              width={1280}
              height={960}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default BadGateway;
