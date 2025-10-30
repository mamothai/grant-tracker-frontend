import { Link, Routes, Route } from 'react-router-dom'
import CreateGrant from './createGrant.jsx'
import PublicView from './PublicView.jsx'
import GovLogin from './GovLogin.jsx'
import GovDashboard from './GovDashboard.jsx'

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <Routes>
        <Route path="/" element={
          <div className="min-h-screen flex items-center justify-center p-6">
            <div className="glass p-10 max-w-md w-full text-center">
              <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                GrantTracker
              </h1>
              <p className="text-gray-300 mb-8 text-lg">Transparent grant tracking for public trust</p>
              <div className="space-y-4">
                <Link to="/create" className="block w-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold py-4 rounded-xl hover:scale-105 transition text-lg">
                  Create New Grant
                </Link>
                <Link to="/gov-login" className="block w-full bg-white/20 backdrop-blur border border-white/30 text-white font-bold py-4 rounded-xl hover:scale-105 transition text-lg">
                  Govt Official Login
                </Link>
              </div>
              <p className="mt-8 text-sm text-gray-400">
                View example: <Link to="/view/GT-2025-1001" className="text-cyan-400 underline">GT-2025-1001</Link>
              </p>
            </div>
          </div>
        } />
        <Route path="/create" element={<CreateGrant />} />
        <Route path="/view/:id" element={<PublicView />} />
        <Route path="/gov-login" element={<GovLogin />} />
        <Route path="/gov-dashboard" element={<GovDashboard />} />
      </Routes>
    </div>
  )
}
