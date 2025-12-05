import React, { useEffect, useState } from 'react'
import Board from './components/Board'
import Scoreboard from './components/Scoreboard'
import { useAppSelector } from './store'
import { selectGame } from './store/gameSlice'

export default function App() {
  const game = useAppSelector(selectGame)
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    if (game.winner) {
      setRefreshKey(k => k + 1)
    }
  }, [game.winner])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-4">
        <div className='mb-4 flex items-center justify-center'>
            <h1 className="text-2xl font-bold mb-4">Tic Tac Toe</h1>
        </div>
        <Board />
        <Scoreboard refreshKey={refreshKey} />
      </div>
    </div>
  )
}
