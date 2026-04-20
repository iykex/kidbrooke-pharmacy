import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Bandage,
  Droplet,
  Heart,
  HeartPulse,
  Pill,
  Shield,
  ShieldCheck,
  Stethoscope,
  Syringe,
  Wind,
} from "lucide-react";
import { TRACKING_EVENTS } from "@/lib/constants/general";
import type { TenantSlug } from "@/lib/types/tenant";
import type { PharmacyFirstConditionDoc, ServiceDoc } from "@/lib/types/firestore";
import type { Service } from "@/lib/types/general";
import type { NhsPfpHomeCard } from "@/lib/types/marketing-ui";
import { getServiceImage } from "@/lib/utils/service-images";

// ---------------------------------------------------------------------------
// Service group → icon
// ---------------------------------------------------------------------------

const GROUP_ICONS: Record<string, LucideIcon> = {
  vaccination: Syringe,
  screening: Activity,
  healthy_living: HeartPulse,
  contraception: Shield,
  prescription: Pill,
  private: Stethoscope,
};

export function iconForServiceGroup(group: string): LucideIcon {
  return GROUP_ICONS[group] ?? ShieldCheck;
}

// ---------------------------------------------------------------------------
// Service group → gradient colour + border colour
// ---------------------------------------------------------------------------

export const GROUP_COLORS: Record<string, { color: string; borderColor: string }> = {
  vaccination: { color: "from-chart-3/20 to-chart-3/5", borderColor: "border-chart-3/30" },
  screening: { color: "from-chart-2/20 to-chart-2/5", borderColor: "border-chart-2/30" },
  healthy_living: { color: "from-primary/20 to-primary/5", borderColor: "border-primary/30" },
  contraception: {
    color: "from-destructive/20 to-destructive/5",
    borderColor: "border-destructive/30",
  },
  prescription: { color: "from-primary/20 to-primary/5", borderColor: "border-primary/30" },
  private: { color: "from-chart-2/20 to-chart-2/5", borderColor: "border-chart-2/30" },
};

// ---------------------------------------------------------------------------
// Service id → category tab
// ---------------------------------------------------------------------------

/** Maps `ServiceDoc.serviceKind` to the UI tab category value. */
export function serviceGroupToCategory(
  serviceKind: ServiceDoc["serviceKind"],
): "nhs" | "private" {
  return serviceKind === "private" ? "private" : "nhs";
}

// ---------------------------------------------------------------------------
// Service id → analytics tracking event
// ---------------------------------------------------------------------------

const TRACKING_BY_SERVICE_ID: Record<string, string> = {
  flu_vaccination_nhs: TRACKING_EVENTS.fluVaccinationBookAppointment,
  flu_vaccination_private: TRACKING_EVENTS.fluVaccinationBookAppointment,
  covid_19_vaccination_nhs: TRACKING_EVENTS.covidVaccinationBookAppointment,
  covid_19_vaccination_private: TRACKING_EVENTS.covidVaccinationBookAppointment,
  blood_pressure_check: TRACKING_EVENTS.bloodPressureCheckBookAppointment,
  stop_smoking_nhs: TRACKING_EVENTS.stopSmokingBookAppointment,
  stop_smoking_private: TRACKING_EVENTS.stopSmokingBookAppointment,
  emergency_contraception_nhs: TRACKING_EVENTS.emergencyContraceptionBookAppointment,
  emergency_contraception_private: TRACKING_EVENTS.emergencyContraceptionBookAppointment,
};

export function trackingForServiceId(serviceId: string): string {
  return TRACKING_BY_SERVICE_ID[serviceId] ?? TRACKING_EVENTS.bookAppointmentButton;
}

// ---------------------------------------------------------------------------
// PFP condition id → icon (Lucide)
// ---------------------------------------------------------------------------

export const PFP_CARD_ICONS: Record<string, LucideIcon> = {
  ear_pain: Wind,
  infected_insect_bites: Bandage,
  bacterial_skin_infection: Shield,
  shingles: ShieldCheck,
  sinus_infection: Wind,
  sore_throat: Stethoscope,
  uti_women: Droplet,
};

export function iconForConditionId(id: string): LucideIcon {
  return PFP_CARD_ICONS[id] ?? Heart;
}

// ---------------------------------------------------------------------------
// PFP condition id → icon bg/text colour (home cards)
// ---------------------------------------------------------------------------

const PFP_COLOR: Record<string, { color: string; bgColor: string }> = {
  ear_pain: { color: "text-primary", bgColor: "bg-primary/10" },
  infected_insect_bites: { color: "text-chart-3", bgColor: "bg-chart-3/10" },
  bacterial_skin_infection: { color: "text-chart-2", bgColor: "bg-chart-2/10" },
  shingles: { color: "text-destructive", bgColor: "bg-destructive/10" },
  sinus_infection: { color: "text-chart-2", bgColor: "bg-chart-2/10" },
  sore_throat: { color: "text-chart-3", bgColor: "bg-chart-3/10" },
  uti_women: { color: "text-chart-3", bgColor: "bg-chart-3/10" },
};

// ---------------------------------------------------------------------------
// PFP condition id → analytics tracking event
// ---------------------------------------------------------------------------

const PFP_TRACKING: Record<string, string> = {
  ear_pain: TRACKING_EVENTS.earPainBookAppointment,
  infected_insect_bites: TRACKING_EVENTS.infectedInsectBitesBookAppointment,
  bacterial_skin_infection: TRACKING_EVENTS.bacterialSkinInfectionBookAppointment,
  shingles: TRACKING_EVENTS.shinglesBookAppointment,
  sinus_infection: TRACKING_EVENTS.sinusInfectionBookAppointment,
  sore_throat: TRACKING_EVENTS.soreThroatBookAppointment,
  uti_women: TRACKING_EVENTS.utiWomenBookAppointment,
};

/** Public accessor used by hooks — avoids duplicating the map. */
export function conditionTrackingForId(id: string): string {
  return PFP_TRACKING[id] ?? TRACKING_EVENTS.bookAppointmentButton;
}

// ---------------------------------------------------------------------------
// PFP condition card gradient palette (all-conditions page)
// ---------------------------------------------------------------------------

export const PFP_CONDITION_PALETTE: string[] = [
  "from-primary/20 to-primary/5",
  "from-chart-3/20 to-chart-3/5",
  "from-chart-2/20 to-chart-2/5",
  "from-destructive/20 to-destructive/5",
];

// ---------------------------------------------------------------------------
// NHS Pharmacy First home-page teaser cards
// ---------------------------------------------------------------------------

const NHS_PFP_HOME_IDS = [
  "ear_pain",
  "infected_insect_bites",
  "sinus_infection",
  "uti_women",
] as const;

export function buildNhsPharmacyFirstHomeCards(
  conditions: PharmacyFirstConditionDoc[],
  slug: TenantSlug,
): NhsPfpHomeCard[] {
  const byId = Object.fromEntries(conditions.map((c) => [c.id, c]));
  return NHS_PFP_HOME_IDS.map((id) => {
    const row = byId[id];
    const href = row?.tenantBookingUrls[slug] ?? "#";
    const palette = PFP_COLOR[id] ?? { color: "text-primary", bgColor: "bg-primary/10" };
    return {
      title: row?.title ?? id,
      description: row?.description ?? "",
      conditionId: id,
      color: palette.color,
      bgColor: palette.bgColor,
      href,
      tracking: conditionTrackingForId(id),
    };
  });
}

// ---------------------------------------------------------------------------
// ServiceDoc → Service view model
// ---------------------------------------------------------------------------

export function serviceDocToView(doc: ServiceDoc, slug: TenantSlug): Service {
  const link =
    doc.tenantBookingUrls[slug] ??
    doc.tenantBookingUrls.belvedere ??
    Object.values(doc.tenantBookingUrls)[0] ??
    "#";
  const category = serviceGroupToCategory(doc.serviceKind);
  const icon = iconForServiceGroup(doc.group);
  const palette = GROUP_COLORS[doc.group] ?? {
    color: "from-primary/20 to-primary/5",
    borderColor: "border-primary/30",
  };
  return {
    title: doc.title,
    description: doc.description,
    category,
    features: doc.features,
    image: getServiceImage(doc.id),
    link,
    icon,
    color: palette.color,
    borderColor: palette.borderColor,
    tracking: trackingForServiceId(doc.id),
    fundingLabel: doc.fundingLabel,
  };
}

export type { NhsPfpHomeCard } from "@/lib/types/marketing-ui";
