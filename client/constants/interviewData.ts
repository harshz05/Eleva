import { InterviewSession, InterviewType } from "@/types/interview";

export const mockInterviewSessions: InterviewSession[] = [
  {
    id: "int-001",
    role: "SDE Intern",
    company: "Flipkart",
    type: "dsa",
    status: "completed",
    createdAt: "2026-07-08T10:00:00.000Z",
    completedAt: "2026-07-08T10:32:00.000Z",
    durationSeconds: 1920,
    score: 78,
    questions: [
      { id: "q1", text: "Find the longest palindromic substring.", type: "dsa" },
      { id: "q2", text: "Design a rate limiter.", type: "system_design" },
    ],
  },
];

const QUESTION_BANK: Record<InterviewType, string[]> = {
  dsa: [
    "Explain your approach to finding duplicates in an array in O(n) time.",
    "How would you detect a cycle in a linked list?",
    "Walk through how you'd solve the two-sum problem efficiently.",
  ],
  behavioral: [
    "Tell me about a time you disagreed with a teammate. How did you resolve it?",
    "Describe a project you're proud of and your specific contribution.",
    "How do you prioritize when you have multiple deadlines at once?",
  ],
  technical: [
    "Explain the difference between SQL and NoSQL databases, and when you'd choose each.",
    "What happens when you type a URL into a browser and hit enter?",
    "How does garbage collection work in the language you're most comfortable with?",
  ],
  system_design: [
    "How would you design a URL shortener?",
    "Design a basic rate limiter for an API.",
    "How would you scale a service that suddenly gets 100x traffic?",
  ],
};

export function generateMockQuestions(type: InterviewType, count = 3) {
  return QUESTION_BANK[type].slice(0, count).map((text, i) => ({
    id: `q-${Date.now()}-${i}`,
    text,
    type,
  }));
}