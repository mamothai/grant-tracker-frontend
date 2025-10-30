import { Link, Routes, Route, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/creator-login" element={<CreatorLogin />} />
        <Route path="/creator-dashboard" element={<CreatorDashboard />} />
        <Route path="/gov-login" element={<GovLogin />} />
        <Route path="/gov-dashboard" element={<GovDashboard />} />
        <Route path="/view/:id" element={<PublicView />} />
      </Routes>
    </div>
  )
}

// HOME PAGE — PROFESSIONAL GOVT LANDING
const Home = () => (
  <div className="min-h-screen flex flex-col justify-center items-center p-6">
    <div className="text-center mb-12">
      <div className="logo mb-4">🇮🇳 GrantTracker Portal</div>
      <h1 className="text-hero mb-4">Digital Grant Tracking</h1>
      <p className="text-xl text-gray-700 max-w-2xl mx-auto">Transparent monitoring of government grants for public accountability</p>
    </div>
    <div className="grid md:grid-cols-3 gap-6 max-w-4xl w-full">
      <Link to="/creator-login" className="govt-card p-8 text-center">
        <h3 className="text-2xl font-bold mb-4 text-navy">Grant Creator</h3>
        <p>Generate grant IDs with custom details</p>
      </Link>
      <Link to="/gov-login" className="govt-card p-8 text-center">
        <h3 className="text-2xl font-bold mb-4 text-green">Govt Official</h3>
        <p>Upload updates & proofs</p>
      </Link>
      <div className="govt-card p-8 text-center">
        <h3 className="text-2xl font-bold mb-4 text-orange-600">Public View</h3>
        <p>Enter ID to see live updates</p>
        <input placeholder="GT-2025-XXXX" className="mt-4 w-full p-3 border rounded" id="public-id" />
        <button className="mt-4 btn-saffron w-full" onClick={() => {
          const id = document.getElementById('public-id').value || 'GT-2025-1001'
          window.location.href = `/view/${id}`
        }}>View Grant</button>
      </div>
    </div>
  </div>
)

// CREATOR LOGIN
const CreatorLogin = () => {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const navigate = useNavigate()

  const login = () => {
    if (email === 'arm.official168@gmail.com' && pass === 'Grant123!') {
      localStorage.setItem('creatorAuth', 'true')
      navigate('/creator-dashboard')
    } else alert('Invalid: arm.official168@gmail.com / Grant123!')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="govt-card w-full max-w-md">
        <h2 className="text-3xl font-bold mb-8 text-center text-navy">Creator Login</h2>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.value)} className="w-full p-3 mb-4 border rounded-lg" />
        <input type="password" placeholder="Password" value={pass} onChange={e => setPass(e.value)} className="w-full p-3 mb-6 border rounded-lg" />
        <button className="btn-navy w-full" onClick={login}>Login</button>
        <p className="mt-4 text-center text-sm text-gray-600">arm.official168@gmail.com / Grant123!</p>
      </div>
    </div>
  )
}

// CREATOR DASHBOARD — CUSTOM GRANT FORM
const CreatorDashboard = () => {
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [field, setField] = useState('')
  const navigate = useNavigate()

  const createGrant = () => {
    const id = `GT-2025-${Math.floor(1000 + Math.random() * 9000)}`
    const grant = { id, title, amount: parseInt(amount), field, updates: [], creator: 'arm.official168@gmail.com' }
    const grants = JSON.parse(localStorage.getItem('grants') || '[]')
    grants.push(grant)
    localStorage.setItem('grants', JSON.stringify(grants))
    navigate(`/view/${id}`)
  }

  if (localStorage.getItem('creatorAuth') !== 'true') return <Navigate to="/creator-login" />

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-2xl mx-auto">
        <div className="govt-card mb-8">
          <h2 className="text-3xl font-bold text-navy mb-6">Create New Grant</h2>
          <input placeholder="Grant Title" value={title} onChange={e => setTitle(e.target.value)} className="w-full p-3 mb-4 border rounded-lg" />
          <input type="number" placeholder="Amount (₹)" value={amount} onChange={e => setAmount(e.target.value)} className="w-full p-3 mb-4 border rounded-lg" />
          <input placeholder="Field/Area (e.g. Education, Health)" value={field} onChange={e => setField(e.target.value)} className="w-full p-3 mb-6 border rounded-lg" />
          <button className="btn-saffron w-full" onClick={createGrant}>Generate Grant ID</button>
        </div>
      </div>
    </div>
  )
}

// GOV LOGIN & DASHBOARD (UPDATED FOR CUSTOM FIELDS)
const GovLogin = () => {
  // Same as before, but update navigate to '/gov-dashboard'
  // ... (use previous code)
}

// GOV DASHBOARD (UPDATED)
const GovDashboard = () => {
  // Same, but load grants from localStorage for validation
  // ... (use previous code)
}

// PUBLIC VIEW (UPDATED FOR CUSTOM FIELDS)
const PublicView = () => {
  const { id } = useParams()
  const [grant, setGrant] = useState(null)

  useEffect(() => {
    const grants = JSON.parse(localStorage.getItem('grants') || '[]')
    const found = grants.find(g => g.id === id)
    setGrant(found || { error: true })
  }, [id])

  if (!grant) return <div>Loading...</div>
  if (grant.error) return <div>Grant not found</div>

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <div className="govt-card mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2 text-navy">Grant ID: {grant.id}</h1>
          <p className="text-3xl text-green-600">₹{grant.amount?.toLocaleString()}</p>
          <p className="text-xl text-gray-700 mt-2">Field: {grant.field}</p>
          <p className="text-sm text-gray-500">Created by: {grant.creator}</p>
        </div>
        <div className="govt-card">
          <h2 className="text-2xl font-bold mb-6 text-navy">Updates</h2>
          {grant.updates.length ? grant.updates.map((u, i) => (
            <div key={i} className="border-t pt-4">
              <p className="font-bold">{u.title}</p>
              <p className="text-sm text-gray-600">{u.date}</p>
              {u.image && <img src={u.image} className="mt-2 rounded max-w-md" />}
            </div>
          )) : <p>No updates yet</p>}
        </div>
      </div>
    </div>
  )
}

export default App