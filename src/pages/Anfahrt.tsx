import { useState } from "react";
import { MapPin, Car, Train } from "lucide-react";
import { useTranslation } from "react-i18next";
import { practice } from "@/config/practice";
import locationImg from "@/assets/location.jpg";

const Anfahrt = () => {
  const [mapConsent, setMapConsent] = useState(false);
  const { t } = useTranslation();
  const { lat, lon } = practice.map;

  return (
    <section className="relative py-20 md:py-28">
      <div className="container">
        <div className="text-center mb-14">
          <p className="text-accent font-semibold text-sm uppercase tracking-wide mb-2">{t("directions.label")}</p>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">{t("directions.title")}</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
          <div className="space-y-6">
            <div className="bg-card rounded-xl border p-6">
              <div className="flex items-start gap-3 mb-4">
                <MapPin className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                <div>
                  <h3 className="font-bold text-foreground">{t("directions.address")}</h3>
                  <p className="text-muted-foreground text-sm">
                    {practice.name}<br />
                    {practice.address.street}<br />
                    {practice.address.zip} {t("common.city_name")}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 mb-4">
                <Car className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                <div>
                  <h3 className="font-bold text-foreground">{t("directions.by_car")}</h3>
                  <p className="text-muted-foreground text-sm whitespace-pre-line">
                    {t("directions.by_car_desc")}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Train className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                <div>
                  <h3 className="font-bold text-foreground">{t("directions.public_transport")}</h3>
                  <p className="text-muted-foreground text-sm">
                    {t("directions.public_transport_desc")}
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
              <MapContainer
                center={[lat, lon]}
                zoom={15}
                scrollWheelZoom={false}
                className="w-full h-full min-h-[400px]"
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[lat, lon]} icon={defaultIcon}>
                  <Popup>
                    <strong>{practice.name}</strong><br />
                    {practice.address.street}<br />
                    {practice.address.zip} {t("common.city_name")}
                  </Popup>
                </Marker>
              </MapContainer>
            ) : (
              <div className="text-center p-8">
                <MapPin className="w-10 h-10 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground text-sm mb-4">
                  {t("directions.map_consent")}
                </p>
                <button
                  onClick={() => setMapConsent(true)}
                  className="bg-primary text-primary-foreground px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-primary/90 transition-colors"
                >
                  {t("directions.load_map")}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Anfahrt;
