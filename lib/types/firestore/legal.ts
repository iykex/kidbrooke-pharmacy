import type { WithFirestoreMeta, TenantScoped } from "./common";

/** Mirrors section shapes used by privacy / cookie / terms pages */
export type LegalSectionParagraphs = {
  number: string;
  title: string;
  type: "paragraphs";
  content: string[];
};

export type LegalSectionBulletPoints = {
  number: string;
  title: string;
  type: "bulletPoints";
  beforeText?: string;
  afterText?: string;
  bulletPoints: unknown[];
};

export type LegalSection =
  | LegalSectionParagraphs
  | LegalSectionBulletPoints
  | Record<string, unknown>;

export type LegalDocumentDoc = WithFirestoreMeta &
  TenantScoped & {
    sections: LegalSection[];
    version: string;
    effectiveDate: string;
  };
