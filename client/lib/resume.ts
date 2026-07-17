import { Resume } from "@/types/resume";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

type GetToken = () => Promise<string | null>;

interface ApiResume {
  id: string;
  fileName: string;
  fileUrl: string | null;
  status: "processing" | "analyzed" | "failed";
  atsScore: number | null;
  summary: string | null;
  createdAt: string;
  suggestions: { id: string; category: string; text: string }[];
}

function mapToResume(api: ApiResume): Resume {
  return {
    id: api.id,
    fileName: api.fileName,
    fileUrl: api.fileUrl ?? undefined,
    uploadedAt: api.createdAt,
    status: api.status,
    analysis:
      api.status === "analyzed" && api.atsScore !== null && api.summary !== null
        ? {
            atsScore: api.atsScore,
            summary: api.summary,
            suggestions: api.suggestions.map((s) => ({
              id: s.id,
              category: s.category as "formatting" | "content" | "keywords" | "structure",
              text: s.text,
            })),
          }
        : undefined,
  };
}

async function authFetch(path: string, getToken: GetToken, options: RequestInit = {}) {
  const token = await getToken();
  const isFormData = options.body instanceof FormData;
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
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

export async function getCurrentResume(getToken: GetToken): Promise<Resume | null> {
  const api: ApiResume | null = await authFetch("/api/resume", getToken);
  return api ? mapToResume(api) : null;
}

export async function uploadResume(getToken: GetToken, file: File): Promise<Resume> {
  const formData = new FormData();
  formData.append("file", file);
  const api: ApiResume = await authFetch("/api/resume", getToken, {
    method: "POST",
    body: formData,
  });
  return mapToResume(api);
}