import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

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

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      de:  { translation: de },
      en:  { translation: en },
      pl:  { translation: pl },
      hsb: { translation: hsb },
    },
    fallbackLng: "de",
    supportedLngs: [...supportedLanguages],
    interpolation: { escapeValue: false },
    detection: {
      order: ["path", "localStorage", "navigator"],
      lookupFromPathIndex: 0,
      caches: ["localStorage"],
    },
  });

export default i18n;
