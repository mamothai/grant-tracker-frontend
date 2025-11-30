import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './App.css'

export default function PublicView() {
  const { id } = useParams()
  const [grant, setGrant] = useState(null)
  const [updates, setUpdates] = useState([])

  // Load grant data and updates
  useEffect(() => {
    // Try to load from localStorage
    const grants = JSON.parse(localStorage.getItem('grants') || '[]')
    const foundGrant = grants.find(g => g.id === id)
    
    if (foundGrant) {
      setGrant(foundGrant)
      
      // Use updates from localStorage if they exist
      if (foundGrant.updates && Array.isArray(foundGrant.updates) && foundGrant.updates.length > 0) {
        const formattedUpdates = foundGrant.updates.map(update => ({
          ...update,
          date: update.date ? (typeof update.date === 'string' ? new Date(update.date) : new Date(update.date)) : new Date()
        }))
        setUpdates(formattedUpdates)
      } else {
        // Default mock updates if none exist
        const mockUpdates = [
          { title: '₹50,000 Released', date: new Date(), image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&q=80&auto=format&fit=crop' },
          { title: 'Site Visit Completed', date: new Date(), image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80&auto=format&fit=crop' },
        ]
        setUpdates(mockUpdates)
      }
    } else {
      // Default fallback
      setGrant({
        id,
        title: 'Grant Details',
        amount: 50000,
        field: 'General'
      })
      
      // Default mock updates
      const mockUpdates = [
        { title: '₹50,000 Released', date: new Date(), image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&q=80&auto=format&fit=crop' },
        { title: 'Site Visit Completed', date: new Date(), image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80&auto=format&fit=crop' },
      ]
      setUpdates(mockUpdates)
    }
  }, [id])

  return (
    <div className="public-view-page reveal">
      <div className="public-view-container">
        {/* Grant Details - Benefits Style Card */}
        {grant && (
          <div className="benefits-scheme-card glassy" style={{ marginBottom: '40px' }}>
            <div className="scheme-card-header">
              <div className="scheme-card-icon">
                {grant.field === "Agriculture" ? "🌾" : 
                 grant.field === "Education" ? "📚" : 
                 grant.field === "Health" ? "⚕️" : 
                 grant.field === "Infrastructure" ? "🏗️" : 
                 grant.field === "Environment" ? "🌱" : 
                 grant.field === "Technology" ? "💻" : 
                 grant.field === "Women & Child" ? "👨‍👩‍👧" : "📋"}
              </div>
              <div className="scheme-card-badge">{grant.field || 'General'}</div>
            </div>
            
            <h3 className="gradient scheme-card-title">{grant.title}</h3>
            
            <div className="scheme-card-info">
              <div className="scheme-info-item">
                <span className="scheme-info-label">Grant ID:</span>
                <span className="scheme-info-value">{grant.id}</span>
              </div>
              <div className="scheme-info-item">
                <span className="scheme-info-label">Amount Allocated:</span>
                <span className="scheme-info-value">₹{grant.amount?.toLocaleString() || '50,000'}</span>
              </div>
              {grant.creator && (
                <div className="scheme-info-item">
                  <span className="scheme-info-label">Creator:</span>
                  <span className="scheme-info-value">{grant.creator}</span>
                </div>
              )}
              {grant.createdAt && (
                <div className="scheme-info-item">
                  <span className="scheme-info-label">Created:</span>
                  <span className="scheme-info-value">{new Date(grant.createdAt).toLocaleDateString()}</span>
                </div>
              )}
            </div>

            {grant.description && (
              <div className="scheme-card-objectives">
                <strong>Description:</strong>
                <p className="muted">{grant.description}</p>
              </div>
            )}

            {grant.beneficiary && grant.beneficiary !== "Not specified" && (
              <div className="scheme-card-benefits">
                <strong>Beneficiary:</strong>
                <p className="muted">{grant.beneficiary}</p>
              </div>
            )}

            {grant.yearLaunched && (
              <div className="scheme-card-info" style={{ marginTop: '16px' }}>
                <div className="scheme-info-item">
                  <span className="scheme-info-label">Year Launched:</span>
                  <span className="scheme-info-value">{grant.yearLaunched}</span>
                </div>
              </div>
            )}

            {grant.status && (
              <div className="scheme-card-objectives">
                <strong>Status:</strong>
                <p className="muted">{grant.status}</p>
              </div>
            )}

            {grant.beneficiaries && (
              <div className="scheme-card-objectives">
                <strong>Beneficiaries:</strong>
                <p className="muted">{grant.beneficiaries}</p>
              </div>
            )}

            {grant.fundsUtilized && (
              <div className="scheme-card-objectives">
                <strong>Funds Utilized:</strong>
                <p className="muted">{grant.fundsUtilized}</p>
              </div>
            )}

            {grant.impact && (
              <div className="scheme-card-objectives">
                <strong>Impact:</strong>
                <p className="muted">{grant.impact}</p>
              </div>
            )}

            {grant.coverage && (
              <div className="scheme-card-info" style={{ marginTop: '16px' }}>
                <div className="scheme-info-item">
                  <span className="scheme-info-label">Coverage:</span>
                  <span className="scheme-info-value">{grant.coverage}</span>
                </div>
              </div>
            )}

            {grant.nodalAgency && (
              <div className="scheme-card-info" style={{ marginTop: '8px' }}>
                <div className="scheme-info-item">
                  <span className="scheme-info-label">Nodal Agency:</span>
                  <span className="scheme-info-value">{grant.nodalAgency}</span>
                </div>
              </div>
            )}

            {grant.latestUpdate && (
              <div className="scheme-card-objectives">
                <strong>Latest Update:</strong>
                <p className="muted">{grant.latestUpdate}</p>
              </div>
            )}

            {grant.sources && Array.isArray(grant.sources) && grant.sources.length > 0 && (
              <div className="scheme-card-benefits">
                <strong>Sources:</strong>
                <ul className="benefits-list">
                  {grant.sources.map((source, idx) => (
                    <li key={idx} className="benefit-item">
                      <span className="benefit-icon">📌</span>
                      {source}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        <div className="public-view-updates glassy">
          <div className="public-view-updates-header">
            <h2 className="gradient public-view-updates-title">Live Updates</h2>
            <div className="public-view-updates-count">{updates.length} Update{updates.length !== 1 ? 's' : ''}</div>
          </div>

          {updates.length > 0 ? (
            <div className="public-view-updates-list">
              {updates.map((update, i) => (
                <div key={i} className="public-view-update-card glassy">
                  <div className="public-view-update-header">
                    <h3 className="public-view-update-title">{update.title}</h3>
                    <div className="public-view-update-date">
                      {update.date instanceof Date 
                        ? update.date.toLocaleString() 
                        : new Date(update.date).toLocaleString()}
                    </div>
                  </div>
                  <div className="public-view-update-image-wrapper">
                    <img 
                      src={update.image} 
                      alt="Proof" 
                      className="public-view-update-image" 
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="public-view-no-updates">
              <div className="public-view-no-updates-icon">📭</div>
              <p className="muted">No updates available yet. Check back later!</p>
            </div>
          )}
        </div>

        <div className="public-view-footer">
          <Link to="/chart" className="login-footer-link">← Back to Dashboard</Link>
        </div>
      </div>
    </div>
  )
}