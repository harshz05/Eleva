import { Router, Response, NextFunction } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { requireAuth, AuthedRequest } from "../middleware/auth";

const router = Router();

const newSessionSchema = z.object({
  role: z.string().min(1),
  company: z.string().optional(),
  type: z.enum(["dsa", "behavioral", "technical", "system_design"]),
});

const QUESTION_BANK: Record<string, string[]> = {
  dsa: [
    "Explain your approach to finding duplicates in an array in O(n) time.",
    "How would you detect a cycle in a linked list?",
    "Walk through how you'd solve the two-sum problem efficiently.",
  ],
  behavioral: [
    "Tell me about a time you disagreed with a teammate. How did you resolve it?",
    "Describe a project you're proud of and your specific contribution.",
    "How do you prioritize when you have multiple deadlines at once?",
  ],
  technical: [
    "Explain the difference between SQL and NoSQL databases, and when you'd choose each.",
    "What happens when you type a URL into a browser and hit enter?",
    "How does garbage collection work in the language you're most comfortable with?",
  ],
  system_design: [
    "How would you design a URL shortener?",
    "Design a basic rate limiter for an API.",
    "How would you scale a service that suddenly gets 100x traffic?",
  ],
};

router.get("/", requireAuth, async (req: AuthedRequest, res: Response, next: NextFunction) => {
  try {
    const sessions = await prisma.interviewSession.findMany({
      where: { userId: req.userId! }, // requireAuth guarantees this is set
      include: { questions: true },
      orderBy: { createdAt: "desc" },
    });
    res.json(sessions);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", requireAuth, async (req: AuthedRequest, res: Response, next: NextFunction) => {
  try {
    const session = await prisma.interviewSession.findFirst({
      where: { id: req.params.id as string, userId: req.userId! },
      include: { questions: { orderBy: { order: "asc" } } },
    });
    if (!session) return res.status(404).json({ error: "Session not found" });
    res.json(session);
  } catch (err) {
    next(err);
  }
});

router.post("/", requireAuth, async (req: AuthedRequest, res: Response, next: NextFunction) => {
  try {
    const input = newSessionSchema.parse(req.body);
    // TODO(v1.0-AI): replace QUESTION_BANK lookup with real AI question generation
    const questionTexts = QUESTION_BANK[input.type].slice(0, 3);

    const session = await prisma.interviewSession.create({
      data: {
        userId: req.userId!,
        role: input.role,
        company: input.company ?? null,
        type: input.type,
        questions: {
          create: questionTexts.map((text, i) => ({
            text,
            type: input.type,
            order: i,
          })),
        },
      },
      include: { questions: true },
    });

    res.status(201).json(session);
  } catch (err) {
    next(err);
  }
});

router.patch("/:id/questions/:qId", requireAuth, async (req: AuthedRequest, res: Response, next: NextFunction) => {
  try {
    const { answer } = z.object({ answer: z.string() }).parse(req.body);
    const question = await prisma.interviewQuestion.update({
      where: { id: req.params.qId as string },
      data: { answer },
    });
    res.json(question);
  } catch (err) {
    next(err);
  }
});

router.post("/:id/complete", requireAuth, async (req: AuthedRequest, res: Response, next: NextFunction) => {
  try {
    const session = await prisma.interviewSession.findFirst({
      where: { id: req.params.id as string, userId: req.userId! },
      include: { questions: true },
    });
    if (!session) return res.status(404).json({ error: "Session not found" });

    // TODO(v1.0-AI): replace with real AI evaluation call (per-question feedback + score)
    const score = Math.floor(Math.random() * 21) + 70;
    await Promise.all(
      session.questions.map((q: { id: string; answer: string | null }) =>
        prisma.interviewQuestion.update({
          where: { id: q.id },
          data: {
            feedback: q.answer
              ? "Solid structure — consider adding a concrete example next time."
              : "No answer submitted.",
          },
        })
      )
    );

    const updated = await prisma.interviewSession.update({
      where: { id: session.id },
      data: { status: "completed", completedAt: new Date(), score },
      include: { questions: true },
    });

    res.json(updated);
  } catch (err) {
    next(err);
  }
});

export default router;