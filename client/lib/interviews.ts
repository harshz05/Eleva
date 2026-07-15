import { InterviewSession, NewInterviewInput } from "@/types/interviews";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

type GetToken = () => Promise<string | null>;

async function authFetch(path: string, getToken: GetToken, options: RequestInit = {}) {
  const token = await getToken();
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(options.headers ?? {}),
    },
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? `Request failed: ${res.status}`);
  }
  return res.json();
}

export async function getInterviewSessions(getToken: GetToken): Promise<InterviewSession[]> {
  return authFetch("/api/interviews", getToken);
}

export async function getInterviewSession(
  getToken: GetToken,
  id: string
): Promise<InterviewSession | undefined> {
  try {
    return await authFetch(`/api/interviews/${id}`, getToken);
  } catch {
    return undefined;
  }
}

export async function createInterviewSession(
  getToken: GetToken,
  input: NewInterviewInput
): Promise<InterviewSession> {
  return authFetch("/api/interviews", getToken, {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function submitAnswer(
  getToken: GetToken,
  sessionId: string,
  questionId: string,
  answer: string
) {
  return authFetch(`/api/interviews/${sessionId}/questions/${questionId}`, getToken, {
    method: "PATCH",
    body: JSON.stringify({ answer }),
  });
}

export async function completeInterview(getToken: GetToken, sessionId: string) {
  return authFetch(`/api/interviews/${sessionId}/complete`, getToken, {
    method: "POST",
  });
}