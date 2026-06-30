import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

const features = [
  {
    title: "Resume-Based Interviews",
    description:
      "AI generates interview questions based on your resume and projects.",
  },
  {
    title: "Personalized Feedback",
    description:
      "Receive detailed feedback on technical answers and communication.",
  },
  {
    title: "Progress Tracking",
    description:
      "Monitor your improvement through analytics and interview history.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20">
      <Container>
        <SectionHeading
          title="Why Eleva?"
          subtitle="Everything you need to prepare smarter, practice consistently, and improve with AI-powered insights."
        />

        <div className="grid gap-8 md:grid-cols-3">
          {features.map(({ title, description }) => (
            <Card key={title}>
              <h3 className="mb-4 text-2xl font-semibold">
                {title}
              </h3>

              <p className="text-slate-600">
                {description}
              </p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}