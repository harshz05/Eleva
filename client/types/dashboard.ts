/**
 * Shape of a single dashboard stat card.
 * icon is a Lucide icon *name* (string), not a JSX element —
 * this keeps the constants file pure data, no JSX in .ts files.
 */
export interface DashboardStat {
  id: string;
  label: string;          // e.g. "Mock Interviews"
  value: string;          // e.g. "12" or "78%" — string so we can show "--" placeholders too
  icon: string;            // Lucide icon name, e.g. "Brain"
  trend?: {
    direction: "up" | "down" | "neutral";
    value: string;        // e.g. "+12% this week"
  };
}

/** A single recent-activity entry, for a future "Recent Activity" feed. */
export interface DashboardActivity {
  id: string;
  type: "interview" | "resume" | "dsa" | "achievement";
  title: string;
  timestamp: string; // ISO date string
  meta?: string;      // e.g. "Score: 82%"
}

/** Aggregate shape returned by getDashboardStats(). */
export interface DashboardData {
  stats: DashboardStat[];
  recentActivity: DashboardActivity[];
}