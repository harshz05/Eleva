import DashboardCard from "@/components/dashboard/DashboardCard";
import { getDashboardStats } from "@/lib/dashboard";

export default async function DashboardPage() {
  const { stats } = await getDashboardStats();

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
        {stats.map((stat) => (
          <DashboardCard
            key={stat.id}
            label={stat.label}
            value={stat.value}
            icon={stat.icon}
            trend={stat.trend}
          />
        ))}
      </div>
    </>
  );
}