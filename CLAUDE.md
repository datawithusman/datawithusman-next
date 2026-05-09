# CLAUDE.md — datawithusman.com

## Project
Muhammad Usman's personal portfolio website. Dual audience: potential clients + tech recruiters.
Goal: feel premium, technically credible, founder-grade — not freelancer-level.

## Stack
- Next.js 14 (App Router)
- Tailwind CSS 3
- Framer Motion 11
- Lucide React (icons)
- Fonts: Syne (display) + DM Sans (body) + JetBrains Mono (code) via next/font/google

## Commands
```bash
npm run dev      # dev server → http://localhost:3000
npm run build    # production build
npm run lint     # ESLint
```

## Color System (CSS variables → tailwind.config.js)
| Token           | Value     | Usage                    |
|-----------------|-----------|--------------------------|
| `--bg`          | `#080C14` | Main background          |
| `--surface`     | `#0E1520` | Elevated sections        |
| `--card`        | `#0D1422` | Card backgrounds         |
| `--border`      | `#1E2D45` | Borders + dividers       |
| `--accent`      | `#4F8EF7` | Primary CTA + highlights |
| `--cyan`        | `#64FFDA` | Secondary accent         |
| `--text`        | `#E8EDF5` | Body text                |
| `--text-secondary` | `#8B97B0` | Secondary text        |
| `--text-muted`  | `#55647A` | Labels, metadata         |

## Design Rules (DO NOT BREAK)
- Aesthetic reference: vercel.com + linear.app — dark, tight, premium
- NO Inter font. NO purple gradients. NO generic AI patterns.
- Headings: Syne font, extrabold, tight tracking
- All scroll animations: Framer Motion `useInView` hook
- Section containers: `max-w-6xl mx-auto px-6 lg:px-8`
- Cards: dark bg + `border-border` border. No drop shadows by default.

## Content Files (ONLY edit these to add content)
- `data/projects.js` — portfolio projects array
- `data/posts.js`    — blog posts array

## Adding a New Project
Open `data/projects.js` and add to the array:
```js
{
  id: 'unique-id',
  title: 'Project Title',
  category: 'Business Solutions', // or 'AI & Engineering' / 'Research & Scale'
  problem: 'One-line problem description',
  result: 'Measurable impact / outcome',
  tools: ['Python', 'FastAPI'],
  slug: 'project-slug',
}
```

## Adding a New Blog Post
Open `data/posts.js` and add:
```js
{
  slug: 'post-slug',
  title: 'Post Title',
  excerpt: 'Two-line excerpt for the card.',
  category: 'Automation', // Automation | AI Engineering | Career | Data
  readTime: '5 min read',
  date: '2025-06-01',
  published: false, // flip to true when ready
  content: '',
}
```
Unpublished posts show as "Coming Soon" — they never 404.
