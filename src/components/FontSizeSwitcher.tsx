import { useState, useEffect } from "react";
import { Minus, Plus } from "lucide-react";

const STORAGE_KEY = "ida-font-size";
const SIZES = [100, 112, 125] as const;
const LABELS = ["Normal", "Groß", "Sehr groß"] as const;

const FontSizeSwitcher = () => {
  const [sizeIndex, setSizeIndex] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? Math.min(Number(stored), SIZES.length - 1) : 0;
  });

  useEffect(() => {
    document.documentElement.style.fontSize = `${SIZES[sizeIndex]}%`;
    localStorage.setItem(STORAGE_KEY, String(sizeIndex));
  }, [sizeIndex]);

  return (
    <div className="flex items-center gap-1" role="group" aria-label="Schriftgröße anpassen">
      <button
        onClick={() => setSizeIndex((i) => Math.max(0, i - 1))}
        disabled={sizeIndex === 0}
        className="p-1.5 rounded border border-border bg-card hover:bg-muted transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        aria-label="Schrift verkleinern"
      >
        <Minus className="w-3.5 h-3.5" aria-hidden="true" />
      </button>
      <span className="text-xs font-medium text-muted-foreground min-w-[3rem] text-center select-none" aria-live="polite">
        {LABELS[sizeIndex]}
      </span>
      <button
        onClick={() => setSizeIndex((i) => Math.min(SIZES.length - 1, i + 1))}
        disabled={sizeIndex === SIZES.length - 1}
        className="p-1.5 rounded border border-border bg-card hover:bg-muted transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        aria-label="Schrift vergrößern"
      >
        <Plus className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

export default FontSizeSwitcher;
