import type { ContactFormFieldsMap, CookiePreferences } from "../types/general";

// ---------------------------------------------------------------------------
// Analytics & tracking
// ---------------------------------------------------------------------------

export const USER_ID_KEY = "uid";
export const SESSION_ID_KEY = "sid";
export const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 min
export const GEO_LOCATION_PROVIDER = "https://ipapi.co/json/";
export const TRACKING_ROUTE = "/api/analytics";
export const CACHED_LOCATION_KEY = "user-location";
export const TRACKING_EVENTS = {
  pageView: "page_view",
  phoneContactClick: "phone_contact_click",
  emailClick: "email_address_click",
  bookAppointmentButton: "book_appointment_button_click",
  orderPrescriptionButton: "order_prescription_button_click",
  contactFormSubmit: "contact_form_submit",
  chatSendButton: "chat_send_button_click",
  chatToggleButton: "chat_toggle_button_click",
  cookieToggleButton: "cookie_toggle_button",
  cookieAcceptAll: "cookie_accept_all_click",
  cookieEssentialOnly: "cookie_essential_only_click",
  cookieCustomise: "cookie_customize_click",
  cookieCustomiseView: "cookie_customize_view",
  androidAppDownloadButton: "android_app_download_button_click",
  iosAppDownloadButton: "ios_app_download_button_click",
  newsletterSubscribe: "newsletter_subscribe_click",
  testimonialNavigation: "testimonial_navigation_click",
  utiWomenBookAppointment: "uti_women_book_appointment_click",
  soreThroatBookAppointment: "sore_throat_book_appointment_click",
  earPainBookAppointment: "ear_pain_book_appointment_click",
  infectedInsectBitesBookAppointment:
    "infected_insect_bites_book_appointment_click",
  bacterialSkinInfectionBookAppointment:
    "bacterial_skin_infection_book_appointment_click",
  shinglesBookAppointment: "shingles_book_appointment_click",
  sinusInfectionBookAppointment: "sinus_infection_book_appointment_click",
  fluVaccinationBookAppointment: "flu_vaccination_book_appointment_click",
  covidVaccinationBookAppointment: "covid_vaccination_book_appointment_click",
  bloodPressureCheckBookAppointment:
    "blood_pressure_check_book_appointment_click",
  stopSmokingBookAppointment: "stop_smoking_book_appointment_click",
  emergencyContraceptionBookAppointment:
    "emergency_contraception_book_appointment_click",
  darkModeEnable: "dark_mode_enable",
  lightModeEnable: "light_mode_enable",
  whatsappLink: "whatsapp_link_click",
  linkedInLink: "linkedin_link_click",
  instagram: "instagram_link_click",
  x: "x_link_click",
  facebook: "facebook_link_click",
};

// ---------------------------------------------------------------------------
// Chatbot (localStorage)
// ---------------------------------------------------------------------------

export const VISITOR_NAME_KEY = "belvedere_visitor_name";
export const VISITOR_NAME_EXPIRY_KEY = "belvedere_visitor_name_expiry";
export const CHAT_HISTORY_KEY = "belvedere_chat_history";
export const CHAT_LAST_ACTIVITY_KEY = "belvedere_chat_last_activity";
export const CACHE_DURATION_MS = 4 * 60 * 60 * 1000; // 4 hours
export const IDLE_THRESHOLD_MS = 15 * 60 * 1000; // 15 minutes

// ---------------------------------------------------------------------------
// Cookies
// ---------------------------------------------------------------------------

export const COOKIE_CONSENT_KEY = "belvedere_cookie_consent";

export const COOKIE_PREFERENCES_KEY = "belvedere_cookie_preferences";

export const DEFAULT_PREFERENCES: CookiePreferences = {
  essential: true,
  analytics: false,
  marketing: false,
};

export const ALL_PREFERENCES: CookiePreferences = {
  essential: true,
  analytics: true,
  marketing: true,
};

export const COOKIE_PREFERENCES_ITEMS = [
  {
    id: "essential",
    title: "Essential Cookies",
    description: "Required for basic site functionality",
    key: "essential" as const,
  },
  {
    id: "analytics",
    title: "Analytics Cookies",
    description: "Help us improve our website",
    key: "analytics" as const,
  },
  {
    id: "marketing",
    title: "Marketing Cookies",
    description: "Personalized content and ads",
    key: "marketing" as const,
  },
];

// ---------------------------------------------------------------------------
// Site navigation & pages
// ---------------------------------------------------------------------------

export const INTERNAL_LINKS = {
  homePage: "/",
  pharmacyFirstPage: "/pharmacy-first",
  servicesPage: "/services",
  aboutPage: "/about-us",
  contactPage: "/contact-us",
  termsAndConditionsPage: "/terms-conditions",
  privacyPolicyPage: "/privacy-policy",
  cookiePolicyPage: "/cookie-policy",
};

/** Primary site nav — header and footer “Quick links” use the same order. */
export const MENU_LINKS = [
  { label: "Home", href: INTERNAL_LINKS.homePage },
  { label: "Pharmacy First", href: INTERNAL_LINKS.pharmacyFirstPage },
  { label: "Services", href: INTERNAL_LINKS.servicesPage },
  { label: "About", href: INTERNAL_LINKS.aboutPage },
  { label: "Contact", href: INTERNAL_LINKS.contactPage },
];

export const LEGAL_LINKS = [
  {
    label: "Terms & Conditions",
    href: INTERNAL_LINKS.termsAndConditionsPage,
  },
  {
    label: "Privacy Policy",
    href: INTERNAL_LINKS.privacyPolicyPage,
  },
  {
    label: "Cookie Policy",
    href: INTERNAL_LINKS.cookiePolicyPage,
  },
];

export const SERVICE_CATEGORIES = [
  { id: "all", label: "All Services" },
  { id: "nhs", label: "NHS First Services" },
  { id: "private", label: "Private Services" },
];

export const EMERGENCY_SERVICES_CONTACTS_PAGE = [
  {
    number: "999",
    label: "Emergency",
    description: "Life-threatening emergencies only",
    detail: "Chest pain, severe bleeding, loss of consciousness",
    bgFrom: "from-red-50",
    bgTo: "to-red-100/50",
    border: "border-red-200",
    badgeBg: "from-red-500",
    badgeTo: "to-red-600",
    numberColor: "text-red-600",
    labelColor: "text-red-700",
  },
  {
    number: "111",
    label: "Non-Emergency",
    description: "24/7 medical advice",
    detail: "When your GP is closed or for urgent medical advice",
    bgFrom: "from-blue-50",
    bgTo: "to-blue-100/50",
    border: "border-blue-200",
    badgeBg: "from-blue-500",
    badgeTo: "to-blue-600",
    numberColor: "text-blue-600",
    labelColor: "text-blue-700",
  },
];

export const CONTACT_FORM_FIELD_ITEMS: ContactFormFieldsMap[] = [
  {
    name: "name",
    label: "Full Name",
    placeholder: "Harriet Tevez",
  },
  {
    name: "email",
    label: "Email Address",
    placeholder: "harriet@gmail.com",
  },
  {
    name: "phone",
    label: "Phone Number",
    placeholder: "+44 7123 456700",
  },
  {
    name: "subject",
    label: "Subject",
    placeholder: "Prescription",
  },
];

export const NOT_FOUND_NAV_ITEMS = [
  {
    href: INTERNAL_LINKS.homePage,
    iconName: "Home",
    title: "Home",
    description: "Back to the homepage",
  },
  {
    href: INTERNAL_LINKS.servicesPage,
    iconName: "Search",
    title: "Services",
    description: "View our pharmacy services",
  },
  {
    href: INTERNAL_LINKS.pharmacyFirstPage,
    iconName: "MapPin",
    title: "Pharmacy First",
    description: "NHS Pharmacy First services",
  },
  {
    href: INTERNAL_LINKS.contactPage,
    iconName: "Phone",
    title: "Contact Us",
    description: "Get in touch with us",
  },
];

export const ERROR_TROUBLESHOOTING_STEPS = [
  "Refresh the page and try again",
  "Check your internet connection",
  "Clear your browser cache and cookies",
  "Try again in a few moments",
  "Contact us if the issue persists",
];

export const ABOUT_PAGE_BANNER_BUTTONS = [
  {
    text: "Get in Touch",
    href: INTERNAL_LINKS.contactPage,
    variant: "primary",
  },
  {
    text: "Our Services",
    href: INTERNAL_LINKS.servicesPage,
    variant: "default",
  },
];

export const DARK_HERO_PAGES = [
  INTERNAL_LINKS.homePage,
  INTERNAL_LINKS.aboutPage,
  INTERNAL_LINKS.contactPage,
];

export const CARD_COLORS_WHY_CHOOSE_US = [
  { bg: "bg-[#FFF9E6]", icon: "text-[#F9A825]", hover: "bg-[#F9A825]" },
  { bg: "bg-[#E8F5E9]", icon: "text-[#2E7D32]", hover: "bg-[#2E7D32]" },
  { bg: "bg-[#FCE4EC]", icon: "text-[#C62828]", hover: "bg-[#C62828]" },
  { bg: "bg-[#EDE7F6]", icon: "text-[#5E35B1]", hover: "bg-[#5E35B1]" },
];
