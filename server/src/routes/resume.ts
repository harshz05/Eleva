import { Router, Response, NextFunction } from "express";
import multer from "multer";
import pdfParse from "pdf-parse";
import { generateJSON } from "../lib/gemini";
import { prisma } from "../lib/prisma";
import { requireAuth, AuthedRequest } from "../middleware/auth";

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(), // TODO(v1.0-backend): swap for real storage (S3/Cloudinary), currently file bytes are discarded after analysis
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Only PDF files are accepted"));
    }
    cb(null, true);
  },
});

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

router.get("/", requireAuth, async (req: AuthedRequest, res: Response, next: NextFunction) => {
  try {
    const resume = await prisma.resume.findFirst({
      where: { userId: req.userId! },
      include: { suggestions: true },
    });
    res.json(resume);
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

      await prisma.resume.deleteMany({ where: { userId: req.userId! } });

      const resume = await prisma.resume.create({
        data: {
          userId: req.userId!,
          fileName: req.file.originalname,
          fileUrl: null,
          status: "analyzed",
          atsScore: analysis.atsScore,
          summary: analysis.summary,
          suggestions: { create: analysis.suggestions },
        },
        include: { suggestions: true },
      });

      res.status(201).json(resume);
    } catch (err) {
      next(err);
    }
  }
);

export default router;