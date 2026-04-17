import type { StaticImageData } from "next/image";
import earPainImage from "@/public/conditions/ear-pain.jpg";
import insectBiteImage from "@/public/conditions/insect-bite.jpg";
import skinInfectionsImage from "@/public/conditions/skin-infections.jpg";
import shinglesImage from "@/public/conditions/shingles.jpg";
import sinusInfectionImage from "@/public/conditions/sinus-infection.jpg";
import soreThroatImage from "@/public/conditions/sore-throat.jpeg";
import utiImage from "@/public/conditions/uti.jpg";

const DEFAULT = earPainImage;

export const PFP_IMAGE_BY_ID: Record<string, StaticImageData> = {
  ear_pain: earPainImage,
  infected_insect_bites: insectBiteImage,
  bacterial_skin_infection: skinInfectionsImage,
  shingles: shinglesImage,
  sinus_infection: sinusInfectionImage,
  sore_throat: soreThroatImage,
  uti_women: utiImage,
};

export function getPfpConditionImage(id: string): StaticImageData {
  return PFP_IMAGE_BY_ID[id] ?? DEFAULT;
}
