# Open hands technical project

This repository contains a fullstack Tic Tac Toe project with a React + TypeScript frontend and a Python FastAPI backend.


- Instructions for running the app: 

See below

- A brief description of your approach: 

I stood up a full-stack tic-tac-toe app with a React frontend, python backend, and SQLite database. The database is the source of truth for the game. 

- What AI tools you used and how: 

I used Github Copilot Chat (Agent mode! this is my first time using this). I prompted the tool to help me write boilerplate code, then troubleshoot when I ran into issue. 

- Anything that didn’t go as planned or you'd improve with more time

I ran into problems with tailwind styling, mainly getting colors to render, as well as layout. I'm fairly satisfied with the game, so styling and layout would be my next concern. Then, more features!


## Project Structure
- `src/frontend/` — Vite React + TypeScript app with Tailwind CSS and Redux Toolkit.
- `src/backend/` — FastAPI app using SQLModel and SQLite.

---

## Setup Instructions

Run frontend and backend in their own terminal sessions.

### Backend (FastAPI + SQLModel + SQLite)

1. cd src/backend
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

1. cd src/frontend
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
