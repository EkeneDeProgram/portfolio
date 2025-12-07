# Portfolio

A personal portfolio and project showcase built with **Next.js 15**, **React 19**, and **Tailwind CSS 4**. This project demonstrates modern web development practices, including component-based architecture, SEO optimization, and responsive design.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Available Scripts](#available-scripts)



## Features

- Responsive portfolio website with modern UI
- Dedicated sections for **About**, **Projects**, **Skills**, **Blog**, and **Contact**
- SEO-friendly pages using `next-seo`
- Contact form integrated with `emailjs` for email submissions
- Reusable and modular React components for maintainable code

## Tech Stack

- **Frontend:** Next.js 15, React 19, Tailwind CSS 4
- **Styling:** Tailwind CSS, PostCSS, Autoprefixer
- **Forms & Email:** EmailJS
- **Animations:** Framer Motion, Lottie React
- **Icons:** Lucide React, React Icons
- **SEO:** next-seo
- **Linting:** ESLint
- **TypeScript:** Fully typed with TypeScript 5

## Project Structure

```bash
portfolio/
├─ app/
│ ├─ about/page.tsx
│ ├─ blog/page.tsx
│ ├─ contact/page.tsx
│ ├─ projects/page.tsx
│ ├─ skills/page.tsx
│ ├─ layout.tsx
│ ├─ globals.css
│ └─ page.tsx
├─ components/
│ ├─ Navbar.tsx
│ ├─ blog/
│ └─ contact/
├─ public/
├─ node_modules/
├─ .env.local
├─ package.json
├─ tsconfig.json
├─ tailwind.config.js
└─ README.md
```


## Installation

1. Clone the repository:

```bash
git clone https://github.com/EkeneDeProgram/portfolio.git
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Create a .env.local file in the root directory for environment variables, e.g., EmailJS keys:
```bash
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
```

## Available Scripts
```bash
# Start development server
npm run dev

# Build the project
npm run build

# Start production server
npm run start

# Run linter
npm run lint
```