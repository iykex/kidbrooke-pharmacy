import type { WithFirestoreMeta, TenantScoped } from "./common";

export type FaqDoc = WithFirestoreMeta &
  TenantScoped & {
    id: string;
    question: string;
    answer: string;
    published: boolean;
  };
