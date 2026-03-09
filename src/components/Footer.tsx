import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const Footer = () => (
  <footer className="bg-primary text-primary-foreground">
    <div className="container py-12 md:py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <h3 className="text-lg font-bold mb-4">IDA-Praxis</h3>
          <p className="text-primary-foreground/80 text-sm leading-relaxed">
            Internistisch-Diabetologische Arztpraxis<br />
            Prof. Dr. R. Pliquett & Elena Osorgina
          </p>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-4">Kontakt</h3>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
              Geschwister-Scholl-Str. 3, 02957 Krauschwitz
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 shrink-0" />
              <a href="tel:+4935773770" className="hover:text-primary-foreground transition-colors">035773 770</a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 shrink-0" />
              <a href="mailto:info@ida-praxis.de" className="hover:text-primary-foreground transition-colors">info@ida-praxis.de</a>
            </li>
            <li className="flex items-start gap-2">
              <Clock className="w-4 h-4 mt-0.5 shrink-0" />
              Mo–Fr: 8:00 – 12:00 Uhr &amp; 14:00 – 18:00 Uhr
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-4">Rechtliches</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/impressum" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Impressum</Link>
            </li>
            <li>
              <Link to="/datenschutz" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Datenschutzerklärung</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-10 pt-6 border-t border-primary-foreground/20 text-center text-sm text-primary-foreground/60">
        © 2026 IDA-Praxis Krauschwitz. Alle Rechte vorbehalten.
      </div>
    </div>
  </footer>
);

export default Footer;
