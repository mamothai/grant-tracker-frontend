import { Link, Routes, Route, useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function App() {
  return (
    <>
      <div className="aurora-bg"></div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/creator-login" element={<CreatorLogin />} />
        <Route path="/creator-dashboard" element={<CreatorDashboard />} />
        <Route path="/gov-login" element={<GovLogin />} />
        <Route path="/gov-dashboard" element={<GovDashboard />} />
        <Route path="/view/:id" element={<PublicView />} />
      </Routes>
    </>
  )
}

const Home = () => {
  const [id, setId] = useState('')
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="text-center mb-12">
        <h1 className="text-aurora mb-4">Digital Grant Tracking</h1>
        <p className="text-xl text-indigo-200 max-w-2xl">Real-time monitoring of government grants with full transparency</p>
      </div>

      <div className="max-w-6xl w-full grid-3">
        <Link to="/creator-login" className="glass-card text-center p-8">
          <h3 className="text-2xl font-bold mb-3 text-cyan-300">Grant Creator</h3>
          <p className="text-indigo-200">Create custom grants with amount & field</p>
        </Link>

        <Link to="/gov-login" className="glass-card text-center p-8">
          <h3 className="text-2xl font-bold mb-3 text-purple-300">Govt Official</h3>
          <p className="text-indigo-200">Upload updates with proof photos</p>
        </Link>

        <div className="glass-card p-8">
          <h3 className="text-2xl font-bold mb-4 text-pink-300">Public View</h3>
          <p className="text-indigo-200 mb-4">Enter Grant ID to see live updates</p>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="GT-2025-XXXX"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="input-glow flex-1"
            />
            <button
              onClick={() => navigate(`/view/${id || 'GT-2025-1001'}`)}
              className="btn-gradient"
            >
              View
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ... (Keep CreatorLogin, CreatorDashboard, GovLogin, GovDashboard, PublicView from previous version)