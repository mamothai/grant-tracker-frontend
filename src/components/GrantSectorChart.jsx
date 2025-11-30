// src/components/GrantSectorChart.jsx
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useNavigate } from "react-router-dom";
import "../App.css";

const COLORS = [
  "#06b6d4", // cyan
  "#a855f7", // purple
  "#ef4444", // red
  "#10b981", // green
  "#f59e0b", // amber
  "#3b82f6", // blue
  "#ec4899"  // pink
];

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

  // Custom tooltip with enhanced styling
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          background: 'rgba(15, 23, 42, 0.95)',
          border: '1px solid rgba(6, 182, 212, 0.5)',
          borderRadius: '10px',
          padding: '12px 16px',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)'
        }}>
          <p style={{ margin: '0 0 6px 0', color: '#e5e7eb', fontSize: '0.9rem', fontWeight: '600' }}>
            {payload[0].name}
          </p>
          <p style={{ margin: 0, color: payload[0].fill, fontSize: '1.1rem', fontWeight: '700' }}>
            ₹{(payload[0].value / 1000000).toFixed(1)}M
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="chart-page reveal" style={{ position: 'relative', minHeight: '100vh', paddingBottom: '60px' }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '300px',
        background: 'radial-gradient(circle at 50% 0%, rgba(6, 182, 212, 0.15), transparent)',
        pointerEvents: 'none',
        zIndex: 0
      }} />
      
      <h1 className="panel-title gradient center" style={{ position: 'relative', zIndex: 1, marginBottom: '40px' }}>
        📊 Grant Sector Analytics
      </h1>

      <div className="chart-wrapper glassy" style={{ position: 'relative', zIndex: 1 }}>
        <div className="chart-decoration">
          <div className="chart-decoration-circle" />
        </div>
        
        <div className="chart-stats">
          <div className="stat" style={{
            background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(168, 85, 247, 0.1))',
            borderRadius: '12px',
            padding: '20px',
            border: '1px solid rgba(6, 182, 212, 0.2)'
          }}>
            <div className="stat-label">Total Grants</div>
            <div className="stat-value">{data.length}</div>
          </div>
          <div className="stat" style={{
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(59, 130, 246, 0.1))',
            borderRadius: '12px',
            padding: '20px',
            border: '1px solid rgba(16, 185, 129, 0.2)'
          }}>
            <div className="stat-label">Total Allocation</div>
            <div className="stat-value">₹{(total / 10000000).toFixed(1)}Cr</div>
          </div>
          <div className="stat" style={{
            background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.1), rgba(245, 158, 11, 0.1))',
            borderRadius: '12px',
            padding: '20px',
            border: '1px solid rgba(236, 72, 153, 0.2)'
          }}>
            <div className="stat-label">Sectors</div>
            <div className="stat-value">{data.length}</div>
          </div>
        </div>

        <div className="chart-container" style={{ height: '500px', position: 'relative', marginTop: '40px' }}>
          {/* 3D Shadow effect */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '350px',
            height: '350px',
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.1) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(30px)',
            zIndex: -1
          }} />
          
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie 
                data={data} 
                dataKey="value" 
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius="60"
                outerRadius="130"
                paddingAngle={3}
                onClick={(e) => navigate(`/sectors/${e.name}`)}
                animationBegin={0}
                animationDuration={800}
                animationEasing="ease-out"
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]}
                    style={{
                      filter: `drop-shadow(0 8px 16px rgba(0, 0, 0, 0.3))`,
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                verticalAlign="bottom" 
                height={36}
                wrapperStyle={{
                  paddingTop: '30px',
                  color: '#e5e7eb'
                }}
                iconType="circle"
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Interactive hint */}
        <div style={{
          marginTop: '40px',
          padding: '16px 20px',
          background: 'rgba(6, 182, 212, 0.05)',
          border: '1px solid rgba(6, 182, 212, 0.2)',
          borderRadius: '10px',
          color: '#a1a1aa',
          fontSize: '0.9rem',
          textAlign: 'center'
        }}>
          💡 Click on any sector segment to view detailed grants
        </div>
      </div>
    </div>
  );
}
