import { Router, Response, NextFunction } from "express";
import multer from "multer";
import pdfParse from "pdf-parse";
import { generateJSON } from "../lib/gemini";
import { supabase, RESUME_BUCKET } from "../lib/supabase";
import { prisma } from "../lib/prisma";
import { requireAuth, AuthedRequest } from "../middleware/auth";

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Only PDF files are accepted"));
    }
    cb(null, true);
  },
});

const SIGNED_URL_TTL_SECONDS = 60 * 60; // 1 hour — regenerated on every fetch, so short-lived is fine

interface AnalysisResult {
  atsScore: number;
  summary: string;
  suggestions: { category: "formatting" | "content" | "keywords" | "structure"; text: string }[];
}

const VALID_CATEGORIES = ["formatting", "content", "keywords", "structure"];

async function analyzeResume(resumeText: string): Promise<AnalysisResult> {
  const prompt = `You are an ATS (Applicant Tracking System) and resume reviewer for students applying to tech internships/jobs.

Analyze this resume text and respond with ONLY a JSON object in this exact shape, no markdown fences, no extra text:
{
  "atsScore": <integer 0-100>,
  "summary": "<2-3 sentence overall assessment>",
  "suggestions": [
    { "category": "formatting" | "content" | "keywords" | "structure", "text": "<specific actionable suggestion>" }
  ]
}

Provide 4-6 suggestions covering a mix of categories. Be specific to what's actually in the resume below, not generic advice.

RESUME TEXT:
${resumeText}`;

  const raw = await generateJSON(prompt);

  let parsed: AnalysisResult;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error("AI returned malformed JSON");
  }

  if (
    typeof parsed.atsScore !== "number" ||
    typeof parsed.summary !== "string" ||
    !Array.isArray(parsed.suggestions) ||
    parsed.suggestions.some((s) => !VALID_CATEGORIES.includes(s.category) || typeof s.text !== "string")
  ) {
    throw new Error("AI response failed shape validation");
  }

  return parsed;
}

async function withSignedUrl<T extends { fileUrl: string | null }>(resume: T | null): Promise<T | null> {
  if (!resume || !resume.fileUrl) return resume;

  const { data, error } = await supabase.storage
    .from(RESUME_BUCKET)
    .createSignedUrl(resume.fileUrl, SIGNED_URL_TTL_SECONDS);

  if (error) {
    console.error("Failed to generate signed URL:", error);
    return resume; // fall back to returning the raw path rather than failing the whole request
  }

  return { ...resume, fileUrl: data.signedUrl };
}

router.get("/", requireAuth, async (req: AuthedRequest, res: Response, next: NextFunction) => {
  try {
    const resume = await prisma.resume.findFirst({
      where: { userId: req.userId! },
      include: { suggestions: true },
    });
    res.json(await withSignedUrl(resume));
  } catch (err) {
    next(err);
  }
});

router.post(
  "/",
  requireAuth,
  upload.single("file"),
  async (req: AuthedRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const parsed = await pdfParse(req.file.buffer);
      const text = parsed.text.trim();

      if (text.length < 50) {
        return res.status(400).json({
          error: "Couldn't read enough text from this PDF. Make sure it's not a scanned image.",
        });
      }

      let analysis: AnalysisResult;
      try {
        analysis = await analyzeResume(text);
      } catch (aiErr) {
        console.error("Gemini analysis failed:", aiErr);
        return res.status(502).json({ error: "AI analysis failed, please try again." });
      }

      const sanitizedName = req.file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, "_");
const storagePath = `${req.userId}/${Date.now()}-${sanitizedName}`;
      const { error: uploadError } = await supabase.storage
        .from(RESUME_BUCKET)
        .upload(storagePath, req.file.buffer, { contentType: "application/pdf", upsert: false });

      if (uploadError) {
        console.error("Supabase Storage upload failed:", uploadError);
        return res.status(502).json({ error: "File storage failed, please try again." });
      }

      // Re-upload replaces the existing resume — clean up the old file in storage too, not just the DB row
      const previous = await prisma.resume.findFirst({ where: { userId: req.userId! } });
      if (previous?.fileUrl) {
        await supabase.storage.from(RESUME_BUCKET).remove([previous.fileUrl]);
      }
      await prisma.resume.deleteMany({ where: { userId: req.userId! } });

      const resume = await prisma.resume.create({
        data: {
          userId: req.userId!,
          fileName: req.file.originalname,
          fileUrl: storagePath,
          status: "analyzed",
          atsScore: analysis.atsScore,
          summary: analysis.summary,
          suggestions: { create: analysis.suggestions },
        },
        include: { suggestions: true },
      });

      res.status(201).json(await withSignedUrl(resume));
    } catch (err) {
      next(err);
    }
  }
);

export default router;