import { mockDashboardData } from "@/constants/dashboardData";
import { DashboardData } from "@/types/dashboard";

export async function getDashboardStats(): Promise<DashboardData> {
  return mockDashboardData;
}