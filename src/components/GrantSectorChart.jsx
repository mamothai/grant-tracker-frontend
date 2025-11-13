import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useNavigate, Link } from "react-router-dom";
import emailjs from "@emailjs/browser";


ChartJS.register(ArcElement, Tooltip, Legend);

const GrantSectorChart = () => {
  const navigate = useNavigate();
  const [grants, setGrants] = useState([]);
  const [grantId, setGrantId] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  // ✅ Preloaded 50+ government grants
  const sampleGrants = [
    { id: "AGR-001", title: "PM Kisan Samman Nidhi", field: "Agriculture", amount: 60000 * 10000000, creator: "Ministry of Agriculture", description: "Provides ₹6,000 annual income support to farmers." },
    { id: "AGR-002", title: "Soil Health Card Scheme", field: "Agriculture", amount: 2500 * 10000000, creator: "Ministry of Agriculture", description: "Ensures better soil productivity through testing and awareness." },
    { id: "AGR-003", title: "Agriculture Infrastructure Fund", field: "Agriculture", amount: 33000 * 10000000, creator: "Department of Agriculture", description: "Funds post-harvest infrastructure projects across India." },
    { id: "AGR-004", title: "Pradhan Mantri Fasal Bima Yojana", field: "Agriculture", amount: 12000 * 10000000, creator: "Ministry of Agriculture", description: "Crop insurance scheme for farmers across India." },
    { id: "AGR-005", title: "National Food Security Mission", field: "Agriculture", amount: 5000 * 10000000, creator: "Dept. of Agriculture", description: "Enhances production of rice, wheat, pulses, and coarse cereals." },

    { id: "EDU-001", title: "National Education Mission", field: "Education", amount: 38965 * 10000000, creator: "Ministry of Education", description: "Promotes inclusive and equitable quality education." },
    { id: "EDU-002", title: "PM eVIDYA", field: "Education", amount: 1800 * 10000000, creator: "Ministry of Education", description: "Digital education initiative to promote e-learning." },
    { id: "EDU-003", title: "Samagra Shiksha", field: "Education", amount: 37383 * 10000000, creator: "Ministry of Education", description: "School education program integrating SSA, RMSA, and TE." },
    { id: "EDU-004", title: "National Means-cum-Merit Scholarship", field: "Education", amount: 750 * 10000000, creator: "Ministry of HRD", description: "Scholarship scheme for meritorious students from weaker sections." },
    { id: "EDU-005", title: "IndiaAI FutureSkills Initiative", field: "Education", amount: 500 * 10000000, creator: "Ministry of Electronics and IT", description: "Trains 1M teachers in AI across India." },

    { id: "HLT-001", title: "Ayushman Bharat (PM-JAY)", field: "Health", amount: 64000 * 10000000, creator: "Ministry of Health", description: "Provides health coverage up to ₹5 lakh per family per year." },
    { id: "HLT-002", title: "National Health Mission", field: "Health", amount: 37000 * 10000000, creator: "Ministry of Health", description: "Improves health systems and outcomes across India." },
    { id: "HLT-003", title: "PM Ayushman Bharat Digital Mission", field: "Health", amount: 1400 * 10000000, creator: "Ministry of Health", description: "Creates a digital health ecosystem for all citizens." },
    { id: "HLT-004", title: "Janani Suraksha Yojana", field: "Health", amount: 3000 * 10000000, creator: "Ministry of Health", description: "Promotes institutional deliveries to reduce maternal mortality." },
    { id: "HLT-005", title: "Mission Indradhanush", field: "Health", amount: 800 * 10000000, creator: "Ministry of Health", description: "Universal immunization of children under two years of age." },

    { id: "INF-001", title: "Smart Cities Mission", field: "Infrastructure", amount: 48000 * 10000000, creator: "Ministry of Housing and Urban Affairs", description: "Develops 100 smart cities with modern infrastructure." },
    { id: "INF-002", title: "Bharatmala Pariyojana", field: "Infrastructure", amount: 531000 * 10000000, creator: "Ministry of Road Transport", description: "Improves road connectivity and logistics efficiency." },
    { id: "INF-003", title: "PM Gati Shakti", field: "Infrastructure", amount: 20000 * 10000000, creator: "NITI Aayog", description: "National master plan for multi-modal connectivity." },
    { id: "INF-004", title: "AMRUT 2.0", field: "Infrastructure", amount: 27600 * 10000000, creator: "Ministry of Urban Affairs", description: "Focuses on water supply and sewage systems." },
    { id: "INF-005", title: "Pradhan Mantri Awas Yojana (Urban)", field: "Infrastructure", amount: 80000 * 10000000, creator: "Ministry of Housing", description: "Affordable housing for all urban citizens by 2025." },

    { id: "ENV-001", title: "National Clean Air Programme", field: "Environment", amount: 472 * 10000000, creator: "Ministry of Environment", description: "Aims to reduce air pollution by 20–30% in cities by 2025." },
    { id: "ENV-002", title: "Green India Mission", field: "Environment", amount: 3000 * 10000000, creator: "Ministry of Environment", description: "Increases forest cover and ecosystem restoration." },
    { id: "ENV-003", title: "Namami Gange", field: "Environment", amount: 20000 * 10000000, creator: "Ministry of Jal Shakti", description: "Clean and rejuvenate River Ganga and its tributaries." },
    { id: "ENV-004", title: "Swachh Bharat Mission", field: "Environment", amount: 14100 * 10000000, creator: "Ministry of Urban Affairs", description: "Promotes cleanliness and waste management." },
    { id: "ENV-005", title: "National Mission on Himalayan Studies", field: "Environment", amount: 500 * 10000000, creator: "MoEFCC", description: "Supports research on Himalayan ecosystem and communities." },
  ];

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem("grants") || "[]");
    setGrants([...sampleGrants, ...local]);
  }, []);

  // Pie chart
  const sectors = [...new Set(grants.map((g) => g.field))];
  const totals = sectors.map((s) =>
    grants.filter((g) => g.field === s).reduce((sum, g) => sum + g.amount, 0)
  );

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
          "#14b8a6",
          "#f43f5e",
          "#6366f1",
          "#eab308",
        ],
        borderColor: "#fff",
        borderWidth: 2,
        hoverOffset: 12,
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
      legend: { labels: { color: "#fff", font: { size: 13 } } },
    },
    maintainAspectRatio: false,
  };

  // ✅ Suggestion form using your EmailJS details
  const sendSuggestion = (e) => {
    e.preventDefault();

    if (!grantId || !message) {
      alert("Please enter a valid Grant ID and message.");
      return;
    }

    const templateParams = {
      grant_id: grantId,
      user_email: email || "Not provided",
      message,
      time: new Date().toLocaleString(),
    };

    emailjs
      .send("service_z7kypm9", "template_cpg9vb8", templateParams, "xuzHvsNOhfNKPlhfy")
      .then(
        () => {
          setStatus("✅ Suggestion sent successfully!");
          setGrantId("");
          setEmail("");
          setMessage("");
        },
        () => {
          setStatus("❌ Failed to send. Try again later.");
        }
      );
  };

  return (
    <div className="flex-center">
      <div className="glass max-w-6xl w-full text-center p-8">
        <h2 className="text-gradient text-3xl font-extrabold mb-6">
          Government Grants by Sector
        </h2>

        <div className="flex justify-center mb-8">
          <div style={{ width: "450px", height: "450px" }}>
            <Pie data={data} options={options} />
          </div>
        </div>

        <p className="text-gray mb-6">
          Click any sector to explore its detailed schemes and allocations.
        </p>

        {/* ✅ Suggestion Box */}
        <div className="glass max-w-xl mx-auto mt-12 p-8 text-center">
          <h2 className="text-gradient text-2xl font-bold mb-4">
            💬 Suggestion Box
          </h2>
          <p className="text-gray mb-6">
            Have feedback about a grant? Enter the Grant ID and your suggestion below.
          </p>

          <form onSubmit={sendSuggestion}>
            <input
              type="text"
              placeholder="Grant ID (e.g. AGR-002)"
              value={grantId}
              onChange={(e) => setGrantId(e.target.value)}
              className="w-full p-3 mb-4 rounded border-none outline-none text-black"
            />
            <input
              type="email"
              placeholder="Your Email (optional)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 mb-4 rounded border-none outline-none text-black"
            />
            <textarea
              placeholder="Write your suggestion or concern..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows="5"
              className="w-full p-3 mb-4 rounded border-none outline-none text-black"
            />
            <button type="submit" className="btn-primary w-full">
              Send Suggestion
            </button>
          </form>

          {status && <p className="text-sm mt-4">{status}</p>}
        </div>

        <Link to="/" className="btn-glass inline-block mt-8">
          ⬅ Back to Home
        </Link>
      </div>
    </div>
  );
};

export default GrantSectorChart;
