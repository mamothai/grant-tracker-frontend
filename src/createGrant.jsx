import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function CreateGrant() {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleCreate = () => {
    setLoading(true)
    setTimeout(() => {
      const id = `GT-2025-${Math.floor(1000 + Math.random() * 9000)}`
      navigate(`/view/${id}`)
    }, 800)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="glass p-10 max-w-md w-full text-center">
        <h2 className="text-3xl font-bold mb-6 text-white">Create New Grant</h2>
        <button
          onClick={handleCreate}
          disabled={loading}
          className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-4 rounded-xl hover:scale-105 transition disabled:opacity-70"
        >
          {loading ? 'Generating...' : 'Generate Grant ID'}
        </button>
      </div>
    </div>
  )
}