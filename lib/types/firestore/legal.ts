import type { z } from "zod";
import type {
  legalDocumentDocSchema,
  legalDocumentIdSchema,
  legalSectionBulletPointsSchema,
  legalSectionParagraphsSchema,
  legalSectionSchema,
} from "@/lib/schema/firestore";

export type LegalSectionParagraphs = z.infer<typeof legalSectionParagraphsSchema>;
export type LegalSectionBulletPoints = z.infer<
  typeof legalSectionBulletPointsSchema
>;
export type LegalSection = z.infer<typeof legalSectionSchema>;
export type LegalDocumentId = z.infer<typeof legalDocumentIdSchema>;
export type LegalDocumentDoc = z.infer<typeof legalDocumentDocSchema>;
