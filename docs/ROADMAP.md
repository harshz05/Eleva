# Eleva Roadmap

## Vision

Build a startup-quality AI-powered placement preparation platform that helps students practice technical interviews, receive AI-driven feedback, and track their progress.

---

# Phase 1 — Foundation ✅

- [x] Project Initialization
- [x] Git Repository Setup
- [x] GitHub Integration
- [x] Next.js Setup
- [x] TypeScript
- [x] Tailwind CSS
- [x] App Router Configuration
- [x] Initial Project Structure

---

# Phase 2 — Landing Page ✅

## Completed

- [x] Responsive Navbar
- [x] Mobile Navigation Menu
- [x] Hero Section
- [x] Features Section
- [x] Statistics Section
- [x] Testimonials Section
- [x] Pricing Section
- [x] Footer Redesign
- [x] Reusable UI Design System
- [x] Hero Badge
- [x] Gradient Hero Heading
- [x] Lucide React Icons
- [x] Responsive Layout Improvements
- [x] Reusable Constants Architecture
- [x] Smooth Scrolling
- [x] Hover Animations
- [x] Landing Page Polish

---

# Phase 3 — Authentication ✅

- [x] Clerk Authentication
- [x] Login
- [x] Signup
- [x] Protected Routes
- [x] User Profile
- [x] Install Clerk
- [x] Configure Environment Variables
- [x] Add Clerk Provider
- [x] Create Authentication Pages
- [x] Protect Dashboard Routes
- [x] Dashboard Shell

---

# Phase 4 — Dashboard ✅

- [x] Dashboard Layout
- [x] Sidebar Navigation
- [x] Interview History
- [x] Progress Dashboard (basic stats)
- [x] User Settings (stubbed, Coming Soon)
- [x] User Profile
- [x] Real Statistics
- [x] Resume Analysis
- [ ] DSA Tracker (deferred v1.1)

---

# Phase 5 — AI Interview Engine ✅

- [x] Resume Upload
- [x] Resume Parsing
- [x] AI Question Generation
- [x] AI Mock Interview (text-based)
- [x] AI Feedback
- [x] Interview Reports

---

# Phase 6 — Voice & Analytics (deferred indefinitely, not in v1.0)

- [ ] Voice-based Interviews
- [ ] Confidence Detection
- [ ] Weak Topic Analysis
- [ ] Personalized Recommendations

---

# Phase 7 — Backend ✅

- [x] Express Server
- [x] PostgreSQL (Supabase)
- [x] Prisma ORM
- [x] Database Models (Interview + Resume)
- [x] API Routes (Interview + Resume)

---

# Phase 8 — Deployment

- [ ] Vercel Deployment
- [ ] Production Environment Variables
- [ ] Custom Domain
- [ ] Portfolio Integration

---

# Version 1.0 — Placement MVP (Revised Scope, target: July 30, 2026)

## In Scope
- [x] Auth (Clerk) + protected routes
- [x] Dashboard (stats, profile, nav)
- [x] Interview module — text-based only (question gen, answer, AI eval, history) — backend live, AI mocked
- [x] Resume Analyzer — upload, parse, AI feedback, basic ATS suggestions — backend live, AI mocked
- [x] Backend — Express + Prisma + PostgreSQL, real auth-linked data (both modules)
- [x] Real AI integration (Interview + Resume) — next sprint
- [ ] Deployment — Vercel, env config, production build

## Deferred to v1.1+ (Coming Soon badge in v1.0)
- [ ] DSA Tracker
- [ ] Voice / webcam interviews
- [ ] Speech-to-text, confidence/emotion detection
- [ ] Advanced AI analytics, personalized coaching
- [ ] Notifications, email reminders

# Version 1.0 — Placement MVP — ✅ SHIPPED (deployed before July 30, 2026 target)

## In Scope — all complete
- [x] Auth (Clerk) + protected routes, correct post-auth redirect
- [x] Dashboard — real stats from live data, not mocked
- [x] Interview module — real AI question gen (varied per session) + evaluation
- [x] Resume Analyzer — real AI parsing + ATS feedback + real file storage
- [x] Backend — Express + Prisma + PostgreSQL
- [x] Real AI integration (Gemini, both modules)
- [x] Deployment — Vercel (client) + Render (server), live and verified

## Deferred to v1.1+
- [ ] DSA Tracker
- [ ] Voice / webcam interviews
- [ ] MCQ-style interview questions (discussed, agreed to defer)
- [ ] Company-specific question banks (pending PDF from Harsh)
- [ ] Speech-to-text, confidence/emotion detection
- [ ] Advanced AI analytics, personalized coaching
- [ ] Notifications, email reminders

## Portfolio/production hardening — not yet done, discussed
- [ ] Audit git history for accidentally-committed secrets before treating 
      repo as fully public; rotate any exposed keys
- [ ] Real README + LICENSE for GitHub presentation
- [ ] Clerk production instance (currently dev instance — fine for low-
      volume resume-link traffic, not for public promotion)
- [ ] Privacy policy / terms page before accepting real public sign-ups
- [ ] Rate limiting (Gemini free-tier quota has no protection currently)