export interface PricingPlan {
  name: string;
  price: string;
  description: string;
  features: string[];
  popular: boolean;
}

export const pricingPlans: PricingPlan[] = [
  {
    name: "Free",
    price: "₹0",
    description: "Perfect for getting started with AI interview preparation.",
    features: [
      "5 AI interviews / month",
      "Resume upload",
      "Basic AI feedback",
      "Interview history",
    ],
    popular: false,
  },
  {
    name: "Pro",
    price: "₹499/mo",
    description: "Everything you need to crack placements with confidence.",
    features: [
      "Unlimited AI interviews",
      "Detailed AI feedback",
      "Resume-aware interviews",
      "Behavioral + DSA rounds",
      "Performance analytics",
      "Priority AI model",
    ],
    popular: true,
  },
];