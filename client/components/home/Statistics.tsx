import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

const stats = [
  {
    value: "10K+",
    label: "Mock Interviews",
  },
  {
    value: "95%",
    label: "Placement Success",
  },
  {
    value: "24/7",
    label: "Available Anytime",
  },
  {
    value: "AI",
    label: "Personalized Feedback",
  },
];

export default function Statistics() {
  return (
    <section className="bg-slate-50 py-24">
      <Container>
        <SectionHeading
          title="Trusted by Future Engineers"
          subtitle="Everything you need to prepare for placements with confidence."
        />

        <div className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <h3 className="text-4xl font-bold text-blue-600">
                {stat.value}
              </h3>

              <p className="mt-2 text-slate-600">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}