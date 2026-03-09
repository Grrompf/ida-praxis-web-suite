import pliquettImg from "@/assets/pliquett.jpg";
import osorginaImg from "@/assets/osorgina.jpg";

const team = [
  {
    name: "Prof. Dr. med. R. Pliquett",
    role: "Facharzt für Innere Medizin, Diabetologe DDG",
    image: pliquettImg,
    desc: "Langjährige Erfahrung in der internistischen und diabetologischen Versorgung. Spezialisiert auf die ganzheitliche Betreuung von Patienten mit Diabetes Typ 1, Typ 2 und Schwangerschaftsdiabetes.",
  },
  {
    name: "Elena Osorgina",
    role: "Fachärztin für Innere Medizin",
    image: osorginaImg,
    desc: "Engagierte Internistin mit besonderem Fokus auf kardiovaskuläre Prävention und patientennahe Versorgung. Ergänzt das Praxisteam mit Kompetenz und Empathie.",
  },
];

const TeamSection = () => (
  <section className="py-20 md:py-28 bg-card">
    <div className="container">
      <div className="text-center mb-14">
        <p className="text-accent font-semibold text-sm uppercase tracking-wide mb-2">Unser Team</p>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">Kompetenz trifft Menschlichkeit</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
        {team.map((m) => (
          <div key={m.name} className="bg-background rounded-xl overflow-hidden shadow-lg border">
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={m.image}
                alt={`Portrait ${m.name}`}
                className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
            <div className="p-6">
              <h3 className="text-lg font-bold text-foreground">{m.name}</h3>
              <p className="text-accent font-medium text-sm mb-3">{m.role}</p>
              <p className="text-muted-foreground text-sm leading-relaxed">{m.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TeamSection;
