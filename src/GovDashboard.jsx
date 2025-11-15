import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './App.css'

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
    <div className="gov-dashboard-page reveal">
      <div className="gov-dashboard-container">
        <div className="gov-dashboard-header">
          <div className="gov-dashboard-icon">📋</div>
          <h1 className="gradient gov-dashboard-title">Government Upload Portal</h1>
          <p className="muted gov-dashboard-subtitle">
            Upload proofs, update milestones, and maintain transparency for grants.
          </p>
        </div>

        <div className="glassy gov-upload-form">
          <form onSubmit={handleUpload}>
            <div className="form-group">
              <label className="form-label">Grant ID *</label>
              <input
                type="text"
                placeholder="e.g. GT-2025-1234"
                value={grantId}
                onChange={(e) => setGrantId(e.target.value)}
                className="input"
              />
              <small className="form-hint muted">Enter the unique Grant ID for the update</small>
            </div>

            <div className="form-group">
              <label className="form-label">Update Title *</label>
              <input
                type="text"
                placeholder="e.g. First Milestone Completed"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input"
              />
              <small className="form-hint muted">Brief description of the update</small>
            </div>

            <div className="form-group">
              <label className="form-label">Upload Proof (Image) *</label>
              <div className="file-upload-wrapper">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="file-input"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="file-upload-label">
                  {file ? file.name : 'Choose File'}
                </label>
              </div>
              <small className="form-hint muted">Upload an image as proof (receipt, photo, document)</small>
            </div>

            <button
              type="submit"
              disabled={uploading}
              className="btn-primary gov-upload-btn"
            >
              {uploading ? 'Uploading...' : 'Upload Update'}
            </button>
          </form>
        </div>

        <div className="gov-dashboard-info glassy">
          <h3 className="gov-dashboard-info-title">What to Upload?</h3>
          <div className="gov-dashboard-info-grid">
            <div className="gov-dashboard-info-item">
              <div className="gov-dashboard-info-icon">📸</div>
              <strong>Site Photos</strong>
              <span>Visual proof of progress</span>
            </div>
            <div className="gov-dashboard-info-item">
              <div className="gov-dashboard-info-icon">🧾</div>
              <strong>Receipts</strong>
              <span>Financial documentation</span>
            </div>
            <div className="gov-dashboard-info-item">
              <div className="gov-dashboard-info-icon">📄</div>
              <strong>Documents</strong>
              <span>Official certificates and reports</span>
            </div>
          </div>
        </div>

        <div className="gov-dashboard-footer">
          <Link to="/" className="login-footer-link">← Back to Home</Link>
        </div>
      </div>
    </div>
  )
}