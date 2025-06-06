# Budgetly

This project contains a Next.js frontend and a small Express backend used for authentication.

## Backend Setup

1. Copy `.env.example` to `.env` and fill in the variables. The `DATABASE_URL` should point to your PostgreSQL instance and `JWT_SECRET` is any random string.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run migrations to create the database tables:
   ```bash
   npx sequelize-cli db:migrate
   ```
4. Start the API server:
   ```bash
   npm run server
   ```
   The API will be available at `http://localhost:4000`.

## Frontend

To start the Next.js development server run:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.
