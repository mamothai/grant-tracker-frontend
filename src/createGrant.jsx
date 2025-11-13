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
    <div style={{ padding: 40, minHeight: "80vh" }}>
      <div className="glassy" style={{ maxWidth: 800, margin: "0 auto" }}>
        <h2 style={{ marginBottom: 8 }}>Create New Grant</h2>
        <p className="muted" style={{ marginBottom: 20 }}>
          Fill in the details below and generate a Grant ID. Only logged-in creators can create grants.
        </p>

        <label className="text-sm">Grant Title</label>
        <input
          className="input"
          placeholder="e.g. Rural School Sanitation Initiative"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label className="text-sm">Amount (₹)</label>
        <input
          className="input"
          type="number"
          placeholder="e.g. 1500000"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <label className="text-sm">Field / Sector</label>
        <input
          className="input"
          placeholder="e.g. Education, Health, Agriculture"
          value={field}
          onChange={(e) => setField(e.target.value)}
        />

        <label className="text-sm">Beneficiary (optional)</label>
        <input
          className="input"
          placeholder="Organization or person (optional)"
          value={beneficiary}
          onChange={(e) => setBeneficiary(e.target.value)}
        />

        <label className="text-sm">Short Description (optional)</label>
        <textarea
          className="input textarea"
          rows={4}
          placeholder="Short summary of the grant purpose..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div style={{ marginTop: 16, display: "flex", gap: 12, alignItems: "center" }}>
          <button
            className="btn-primary"
            onClick={createGrant}
            disabled={loading}
            style={{ minWidth: 160 }}
          >
            {loading ? "Creating…" : "Generate Grant ID"}
          </button>

          <button
            className="btn-ghost"
            onClick={() => {
              // quick reset
              setTitle("");
              setAmount("");
              setField("");
              setBeneficiary("");
              setDescription("");
            }}
            style={{ minWidth: 120 }}
          >
            Reset
          </button>
        </div>

        <p className="mt-4 text-sm muted">
          Note: Grants are stored in your browser's localStorage (for demo). To persist server-side, integrate an API.
        </p>
      </div>
    </div>
  );
}
