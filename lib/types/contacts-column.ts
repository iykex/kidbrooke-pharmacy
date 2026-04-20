import type { ContactsColumnData } from "@/lib/types/marketing-ui";

export type ContactsColumnReady = { isReady: true } & ContactsColumnData;

export type UseContactsColumnResult = { isReady: false } | ContactsColumnReady;
