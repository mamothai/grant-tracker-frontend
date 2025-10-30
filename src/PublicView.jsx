import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function PublicView() {
  const { id } = useParams()
  const [updates, setUpdates] = useState([])

  // Simulate real-time updates (replace with backend later)
  useEffect(() => {
    const mockUpdates = [
      { title: '₹50,000 Released', date: new Date(), image: 'https://via.placeholder.com/300x200?text=Receipt' },
      { title: 'Site Visit Completed', date: new Date(), image: 'https://via.placeholder.com/300x200?text=Photo' },
    ]
    setUpdates(mockUpdates)
  }, [id])

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="max-w-4xl mx-auto">
        <div className="glass p-8 mb-6 text-center">
          <h1 className="text-4xl font-bold mb-2 text-cyan-400">Grant ID: {id}</h1>
          <p className="text-2xl text-green-400">₹50,000 Allocated</p>
        </div>
        <div className="glass p-8">
          <h2 className="text-2xl font-bold mb-6 text-white">Live Updates ({updates.length})</h2>
          <div className="space-y-6">
            {updates.map((update, i) => (
              <div key={i} className="bg-white/10 p-6 rounded-xl border border-white/20">
                <div className="flex justify-between items-center mb-3">
                  <p className="text-lg font-semibold text-white">{update.title}</p>
                  <p className="text-sm text-gray-400">{update.date.toLocaleString()}</p>
                </div>
                <img src={update.image} alt="Proof" className="w-full max-w-md rounded-lg shadow-lg" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}