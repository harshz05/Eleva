import { Request, Response, NextFunction } from "express";
import { verifyToken } from "@clerk/backend";
import { prisma } from "../lib/prisma";

export interface AuthedRequest extends Request {
  userId?: string;
}

export async function requireAuth(req: AuthedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing auth token" });
  }

  try {
    const token = authHeader.split(" ")[1];
    const payload = await verifyToken(token, {
      secretKey: process.env.CLERK_SECRET_KEY!,
    });

    const user = await prisma.user.upsert({
      where: { clerkId: payload.sub },
      update: {},
      create: {
        clerkId: payload.sub,
        email: `${payload.sub}@placeholder.eleva`, // temp — we'll fix this when we test auth live
      },
    });

    req.userId = user.id;
    next(); // "checkpoint passed, continue to the actual route"
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}