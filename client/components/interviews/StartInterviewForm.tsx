"use client";

import { useState } from "react";
import { InterviewType, NewInterviewInput } from "@/types/interviews";

const ROLE_OPTIONS = ["SDE Intern", "ML Intern", "Frontend Intern", "Backend Intern"];
const TYPE_OPTIONS: { value: InterviewType; label: string }[] = [
  { value: "dsa", label: "DSA" },
  { value: "behavioral", label: "Behavioral" },
  { value: "technical", label: "Technical" },
  { value: "system_design", label: "System Design" },
];

interface StartInterviewFormProps {
  onStart: (input: NewInterviewInput) => void;
  isCreating: boolean;
}

export default function StartInterviewForm({ onStart, isCreating }: StartInterviewFormProps) {
  const [role, setRole] = useState(ROLE_OPTIONS[0]);
  const [company, setCompany] = useState("");
  const [type, setType] = useState<InterviewType>("dsa");

  const handleSubmit = () => {
    onStart({ role, company: company.trim() || undefined, type });
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">Start a Mock Interview</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
        >
          {ROLE_OPTIONS.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
        <input
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Company (optional)"
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value as InterviewType)}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
        >
          {TYPE_OPTIONS.map((t) => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>
      </div>
      <button
        onClick={handleSubmit}
        disabled={isCreating}
        className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:opacity-50"
      >
        {isCreating ? "Starting..." : "Start Interview"}
      </button>
    </div>
  );
}