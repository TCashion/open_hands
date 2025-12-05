import React from 'react'

export default function Square({ value, onClick }: { value: string | null; onClick: () => void }) {
  return (
    <button onClick={onClick} className="w-20 h-20 bg-white rounded shadow flex items-center justify-center text-2xl font-bold">
      {value}
    </button>
  )
}
