import z4 from "zod/v4";

export const newsletterSchema = z4.object({
  email: z4.email().trim(),
});

export const contactFormSchema = z4.object({
  name: z4
    .string("Required")
    .trim()
    .max(50, "Name must be less than 50 characters")
    .min(2, "Name must be more than 2 characters"),
  email: z4.email().trim(),
  phone: z4.string().trim(),
  subject: z4
    .string()
    .trim()
    .max(50, "Subject must be less than 20 characters")
    .min(2, "Subject must be more than 5 characters"),
  message: z4
    .string()
    .trim()
    .max(50, "Message must be less than 250 characters")
    .min(2, "Subject must be more than 5 characters"),
});

export const analyticsPayloadSchema = z4.object({
  event_issue: z4.string(),
  country: z4.string().optional(),
  country_code: z4.string().optional(),
  city: z4.string().optional(),
  region: z4.string().optional(),
  latitude: z4.number().optional(),
  longitude: z4.number().optional(),
  user_id: z4.string(),
  session_id: z4.string(),
  url: z4.string(),
  referrer: z4.string().nullable(),
  user_agent: z4.string(),
  language: z4.string(),
  screen_width: z4.number(),
  screen_height: z4.number(),
  ts: z4.number(),
  event_name: z4.string(),
});
