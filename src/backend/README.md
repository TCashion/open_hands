Backend (FastAPI + SQLModel + SQLite)

Setup:

1. cd backend
2. python -m venv .venv
3. .venv/bin/pip install -r requirements.txt
4. uvicorn app.main:app --reload --port 8000

The API endpoints:
- POST /games -> create a new game {"game_id": "..."}
- GET /games/{game_id} -> get game state
- POST /games/{game_id}/moves -> body: integer index (0-8) to make a move
