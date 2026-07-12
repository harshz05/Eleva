"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getInterviewSessions, createInterviewSession } from "@/lib/interviews";
import { InterviewSession, NewInterviewInput } from "@/types/interviews";
import StartInterviewForm from "./StartInterviewForm";
import InterviewHistoryCard from "./InterviewHistoryCard";

export default function InterviewsPageClient() {
  const router = useRouter();
  const [sessions, setSessions] = useState<InterviewSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    getInterviewSessions().then((data) => {
      setSessions(data);
      setLoading(false);
    });
  }, []);

  const handleStart = async (input: NewInterviewInput) => {
    setIsCreating(true);
    const session = await createInterviewSession(input);
    setIsCreating(false);
    router.push(`/dashboard/interviews/${session.id}`);
  };

  if (loading) return <p className="text-sm text-slate-500">Loading interviews...</p>;

  return (
    <div className="space-y-6">
      <StartInterviewForm onStart={handleStart} isCreating={isCreating} />

      <div>
        <h2 className="mb-3 text-lg font-semibold text-slate-900">History</h2>
        {sessions.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center">
            <p className="text-slate-500">No interviews yet. Start your first one above.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {sessions.map((s) => (
              <InterviewHistoryCard key={s.id} session={s} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}