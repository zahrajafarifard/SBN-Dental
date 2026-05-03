# SBN Dental Admin Dashboard

React admin dashboard for managing the SBN Dental catalog, articles, categories, contact messages, and social media links.

## Features

- Admin login and persisted authentication state.
- Product create/edit workflows with multiple images, colors, details, compositions, and usage instructions.
- Article create/edit workflows with header and body images.
- Category management for products and articles.
- Contact message inbox with unread/read status.
- Social media link management.
- Socket.IO client for live dashboard updates.

## Tech Stack

- React 18
- Create React App
- Redux Toolkit and Redux Persist
- React Router
- Tailwind CSS
- Socket.IO Client

## Getting Started

```bash
npm install
cp .env.example .env
npm start
```

The dashboard expects the API URL in `REACT_APP_URL`.

## Scripts

| Command | Description |
| --- | --- |
| `npm start` | Run the development server |
| `npm run build` | Build the production bundle |
| `npm test` | Run the test watcher |

## Environment Variables

```bash
REACT_APP_URL=http://localhost:4000
```

## Author

Developed by Zahra Jafarifard.
