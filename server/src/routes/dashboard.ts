import { Router, Response, NextFunction } from "express";
import { prisma } from "../lib/prisma";
import { requireAuth, AuthedRequest } from "../middleware/auth";

const router = Router();

router.get("/", requireAuth, async (req: AuthedRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.userId!;

    const [mockInterviews, latestResume, bestScoreAgg] = await Promise.all([
      prisma.interviewSession.count({ where: { userId, status: "completed" } }),
      prisma.resume.findFirst({ where: { userId }, orderBy: { createdAt: "desc" } }),
      prisma.interviewSession.aggregate({
        where: { userId, status: "completed" },
        _max: { score: true },
      }),
    ]);

    res.json({
      mockInterviews,
      resumeScore: latestResume?.atsScore ?? null,
      bestScore: bestScoreAgg._max.score ?? null,
    });
  } catch (err) {
    next(err);
  }
});

export default router;