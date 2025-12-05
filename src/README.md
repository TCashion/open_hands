# Open hands technical project

This repository contains a fullstack Tic Tac Toe project scaffolded with a React + TypeScript frontend and a Python FastAPI backend.

Folders:
- `frontend/` - Vite React + TypeScript app with Tailwind CSS and Redux Toolkit.
- `backend/` - FastAPI app using SQLModel and SQLite.

Quick start:

1. Frontend
   - cd frontend
   - npm install
   - npm run dev

2. Backend
   - cd backend
   - python3 -m venv .venv
   - .venv/bin/pip install -r requirements.txt
   - pip install uvicorn
   - uvicorn app.main:app --reload --port 8000

Both servers will run locally; frontend expects backend at http://localhost:8000.
