import InterviewsPageClient from "@/components/interviews/InterviewsPageClient";

export default function InterviewsPage() {
  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Mock Interviews</h1>
        <p className="mt-2 text-slate-500">Start a practice session or review your history.</p>
      </div>
      <InterviewsPageClient />
    </>
  );
}