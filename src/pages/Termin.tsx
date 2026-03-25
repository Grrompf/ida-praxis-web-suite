import { useState, useEffect } from "react";
import { Calendar, Send, CheckCircle, ShieldAlert, Clock, User, Mail, Phone, ExternalLink } from "lucide-react";
import { Toaster, toast } from "sonner";
import { useTranslation } from "react-i18next";
import { practice } from "@/config/practice";
import BookingCalendar from "@/components/BookingCalendar";

type BookingForm = {
  name?: string;
  email?: string;
  phone?: string;
  date?: string;
  timeSlot?: string;
  reason?: string;
  message?: string;
  privacy?: boolean;
};

const Termin = () => {
  const [form, setForm] = useState<BookingForm>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    setErrors({});
  }, [i18n.language]);

  // Min date = tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  // Max date = 3 months ahead
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 3);
  const maxDateStr = maxDate.toISOString().split("T")[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fieldErrors: Record<string, string> = {};

    if (!form.name?.trim()) fieldErrors.name = t("booking.error_name");
    if (!form.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      fieldErrors.email = t("booking.error_email");
    if (!form.date) fieldErrors.date = t("booking.error_date");
    if (!form.timeSlot) fieldErrors.timeSlot = t("booking.error_time");
    if (!form.reason) fieldErrors.reason = t("booking.error_reason");
    if (!form.privacy) fieldErrors.privacy = t("booking.error_privacy");

    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }
    setErrors({});

    const subject = encodeURIComponent(`Terminanfrage von ${form.name}`);
    const body = encodeURIComponent(
      `Terminanfrage\n` +
      `──────────────────\n` +
      `Name: ${form.name}\n` +
      `E-Mail: ${form.email}\n` +
      `Telefon: ${form.phone || "–"}\n` +
      `Wunschdatum: ${form.date}\n` +
      `Wunschzeit: ${form.timeSlot}\n` +
      `Grund: ${form.reason}\n` +
      `Nachricht: ${form.message || "–"}\n` +
      `──────────────────`
    );

    window.location.href = `mailto:${practice.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
    toast.success(t("booking.toast_success"));
  };

  const update = (field: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const inputClass =
    "w-full bg-background border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50";

  if (submitted) {
    return (
      <section className="py-28">
        <div className="container max-w-lg text-center">
          <CheckCircle className="w-16 h-16 text-accent mx-auto mb-6" aria-hidden="true" />
          <h1 className="text-3xl font-bold text-foreground mb-4">{t("booking.success_title")}</h1>
          <p className="text-muted-foreground">{t("booking.success_message")}</p>
        </div>
      </section>
    );
  }

  return (
    <>
      <Toaster theme="light" />
      <section className="py-20 md:py-28">
        <div className="container max-w-3xl">
          <div className="text-center mb-14">
            <p className="text-accent font-semibold text-sm uppercase tracking-wide mb-2">
              {t("booking.label")}
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              {t("booking.title")}
            </h1>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto text-sm">
              {t("booking.subtitle")}
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-card rounded-xl border p-6 md:p-8 space-y-5"
          >
            {/* Health data notice */}
            <div className="flex items-start gap-3 bg-muted/50 border border-border rounded-lg p-3.5">
              <ShieldAlert className="w-5 h-5 text-accent mt-0.5 shrink-0" aria-hidden="true" />
              <p className="text-xs text-muted-foreground leading-relaxed">
                {t("booking.health_notice")}
              </p>
            </div>

            {/* Personal info */}
            <fieldset>
              <legend className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                <User className="w-4 h-4 text-accent" aria-hidden="true" />
                {t("booking.personal_info")}
              </legend>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="booking-name" className="block text-sm font-semibold text-foreground mb-1">
                    {t("booking.name")} *
                  </label>
                  <input
                    id="booking-name"
                    type="text"
                    value={form.name || ""}
                    onChange={(e) => update("name", e.target.value)}
                    className={inputClass}
                    placeholder={t("booking.name_placeholder")}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "err-name" : undefined}
                  />
                  {errors.name && (
                    <p id="err-name" className="text-destructive text-xs mt-1" role="alert">{errors.name}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="booking-email" className="block text-sm font-semibold text-foreground mb-1">
                    {t("booking.email")} *
                  </label>
                  <input
                    id="booking-email"
                    type="email"
                    value={form.email || ""}
                    onChange={(e) => update("email", e.target.value)}
                    className={inputClass}
                    placeholder={t("booking.email_placeholder")}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "err-email" : undefined}
                  />
                  {errors.email && (
                    <p id="err-email" className="text-destructive text-xs mt-1" role="alert">{errors.email}</p>
                  )}
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="booking-phone" className="block text-sm font-semibold text-foreground mb-1">
                    {t("booking.phone")}
                  </label>
                  <input
                    id="booking-phone"
                    type="tel"
                    value={form.phone || ""}
                    onChange={(e) => update("phone", e.target.value)}
                    className={inputClass}
                    placeholder={t("booking.phone_placeholder")}
                  />
                </div>
              </div>
            </fieldset>

            {/* Date & Time */}
            <fieldset>
              <legend className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-accent" />
                {t("booking.date_time")}
              </legend>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    {t("booking.preferred_date")} *
                  </label>
                  <BookingCalendar
                    value={form.date}
                    onChange={(d) => update("date", d)}
                    minDate={minDate}
                    maxDate={maxDateStr}
                  />
                  {errors.date && (
                    <p id="err-date" className="text-destructive text-xs mt-1" role="alert">{errors.date}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="booking-time" className="block text-sm font-semibold text-foreground mb-1">
                    {t("booking.preferred_time")} *
                  </label>
                  <select
                    id="booking-time"
                    value={form.timeSlot || ""}
                    onChange={(e) => update("timeSlot", e.target.value)}
                    className={inputClass}
                    aria-invalid={!!errors.timeSlot}
                    aria-describedby={errors.timeSlot ? "err-time" : undefined}
                  >
                    <option value="">{t("booking.time_placeholder")}</option>
                    <option value="08:00-09:00">08:00 – 09:00</option>
                    <option value="09:00-10:00">09:00 – 10:00</option>
                    <option value="10:00-11:00">10:00 – 11:00</option>
                    <option value="11:00-12:00">11:00 – 12:00</option>
                    <option value="14:00-15:00">14:00 – 15:00</option>
                    <option value="15:00-16:00">15:00 – 16:00</option>
                    <option value="16:00-17:00">16:00 – 17:00</option>
                    <option value="17:00-18:00">17:00 – 18:00</option>
                  </select>
                  {errors.timeSlot && (
                    <p id="err-time" className="text-destructive text-xs mt-1" role="alert">{errors.timeSlot}</p>
                  )}
                </div>
              </div>
            </fieldset>

            {/* Reason */}
            <div>
              <label htmlFor="booking-reason" className="block text-sm font-semibold text-foreground mb-1">
                {t("booking.reason")} *
              </label>
              <select
                id="booking-reason"
                value={form.reason || ""}
                onChange={(e) => update("reason", e.target.value)}
                className={inputClass}
                aria-invalid={!!errors.reason}
                aria-describedby={errors.reason ? "err-reason" : undefined}
              >
                <option value="">{t("booking.reason_placeholder")}</option>
                <option>{t("booking.reason_checkup")}</option>
                <option>{t("booking.reason_diabetes")}</option>
                <option>{t("booking.reason_followup")}</option>
                <option>{t("booking.reason_prescription")}</option>
                <option>{t("booking.reason_other")}</option>
              </select>
              {errors.reason && (
                <p id="err-reason" className="text-destructive text-xs mt-1" role="alert">{errors.reason}</p>
              )}
            </div>

            {/* Additional message */}
            <div>
              <label htmlFor="booking-message" className="block text-sm font-semibold text-foreground mb-1">
                {t("booking.message")}
              </label>
              <textarea
                id="booking-message"
                rows={3}
                value={form.message || ""}
                onChange={(e) => update("message", e.target.value)}
                className={`${inputClass} resize-none`}
                placeholder={t("booking.message_placeholder")}
              />
            </div>

            {/* Mailto hint */}
            <div className="flex items-start gap-3 bg-primary/5 border border-primary/20 rounded-lg p-3.5">
              <ExternalLink className="w-5 h-5 text-primary mt-0.5 shrink-0" />
              <p className="text-xs text-muted-foreground leading-relaxed">
                {t("booking.mailto_hint")}
              </p>
            </div>

            {/* Info box */}
            <div className="flex items-start gap-3 bg-accent/5 border border-accent/20 rounded-lg p-3.5">
              <Clock className="w-5 h-5 text-accent mt-0.5 shrink-0" />
              <p className="text-xs text-muted-foreground leading-relaxed">
                {t("booking.confirmation_note")}
              </p>
            </div>

            {/* Privacy */}
            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={!!form.privacy}
                onChange={(e) => update("privacy", e.target.checked)}
                className="mt-1 accent-accent"
              />
              <span className="text-xs text-muted-foreground">
                {t("contact.privacy_agree", { linkStart: "", linkEnd: "" }).split("{{")[0]}
                <a href="/datenschutz" className="text-accent underline">{t("footer.privacy")}</a>
                {" *"}
              </span>
            </label>
            {errors.privacy && (
              <p className="text-destructive text-xs" role="alert">{errors.privacy}</p>
            )}

            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-lg font-semibold text-sm hover:bg-accent/90 transition-colors"
            >
              <Send className="w-4 h-4" />
              {t("booking.submit")}
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Termin;
