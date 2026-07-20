import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import { Brain, FileText, Target, Sparkles } from "lucide-react";

const modules = [
  {
    icon: Brain,
    title: "AI Mock Interviews",
    description:
      "Pick a role, company, and interview type (technical, behavioral, DSA, or system design). Eleva generates tailored questions, you answer in your own words, and get instant AI-driven feedback and scoring on every response — not generic advice, but feedback grounded in what you actually wrote.",
  },
  {
    icon: FileText,
    title: "Resume Analyzer",
    description:
      "Upload your resume as a PDF and get an ATS compatibility score along with specific, actionable suggestions across formatting, content, keywords, and structure — the same kind of review a placement cell or recruiter would give, available anytime.",
  },
  {
    icon: Target,
    title: "DSA Tracker",
    description:
      "Coming in a future update: track your DSA practice progress alongside your interview prep, all in one dashboard.",
  },
];

export default function AboutEleva() {
  return (
    <section id="about" className="bg-slate-950 py-24 text-white">
      <Container>
        <SectionHeading
          title="What is Eleva?"
          subtitle="A focused, AI-powered placement preparation platform — built for students who want to walk into interviews prepared, not guessing."
        />

        <div className="mx-auto mt-8 max-w-3xl text-center text-slate-300">
          <p>
            Eleva was built around one idea: interview prep should feel like
            practice, not theory. Instead of reading generic tips, you go
            through the same motions as a real interview — answering real
            questions, under a bit of real pressure — and get feedback that's
            specific to what you said, powered by Google's Gemini AI.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {modules.map(({ icon: Icon, title, description }) => (
            <Card key={title} className="bg-slate-900 text-white">
              <div className="mb-4 inline-flex rounded-xl bg-blue-500/10 p-3 text-blue-400">
                <Icon size={24} />
              </div>
              <h3 className="mb-3 text-xl font-semibold">{title}</h3>
              <p className="text-sm leading-relaxed text-slate-400">{description}</p>
            </Card>
          ))}
        </div>

        <div className="mt-16 flex items-center justify-center gap-2 text-sm text-slate-400">
          <Sparkles size={16} />
          <span>Free to use, built by a student, for students preparing for placements.</span>
        </div>
      </Container>
    </section>
  );
}