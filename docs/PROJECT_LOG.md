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
  — **MET.** App deployed and fully verified with 9 days to spare.
- Time budget: ~3 hrs/day
- Priority: complete + deployed > ambitious + unfinished
- DSA Tracker: DEFERRED to v1.1, ships as "Coming Soon" badge in v1.0 nav (this 
  is already built and working — see ComingSoon.tsx component, reused across 
  DSA/Analytics/Settings stub pages)
- Voice/webcam/emotion-detection/advanced-analytics: all deferred indefinitely, 
  not in v1.0 scope at all
- AI Interview: TEXT-ONLY (select role -> generate questions -> type answers -> 
  AI evaluates -> feedback -> save to history) — DONE, real AI (Gemini)
- Resume Analyzer: basic only (upload -> parse -> AI feedback -> basic ATS 
  suggestions), no advanced scoring algorithms — DONE, real AI (Gemini) + real 
  file storage (Supabase Storage)
- NEW (discussed post-launch, deferred to v1.1): MCQ-style questions (10 MCQs + 
  a few subjective), company-specific question banks (PDF to be provided later)

## Tech stack (final decisions made this project)
- Frontend: client/ — Next.js 16.2.9, TypeScript, Tailwind CSS, React 19, 
  Clerk (@clerk/nextjs ^7.5.16) for auth — deployed on **Vercel** 
  (eleva-three.vercel.app)
- Backend: server/ — SEPARATE Express server (deliberate choice over Next.js 
  API routes, to match original architecture plan and to have Express as a 
  distinct demonstrable skill for placements), TypeScript, tsx for dev hot-reload 
  — deployed on **Render** (eleva-server.onrender.com), free tier (spins down 
  after 15min inactivity, ~30-60s cold start on next request)
- ORM: Prisma — PINNED TO V6 (see gotcha below, this matters)
- Database: Supabase Postgres, region ap-south-1 (Mumbai), project name 
  "eleva-db", org "harshz05's Org" — same instance used for dev AND prod 
  (deliberate simplification, not a security-sensitive app at this stage)
- Auth: Clerk on frontend AND backend — backend verifies Clerk session tokens 
  via @clerk/backend's verifyToken(), upserts a local User row keyed by clerkId
- File upload handling: multer (memory storage only — bytes go straight to 
  Supabase Storage, never touch local disk)
- File storage: Supabase Storage, private "resumes" bucket — fileUrl column 
  stores the storage PATH not a permanent link (bucket is private, signed URLs 
  expire); a fresh signed URL is generated on every GET/POST response instead
- AI: Google Gemini via **@google/genai** (current SDK — the older 
  @google/generative-ai package is deprecated, swapped out mid-project after 
  hitting persistent errors tied to its legacy endpoint), model 
  `gemini-flash-lite-latest`

## Architecture pattern (established since Day 1, still followed)
Data -> Constants -> lib/ (data-access seam) -> Components -> Rendered UI

lib/ functions are the ONLY seam between UI and data source. All three data 
modules (interviews, resume, dashboard) now call the REAL Express backend with 
Clerk-authenticated fetch — no mocks remain anywhere in v1.0 scope. 
lib/resume.ts additionally translates the backend's flat response shape into 
the client's nested Resume.analysis shape — the seam absorbs that mismatch so 
the UI components never changed across the whole mock-to-real transition.

Icon fields in data are strings (e.g. "Brain"), resolved to Lucide icons via a 
local iconMap in components — keeps data files framework-agnostic.

## CURRENT LIVE STATE — v1.0 MVP COMPLETE AND DEPLOYED

Every module is real, working, and verified end-to-end in PRODUCTION (not just 
localhost) via actual UI testing in a fresh incognito session — not just API 
testing:

### Auth
Clerk sign up/in/out, protected routes, fully functional. Post-auth redirect to 
/dashboard fixed via NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL / 
..._SIGN_IN_... env vars (more reliable than the component prop alone — see 
gotcha below).

### Dashboard
Real stats from `/api/dashboard`, computed live from Postgres — not mocked 
(this was accidentally left mocked through Sprints 8-11 and only caught during 
post-deploy testing):
- Mock Interviews: count of completed InterviewSession rows
- Resume Score: latest Resume.atsScore
- Best Interview Score: max score across completed sessions (renamed from a 
  fabricated "Achievements" metric that had no real data behind it)
- DSA Progress: static "Coming Soon" (correctly deferred, not a bug)

### Interview module
COMPLETE end-to-end on real backend + real AI. Flow verified through actual UI: 
start interview -> pick role/company/type -> real Gemini-generated questions 
-> answer one at a time -> finish -> real Gemini evaluation + scoring -> 
results page -> history. Data persists in real Supabase Postgres. Question 
repetition across sessions (same role/type kept generating near-identical 
questions) fixed via temperature 0.9 + randomized variation seed per call — see 
gotcha below.

### Resume Analyzer
COMPLETE end-to-end on real backend + real AI + real file storage. Upload PDF 
-> real text extraction (pdf-parse v1.1.1) -> real Gemini ATS analysis -> 
persisted to Postgres (Resume, ResumeSuggestion, 1:1 with User) -> file 
uploaded to Supabase Storage private bucket -> signed URL generated fresh per 
request -> "View PDF" link in UI -> re-upload cleans up the old file from 
storage, not just the DB row.

### Landing page
All nav anchors (Features/Statistics/Testimonials/Pricing) working — these had 
never had matching `id` attributes on their sections, so clicking did nothing 
(pre-existing bug, never caught because dev testing always jumped straight to 
/dashboard). Get Started buttons (Navbar desktop + mobile, Hero, both Pricing 
cards) all wired to /sign-up — previously plain `<button>`s with no onClick at 
all. New "About Eleva" section added (replacing an empty "Learn More" button 
that did nothing) with real product description content. Footer's dead 
Blog/FAQ/Contact `#` links removed/fixed (Contact -> real mailto), social links 
pointed at real profiles instead of generic platform homepages.

### Deployment
Vercel (client) + Render (server), CORS configured correctly (CLIENT_URL on 
Render points at the real Vercel URL), all env vars in place on both platforms, 
fully live and tested.

### Explicitly stubbed / deferred (by design, not unfinished):
- DSA Tracker, Analytics, Settings — all render ComingSoon.tsx, sidebar links 
  correctly wired, no dead links, no broken imports. INTENTIONAL per MVP scope.
- `client/constants/resumeData.ts` — old mock data file, confirmed nothing 
  imports it anymore, dead code, safe to delete whenever, not urgent.

## Backend structure (server/)

server/
├── prisma/
│ ├── schema.prisma — User, InterviewSession, InterviewQuestion,
│ │ Resume, ResumeSuggestion, and their enums
│ └── migrations/ — 20260714075533_init, add_resume_models,
│ (+ any since)
├── src/
│ ├── index.ts — Express app entry, CORS (CLIENT_URL env),
│ │ mounts /api/interviews, /api/resume,
│ │ /api/dashboard, /health check route
│ ├── lib/
│ │ ├── prisma.ts — singleton PrismaClient (dev hot-reload safe)
│ │ ├── gemini.ts — shared @google/genai client, generateJSON()
│ │ │ helper with retry-on-503 and configurable
│ │ │ temperature, used by both interviews.ts and
│ │ │ resume.ts
│ │ └── supabase.ts — Supabase Storage client (service role key),
│ │ RESUME_BUCKET constant
│ ├── middleware/
│ │ ├── auth.ts — requireAuth: verifies Clerk Bearer token via
│ │ │ @clerk/backend verifyToken(), upserts local
│ │ │ User row, attaches req.userId
│ │ └── errorHandler.ts — centralized error responses
│ └── routes/
│ ├── interviews.ts — GET /, GET /:id, POST /,
│ │ PATCH /:id/questions/:qId, POST /:id/complete
│ │ — real Gemini question gen + evaluation
│ ├── resume.ts — GET / (current resume + fresh signed URL),
│ │ POST / (multer upload, pdf-parse extraction,
│ │ Gemini analysis, Supabase Storage upload,
│ │ old-file cleanup on replace)
│ └── dashboard.ts — GET / (live stats computed from Interview/
│ Resume tables)
├── .env — DATABASE_URL, DIRECT_URL, CLERK_SECRET_KEY,
│ CLIENT_URL, PORT, GEMINI_API_KEY,
│ SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
├── package.json — added over the project: multer, pdf-parse
│ (pinned @1.1.1), @google/genai,
│ @supabase/supabase-js
└── tsconfig.json — module: CommonJS, moduleResolution: Node
(NOT Node10 — caused a deprecation warning,
left as plain "Node" with no explicit
moduleResolution line, letting TS infer)
Frontend additions across sprints:
- client/.env.local: NEXT_PUBLIC_API_URL (points at live Render URL in prod), 
  Clerk keys, NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL, 
  NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL
- client/lib/interviews.ts, client/lib/resume.ts, client/lib/dashboard.ts — all 
  rewritten to the same authFetch(getToken) pattern, calling the real backend
- Interview/Resume/Dashboard page components all converted to client 
  components using useAuth() from @clerk/nextjs, threading getToken through
- New: client/components/home/AboutEleva.tsx (real product description 
  section, replacing a dead "Learn More" button)

## GOTCHAS HIT THIS PROJECT (important — will save time if they recur)

1. **Prisma 7 vs 6**: `npm install prisma @prisma/client` (no version pin) 
   installs Prisma 7, which is DAYS old and completely changed config — 
   requires driver adapters, a new prisma.config.ts, different PrismaClient 
   instantiation, schema.prisma can no longer contain `url`/`directUrl` in 
   the datasource block. We DELIBERATELY DOWNGRADED to Prisma 6 
   (`npm install prisma@6 @prisma/client@6`) for stability and because v7 
   adds unnecessary complexity for this timeline. ALWAYS use v6 syntax going 
   forward (url + directUrl directly in schema.prisma datasource block, plain 
   `new PrismaClient()`, no adapters).

2. **Express 4 + @types/express mismatch**: installing @types/express without 
   a version pin can pull v5-compatible types against an actual Express 4 
   runtime, causing req.params.X to type as `string | string[]` instead of 
   `string` (Express 5 types allow array params for wildcard routes, Express 4 
   doesn't have this). Fixed with `as string` casts at each req.params usage. 
   Worth pinning @types/express to a v4-compatible range if this recurs.

3. **tsconfig module/moduleResolution mismatch**: caused 38 cascading 
   "ECMAScript imports and exports cannot be written in a CommonJS file" 
   errors from ONE root config issue. Fixed tsconfig.json to: target ES2022, 
   module CommonJS, esModuleInterop true, no explicit moduleResolution line 
   (let TS default it) — avoids both the old "Node" deprecation warning and 
   the CommonJS/ESM clash.

4. **Postgres password URL-encoding**: our DB password contains `@`, which is 
   a reserved URL character (separates password from host in a connection 
   string). Had to URL-encode it as `%40` in DATABASE_URL/DIRECT_URL, or 
   Prisma misreads the connection string entirely.

5. **Clerk tokens expire fast (~60s)**: when manually testing auth via 
   browser DevTools (`await window.Clerk.session.getToken()`), the token 
   often expires before you finish pasting it into a fetch call. Always grab 
   a fresh token immediately before each manual test.

6. **Two servers must run simultaneously**: client (port 3000) and server 
   (port 4000) are separate processes needing separate terminals. Lost time 
   once when the server terminal got closed/crashed mid-session and only the 
   client was running — always verify BOTH terminals show their respective 
   "running on port X" message before testing.

7. **Next.js 16 async params**: dynamic route params 
   (app/.../[id]/page.tsx) are now a Promise, not a plain object — must be 
   `async function Page({ params }: { params: Promise<{ id: string }> })` 
   and `const { id } = await params`. Caused a silent bug earlier (redirected 
   back before showing content) — now fixed but worth remembering for any 
   NEW dynamic routes.

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

11. **pdf-parse v2.x is a totally different package**: `npm install 
    pdf-parse` with no version pin grabbed v2.4.5, a full rewrite that 
    bundles pdf.js internally and doesn't export a plain callable function 
    (`import pdfParse from "pdf-parse"` and `require("pdf-parse")` both 
    threw "is not a function"). Pin to `pdf-parse@1.1.1` for the classic 
    `pdf(buffer) → {text}` API our code expects.

12. **Google's Gemini Node SDK churn**: `@google/generative-ai` is now a 
    deprecated legacy package — use `@google/genai` instead 
    (`npm install @google/genai`), the API shape differs 
    (`ai.models.generateContent({model, contents, config})` vs the old 
    `getGenerativeModel().generateContent()`). Also, hardcoded model 
    names go stale fast — `gemini-2.5-flash` was deprecated mid-project. 
    Prefer `-latest` aliases (`gemini-flash-lite-latest`) over pinned 
    version names for exactly this reason. Free-tier flash models can 
    also hit sustained 503 "high demand" errors at peak times — the lite 
    tier and a retry-with-backoff (see gemini.ts) both help.

13. **Gemini repeats the same questions across sessions**: low temperature 
    (0.4) + an identical prompt for the same role/type combo produces 
    near-identical output every time it's called. Fixed by raising 
    temperature to 0.9 specifically for question generation (kept 0.4 for 
    resume analysis, which isn't called repeatedly with the same input in 
    one sitting) and appending a random "variation seed" string to the 
    prompt on every call. `generateJSON()` in lib/gemini.ts now takes an 
    optional `temperature` parameter for exactly this reason.

## DEPLOYMENT-SPECIFIC GOTCHAS

14. **Render: never manually set a `PORT` env var.** Render injects its 
    own automatically; a stray manual `PORT` value (accidentally pasted 
    into the wrong field) breaks port binding entirely — looked like a 
    silent hang/timeout in the deploy logs ("No open ports detected"), not 
    an obvious config error.

15. **Clerk's `forceRedirectUrl` prop is unreliable on `<SignUp>`/
    `<SignIn>` during multi-step flows** (known Clerk issue, especially 
    with email verification steps) — the component redirected to the 
    homepage instead of the intended destination even with the prop set. 
    Fix: use the environment variables 
    `NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL` / 
    `NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL` instead — Clerk's own 
    docs call this the more reliable path. Kept both the prop and the env 
    var in place; the env var is what actually fixed it.

16. **Vercel env var changes don't auto-redeploy** an existing deployment 
    — need a manual "Redeploy" from the Deployments tab, unless it's 
    bundled together with a new git push (which does trigger one anyway).

17. **Landing-page bugs only surfaced once tested as a stranger would.** 
    Dead nav anchors, unwired CTA buttons, and dashboard stats stuck on 
    mock data all existed for a long time without being caught, because 
    local dev testing always jumped straight to `/dashboard` rather than 
    clicking through the marketing page and sign-up flow like a first-time 
    visitor. Lesson for future projects: always smoke-test the FULL public 
    flow (fresh incognito, real click-through from the landing page) after 
    any deploy, not just the features actively being built that session.

## NOT YET SCOPED — deliberately deferred, discussed and agreed to wait
1. **MCQ-style questions** (e.g. 10 MCQs + a few subjective, in addition 
   to current fully-subjective format) — real scope addition, needs 
   schema changes (options/correct-answer fields on questions), a 
   different answer-input UI (radio buttons vs textarea), and a 
   deterministic MCQ grading path separate from the AI-evaluated subjective 
   path. Not a quick add. Agreed to revisit as v1.1, after placement 
   deadline pressure eases.
2. **Company-specific question banks** — will be supplied via a PDF later; 
   can't scope the schema/ingestion approach responsibly until that PDF's 
   actual structure (curated question list? problem set? behavioral 
   rounds?) is seen.

## PORTFOLIO / PRODUCTION HARDENING — discussed, not yet actioned
Raised when discussing resume/GitHub/LinkedIn readiness:
1. Audit git history for accidentally-committed secrets 
   (`.env` files, API keys) before treating the repo as fully public on 
   GitHub — if anything's in history, rotate those keys (Clerk, Gemini, 
   Supabase), don't just remove the file going forward.
2. Add a real README (what it does, stack, setup, live link, screenshot) 
   and a LICENSE (MIT suggested) — currently likely still has default 
   scaffold READMEs.
3. Clerk is on a DEVELOPMENT instance, not production — fine for low-
   volume resume-link traffic (a recruiter clicking through), not 
   appropriate for actively promoting the app for public sign-ups.
4. No privacy policy / terms page exists — a real gap once strangers start 
   uploading real resumes (real PII) with zero disclosure of data handling.
5. No rate limiting anywhere — the Gemini free tier has no protection 
   against being exhausted by real public traffic, and Render's free tier 
   cold-starts after 15min idle (rough first-impression delay for a 
   LinkedIn-post spike of visitors).
Recommendation given: fine to share as a resume/portfolio link as-is; hold 
off on an active public promotion push until at least items 3 and 4 are 
addressed.

## Timeline check
**Deploy target July 30, 2026: MET, with 9 days to spare.** v1.0 MVP is 
complete, deployed on Vercel + Render, and verified end-to-end in 
production via real UI testing. All remaining open items are either v1.1+ 
scope (deferred by explicit choice) or portfolio/production hardening 
(discussed, not yet started).