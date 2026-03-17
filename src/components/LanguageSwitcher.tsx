import { useTranslation } from "react-i18next";
import { supportedLanguages, languageMeta, type SupportedLanguage } from "@/i18n";

const flagImages: Record<SupportedLanguage, string> = {
  de: "https://flagcdn.com/w40/de.png",
  hsb: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Flag_of_Sorbs.svg/40px-Flag_of_Sorbs.svg.png",
  pl: "https://flagcdn.com/w40/pl.png",
  en: "https://flagcdn.com/w40/gb.png",
};

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  return (
    <div className="flex items-center gap-1">
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
  );
};

export default LanguageSwitcher;
