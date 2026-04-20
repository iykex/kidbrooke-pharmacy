import { z } from "zod";

const timestampLikeSchema = z.custom<unknown>(
  (value) =>
    typeof value === "object" &&
    value !== null &&
    "toDate" in value &&
    typeof (value as { toDate?: unknown }).toDate === "function",
  "Expected Firestore Timestamp-like object",
);

const firestoreMetaSchema = z.object({
  updatedAt: timestampLikeSchema,
}).strict();

export const tenantSlugSchema = z.enum(["belvedere", "kidbrooke", "lowfield"]);

const tenantScopedSchema = z.object({
  tenantIds: z.array(tenantSlugSchema),
  published: z.boolean(),
}).strict();

export const dayOfWeekSchema = z.enum([
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
]);

export const tenantOpeningHourSchema = z.object({
  day: dayOfWeekSchema,
  open: z.string(),
  close: z.string(),
  closed: z.boolean(),
}).strict();

export const tenantSpecialHourSchema = z.object({
  label: z.string(),
  date: z.string(),
  closed: z.boolean(),
}).strict();

export const tenantAddressSchema = z.object({
  line1: z.string(),
  city: z.string(),
  region: z.string(),
  postcode: z.string(),
  country: z.string(),
  googleMap: z.string(),
  latitude: z.number(),
  longitude: z.number(),
}).strict();

export const tenantSocialSchema = z.object({
  sameAs: z.array(z.string()),
}).strict();

export const tenantSeoSchema = z.object({
  description: z.string(),
  keywords: z.array(z.string()),
  twitterHandle: z.string(),
}).strict();

export const tenantDocSchema = firestoreMetaSchema.extend({
  id: tenantSlugSchema,
  displayName: z.string(),
  address: tenantAddressSchema,
  phone: z.string(),
  email: z.string(),
  whatsappUrl: z.string(),
  openingHours: z.array(tenantOpeningHourSchema),
  specialHours: z.array(tenantSpecialHourSchema),
  privateBookingUrl: z.string(),
  bookAppointmentUrl: z.string(),
  orderPrescriptionsUrl: z.string(),
  appStoreIosUrl: z.string(),
  appStoreAndroidUrl: z.string(),
  social: tenantSocialSchema,
  seo: tenantSeoSchema,
  commonServiceNotes: z.string(),
  published: z.boolean(),
}).strict();

export const serviceKindSchema = z.enum(["nhs", "private"]);

export const serviceDocSchema = firestoreMetaSchema
  .merge(tenantScopedSchema)
  .extend({
    id: z.string(),
    serviceKind: serviceKindSchema,
    group: z.string(),
    title: z.string(),
    description: z.string(),
    features: z.array(z.string()),
    fundingLabel: z.string(),
    tenantBookingUrls: z.record(tenantSlugSchema, z.string()),
    published: z.boolean(),
  }).strict();

export const pharmacyFirstConditionDocSchema = firestoreMetaSchema
  .merge(tenantScopedSchema)
  .extend({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    eligibilityLabel: z.string(),
    assetKey: z.string(),
    tenantBookingUrls: z.record(tenantSlugSchema, z.string()),
  }).strict();

export const testimonialDocSchema = firestoreMetaSchema
  .merge(tenantScopedSchema)
  .extend({
    id: z.string(),
    tenantId: tenantSlugSchema,
    authorName: z.string(),
    authorRole: z.string(),
    quote: z.string(),
    rating: z.number(),
    assetKey: z.string(),
  }).strict();

export const teamMemberDocSchema = firestoreMetaSchema
  .merge(tenantScopedSchema)
  .extend({
    id: z.string(),
    tenantId: tenantSlugSchema,
    name: z.string(),
    role: z.string(),
    bio: z.string(),
    yearsExperience: z.string(),
    assetKey: z.string(),
    profileUrl: z.string(),
  }).strict();

export const faqDocSchema = firestoreMetaSchema
  .merge(tenantScopedSchema)
  .extend({
    id: z.string(),
    question: z.string(),
    answer: z.string(),
    published: z.boolean(),
  }).strict();

export const actionButtonSchema = z.object({
  label: z.string(),
  href: z.string(),
  icon: z.enum(["calendar", "phone", "location", "external", "prescription"]),
}).strict();

export const chatbotEntryDocSchema = firestoreMetaSchema
  .merge(tenantScopedSchema)
  .extend({
    id: z.string(),
    keywords: z.array(z.string()),
    answer: z.string(),
    actions: z.array(actionButtonSchema),
    priority: z.number(),
  }).strict();

export const trustBadgeItemSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
}).strict();

export const statItemSchema = z.object({
  value: z.string(),
  label: z.string(),
}).strict();

export const textBadgeItemSchema = z.object({
  text: z.string(),
}).strict();

export const keyBenefitBlockSchema = z.object({
  title: z.string(),
  bullets: z.array(z.string()),
}).strict();

export const whyChooseItemSchema = z.object({
  title: z.string(),
  description: z.string(),
}).strict();

export const processStepItemSchema = z.object({
  number: z.string(),
  title: z.string(),
  description: z.string(),
}).strict();

export const featureLineItemSchema = z.object({
  title: z.string(),
  description: z.string(),
}).strict();

export const pfpBenefitItemSchema = z.object({
  title: z.string(),
  description: z.string(),
}).strict();

export const ourValueItemSchema = z.object({
  title: z.string(),
  description: z.string(),
}).strict();

export const quickActionItemSchema = z.object({
  label: z.string(),
  query: z.string(),
  iconName: z.string(),
}).strict();

export const marketingBlocksDocSchema = firestoreMetaSchema
  .merge(tenantScopedSchema)
  .extend({
    trustBadges: z.array(trustBadgeItemSchema),
    aboutHeroStats: z.array(statItemSchema),
    aboutHeroBadges: z.array(textBadgeItemSchema),
    keyBenefits: z.array(keyBenefitBlockSchema),
    whyChooseUs: z.array(whyChooseItemSchema),
    ourProcessSteps: z.array(processStepItemSchema),
    ctaFeatureLines: z.array(z.string()),
    newsletterFeatures: z.array(featureLineItemSchema),
    downloadAppFeatures: z.array(featureLineItemSchema),
    pfpBenefits: z.array(pfpBenefitItemSchema),
    ourValues: z.array(ourValueItemSchema),
    quickActions: z.array(quickActionItemSchema),
  }).strict();

export const legalBulletPointItemSchema = z.object({
  title: z.string(),
  desc: z.string(),
  category: z.string(),
  period: z.string(),
  right: z.string(),
  purpose: z.string(),
}).strict();

export const legalDataItemSchema = z.object({
  service: z.string(),
  purpose: z.string(),
  privacy: z.string(),
  browser: z.string(),
  steps: z.string(),
  link: z.string(),
  type: z.string(),
  desc: z.string(),
}).strict();

export const legalCookieTypeSchema = z.object({
  title: z.string(),
  description: z.string(),
  note: z.string(),
  color: z.string(),
  data: z.array(z.string()),
}).strict();

export const legalTableDataItemSchema = z.object({
  type: z.string(),
  name: z.string(),
  purpose: z.string(),
  duration: z.string(),
}).strict();

export const legalSubsectionSchema = z.object({
  title: z.string(),
  description: z.string(),
}).strict();

export const legalSectionBaseSchema = z.object({
  number: z.string(),
  title: z.string(),
  type: z.string(),
  content: z.array(z.string()),
  beforeText: z.string(),
  afterText: z.string(),
  intro: z.string(),
  footer: z.string(),
  note: z.string(),
  bulletPoints: z.array(legalBulletPointItemSchema),
  data: z.array(legalDataItemSchema),
  cookieTypes: z.array(legalCookieTypeSchema),
  tableData: z.array(legalTableDataItemSchema),
  subsections: z.array(legalSubsectionSchema),
}).strict();

export const legalSectionParagraphsSchema = legalSectionBaseSchema.extend({
  type: z.literal("paragraphs"),
});

export const legalSectionTextSchema = legalSectionBaseSchema.extend({
  type: z.literal("text"),
});

export const legalSectionBulletPointsSchema = legalSectionBaseSchema.extend({
  type: z.literal("bulletPoints"),
});

export const legalSectionBulletPointsWithTitlesSchema = legalSectionBaseSchema.extend({
  type: z.literal("bulletPointsWithTitles"),
});

export const legalSectionBulletPointsWithCategorySchema = legalSectionBaseSchema.extend({
  type: z.literal("bulletPointsWithCategory"),
});

export const legalSectionCookieTypesSchema = legalSectionBaseSchema.extend({
  type: z.literal("cookie-types"),
});

export const legalSectionDurationSchema = legalSectionBaseSchema.extend({
  type: z.literal("duration"),
});

export const legalSectionThirdPartySchema = legalSectionBaseSchema.extend({
  type: z.literal("third-party"),
});

export const legalSectionPreferencesSchema = legalSectionBaseSchema.extend({
  type: z.literal("preferences"),
});

export const legalSectionBrowserControlsSchema = legalSectionBaseSchema.extend({
  type: z.literal("browser-controls"),
});

export const legalSectionDntSchema = legalSectionBaseSchema.extend({
  type: z.literal("dnt"),
});

export const legalSectionOptoutSchema = legalSectionBaseSchema.extend({
  type: z.literal("optout"),
});

export const legalSectionTableSchema = legalSectionBaseSchema.extend({
  type: z.literal("table"),
});

export const legalSectionSecuritySchema = legalSectionBaseSchema.extend({
  type: z.literal("security"),
});

export const legalSectionUpdatesSchema = legalSectionBaseSchema.extend({
  type: z.literal("updates"),
});

export const legalSectionSubsectionsSchema = legalSectionBaseSchema.extend({
  type: z.literal("subsections"),
});

export const legalSectionSchema = z.discriminatedUnion("type", [
  legalSectionParagraphsSchema,
  legalSectionTextSchema,
  legalSectionBulletPointsSchema,
  legalSectionBulletPointsWithTitlesSchema,
  legalSectionBulletPointsWithCategorySchema,
  legalSectionCookieTypesSchema,
  legalSectionDurationSchema,
  legalSectionThirdPartySchema,
  legalSectionPreferencesSchema,
  legalSectionBrowserControlsSchema,
  legalSectionDntSchema,
  legalSectionOptoutSchema,
  legalSectionTableSchema,
  legalSectionSecuritySchema,
  legalSectionUpdatesSchema,
  legalSectionSubsectionsSchema,
]);

export const legalDocumentIdSchema = z.enum(["privacy", "cookie", "terms"]);

export const legalDocumentDocSchema = firestoreMetaSchema
  .merge(tenantScopedSchema)
  .extend({
    sections: z.array(legalSectionSchema),
    version: z.string(),
    effectiveDate: z.string(),
  }).strict();
