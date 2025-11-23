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
        <div className="public-view-header glassy">
          <div className="public-view-badge">Grant Details</div>
          <h1 className="gradient public-view-title">Grant ID: {id}</h1>
          {grant && (
            <>
              <h2 className="public-view-subtitle">{grant.title}</h2>
              <div className="public-view-stats">
                <div className="public-view-stat">
                  <div className="public-view-stat-label">Amount Allocated</div>
                  <div className="public-view-stat-value">₹{grant.amount?.toLocaleString() || '50,000'}</div>
                </div>
                <div className="public-view-stat">
                  <div className="public-view-stat-label">Sector</div>
                  <div className="public-view-stat-value">{grant.field || 'General'}</div>
                </div>
                {grant.creator && (
                  <div className="public-view-stat">
                    <div className="public-view-stat-label">Creator</div>
                    <div className="public-view-stat-value">{grant.creator}</div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

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