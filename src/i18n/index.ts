import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import de from "./de.json";

export const supportedLanguages = ["de", "hsb", "pl", "en"] as const;
export type SupportedLanguage = (typeof supportedLanguages)[number];

export const languageMeta: Record<SupportedLanguage, { label: string; flag: string; alt: string }> = {
  de:  { label: "Deutsch",         flag: "🇩🇪", alt: "Sprache: Deutsch" },
  hsb: { label: "Hornjoserbšćina", flag: "🏳️",  alt: "Rěč: Hornjoserbšćina (Sprache: Obersorbisch)" },
  pl:  { label: "Polski",          flag: "🇵🇱", alt: "Język: Polski (Sprache: Polnisch)" },
  en:  { label: "English",         flag: "🇬🇧", alt: "Language: English (Sprache: Englisch)" },
};

const detectLanguage = (): SupportedLanguage => {
  try {
    const stored = localStorage.getItem("i18nextLng");
    if (stored && supportedLanguages.includes(stored as SupportedLanguage)) return stored as SupportedLanguage;
  } catch { /* localStorage unavailable */ }

  const nav = navigator.language?.split("-")[0];
  if (nav && supportedLanguages.includes(nav as SupportedLanguage)) return nav as SupportedLanguage;

  return "de";
};

const detectedLng = detectLanguage();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const translationLoaders: Record<string, () => Promise<any>> = {
  en:  () => import("./en.json"),
  pl:  () => import("./pl.json"),
  hsb: () => import("./hsb.json"),
};

i18n
  .use(initReactI18next)
  .init({
    resources: {
      de: { translation: de },
    },
    lng: detectedLng,
    fallbackLng: "de",
    supportedLngs: [...supportedLanguages],
    interpolation: { escapeValue: false },
  });

// Load non-German translation if needed
async function loadTranslation(lang: SupportedLanguage) {
  if (lang !== "de" && !i18n.hasResourceBundle(lang, "translation")) {
    const loader = translationLoaders[lang];
    if (loader) {
      const mod = await loader();
      i18n.addResourceBundle(lang, "translation", mod.default, true, true);
    }
  }
}

// Load detected language immediately if not German
if (detectedLng !== "de") {
  loadTranslation(detectedLng);
}

// Patch changeLanguage to auto-load translations
const originalChangeLanguage = i18n.changeLanguage.bind(i18n);
i18n.changeLanguage = async (lng?: string, callback?: any) => {
  if (lng && lng !== "de") {
    await loadTranslation(lng as SupportedLanguage);
  }
  return originalChangeLanguage(lng, callback);
};

export default i18n;
