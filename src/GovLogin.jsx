import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function GovLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    if (email === 'gov@grant.in' && password === 'Secure123!') {
      localStorage.setItem('govAuth', 'true')
      navigate('/gov-dashboard')
    } else {
      setError('Invalid credentials')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="glass p-10 max-w-md w-full">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">Govt Official Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-400 border border-white/30 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-400 border border-white/30 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            required
          />
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold py-3 rounded-xl hover:scale-105 transition"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-xs text-gray-400 text-center">
          Use: <span className="text-cyan-400">gov@grant.in</span> / <span className="text-cyan-400">Secure123!</span>
        </p>
      </div>
    </div>
  )
}