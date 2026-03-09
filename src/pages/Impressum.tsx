const Impressum = () => (
  <section className="py-20 md:py-28">
    <div className="container max-w-3xl">
      <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">Impressum</h1>
      <div className="prose prose-sm max-w-none text-foreground space-y-6">
        <div>
          <h2 className="text-xl font-bold mb-2">Angaben gemäß § 5 TMG</h2>
          <p className="text-muted-foreground leading-relaxed">
            IDA-Praxis – Internistisch-Diabetologische Arztpraxis<br />
            Prof. Dr. med. R. Pliquett & Elena Osorgina<br />
            Geschwister-Scholl-Str. 3<br />
            02957 Krauschwitz
          </p>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-2">Kontakt</h2>
          <p className="text-muted-foreground">
            Telefon: 035773 770<br />
            E-Mail: info@ida-praxis.de
          </p>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-2">Berufsbezeichnung</h2>
          <p className="text-muted-foreground">
            Arzt / Ärztin (verliehen in der Bundesrepublik Deutschland)<br />
            Zuständige Ärztekammer: Sächsische Landesärztekammer<br />
            Zuständige Kassenärztliche Vereinigung: KV Sachsen
          </p>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-2">Berufsrechtliche Regelungen</h2>
          <p className="text-muted-foreground">
            Berufsordnung der Sächsischen Landesärztekammer<br />
            Heilberufsgesetz des Freistaates Sachsen
          </p>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-2">Haftungsausschluss</h2>
          <p className="text-muted-foreground leading-relaxed">
            Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default Impressum;
