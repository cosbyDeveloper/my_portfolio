# Personal Portfolio Website

A modern, full-stack personal portfolio built with **Next.js 16 (App Router)**, **Tailwind CSS 4**, **TypeScript**, and **MongoDB**. Designed with a strong focus on layout architecture, component reusability, future extensibility, and a built-in admin CMS.

---

## Tech Stack

- **Next.js 16** (App Router, Server & Client Components)
- **React 19**
- **Tailwind CSS 4** (Design-system driven with custom tokens)
- **TypeScript 5**
- **MongoDB + Mongoose** (Database + ODM)
- **NextAuth-compatible JWT Auth** (HTTP-only cookies)
- **Framer Motion** (Animations)
- **next-themes** (Dark/light mode)
- **react-icons** (Icon library)

---

## Key Features

### Public Pages

- **Home** — Hero, skills cloud (categorized), experience/education timeline, featured projects, featured blogs, FAQ accordion, contact form
- **About** — Hero section, current focus, education, expertise, philosophy, CTA
- **Portfolio** — Project grid with category filtering, pagination, featured projects
- **Blog** — Blog listing with tag filtering, pagination, rich content rendering, auto-generated table of contents
- **Resume** — Professional summary, skills, experience, education, certifications
- **FAQ** — Searchable FAQ page
- **Contact** — Services offered, GetInTouch form with spam protection, process timeline
- **Research** — Placeholder page (foundation ready)

### Admin Panel (Protected)

- **Login** — JWT-based authentication with HTTP-only cookies
- **Dashboard** — Stats overview (projects, blogs, messages)
- **Projects CRUD** — Create, edit, delete portfolio projects
- **Blogs CRUD** — Create, edit, delete blog posts with rich text editor
- **Messages** — View and manage contact form submissions

### UX / UI

- Dark/light theme toggle with system preference detection
- Responsive mobile-first design
- Smooth animations with Framer Motion
- Image lightbox for project screenshots
- Pagination for blog and portfolio listings
- SEO metadata on all pages
- Accessible contact form with honeypot + timing-based spam detection

---

## Project Structure

```
app/
  page.tsx               # Home page
  about/                 # About page
  contact/               # Contact page
  faq/                   # FAQ page
  blog/                  # Blog listing + post detail
  portfolio/             # Portfolio listing + project detail
  resume/                # Resume page
  research/              # Research placeholder
  admin/                 # Protected admin panel (login, dashboard, CRUD)
  api/                   # Backend API routes (auth, projects, blogs, messages)
  layout.tsx             # Root layout with theme provider
  globals.css            # Tailwind + custom design tokens

components/
  home/                  # Hero, Skills, ExperienceEducation, FAQ, FeaturedProjects, FeaturedBlogs, GetInTouch
  blog/                  # Blog listing, cards, details, editor, TOC
  portfolio/             # Portfolio listing, cards, details, editor, ComplexityStars
  layout/                # AppShell, Header, Footer, ScrollHandler
  ui/                    # ThemeToggler, Card, Pagination, Lightbox
  shared/                # Shared reusable components
  admin/                 # Admin sidebar, navigation
  dashboard/             # Admin dashboard UI

lib/
  auth/                  # JWT helpers, server auth, middleware
  db/                    # Mongoose connection
  models/                # Mongoose schemas (User, Project, Blog, Message)
  data/                  # Server-side data fetching
  hooks/                 # useNavigation, useScrollSpy, useFiltering
  spam-detector.ts       # Contact form spam protection
  types.ts               # Unified type definitions

constants/               # Static data (home, about, resume, projects, blogs, research)

scripts/
  seed.sh                # Seeds initial admin user

styles/
  globals.css            # Tailwind v4 + custom design tokens
  blog.css               # Blog-specific styles
```

---

## Database Models

| Model    | Purpose                                                    |
|----------|------------------------------------------------------------|
| User     | Admin authentication (email, hashed password, role, status) |
| Project  | Portfolio projects (slug, title, category, stack, images, URLs, status, complexity) |
| Blog     | Blog posts (slug, title, content, tags, author, readTime, published, SEO) |
| Message  | Contact form submissions (name, email, subject, read status) |

---

## Local Development

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)

### Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set environment variables** in `.env.local`:
   ```
   MONGODB_URI=your-mongodb-uri
   JWT_SECRET=your-jwt-secret
   NEXT_PUBLIC_API_URL=http://localhost:3000
   ADMIN_EMAIL=admin@example.com
   ADMIN_PASSWORD=your-secure-password
   ADMIN_NAME=Your Name
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Seed the admin user** (in another terminal):
   ```bash
   npm run seed
   ```

5. Open `http://localhost:3000` and navigate to `/admin/login`.

---

## Scripts

| Script     | Command         | Description                            |
|------------|-----------------|----------------------------------------|
| dev        | `npm run dev`   | Start development server (localhost:3000) |
| build      | `npm run build` | Build for production                    |
| start      | `npm run start` | Start production server                 |
| lint       | `npm run lint`  | Run ESLint                              |
| seed       | `npm run seed`  | Seed initial admin user                 |

---

## Design Decisions

- **Scroll spy is homepage-only** — Prevents unnecessary observers on routed pages (`/about`, `/blog`, etc.)
- **Single-user admin** — No public signup; backend is protected for single-owner access
- **Design tokens over hardcoded styles** — Colors, borders, and states defined once and reused consistently
- **Spam protection** — Contact form uses honeypot + timing checks before storing messages
