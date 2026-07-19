import z4 from "zod/v4";
import { contactFormSchema } from "../schema";
import { FieldPath } from "react-hook-form";
import type { StaticImageData } from "next/image";
import type { ComponentType } from "react";

export interface Service {
  id: string;
  title: string;
  description: string;
  category: "nhs" | "private";
  features: string[];
  image: StaticImageData;
  link: string;
  icon: ComponentType<{ className?: string }>;
  color: string;
  borderColor: string;
  tracking: string;
  fundingLabel: string;
  providerLabel: string;
}

export type ButtonVariants =
  | "link"
  | "default"
  | "outline"
  | "destructive"
  | "secondary"
  | "ghost"
  | null
  | undefined;

type ContactFormType = z4.infer<typeof contactFormSchema>;
type ContactFormFieldNames = FieldPath<ContactFormType>;

export type ContactFormFieldsMap = {
  name: ContactFormFieldNames;
  label: string;
  placeholder: string;
};

export interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

export type CookiePreferencesState = {
  isCookieDialogueBoxVisible: boolean;
  showAllCookiePreferences: boolean;
  cookiePreferences: CookiePreferences;
  hasConsented: boolean;
};

export type CookiePreferencesAction =
  | { type: "INIT_CONSENTED"; preferences: CookiePreferences }
  | { type: "SHOW_MODAL" }
  | { type: "HIDE_MODAL" }
  | { type: "SAVE"; preferences: CookiePreferences }
  | { type: "OPEN_SETTINGS" }
  | { type: "SET_PREFERENCES"; preferences: CookiePreferences }
  | { type: "TOGGLE_ALL_PREFERENCES"; show: boolean };
