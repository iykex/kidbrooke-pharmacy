"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { track } from "@/lib/analytics/tracker";
import { Service } from "@/lib/types/general";
import { CheckCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  externalLinkProps,
  isUsableHref,
} from "@/lib/utils/external-link";

export default function ServiceCard({
  title,
  description,
  features,
  image,
  link,
  tracking,
  fundingLabel,
  providerLabel,
}: Service) {
  const canNavigate = isUsableHref(link);

  return (
    <Card className="max-w-lg mx-auto p-0 bg-background rounded-none relative rounded-tr-4xl rounded-bl-4xl border-0 shadow-none outline-0 overflow-hidden gap-0">
      {/* Background Image with CDN optimization */}
      <div className="relative w-full h-64 rounded-tr-4xl rounded-bl-4xl">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
          className="object-cover object-center"
          quality={80}
          loading="lazy"
          placeholder="blur"
        />

        {/* Title button */}
        <Button className="absolute top-0 left-0 rounded-none rounded-br-lg w-full max-w-2xs bg-background backdrop-blur-sm shadow-none border-0 h-10 z-20 text-foreground font-bold text-base hover:bg-background">
          {title}
        </Button>

        {/* Funding label badge */}
        {fundingLabel && (
          <Badge className="absolute top-0 right-0 rounded-none rounded-bl-lg bg-primary/90 text-white text-xs font-semibold px-2 py-1.5 pr-4 z-20">
            {fundingLabel}
          </Badge>
        )}
      </div>

      {/* Content - Always visible */}
      <CardContent className="pt-6 space-y-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">
          {providerLabel}
        </p>
        <p className="text-muted-foreground leading-relaxed">{description}</p>

        <div className="space-y-3">
          {features.map((feature, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <span className="text-sm font-medium text-foreground/80">
                {feature}
              </span>
            </div>
          ))}
        </div>

        <div className="w-full flex justify-center">
          {canNavigate ? (
            <Button
              asChild
              className="w-full max-w-xs bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-md hover:shadow-lg transition-all"
            >
              <Link
                href={link}
                {...externalLinkProps(link)}
                onClick={() => {
                  track(tracking, link);
                }}
              >
                {providerLabel.startsWith("Private")
                  ? "Book Private Service"
                  : "View NHS Service"}
              </Link>
            </Button>
          ) : (
            <Button
              disabled
              className="w-full max-w-xs font-semibold"
              aria-label={`${title} booking is not yet available`}
            >
              Booking Link Pending
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
