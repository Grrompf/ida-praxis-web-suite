// Central practice configuration — no hardcoded data in components
export const practice = {
  name: "IDA-Praxis",
  fullName: "IDA-Praxis – Internistisch-Diabetologische Arztpraxis",
  doctor1: "Prof. Dr. R. Pliquett",
  doctor2: "Elena Osorgina",
  address: {
    street: "Geschwister-Scholl-Str. 3",
    zip: "02957",
    city: "Krauschwitz",
  },
  phone: "035771 69285",
  phoneFull: "+4935771 69285",
  fax: "035771 641-33",
  email: "info@ida-praxis.de",
  map: {
    lat: 51.5156972,
    lon: 14.7174520,
  },
  hours: "Mo–Fr: 8:00–12:00 & 14:00–18:00",

  // Praxisschließtage (Betriebsurlaub, Brückentage, Fortbildungen etc.)
  // Format: "YYYY-MM-DD" — diese Tage werden im Terminkalender blockiert.
  closedDays: [
    // Osterurlaub 2026
    "2026-04-02", "2026-04-03",
    // Brückentag nach Himmelfahrt
    "2026-05-30",
    // Sommerurlaub 2026
    "2026-07-20", "2026-07-21", "2026-07-22", "2026-07-23", "2026-07-24",
    "2026-07-27", "2026-07-28", "2026-07-29", "2026-07-30", "2026-07-31",
    // Brückentag Reformationstag (Sa) — kein Eintrag nötig
    // Weihnachtsurlaub 2026
    "2026-12-21", "2026-12-22", "2026-12-23", "2026-12-24",
    "2026-12-28", "2026-12-29", "2026-12-30", "2026-12-31",
  ],
} as const;
