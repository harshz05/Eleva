export type InterviewType = "dsa" | "behavioral" | "system_design" | "technical";
export type InterviewStatus = "not_started" | "in_progress" | "completed";

export interface InterviewQuestion {
  id: string;
  text: string;
  type: InterviewType;
  answer?: string;
  feedback?: string;
}

export interface InterviewSession {
  id: string;
  role: string;
  company?: string;
  type: InterviewType;
  status: InterviewStatus;
  createdAt: string;
  completedAt?: string;
  durationSeconds?: number;
  score?: number;
  questions: InterviewQuestion[];
}

export interface NewInterviewInput {
  role: string;
  company?: string;
  type: InterviewType;
}