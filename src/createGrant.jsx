import React, { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import "./App.css";

export default function CreateGrant() {
  // simple auth check (creator must be logged in)
  const isCreator = (localStorage.getItem("creatorAuth") === "true");
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [field, setField] = useState("");
  const [beneficiary, setBeneficiary] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  // if not logged in as creator, redirect to login
  if (!isCreator) return <Navigate to="/creator-login" replace />;

  const generateId = () => {
    // GT-2025-XXXX
    const rand = Math.floor(1000 + Math.random() * 9000);
    return `GT-2025-${rand}`;
  };

  const createGrant = () => {
    // basic validation
    if (!title.trim()) return alert("Please enter a grant title.");
    if (!amount || Number(amount) <= 0) return alert("Please enter a valid amount.");
    if (!field.trim()) return alert("Please enter the field/area.");
    setLoading(true);

    try {
      const id = generateId();
      const grant = {
        id,
        title: title.trim(),
        amount: Number(amount),
        field: field.trim(),
        beneficiary: beneficiary.trim() || "Not specified",
        description: description.trim(),
        updates: [],
        creator: "arm.official168@gmail.com", // default creator email
        createdAt: new Date().toISOString()
      };

      const existing = JSON.parse(localStorage.getItem("grants") || "[]");
      existing.push(grant);
      localStorage.setItem("grants", JSON.stringify(existing));

      // small UX delay to show a spinner (if you later add one)
      setTimeout(() => {
        setLoading(false);
        // navigate to public view page for the created grant
        navigate(`/view/${encodeURIComponent(id)}`);
      }, 400);
    } catch (err) {
      setLoading(false);
      console.error(err);
      alert("Could not create grant — check console for details.");
    }
  };

  return (
    <div className="create-grant-page reveal">
      <div className="create-grant-container">
        <div className="create-grant-header">
          <div className="create-grant-icon">✨</div>
          <h1 className="gradient create-grant-title">Create New Grant</h1>
          <p className="muted create-grant-subtitle">
            Fill in the details below and generate a Grant ID. Only logged-in creators can create grants.
          </p>
        </div>

        <div className="glassy create-grant-form">

          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Grant Title *</label>
              <input
                className="input"
                placeholder="e.g. Rural School Sanitation Initiative"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Amount (₹) *</label>
              <input
                className="input"
                type="number"
                placeholder="e.g. 1500000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Field / Sector *</label>
            <select
              className="input"
              value={field}
              onChange={(e) => setField(e.target.value)}
            >
              <option value="">Select a sector</option>
              <option value="Agriculture">Agriculture</option>
              <option value="Education">Education</option>
              <option value="Health">Health</option>
              <option value="Infrastructure">Infrastructure</option>
              <option value="Environment">Environment</option>
              <option value="Technology">Technology</option>
              <option value="Women & Child">Women & Child</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Beneficiary (optional)</label>
            <input
              className="input"
              placeholder="Organization or person (optional)"
              value={beneficiary}
              onChange={(e) => setBeneficiary(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Short Description (optional)</label>
            <textarea
              className="input textarea"
              rows={4}
              placeholder="Short summary of the grant purpose..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="form-actions">
            <button
              className="btn-primary form-btn-primary"
              onClick={createGrant}
              disabled={loading}
            >
              {loading ? "Creating…" : "Generate Grant ID"}
            </button>

            <button
              className="btn-secondary form-btn-secondary"
              onClick={() => {
                setTitle("");
                setAmount("");
                setField("");
                setBeneficiary("");
                setDescription("");
              }}
            >
              Reset Form
            </button>
          </div>

          <p className="form-note muted">
            <strong>Note:</strong> Grants are stored in your browser's localStorage (for demo). To persist server-side, integrate an API.
          </p>
        </div>
      </div>
    </div>
  );
}
