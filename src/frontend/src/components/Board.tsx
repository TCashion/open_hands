import React from 'react'
import Square from './Square'
import { useAppSelector, useAppDispatch } from '../store'
import { selectGame, makeMove, newGame } from '../store/gameSlice'

export default function Board() {
  const dispatch = useAppDispatch()
  const game = useAppSelector(selectGame)

  function handleClick(index: number) {
    if (game.winner || game.board[index]) return
    dispatch(makeMove(index))
  }

  return (
    <div>
      <div className="grid grid-cols-3 gap-2 mb-4">
        {game.board.map((value, i) => (
          <Square key={i} value={value} onClick={() => handleClick(i)} />
        ))}
      </div>
      <div className="flex items-center justify-between">
        <div>{game.winner ? (game.winner === 'draw' ? 'Draw' : `Winner: ${game.winner}`) : `Next: ${game.turn}`}</div>
        <button className="px-3 py-1 bg-blue-600 text-white rounded" onClick={() => dispatch(newGame())}>New Game</button>
      </div>
    </div>
  )
}
