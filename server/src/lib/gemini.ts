import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
const MODEL_NAME = "gemini-flash-lite-latest"; // lite tier — less demand congestion than flash-latest, proven working

export async function generateJSON(prompt: string): Promise<string> {
  const maxAttempts = 3;
  let lastError: unknown;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const result = await ai.models.generateContent({
        model: MODEL_NAME,
        contents: prompt,
        config: { responseMimeType: "application/json", temperature: 0.4 },
      });
      return (result.text ?? "").trim();
    } catch (err) {
      lastError = err;
      const isRetryable = err instanceof Error && /503|overloaded|UNAVAILABLE/i.test(err.message);
      if (isRetryable && attempt < maxAttempts) {
        await new Promise((resolve) => setTimeout(resolve, attempt * 1500)); // 1.5s, then 3s
        continue;
      }
      throw err;
    }
  }

  throw lastError;
}