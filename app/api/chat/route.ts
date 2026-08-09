import { NextResponse } from "next/server";
import { getChatbotEntriesForTenant } from "@/lib/services/firestore/queries";

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
  "venom",
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
  "collapsed",
  "veneno",
  "envenenamiento",
  "intoxication",
  "empoisonnement",
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
  "receta",
  "ordonnance",
  "rezept",
  "recepta",
  "وصفة",
  "नुस्खा",
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
  "pains",
  "ache",
  "aching",
  "sore",
  "soreness",
  "fever",
  "feverish",
  "temperature",
  "high temp",
  "chills",
  "shivers",
  "sick",
  "sickness",
  "ill",
  "illness",
  "unwell",
  "poorly",
  "feeling poorly",
  "feeling bad",
  "not feeling well",
  "feeling ill",
  "feeling rough",
  "under the weather",
  "dodgy tummy",
  "tummy ache",
  "tummy bug",
  "stomach bug",
  "stomach",
  "stomachache",
  "belly ache",
  "nausea",
  "nauseous",
  "queasy",
  "throwing up",
  "vomiting",
  "vomit",
  "barf",
  "puking",
  "diarrhea",
  "diarrhoea",
  "constipation",
  "heartburn",
  "acid reflux",
  "indigestion",
  "bloating",
  "cough",
  "coughing",
  "coughing fit",
  "sore throat",
  "throat",
  "cold",
  "flu",
  "flu-like",
  "congestion",
  "congested",
  "runny nose",
  "running nose",
  "stuffy nose",
  "blocked nose",
  "sneezing",
  "phlegm",
  "dizzy",
  "dizziness",
  "dizzy spells",
  "lightheaded",
  "vertigo",
  "rash",
  "itching",
  "itchy",
  "eczema",
  "hives",
  "burn",
  "blister",
  "bite",
  "insect bite",
  "infection",
  "swelling",
  "swollen",
  "injury",
  "hurt",
  "hurting",
  "cramps",
  "cramping",
  "backache",
  "bad back",
  "back pain",
  "joint pain",
  "muscle pain",
  "bad leg",
  "sore neck",
  "stiff",
  "stiffness",
  "fatigue",
  "tired",
  "weak",
  "weakness",
  "pins and needles",
  "allergy",
  "allergic",
  "haemorrhoids",
  "hemorrhoids",
  "issue",
  "problem",
  "dolor",
  "cabeza",
  "fiebre",
  "enfermo",
  "malade",
  "tête",
  "fièvre",
  "schmerzen",
  "kopfschmerzen",
  "fieber",
  "ból",
  "gorączka",
  "chory",
  "وجع",
  "صداع",
  "حمى",
  "مريض",
  "दर्द",
  "सिरदर्द",
  "बुखार",
  "ਬੁਖਾਰ",
  "ਦੁੱਖ",
];

export async function POST(request: Request) {
  try {
    const { message, messagesHistory, tenantSlug } = await request.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const slug = tenantSlug || "kidbrooke";
    const lowerMsg = message.toLowerCase();

    // 1. POISON & URGENT EMERGENCY CHECK (HIGHEST PRIORITY)
    if (EMERGENCY_POISON_KEYWORDS.some((kw) => lowerMsg.includes(kw))) {
      return NextResponse.json({
        answer:
          "🚨 URGENT MEDICAL EMERGENCY NOTICE: If you or someone else has ingested poison, swallowed chemicals, taken an overdose, or is experiencing a life-threatening medical emergency (such as severe breathing difficulty or chest pain), PLEASE CALL 999 IMMEDIATELY for an emergency ambulance or go directly to the nearest hospital A&E department. You can also dial NHS 111 for urgent advice.",
        actions: [
          { label: "Call 999 Emergency", href: "tel:999", icon: "phone" },
          { label: "Call NHS 111", href: "tel:111", icon: "phone" },
        ],
        flaggedForPharmacist: true,
      });
    }

    // 2. Mandatory Prescription Safety Guardrail
    if (PRESCRIPTION_KEYWORDS.some((kw) => lowerMsg.includes(kw))) {
      return NextResponse.json({
        answer:
          "I am Bella, your AI pharmacy assistant. I'm sorry to hear you're dealing with this. Please note that as an AI, I am strictly not permitted to prescribe medication, recommend dosages, or offer medical diagnoses. For any prescription requests or clinical advice, please consult our qualified pharmacist or a doctor.",
        actions: [
          { label: "Book Appointment", href: "/services", icon: "calendar" },
          { label: "View Services", href: "/services", icon: "external" },
        ],
        flaggedForPharmacist: true,
      });
    }

    // 3. Fetch Knowledge Base Entries
    let kbText = "";
    const kbEntries = await getChatbotEntriesForTenant(slug as any).catch(() => []);
    for (const e of kbEntries) {
      kbText += `Keywords: ${e.keywords?.join(", ")}; Answer: ${e.answer}\n`;
    }

    // 4. Perform Live Gemini AI Call if GEMINI_API_KEY is available
    const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (apiKey) {
      try {
        const systemInstruction = `You are Bella, a professional, caring, and empathetic AI pharmacy assistant for UK visitors and international users.
Knowledge Base Context:
${kbText}

STRICT PERSONA & EMERGENCY RULES:
- Detect visitor language automatically and respond fluently in their language.
- POISONING & LIFE-THREATENING EMERGENCIES: If a user mentions poisoning, chemical ingestion, overdose, chest pain, or severe emergencies, IMMEDIATELY urge them to call 999 or go to A&E.
- SENSITIVE HEALTH (Abortion, Morning-after pill, STIs): Respond with total empathy, zero judgment, and strict privacy assurance.
- SYMPTOMS & PAIN: Empathize first with genuine warmth.
- YOU CANNOT PRESCRIBE MEDICATION OR DIAGNOSE CONDITIONS ONLINE. Recommend consulting the pharmacist.`;

        const contents = [
          ...(messagesHistory || []).slice(-6).map((m: any) => ({
            role: m.role === "bot" ? "model" : "user",
            parts: [{ text: m.content }],
          })),
          { role: "user", parts: [{ text: message }] },
        ];

        const aiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              systemInstruction: { parts: [{ text: systemInstruction }] },
              contents,
              generationConfig: { maxOutputTokens: 300, temperature: 0.4 },
            }),
          },
        );

        if (aiRes.ok) {
          const data = await aiRes.json();
          const botReply = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (botReply) {
            return NextResponse.json({
              answer: botReply,
              actions: [
                { label: "Speak to Pharmacist", href: "/services", icon: "calendar" },
                { label: "View Services", href: "/services", icon: "external" },
              ],
            });
          }
        }
      } catch {
        // Fall through to KB search
      }
    }

    // 5. Knowledge Base & Fallback Match
    for (const entry of kbEntries) {
      if (entry.keywords?.some((kw: string) => lowerMsg.includes(kw.toLowerCase()))) {
        return NextResponse.json({
          answer: entry.answer,
          actions: entry.actions || [{ label: "View Services", href: "/services", icon: "external" }],
        });
      }
    }

    if (SENSITIVE_HEALTH_KEYWORDS.some((kw) => lowerMsg.includes(kw))) {
      return NextResponse.json({
        answer:
          "Please rest assured that your privacy is completely protected with us. For emergency contraception (morning-after pill), confidential advice on pregnancy options, or sexual health care, our pharmacy offers private consultation rooms. You can also access confidential UK services via BPAS (03457 30 40 30) or NHS 111. Please speak with our pharmacist directly for caring, non-judgmental support.",
        actions: [
          { label: "Book Consultation", href: "/services", icon: "calendar" },
          { label: "View Services", href: "/services", icon: "external" },
        ],
      });
    }

    if (SYMPTOM_KEYWORDS.some((kw) => lowerMsg.includes(kw))) {
      return NextResponse.json({
        answer:
          "I'm so sorry to hear you're dealing with that. Being unwell or uncomfortable is never pleasant. While as an AI assistant I cannot diagnose conditions or prescribe medication, our pharmacy team is here to support you. Please feel free to speak directly with our pharmacist for advice on over-the-counter remedies or book a consultation.",
        actions: [
          { label: "Book Appointment", href: "/services", icon: "calendar" },
          { label: "View Services", href: "/services", icon: "external" },
        ],
      });
    }

    return NextResponse.json({
      answer:
        "I understand you're looking for assistance! As your pharmacy assistant, I can help you with our opening hours, services, prescriptions, vaccinations, or connect you directly with our pharmacist. How can I best help you right now?",
      actions: [
        { label: "Book Appointment", href: "/services", icon: "calendar" },
        { label: "View Services", href: "/services", icon: "external" },
      ],
    });
  } catch {
    return NextResponse.json(
      {
        answer: "I'm so sorry you're experiencing an issue. Please consult our pharmacist or try again.",
        actions: [],
      },
      { status: 500 },
    );
  }
}
