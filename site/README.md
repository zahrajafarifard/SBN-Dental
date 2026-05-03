# SBN Dental Public Site

Public Next.js website for SBN Dental products, educational articles, contact information, and brand content.

## Features

- Home page with product and article sections.
- Product listing, filtering, detail pages, and related products.
- Article archive, detail pages, latest articles, and related articles.
- Contact form connected to the backend API.
- Responsive layout with custom components and Tailwind CSS.
- Sitemap generation for SEO-friendly discovery.

## Tech Stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Custom Node server
- Sharp for image optimization support

## Getting Started

```bash
npm install
cp .env.example .env
npm run dev
```

The site expects the API URL in `NEXT_PUBLIC_API_URL`.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Run the custom Next.js development server |
| `npm run build` | Build the production site |
| `npm start` | Start the custom production server |
| `npm run lint` | Run Next.js linting |

## Environment Variables

```bash
NEXT_PUBLIC_API_URL=http://localhost:4000
```

## Author

Developed by Zahra Jafarifard.
