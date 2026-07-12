import {
  Brain,
  FileText,
  Target,
  Trophy,
  TrendingUp,
  TrendingDown,
  Minus,
  LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Brain,
  FileText,
  Target,
  Trophy,
};

interface DashboardCardProps {
  label: string;
  value: string;
  icon: string;
  trend?: {
    direction: "up" | "down" | "neutral";
    value: string;
  };
}

export default function DashboardCard({
  label,
  value,
  icon,
  trend,
}: DashboardCardProps) {
  const Icon = iconMap[icon];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">{label}</p>
          <h3 className="mt-2 text-3xl font-bold text-slate-900">{value}</h3>

          {trend && (
            <div
              className={`mt-2 flex items-center gap-1 text-sm ${
                trend.direction === "up"
                  ? "text-green-600"
                  : trend.direction === "down"
                  ? "text-red-600"
                  : "text-slate-400"
              }`}
            >
              {trend.direction === "up" && <TrendingUp size={14} />}
              {trend.direction === "down" && <TrendingDown size={14} />}
              {trend.direction === "neutral" && <Minus size={14} />}
              <span>{trend.value}</span>
            </div>
          )}
        </div>

        {Icon && (
          <div className="rounded-xl bg-blue-100 p-3 text-blue-600">
            <Icon size={24} />
          </div>
        )}
      </div>
    </div>
  );
}