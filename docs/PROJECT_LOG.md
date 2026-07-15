# Development Log

## Day 1 (29 June 2026)

### Objective

Set up the Eleva project and establish a scalable frontend architecture.

### Completed

* Created Eleva project repository
* Initialized Git and configured `main` branch
* Created monorepo-style structure:

  * `client/`
  * `server/`
  * `docs/`
* Bootstrapped Next.js project with:

  * TypeScript
  * Tailwind CSS
  * ESLint
  * App Router
* Learned the basic React component architecture
* Replaced the default Next.js landing page
* Created reusable components:

  * Navbar
  * Hero
  * Features
  * Footer
* Organized components into:

  * `components/layout`
  * `components/home`
* Added responsive feature cards
* Added smooth navigation to the Features section
* Established Git commit workflow

---

## Git History

* Initialize Eleva with Next.js and project structure
* Build landing page architecture and reusable components

---

## Concepts Learned

* React Components
* JSX
* Component Composition
* Tailwind Utility Classes
* Responsive Design
* Project Folder Architecture
* Git Workflow

---

## Next Session

* Create reusable UI components
* Improve landing page design
* Build modern SaaS hero section
* Improve typography and spacing

# PROJECT LOG

## Sprint 2 — UI Design System & Landing Page Refactor

### Date
July 1, 2026

### Objectives
- Build a reusable UI component library.
- Refactor the landing page to use reusable components.
- Improve maintainability and scalability.
- Push the latest progress to GitHub.

### Completed

#### UI Components
- Created reusable `Container` component.
- Created reusable `Button` component with:
  - Variants
  - Prop forwarding
  - Native button attribute support
- Created reusable `Card` component.
- Created reusable `SectionHeading` component.
- Added reusable `Badge` component.

#### Landing Page
- Refactored Hero section.
- Refactored Features section using reusable cards.
- Added Statistics section.
- Replaced repeated Tailwind classes with reusable components.

#### React Concepts Learned
- Component composition
- `children`
- `React.ReactNode`
- Interface extension
- Rest props (`...props`)
- Prop forwarding
- Conditional rendering
- Data-driven UI using arrays
- Rendering lists using `.map()`
- Object destructuring

#### Git
- Created meaningful milestone commit.
- Connected local repository to GitHub.
- Successfully pushed the project to GitHub.

### Result

Eleva now has the foundation of a reusable design system that will support future frontend development.

## Sprint 3 — Landing Page Polish & Data Architecture

### Completed

- Added Testimonials section.
- Integrated Lucide React icons.
- Implemented reusable Badge component.
- Enhanced Hero section with premium styling.
- Improved Statistics section with reusable Card component.
- Extended Card component to support custom className.
- Introduced constants folder to separate UI from data.
- Improved responsive layout.
- Fixed project dependency structure.
- Connected GitHub remote and established push workflow.

### Engineering Concepts Learned

- Component extensibility
- Separation of Concerns
- Design System evolution
- External icon libraries
- Project dependency management

# Sprint 4 — Landing Page Completion

## Features Completed

- Implemented Pricing section.
- Added reusable pricing data in `constants/pricing.ts`.
- Redesigned Footer with multiple sections:
  - Brand
  - Quick Links
  - Resources
  - Social Links
- Added reusable footer data in `constants/footerLinks.ts`.
- Built a fully responsive Navbar.
- Added mobile navigation with hamburger menu.
- Implemented smooth scrolling for section navigation.
- Added hover animations and micro-interactions across the landing page.
- Improved reusable Button component with:
  - hover animations
  - active state
  - focus ring
  - smoother transitions
- Improved reusable Card component with better transition behavior and explicit text colors.

---

## React Concepts Learned

- Client Components (`"use client"`)
- `useState`
- Event Handling (`onClick`)
- Conditional Rendering
- Responsive UI using Tailwind breakpoints
- State-driven UI updates

---

## UI/UX Improvements

- Better CTA buttons
- Interactive cards
- Sticky navigation
- Responsive mobile experience
- Improved spacing and layout consistency
- Smooth scrolling navigation

---

## Git

Completed first major feature milestone:
**Responsive Landing Page MVP**

---

# Sprint 3 — Authentication & Dashboard Foundation

Date: July 2026

## Completed

### Authentication

- Integrated Clerk Authentication.
- Added ClerkProvider to Root Layout.
- Created `.env.local` with Clerk Publishable and Secret Keys.
- Added authentication middleware/proxy.
- Created Sign In page.
- Created Sign Up page.
- Added protected Dashboard route.

### Landing Page

- Connected "Get Started" CTA to authentication flow.
- Navbar button now redirects users to Sign Up.

### Dashboard

Created initial dashboard layout consisting of:

- Sidebar
- Topbar
- Dashboard Content Area

Current dashboard sections:

- Mock Interviews
- Resume Score
- DSA Progress
- Achievements

### UI

Created reusable dashboard components.

Current folder structure:

client/
├── app/dashboard
├── components/dashboard
│ ├── Sidebar.tsx
│ ├── Topbar.tsx
│ ├── DashboardContent.tsx
│ └── DashboardCard.tsx

### Status

Authentication is fully functional.

Users can:

- Sign Up
- Verify email
- Sign In
- Access protected dashboard

Dashboard currently displays placeholder statistics.

Next sprint will focus on making the dashboard interactive.

---

# Sprint 5 — Dashboard Data Architecture

Date: July 2026

## Objective

Replace static placeholder dashboard cards with a typed, data-driven rendering pipeline that's ready to swap mock data for a real backend later with zero component changes.

## Completed

- Created `types/dashboard.ts` — `DashboardStat`, `DashboardActivity`, `DashboardData` interfaces.
- Created `constants/dashboardData.ts` — mock data implementing those types.
- Created `lib/dashboard.ts` — `getDashboardStats()`, the single data-access seam for the dashboard.
- Refactored `DashboardCard.tsx` to accept `label`/`icon name`/`trend` instead of hardcoded `title`/JSX icon.
- Refactored `app/dashboard/page.tsx` into a Server Component that awaits `getDashboardStats()` and renders cards via `.map()`.

## Engineering Concepts Learned

- Data-access layer pattern (seam between UI and data source)
- Server Components fetching data directly with `await`, no `useEffect`
- Icon-name-to-component mapping for JSX-free data files
- Designing types before implementation ("types first")

## Status

Dashboard now renders 4 stat cards from a typed mock data layer. Sidebar links to `/dashboard/interviews`, `/dashboard/resume`, `/dashboard/dsa`, `/dashboard/analytics`, `/dashboard/settings` still 404 — next sprint session will add stub routes and the User Profile page.

---

# Sprint 5 (continued) — Routing & User Profile

## Completed

- Created `ComingSoon` reusable placeholder component.
- Added stub pages for all sidebar routes: `/dashboard/interviews`, `/dashboard/resume`, `/dashboard/dsa`, `/dashboard/analytics`, `/dashboard/settings` — no more 404s from the sidebar.
- Added `/dashboard/profile` using Clerk's `<UserProfile />` for full account management.
- Updated `Sidebar.tsx` to include the Profile link.

## Engineering Concepts Learned

- Parameterized placeholder components to avoid duplicated JSX across stub routes
- When to use a library's built-in UI vs. building your own (security-sensitive surfaces)
- Next.js file-based routing — folder name must exactly match the `href` path

## Status

Sprint 5 complete. Dashboard now has: dynamic data-driven stat cards, a fully working sidebar with no dead links, and a real Profile page. All remaining dashboard sections (Interviews, Resume, DSA, Analytics, Settings) are stubbed and ready for their own dedicated sprints per the roadmap.

---

# Sprint 6 — Mock Interview Module (Text-Based, MVP)

Date: July 12, 2026

## Strategy Shift

Pivoted to MVP-first development. Priority is a deployed, placement-ready v1.0 
over full feature completeness. Target deploy date: **July 30, 2026**. 
DSA Tracker deferred to v1.1 (post-launch) — will ship as "Coming Soon" 
badge in v1.0 nav.

## Objective

Build a complete, clickable Interview module end-to-end on mock data, 
with AI integration points clearly isolated for later wiring — no voice/webcam, 
text-only per revised MVP scope.

## Completed

- Extended `types/interview.ts` — `InterviewSession`, `InterviewQuestion`, 
  `InterviewType`, `InterviewStatus`, `NewInterviewInput`.
- Built mock question bank in `constants/interviewData.ts` (`generateMockQuestions`).
- Extended `lib/interviews.ts` seam with in-memory session store: 
  `getInterviewSessions`, `getInterviewSession`, `createInterviewSession`, 
  `submitAnswer`, `completeInterview`.
- Built `StartInterviewForm`, `InterviewHistoryCard`, `InterviewsPageClient`.
- Built `InterviewSessionClient` — question-by-question answer flow.
- Built `InterviewResults` — score + per-question feedback view.
- Wired dynamic route `app/dashboard/interviews/[id]/page.tsx`.
- Marked two seam points with `TODO(v1.0-AI)` for real OpenAI integration:
  question generation and answer evaluation/scoring.

## Engineering Concepts Learned

- Dynamic routing (`[id]` segments) in App Router
- Designing a mock seam that mirrors the shape of a future async AI call
- Client-side in-memory store as a bridge before real backend/DB exists
- Marking integration points explicitly (`TODO(v1.0-AI)`) for clean future handoff

## Status

Interview module is functionally complete on mock data: start → answer → 
score → results → history. Next: Resume Analyzer frontend shell (same 
pattern), per revised MVP roadmap.

---

# Sprint 7 — Resume Analyzer (Frontend Shell)

Date: July 2026

## Objective

Build a complete Resume Analyzer UI on mock data, following the same 
Data → Constants → lib (seam) → Components → UI pattern as Interviews, 
with AI/backend integration points isolated for later wiring.

## Completed

- Created `types/resume.ts` — `Resume`, `ResumeAnalysis`, `ResumeSuggestion`.
- Created `constants/resumeData.ts` — mock AI analysis output (summary, 
  ATS score, categorized suggestions).
- Created `lib/resume.ts` — in-memory seam: `getCurrentResume`, `uploadResume` 
  (single current resume, re-upload replaces it — no versioning for MVP).
- Built `ResumeUpload` — drag-and-drop + file picker, PDF-only validation, 
  simulated processing delay.
- Built `ResumeAnalysisView` — ATS score, summary, categorized suggestion cards.
- Built `ResumePageClient` — ties upload + analysis view together.
- Wired `app/dashboard/resume/page.tsx`.
- Marked two integration points: `TODO(v1.0-backend)` (real file storage) 
  and `TODO(v1.0-AI)` (real PDF parsing + AI feedback).

## Verification Pass

Audited existing stub routes before starting new work — confirmed 
`app/dashboard/dsa/page.tsx`, `app/dashboard/analytics/page.tsx`, and 
`app/dashboard/settings/page.tsx` were already correctly wired to the 
`ComingSoon` component from earlier stub work (Sprint 5). No new work 
needed; sidebar links match route folders exactly. Confirms DSA Tracker 
is already in its intended v1.0 "Coming Soon" state per the MVP scope pivot.

## Bugs Found & Fixed (post-integration testing)

1. **Stale TS server** — VS Code's TypeScript language service cached the 
   module graph from before `types/` files existed, throwing false 
   "cannot find module" errors even though files were correctly created. 
   Fixed via "TypeScript: Restart TS Server."
2. **Interview page never wired** — `app/dashboard/interviews/page.tsx` 
   still pointed at the old `ComingSoon` stub instead of the new 
   `InterviewsPageClient`. Overwritten with the correct import.
3. **Next.js 16 async `params` bug** — `app/dashboard/interviews/[id]/page.tsx` 
   destructured `params` synchronously, but Next.js 16 makes dynamic route 
   `params` a `Promise`. This meant `sessionId` was an unresolved Promise 
   object, not a string, so `getInterviewSession()` never found a match and 
   silently redirected back to the interview list before any question 
   appeared. Fixed by making the page `async` and `await`-ing `params`.

## Status

Resume Analyzer is functionally complete on mock data. Interview module 
confirmed fully working end-to-end after bug fixes above (start → answer 
→ score → results → history). Both modules ready for backend wiring.

---

# Sprint 8 — Backend Foundation (In Progress)

Date: July 2026

## Strategy Context

Per the MVP scope pivot (see Roadmap v1.0 section), this sprint builds 
the real backend that Interviews and Resume's mock `lib/` seams will 
swap into. Chose **Supabase** for hosted Postgres and a **separate 
Express server** (not Next.js API routes) to match the original 
architecture plan and resume/portfolio positioning (Express.js + 
PostgreSQL + Prisma ORM as distinct, demonstrable backend skills).

## Completed So Far

- Drafted `server/` scaffold: Express + TypeScript + Prisma, `tsx` for 
  dev hot-reload.
- Designed Prisma schema: `User`, `InterviewSession`, `InterviewQuestion`, 
  `Resume`, `ResumeSuggestion`, and `DsaProblem` (schema defined now for 
  v1.1, even though the feature itself stays "Coming Soon" in v1.0 — 
  costs nothing to model today, avoids a future migration).
- Built `middleware/auth.ts` — verifies Clerk session tokens sent from 
  the Next.js frontend, find-or-creates a local `User` row keyed by 
  Clerk's user ID.
- Built `middleware/errorHandler.ts` — centralized error responses.
- Built full `routes/interviews.ts` — list, get one, create (mock 
  question bank server-side), submit answer, complete + score. Mirrors 
  the exact function shape of the frontend's `lib/interviews.ts` seam.
- Built `src/index.ts` — Express app entry, CORS scoped to the Next.js 
  client origin.

## Open Items / Blocked On

- Supabase project not yet created — need pooled + direct connection 
  strings before running the first Prisma migration.
- Need to confirm `CLERK_SECRET_KEY` is available server-side (should 
  match the client's Clerk key).
- Flagged uncertainty: Clerk JWT payload may not include `email` by 
  default — may need `@clerk/backend`'s `getUser()` call instead of 
  relying on token claims. To be verified once auth is tested live.
- Resume routes (`routes/resume.ts`) not yet built — planned as the 
  next piece once Interviews routes are verified working against a 
  real DB.

## Status

Backend code is written and ready to run, pending Supabase credentials.

---

# Sprint 8 — Backend Foundation (Complete)

Date: July 2026

## Objective
Stand up a real backend (Express + Prisma + Supabase Postgres) and wire 
the Interview module to it end-to-end, replacing the mock in-memory seam.

## Completed
- Supabase Postgres project created (region: Mumbai/ap-south-1).
- server/ scaffolded: Express + TypeScript, tsx for dev.
- Prisma schema: User, InterviewSession, InterviewQuestion. First 
  migration applied successfully to live DB.
- middleware/auth.ts — verifies Clerk session tokens, upserts local 
  User row keyed by Clerk ID.
- middleware/errorHandler.ts — centralized error responses.
- routes/interviews.ts — full CRUD (list, get, create w/ mock question 
  bank, submit answer, complete + score).
- Frontend lib/interviews.ts rewritten to call real API with 
  Clerk-authenticated fetch (getToken from useAuth()) instead of mock store.
- InterviewsPageClient and InterviewSessionClient updated accordingly.

## Bugs Fixed
- Prisma 7 (installed by default via `npm install prisma`) changed config 
  format entirely (driver adapters, prisma.config.ts). Downgraded to 
  Prisma 6 for stability and simpler setup given project timeline.
- tsconfig.json module resolution mismatch caused 38 cascading TS errors 
  (CommonJS vs ESM). Fixed by aligning module/moduleResolution settings.
- Express 4 vs @types/express v5 mismatch caused route param type errors 
  (string | string[] vs string) — resolved with explicit type casts.
- Missing CLIENT_URL env var broke CORS — added to server/.env.
- Verified full auth chain manually via browser DevTools: pulled a live 
  Clerk token via `window.Clerk.session.getToken()`, called the Express 
  API directly, confirmed real database round-trip before wiring the UI.

## Status
Interview module now runs fully on real infrastructure: Next.js -> 
Clerk auth -> Express -> Prisma -> Supabase Postgres. Verified end-to-end 
through the actual UI, not just API testing. Resume routes are next 
(same pattern, new short sprint).