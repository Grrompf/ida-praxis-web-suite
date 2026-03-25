import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { practice } from "@/config/practice";

// German public holidays (Saxony) — fixed + Easter-based
function getHolidays(year: number): Set<string> {
  const fmt = (d: Date) => d.toISOString().split("T")[0];
  const holidays = new Set<string>();

  // Fixed holidays
  [
    [1, 1], [5, 1], [10, 3], [10, 31], [11, 16], [12, 25], [12, 26],
  ].forEach(([m, d]) => holidays.add(fmt(new Date(year, m - 1, d))));

  // Easter-based (Anonymous Gregorian algorithm)
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31) - 1;
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  const easter = new Date(year, month, day);

  const offset = (days: number) => {
    const d2 = new Date(easter);
    d2.setDate(d2.getDate() + days);
    return fmt(d2);
  };

  // Karfreitag, Ostermontag, Himmelfahrt, Pfingstmontag, Fronleichnam
  [-2, 1, 39, 50, 60].forEach((o) => holidays.add(offset(o)));

  return holidays;
}

interface BookingCalendarProps {
  value?: string;
  onChange: (date: string) => void;
  minDate: string;
  maxDate: string;
}

const WEEKDAYS_SHORT: Record<string, string[]> = {
  de: ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"],
  en: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
  hsb: ["Pó", "Wu", "Sr", "Št", "Pj", "So", "Nj"],
  pl: ["Pn", "Wt", "Śr", "Cz", "Pt", "So", "Nd"],
};

const BookingCalendar = ({ value, onChange, minDate, maxDate }: BookingCalendarProps) => {
  const { t, i18n } = useTranslation();
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const holidays = useMemo(
    () => {
      const s = getHolidays(viewYear);
      // also get next year in case maxDate spans
      getHolidays(viewYear + 1).forEach((h) => s.add(h));
      return s;
    },
    [viewYear]
  );

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDayOfWeek = (new Date(viewYear, viewMonth, 1).getDay() + 6) % 7; // Mon=0

  const isDisabled = (day: number) => {
    const d = new Date(viewYear, viewMonth, day);
    const iso = d.toISOString().split("T")[0];
    const dow = d.getDay();
    if (dow === 0 || dow === 6) return true; // weekend
    if (holidays.has(iso)) return true;
    if ((practice.closedDays as readonly string[]).includes(iso)) return true;
    if (iso < minDate || iso > maxDate) return true;
    return false;
  };

  const isSelected = (day: number) => {
    const iso = new Date(viewYear, viewMonth, day).toISOString().split("T")[0];
    return iso === value;
  };

  const isToday = (day: number) => {
    return viewYear === today.getFullYear() && viewMonth === today.getMonth() && day === today.getDate();
  };

  const prevMonth = () => {
    if (viewMonth === 0) { setViewYear((y) => y - 1); setViewMonth(11); }
    else setViewMonth((m) => m - 1);
  };

  const nextMonth = () => {
    if (viewMonth === 11) { setViewYear((y) => y + 1); setViewMonth(0); }
    else setViewMonth((m) => m + 1);
  };

  const canGoPrev = `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}` > minDate.slice(0, 7) || viewMonth > new Date(minDate).getMonth() || viewYear > new Date(minDate).getFullYear();
  const canGoNext = `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}` < maxDate.slice(0, 7);

  const weekLabels = WEEKDAYS_SHORT[i18n.language] || WEEKDAYS_SHORT.de;

  const monthNames = [
    "Januar", "Februar", "März", "April", "Mai", "Juni",
    "Juli", "August", "September", "Oktober", "November", "Dezember"
  ];

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDayOfWeek; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div className="bg-background border rounded-xl p-4" role="group" aria-label={t("booking.preferred_date")}>
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <button
          type="button"
          onClick={prevMonth}
          disabled={!canGoPrev}
          className="p-1.5 rounded-lg hover:bg-muted transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Vorheriger Monat"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <span className="text-sm font-bold text-foreground">
          {monthNames[viewMonth]} {viewYear}
        </span>
        <button
          type="button"
          onClick={nextMonth}
          disabled={!canGoNext}
          className="p-1.5 rounded-lg hover:bg-muted transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Nächster Monat"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 gap-1 mb-1">
        {weekLabels.map((label, i) => (
          <div
            key={i}
            className={`text-center text-xs font-semibold py-1 ${
              i >= 5 ? "text-muted-foreground/50" : "text-muted-foreground"
            }`}
          >
            {label}
          </div>
        ))}
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, i) => {
          if (day === null) return <div key={`empty-${i}`} />;
          const disabled = isDisabled(day);
          const selected = isSelected(day);
          const todayMark = isToday(day);
          const iso = new Date(viewYear, viewMonth, day).toISOString().split("T")[0];
          const isHoliday = holidays.has(iso);
          const dow = new Date(viewYear, viewMonth, day).getDay();
          const isWeekend = dow === 0 || dow === 6;

          return (
            <button
              key={day}
              type="button"
              disabled={disabled}
              onClick={() => onChange(iso)}
              className={`
                relative h-9 rounded-lg text-sm font-medium transition-all
                ${selected
                  ? "bg-accent text-accent-foreground ring-2 ring-accent/30"
                  : disabled
                    ? isWeekend || isHoliday
                      ? "text-muted-foreground/30 cursor-not-allowed bg-muted/30"
                      : "text-muted-foreground/40 cursor-not-allowed"
                    : "text-foreground hover:bg-accent/10 hover:text-accent cursor-pointer"
                }
              `}
              aria-label={`${day}. ${monthNames[viewMonth]} ${viewYear}${isHoliday ? " (Feiertag)" : ""}${isWeekend ? " (Wochenende)" : ""}`}
              aria-pressed={selected}
            >
              {day}
              {todayMark && !selected && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent" />
              )}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-3 pt-3 border-t border-border">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-accent" />
          <span className="text-xs text-muted-foreground">{t("booking.legend_selected")}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-muted/50 border border-border" />
          <span className="text-xs text-muted-foreground">{t("booking.legend_closed")}</span>
        </div>
      </div>
    </div>
  );
};

export default BookingCalendar;
