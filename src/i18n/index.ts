import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import de from "./de.json";
import en from "./en.json";
import pl from "./pl.json";
import hsb from "./hsb.json";

export const supportedLanguages = ["de", "hsb", "pl", "en"] as const;
export type SupportedLanguage = (typeof supportedLanguages)[number];

export const languageMeta: Record<SupportedLanguage, { label: string; flag: string; alt: string }> = {
  de:  { label: "Deutsch",         flag: "🇩🇪", alt: "Sprache: Deutsch" },
  hsb: { label: "Hornjoserbšćina", flag: "🏳️",  alt: "Rěč: Hornjoserbšćina (Sprache: Obersorbisch)" },
  pl:  { label: "Polski",          flag: "🇵🇱", alt: "Język: Polski (Sprache: Polnisch)" },
  en:  { label: "English",         flag: "🇬🇧", alt: "Language: English (Sprache: Englisch)" },
};

// Detect language synchronously without the heavy LanguageDetector plugin
const detectLanguage = (): string => {
  try {
    const stored = localStorage.getItem("i18nextLng");
    if (stored && supportedLanguages.includes(stored as SupportedLanguage)) return stored;
  } catch { /* localStorage unavailable */ }

  const nav = navigator.language?.split("-")[0];
  if (nav && supportedLanguages.includes(nav as SupportedLanguage)) return nav;

  return "de";
};

i18n
  .use(initReactI18next)
  .init({
    resources: {
      de:  { translation: de },
      en:  { translation: en },
      pl:  { translation: pl },
      hsb: { translation: hsb },
    },
    lng: detectLanguage(),
    fallbackLng: "de",
    supportedLngs: [...supportedLanguages],
    interpolation: { escapeValue: false },
  });

export default i18n;
