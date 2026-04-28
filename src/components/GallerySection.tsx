import { useState, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import SkeletonImage from "./SkeletonImage";

const images = [
  { src: "/gallery/aussen.webp", key: "exterior" },
  { src: "/gallery/empfang.webp", key: "reception" },
  { src: "/gallery/wartezimmer.webp", key: "team" },
  { src: "/gallery/behandlung.webp", key: "treatment" },
  { src: "/gallery/labor.webp", key: "lab" },
] as const;

const GallerySection = () => {
  const { t } = useTranslation();
  const [lightbox, setLightbox] = useState<number | null>(null);

  const close = useCallback(() => setLightbox(null), []);
  const prev = useCallback(() => setLightbox((i) => (i !== null ? (i - 1 + images.length) % images.length : null)), []);
  const next = useCallback(() => setLightbox((i) => (i !== null ? (i + 1) % images.length : null)), []);

  useEffect(() => {
    if (lightbox === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handler);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handler);
    };
  }, [lightbox, close, prev, next]);

  return (
    <section className="py-16 md:py-24 bg-muted/50" aria-label={t("gallery.label")}>
      <div className="container">
        <div className="text-center mb-10">
          <span className="text-sm font-semibold text-accent uppercase tracking-wider">
            {t("gallery.label")}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
            {t("gallery.title")}
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {images.map((img, i) => (
            <button
              key={img.key}
              onClick={() => setLightbox(i)}
              className={`group relative overflow-hidden rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                i === 0 ? "col-span-2 md:col-span-1 md:row-span-2" : ""
              }`}
              aria-label={t(`gallery.${img.key}`)}
            >
              <SkeletonImage
                src={img.src}
                alt={t(`gallery.${img.key}`)}
                loading="lazy"
                width={960}
                height={640}
                className={`w-full object-cover transition-transform duration-300 group-hover:scale-105 ${
                  i === 0 ? "h-48 md:h-full" : "h-40 md:h-56"
                } ${img.key === "lab" ? "[object-position:50%_20%]" : img.key === "team" ? "[object-position:50%_10%]" : "object-center"}`}
                skeletonClass="w-full h-full"
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors flex items-end p-3">
                <span className="text-sm font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg">
                  {t(`gallery.${img.key}`)}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label={t(`gallery.${images[lightbox].key}`)}
          onClick={close}
        >
          <button
            onClick={close}
            className="absolute top-4 right-4 text-white hover:text-white/90 p-2"
            aria-label="Schließen"
          >
            <X className="w-7 h-7" aria-hidden="true" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-2 md:left-6 text-white hover:text-white/90 p-2"
            aria-label="Vorheriges Bild"
          >
            <ChevronLeft className="w-8 h-8" aria-hidden="true" />
          </button>
          <img
            src={images[lightbox].src}
            alt={t(`gallery.${images[lightbox].key}`)}
            className="max-h-[85vh] max-w-[90vw] rounded-lg object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-2 md:right-6 text-white hover:text-white/90 p-2"
            aria-label="Nächstes Bild"
          >
            <ChevronRight className="w-8 h-8" aria-hidden="true" />
          </button>
          <div className="absolute bottom-4 text-white text-sm">
            {lightbox + 1} / {images.length}
          </div>
        </div>
      )}
    </section>
  );
};

export default GallerySection;
