import "dotenv/config";
import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import interviewsRouter from "./routes/interviews";
import resumeRouter from "./routes/resume";
import dashboardRouter from "./routes/dashboard";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL ?? "http://localhost:3000", credentials: true }));
app.use(express.json());

// General limiter — generous, just guards against outright abuse
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  limit: 200,
  standardHeaders: true,
  legacyHeaders: false,
});

// Stricter limiter for AI-calling routes — these cost real API quota
const aiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  limit: 15, // 15 AI-triggering requests per user IP per 15 min
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many AI requests. Please wait a few minutes and try again." },
});

app.use(generalLimiter);

app.get("/health", (_req, res) => res.json({ status: "ok" }));
app.use("/api/interviews", aiLimiter, interviewsRouter);
app.use("/api/resume", aiLimiter, resumeRouter);
app.use("/api/dashboard", dashboardRouter);

app.use(errorHandler);

const PORT = process.env.PORT ?? 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));