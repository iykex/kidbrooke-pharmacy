import type { ActionButton } from "@/lib/types/chatbot";
import type { WithFirestoreMeta, TenantScoped } from "./common";

export type ChatbotEntryDoc = WithFirestoreMeta &
  TenantScoped & {
    id: string;
    keywords: string[];
    answer: string;
    actions?: ActionButton[];
    priority: number;
  };
