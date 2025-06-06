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

## Registering an Income

After obtaining a JWT token from the login endpoint, you can register a new income:

```bash
curl -X POST http://localhost:4000/api/incomes \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"amount": 100.50, "description": "Freelance", "date": "2024-01-15"}'
```

Replace `YOUR_TOKEN` with the token returned by `/api/login`.
