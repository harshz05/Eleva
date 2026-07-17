# Frontend Architecture

## Component Organization

components/

- home/
  - Hero
  - Statistics
  - Features

- layout/
  - Navbar
  - Footer

- ui/
  - Button
  - Card
  - Container
  - SectionHeading
  - Badge

---

## Design Principles

- Reusable UI components
- Component composition
- Data-driven rendering
- Separation of layout and presentation
- Shared design system
- Scalable folder organization

---

## Current Tech Stack

Frontend
- Next.js
- TypeScript
- Tailwind CSS

Version Control
- Git
- GitHub

## Constants Layer

Purpose

Separate static application data from presentation components.

Current Files

Current Files

```text
constants/
├── statistics.ts
├── testimonials.ts
├── pricing.ts
├── footerLinks.ts
└── navLinks.ts
```

Benefits

- Cleaner components
- Easier maintenance
- Simpler migration to backend APIs
- Better separation of concerns

---

# Recent Architecture Updates

## Pricing Architecture

Pricing information has been moved into:

```text
constants/pricing.ts
```

The Pricing component renders plans dynamically using `.map()`, making it easy to add, remove, or modify plans without changing component logic.

---

## Navigation Architecture

Navigation links are now stored in:

```text
constants/navLinks.ts
```

The Navbar renders navigation dynamically from the constants layer instead of hardcoded JSX.

Benefits:

- Centralized navigation
- Easier maintenance
- Scalable as more pages are added

---

## Footer Architecture

Footer navigation is stored in:

```text
constants/footerLinks.ts
```

This keeps presentation separated from application data and follows the same architecture used throughout the landing page.

---

## Interactive Components

Navbar has been converted into a **Client Component**.

Reason:

It uses React state (`useState`) for the responsive mobile navigation menu.

---

## Reusable Component Improvements

### Button

Enhanced with:

- Hover animations
- Active press animation
- Focus ring
- Improved transitions

---

### Card

Enhanced with:

- Explicit foreground color
- Improved transitions
- Better extensibility through `className`

---

## Landing Page Design Pattern

The landing page consistently follows the architecture:

```
Data
    ↓
Constants
    ↓
Reusable Components
    ↓
Rendered UI
```

This pattern allows future replacement of static constants with backend API responses while keeping the UI components unchanged.

## Authentication Flow

Landing Page
        │
        ▼
 Sign Up / Sign In (Clerk)
        │
        ▼
 Authentication
        │
        ▼
 Protected Dashboard
        │
        ├── Sidebar
        ├── Topbar
        └── Dashboard Content
---

## Dashboard Data Architecture

Dashboard stats now follow the same Data → Constants → Components pattern used on the landing page, extended with a typed data-access layer:

---

## Interview Module Data Architecture

Follows the same Data → Constants → lib (seam) → Components → UI pattern.

`lib/interviews.ts` currently backs an **in-memory session store** (not just 
static mock data) since Interviews require writes (create session, submit 
answer, complete). This is a temporary bridge — the store resets on reload — 
until the real Postgres/Prisma backend replaces it with zero component changes.

AI integration points are isolated and marked `TODO(v1.0-AI)`:
- Question generation (`createInterviewSession`)
- Answer evaluation + scoring (`completeInterview`)

---

## Dashboard Route Structure

All sidebar destinations now resolve to real pages under `app/dashboard/`:       

---

## Resume Module Data Architecture

Same seam pattern as Interviews. `lib/resume.ts` holds a single 
in-memory `currentResume` (not an array) — re-uploading replaces it 
rather than versioning, matching how users actually iterate on one 
resume. `TODO(v1.0-backend)` marks the file storage integration point; 
`TODO(v1.0-AI)` marks the real parsing/feedback integration point.

## Backend Architecture (Sprint 8)

`server/` is a separate Express + TypeScript service (not Next.js API 
routes), matching the original monorepo-style `client/` + `server/` 
split from Day 1. Structure:

```text
server/
├── prisma/schema.prisma
├── src/
│   ├── index.ts          — app entry, CORS, route mounting
│   ├── lib/prisma.ts      — singleton Prisma client
│   ├── middleware/
│   │   ├── auth.ts        — Clerk token verification, find-or-create User
│   │   └── errorHandler.ts
│   └── routes/
│       └── interviews.ts  — mirrors lib/interviews.ts seam shape
```

Auth flow: Next.js frontend sends the Clerk session token as a Bearer 
header; Express verifies it via `@clerk/backend`, and maps the Clerk 
user ID to a local `User` row (upsert on every request) so all other 
tables can foreign-key against a stable internal ID rather than Clerk's 
ID directly.

Hosted on Supabase Postgres — pooled connection (`DATABASE_URL`) for 
app runtime queries, direct connection (`DIRECT_URL`) for Prisma 
migrations, per Supabase's recommended Prisma setup.

---

## Backend Architecture (Confirmed Working)

server/ is a separate Express + TypeScript service on port 4000, Next.js 
client on port 3000, communicating via authenticated fetch calls.

Auth flow (verified end-to-end): Next.js client component calls 
`useAuth().getToken()` -> attaches as Bearer header -> Express 
`requireAuth` middleware verifies via `@clerk/backend` -> upserts local 
User row -> route handler runs with `req.userId` available.

Stack: Prisma 6 (pinned — v7 requires driver adapters, deferred until 
after MVP ships) + Supabase Postgres (Mumbai region, pooled connection 
for runtime, direct connection for migrations).
## Resume Module Backend (Sprint 9)

Same pattern as the Interview module: `client/lib/resume.ts` is the seam, 
swapped from an in-memory store to real `authFetch` calls with zero 
changes to `ResumeAnalysisView.tsx` (the presentation layer never knew 
the data source changed).

One divergence worth noting: the backend response shape is flat 
(`atsScore`, `summary`, `suggestions` at top level, matching the Prisma 
model) while the client `Resume` type nests these under `.analysis` 
(matching how the UI was already built against the mock). Rather than 
change the UI or the schema to match each other, `lib/resume.ts` maps 
between them — this is deliberately what the seam is for.

`Resume` is modeled as a true 1:1 with `User` (`userId @unique`) rather 
than 1:many, matching the existing "re-upload replaces" UX rather than 
resume versioning. Upload does `deleteMany` + `create` rather than 
`update`, since Prisma's `upsert` doesn't cleanly support replacing a 
nested relation (`suggestions`) in one call — old suggestions cascade-delete 
via the schema's `onDelete: Cascade`.

File storage remains out of scope: `server/src/routes/resume.ts` uses 
`multer` with in-memory storage purely to accept the multipart upload; 
`req.file.buffer` is never persisted. `fileUrl` stays `null` until 
`TODO(v1.0-backend)` real storage (S3/Cloudinary) is wired. ATS scoring 
and suggestions remain `TODO(v1.0-AI)` mocked server-side, same 
isolation pattern as the Interview module's question bank / scoring.

## Real AI Integration (Sprint 10)

`server/src/lib/gemini.ts` is a shared client wrapping `@google/genai` 
(the current SDK — the older `@google/generative-ai` package is deprecated 
and was swapped out mid-sprint after hitting persistent 503s tied to its 
legacy endpoint). `generateJSON(prompt)` is the single entry point both 
routes use: it calls Gemini with JSON response mode, retries up to 2 extra 
times specifically on transient 503/overloaded errors (not on malformed 
output — that fails fast, correctly), and returns the raw text for the 
caller to parse and shape-validate.

Model used: `gemini-flash-lite-latest`. The heavier `gemini-flash-latest` 
hit sustained free-tier demand overload during dev; the lite tier proved 
reliably available. Using the `-latest` alias rather than a pinned version 
is deliberate — a hardcoded model name (`gemini-2.5-flash`) broke mid-sprint 
when Google deprecated that generation entirely, so the alias trades a 
little version predictability for not breaking again the same way.

Both `resume.ts` and `interviews.ts` follow the same pattern: build a 
prompt demanding a specific JSON shape, call `generateJSON`, `JSON.parse` 
the result, then manually shape-validate every field before trusting it 
(AI output is treated as untrusted input, same as any external API). A 
validation failure or a JSON parse failure both throw and surface as a 
502 to the client — this is a new failure mode the app didn't have before 
(a working HTTP round-trip that still fails because the AI's output was 
malformed), distinct from normal HTTP/DB errors.

Interview evaluation only calls the AI for questions the candidate 
actually answered — unanswered questions get a static "No answer 
submitted." locally, same as the old mock, without spending an API call 
on nothing.

No client-side changes were needed for either module — response shapes 
are identical to the mocked versions, so `lib/interviews.ts` and 
`lib/resume.ts` didn't change at all. This is the seam pattern paying off 
exactly as intended.