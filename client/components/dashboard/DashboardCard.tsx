import { ReactNode } from "react";

interface DashboardCardProps {
  title: string;
  value: string;
  icon?: ReactNode;
}

export default function DashboardCard({
  title,
  value,
  icon,
}: DashboardCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">
            {title}
          </p>

          <h3 className="mt-2 text-3xl font-bold text-slate-900">
            {value}
          </h3>
        </div>

        {icon && (
          <div className="rounded-xl bg-blue-100 p-3 text-blue-600">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}