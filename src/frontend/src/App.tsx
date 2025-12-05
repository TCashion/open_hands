import React, { useEffect } from 'react'
import Board from './components/Board'

export default function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-4">
        <div className='mb-4 flex items-center justify-center'>
            <h1 className="text-2xl font-bold mb-4">Tic Tac Toe</h1>
        </div>
        <Board />
      </div>
    </div>
  )
}
