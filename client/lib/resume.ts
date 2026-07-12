import { mockResumeAnalysis } from "@/constants/resumeData";
import { Resume } from "@/types/resume";

// In-memory store, same bridge pattern as lib/interviews.ts — replaced by
// real Postgres/Prisma + file storage once backend lands.
let currentResume: Resume | null = null;

export async function getCurrentResume(): Promise<Resume | null> {
  return currentResume;
}

export async function uploadResume(file: File): Promise<Resume> {
  // TODO(v1.0-backend): actually store the file (S3/Cloudinary or DB blob)
  // TODO(v1.0-AI): parse real PDF text and run it through an AI feedback call
  const resume: Resume = {
    id: `res-${Date.now()}`,
    fileName: file.name,
    uploadedAt: new Date().toISOString(),
    status: "processing",
  };
  currentResume = resume;

  // simulate async processing delay
  await new Promise((r) => setTimeout(r, 1200));
  currentResume = { ...resume, status: "analyzed", analysis: mockResumeAnalysis };
  return currentResume;
}
