export interface HeroCampaignSlide {
  id: string;
  badge: string;
  badgeVariant?: "nhs" | "private" | "seasonal" | "urgent";
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  ctaText: string;
  ctaHref: string;
  ctaKind: "internal" | "external";
  isNhsFunded?: boolean;
  active: boolean;
  priority: number; // lower number = higher priority
  tenantIds?: Array<"belvedere" | "kidbrooke" | "lowfield">;
}

export const DEFAULT_HERO_CAMPAIGNS: HeroCampaignSlide[] = [
  {
    id: "meningitis-b",
    badge: "Specialist Clinical Vaccination",
    badgeVariant: "private",
    title: "Meningitis B",
    subtitle: "Private Clinical Protection",
    description:
      "Rapid protection against severe meningococcal group B infection for infants, children, adolescents, and university students.",
    highlights: [
      "Private consultations available across all branches",
      "Direct PharmaDoctor digital pre-consultation",
      "Safe, accredited PGD clinical administration",
    ],
    ctaText: "Book Meningitis B",
    ctaHref: "/services/meningitis-b-vaccination",
    ctaKind: "internal",
    isNhsFunded: false,
    active: true,
    priority: 1,
    tenantIds: ["belvedere", "kidbrooke", "lowfield"],
  },
  {
    id: "seasonal-flu",
    badge: "Autumn / Winter Priority",
    badgeVariant: "seasonal",
    title: "NHS & Private Flu",
    subtitle: "Seasonal Annual Protection",
    description:
      "Free NHS flu vaccines for eligible cohorts (ages 65+, chronic health conditions, pregnant women) and private walk-ins for all non-eligible adults.",
    highlights: [
      "Free NHS eligibility or affordable private fee",
      "Walk-in capacity managed dynamically",
      "Certified pharmacist administration in private room",
    ],
    ctaText: "Get Flu Protection",
    ctaHref: "/services/flu-vaccination",
    ctaKind: "internal",
    isNhsFunded: true,
    active: true,
    priority: 2,
    tenantIds: ["belvedere", "kidbrooke", "lowfield"],
  },
  {
    id: "covid-booster",
    badge: "NHS National Programme",
    badgeVariant: "nhs",
    title: "COVID-19 Seasonal Booster",
    subtitle: "National NHS Immunity Campaign",
    description:
      "Protect yourself and loved ones with the authorized seasonal booster jab, synchronized with the NHS National Booking System to prevent double-booking.",
    highlights: [
      "Official NHS vaccination centre status",
      "Direct synchronization with NHS NBS portal",
      "Walk-in availability during scheduled clinic hours",
    ],
    ctaText: "Book COVID Booster",
    ctaHref: "/services/covid-vaccination",
    ctaKind: "internal",
    isNhsFunded: true,
    active: true,
    priority: 3,
    tenantIds: ["belvedere", "kidbrooke", "lowfield"],
  },
  {
    id: "pharmacy-first",
    badge: "NHS Walk-In Care",
    badgeVariant: "nhs",
    title: "NHS Pharmacy First",
    subtitle: "7 Common Conditions Treated",
    description:
      "Get free prescription treatments directly from our prescribing pharmacists without waiting for a GP appointment.",
    highlights: [
      "Earache, Sore Throat, Sinusitis, Impetigo",
      "Shingles, Infected Insect Bites & Uncomplicated UTIs",
      "Prescription medications supplied on the spot",
    ],
    ctaText: "Explore Pharmacy First",
    ctaHref: "/pharmacy-first",
    ctaKind: "internal",
    isNhsFunded: true,
    active: true,
    priority: 4,
    tenantIds: ["belvedere", "kidbrooke", "lowfield"],
  },
];
