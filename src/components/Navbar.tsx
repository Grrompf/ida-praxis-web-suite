import { useState, lazy, Suspense } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";
import { practice } from "@/config/practice";

const LanguageSwitcher = lazy(() => import("./LanguageSwitcher"));
const FontSizeSwitcher = lazy(() => import("./FontSizeSwitcher"));

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const { t } = useTranslation();

  const navLinks = [
    { to: "/", label: t("nav.home") },
    { to: "/termin", label: t("nav.booking") },
    { to: "/anfahrt", label: t("nav.directions") },
    { to: "/kontakt", label: t("nav.contact") },
  ];

  return (
    <header className="sticky top-0 z-50 bg-card border-b shadow-sm" role="banner" style={{ fontSize: '16px' }}>
      {/* Single-row layout: mobile + lg+ */}
      <div className="container flex items-center justify-between h-16 lg:h-20">
        <Link to="/" className="flex items-center gap-2 mr-4">
          <span className="text-xl lg:text-2xl font-bold text-primary tracking-tight">IDA</span>
          <span className="text-xs lg:text-sm text-muted-foreground font-medium hidden sm:block lg:whitespace-nowrap">
            Internistisch-Diabetologische Arztpraxis
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-6" aria-label="Hauptnavigation">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`text-sm font-semibold transition-colors hover:text-accent ${
                pathname === l.to ? "text-accent" : "text-foreground"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Suspense fallback={<div className="w-20" />}><LanguageSwitcher /></Suspense>
          <Suspense fallback={null}><FontSizeSwitcher /></Suspense>
          <a
            href={`tel:${practice.phoneFull}`}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors"
          >
            <Phone className="w-4 h-4" />
            {practice.phone}
          </a>
        </nav>

        <button
          className="lg:hidden p-2 text-foreground"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Menü schließen" : "Menü öffnen"}
          aria-expanded={open}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>



      {open && (
        <>
          <div
            className="fixed inset-0 top-16 bg-foreground/50 z-40 lg:hidden animate-fade-in"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div
            className="lg:hidden bg-card border-t overflow-hidden animate-fade-in relative z-50"
          >
            <nav className="container py-4 flex flex-col gap-3">
              {navLinks.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className={`text-base font-semibold py-2 ${
                    pathname === l.to ? "text-accent" : "text-foreground"
                  }`}
                >
                  {l.label}
                </Link>
              ))}
              <Suspense fallback={<div className="h-8" />}><LanguageSwitcher /></Suspense>
              <Suspense fallback={null}><FontSizeSwitcher /></Suspense>
              <a
                href={`tel:${practice.phoneFull}`}
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-semibold w-fit"
              >
                <Phone className="w-4 h-4" />
                {practice.phone}
              </a>
            </nav>
          </div>
        </>
      )}
    </header>
  );
};

export default Navbar;
