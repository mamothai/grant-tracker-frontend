import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useNavigate, Link } from "react-router-dom";

ChartJS.register(ArcElement, Tooltip, Legend);

const GrantSectorChart = () => {
  const navigate = useNavigate();
  const [grants, setGrants] = useState([]);

  // ✅ Preloaded real-world sample grants
  const sampleGrants = [
    {
      id: "AIF-2025-001",
      title: "Agriculture Infrastructure Fund (AIF)",
      field: "Agriculture",
      amount: 33209 * 10000000, // ₹33,209 crore
      creator: "Ministry of Agriculture & Farmers Welfare",
      description:
        "Funding for post-harvest management infrastructure and community farming assets.",
    },
    {
      id: "SHC-2025-002",
      title: "Soil Health Card Scheme",
      field: "Agriculture",
      amount: 2517 * 10000000, // ₹25,170 crore
      creator: "Department of Agriculture & Cooperation",
      description:
        "Provides farmers with soil health reports to improve productivity and sustainability.",
    },
    {
      id: "PMKISAN-2025-003",
      title: "PM Kisan Samman Nidhi (PM-KISAN)",
      field: "Agriculture",
      amount: 60000 * 10000000, // ₹60,000 crore
      creator: "Ministry of Agriculture & Farmers Welfare",
      description: "Direct income support of ₹6,000 annually to all farmer families in India.",
    },
    {
      id: "AI-EDU-2025-004",
      title: "IndiaAI FutureSkills Initiative",
      field: "Education",
      amount: 500 * 10000000, // ₹5,000 crore
      creator: "Ministry of Electronics and IT",
      description:
        "Nationwide teacher training program to skill one million educators in Artificial Intelligence.",
    },
    {
      id: "PMJAY-2025-005",
      title: "Ayushman Bharat (PM-JAY)",
      field: "Health",
      amount: 64000 * 10000000, // ₹64,000 crore
      creator: "Ministry of Health & Family Welfare",
      description:
        "Health protection scheme providing coverage up to ₹5 lakh per family for over 50 crore citizens.",
    },
  ];

  // ✅ Load localStorage + sample grants
  useEffect(() => {
    const local = JSON.parse(localStorage.getItem("grants") || "[]");
    setGrants([...sampleGrants, ...local]);
  }, []);

  if (!grants.length)
    return (
      <div className="flex-center">
        <div className="glass max-w-md text-center">
          <h2 className="text-gradient text-2xl font-bold mb-4">
            Grants by Sector
          </h2>
          <p className="text-gray">No grants found yet.</p>
        </div>
      </div>
    );

  // ✅ Get unique sectors
  const sectors = [...new Set(grants.map((g) => g.field || "Unspecified"))];

  // ✅ Calculate totals per sector
  const totals = sectors.map((s) =>
    grants
      .filter((g) => g.field === s)
      .reduce((sum, g) => sum + (g.amount || 0), 0)
  );

  // ✅ Chart data setup
  const data = {
    labels: sectors,
    datasets: [
      {
        data: totals,
        backgroundColor: [
          "#06b6d4",
          "#a855f7",
          "#ec4899",
          "#f59e0b",
          "#22c55e",
        ],
        borderColor: "#fff",
        borderWidth: 2,
        hoverOffset: 12,
      },
    ],
  };

  // ✅ Chart options
  const options = {
    onClick: (evt, elements) => {
      if (elements.length > 0) {
        const sector = sectors[elements[0].index];
        navigate(`/sectors/${encodeURIComponent(sector)}`);
      }
    },
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#fff",
          font: { size: 14, weight: "bold" },
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="flex-center">
      <div className="glass max-w-4xl w-full text-center p-8">
        <h2 className="text-gradient text-3xl font-extrabold mb-6">
          Current Government Grants by Sector
        </h2>

        {/* 🥧 Chart Container */}
        <div className="flex justify-center mb-8">
          <div
            style={{
              width: "400px",
              height: "400px",
            }}
          >
            <Pie data={data} options={options} />
          </div>
        </div>

        <p className="text-gray mb-6">
          Click a sector to view grants in that category.
        </p>

        <Link to="/" className="btn-glass inline-block mt-4">
          ⬅ Back to Home
        </Link>
      </div>
    </div>
  );
};

export default GrantSectorChart;
