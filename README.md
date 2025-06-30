# Task Tracker

A simple and modern **Task Tracker** built with:

-   **Next.js 15**
-   **Clerk** for authentication
-   **Drizzle ORM** with Neon serverless Postgres
-   **React Hook Form + Zod** for form handling and validation
-   **Tailwind CSS** for styling
-   **React Query** for efficient data fetching

## ✨ Features

-   User authentication via Clerk
-   Create, read, update, delete (CRUD) tasks
-   Serverless Postgres database (Neon) with Drizzle ORM
-   Clean, component-based UI with Radix UI and Lucide icons

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Okkie14/Task-Tracker
```

### 2. Install dependencies

```bash
pnpm install
# or
npm install
# or
yarn install
```

### 3. Set up environment variables

Create a .env.local file in the root of the project with the following variables:

```bash
env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
DATABASE_URL=your_neon_database_url
```

### 4. Database setup

Run your migrations using Drizzle Kit:

```bash
npx drizzle-kit push
```

### 5. Run the development server

```bash
pnpm dev
# or
npm run dev
# or
yarn dev
```

Open http://localhost:3000 in your browser.

## 📦 Scripts

-   dev – start development server with Turbopack
-   build – build the production app
-   start – start the production app
-   lint – run ESLint

## 🛠 Tech Stack

-   Next.js 15
-   React 19
-   Clerk
-   Drizzle ORM
-   Neon Postgres
-   React Query
-   React Hook Form + Zod
-   Tailwind CSS + Radix UI + Lucide

## 🔐 Environment Variables

Variable Description
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY Clerk frontend key
CLERK_SECRET_KEY Clerk backend secret key
DATABASE_URL Neon Postgres connection URL

## 📄 License

MIT

Built with ❤️ by Okkert Joubert.
