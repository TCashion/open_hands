import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'

export type Player = 'X' | 'O'

interface GameState {
  game_id: string | null
  board: (Player | null)[]
  turn: Player
  winner: Player | 'draw' | null
  status: 'idle' | 'loading' | 'failed'
}

const initialState: GameState = {
  game_id: null,
  board: Array(9).fill(null),
  turn: 'X',
  winner: null,
  status: 'idle',
}

export const newGame = createAsyncThunk('game/newGame', async () => {
  const res = await fetch('http://localhost:8000/games', { method: 'POST' })
  const data = await res.json()
  return data.game_id
})

export const fetchGame = createAsyncThunk('game/fetchGame', async (game_id: string) => {
  const res = await fetch(`http://localhost:8000/games/${game_id}`)
  const data = await res.json()
  return data
})

export const makeMove = createAsyncThunk('game/makeMove', async ({ game_id, idx }: { game_id: string, idx: number }) => {
  const res = await fetch(`http://localhost:8000/games/${game_id}/moves`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ idx })
  })
  const data = await res.json()
  return data
})

const slice = createSlice({
  name: 'game',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(newGame.pending, state => { state.status = 'loading' })
      .addCase(newGame.fulfilled, (state, action) => {
        state.status = 'idle'
        state.game_id = action.payload
        state.board = Array(9).fill(null)
        state.turn = 'X'
        state.winner = null
      })
      .addCase(fetchGame.fulfilled, (state, action) => {
        state.status = 'idle'
        state.game_id = action.payload.game_id
        state.board = action.payload.board.map((x: string) => x === ' ' ? null : x)
        state.turn = action.payload.turn
        state.winner = action.payload.winner
      })
      .addCase(makeMove.fulfilled, (state, action) => {
        state.status = 'idle'
        state.board = action.payload.board.map((x: string) => x === ' ' ? null : x)
        state.turn = action.payload.turn
        state.winner = action.payload.winner
      })
  }
})

export const selectGame = (state: any) => state.game
export default slice.reducer
