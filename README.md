# SBN Dental

SBN Dental is a full-stack dental product catalog and content platform. The repository is organized into three main applications: a public website, an admin dashboard, and an Express/MySQL API.

## Project Structure

| Folder | Purpose | Stack |
| --- | --- | --- |
| `site` | Public-facing product and article website | Next.js, React, TypeScript, Tailwind CSS |
| `admin` | Admin dashboard for managing products, articles, categories, social links, and messages | React, Redux Toolkit, React Router, Tailwind CSS |
| `back-end` | REST API, authentication, file uploads, and real-time admin notifications | Node.js, Express, Sequelize, MySQL, Socket.IO |

## Highlights

- Product catalog with categories, related products, filtering, and product detail pages
- Article/blog system with latest, most visited, archive, and related article views
- Admin dashboard for managing products, articles, categories, contact messages, and social media links
- JWT-protected admin endpoints and password reset functionality
- Image upload handling with Multer and static media serving through the API
- Socket.IO integration for real-time unread message notifications
- SEO-oriented public website with sitemap support and server-rendered Next.js routes

## Local Setup

Each folder is an independent Node.js project with its own dependencies and README file.

### Backend

```bash
cd back-end
npm install
npm run dev
```

### Frontend Website

```bash
cd site
npm install
npm run dev
```

### Admin Dashboard

```bash
cd admin
npm install
npm start
```

Create the required `.env` files from the provided `.env.example` files before starting the applications.

## Docker Compose

A Docker Compose setup is included for running the full stack from the repository root.

```bash
docker compose up --build
```

This starts:

- `backend` on `http://localhost:4000`
- `frontend` on `http://localhost:3000`
- `admin` on `http://localhost:3001`
- `mysql` on port `3307`

To stop and remove the containers and network:

```bash
docker compose down
```

## Default Ports

| Service | URL |
| --- | --- |
| API | `http://localhost:4000` |
| Public site | `http://localhost:3000` |
| Admin dashboard | `http://localhost:3001` |
| MySQL | `localhost:3307` |

## Repository Notes

- Existing upload assets are included so the project snapshot remains visually complete
- Local `.env` files are ignored to keep environment-specific values out of version control
- Database tables are synchronized through Sequelize when the API starts

## Author

Developed by Zahra Jafarifard.