import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useNavigate } from "react-router-dom";

ChartJS.register(ArcElement, Tooltip, Legend);

const GrantSectorChart = () => {
  const navigate = useNavigate();
  const [grants, setGrants] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("grants") || "[]");
    setGrants(stored);
  }, []);

  if (!grants.length)
    return (
      <div className="flex-center">
        <div className="glass max-w-md text-center">
          <h2 className="text-gradient text-2xl font-bold mb-4">Grants by Sector</h2>
          <p className="text-gray">No grants found yet. Create some in the Creator Dashboard!</p>
        </div>
      </div>
    );

  const sectors = [...new Set(grants.map((g) => g.field || "Unspecified"))];
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
      legend: { labels: { color: "white", font: { size: 14 } } },
    },
  };

  return (
    <div className="flex-center">
      <div className="glass max-w-lg w-full text-center">
        <h2 className="text-gradient text-2xl font-bold mb-4">Grants by Sector</h2>
        <Pie data={data} options={options} />
        <p className="text-gray mt-4">Click on a sector to view details.</p>
      </div>
    </div>
  );
};

export default GrantSectorChart;
