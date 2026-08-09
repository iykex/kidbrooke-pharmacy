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

/** Match user text to a keyword (substring, word overlap, or shared prefix for e.g. located/location). */
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

// Knowledge base search (entries loaded from Firestore at runtime)
export function findBestResponse(
  query: string,
  knowledgeBase: KnowledgeBaseItem[],
  phone?: string,
): { answer: string; actions?: ActionButton[] } {
  const lowerQuery = query.toLowerCase();

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

  if (PRESCRIPTION_KEYWORDS.some((kw) => lowerQuery.includes(kw))) {
    return {
      answer:
        "I am Bella, your AI pharmacy assistant. ⚠️ Please note that as an AI, I am strictly not permitted to prescribe medication, recommend prescription dosages, or offer medical diagnoses. For any prescription inquiries or medical advice, please consult our qualified pharmacist or a doctor.",
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

  return {
    answer:
      "I'm not sure about that specific question, but I'd be happy to help! You can ask me about our opening hours, services, prescriptions, vaccinations, or contact information. Alternatively, please call us or visit us in store for personalized assistance.",
    actions: [
      ...(phone
        ? [{ label: "Call Us", href: `tel:${phone.replace(/\s/g, "")}`, icon: "phone" as const }]
        : []),
      { label: "View Services", href: "/services", icon: "external" as const },
    ],
  };
}
