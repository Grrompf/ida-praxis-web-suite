import type { SupportedLanguage } from "@/i18n";

const Flag = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" className="w-6 h-4 rounded-sm" role="img" aria-label={title}>
    <title>{title}</title>
    {children}
  </svg>
);

const DE = () => (
  <Flag title="Deutsch">
    <path fill="#000" d="M0 0h640v160H0z" />
    <path fill="#D00" d="M0 160h640v160H0z" />
    <path fill="#FFCE00" d="M0 320h640v160H0z" />
  </Flag>
);

const PL = () => (
  <Flag title="Polski">
    <path fill="#fff" d="M0 0h640v240H0z" />
    <path fill="#DC143C" d="M0 240h640v240H0z" />
  </Flag>
);

const GB = () => (
  <Flag title="English">
    <path fill="#012169" d="M0 0h640v480H0z" />
    <path fill="#FFF" d="m75 0 244 181L562 0h78v62L400 241l240 178v61h-80L320 301 82 480H0v-60l239-178L0 64V0z" />
    <path fill="#C8102E" d="m424 281 216 159v40L369 281zm-184 20 6 35L54 480H0zM640 0v3L391 191l2-44L590 0zM0 0l239 176h-60L0 42z" />
    <path fill="#FFF" d="M241 0v480h160V0zM0 160v160h640V160z" />
    <path fill="#C8102E" d="M0 193v96h640v-96zM273 0v480h96V0z" />
  </Flag>
);

const HSB = () => (
  <Flag title="Hornjoserbšćina">
    <path fill="#0051A5" d="M0 0h640v160H0z" />
    <path fill="#E8112D" d="M0 160h640v160H0z" />
    <path fill="#FFF" d="M0 320h640v160H0z" />
  </Flag>
);

const flags: Record<SupportedLanguage, () => JSX.Element> = { de: DE, hsb: HSB, pl: PL, en: GB };

export default flags;
