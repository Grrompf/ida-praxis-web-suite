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
    lat: 51.5157115,
    lon: 14.7173844,
  },
  hours: "Mo–Fr: 8:00–12:00 & 14:00–18:00",
} as const;
