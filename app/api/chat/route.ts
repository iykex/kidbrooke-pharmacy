import { NextResponse } from "next/server";
import { getChatbotEntriesForTenant } from "@/lib/services/firestore/queries";

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

export async function POST(request: Request) {
  try {
    const { message, messagesHistory, tenantSlug } = await request.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const slug = tenantSlug || "kidbrooke";
    const lowerMsg = message.toLowerCase();

    // 1. Mandatory Prescription Safety Guardrail
    if (PRESCRIPTION_KEYWORDS.some((kw) => lowerMsg.includes(kw))) {
      return NextResponse.json({
        answer:
          "I am Bella, your AI pharmacy assistant. ⚠️ Please note that as an AI, I am strictly not permitted to prescribe medication, recommend dosages, or offer medical diagnoses. For any prescription requests or clinical advice, please consult our qualified pharmacist or a doctor.",
        actions: [
          { label: "Book Appointment", href: "/services", icon: "calendar" },
          { label: "View Services", href: "/services", icon: "external" },
        ],
        flaggedForPharmacist: true,
      });
    }

    // 2. Fetch Knowledge Base Entries
    let kbText = "";
    const kbEntries = await getChatbotEntriesForTenant(slug as any).catch(() => []);
    for (const e of kbEntries) {
      kbText += `Keywords: ${e.keywords?.join(", ")}; Answer: ${e.answer}\n`;
    }

    // 3. Perform Live Gemini AI Call if GEMINI_API_KEY is available
    const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (apiKey) {
      try {
        const systemInstruction = `You are Bella, the AI pharmacy assistant. Provide friendly and accurate information.
Knowledge Base Context:
${kbText}

STRICT RULE: YOU CANNOT PRESCRIBE MEDICATION OR DIAGNOSE CONDITIONS. Always direct visitors to consult a pharmacist or doctor for medical prescriptions.`;

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
                { label: "Book Appointment", href: "/services", icon: "calendar" },
                { label: "View Services", href: "/services", icon: "external" },
              ],
            });
          }
        }
      } catch {
        // Fall through to KB search
      }
    }

    // 4. Knowledge Base Match Fallback
    for (const entry of kbEntries) {
      if (entry.keywords?.some((kw: string) => lowerMsg.includes(kw.toLowerCase()))) {
        return NextResponse.json({
          answer: entry.answer,
          actions: entry.actions || [{ label: "View Services", href: "/services", icon: "external" }],
        });
      }
    }

    return NextResponse.json({
      answer:
        "I'm not sure about that specific question, but I'd be happy to help! You can ask me about our opening hours, services, prescriptions, vaccinations, or contact information. Alternatively, please speak with our pharmacist.",
      actions: [
        { label: "Book Appointment", href: "/services", icon: "calendar" },
        { label: "View Services", href: "/services", icon: "external" },
      ],
    });
  } catch {
    return NextResponse.json(
      {
        answer: "Sorry, I ran into an issue responding to your message. Please consult our pharmacist or try again.",
        actions: [],
      },
      { status: 500 },
    );
  }
}
