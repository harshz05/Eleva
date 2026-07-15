CONTEXT: Continuing Eleva build (I'm uploading ARCHITECTURE.md, PROJECT_LOG.md, 
ROADMAP.md, and possibly a repomix-output.xml of the current repo alongside this — 
read those for full file contents and detailed history. This message covers the 
"why" and current live state that isn't fully captured in those docs.)

## Who I am / how I work
3rd-year BTech CSE student (BIT Mesra), building this as a placement portfolio 
project. This is my first time building a real separate backend (previously only 
did frontend-only or same-process "backend" via Next.js lib/ functions) — so I 
understand concepts but need things explained clearly, not glossed over, 
especially anything genuinely new (middleware, ORMs, auth tokens, etc). Don't 
over-slow-down on things that are simple though — move at a good pace, just 
pause to explain the genuinely complex bits.

Preferences: full copy-paste-ready file drops (not fragments), minimal code 
comments (explain in chat instead), I make final calls but you should make 
architectural decisions independently and just tell me what you decided and why, 
commit after each sprint with meaningful messages, remind me to update the 
ARCHITECTURE.md/PROJECT_LOG.md/ROADMAP.md docs since I tend to forget mid-sprint, 
want candid/honest feedback not cheerleading.

## Strategy (this is the most important context)
Originally planned full roadmap (voice interviews, webcam, DSA tracker, advanced 
analytics, etc.) — PIVOTED mid-project to MVP-first. Reasoning: I need this 
deployed and usable as a placement resume project ASAP, not feature-complete.

- Target deploy: July 30, 2026 (hard deadline, self-imposed for placement prep)
- Time budget: ~3 hrs/day
- Priority: complete + deployed > ambitious + unfinished
- DSA Tracker: DEFERRED to v1.1, ships as "Coming Soon" badge in v1.0 nav
- Voice/webcam/emotion-detection/advanced-analytics: all deferred indefinitely, 
  not in v1.0 scope at all
- AI Interview: TEXT-ONLY (select role -> generate questions -> type answers -> 
  AI evaluates -> feedback -> save to history)
- Resume Analyzer: basic only (upload -> parse -> AI feedback -> basic ATS 
  suggestions), no advanced scoring algorithms

## Tech stack (final decisions made this project)
- Frontend: client/ — Next.js 16.2.9, TypeScript, Tailwind CSS, React 19, 
  Clerk (@clerk/nextjs ^7.5.16) for auth
- Backend: server/ — SEPARATE Express server (deliberate choice over Next.js 
  API routes), TypeScript, tsx for dev hot-reload
- ORM: Prisma — PINNED TO V6 (see gotcha below, this matters)
- Database: Supabase Postgres, region ap-south-1 (Mumbai), project name 
  "eleva-db", org "harshz05's Org"
- Auth: Clerk on frontend AND backend — backend verifies Clerk session tokens 
  via @clerk/backend's verifyToken(), upserts a local User row keyed by clerkId
- File upload handling: multer (memory storage only, no persistence yet)

## Architecture pattern (established since Day 1, still followed)
Data -> Constants -> lib/ (data-access seam) -> Components -> Rendered UI

lib/ functions are the ONLY seam between UI and data source. Both 
lib/interviews.ts AND lib/resume.ts now call the REAL Express backend with 
Clerk-authenticated fetch. lib/resume.ts additionally translates the backend's 
flat response shape into the client's nested Resume.analysis shape — the 
seam absorbs that mismatch so the UI components never changed.

## CURRENT LIVE STATE (as of end of last session — Sprint 9 complete)

### Working end-to-end on REAL infrastructure:
- Auth: Clerk sign up/in/out, protected routes — fully functional
- Dashboard: home, profile, stats cards, nav, responsive — fully functional
- Interview module: COMPLETE end-to-end on real backend (Sprint 8). Data 
  persists in real Supabase Postgres (User, InterviewSession, 
  InterviewQuestion tables).
- Resume Analyzer: COMPLETE end-to-end on real backend (Sprint 9). Upload 
  (PDF, multer memory storage) -> mock ATS analysis -> persisted to real 
  Supabase Postgres (Resume, ResumeSuggestion tables, 1:1 with User) -> 
  survives page reload. Verified through actual UI, not just API testing.

### Explicitly stubbed / deferred (by design, not unfinished):
- Resume file bytes are NOT persisted anywhere (no S3/Cloudinary yet) — 
  TODO(v1.0-backend) in server/src/routes/resume.ts
- Resume ATS scoring + suggestions are mocked server-side — 
  TODO(v1.0-AI) in same file
- Interview question generation + evaluation are mocked server-side — 
  TODO(v1.0-AI) in server/src/routes/interviews.ts
- DSA Tracker, Analytics, Settings — all render ComingSoon.tsx, intentional 
  per MVP scope

## Backend structure (server/)
server/
├── prisma/
│   ├── schema.prisma       — User, InterviewSession, InterviewQuestion, 
│   │                          Resume, ResumeSuggestion, and their enums
│   └── migrations/         — 20260714075533_init, 
│                              <timestamp>_add_resume_models
├── src/
│   ├── index.ts             — Express app entry, CORS (CLIENT_URL env), 
│   │                          mounts /api/interviews, /api/resume, /health
│   ├── lib/
│   │   └── prisma.ts        — singleton PrismaClient (dev hot-reload safe)
│   ├── middleware/
│   │   ├── auth.ts          — requireAuth: verifies Clerk Bearer token, 
│   │   │                      upserts local User row, attaches req.userId
│   │   └── errorHandler.ts  — centralized error responses
│   └── routes/
│       ├── interviews.ts    — GET /, GET /:id, POST /, PATCH /:id/questions/:qId, 
│       │                       POST /:id/complete
│       └── resume.ts        — GET / (current resume), POST / (multer upload, 
│                               replaces existing resume, mock-analyzes, persists)
├── .env
├── package.json              — added: multer, @types/multer (Sprint 9)
└── tsconfig.json

Frontend (Sprint 9 additions):
- client/lib/resume.ts rewritten: authFetch pattern (same as interviews.ts) 
  plus a mapToResume() translation layer for the flat->nested shape mismatch. 
  FormData uploads skip the Content-Type header (browser sets multipart 
  boundary automatically) — authFetch() checks `body instanceof FormData`.
- client/components/resume/ResumePageClient.tsx and ResumeUpload.tsx 
  updated to import useAuth from "@clerk/nextjs" and thread getToken through, 
  same as the Interview components in Sprint 8.

## GOTCHAS HIT THIS PROJECT (important — will save time if they recur)

1. **Prisma 7 vs 6**: unpinned install pulls Prisma 7 (breaking config 
   changes). ALWAYS use `prisma@6 @prisma/client@6`, v6 syntax 
   (url + directUrl directly in schema.prisma, plain `new PrismaClient()`).

2. **Express 4 + @types/express mismatch**: unpinned @types/express can pull 
   v5-compatible types against Express 4 runtime, breaking req.params typing. 
   Fixed with `as string` casts.

3. **tsconfig module/moduleResolution mismatch**: target ES2022, module 
   CommonJS, esModuleInterop true, no explicit moduleResolution line.

4. **Postgres password URL-encoding**: `@` in the DB password must be 
   URL-encoded as `%40` in DATABASE_URL/DIRECT_URL.

5. **Clerk tokens expire fast (~60s)**: grab a fresh token immediately 
   before each manual DevTools test.

6. **Two servers must run simultaneously**: client (3000) and server (4000) 
   are separate processes — verify both terminals show "running on port X".

7. **Next.js 16 async params**: dynamic route params are a Promise now — 
   `async function Page({ params }: { params: Promise<{ id: string }> })`.

8. **Prisma client regeneration doesn't always propagate live**: after 
   `prisma migrate dev` adds a new model, a running `tsx watch` process and 
   VS Code's TS server can both keep using the stale generated client. Fix: 
   `npx prisma generate` explicitly, restart `tsx watch`, and if VS Code 
   still shows red squiggles, `Developer: Reload Window` (plain "Restart TS 
   Server" sometimes isn't enough — it has its own separate cache).

9. **tsx doesn't type-check**: it strips TypeScript types and runs JS 
   directly, so red squiggles in the Problems tab don't mean the server is 
   broken. Trust an actual browser/API test over the editor's Problems tab 
   when the two disagree.

10. **`tsx` is a local dependency, not a global command**: running `tsx 
    watch` directly in PowerShell fails with CommandNotFoundException. Use 
    `npm run dev` (the package.json script) or `npx tsx watch src/index.ts`.

## NEXT PLANNED SPRINT (where we left off)
Wire real AI for both modules — the last non-deployment piece:
1. Choose provider (OpenAI likely, TBD) and add API key to server/.env
2. Interview module: replace QUESTION_BANK lookup in 
   POST /api/interviews with real AI question generation; replace the 
   random-score mock in POST /:id/complete with real per-question 
   evaluation + feedback
3. Resume module: replace mockAnalyze() in POST /api/resume with real PDF 
   text extraction + AI-generated ATS score/summary/suggestions
4. Both TODO(v1.0-AI) markers are already isolated to single functions in 
   each route file — this sprint should be a clean swap, no structural 
   changes needed
5. Test end-to-end, commit, update docs

After that: real file storage for resumes (TODO(v1.0-backend)), then 
deployment prep (Vercel + env config + production build).

Timeline check: Sprint 9 (Resume backend) complete. Deploy target July 30 
still realistic if pace holds — AI integration sprint next, then storage, 
then deploy.