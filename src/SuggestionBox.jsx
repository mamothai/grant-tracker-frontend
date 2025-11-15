// src/SuggestionBox.jsx
import { useState } from "react";
import "./App.css";

export default function SuggestionBox() {
  const [grantId, setGrantId] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const submit = () => {
    if (!grantId || !message) return alert("Please provide Grant ID and message.");
    // Placeholder: integrate emailjs or server API here
    alert("Suggestion submitted. (This demo does not actually send email)");
    setGrantId("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="suggestion-page reveal">
      <div className="suggestion-page-container">
        <div className="suggestion-header">
          <div className="suggestion-icon">💬</div>
          <h1 className="gradient suggestion-title">Public Suggestion Box</h1>
          <p className="muted suggestion-subtitle">
            Submit feedback on any grant using its ID. Your voice matters in building a more accountable system.
          </p>
        </div>

        <div className="suggest-container glassy">
          <div className="suggestion-form">
            <div className="form-group">
              <label className="form-label">Grant ID *</label>
              <input 
                className="input" 
                placeholder="e.g. GT-2025-1024" 
                value={grantId} 
                onChange={(e)=>setGrantId(e.target.value)} 
              />
              <small className="form-hint muted">Enter the unique Grant ID you want to provide feedback for</small>
            </div>

            <div className="form-group">
              <label className="form-label">Your Email (optional)</label>
              <input 
                className="input" 
                type="email"
                placeholder="your.email@example.com" 
                value={email} 
                onChange={(e)=>setEmail(e.target.value)} 
              />
              <small className="form-hint muted">Optional: So we can follow up with you</small>
            </div>

            <div className="form-group">
              <label className="form-label">Your Suggestion *</label>
              <textarea 
                className="input textarea" 
                rows={6} 
                placeholder="Share your feedback, concerns, or suggestions about this grant..."
                value={message} 
                onChange={(e)=>setMessage(e.target.value)} 
              />
              <small className="form-hint muted">Your message will be sent to the grant creator</small>
            </div>

            <button 
              className="btn-primary suggestion-submit-btn" 
              onClick={submit}
            >
              Submit Suggestion
            </button>
          </div>
        </div>

        <div className="suggestion-info glassy">
          <h3 className="suggestion-info-title">Why Submit Suggestions?</h3>
          <div className="suggestion-info-grid">
            <div className="suggestion-info-item">
              <div className="suggestion-info-icon">🔍</div>
              <strong>Improve Transparency</strong>
              <span>Help identify areas that need more clarity</span>
            </div>
            <div className="suggestion-info-item">
              <div className="suggestion-info-icon">🤝</div>
              <strong>Build Accountability</strong>
              <span>Ensure grants are used effectively</span>
            </div>
            <div className="suggestion-info-item">
              <div className="suggestion-info-icon">💡</div>
              <strong>Share Ideas</strong>
              <span>Contribute to better grant management</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
