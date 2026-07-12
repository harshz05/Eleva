import { ResumeAnalysis } from "@/types/resume";

// TODO(v1.0-AI): replace with real AI-generated feedback from parsed resume text.
export const mockResumeAnalysis: ResumeAnalysis = {
  summary:
    "Your resume is clear and well-structured, with strong technical project details. A few tweaks to keyword coverage and formatting consistency would improve ATS compatibility.",
  atsScore: 76,
  suggestions: [
    { id: "s1", category: "keywords", text: "Add role-specific keywords from the job description (e.g. 'REST API', 'CI/CD') to improve ATS matching." },
    { id: "s2", category: "formatting", text: "Use consistent bullet point punctuation throughout all sections." },
    { id: "s3", category: "structure", text: "Move your most relevant project (Eleva) higher, closer to the top of the page." },
    { id: "s4", category: "content", text: "Quantify achievements where possible — add metrics or outcomes to project bullets." },
  ],
};