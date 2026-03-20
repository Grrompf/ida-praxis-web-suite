import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { supportedLanguages, languageMeta, type SupportedLanguage } from "@/i18n";
import { ChevronDown } from "lucide-react";

const flagImages: Record<SupportedLanguage, string> = {
  de: "https://flagcdn.com/w40/de.png",
  hsb: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Flag_of_Sorbs.svg/40px-Flag_of_Sorbs.svg.png",
  pl: "https://flagcdn.com/w40/pl.png",
  en: "https://flagcdn.com/w40/gb.png",
};

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const currentLang = i18n.language as SupportedLanguage;
  const currentMeta = languageMeta[currentLang];

  return (
    <>
      {/* Inline flags – hidden on tablet (sm-md), visible on lg+ */}
      <div className="hidden lg:flex items-center gap-1">
        {supportedLanguages.map((lang) => {
          const meta = languageMeta[lang];
          const isActive = i18n.language === lang;
          return (
            <button
              key={lang}
              onClick={() => i18n.changeLanguage(lang)}
              className={`p-1 rounded transition-all ${
                isActive
                  ? "ring-2 ring-accent opacity-100"
                  : "opacity-60 hover:opacity-100"
              }`}
              title={meta.label}
              aria-label={meta.alt}
            >
              <img
                src={flagImages[lang]}
                alt={meta.alt}
                className="w-6 h-4 object-cover rounded-sm"
                loading="lazy"
              />
            </button>
          );
        })}
      </div>

      {/* Dropdown – visible on tablet (sm-md), hidden on lg+ and mobile (<sm handled by Navbar) */}
      <div className="relative lg:hidden" ref={ref}>
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-1.5 p-1.5 rounded border border-border bg-card hover:bg-muted transition-colors"
          aria-label={currentMeta?.alt}
        >
          <img
            src={flagImages[currentLang]}
            alt={currentMeta?.alt}
            className="w-6 h-4 object-cover rounded-sm"
            loading="lazy"
          />
          <ChevronDown className={`w-3.5 h-3.5 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
        </button>

        {open && (
          <div className="absolute right-0 top-full mt-1 bg-card border border-border rounded-lg shadow-lg py-1 z-50 min-w-[180px]">
            {supportedLanguages.map((lang) => {
              const meta = languageMeta[lang];
              const isActive = i18n.language === lang;
              return (
                <button
                  key={lang}
                  onClick={() => {
                    i18n.changeLanguage(lang);
                    setOpen(false);
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm transition-colors hover:bg-muted ${
                    isActive ? "font-semibold text-accent" : "text-foreground"
                  }`}
                >
                  <img
                    src={flagImages[lang]}
                    alt={meta.alt}
                    className="w-6 h-4 object-cover rounded-sm"
                    loading="lazy"
                  />
                  {meta.label}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default LanguageSwitcher;
