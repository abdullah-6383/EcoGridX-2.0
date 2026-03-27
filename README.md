# EcoGridX 2.0

EcoGridX 2.0 is a full-stack smart-grid platform with a Next.js frontend and a FastAPI backend. It provides operator and consumer demo experiences for monitoring, optimization, forecasting, storage operations, and grid resilience workflows.

## What This Project Includes

- Frontend dashboard experience built with Next.js App Router + Tailwind CSS
- Backend API built with FastAPI and modular route/services architecture
- Operator demo flow at /demo
- Consumer demo flow at /consumer-demo
- Domain endpoints for demand, storage, renewable, failure handling, optimization, export, and alerts

## Latest Update (March 2026)

This update includes demo authentication quality-of-life improvements:

- Auto-login was added for the operator demo page to reduce setup friction during demos
- Auto-login was added for the consumer demo page as well
- Both flows now silently request an auth token if one is not already in localStorage

Updated files:

- app/demo/page.tsx
- app/consumer-demo/page.tsx

## Tech Stack

Frontend:

- Next.js
- React
- TypeScript
- Tailwind CSS

Backend:

- FastAPI
- Pydantic
- Python

## Repository Structure

- app/ -> Next.js routes and page-level UI
- components/ -> Reusable UI components and demo modules
- lib/api.ts -> Frontend API client used by demo pages
- backend/main.py -> FastAPI app entry point
- backend/app/routes/ -> API route modules grouped by domain
- backend/app/services/ -> Service layer (including Gemini integration)
- backend/app/models/ -> Data models
- backend/app/schemas/ -> API schemas

## Prerequisites

- Node.js 18+
- npm 9+
- Python 3.10+
- pip

## Setup

1. Clone the repository

```bash
git clone https://github.com/abdullah-6383/EcoGridX-2.0.git
cd EcoGridX-2.0
```

2. Install frontend dependencies

```bash
npm install
```

3. Install backend dependencies

```bash
cd backend
pip install -r requirements.txt
cd ..
```

## Run Locally

Start backend (Terminal 1):

```bash
cd backend
python main.py
```

Start frontend (Terminal 2):

```bash
npm run dev
```

Frontend default URL: http://localhost:3000

## Demo Access Notes

The demo pages now attempt silent login automatically when no access token is present.

- Operator demo uses admin@ecogridx.com / admin123
- Consumer demo uses consumer@ecogridx.com / admin123

If your backend seed/auth setup differs, update credentials in:

- app/demo/page.tsx
- app/consumer-demo/page.tsx

## Build

Frontend production build:

```bash
npm run build
npm start
```

## Contribution Guidelines

1. Create a feature branch
2. Make focused changes with clear commit messages
3. Update README/docs when behavior changes
4. Open a pull request with testing notes

## License

Add your project license information here (MIT, Apache-2.0, etc.).
