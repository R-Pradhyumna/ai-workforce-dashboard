# 🧠 AI Workforce Dashboard

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=nextdotjs)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![Supabase](https://img.shields.io/badge/Supabase-Auth_&_Postgres-3ECF8E?logo=supabase)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38B2AC?logo=tailwindcss)
![TanStack Table](https://img.shields.io/badge/TanStack_Table-v8-FF4154)
![Recharts](https://img.shields.io/badge/Recharts-Data_Visualization-8884d8)
![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?logo=vercel)

A production-grade, authenticated analytics dashboard for monitoring AI token usage, operational cost, and workforce insights.

Built with **Next.js 16 App Router**, **Supabase**, **Recharts**, and **TanStack Table**.

---

## Live Demo

> https://ai-workforce-dashboard.vercel.app/

---

## Features

- Supabase email/password authentication
- Middleware-protected dashboard routes
- KPI analytics with time-range filtering (7D / 30D / 90D / 1Y)
- Interactive charts (Trend, Category, Ranking)
- Server-side paginated & sortable data table
- Dark mode support
- Suspense-based streaming + optimized middleware

---

## Architecture

Middleware → Cookie-based route guard
Layout → Server-side user validation
Page → Suspense streaming
Wrappers → Server-side data fetching
UI → Client interactivity

---

## Database Setup (Required)

This project depends on seeded data.

1. Create a Supabase project
2. Open **SQL Editor**
3. Run `seed_data.sql`

This will:

- Create schema
- Insert 200+ realistic records
- Populate time-series analytics

---

## Local Development

```bash
git clone https://github.com/R-Pradhyumna/ai-workforce-dashboard.git
cd ai-workforce-dashboard
pnpm install
pnpm dev
```

## Environment Variables

Create .env.local:

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

## Production Build

pnpm build
pnpm start

## Security

JWT session-based authentication

Server-side validation

No sensitive keys exposed

Middleware route protection

## Author

R Pradhyumna
GitHub: https://github.com/R-Pradhyumna

LinkedIn: https://www.linkedin.com/in/pradhyumna-r/

Built as part of an internship assignment.
