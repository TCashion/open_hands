import React, { useEffect } from 'react'
import Board from './components/Board'
import Scoreboard from './components/Scoreboard'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-4">
        <div className='mb-4 flex items-center justify-center'>
            <h1 className="text-2xl font-bold mb-4">Tic Tac Toe</h1>
        </div>
        <Board />
        <Scoreboard />
      </div>
    </div>
  )
}
