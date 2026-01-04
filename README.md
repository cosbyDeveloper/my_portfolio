# Personal Portfolio Website

A modern, scalable personal portfolio website built with **Next.js (App Router)** and **Tailwind CSS**, designed with a strong focus on **layout architecture, component reusability, and future extensibility**.

---

## 🚀 Tech Stack

- **Next.js 14+ (App Router)**
- **React (Client & Server Components)**
- **Tailwind CSS (Design-system driven)**
- **TypeScript**
- **React Icons**
- **Intersection Observer API** (Scroll Spy logic)

---

## ✨ Key Features (So Far)

### ✅ Responsive Sidebar Navigation

- Desktop **collapsible sidebar** with persisted state (localStorage)
- Mobile **slide-in sidebar** with overlay
- Smooth animations and transitions
- Icon-first design with progressive disclosure

### ✅ Scroll-Spy Ready Architecture

- Scroll spy logic scoped to homepage only
- Intersection Observer–based section detection
- Active navigation highlighting prepared for multi-section landing page
- Clean separation between route-based and section-based active states

### ✅ Design System Foundations

- Dark mode–aware CSS variables

---

## 📁 Project Structure (Relevant)

````

## 🧠 Architectural Decisions

* **Scroll spy is homepage-only**
  Prevents unnecessary observers on routed pages like `/about`, `/blog`, etc.

* **Sidebar state persistence**
  Desktop collapse state is stored in `localStorage` for consistent UX.

* **Design tokens over hardcoded styles**
  Borders, colors, and states are defined once and reused everywhere.

---

## 🔧 Local Development

```bash
npm install
npm run dev
````

Open `http://localhost:3000` in your browser.

---
