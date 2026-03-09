import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

const ContactBar = () => (
  <section className="bg-accent text-accent-foreground py-10 md:py-14">
    <div className="container">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-1">Wir sind für Sie da.</h2>
          <p className="text-accent-foreground/80 text-sm">Vereinbaren Sie noch heute Ihren Termin.</p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <a href="tel:+4935773770" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-3 rounded-lg font-semibold text-sm hover:bg-primary/90 transition-colors">
            <Phone className="w-4 h-4" /> Anrufen
          </a>
          <Link to="/kontakt" className="inline-flex items-center gap-2 bg-accent-foreground/10 text-accent-foreground border border-accent-foreground/20 px-5 py-3 rounded-lg font-semibold text-sm hover:bg-accent-foreground/20 transition-colors">
            <Mail className="w-4 h-4" /> Nachricht senden
          </Link>
          <Link to="/anfahrt" className="inline-flex items-center gap-2 bg-accent-foreground/10 text-accent-foreground border border-accent-foreground/20 px-5 py-3 rounded-lg font-semibold text-sm hover:bg-accent-foreground/20 transition-colors">
            <MapPin className="w-4 h-4" /> Anfahrt
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export default ContactBar;
