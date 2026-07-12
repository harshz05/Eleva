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