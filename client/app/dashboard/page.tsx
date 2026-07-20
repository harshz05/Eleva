"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import DashboardCard from "@/components/dashboard/DashboardCard";
import { getDashboardStats, DashboardStats } from "@/lib/dashboard";

export default function DashboardPage() {
  const { getToken } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    getDashboardStats(getToken)
      .then(setStats)
      .catch(() => setStats(null));
  }, [getToken]);

  const cards = [
    {
      id: "mock-interviews",
      label: "Mock Interviews",
      value: stats ? String(stats.mockInterviews) : "...",
      icon: "Brain",
    },
    {
      id: "resume-score",
      label: "Resume Score",
      value: stats ? (stats.resumeScore !== null ? String(stats.resumeScore) : "--") : "...",
      icon: "FileText",
    },
    {
      id: "dsa-progress",
      label: "DSA Progress",
      value: "Coming Soon",
      icon: "Target",
    },
    {
      id: "best-score",
      label: "Best Interview Score",
      value: stats ? (stats.bestScore !== null ? String(stats.bestScore) : "--") : "...",
      icon: "Trophy",
    },
  ];

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Welcome to Eleva 👋</h1>
        <p className="mt-2 text-slate-500">Here's an overview of your placement preparation.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((stat) => (
          <DashboardCard key={stat.id} label={stat.label} value={stat.value} icon={stat.icon} />
        ))}
      </div>
    </>
  );
}