import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function GovDashboard() {
  const [grantId, setGrantId] = useState('')
  const [title, setTitle] = useState('')
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const navigate = useNavigate()

  const handleUpload = async (e) => {
    e.preventDefault()
    if (!file || !grantId || !title) return alert('Fill all fields')

    setUploading(true)
    // Simulate upload
    setTimeout(() => {
      alert(`Uploaded to ${grantId}: ${title}`)
      setUploading(false)
      navigate(`/view/${grantId}`)
    }, 1500)
  }

  if (localStorage.getItem('govAuth') !== 'true') {
    navigate('/gov-login')
    return null
  }

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="max-w-2xl mx-auto glass p-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">Govt Upload Portal</h2>
        <form onSubmit={handleUpload} className="space-y-4">
          <input
            type="text"
            placeholder="Grant ID (e.g. GT-2025-1234)"
            value={grantId}
            onChange={(e) => setGrantId(e.target.value)}
            className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-400 border border-white/30"
          />
          <input
            type="text"
            placeholder="Update Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-400 border border-white/30"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full p-3 rounded-lg bg-white/20 text-white"
          />
          <button
            type="submit"
            disabled={uploading}
            className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold py-3 rounded-xl hover:scale-105 transition disabled:opacity-70"
          >
            {uploading ? 'Uploading...' : 'Upload Update'}
          </button>
        </form>
      </div>
    </div>
  )
}