import { useState } from "react";
import { z } from "zod";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from "lucide-react";
import { toast } from "sonner";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Bitte geben Sie Ihren Namen ein.").max(100),
  email: z.string().trim().email("Bitte geben Sie eine gültige E-Mail-Adresse ein.").max(255),
  phone: z.string().trim().max(30).optional(),
  subject: z.string().trim().min(1, "Bitte wählen Sie einen Betreff.").max(200),
  message: z.string().trim().min(10, "Die Nachricht muss mindestens 10 Zeichen lang sein.").max(2000),
  privacy: z.literal(true, { errorMap: () => ({ message: "Bitte stimmen Sie der Datenschutzerklärung zu." }) }),
});

type ContactForm = z.infer<typeof contactSchema>;

const Kontakt = () => {
  const [form, setForm] = useState<Partial<ContactForm>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setSubmitted(true);
    toast.success("Ihre Nachricht wurde gesendet!");
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
          <h1 className="text-3xl font-bold text-foreground mb-4">Vielen Dank!</h1>
          <p className="text-muted-foreground">Ihre Nachricht wurde erfolgreich gesendet. Wir melden uns schnellstmöglich bei Ihnen.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <div className="text-center mb-14">
          <p className="text-accent font-semibold text-sm uppercase tracking-wide mb-2">Kontakt</p>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">Schreiben Sie uns</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-5xl mx-auto">
          <div className="space-y-4">
            {[
              { icon: Phone, label: "Telefon", value: "035773 770", href: "tel:+4935773770" },
              { icon: Mail, label: "E-Mail", value: "info@ida-praxis.de", href: "mailto:info@ida-praxis.de" },
              { icon: MapPin, label: "Adresse", value: "Geschwister-Scholl-Str. 3\n02957 Krauschwitz" },
              { icon: Clock, label: "Sprechzeiten", value: "Mo–Fr: 8:00–12:00\n& 14:00–18:00 Uhr" },
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1">Name *</label>
                <input
                  type="text"
                  value={form.name || ""}
                  onChange={(e) => update("name", e.target.value)}
                  className="w-full bg-background border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
                  placeholder="Ihr vollständiger Name"
                />
                {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1">E-Mail *</label>
                <input
                  type="email"
                  value={form.email || ""}
                  onChange={(e) => update("email", e.target.value)}
                  className="w-full bg-background border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
                  placeholder="ihre@email.de"
                />
                {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1">Telefon</label>
                <input
                  type="tel"
                  value={form.phone || ""}
                  onChange={(e) => update("phone", e.target.value)}
                  className="w-full bg-background border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
                  placeholder="Optional"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1">Betreff *</label>
                <select
                  value={form.subject || ""}
                  onChange={(e) => update("subject", e.target.value)}
                  className="w-full bg-background border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
                >
                  <option value="">Bitte wählen…</option>
                  <option>Terminanfrage</option>
                  <option>Befundanfrage</option>
                  <option>Rezeptbestellung</option>
                  <option>Allgemeine Anfrage</option>
                </select>
                {errors.subject && <p className="text-destructive text-xs mt-1">{errors.subject}</p>}
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1">Nachricht *</label>
              <textarea
                rows={5}
                value={form.message || ""}
                onChange={(e) => update("message", e.target.value)}
                className="w-full bg-background border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none"
                placeholder="Wie können wir Ihnen helfen?"
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
                Ich stimme der <a href="/datenschutz" className="text-accent underline">Datenschutzerklärung</a> zu und bin mit der Verarbeitung meiner Daten einverstanden. *
              </span>
            </label>
            {errors.privacy && <p className="text-destructive text-xs">{errors.privacy}</p>}
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-lg font-semibold text-sm hover:bg-accent/90 transition-colors"
            >
              <Send className="w-4 h-4" />
              Nachricht senden
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Kontakt;
