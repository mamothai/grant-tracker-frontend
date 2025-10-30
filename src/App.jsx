import { Link, Routes, Route } from 'react-router-dom'
import CreateGrant from './createGrant.jsx'
import PublicView from './PublicView.jsx'
import GovLogin from './GovLogin.jsx'
import GovDashboard from './GovDashboard.jsx'

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={
          <div className="flex-center">
            <div className="glass max-w-md w-full text-center">
              <h1 className="text-5xl font-bold mb-4 text-gradient">
                GrantTracker
              </h1>
              <p className="text-gray text-lg mb-8">Transparent grant tracking for public trust</p>
              <div className="space-y-4">
                <Link to="/create" className="btn-primary">
                  Create New Grant
                </Link>
                <Link to="/gov-login" className="btn-glass">
                  Govt Official Login
                </Link>
              </div>
              <p className="mt-8 text-sm text-gray">
                View example: <Link to="/view/GT-2025-1001" className="text-cyan underline">GT-2025-1001</Link>
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