"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getInterviewSession, submitAnswer, completeInterview } from "@/lib/interviews";
import { InterviewSession } from "@/types/interview";
import InterviewResults from "./InterviewResults";

export default function InterviewSessionClient({ sessionId }: { sessionId: string }) {
  const router = useRouter();
  const [session, setSession] = useState<InterviewSession | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    getInterviewSession(sessionId).then((s) => {
      if (!s) return router.replace("/dashboard/interviews");
      setSession(s);
      setLoading(false);
    });
  }, [sessionId, router]);

  if (loading || !session) return <p className="text-sm text-slate-500">Loading interview...</p>;

  if (session.status === "completed") {
    return <InterviewResults session={session} />;
  }

  const question = session.questions[currentIndex];
  const isLast = currentIndex === session.questions.length - 1;

  const handleNext = async () => {
    setSubmitting(true);
    await submitAnswer(session.id, question.id, draft);
    setDraft("");

    if (isLast) {
      const finished = await completeInterview(session.id);
      if (finished) setSession(finished);
    } else {
      setCurrentIndex((i) => i + 1);
    }
    setSubmitting(false);
  };

  return (
    <div className="mx-auto max-w-2xl">
      <p className="text-sm text-slate-500">
        Question {currentIndex + 1} of {session.questions.length}
      </p>
      <h2 className="mt-2 text-xl font-semibold text-slate-900">{question.text}</h2>

      <textarea
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        rows={8}
        placeholder="Type your answer..."
        className="mt-4 w-full rounded-xl border border-slate-300 p-4 text-sm"
      />

      <button
        onClick={handleNext}
        disabled={submitting || draft.trim().length === 0}
        className="mt-4 rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:opacity-50"
      >
        {submitting ? "Submitting..." : isLast ? "Finish Interview" : "Next Question"}
      </button>
    </div>
  );
}