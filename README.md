# Open hands technical project

This repository contains a fullstack Tic Tac Toe project with a React + TypeScript frontend and a Python FastAPI backend.

## Project Structure
- `frontend/` — Vite React + TypeScript app with Tailwind CSS and Redux Toolkit.
- `backend/` — FastAPI app using SQLModel and SQLite.

---

## Setup Instructions

Run frontend and backend in their own terminal sessions.

### Backend (FastAPI + SQLModel + SQLite)

1. cd backend
2. python -m venv .venv
3. source .venv/bin/activate
4. .venv/bin/pip install -r requirements.txt
5. uvicorn app.main:app --reload --port 8000

#### API Endpoints
- `POST /games` — create a new game `{ "game_id": "..." }`
- `GET /games/{game_id}` — get game state
- `POST /games/{game_id}/moves` — body: integer index (0-8) to make a move

#### Access the DB 

From the `/backend` directory, you can access the database with `sqlite3 database.db`.

---

### Frontend (Vite + React + TypeScript)

1. cd frontend
2. npm install
3. npm run dev

Frontend expects backend at [http://localhost:8000](http://localhost:8000)

---

## Running Locally
- Start the backend server first, then the frontend.
- Access the app via the frontend dev server (usually [http://localhost:5173](http://localhost:5173)).

---

## Additional Info
- Frontend uses Tailwind CSS for styling and Redux Toolkit for state management.
- Backend uses SQLModel for ORM and SQLite for storage.
- For development, both servers run locally and communicate via REST API.
