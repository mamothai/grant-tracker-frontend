import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const SectorDetails = () => {
  const { sectorName } = useParams();
  const [grants, setGrants] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("grants") || "[]");
    setGrants(stored);
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
              <div key={g.id} className="glass p-4">
                <h3 className="text-cyan text-xl font-bold mb-2">{g.title}</h3>
                <p><strong>Grant ID:</strong> {g.id}</p>
                <p><strong>Creator:</strong> {g.creator}</p>
                <p><strong>Amount:</strong> ₹{g.amount.toLocaleString()}</p>
                <p><strong>Field:</strong> {g.field}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray text-center">No grants found for this sector.</p>
        )}

        <Link to="/chart" className="btn-primary mt-8 block text-center">
          ⬅ Back to Chart
        </Link>
      </div>
    </div>
  );
};

export default SectorDetails;
