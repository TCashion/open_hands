import React, { useEffect, useState } from 'react'

interface GameSummary {
  game_id: string
  winner: string
  board: string[]
}

export default function Scoreboard({ refreshKey }: { refreshKey?: any }) {
  const [games, setGames] = useState<GameSummary[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('http://localhost:8000/scoreboard')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setGames(data)
        } else {
          setGames([])
        }
        setLoading(false)
      })
  }, [refreshKey])

  return (
    <div className="w-full max-w-md mx-auto my-6 p-4 flex flex-col items-center bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-2">Scoreboard (Last 10 Games)</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {games.map(g => (
            <li key={g.game_id} className="mb-2 flex justify-between items-center">
              <span className="font-semibold">Winner: {g.winner}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
