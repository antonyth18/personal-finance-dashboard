# Personal Finance Dashboard

A full-stack web application to **manage personal finances** in one place.  
Users can add income & expenses, track recurring payments, and set savings goals — all visualized in a clean dashboard with charts and progress bars.  

---

## Features

- **Dashboard Overview**
  - Summarizes income, expenses, and savings goals.
  - Charts & graphs to visualize spending patterns.
- **Expense Tracking**
  - Add one-time and recurring expenses.
  - Categorize expenses (e.g., rent, groceries, travel).
- **Income Management**
  - Track multiple income sources (salary, freelance, investments).
- **Savings Goals**
  - Set savings targets (e.g., *New Laptop: $1000*).
  - Progress indicators to stay motivated.

---

##  Tech Stack

**Frontend**
- React + TypeScript (Vite)
- TailwindCSS (UI components)
- Chartjs (charts/graphs)
- Axios (API calls)

**Backend**
- Node.js + Express
- TypeScript
- Prisma ORM (PostgreSQL/MySQL/SQLite)
- Zod (input validation)

---

## Getting Started

### Clone the repo
```bash
git clone https://github.com/your-username/personal-finance-dashboard.git
cd personal-finance-dashboard
Backend Setup
bash
Copy
Edit
cd backend
npm install
Set up .env:

env
Copy
Edit
DATABASE_URL="postgresql://user:password@localhost:5432/finance_db"
Run Prisma migrations:

bash
Copy
Edit
npx prisma migrate dev --name init
Start backend server:

bash
Copy
Edit
npm run dev
Runs on http://localhost:3000

Frontend Setup
bash
Copy
Edit
cd frontend
npm install
npm run dev
Runs on http://localhost:5173

