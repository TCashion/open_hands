const BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000'

export async function createGame() {
  const res = await fetch(`${BASE}/games`, { method: 'POST' })
  return res.json()
}

export async function getGame(gameId: string) {
  const res = await fetch(`${BASE}/games/${gameId}`)
  return res.json()
}

export async function postMove(gameId: string, idx: number) {
  const res = await fetch(`${BASE}/games/${gameId}/moves`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ idx }),
  })
  return res.json()
}
