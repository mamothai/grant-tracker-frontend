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

  // Sample grant data with all sectors
  const sampleGrants = [
    // Agriculture
    { id: "AGR-001", title: "PM Kisan Samman Nidhi", field: "Agriculture", amount: 60000 * 10000000 },
    { id: "AGR-002", title: "Soil Health Card Scheme", field: "Agriculture", amount: 2500 * 10000000 },
    { id: "AGR-003", title: "Pradhan Mantri Fasal Bima Yojana", field: "Agriculture", amount: 18000 * 10000000 },
    // Education
    { id: "EDU-001", title: "Mid Day Meal Scheme", field: "Education", amount: 40000 * 10000000 },
    { id: "EDU-002", title: "Samagra Shiksha", field: "Education", amount: 30000 * 10000000 },
    { id: "EDU-003", title: "National Scholarship Scheme", field: "Education", amount: 15000 * 10000000 },
    // Health
    { id: "HEL-001", title: "Ayushman Bharat", field: "Health", amount: 60000 * 10000000 },
    { id: "HEL-002", title: "National Health Mission", field: "Health", amount: 50000 * 10000000 },
    { id: "HEL-003", title: "COVID-19 Vaccination Drive", field: "Health", amount: 35000 * 10000000 },
    // Infrastructure
    { id: "INF-001", title: "Pradhan Mantri Gram Sadak Yojana", field: "Infrastructure", amount: 45000 * 10000000 },
    { id: "INF-002", title: "Smart Cities Mission", field: "Infrastructure", amount: 25000 * 10000000 },
    // Environment
    { id: "ENV-001", title: "Swachh Bharat Mission", field: "Environment", amount: 30000 * 10000000 },
    { id: "ENV-002", title: "National Clean Air Programme", field: "Environment", amount: 8000 * 10000000 },
    // Technology
    { id: "TECH-001", title: "Digital India Programme", field: "Technology", amount: 35000 * 10000000 },
    { id: "TECH-002", title: "E-Governance Initiative", field: "Technology", amount: 12000 * 10000000 },
    // Women & Child
    { id: "WC-001", title: "ICDS - Integrated Child Development Services", field: "Women & Child", amount: 28000 * 10000000 },
    { id: "WC-002", title: "Ujjwala - Women's Safety Programme", field: "Women & Child", amount: 5000 * 10000000 },
  ];

  // Get real data from localStorage or use sample data
  const data = (() => {
    try {
      const grants = JSON.parse(localStorage.getItem("grants") || "[]");
      const storedGrants = grants.length > 0 ? grants : sampleGrants;
      
      // Group by field/sector
      const sectors = {};
      storedGrants.forEach(g => {
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
      // Fallback with sample data
      const sectors = {};
      sampleGrants.forEach(g => {
        const field = g.field || "General";
        if (!sectors[field]) {
          sectors[field] = 0;
        }
        sectors[field] += g.amount || 0;
      });

      return Object.entries(sectors).map(([name, value]) => ({
        name,
        value
      })).sort((a, b) => b.value - a.value);
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

      // Create animated background
      const time = Date.now() * 0.0001;
      const bgGradient1 = ctx.createLinearGradient(0, 0, width, height);
      bgGradient1.addColorStop(0, `rgba(6, 182, 212, ${0.08 + Math.sin(time) * 0.04})`);
      bgGradient1.addColorStop(0.5, `rgba(15, 23, 42, 0.95)`);
      bgGradient1.addColorStop(1, `rgba(168, 85, 247, ${0.08 + Math.cos(time) * 0.04})`);
      ctx.fillStyle = bgGradient1;
      ctx.fillRect(0, 0, width, height);

      // Animated radial background
      const bgGradient2 = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius * 2);
      bgGradient2.addColorStop(0, `rgba(6, 182, 212, ${0.12 + Math.sin(time * 1.5) * 0.06})`);
      bgGradient2.addColorStop(0.5, `rgba(168, 85, 247, ${0.08 + Math.cos(time * 1.2) * 0.04})`);
      bgGradient2.addColorStop(1, "rgba(15, 23, 42, 0)");
      ctx.fillStyle = bgGradient2;
      ctx.fillRect(0, 0, width, height);

      // Draw segments
      let currentAngle = rotation;
      data.forEach((item, index) => {
        const sliceAngle = (item.value / total) * Math.PI * 2;
        
        // Draw 3D segment with enhanced gradient
        drawSegment3D(ctx, centerX, centerY, radius, currentAngle, sliceAngle, COLORS[index % COLORS.length], index);
        currentAngle += sliceAngle;
      });

      // Draw enhanced gloss effect
      const glossGradient = ctx.createRadialGradient(
        centerX - radius * 0.35, 
        centerY - radius * 0.35, 
        0, 
        centerX, 
        centerY, 
        radius * 1.1
      );
      glossGradient.addColorStop(0, `rgba(255, 255, 255, ${0.2 + Math.sin(time * 2) * 0.1})`);
      glossGradient.addColorStop(0.3, "rgba(255, 255, 255, 0.05)");
      glossGradient.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = glossGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 1.1, 0, Math.PI * 2);
      ctx.fill();

      // Draw outer glow
      ctx.strokeStyle = `rgba(6, 182, 212, ${0.15 + Math.sin(time * 0.8) * 0.1})`;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 1.15, 0, Math.PI * 2);
      ctx.stroke();

      rotation += 0.005;
      animationId = requestAnimationFrame(drawGlobe);
    };

    const drawSegment3D = (ctx, centerX, centerY, radius, startAngle, sliceAngle, color, index) => {
      const endAngle = startAngle + sliceAngle;
      const time = Date.now() * 0.0001;
      
      // Multi-layer shadow for depth
      ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
      ctx.beginPath();
      ctx.arc(centerX + 6, centerY + 6, radius * 0.92, startAngle, endAngle);
      ctx.lineTo(centerX + 6, centerY + 6);
      ctx.fill();

      ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
      ctx.beginPath();
      ctx.arc(centerX + 3, centerY + 3, radius * 0.95, startAngle, endAngle);
      ctx.lineTo(centerX + 3, centerY + 3);
      ctx.fill();

      // Main segment with gradient fill
      const segmentGradient = ctx.createRadialGradient(
        centerX, centerY, radius * 0.5,
        centerX, centerY, radius
      );
      segmentGradient.addColorStop(0, adjustBrightness(color, 1.4));
      segmentGradient.addColorStop(0.5, color);
      segmentGradient.addColorStop(1, adjustBrightness(color, 0.6));
      ctx.fillStyle = segmentGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.lineTo(centerX, centerY);
      ctx.fill();

      // Animated inner highlight
      const highlightGradient = ctx.createRadialGradient(
        centerX - radius * 0.4, centerY - radius * 0.4, 0,
        centerX, centerY, radius
      );
      highlightGradient.addColorStop(0, `rgba(255, 255, 255, ${0.2 + Math.sin(time * (0.5 + index * 0.2)) * 0.15})`);
      highlightGradient.addColorStop(0.5, "rgba(255, 255, 255, 0.05)");
      highlightGradient.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = highlightGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.lineTo(centerX, centerY);
      ctx.fill();

      // Bright edge highlight
      ctx.strokeStyle = `rgba(255, 255, 255, ${0.4 + Math.sin(time * (1 + index * 0.3)) * 0.2})`;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.stroke();

      // Darker edge for depth
      ctx.strokeStyle = "rgba(0, 0, 0, 0.3)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(
        centerX + Math.cos(endAngle) * radius,
        centerY + Math.sin(endAngle) * radius
      );
      ctx.stroke();
    };

    const adjustBrightness = (color, factor) => {
      const hex = color.replace('#', '');
      const r = Math.min(255, Math.floor(parseInt(hex.substring(0, 2), 16) * factor));
      const g = Math.min(255, Math.floor(parseInt(hex.substring(2, 4), 16) * factor));
      const b = Math.min(255, Math.floor(parseInt(hex.substring(4, 6), 16) * factor));
      return `rgb(${r}, ${g}, ${b})`;
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
        🌐 Grant Distribution Across Sectors
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

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '40px', marginTop: '40px', alignItems: 'start' }}>
          {/* 3D Canvas Globe */}
          <div style={{
            position: 'relative',
            borderRadius: '20px',
            overflow: 'hidden',
            background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.08) 0%, rgba(15, 23, 42, 0.95) 50%, rgba(168, 85, 247, 0.08) 100%)',
            boxShadow: '0 0 60px rgba(6, 182, 212, 0.2), inset 0 0 60px rgba(6, 182, 212, 0.05)',
            border: '1px solid rgba(6, 182, 212, 0.2)',
            padding: '20px'
          }}>
            <div style={{
              position: 'absolute',
              inset: '20px',
              borderRadius: '12px',
              background: 'radial-gradient(circle at 30% 30%, rgba(6, 182, 212, 0.1), transparent 60%), radial-gradient(circle at 70% 70%, rgba(168, 85, 247, 0.1), transparent 60%)',
              pointerEvents: 'none'
            }} />
            <canvas
              ref={canvasRef}
              style={{
                width: '100%',
                height: '400px',
                display: 'block',
                cursor: 'pointer',
                borderRadius: '12px',
                position: 'relative',
                zIndex: 1
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
