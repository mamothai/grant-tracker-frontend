// src/components/GrantSectorChart.jsx
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
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
  const canvasRef = useRef(null);

  // Get real data from localStorage
  const data = (() => {
    try {
      const grants = JSON.parse(localStorage.getItem("grants") || "[]");
      
      // Group by field/sector
      const sectors = {};
      grants.forEach(g => {
        const field = g.field || "General";
        if (!sectors[field]) {
          sectors[field] = 0;
        }
        sectors[field] += g.amount || 0;
      });

      // Convert to array format
      return Object.entries(sectors).map(([name, value]) => ({
        name,
        value
      })).sort((a, b) => b.value - a.value);
    } catch (e) {
      console.error("Error loading grants:", e);
      return [
        { name: "Agriculture", value: 180000000000 },
        { name: "Education", value: 120000000000 },
        { name: "Health", value: 240000000000 },
        { name: "Infrastructure", value: 90000000000 },
        { name: "Environment", value: 60000000000 }
      ];
    }
  })();

  const total = data.reduce((s, d) => s + d.value, 0);

  // 3D Globe animation effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationId;
    let rotation = 0;

    const drawGlobe = () => {
      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.min(width, height) / 2.5;

      // Clear canvas with gradient
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius * 1.5);
      gradient.addColorStop(0, "rgba(15, 23, 42, 0)");
      gradient.addColorStop(1, "rgba(6, 182, 212, 0.1)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Draw segments
      let currentAngle = rotation;
      data.forEach((item, index) => {
        const sliceAngle = (item.value / total) * Math.PI * 2;
        
        // Draw 3D segment
        drawSegment3D(ctx, centerX, centerY, radius, currentAngle, sliceAngle, COLORS[index % COLORS.length]);
        currentAngle += sliceAngle;
      });

      // Draw gloss effect
      const glossGradient = ctx.createRadialGradient(
        centerX - radius * 0.3, 
        centerY - radius * 0.3, 
        0, 
        centerX, 
        centerY, 
        radius
      );
      glossGradient.addColorStop(0, "rgba(255, 255, 255, 0.15)");
      glossGradient.addColorStop(0.5, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = glossGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fill();

      rotation += 0.005;
      animationId = requestAnimationFrame(drawGlobe);
    };

    const drawSegment3D = (ctx, centerX, centerY, radius, startAngle, sliceAngle, color) => {
      const endAngle = startAngle + sliceAngle;
      
      // Draw shadow for 3D effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
      ctx.beginPath();
      ctx.arc(centerX + 4, centerY + 4, radius * 0.9, startAngle, endAngle);
      ctx.lineTo(centerX + 4, centerY + 4);
      ctx.fill();

      // Main segment
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.lineTo(centerX, centerY);
      ctx.fill();

      // Highlight edge
      ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.stroke();

      // Darker edge for depth
      ctx.strokeStyle = "rgba(0, 0, 0, 0.2)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(
        centerX + Math.cos(endAngle) * radius,
        centerY + Math.sin(endAngle) * radius
      );
      ctx.stroke();
    };

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    drawGlobe();

    return () => cancelAnimationFrame(animationId);
  }, [data, total]);

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
            ₹{(payload[0].value / 10000000).toFixed(1)}Cr
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
        🌐 Interactive Grant Sector Globe
      </h1>

      <div className="chart-wrapper glassy" style={{ position: 'relative', zIndex: 1 }}>
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

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginTop: '40px', alignItems: 'center' }}>
          {/* 3D Canvas Globe */}
          <div style={{
            position: 'relative',
            borderRadius: '16px',
            overflow: 'hidden',
            background: 'radial-gradient(circle at 50% 30%, rgba(6, 182, 212, 0.1), transparent)'
          }}>
            <canvas
              ref={canvasRef}
              style={{
                width: '100%',
                height: '400px',
                display: 'block',
                cursor: 'pointer'
              }}
            />
          </div>

          {/* Sector Breakdown */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <h3 className="gradient" style={{ margin: '0 0 16px 0', fontSize: '1.3rem' }}>Sector Breakdown</h3>
            {data.map((item, index) => (
              <div
                key={item.name}
                onClick={() => navigate(`/sectors/${item.name}`)}
                style={{
                  padding: '16px',
                  background: `linear-gradient(135deg, ${COLORS[index % COLORS.length]}15, ${COLORS[index % COLORS.length]}08)`,
                  border: `1px solid ${COLORS[index % COLORS.length]}30`,
                  borderRadius: '10px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateX(8px)';
                  e.currentTarget.style.boxShadow = `0 8px 16px ${COLORS[index % COLORS.length]}40`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateX(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div>
                  <p style={{ margin: 0, color: '#e5e7eb', fontWeight: '600', fontSize: '0.95rem' }}>
                    {item.name}
                  </p>
                  <p style={{ margin: '4px 0 0 0', color: '#a1a1aa', fontSize: '0.85rem' }}>
                    {((item.value / total) * 100).toFixed(1)}% of total
                  </p>
                </div>
                <div style={{
                  color: COLORS[index % COLORS.length],
                  fontWeight: '700',
                  fontSize: '1rem',
                  textAlign: 'right'
                }}>
                  ₹{(item.value / 10000000).toFixed(1)}Cr
                </div>
              </div>
            ))}
          </div>
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
          💡 Click on any sector to view detailed grants • The globe rotates continuously for a dynamic effect
        </div>
      </div>
    </div>
  );
}
