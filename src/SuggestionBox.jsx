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
    <div className="page-center reveal">
      <div className="suggest-container glassy">
        <h2 className="panel-title gradient">Suggestion Box</h2>
        <p className="muted">Submit feedback on a grant using its ID. (Your message will be sent to the creator in production.)</p>

        <input className="input" placeholder="Grant ID (ex: GT-2025-1024)" value={grantId} onChange={(e)=>setGrantId(e.target.value)} />
        <input className="input" placeholder="Your email (optional)" value={email} onChange={(e)=>setEmail(e.target.value)} />
        <textarea className="input textarea" rows={6} placeholder="Your suggestion..." value={message} onChange={(e)=>setMessage(e.target.value)} />

        <div style={{ textAlign: "center", marginTop: 12 }}>
          <button className="cta cta-primary" onClick={submit}>Submit Suggestion</button>
        </div>
      </div>
    </div>
  );
}
