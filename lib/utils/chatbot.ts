import {
  VISITOR_NAME_KEY,
  VISITOR_NAME_EXPIRY_KEY,
  CHAT_HISTORY_KEY,
  CHAT_LAST_ACTIVITY_KEY,
  CACHE_DURATION_MS,
  IDLE_THRESHOLD_MS,
} from "@/lib/constants/general";
import type { ActionButton, KnowledgeBaseItem, Message } from "@/lib/types/chatbot";

// Visitor name helpers
export function getVisitorName(): string | null {
  if (typeof window === "undefined") return null;

  const expiry = localStorage.getItem(VISITOR_NAME_EXPIRY_KEY);
  if (expiry && Date.now() > parseInt(expiry)) {
    localStorage.removeItem(VISITOR_NAME_KEY);
    localStorage.removeItem(VISITOR_NAME_EXPIRY_KEY);
    return null;
  }

  return localStorage.getItem(VISITOR_NAME_KEY);
}

export function setVisitorName(name: string): void {
  if (typeof window === "undefined") return;

  localStorage.setItem(VISITOR_NAME_KEY, name);
  localStorage.setItem(VISITOR_NAME_EXPIRY_KEY, (Date.now() + CACHE_DURATION_MS).toString());
}

// Chat history helpers
export function getChatHistory(): Message[] | null {
  if (typeof window === "undefined") return null;

  try {
    const history = localStorage.getItem(CHAT_HISTORY_KEY);
    if (!history) return null;

    const parsed = JSON.parse(history) as Array<Message & { timestamp: string }>;
    if (!Array.isArray(parsed)) return null;
    return parsed.map((msg) => {
      const d = new Date(msg.timestamp);
      return {
        ...msg,
        timestamp: Number.isNaN(d.getTime()) ? new Date() : d,
      };
    });
  } catch {
    return null;
  }
}

export function saveChatHistory(messages: Message[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(messages));
  localStorage.setItem(CHAT_LAST_ACTIVITY_KEY, Date.now().toString());
}

export function getLastActivityTime(): number | null {
  if (typeof window === "undefined") return null;
  const time = localStorage.getItem(CHAT_LAST_ACTIVITY_KEY);
  return time ? parseInt(time) : null;
}

export function clearChatHistory(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(CHAT_HISTORY_KEY);
  localStorage.removeItem(CHAT_LAST_ACTIVITY_KEY);
}

export function isIdleForTooLong(): boolean {
  const lastActivity = getLastActivityTime();
  if (!lastActivity) return false;
  return Date.now() - lastActivity > IDLE_THRESHOLD_MS;
}

function sharedPrefixLength(a: string, b: string): number {
  const n = Math.min(a.length, b.length);
  let i = 0;
  while (i < n && a[i] === b[i]) i++;
  return i;
}

function keywordMatchesQuery(lowerQuery: string, rawKeyword: string): boolean {
  const kw = String(rawKeyword).toLowerCase();
  if (kw.length < 2) return false;
  if (lowerQuery.includes(kw)) return true;
  for (const word of lowerQuery.split(/\W+/)) {
    if (word.length < 3) continue;
    if (word.includes(kw) || kw.includes(word)) return true;
    if (kw.length >= 4 && word.length >= 4 && sharedPrefixLength(word, kw) >= 4) return true;
  }
  return false;
}

export function findBestResponse(
  query: string,
  knowledgeBase: KnowledgeBaseItem[],
  phone?: string,
): { answer: string; actions?: ActionButton[] } {
  const lowerQuery = query.toLowerCase();

  const EMERGENCY_POISON_KEYWORDS = [
    "poison",
    "poisoning",
    "poisoned",
    "ingested poison",
    "swallowed chemical",
    "chemical exposure",
    "toxic",
    "toxin",
    "overdose",
    "overdosed",
    "bleach",
    "rat poison",
    "swallowed battery",
    "anaphylaxis",
    "can't breathe",
    "cannot breathe",
    "chest pain",
    "heart attack",
    "stroke",
    "unconscious",
    "severe bleeding",
    "seizure",
    "choking",
    "collapse",
  ];

  const PRESCRIPTION_KEYWORDS = [
    "prescribe",
    "prescription",
    "antibiotic",
    "dose",
    "dosage",
    "diagnose",
    "diagnosis",
    "cure",
    "what pill",
    "what drug",
    "give me medicine",
    "issue medicine",
  ];

  const SENSITIVE_HEALTH_KEYWORDS = [
    "abortion",
    "termination",
    "morning after pill",
    "emergency contraception",
    "ellaone",
    "levonorgestrel",
    "pregnancy test",
    "pregnant",
    "unplanned pregnancy",
    "bpas",
    "msi reproductive",
    "sti",
    "std",
    "chlamydia",
    "gonorrhea",
    "thrush",
    "herpes",
    "hiv",
    "pep",
    "prep",
    "sexual health",
    "depression",
    "anxiety",
    "panic attack",
    "mental health",
    "crisis",
    "samaritans",
    "suicide",
    "suicidal",
    "self harm",
  ];

  const SYMPTOM_KEYWORDS = [
    "headache",
    "head ache",
    "migraine",
    "pain",
    "painful",
    "ache",
    "aching",
    "sore",
    "soreness",
    "fever",
    "feverish",
    "temperature",
    "sick",
    "unwell",
    "stomach",
    "cough",
    "sore throat",
    "flu",
    "dizzy",
    "dizziness",
    "nausea",
    "rash",
    "injury",
    "hurt",
    "cramps",
    "vomiting",
    "feeling ill",
    "not feeling well",
    "issue",
    "problem",
  ];

  if (EMERGENCY_POISON_KEYWORDS.some((kw) => lowerQuery.includes(kw))) {
    return {
      answer:
        "🚨 URGENT MEDICAL EMERGENCY NOTICE: If you or someone else has ingested poison, swallowed chemicals, taken an overdose, or is experiencing a life-threatening medical emergency (such as severe breathing difficulty or chest pain), PLEASE CALL 999 IMMEDIATELY for an emergency ambulance or go directly to the nearest hospital A&E department. You can also dial NHS 111 for urgent advice.",
      actions: [
        { label: "Call 999 Emergency", href: "tel:999", icon: "phone" as const },
        { label: "Call NHS 111", href: "tel:111", icon: "phone" as const },
      ],
    };
  }

  if (PRESCRIPTION_KEYWORDS.some((kw) => lowerQuery.includes(kw))) {
    return {
      answer:
        "I am Bella, your AI pharmacy assistant. I'm sorry to hear you're dealing with this. Please note that as an AI, I am strictly not permitted to prescribe medication, recommend prescription dosages, or offer medical diagnoses. For any prescription requests or clinical advice, please consult our qualified pharmacist or a doctor.",
      actions: [
        ...(phone
          ? [{ label: "Call Pharmacist", href: `tel:${phone.replace(/\s+/g, "")}`, icon: "phone" as const }]
          : []),
        { label: "Book Appointment", href: "/services", icon: "calendar" as const },
      ],
    };
  }

  let bestMatch = { score: 0, answer: "", actions: undefined as ActionButton[] | undefined };

  for (const item of knowledgeBase) {
    const keywords = Array.isArray(item.keywords) ? item.keywords : [];
    const matchCount = keywords.filter((keyword) =>
      keywordMatchesQuery(lowerQuery, keyword)
    ).length;

    if (matchCount > bestMatch.score) {
      const answer = typeof item.answer === "string" ? item.answer : "";
      bestMatch = { score: matchCount, answer, actions: item.actions };
    }
  }

  if (bestMatch.score > 0) {
    return { answer: bestMatch.answer, actions: bestMatch.actions };
  }

  if (SENSITIVE_HEALTH_KEYWORDS.some((kw) => lowerQuery.includes(kw))) {
    return {
      answer:
        "Please rest assured that your privacy is completely protected with us. For emergency contraception (morning-after pill), confidential advice on pregnancy choices, or sexual health care, our pharmacy offers private consultation rooms. You can also access confidential UK services via BPAS (03457 30 40 30) or NHS 111. Please speak with our pharmacist directly for caring, non-judgmental support.",
      actions: [
        ...(phone
          ? [{ label: "Speak to Pharmacist Privately", href: `tel:${phone.replace(/\s+/g, "")}`, icon: "phone" as const }]
          : []),
        { label: "Book Consultation", href: "/services", icon: "calendar" as const },
      ],
    };
  }

  if (SYMPTOM_KEYWORDS.some((kw) => lowerQuery.includes(kw))) {
    return {
      answer:
        "I'm so sorry to hear you're dealing with that. Being unwell or uncomfortable is never pleasant. While as an AI assistant I cannot diagnose conditions or prescribe medication, our pharmacy team is here to support you. Please feel free to speak directly with our pharmacist for advice on over-the-counter remedies or book a consultation.",
      actions: [
        ...(phone
          ? [{ label: "Call Pharmacist", href: `tel:${phone.replace(/\s+/g, "")}`, icon: "phone" as const }]
          : []),
        { label: "Book Appointment", href: "/services", icon: "calendar" as const },
        { label: "View Services", href: "/services", icon: "external" as const },
      ],
    };
  }

  return {
    answer:
      "I understand you're looking for assistance! As your pharmacy assistant, I'd be glad to help you with our opening hours, NHS & private services, prescription collection, vaccinations, or connecting you directly with our pharmacist. How can I best help you right now?",
    actions: [
      ...(phone
        ? [{ label: "Call Us", href: `tel:${phone.replace(/\s/g, "")}`, icon: "phone" as const }]
        : []),
      { label: "View Services", href: "/services", icon: "external" as const },
    ],
  };
}
