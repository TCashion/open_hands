import React from 'react'

export default function Square({ value, onClick }: { value: string | null; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="bg-white rounded shadow flex items-center justify-center text-2xl font-bold"
      style={{ width: 75, height: 75, margin: 3 }}
    >
      {value}
    </button>
  )
}
