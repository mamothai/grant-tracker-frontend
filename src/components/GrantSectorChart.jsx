import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useNavigate } from "react-router-dom";

ChartJS.register(ArcElement, Tooltip, Legend);

const GrantSectorChart = () => {
  const navigate = useNavigate();
  const [grants, setGrants] = useState([]);

  // ✅ Preload real-world government grant data
  const sampleGrants = [
    {
      id: "AIF-2025-001",
      title: "Agriculture Infrastructure Fund (AIF)",
      field: "Agriculture",
      amount: 33209 * 10000000, // ₹33,209 crore
      creator: "Ministry of Agriculture & Farmers Welfare",
      description: "Funding for post-harvest management infrastructure and community farming assets.",
    },
    {
      id: "SHC-2025-002",
      title: "Soil Health Card Scheme",
      field: "Agriculture",
      amount: 2517 * 10000000, // ₹25,170 crore
      creator: "Department of Agriculture & Cooperation",
      description: "Scheme providing farmers with detailed soil health reports to improve crop productivity.",
    },
    {
      id: "PMKISAN-2025-003",
      title: "PM Kisan Samman Nidhi (PM-KISAN)",
      field: "Agriculture",
      amount: 60000 * 10000000, // ₹60,000 crore
      creator: "Ministry of Agriculture & Farmers Welfare",
      description: "Income support to all farmer families across India.",
    },
    {
      id: "AI-EDU-2025-004",
      title: "IndiaAI FutureSkills Initiative",
      field: "Education",
      amount: 500 * 10000000, // ₹5,000 crore (approx)
      creator: "Ministry of Electronics and IT",
      description: "Training 1 million teachers in Artificial Intelligence skills and technology.",
    },
    {
      id: "PMJAY-2025-005",
      title: "Ayushman Bharat (PM-JAY)",
      field: "Health",
      amount: 64000 * 10000000, // ₹64,000 crore
      creator: "Ministry of Health & Family Welfare",
      description: "Health protection scheme covering 50 crore people with ₹5 lakh per family per year.",
    },
  ];

  // ✅ Combine local grants + sample data
  useEffect(() => {
    const local = JSON.parse(localStorage.getItem("grants") || "[]");
    const allGrants = [...sampleGrants, ...local];
    setGrants(allGrants);
  }, []);

  if (!grants.length)
    return (
      <div className="glass mt-8 p-6 text-center">
        <h2 className="text-gradient text-2xl font-bold mb-4">Grants by Sector</h2>
        <p className="text-gray">No grants yet. Create one in the Creator Dashboard!</p>
      </div>
    );

  // ✅ Extract unique sectors
  const sectors = [...new Set(grants.map((g) => g.field || "Unspecified"))];

  // ✅ Calculate total per sector
  const totals = sectors.map((s) =>
    grants.filter((g) => g.field === s).reduce((sum, g) => sum + (g.amount || 0), 0)
  );

  const data = {
    labels: sectors,
    datasets: [
      {
        data: totals,
        backgroundColor: ["#06b6d4", "#a855f7", "#ec4899", "#f59e0b", "#22c55e"],
        borderWidth: 2,
        hoverOffset: 10,
      },
    ],
  };

  const options = {
    onClick: (evt, elements) => {
      if (elements.length > 0) {
        const sector = sectors[elements[0].index];
        navigate(`/sectors/${encodeURIComponent(sector)}`);
      }
    },
    plugins: {
      legend: {
        labels: {
          color: "white",
          font: { size: 14 },
        },
      },
    },
  };

  return (
    <div className="glass mt-8 p-6 text-center">
      <h2 className="text-gradient text-2xl font-bold mb-4">Current Government Grants by Sector</h2>
      <Pie data={data} options={options} />
      <p className="text-gray mt-4">Click a sector slice to view its current grant details.</p>
    </div>
  );
};

export default GrantSectorChart;
