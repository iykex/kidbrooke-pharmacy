"use client";

import WidthConstraint from "@/components/shared/width-constraint";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  MapPin,
  Phone,
  Clock,
  ExternalLink,
  ShieldCheck,
  Building2,
  CalendarCheck,
  CheckCircle2,
  Navigation,
} from "lucide-react";
import Link from "next/link";
import { externalLinkProps } from "@/lib/utils/external-link";

export const PHARMACY_BRANCHES = [
  {
    name: "Kidbrooke Pharmacy",
    slug: "kidbrooke",
    address: {
      line1: "134 Rochester Way",
      city: "London",
      region: "Greater London",
      postcode: "SE3 8AR",
    },
    phone: "020 8319 0115",
    phoneHref: "tel:02083190115",
    hours: [
      { days: "Monday – Friday", time: "09:00 – 18:00" },
      { days: "Saturday – Sunday", time: "Closed" },
    ],
    websiteUrl: "https://www.kidbrookepharmacy.com",
    bookUrl: "/book",
    pharmadoctorUrl: "https://www.phdr.co.uk/500",
    mapUrl: "https://maps.google.com/?q=134+Rochester+Way+London+SE3+8AR",
    gphcNumber: "1040316",
    features: [
      "NHS Pharmacy First Consultations",
      "Private Meningitis B & Travel Clinic",
      "NHS & Private Flu Vaccinations",
      "COVID-19 Seasonal Boosters",
      "NHS Blood Pressure Checks",
      "Private Consultation Suite",
    ],
  },
  {
    name: "Belvedere Pharmacy",
    slug: "belvedere",
    address: {
      line1: "11 Picardy Street",
      city: "Belvedere",
      region: "Kent",
      postcode: "DA17 5QQ",
    },
    phone: "020 8311 4087",
    phoneHref: "tel:02083114087",
    hours: [
      { days: "Monday – Friday", time: "09:00 – 18:30" },
      { days: "Saturday – Sunday", time: "Closed" },
    ],
    websiteUrl: "https://www.belvederepharmacy.com",
    bookUrl: "https://www.belvederepharmacy.com/book",
    pharmadoctorUrl: "https://www.phdr.co.uk/2483",
    mapUrl: "https://maps.google.com/?q=11+Picardy+Street+Belvedere+DA17+5QQ",
    gphcNumber: "1032549",
    features: [
      "NHS Pharmacy First Consultations",
      "Private Meningitis B & Travel Clinic",
      "NHS & Private Flu Vaccinations",
      "COVID-19 Seasonal Boosters",
      "Electronic Prescription Service (EPS)",
      "Private Consultation Suite",
    ],
  },
  {
    name: "Lowfield Pharmacy",
    slug: "lowfield",
    address: {
      line1: "63 Lowfield Street",
      city: "Dartford",
      region: "Kent",
      postcode: "DA1 1HP",
    },
    phone: "01322 220779",
    phoneHref: "tel:01322220779",
    hours: [
      { days: "Monday – Friday", time: "09:00 – 18:00" },
      { days: "Saturday – Sunday", time: "Closed" },
    ],
    websiteUrl: "https://www.lowfieldpharmacy.com",
    bookUrl: "https://www.lowfieldpharmacy.com/book",
    pharmadoctorUrl: "https://www.phdr.co.uk/6430",
    mapUrl: "https://maps.google.com/?q=63+Lowfield+Street+Dartford+DA1+1HP",
    gphcNumber: "1032871",
    features: [
      "NHS Pharmacy First Consultations",
      "Private Meningitis B & Travel Clinic",
      "NHS & Private Flu Vaccinations",
      "COVID-19 Seasonal Boosters",
      "NHS Contraception Service",
      "Private Consultation Suite",
    ],
  },
];

export default function PharmacyDirectoryContent() {
  return (
    <div className="space-y-12 py-10 sm:py-16">
      <WidthConstraint>
        {/* Header */}
        <div className="space-y-4 text-center max-w-3xl mx-auto">
          <Badge className="bg-primary text-primary-foreground font-semibold px-4 py-1 text-sm shadow-sm inline-flex items-center gap-1.5">
            <Building2 className="size-4" />
            Meckay Pharmacy Group
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">
            Our Community Pharmacies
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            Providing accessible, professional NHS and private healthcare services across South East London and Kent. Find your nearest clinic branch below.
          </p>
        </div>

        {/* Group Superintendent Governance Notice */}
        <div className="mt-8 rounded-xl border border-primary/20 bg-primary/5 p-4 text-xs sm:text-sm text-foreground flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="size-5 text-primary shrink-0" />
            <span>
              <strong>Clinical Governance: </strong> All branches operated under Superintendent Pharmacist Michael Tweneboa-Koduah (Meckay Limited). Regulated by the General Pharmaceutical Council (GPhC).
            </span>
          </div>
          <Badge variant="outline" className="border-primary/30 text-xs">
            NHS Registered Community Pharmacies
          </Badge>
        </div>

        {/* Branch Cards Grid */}
        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {PHARMACY_BRANCHES.map((branch) => (
            <Card
              key={branch.slug}
              className="flex flex-col justify-between border border-border hover:border-primary/50 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <div>
                <CardHeader className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge className="bg-primary text-primary-foreground font-semibold text-xs">
                      Community Pharmacy
                    </Badge>
                    <span className="text-[11px] font-mono text-muted-foreground">
                      GPhC: {branch.gphcNumber}
                    </span>
                  </div>
                  <CardTitle className="text-xl font-bold text-foreground">
                    {branch.name}
                  </CardTitle>
                  <CardDescription className="flex items-start gap-1.5 text-xs text-muted-foreground">
                    <MapPin className="size-4 text-primary shrink-0 mt-0.5" />
                    <span>
                      {branch.address.line1}, {branch.address.city}, {branch.address.region} {branch.address.postcode}
                    </span>
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Contact & Hours */}
                  <div className="space-y-2 text-xs border-y border-border/60 py-3">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground flex items-center gap-1.5">
                        <Phone className="size-3.5 text-primary" /> Phone:
                      </span>
                      <a
                        href={branch.phoneHref}
                        className="font-semibold text-primary hover:underline"
                      >
                        {branch.phone}
                      </a>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground flex items-center gap-1.5">
                        <Clock className="size-3.5 text-primary" /> Hours:
                      </span>
                      <span className="font-semibold text-foreground">
                        {branch.hours[0].time}
                      </span>
                    </div>
                  </div>

                  {/* Clinical Services */}
                  <div className="space-y-1.5">
                    <span className="text-xs font-semibold text-foreground">
                      Key Clinical Services:
                    </span>
                    <ul className="space-y-1 text-xs text-muted-foreground">
                      {branch.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-1.5">
                          <CheckCircle2 className="size-3 text-emerald-600 shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </div>

              <CardFooter className="flex flex-col gap-2 pt-2">
                <Button
                  asChild
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-sm"
                >
                  <Link href={branch.bookUrl} className="flex items-center justify-center gap-2">
                    <CalendarCheck className="size-4" />
                    Book Service at this Branch
                  </Link>
                </Button>

                <div className="grid grid-cols-2 gap-2 w-full">
                  <Button asChild variant="outline" size="sm" className="text-xs">
                    <a
                      href={branch.mapUrl}
                      {...externalLinkProps(branch.mapUrl)}
                      className="flex items-center justify-center gap-1"
                    >
                      <Navigation className="size-3" />
                      Directions
                    </a>
                  </Button>
                  <Button asChild variant="outline" size="sm" className="text-xs">
                    <a
                      href={branch.pharmadoctorUrl}
                      {...externalLinkProps(branch.pharmadoctorUrl)}
                      className="flex items-center justify-center gap-1"
                    >
                      <ExternalLink className="size-3" />
                      PharmaDoctor
                    </a>
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </WidthConstraint>
    </div>
  );
}
