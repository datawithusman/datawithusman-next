# Data with Usman — Portfolio Website

A modern, dark-themed portfolio website built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**. Designed for speed, SEO, and scalability.

## 🚀 Live Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 14 (App Router, SSG) |
| Language | TypeScript |
| Styling | Tailwind CSS + CSS Variables |
| Animation | Framer Motion |
| Icons | Lucide React |
| Fonts | Syne, DM Sans, JetBrains Mono (via `next/font`) |
| Forms | FormSubmit.co |
| Hosting | Netlify |

## 📁 Project Structure

```
app/
  layout.tsx          # Root layout, metadata, fonts
  page.tsx            # Homepage
  globals.css         # Global styles & Tailwind
  blog/
    page.tsx          # Blog listing page
    [slug]/page.tsx   # Individual blog post (SSG)

components/
  Navbar.tsx          # Responsive navigation with mobile drawer
  Hero.tsx            # Animated hero with typewriter terminal
  About.tsx           # About section with profile image
  Skills.tsx          # Skills grid with category tabs
  Projects.tsx        # Portfolio projects showcase
  Services.tsx        # Services offered
  BlogPreview.tsx     # Blog preview cards
  Contact.tsx         # Contact form (FormSubmit.co integration)
  Footer.tsx          # Site footer with nav links

data/
  posts.js            # Blog post data
  projects.js         # Project showcase data

public/
  images/             # Static assets (profile.jpeg)
```

## 🛠️ Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## ✨ Features

- **Static Site Generation** — All pages pre-rendered for instant loading
- **Responsive Design** — Mobile-first with adaptive layouts
- **Smooth Animations** — Framer Motion scroll-triggered effects
- **Working Contact Form** — Sends emails via FormSubmit.co
- **Blog System** — Ready for content (currently showing "Coming Soon" placeholders)
- **SEO Optimized** — Open Graph, Twitter cards, structured metadata
- **Dark Theme** — Professional dark color palette with accent colors

## 📝 Adding Blog Posts

Edit `data/posts.js`:

```js
{
  slug: 'my-new-post',
  title: 'Post Title',
  excerpt: 'A short preview...',
  category: 'Automation',  // or 'AI Engineering', 'Career', 'Data'
  readTime: '5 min read',
  date: 'May 2026',
  published: true,          // flip to true when ready
  content: '<p>HTML content here...</p>',
}
```

## 📝 Adding Projects

Edit `data/projects.js`:

```js
{
  id: 'project-slug',
  category: 'Business Solutions',  // or 'AI & Engineering', 'Research & Scale'
  tools: ['Python', 'Pandas'],
  title: 'Project Title',
  problem: 'What problem was solved',
  result: 'What outcome was achieved',
  slug: 'project-slug',
  featured: true,
}
```

## 🚢 Deployment

Configured for **Netlify** via `netlify.toml`. Push to GitHub and connect the repo in Netlify — builds are automatic.

## 📄 License

MIT