# SBN Dental API

Node.js API for the SBN Dental platform. It powers the public site, the admin dashboard, authentication, product/article content, contact messages, uploads, and real-time notifications.

## Features

- Express REST API for public and admin workflows.
- Sequelize models for products, categories, articles, contacts, social links, and users.
- MySQL persistence with automatic schema synchronization.
- JWT-based route protection for admin endpoints.
- Multer-powered upload pipeline for product and article images.
- Static serving for uploaded assets.
- Socket.IO server for real-time admin notifications.

## Tech Stack

- Node.js
- Express
- Sequelize
- MySQL
- JWT
- Multer
- Socket.IO

## Getting Started

1. Create a MySQL database.
2. Copy the example environment file.
3. Install dependencies and start the server.

```bash
cp .env.example .env
npm install
npm run dev
```

The API runs on `http://localhost:4000` by default.

## Scripts

| Command | Description |
| --- | --- |
| `npm start` | Run the API with Node |
| `npm run dev` | Run the API with Nodemon |

## Environment Variables

```bash
PORT=4000
DB_NAME=sbn
DB_USER=root
DB_PASSWORD=
DB_HOST=localhost
DB_PORT=3306
```

## Main Routes

| Prefix | Purpose |
| --- | --- |
| `/sbn` | Public website data, products, articles, contact form |
| `/api` | Admin product, article, category, social, and message management |
| `/users` | Login and password reset |
| `/uploads` | Static uploaded assets |
