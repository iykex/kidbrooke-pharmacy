"use client";

import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import WidthConstraint from "../shared/width-constraint";
import { MessageCircle, Sparkles } from "lucide-react";
import { getTenantSlug } from "@/lib/config/tenant";
import { getFaqsForTenant } from "@/lib/services/firestore/queries";
import type { FaqDoc } from "@/lib/types/firestore";

export default function FAQSection() {
  const [faqs, setFaqs] = useState<FaqDoc[]>([]);

  useEffect(() => {
    getFaqsForTenant(getTenantSlug())
      .then(setFaqs)
      .catch(() => {});
  }, []);

  const items = faqs.map((f, i) => ({
    question: f.question,
    answer: f.answer,
    value: `item-${f.id ?? i}`,
  }));

  return (
    <section>
      <WidthConstraint className="space-y-10">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 dark:bg-primary/20 rounded-full">
            <Sparkles className="size-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              AI-Powered Support Available
            </span>
          </div>
          <h2 className="text-section-header font-bold tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="sm:text-card-title text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about our pharmacy services, or
            chat with our AI assistant for instant help
          </p>
        </div>

        {/* Chatbot Prompt Card */}
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-primary/5 via-primary/10 to-transparent dark:from-primary/10 dark:via-primary/5 dark:to-transparent border border-primary/20 p-6 mb-8">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="shrink-0 p-3 bg-primary/20 dark:bg-primary/30 rounded-xl">
                <MessageCircle className="size-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1">
                  Need instant answers?
                </h3>
                <p className="text-muted-foreground text-sm">
                  Click the chat button in the bottom-right corner to talk with
                  Bella, our AI pharmacy assistant. She can help with opening
                  hours, services, prescriptions, and more!
                </p>
              </div>
              <div className="hidden sm:flex items-center gap-2 text-sm text-green-600 dark:text-green-400 font-medium">
                <span className="relative flex size-2">
                  <span className="animate-ping absolute inline-flex size-full rounded-full bg-green-500 opacity-75" />
                  <span className="relative inline-flex rounded-full size-2 bg-green-500" />
                </span>
                Online now
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-2">
          <Accordion
            type="single"
            collapsible
            className="w-full"
            defaultValue={items[0]?.value}
          >
            {items.map((faq) => {
              return (
                <AccordionItem value={faq.value} key={faq.value}>
                  <AccordionTrigger className="text-base text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    <p>{faq.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </WidthConstraint>
    </section>
  );
}
