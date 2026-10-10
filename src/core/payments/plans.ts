// AutoClipp - Trusted Server-Side Pricing Plans & Entitlements Configuration
// USD Currency is the single source of truth

export type BillingInterval = "month" | "year" | "one_time";

export interface PlanFeature {
  text: string;
  included: boolean;
}

export interface PlanDefinition {
  id: string;
  name: string;
  tagline: string;
  popular?: boolean;
  monthlyPrice: number; // USD
  yearlyPrice: number;  // USD (annual total)
  oneTimePrice: number; // USD for one-time pass
  credits: number;      // minutes of video processing
  currency: string;
  features: PlanFeature[];
}

export const PRICING_PLANS: Record<string, PlanDefinition> = {
  starter: {
    id: "starter",
    name: "Starter",
    tagline: "Perfect for individual creators just starting out.",
    monthlyPrice: 19.0,
    yearlyPrice: 190.0, // 2 months free ($15.83/mo)
    oneTimePrice: 19.0,
    credits: 120,
    currency: "USD",
    features: [
      { text: "120 minutes of video processing", included: true },
      { text: "AI Moment Detection & Scoring", included: true },
      { text: "Auto 9:16 Vertical Reframing", included: true },
      { text: "Standard rendering queue", included: true },
      { text: "720p Video Exports", included: true },
      { text: "Basic subtitle templates", included: true },
      { text: "No brand kit customization", included: false },
    ],
  },
  pro: {
    id: "pro",
    name: "Pro",
    tagline: "For serious podcasters and content production teams.",
    popular: true,
    monthlyPrice: 49.0,
    yearlyPrice: 490.0, // 2 months free ($40.83/mo)
    oneTimePrice: 49.0,
    credits: 500,
    currency: "USD",
    features: [
      { text: "500 minutes of video processing", included: true },
      { text: "Advanced Virality Scoring Matrix", included: true },
      { text: "Priority rendering queue", included: true },
      { text: "1080p High-Quality Exports", included: true },
      { text: "Custom brand templates & fonts", included: true },
      { text: "AI B-Roll & Visual Hook overlays", included: true },
      { text: "Remove AutoClipp watermark", included: true },
    ],
  },
  agency: {
    id: "agency",
    name: "Agency",
    tagline: "For marketing agencies managing multi-client pipelines.",
    monthlyPrice: 149.0,
    yearlyPrice: 1490.0, // 2 months free ($124.17/mo)
    oneTimePrice: 149.0,
    credits: 2000,
    currency: "USD",
    features: [
      { text: "2000 minutes of video processing", included: true },
      { text: "Everything in Pro", included: true },
      { text: "API Access & Webhooks", included: true },
      { text: "Multi-tenant workspace (up to 10)", included: true },
      { text: "4K Ultra-HD Exports", included: true },
      { text: "Custom SSO integration", included: true },
      { text: "Dedicated priority support", included: true },
    ],
  },
};

export const VALID_PLAN_IDS = Object.keys(PRICING_PLANS) as (keyof typeof PRICING_PLANS)[];

export function getPlanById(planId: string): PlanDefinition | null {
  const normalized = planId.toLowerCase().trim();
  return PRICING_PLANS[normalized] || null;
}

export function getPlanPrice(planId: string, interval: BillingInterval = "month"): number {
  const plan = getPlanById(planId);
  if (!plan) {
    throw new Error(`Invalid plan ID: ${planId}`);
  }

  switch (interval) {
    case "year":
      return plan.yearlyPrice;
    case "one_time":
      return plan.oneTimePrice;
    case "month":
    default:
      return plan.monthlyPrice;
  }
}

export function getPlanCredits(planId: string): number {
  const plan = getPlanById(planId);
  if (!plan) {
    throw new Error(`Invalid plan ID: ${planId}`);
  }
  return plan.credits;
}

export function formatUSD(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(amount);
}
