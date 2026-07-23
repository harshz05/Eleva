import { Router, Response, NextFunction } from "express";
import { z } from "zod";
import { generateJSON } from "../lib/gemini";
import { prisma } from "../lib/prisma";
import { requireAuth, AuthedRequest } from "../middleware/auth";

const router = Router();

const newSessionSchema = z.object({
  role: z.string().min(1),
  company: z.string().optional(),
  type: z.enum(["dsa", "behavioral", "technical", "system_design"]),
});

async function generateQuestions(role: string, company: string | undefined, type: string): Promise<string[]> {
  const variationSeed = Math.random().toString(36).slice(2, 8);
  const prompt = `You are a technical interviewer preparing questions for a mock interview.

Candidate is interviewing for: ${role}${company ? ` at ${company}` : ""}
Interview type: ${type}

Generate exactly 3 interview questions appropriate for this role and type. Vary your questions each time you're asked — avoid defaulting to the most generic, commonly-cited question for this role/type. Draw from a wide range of realistic sub-topics. (Session variation tag, ignore in output: ${variationSeed})

Respond with ONLY a JSON object in this exact shape, no markdown fences, no extra text:
{
  "questions": ["question 1", "question 2", "question 3"]
}`;

  const raw = await generateJSON(prompt, 0.9);

  let parsed: { questions: string[] };
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error("AI returned malformed JSON");
  }

  if (!Array.isArray(parsed.questions) || parsed.questions.length !== 3 || parsed.questions.some((q) => typeof q !== "string")) {
    throw new Error("AI response failed shape validation");
  }

  return parsed.questions;
}

interface EvalResult {
  score: number;
  feedback: { order: number; text: string }[];
}

async function evaluateAnswers(
  role: string,
  answered: { order: number; question: string; answer: string }[]
): Promise<EvalResult> {
  const prompt = `You are evaluating a candidate's mock interview answers for a ${role} position.

Questions and answers:
${answered.map((a) => `Q${a.order + 1}: ${a.question}\nA: ${a.answer}`).join("\n\n")}

Respond with ONLY a JSON object in this exact shape, no markdown fences, no extra text:
{
  "score": <integer 0-100, overall assessment across all answers>,
  "feedback": [
    { "order": <matching question number, 0-indexed>, "text": "<1-2 sentence specific feedback on that answer>" }
  ]
}`;

  const raw = await generateJSON(prompt);

  let parsed: EvalResult;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error("AI returned malformed JSON");
  }

  if (
    typeof parsed.score !== "number" ||
    !Array.isArray(parsed.feedback) ||
    parsed.feedback.some((f) => typeof f.order !== "number" || typeof f.text !== "string")
  ) {
    throw new Error("AI response failed shape validation");
  }

  return parsed;
}

router.get("/", requireAuth, async (req: AuthedRequest, res: Response, next: NextFunction) => {
  try {
    const sessions = await prisma.interviewSession.findMany({
      where: { userId: req.userId! },
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

    let questionTexts: string[];
    try {
      questionTexts = await generateQuestions(input.role, input.company, input.type);
    } catch (aiErr) {
      console.error("Gemini question generation failed:", aiErr);
      return res.status(502).json({ error: "AI question generation failed, please try again." });
    }

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
      include: { questions: { orderBy: { order: "asc" } } },
    });
    if (!session) return res.status(404).json({ error: "Session not found" });

    const answered = session.questions
      .map((q, i) => ({ order: i, question: q.text, answer: q.answer }))
      .filter((q): q is { order: number; question: string; answer: string } => Boolean(q.answer));

    let score = 0;
    let feedbackByOrder = new Map<number, string>();

    if (answered.length > 0) {
      try {
        const evalResult = await evaluateAnswers(session.role, answered);
        score = evalResult.score;
        feedbackByOrder = new Map(evalResult.feedback.map((f) => [f.order, f.text]));
      } catch (aiErr) {
        console.error("Gemini evaluation failed:", aiErr);
        return res.status(502).json({ error: "AI evaluation failed, please try again." });
      }
    }

    await Promise.all(
      session.questions.map((q, i) =>
        prisma.interviewQuestion.update({
          where: { id: q.id },
          data: {
            feedback: q.answer ? feedbackByOrder.get(i) ?? "No feedback generated." : "No answer submitted.",
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