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

constants/
├── statistics.ts
└── testimonials.ts

Benefits

- Cleaner components
- Easier maintenance
- Simpler migration to backend APIs
- Better separation of concerns