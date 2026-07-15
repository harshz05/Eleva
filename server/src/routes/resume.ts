import { Router, Response, NextFunction } from "express";
import multer from "multer";
import { prisma } from "../lib/prisma";
import { requireAuth, AuthedRequest } from "../middleware/auth";

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(), // TODO(v1.0-backend): swap for real storage (S3/Cloudinary), currently file bytes are discarded after mock analysis
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Only PDF files are accepted"));
    }
    cb(null, true);
  },
});

// TODO(v1.0-AI): replace with real PDF parsing + AI feedback call
function mockAnalyze(fileName: string) {
  return {
    atsScore: Math.floor(Math.random() * 21) + 70,
    summary:
      "Your resume is clear and well-structured, with strong technical project details. A few tweaks to keyword coverage and formatting consistency would improve ATS compatibility.",
    suggestions: [
      { category: "keywords" as const, text: "Add role-specific keywords from the job description (e.g. 'REST API', 'CI/CD') to improve ATS matching." },
      { category: "formatting" as const, text: "Use consistent bullet point punctuation throughout all sections." },
      { category: "structure" as const, text: `Move your most relevant project higher, closer to the top of ${fileName}.` },
      { category: "content" as const, text: "Quantify achievements where possible — add metrics or outcomes to project bullets." },
    ],
  };
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

      const analysis = mockAnalyze(req.file.originalname);

      // Re-upload replaces the existing resume — cascade deletes old suggestions
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