# Eleva

AI-powered placement preparation platform — practice mock interviews, get AI-driven feedback, and get your resume ATS-reviewed, all in one place.

**Live:** https://eleva-three.vercel.app

## What it does

- **AI Mock Interviews** — pick a role, company, and interview type; get AI-generated questions, answer them, and receive instant AI-scored feedback.
- **Resume Analyzer** — upload a PDF resume, get an ATS compatibility score and specific, actionable improvement suggestions.
- Dashboard tracking your interview history and resume score.

## Tech Stack

**Frontend:** Next.js 16, TypeScript, Tailwind CSS, Clerk (auth), deployed on Vercel
**Backend:** Express, TypeScript, deployed on Render
**Database:** PostgreSQL via Prisma ORM (Supabase)
**AI:** Google Gemini (`@google/genai`)
**File Storage:** Supabase Storage

## Architecture

Data → Constants → lib/ (data-access seam) → Components → UI

The `lib/` layer is the only place that knows whether data comes from the real backend or (during earlier development) a mock store — this let the entire mock-to-real-backend migration happen without touching a single UI component.

## Local Setup

```bash
# Client
cd client
npm install
npm run dev

# Server (separate terminal)
cd server
npm install
npx prisma generate
npm run dev
```

Both need their own `.env`/`.env.local` — see `.env.example` in each folder for required variables (Clerk keys, database URL, Gemini API key, Supabase credentials).

## License

MIT — see [LICENSE](./LICENSE).