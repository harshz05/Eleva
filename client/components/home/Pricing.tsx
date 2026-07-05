import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import Card from "../ui/Card";
import Button from "../ui/Button";
import Badge from "../ui/Badge";

import { pricingPlans } from "@/constants/pricing";
import { Check } from "lucide-react";

export default function Pricing() {
  return (
    <section
  id="pricing"
  className="bg-slate-100 py-20 text-slate-900"
>
      <Container>
        <SectionHeading
          title="Simple Pricing"
          subtitle="Choose the plan that helps you ace your next interview."
        />

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {pricingPlans.map((plan) => (
            <Card
              key={plan.name}
             className={`flex flex-col transition-all duration-300 ${
  plan.popular
    ? "border-blue-600 shadow-xl scale-105 hover:scale-110"
    : "hover:-translate-y-1 hover:shadow-xl"
}`}
            >
              {plan.popular && (
                <div className="mb-4">
                  <Badge>Most Popular</Badge>
                </div>
              )}

              <h3 className="text-2xl font-bold">
                {plan.name}
              </h3>

              <h4 className="mt-4 text-4xl font-bold text-blue-600">
                {plan.price}
              </h4>

              <p className="mt-3 text-slate-600">
                {plan.description}
              </p>

              <ul className="mt-8 space-y-4">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-3"
                  >
                    <Check className="h-5 w-5 text-green-500" />

                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button className="mt-8 w-full">
                {plan.popular ? "Upgrade to Pro" : "Start Free"}
              </Button>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}