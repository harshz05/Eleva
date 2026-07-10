import DashboardCard from "@/components/dashboard/DashboardCard";

import {
  FileText,
  Brain,
  Trophy,
  Target,
} from "lucide-react";

export default function DashboardPage() {
  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Welcome to Eleva 👋
        </h1>

        <p className="mt-2 text-slate-500">
          Here's an overview of your placement preparation.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <DashboardCard
          title="Mock Interviews"
          value="0"
          icon={<Brain size={24} />}
        />

        <DashboardCard
          title="Resume Score"
          value="--"
          icon={<FileText size={24} />}
        />

        <DashboardCard
          title="DSA Progress"
          value="0%"
          icon={<Target size={24} />}
        />

        <DashboardCard
          title="Achievements"
          value="0"
          icon={<Trophy size={24} />}
        />
      </div>
    </>
  );
}