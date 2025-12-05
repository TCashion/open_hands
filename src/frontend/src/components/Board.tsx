import React, { useEffect } from 'react'
import Square from './Square'
import { useAppSelector, useAppDispatch } from '../store'
import { selectGame, newGame, fetchGame, makeMove } from '../store/gameSlice'

function getGameIdFromPath() {
  const match = window.location.pathname.match(/([a-f0-9\-]{36})/)
  return match ? match[1] : null
}

export default function Board() {
  const dispatch = useAppDispatch()
  const game = useAppSelector(selectGame)

  useEffect(() => {
    const id = getGameIdFromPath()
    if (id) {
      dispatch(fetchGame(id)).then((action: any) => {
        if (action.error) {
          // If not found, start a new game
          dispatch(newGame()).then((newAction: any) => {
            if (newAction.payload) {
              window.history.replaceState({}, '', `/${newAction.payload}`)
              dispatch(fetchGame(newAction.payload))
            }
          })
        }
      })
    } else {
      dispatch(newGame()).then((action: any) => {
        if (action.payload) {
          window.history.replaceState({}, '', `/${action.payload}`)
          dispatch(fetchGame(action.payload))
        }
      })
    }
  }, [dispatch])

  function handleClick(index: number) {
    if (game.winner || game.board[index] || game.status === 'loading') return
    if (!game.game_id) return
    dispatch(makeMove({ game_id: game.game_id, idx: index })).then(() => {
      dispatch(fetchGame(game.game_id!))
    })
  }

  function handleNewGame() {
    dispatch(newGame()).then((action: any) => {
      if (action.payload) {
        window.history.replaceState({}, '', `/${action.payload}`)
        dispatch(fetchGame(action.payload))
      }
    })
  }

  return (
    <div>
      <div className="mb-4">
        {[0, 1, 2].map(row => (
          <div key={row} className="flex gap-2 mb-2">
            {[0, 1, 2].map(col => {
              const i = row * 3 + col
              return (
                <Square key={i} value={game.board[i]} onClick={() => handleClick(i)} />
              )
            })}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between">
        <div>{game.status === 'loading' ? 'Loading...' : game.winner ? (game.winner === 'draw' ? 'Draw' : `Winner: ${game.winner}`) : `Next: ${game.turn}`}</div>
        <button className="px-3 py-1 bg-blue-600 text-white rounded" onClick={handleNewGame} disabled={game.status === 'loading'}>New Game</button>
      </div>
    </div>
  )
}
