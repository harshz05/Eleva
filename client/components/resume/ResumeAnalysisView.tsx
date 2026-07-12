import { Resume } from "@/types/resume";

const categoryStyles: Record<string, string> = {
  formatting: "bg-purple-100 text-purple-700",
  content: "bg-blue-100 text-blue-700",
  keywords: "bg-amber-100 text-amber-700",
  structure: "bg-green-100 text-green-700",
};

export default function ResumeAnalysisView({ resume }: { resume: Resume }) {
  if (resume.status === "processing") {
    return <p className="text-sm text-slate-500">Analyzing {resume.fileName}...</p>;
  }
  if (!resume.analysis) return null;

  const { summary, atsScore, suggestions } = resume.analysis;

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500">{resume.fileName}</p>
            <p className="mt-1 text-xs text-slate-400">
              Uploaded {new Date(resume.uploadedAt).toLocaleDateString()}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-slate-500">ATS Score</p>
            <p className="text-3xl font-bold text-blue-600">{atsScore}</p>
          </div>
        </div>
        <p className="mt-4 text-sm text-slate-600">{summary}</p>
      </div>

      <div>
        <h3 className="mb-3 text-lg font-semibold text-slate-900">Suggestions</h3>
        <div className="space-y-3">
          {suggestions.map((s) => (
            <div key={s.id} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4">
              <span className={`rounded-full px-2 py-1 text-xs font-medium ${categoryStyles[s.category]}`}>
                {s.category}
              </span>
              <p className="text-sm text-slate-700">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}