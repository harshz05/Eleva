export interface ResumeSuggestion {
  id: string;
  category: "formatting" | "content" | "keywords" | "structure";
  text: string;
}

export interface ResumeAnalysis {
  summary: string;
  atsScore: number; // 0-100, AI-generated ATS score
  suggestions: ResumeSuggestion[];
}

export interface Resume {
  id: string;
  fileName: string;
  fileUrl?: string;
  uploadedAt: string;
  status: "processing" | "analyzed" | "failed";
  analysis?: ResumeAnalysis;
}