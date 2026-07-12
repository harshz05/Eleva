import { mockInterviewSessions, generateMockQuestions } from "@/constants/interviewData";
import { InterviewSession, NewInterviewInput } from "@/types/interview";

// In-memory store simulating a DB until the real backend lands.
// Seeded once from mock data; mutated as sessions are created/updated.
const sessionStore: InterviewSession[] = [...mockInterviewSessions];

export async function getInterviewSessions(): Promise<InterviewSession[]> {
  return sessionStore;
}

export async function getInterviewSession(id: string): Promise<InterviewSession | undefined> {
  return sessionStore.find((s) => s.id === id);
}

export async function createInterviewSession(
  input: NewInterviewInput
): Promise<InterviewSession> {
  // TODO(v1.0-AI): replace generateMockQuestions with a real AI question-gen call.
  const session: InterviewSession = {
    id: `int-${Date.now()}`,
    role: input.role,
    company: input.company,
    type: input.type,
    status: "in_progress",
    createdAt: new Date().toISOString(),
    questions: generateMockQuestions(input.type),
  };
  sessionStore.unshift(session);
  return session;
}

export async function submitAnswer(
  sessionId: string,
  questionId: string,
  answer: string
): Promise<InterviewSession | undefined> {
  const session = sessionStore.find((s) => s.id === sessionId);
  if (!session) return undefined;
  const question = session.questions.find((q) => q.id === questionId);
  if (question) question.answer = answer;
  return session;
}

export async function completeInterview(sessionId: string): Promise<InterviewSession | undefined> {
  const session = sessionStore.find((s) => s.id === sessionId);
  if (!session) return undefined;
  // TODO(v1.0-AI): replace with a real AI evaluation call (per-question feedback + overall score).
  session.status = "completed";
  session.completedAt = new Date().toISOString();
  session.score = Math.floor(Math.random() * 21) + 70; // mock 70-90
  session.questions.forEach((q) => {
    q.feedback = q.answer
      ? "Solid structure — consider adding a concrete example next time."
      : "No answer submitted.";
  });
  return session;
}