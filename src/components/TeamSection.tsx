import { useTranslation } from "react-i18next";
import pliquettImg from "@/assets/pliquett.webp";
import osorginaImg from "@/assets/osorgina.webp";
import { practice } from "@/config/practice";

const TeamSection = () => {
  const { t } = useTranslation();

  const team = [
    {
      name: practice.doctor1,
      role: t("team.pliquett_role"),
      image: pliquettImg,
      desc: t("team.pliquett_desc"),
    },
    {
      name: practice.doctor2,
      role: t("team.osorgina_role"),
      image: osorginaImg,
      desc: t("team.osorgina_desc"),
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-card">
      <div className="container">
        <div className="text-center mb-14">
          <p className="text-accent font-semibold text-sm uppercase tracking-wide mb-2">{t("team.label")}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">{t("team.title")}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
          {team.map((m) => (
            <div key={m.name} className="bg-background rounded-xl overflow-hidden shadow-lg border">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={m.image}
                  alt={`Portrait ${m.name}`}
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                  width={400}
                  height={300}
                  loading="lazy"
                  decoding="async"
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
};

export default TeamSection;
