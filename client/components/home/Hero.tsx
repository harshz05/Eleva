"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import { Sparkles } from "lucide-react";

export default function Hero() {
  const router = useRouter();

  return (
    <section className="py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <Badge>
            <Sparkles size={16} className="mr-2" />
            AI-Powered Placement Preparation
          </Badge>
          <h1 className="mt-6 text-5xl font-extrabold tracking-tight md:text-6xl">
            Ace Your Next
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              {" "}Technical Interview
            </span>
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Practice AI-powered mock interviews, receive personalized
            feedback, and track your improvement—all in one place.
          </p>

          <div className="mt-10 flex justify-center gap-4">
            <Button onClick={() => router.push("/sign-up")}>
              Get Started
            </Button>

            <Button variant="outline" className="!text-white !border-slate-600 hover:!bg-white/10">
              Learn More
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}