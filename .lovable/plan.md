

## Plan: Scroll-Animationen für Service-Karten

### Ansatz
Erstelle einen wiederverwendbaren `useScrollReveal` Hook mit der **Intersection Observer API** (keine externe Bibliothek nötig). Jede Service-Karte wird beim Scrollen mit einem gestaffelten Fade-in-Up-Effekt eingeblendet.

### Änderungen

1. **Neuer Hook `src/hooks/useScrollReveal.ts`** — Nutzt `IntersectionObserver` um zu erkennen, wann ein Element sichtbar wird. Gibt eine `ref` und einen `isVisible`-Boolean zurück.

2. **`src/components/ServicesSection.tsx`** — Jede Karte wird in eine Wrapper-Komponente mit dem Hook eingebettet. Staggered delay per Index (z.B. `delay: index * 100ms`). Karten starten mit `opacity-0 translate-y-8` und animieren zu `opacity-100 translate-y-0`.

### Technische Details
- `threshold: 0.15` damit die Animation auslöst, sobald 15% der Karte sichtbar sind
- `once: true` — Animation spielt nur einmal
- Kein zusätzliches npm-Paket nötig
- Die Hero-Bild/Text-Sektion oben bekommt ebenfalls eine sanfte Einblendung

