import { useState, useEffect } from "react";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, ShieldAlert } from "lucide-react";
import { Toaster, toast } from "sonner";
import { useTranslation } from "react-i18next";
import { practice } from "@/config/practice";

type ContactForm = {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
  privacy?: boolean;
};

const Kontakt = () => {
  const [form, setForm] = useState<ContactForm>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    setErrors({});
  }, [i18n.language]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fieldErrors: Record<string, string> = {};

    if (!form.name?.trim()) fieldErrors.name = t("contact.error_name");
    if (!form.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      fieldErrors.email = t("contact.error_email");
    if (!form.subject?.trim()) fieldErrors.subject = t("contact.error_subject");
    if (!form.message?.trim() || (form.message?.trim().length ?? 0) < 10)
      fieldErrors.message = t("contact.error_message");
    if (!form.privacy) fieldErrors.privacy = t("contact.error_privacy");

    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setSubmitted(true);
    toast.success(t("contact.toast_success"));
  };

  const update = (field: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  if (submitted) {
    return (
      <section className="py-28">
        <div className="container max-w-lg text-center">
          <CheckCircle className="w-16 h-16 text-accent mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-foreground mb-4">{t("contact.success_title")}</h1>
          <p className="text-muted-foreground">{t("contact.success_message")}</p>
        </div>
      </section>
    );
  }

  return (
    <>
      <Toaster theme="light" />
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="text-center mb-14">
            <p className="text-accent font-semibold text-sm uppercase tracking-wide mb-2">{t("contact.label")}</p>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">{t("contact.title")}</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-5xl mx-auto">
            <div className="space-y-4">
              {[
                { icon: Phone, label: t("contact.phone"), value: practice.phone, href: `tel:${practice.phoneFull}` },
                { icon: Phone, label: t("contact.fax"), value: practice.fax },
                { icon: Mail, label: t("contact.email"), value: practice.email, href: `mailto:${practice.email}` },
                { icon: MapPin, label: t("contact.address"), value: `${practice.address.street}\n${practice.address.zip} ${t("common.city_name")}` },
                { icon: Clock, label: t("contact.hours"), value: t("contact.hours_value") },
              ].map((item) => (
                <div key={item.label} className="bg-card rounded-xl border p-4 flex items-start gap-3">
                  <item.icon className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground text-sm">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="text-muted-foreground text-sm hover:text-accent transition-colors">{item.value}</a>
                    ) : (
                      <p className="text-muted-foreground text-sm whitespace-pre-line">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="lg:col-span-2 bg-card rounded-xl border p-6 md:p-8 space-y-5">
              <div className="flex items-start gap-3 bg-muted/50 border border-border rounded-lg p-3.5">
                <ShieldAlert className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                <p className="text-xs text-muted-foreground leading-relaxed">{t("contact.health_data_notice")}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1">{t("contact.name")} *</label>
                  <input
                    type="text"
                    value={form.name || ""}
                    onChange={(e) => update("name", e.target.value)}
                    className="w-full bg-background border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
                    placeholder={t("contact.name_placeholder")}
                  />
                  {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1">{t("contact.email")} *</label>
                  <input
                    type="email"
                    value={form.email || ""}
                    onChange={(e) => update("email", e.target.value)}
                    className="w-full bg-background border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
                    placeholder={t("contact.email_placeholder")}
                  />
                  {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1">{t("contact.phone_label")}</label>
                  <input
                    type="tel"
                    value={form.phone || ""}
                    onChange={(e) => update("phone", e.target.value)}
                    className="w-full bg-background border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
                    placeholder={t("contact.phone_placeholder")}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1">{t("contact.subject")} *</label>
                  <select
                    value={form.subject || ""}
                    onChange={(e) => update("subject", e.target.value)}
                    className="w-full bg-background border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
                  >
                    <option value="">{t("contact.subject_placeholder")}</option>
                    <option>{t("contact.subject_appointment")}</option>
                    <option>{t("contact.subject_results")}</option>
                    <option>{t("contact.subject_prescription")}</option>
                    <option>{t("contact.subject_general")}</option>
                  </select>
                  {errors.subject && <p className="text-destructive text-xs mt-1">{errors.subject}</p>}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1">{t("contact.message")} *</label>
                <textarea
                  rows={5}
                  value={form.message || ""}
                  onChange={(e) => update("message", e.target.value)}
                  className="w-full bg-background border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none"
                  placeholder={t("contact.message_placeholder")}
                />
                {errors.message && <p className="text-destructive text-xs mt-1">{errors.message}</p>}
              </div>
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
              {errors.privacy && <p className="text-destructive text-xs">{errors.privacy}</p>}
              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-lg font-semibold text-sm hover:bg-accent/90 transition-colors"
              >
                <Send className="w-4 h-4" />
                {t("contact.send")}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Kontakt;
