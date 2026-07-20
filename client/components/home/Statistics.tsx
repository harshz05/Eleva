import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import { stats } from "@/constants/statistics";


export default function Statistics() {
  return (
    <section id="statistics" className="bg-slate-100 py-20 text-slate-900">
      <Container>
        <SectionHeading
          title="Trusted by Future Engineers"
          subtitle="Everything you need to prepare for placements with confidence."
        />

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
<Card
  key={stat.label}
  className="text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
>
  <h3 className="text-5xl font-bold text-blue-600">
    {stat.value}
  </h3>

  <p className="mt-2 text-slate-600">
    {stat.label}
  </p>
</Card>
          ))}
        </div>
      </Container>
    </section>
  );
}