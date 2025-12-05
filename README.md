# Open Hands Technical Project

Welcome to the fullstack Tic Tac Toe app! This project features a modern React + TypeScript frontend and a Python FastAPI backend, with SQLite keeping score as the database of record.

## How to Run the App
Check out the setup instructions below to get both the frontend and backend running locally. It’s quick and easy—just follow the steps!

## Approach & Architecture
I built a full-stack Tic Tac Toe game using React for the user interface, FastAPI for the backend logic, and SQLite as the persistent game state. The backend acts as the single source of truth, ensuring every move is tracked and validated.

## AI Tools Used
I leveraged GitHub Copilot Chat (my first time using Agent Mode!) to accelerate development. Copilot helped generate boilerplate code, debug issues, and streamline the build process.

## Challenges & Future Improvements
Tailwind CSS gave me issues with color rendering. While the game is fully functional, I’d love to polish the styling and layout next. After that, I’d want to build out new features and enhancements!

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
