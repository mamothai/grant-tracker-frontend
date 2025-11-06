import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const SectorDetails = () => {
  const { sectorName } = useParams();
  const [grants, setGrants] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("grants") || "[]");

    const sampleGrants = [
      {
        id: "AIF-2025-001",
        title: "Agriculture Infrastructure Fund (AIF)",
        field: "Agriculture",
        amount: 33209 * 10000000,
        creator: "Ministry of Agriculture & Farmers Welfare",
        description: "Funding for post-harvest management infrastructure and community farming assets.",
      },
      {
        id: "SHC-2025-002",
        title: "Soil Health Card Scheme",
        field: "Agriculture",
        amount: 2517 * 10000000,
        creator: "Department of Agriculture & Cooperation",
        description: "Provides farmers with soil health reports for better crop yield.",
      },
      {
        id: "PMKISAN-2025-003",
        title: "PM Kisan Samman Nidhi (PM-KISAN)",
        field: "Agriculture",
        amount: 60000 * 10000000,
        creator: "Ministry of Agriculture & Farmers Welfare",
        description: "Direct income support for all farmer families in India.",
      },
      {
        id: "AI-EDU-2025-004",
        title: "IndiaAI FutureSkills Initiative",
        field: "Education",
        amount: 500 * 10000000,
        creator: "Ministry of Electronics and IT",
        description: "AI training program for 1 million teachers nationwide.",
      },
      {
        id: "PMJAY-2025-005",
        title: "Ayushman Bharat (PM-JAY)",
        field: "Health",
        amount: 64000 * 10000000,
        creator: "Ministry of Health & Family Welfare",
        description: "Health protection scheme for 50 crore citizens.",
      },
    ];

    setGrants([...sampleGrants, ...stored]);
  }, []);

  const filtered = grants.filter((g) => g.field === sectorName);

  return (
    <div className="flex-center">
      <div className="glass max-w-3xl w-full">
        <h1 className="text-gradient text-3xl font-bold text-center mb-6">
          {sectorName} Grants
        </h1>

        {filtered.length ? (
          <div className="space-y-4">
            {filtered.map((g) => (
              <div key={g.id} className="glass p-4 text-left">
                <h3 className="text-cyan text-xl font-bold mb-2">{g.title}</h3>
                <p><strong>Grant ID:</strong> {g.id}</p>
                <p><strong>Implementing Body:</strong> {g.creator}</p>
                <p><strong>Amount:</strong> ₹{g.amount.toLocaleString()}</p>
                <p><strong>Description:</strong> {g.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray text-center">No grants found for this sector.</p>
        )}

        <Link to="/" className="btn-primary mt-8 block text-center">
          ⬅ Back to Home
        </Link>
      </div>
    </div>
  );
};

export default SectorDetails;
