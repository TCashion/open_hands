from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import SQLModel, Session, create_engine, Field
from typing import Optional, List
import uuid
from datetime import datetime
from pydantic import BaseModel

DATABASE_URL = "sqlite:///./database.db"
engine = create_engine(DATABASE_URL, echo=False)

class Move(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    game_id: str
    player: str
    index: int
    created_at: datetime = Field(default_factory=datetime.utcnow)

class Game(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    game_id: str
    board: str  # store as 9-char string, e.g. "XOX   O X"
    turn: str
    winner: Optional[str] = None
    finished_at: Optional[datetime] = None

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173","http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    SQLModel.metadata.create_all(engine)

@app.post("/games")
def create_game():
    gid = str(uuid.uuid4())
    game = Game(game_id=gid, board=" "*9, turn="X", winner=None)
    with Session(engine) as session:
        session.add(game)
        session.commit()
        session.refresh(game)
    return {"game_id": gid}

@app.get("/games/{gid}")
def get_game(gid: str):
    with Session(engine) as session:
        game = session.exec(select(Game).where(Game.game_id == gid)).first()
        if not game:
            raise HTTPException(status_code=404, detail="Game not found")
        return {
            "game_id": game.game_id,
            "board": list(game.board),
            "turn": game.turn,
            "winner": game.winner,
        }

from sqlmodel import select

def check_winner(board: List[Optional[str]]):
    lines = [
        (0,1,2),(3,4,5),(6,7,8),
        (0,3,6),(1,4,7),(2,5,8),
        (0,4,8),(2,4,6),
    ]
    for a,b,c in lines:
        if board[a] and board[a] == board[b] and board[a] == board[c]:
            return board[a]
    if all(x for x in board):
        return 'draw'
    return None

class MoveRequest(BaseModel):
    idx: int

@app.post("/games/{gid}/moves")
def make_move(gid: str, move: MoveRequest):
    idx = move.idx
    with Session(engine) as session:
        game = session.exec(select(Game).where(Game.game_id == gid)).first()
        if not game:
            raise HTTPException(status_code=404, detail="Game not found")
        board = list(game.board)
        if idx < 0 or idx >= 9:
            raise HTTPException(status_code=400, detail="Invalid index")
        if board[idx] != ' ':
            raise HTTPException(status_code=400, detail="Cell already occupied")
        if game.winner:
            raise HTTPException(status_code=400, detail="Game already finished")
        board[idx] = game.turn
        # Log the move
        move_db = Move(game_id=game.game_id, player=game.turn, index=idx)
        session.add(move_db)
        game.turn = 'O' if game.turn == 'X' else 'X'
        game.winner = check_winner(board)
        if game.winner:
            game.finished_at = datetime.utcnow()
        game.board = ''.join(board)
        session.add(game)
        session.commit()
        session.refresh(game)
        return {"game_id": game.game_id, "board": list(game.board), "turn": game.turn, "winner": game.winner}
