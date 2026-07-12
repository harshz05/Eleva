import Link from "next/link";
import { InterviewSession } from "@/types/interviews";

export default function InterviewResults({ session }: { session: InterviewSession }) {
  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
        <p className="text-sm text-slate-500">Overall Score</p>
        <p className="mt-1 text-4xl font-bold text-blue-600">{session.score}%</p>
      </div>

      <div className="mt-6 space-y-4">
        {session.questions.map((q, i) => (
          <div key={q.id} className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="text-sm font-medium text-slate-900">Q{i + 1}. {q.text}</p>
            <p className="mt-2 text-sm text-slate-600">
              <span className="font-medium text-slate-500">Your answer: </span>
              {q.answer || "—"}
            </p>
            <p className="mt-2 text-sm text-blue-600">{q.feedback}</p>
          </div>
        ))}
      </div>

      <Link
        href="/dashboard/interviews"
        className="mt-6 inline-block rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200"
      >
        Back to Interviews
      </Link>
    </div>
  );
}