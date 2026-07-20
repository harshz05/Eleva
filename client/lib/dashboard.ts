const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

type GetToken = () => Promise<string | null>;

export interface DashboardStats {
  mockInterviews: number;
  resumeScore: number | null;
  bestScore: number | null;
}

export async function getDashboardStats(getToken: GetToken): Promise<DashboardStats> {
  const token = await getToken();
  const res = await fetch(`${API_URL}/api/dashboard`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to load dashboard stats");
  return res.json();
}