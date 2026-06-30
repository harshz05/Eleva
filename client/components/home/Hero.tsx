import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

export default function Hero() {
  return (
    <section className="py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-5xl font-extrabold tracking-tight md:text-6xl">
            Ace Your Next
            <span className="text-blue-600"> Technical Interview</span>
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Practice AI-powered mock interviews, receive personalized
            feedback, and track your improvement—all in one place.
          </p>

          <div className="mt-10 flex justify-center gap-4">
            <Button>
              Get Started
            </Button>

            <Button variant="outline">
              Learn More
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}