import Link from "next/link";
import { InterviewSession } from "@/types/interviews";

const statusStyles: Record<InterviewSession["status"], string> = {
  completed: "bg-green-100 text-green-700",
  in_progress: "bg-amber-100 text-amber-700",
  not_started: "bg-slate-100 text-slate-500",
};

export default function InterviewHistoryCard({ session }: { session: InterviewSession }) {
  return (
    <Link
      href={`/dashboard/interviews/${session.id}`}
      className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 transition hover:border-blue-300"
    >
      <div>
        <p className="font-medium text-slate-900">
          {session.role}{session.company ? ` · ${session.company}` : ""}
        </p>
        <p className="mt-1 text-sm text-slate-500">
          {new Date(session.createdAt).toLocaleDateString()} · {session.type.replace("_", " ")}
        </p>
      </div>
      <div className="flex items-center gap-3">
        {typeof session.score === "number" && (
          <span className="text-sm font-semibold text-slate-700">{session.score}%</span>
        )}
        <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusStyles[session.status]}`}>
          {session.status.replace("_", " ")}
        </span>
      </div>
    </Link>
  );
}