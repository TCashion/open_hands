import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type Player = 'X' | 'O'

interface GameState {
  board: (Player | null)[]
  turn: Player
  winner: Player | 'draw' | null
}

const initialState: GameState = {
  board: Array(9).fill(null),
  turn: 'X',
  winner: null,
}

function checkWinner(board: (Player | null)[]) {
  const lines = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ]
  for (const [a,b,c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) return board[a]
  }
  if (board.every(Boolean)) return 'draw'
  return null
}

const slice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    newGame(state) {
      state.board = Array(9).fill(null)
      state.turn = 'X'
      state.winner = null
    },
    makeMove(state, action: PayloadAction<number>) {
      const idx = action.payload
      if (state.winner || state.board[idx]) return
      state.board[idx] = state.turn
      state.turn = state.turn === 'X' ? 'O' : 'X'
      state.winner = checkWinner(state.board)
    }
  }
})

export const { newGame, makeMove } = slice.actions
export const selectGame = (state: any) => state.game
export default slice.reducer
