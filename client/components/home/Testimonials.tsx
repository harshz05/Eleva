import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { Star } from "lucide-react";
import { testimonials } from "@/constants/testimonials";


export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24">
      <Container>
        <SectionHeading
          title="Loved by Students"
          subtitle="Thousands of aspiring engineers trust Eleva to prepare for technical interviews."
        />

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map(({ name, role, quote }) => (
            <Card key={name}>
              <div className="mb-4 flex gap-1 text-yellow-500">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    size={18}
                    fill="currentColor"
                  />
                ))}
              </div>

              <p className="italic text-slate-600">
                "{quote}"
              </p>

              <div className="mt-6">
                <h3 className="font-semibold">
                  {name}
                </h3>

                <p className="text-sm text-slate-500">
                  {role}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}