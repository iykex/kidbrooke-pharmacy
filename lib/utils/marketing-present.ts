import type { LucideIcon } from "lucide-react";
import {
  Award,
  Bell,
  Building2,
  Calendar,
  Clock,
  Gift,
  Heart,
  PieChart,
  Pill,
  Shield,
  ShieldCheck,
  Star,
  Stethoscope,
  Syringe,
  ThumbsUp,
  Trophy,
  User,
  UserCircle,
  Users,
  Zap,
} from "lucide-react";
import type { TrustBadgeItem } from "@/lib/types/firestore";
import type { TrustBadgeView } from "@/lib/types/marketing-ui";

/** Presentation layer for trust marquee: DB stores title/subtitle only. */
export const TRUST_BADGE_PRESENTATION: {
  icon: LucideIcon;
  color: string;
  bgColor: string;
}[] = [
  { icon: ShieldCheck, color: "text-chart-2", bgColor: "bg-chart-2/10" },
  { icon: Clock, color: "text-chart-3", bgColor: "bg-chart-3/10" },
  { icon: Building2, color: "text-primary", bgColor: "bg-primary/10" },
  { icon: Trophy, color: "text-chart-2", bgColor: "bg-chart-2/10" },
  { icon: Star, color: "text-chart-3", bgColor: "bg-chart-3/10" },
  { icon: Heart, color: "text-primary", bgColor: "bg-primary/10" },
  { icon: ShieldCheck, color: "text-chart-2", bgColor: "bg-chart-2/10" },
  { icon: Star, color: "text-chart-3", bgColor: "bg-chart-3/10" },
  { icon: Clock, color: "text-primary", bgColor: "bg-primary/10" },
  { icon: Heart, color: "text-chart-2", bgColor: "bg-chart-2/10" },
  { icon: ThumbsUp, color: "text-chart-3", bgColor: "bg-chart-3/10" },
];

export function trustBadgesToView(items: TrustBadgeItem[]): TrustBadgeView[] {
  return items.map((item, index) => {
    const p =
      TRUST_BADGE_PRESENTATION[index % TRUST_BADGE_PRESENTATION.length]!;
    return {
      ...item,
      icon: p.icon,
      color: p.color,
      bgColor: p.bgColor,
    };
  });
}

export const NEWSLETTER_FEATURE_ICONS: LucideIcon[] = [Heart, Gift, Bell];

export const ABOUT_HERO_STAT_ICONS: LucideIcon[] = [Users, Clock, Trophy];

/** Matches previous OUR_PROCESS_STEPS icon/colour cycling */
export const PROCESS_STEP_STYLES: {
  icon: LucideIcon;
  color: string;
  bgColor: string;
}[] = [
  { icon: Pill, color: "text-primary", bgColor: "bg-primary/10" },
  { icon: Stethoscope, color: "text-chart-2", bgColor: "bg-chart-2/10" },
  { icon: Syringe, color: "text-chart-3", bgColor: "bg-chart-3/10" },
  { icon: User, color: "text-primary", bgColor: "bg-primary/10" },
];

export const DOWNLOAD_APP_FEATURE_STYLES: {
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
}[] = [
  { icon: Bell, iconBg: "bg-primary/10", iconColor: "text-primary" },
  { icon: Calendar, iconBg: "bg-secondary/10", iconColor: "text-secondary" },
  { icon: PieChart, iconBg: "bg-accent/10", iconColor: "text-accent" },
];

export const WHY_CHOOSE_US_ICON_STYLES: LucideIcon[] = [
  Clock,
  Users,
  Shield,
  User,
];

/** Cyclic icon array for `pfpBenefits` items from `marketing_blocks`. */
export const PFP_BENEFIT_ICONS: LucideIcon[] = [Clock, UserCircle, ShieldCheck, Zap];

/** Cyclic presentation styles for `ourValues` items from `marketing_blocks`. */
export const OUR_VALUES_PRESENTATION: {
  icon: LucideIcon;
  color: string;
  iconColor: string;
}[] = [
  { icon: Heart, color: "from-rose-100 to-rose-50", iconColor: "text-rose-600" },
  { icon: Shield, color: "from-blue-100 to-blue-50", iconColor: "text-blue-600" },
  {
    icon: Users,
    color: "from-emerald-100 to-emerald-50",
    iconColor: "text-emerald-600",
  },
  { icon: Award, color: "from-[#FFF9E6] to-[#FFF3CC]", iconColor: "text-[#F9A825]" },
];

export const ABOUT_HERO_BADGE_STYLES: {
  icon: LucideIcon;
  bgColor: string;
  textColor: string;
  borderColor: string;
}[] = [
  {
    icon: Shield,
    bgColor: "bg-primary/15",
    textColor: "text-primary",
    borderColor: "border-primary/30",
  },
  {
    icon: Heart,
    bgColor: "bg-[#00BFFF]/15",
    textColor: "text-[#00BFFF]",
    borderColor: "border-[#00BFFF]/30",
  },
];
