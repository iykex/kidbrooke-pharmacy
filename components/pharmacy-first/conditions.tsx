"use client";
import { usePfpConditions } from "@/hooks/use-pfp-conditions";
import SectionHeader from "../general/section-divider-head";
import WidthConstraint from "../shared/width-constraint";
import { Calendar } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { track } from "@/lib/analytics/tracker";

export const ConditionsSection = () => {
  const { conditions, loading } = usePfpConditions();

  if (loading || conditions.length === 0) {
    return (
      <section className="space-y-14">
        <WidthConstraint>
          <p className="text-center text-muted-foreground py-12">
            Loading conditions…
          </p>
        </WidthConstraint>
      </section>
    );
  }

  return (
    <section className="space-y-14">
      <WidthConstraint className="space-y-8">
        <SectionHeader heading="Health Conditions" />
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <h2 className="text-card-title font-bold text-foreground">
            Conditions We Can Help With
          </h2>
          <p className="text-gray-600 dark:text-white/60 max-w-md mx-auto">
            Our Pharmacy First service can help you with a range of common
            conditions without needing to see a GP.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 pb-10">
          {conditions.map((condition) => (
            <div
              key={condition.serviceId}
              className="pfp-condition-card bg-card rounded-3xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/20 flex flex-col h-full max-w-md relative"
            >
              <Badge className="absolute top-4 right-4 z-20 bg-accent-foreground dark:bg-background/60 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                {condition.badge}
              </Badge>
              <div className="relative h-54 overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-t from-foreground/80 to-transparent opacity-60 z-10"></div>
                <Image
                  src={condition.image}
                  alt={condition.title}
                  loading="lazy"
                  placeholder="blur"
                  className="pfp-condition-image h-full w-full object-cover"
                />
                <h3 className="absolute bottom-4 left-4 drop-shadow-xs drop-shadow-black/90 text-card-title font-bold text-white z-20">
                  {condition.title}
                </h3>
              </div>
              <div className="p-6 grow flex flex-col">
                <p className="mb-6 grow opacity-70">{condition.description}</p>
                <Button className="w-fit mx-auto rounded-sm px-4" asChild>
                  <Link
                    href={condition.href}
                    onClick={() => {
                      track(condition.tracking, condition.href);
                    }}
                    className="interactive-hover-arrow-link flex items-center"
                  >
                    <Calendar className="interactive-hover-arrow-link-icon mr-2 size-4" />
                    Book your Appointment
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="w-full bg-linear-to-r from-[#012574] to-[#01574d] py-12 px-8 flex items-center justify-center rounded-2xl">
          <div className="flex items-center gap-2">
            <div className="text-white font-black tracking-tighter">
              <span className="text-[12rem] leading-none inline-block text-shadow-[4px_4px_8px_rgba(0,0,0,0.2)]">
                NHS
              </span>
            </div>

            <div className="text-white font-bold uppercase leading-tight ml-4">
              <div className="text-[2.8rem] tracking-wide text-shadow-[4px_4px_8px_rgba(0,0,0,0.2)]">
                NATIONAL
              </div>
              <div className="text-[2.8rem] tracking-wide text-shadow-[4px_4px_8px_rgba(0,0,0,0.2)]">
                HEALTH
              </div>
              <div className="text-[2.8rem] tracking-wide text-shadow-[4px_4px_8px_rgba(0,0,0,0.2)]">
                SERVICE
              </div>
            </div>
          </div>
        </div>
      </WidthConstraint>
    </section>
  );
};
