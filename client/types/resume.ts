export interface ResumeSuggestion {
  id: string;
  category: "formatting" | "content" | "keywords" | "structure";
  text: string;
}

export interface ResumeAnalysis {
  summary: string;
  atsScore: number; // 0-100, simple mock score for MVP — no advanced algorithm
  suggestions: ResumeSuggestion[];
}

export interface Resume {
  id: string;
  fileName: string;
  uploadedAt: string;
  status: "processing" | "analyzed" | "failed";
  analysis?: ResumeAnalysis;
}
