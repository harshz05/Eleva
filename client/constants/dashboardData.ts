import { DashboardData } from "@/types/dashboard";

/**
 * Mock dashboard data — mirrors the shape a future
 * GET /api/dashboard endpoint will return.
 * Replacing this with a real fetch later requires no
 * component changes, only a change inside lib/dashboard.ts.
 */
export const mockDashboardData: DashboardData = {
  stats: [
    {
      id: "mock-interviews",
      label: "Mock Interviews",
      value: "0",
      icon: "Brain",
    },
    {
      id: "resume-score",
      label: "Resume Score",
      value: "--",
      icon: "FileText",
    },
    {
      id: "dsa-progress",
      label: "DSA Progress",
      value: "0%",
      icon: "Target",
    },
    {
      id: "achievements",
      label: "Achievements",
      value: "0",
      icon: "Trophy",
    },
  ],
  recentActivity: [],
};