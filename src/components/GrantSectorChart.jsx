// src/components/GrantSectorChart.jsx
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useNavigate } from "react-router-dom";
import "../App.css";

const COLORS = ["#06b6d4", "#a855f7", "#ef4444", "#10b981", "#f59e0b"];

export default function GrantSectorChart() {
  const navigate = useNavigate();

  // sample data (replace with real localStorage values or API)
  const data = [
    { name: "Agriculture", value: 1800000 },
    { name: "Education", value: 1200000 },
    { name: "Health", value: 2400000 },
    { name: "Infrastructure", value: 900000 },
    { name: "Environment", value: 600000 }
  ];

  const total = data.reduce((s, d) => s + d.value, 0);

  return (
    <div className="chart-page reveal" style={{ position: 'relative' }}>
      <h1 className="panel-title gradient center">Grant Sector Analytics</h1>

      <div className="chart-wrapper glassy" style={{ position: 'relative' }}>
        <div className="chart-decoration">
          <div className="chart-decoration-circle" />
        </div>
        <div className="chart-stats">
          <div className="stat">
            <div className="stat-label">Total Grants</div>
            <div className="stat-value">{data.length}</div>
          </div>
          <div className="stat">
            <div className="stat-label">Total Allocation</div>
            <div className="stat-value">₹{total.toLocaleString()}</div>
          </div>
          <div className="stat">
            <div className="stat-label">Sectors</div>
            <div className="stat-value">{data.length}</div>
          </div>
        </div>

        <div className="chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie 
                data={data} 
                dataKey="value" 
                nameKey="name" 
                innerRadius="20%" 
                outerRadius="35%" 
                onClick={(e) => navigate(`/sectors/${e.name}`)}
              >
                {data.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
              </Pie>
              <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
              <Legend verticalAlign="top" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
