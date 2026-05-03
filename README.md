# SBN Dental

SBN Dental is a full-stack dental product catalog and content platform. The repository is organized as a three-part application: a public website, an admin dashboard, and an Express/MySQL API.

## Project Structure

| Folder | Purpose | Stack |
| --- | --- | --- |
| `site` | Public-facing product and article website | Next.js, React, TypeScript, Tailwind CSS |
| `admin` | Admin dashboard for products, articles, categories, social links, and messages | React, Redux Toolkit, React Router, Tailwind CSS |
| `back-end` | REST API, authentication, file uploads, and real-time admin notifications | Node.js, Express, Sequelize, MySQL, Socket.IO |

## Highlights

- Product catalog with categories, related products, filtering, and product detail pages.
- Article/blog system with latest, most visited, archive, and related article views.
- Admin dashboard for managing product content, article content, categories, contact messages, and social media links.
- JWT-protected admin endpoints and password reset flow.
- Image upload handling with Multer and static media serving from the API.
- Socket.IO integration for real-time unread message updates.
- SEO-oriented public site with sitemap support and server-rendered Next.js routes.

## Local Setup

Each folder is an independent Node.js project with its own dependencies and README:

```bash
cd back-end
npm install
npm run dev
```

```bash
cd site
npm install
npm run dev
```

```bash
cd admin
npm install
npm start
```

Create the required `.env` files from the provided `.env.example` files before running the apps.

## Default Ports

| Service | URL |
| --- | --- |
| API | `http://localhost:4000` |
| Public site | `http://localhost:3000` |
| Admin dashboard | `http://localhost:3000` by default, or the next available Create React App port |

## Repository Notes

- The existing upload assets are included so the project snapshot remains visually complete.
- Local `.env` files are ignored to keep environment-specific values out of version control.
- Database tables are synchronized through Sequelize when the API starts.
