# Portfolio

A personal portfolio and project showcase built with **Next.js 15**, **React 19**, and **Tailwind CSS 4**. This project demonstrates modern web development practices, including component-based architecture, SEO optimization, and responsive design.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)




## Features

- Responsive portfolio website with modern UI
- Dedicated sections for **About**, **Projects**, **Skills**, **Blog**, and **Contact**
- SEO-friendly pages using `next-seo`
- Contact form integrated with `emailjs` for email submissions
- Reusable and modular React components for maintainable code
- Optimized image loading with Next.js Image component
- Supports dynamic blog content fetched from CMS (Strapi)
- Redis caching enabled for performance (via Upstash)

## Tech Stack

- **Frontend:** Next.js 15, React 19, Tailwind CSS 4
- **Styling:** Tailwind CSS, PostCSS, Autoprefixer
- **Forms & Email:** EmailJS
- **Animations:** Framer Motion, Lottie React
- **Icons:** Lucide React, React Icons
- **SEO:** next-seo
- **Linting:** ESLint
- **TypeScript:** Fully typed with TypeScript 5
- **Database / CMS**: Strapi (GraphQL)
- **Caching**: Redis via Upstash

## Project Structure

```bash
portfolio/
├─ app/
│  ├─ about/page.tsx
│  ├─ blog/
│  │  ├─ page.tsx
│  │  ├─ [slug]/page.tsx
│  │  └─ category/page.tsx
│  ├─ contact/page.tsx
│  ├─ projects/page.tsx
│  ├─ skills/page.tsx
│  ├─ layout.tsx
│  └─ globals.css
├─ components/
│  ├─ Navbar.tsx
│  ├─ blog/
│  │  ├─ BlogPostCard.tsx
│  │  ├─ BlogLayout.tsx
│  │  └─ BlogCategoryTabs.tsx
│  └─ contact/
├─ lib/
│  ├─ cms.ts
│  ├─ gtag.ts
│  ├─ session.ts
│  ├─ blog/
│  │  └─ unified.ts
│  └─ news/
├─ node_modules/
├─ public/
├─ .env.local
├─ package.json
├─ tsconfig.json
├─ tailwind.config.js
├─ next.config.ts
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

## Environment Variables
3. Create a .env.local file in the root directory for environment variables, e.g., EmailJS keys:
```bash
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_CMS_URL=your_cms_url
STRAPI_GRAPHQL_ENDPOINT=your_strapi_endpoint

NEWS_API_KEY=your_news_api_key
NEWS_API_URL=your_news_api_url

CRYPTO_URL=your_crypto_api_url
REVALIDATE_SECRET=your_revalidate_secret

ENABLE_REDIS=true
UPSTASH_REDIS_REST_URL=your_upstash_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_token
NEXT_PUBLIC_SITE_URL=your_site_url
CRON_SECRET=your_cron_secret

NEXT_PUBLIC_GA_ID=your_google_analytics_id
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