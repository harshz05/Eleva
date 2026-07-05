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