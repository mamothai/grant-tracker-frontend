import { useState } from "react";
import emailjs from "@emailjs/browser";
import "./App.css";

export default function SuggestionBox() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [grantId, setGrantId] = useState("");
  const [message, setMessage] = useState("");

  const sendSuggestion = () => {
    if (!name || !email || !grantId || !message) {
      alert("Please fill out all fields.");
      return;
    }

    emailjs.send(
      "service_z7kypm9",
      "template_cpg9vb8",
      {
        name,
        email,
        grant_id: grantId,
        message
      },
      "xuzHvsNOhfNKPlhfy"
    );

    alert("Suggestion sent successfully!");
    setName("");
    setEmail("");
    setGrantId("");
    setMessage("");
  };

  return (
    <main className="login-container fade-in">
      <div className="glassy login-card float-up" style={{ maxWidth: 600 }}>
        <h1 className="gradient" style={{ fontWeight: 800, marginBottom: 10 }}>
          Public Suggestion Box
        </h1>
        <p className="muted mb-4">Submit feedback for any grant using its ID.</p>

        <input className="input mb-3" placeholder="Your Name"
          value={name} onChange={(e) => setName(e.target.value)} />

        <input className="input mb-3" placeholder="Your Email"
          value={email} onChange={(e) => setEmail(e.target.value)} />

        <input className="input mb-3" placeholder="Grant ID (ex: GT-2025-1024)"
          value={grantId} onChange={(e) => setGrantId(e.target.value)} />

        <textarea className="input mb-4" placeholder="Your Message"
          value={message} onChange={(e) => setMessage(e.target.value)}
          style={{ height: "120px" }}
        />

        <button className="btn btn-primary w-full" onClick={sendSuggestion}>
          Submit
        </button>
      </div>
    </main>
  );
}
