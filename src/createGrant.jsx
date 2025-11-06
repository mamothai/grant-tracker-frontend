import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateGrant() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [field, setField] = useState("");
  const navigate = useNavigate();

  const createGrant = () => {
    if (!title || !amount || !field)
      return alert("Please fill all fields before submitting.");

    const id = `GT-2025-${Math.floor(1000 + Math.random() * 9000)}`;
    const grant = {
      id,
      title,
      amount: parseInt(amount),
      field,
      updates: [],
      creator: "arm.official168@gmail.com",
    };

    const grants = JSON.parse(localStorage.getItem("grants") || "[]");
    grants.push(grant);
    localStorage.setItem("grants", JSON.stringify(grants));
    alert(`✅ Grant Created Successfully! Grant ID: ${id}`);
    navigate(`/view/${encodeURIComponent(id)}`);
  };

  return (
    <main className="container fade-up">
      <div className="glassy" style={{ maxWidth: 720, margin: "30px auto" }}>
        <h1 className="gradient" style={{ fontWeight: 800, fontSize: "2rem", marginBottom: "10px" }}>
          Create New Grant
        </h1>
        <p className="muted mb-4">
          Generate and register a new grant with its sector and funding details.
        </p>

        <input
          className="input mb-4"
          placeholder="Grant Title (e.g. Smart City Development)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="input mb-4"
          type="number"
          placeholder="Grant Amount (₹)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          className="input mb-4"
          placeholder="Sector / Field (e.g. Education, Health)"
          value={field}
          onChange={(e) => setField(e.target.value)}
        />

        <button
          className="btn btn-primary w-full"
          style={{ width: "100%", marginTop: "1rem" }}
          onClick={createGrant}
        >
          Generate Grant
        </button>

        <div className="mt-4 text-sm muted center">
          Example: “Education Grant for Rural Schools” or “Healthcare Support Fund”
        </div>
      </div>
    </main>
  );
}
