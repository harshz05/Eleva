import ResumePageClient from "@/components/resume/ResumePageClient";

export default function ResumePage() {
  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Resume Analyzer</h1>
        <p className="mt-2 text-slate-500">Upload your resume for AI-powered feedback.</p>
      </div>
      <ResumePageClient />
    </>
  );
}