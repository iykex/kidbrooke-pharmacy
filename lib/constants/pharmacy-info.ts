export const PHARMACY_INFO = {
  name: "Kidbrooke Pharmacy",
  slug: "kidbrooke",
  phone: "020 8319 0115",
  phoneHref: "tel:02083190115",
  address: {
    line1: "134 Rochester Way",
    city: "London",
    region: "London SE",
    postcode: "SE3 8AR",
    country: "United Kingdom",
  },
  pharmadoctorUrl:
    "https://pharmadoctor.co.uk/patient/locations/london/london-se/Kidbrooke-Pharmacy-SE38AR-500",
  shortPharmadoctorUrl: "https://www.phdr.co.uk/500",
  superintendent: "MICHAEL TWENEBOA-KODUAH",
  gphcRegistrationNumber: "2057431",
  openingHours: [
    { day: "monday", open: "09:00", close: "18:30", closed: false },
    { day: "tuesday", open: "09:00", close: "18:30", closed: false },
    { day: "wednesday", open: "09:00", close: "18:30", closed: false },
    { day: "thursday", open: "09:00", close: "18:30", closed: false },
    { day: "friday", open: "09:00", close: "18:30", closed: false },
    { day: "saturday", open: "09:00", close: "13:00", closed: false },
    { day: "sunday", open: "00:00", close: "00:00", closed: true },
  ],
  company: {
    name: "MECKAY LIMITED",
    registrationNumber: "06454698",
    registeredIn: "UK",
    address: "OAKHURST, ST PAULS WOOD HILL, BR5 2SR",
  },
} as const;
