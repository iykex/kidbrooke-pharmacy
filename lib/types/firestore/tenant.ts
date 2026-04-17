import type { WithFirestoreMeta } from "./common";

export type DayOfWeek =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export type TenantOpeningHour = {
  day: DayOfWeek;
  open: string;
  close: string;
  closed: boolean;
};

export type TenantSpecialHour = {
  label: string;
  date: string;
  closed: boolean;
};

export type TenantAddress = {
  line1: string;
  city: string;
  region: string;
  postcode: string;
  country: string;
};

export type TenantDoc = WithFirestoreMeta & {
  displayName: string;
  address: TenantAddress;
  phone: string;
  email: string;
  /**
   * Optional WhatsApp URL template. Use `{phonenumber}` as a placeholder for the international
   * digits derived from `phone` (e.g. `"https://wa.me/{phonenumber}"` → `https://wa.me/442083114087`).
   */
  whatsappUrl?: string;
  openingHours: TenantOpeningHour[];
  specialHours: TenantSpecialHour[];
  privateBookingUrl: string;
  bookAppointmentUrl: string;
  orderPrescriptionsUrl: string;
  appStoreIosUrl: string;
  appStoreAndroidUrl: string;
  commonServiceNotes: string;
  published: boolean;
};
