import { useState } from "react";
import { MapPin, Car, Train } from "lucide-react";
import locationImg from "@/assets/location.jpg";

const Anfahrt = () => {
  const [mapConsent, setMapConsent] = useState(false);

  return (
    <>
      <section className="relative py-20 md:py-28">
        <div className="container">
          <div className="text-center mb-14">
            <p className="text-accent font-semibold text-sm uppercase tracking-wide mb-2">Anfahrt</p>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">So finden Sie uns</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
            <div className="space-y-6">
              <div className="bg-card rounded-xl border p-6">
                <div className="flex items-start gap-3 mb-4">
                  <MapPin className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                  <div>
                    <h3 className="font-bold text-foreground">Adresse</h3>
                    <p className="text-muted-foreground text-sm">
                      IDA-Praxis<br />
                      Geschwister-Scholl-Str. 3<br />
                      02957 Krauschwitz
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 mb-4">
                  <Car className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                  <div>
                    <h3 className="font-bold text-foreground">Mit dem Auto</h3>
                    <p className="text-muted-foreground text-sm">
                      Von Weißwasser: ca. 15 Min. über die B156.<br />
                      Von Görlitz: ca. 40 Min. über die B115. Parkplätze direkt vor der Praxis.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Train className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                  <div>
                    <h3 className="font-bold text-foreground">Öffentliche Verkehrsmittel</h3>
                    <p className="text-muted-foreground text-sm">
                      Busverbindung ab Weißwasser und Bad Muskau. Haltestelle „Krauschwitz Mitte", 3 Min. Fußweg.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl overflow-hidden shadow-lg">
                <img src={locationImg} alt="Krauschwitz Umgebung" className="w-full h-48 object-cover" loading="lazy" />
              </div>
            </div>

            <div className="bg-card rounded-xl border overflow-hidden min-h-[400px] flex items-center justify-center">
              {mapConsent ? (
                <iframe
                  title="Standort IDA-Praxis Krauschwitz"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=14.677%2C51.381%2C14.695%2C51.392&layer=mapnik&marker=51.386%2C14.686"
                  className="w-full h-full min-h-[400px]"
                  loading="lazy"
                />
              ) : (
                <div className="text-center p-8">
                  <MapPin className="w-10 h-10 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground text-sm mb-4">
                    Zum Schutz Ihrer Daten wird die Karte erst nach Ihrer Zustimmung geladen (DSGVO).
                  </p>
                  <button
                    onClick={() => setMapConsent(true)}
                    className="bg-primary text-primary-foreground px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-primary/90 transition-colors"
                  >
                    Karte laden
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Anfahrt;
