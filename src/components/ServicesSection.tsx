import { Heart, Activity, Baby, Stethoscope, Pill, ShieldCheck } from "lucide-react";

const services = [
  { icon: Activity, title: "Diabetologie", desc: "Diagnostik und Therapie von Diabetes Typ 1 & 2, Insulinpumpentherapie, CGM-Systeme." },
  { icon: Baby, title: "Schwangerschaftsdiabetes", desc: "Betreuung und Beratung bei Gestationsdiabetes für werdende Mütter." },
  { icon: Stethoscope, title: "Innere Medizin", desc: "Umfassende internistische Diagnostik und Behandlung." },
  { icon: Heart, title: "Kardiovaskuläre Prävention", desc: "Vorsorge und Behandlung von Herz-Kreislauf-Erkrankungen." },
  { icon: Pill, title: "Stoffwechselmedizin", desc: "Behandlung von Fettstoffwechselstörungen und metabolischem Syndrom." },
  { icon: ShieldCheck, title: "Vorsorgeuntersuchungen", desc: "Check-ups, Gesundheitsvorsorge und individuelle Beratung." },
];

const ServicesSection = () => (
  <section className="py-20 md:py-28">
    <div className="container">
      <div className="text-center mb-14">
        <p className="text-accent font-semibold text-sm uppercase tracking-wide mb-2">Leistungen</p>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">Unser Behandlungsspektrum</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s) => (
          <div
            key={s.title}
            className="bg-card rounded-xl p-6 border hover:shadow-lg hover:border-accent/30 transition-all duration-300 group"
          >
            <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
              <s.icon className="w-6 h-6 text-accent" />
            </div>
            <h3 className="font-bold text-foreground mb-2">{s.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;
