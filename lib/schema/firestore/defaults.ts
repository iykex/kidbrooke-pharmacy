import type {
  ChatbotEntryDoc,
  FaqDoc,
  LegalDocumentDoc,
  LegalSection,
  MarketingBlocksDoc,
  PharmacyFirstConditionDoc,
  ServiceDoc,
  TeamMemberDoc,
  TenantDoc,
  TestimonialDoc,
} from "@/lib/types/firestore";
import type { TenantSlug } from "@/lib/types/tenant";
import type { ActionButton } from "@/lib/types/chatbot";

export const TENANT_SLUGS: TenantSlug[] = ["belvedere", "kidbrooke", "lowfield"];
export const FALLBACK_UPDATED_AT = {
  toDate: () => new Date(0),
};

export const DEFAULT_ACTION_BUTTON: ActionButton = {
  label: "",
  href: "",
  icon: "external",
};

export const DEFAULT_LEGAL_SECTION: LegalSection = {
  number: "",
  title: "",
  type: "paragraphs",
  content: [],
  beforeText: "",
  afterText: "",
  intro: "",
  footer: "",
  note: "",
  bulletPoints: [],
  data: [],
  cookieTypes: [],
  tableData: [],
  subsections: [],
};

import { PHARMACY_INFO } from "@/lib/constants/pharmacy-info";

export const DEFAULT_TENANT_DOC: TenantDoc = {
  id: "kidbrooke",
  displayName: PHARMACY_INFO.name,
  address: {
    line1: PHARMACY_INFO.address.line1,
    city: PHARMACY_INFO.address.city,
    region: PHARMACY_INFO.address.region,
    postcode: PHARMACY_INFO.address.postcode,
    country: PHARMACY_INFO.address.country,
    googleMap: "",
    latitude: 0,
    longitude: 0,
  },
  phone: PHARMACY_INFO.phone,
  email: "info@kidbrookepharmacy.com",
  whatsappUrl: "",
  openingHours: [...PHARMACY_INFO.openingHours],
  specialHours: [],
  privateBookingUrl: PHARMACY_INFO.pharmadoctorUrl,
  bookAppointmentUrl: PHARMACY_INFO.pharmadoctorUrl,
  orderPrescriptionsUrl: "",
  appStoreIosUrl: "",
  appStoreAndroidUrl: "",
  social: { sameAs: [PHARMACY_INFO.pharmadoctorUrl] },
  seo: {
    description: `Kidbrooke Pharmacy at ${PHARMACY_INFO.address.line1}, ${PHARMACY_INFO.address.city} (${PHARMACY_INFO.address.postcode}). GPhC Reg: ${PHARMACY_INFO.gphcRegistrationNumber}, Superintendent: ${PHARMACY_INFO.superintendent}. Tel: ${PHARMACY_INFO.phone}. Managed by ${PHARMACY_INFO.company.name}.`,
    keywords: [
      "Kidbrooke Pharmacy",
      "London SE",
      "SE3 8AR",
      "GPhC 2057431",
      "MICHAEL TWENEBOA-KODUAH",
      "MECKAY LIMITED",
      "NHS Pharmacy",
      "Pharmadoctor",
    ],
    twitterHandle: "",
  },
  commonServiceNotes: "",
  published: true,
  updatedAt: FALLBACK_UPDATED_AT,
};

export const DEFAULT_SERVICE_DOC: Omit<ServiceDoc, "id"> = {
  tenantIds: [...TENANT_SLUGS],
  published: false,
  updatedAt: FALLBACK_UPDATED_AT,
  serviceKind: "nhs",
  group: "",
  title: "",
  description: "",
  features: [],
  fundingLabel: "",
  tenantBookingUrls: {
    belvedere: "",
    kidbrooke: "",
    lowfield: "",
  },
};

export const DEFAULT_PHARMACY_FIRST_DOC: Omit<PharmacyFirstConditionDoc, "id"> = {
  tenantIds: [...TENANT_SLUGS],
  published: false,
  updatedAt: FALLBACK_UPDATED_AT,
  title: "",
  description: "",
  eligibilityLabel: "",
  assetKey: "",
  tenantBookingUrls: {
    belvedere: "",
    kidbrooke: "",
    lowfield: "",
  },
};

export const DEFAULT_TESTIMONIAL_DOC: Omit<TestimonialDoc, "id"> = {
  tenantIds: [...TENANT_SLUGS],
  published: false,
  updatedAt: FALLBACK_UPDATED_AT,
  tenantId: "belvedere",
  authorName: "",
  authorRole: "",
  quote: "",
  rating: 5,
  assetKey: "",
};

export const DEFAULT_TEAM_MEMBER_DOC: Omit<TeamMemberDoc, "id"> = {
  tenantIds: [...TENANT_SLUGS],
  published: false,
  updatedAt: FALLBACK_UPDATED_AT,
  tenantId: "belvedere",
  name: "",
  role: "",
  bio: "",
  yearsExperience: "",
  assetKey: "",
  profileUrl: "",
};

export const DEFAULT_FAQ_DOC: Omit<FaqDoc, "id"> = {
  tenantIds: [...TENANT_SLUGS],
  published: false,
  updatedAt: FALLBACK_UPDATED_AT,
  question: "",
  answer: "",
};

export const DEFAULT_CHATBOT_ENTRY_DOC: Omit<ChatbotEntryDoc, "id"> = {
  tenantIds: [...TENANT_SLUGS],
  published: false,
  updatedAt: FALLBACK_UPDATED_AT,
  keywords: [],
  answer: "",
  actions: [],
  priority: 0,
};

export const DEFAULT_MARKETING_BLOCKS_DOC: MarketingBlocksDoc = {
  tenantIds: [...TENANT_SLUGS],
  published: false,
  updatedAt: FALLBACK_UPDATED_AT,
  trustBadges: [],
  aboutHeroStats: [],
  aboutHeroBadges: [],
  keyBenefits: [],
  whyChooseUs: [],
  ourProcessSteps: [],
  ctaFeatureLines: [],
  newsletterFeatures: [],
  downloadAppFeatures: [],
  pfpBenefits: [],
  ourValues: [],
  quickActions: [],
};

export const DEFAULT_LEGAL_DOCUMENT_DOC: LegalDocumentDoc = {
  tenantIds: [...TENANT_SLUGS],
  published: false,
  updatedAt: FALLBACK_UPDATED_AT,
  sections: [],
  version: "",
  effectiveDate: "",
};
