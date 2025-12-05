import React from 'react'

export default function Square({ value, onClick }: { value: string | null; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className="bg-gray-100 rounded shadow flex items-center justify-center text-2xl font-bold border-2 border-blue-500"
      style={{ width: 75, height: 75, margin: 3 }}
    >
      {value}
    </div>
  )
}
