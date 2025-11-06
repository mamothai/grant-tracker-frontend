import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const SectorDetails = () => {
  const { sectorName } = useParams();
  const [grants, setGrants] = useState([]);

  // ✅ Same data used in chart (so clicking a slice loads same details)
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("grants") || "[]");

    const sampleGrants = [
      // Agriculture
      { id: "AGR-001", title: "PM Kisan Samman Nidhi", field: "Agriculture", amount: 60000 * 10000000, creator: "Ministry of Agriculture", description: "Provides ₹6,000 annual income support to farmers." },
      { id: "AGR-002", title: "Soil Health Card Scheme", field: "Agriculture", amount: 2500 * 10000000, creator: "Ministry of Agriculture", description: "Ensures better soil productivity through testing and awareness." },
      { id: "AGR-003", title: "Agriculture Infrastructure Fund", field: "Agriculture", amount: 33000 * 10000000, creator: "Department of Agriculture", description: "Funds post-harvest infrastructure projects across India." },
      { id: "AGR-004", title: "Pradhan Mantri Fasal Bima Yojana", field: "Agriculture", amount: 12000 * 10000000, creator: "Ministry of Agriculture", description: "Crop insurance scheme for farmers across India." },
      { id: "AGR-005", title: "National Food Security Mission", field: "Agriculture", amount: 5000 * 10000000, creator: "Dept. of Agriculture", description: "Enhances production of rice, wheat, pulses, and coarse cereals." },

      // Education
      { id: "EDU-001", title: "National Education Mission", field: "Education", amount: 38965 * 10000000, creator: "Ministry of Education", description: "Promotes inclusive and equitable quality education." },
      { id: "EDU-002", title: "PM eVIDYA", field: "Education", amount: 1800 * 10000000, creator: "Ministry of Education", description: "Digital education initiative to promote e-learning." },
      { id: "EDU-003", title: "Samagra Shiksha", field: "Education", amount: 37383 * 10000000, creator: "Ministry of Education", description: "School education program integrating SSA, RMSA, and TE." },
      { id: "EDU-004", title: "National Means-cum-Merit Scholarship", field: "Education", amount: 750 * 10000000, creator: "Ministry of HRD", description: "Scholarship scheme for meritorious students from weaker sections." },
      { id: "EDU-005", title: "IndiaAI FutureSkills Initiative", field: "Education", amount: 500 * 10000000, creator: "Ministry of Electronics and IT", description: "Trains 1M teachers in AI across India." },

      // Health
      { id: "HLT-001", title: "Ayushman Bharat (PM-JAY)", field: "Health", amount: 64000 * 10000000, creator: "Ministry of Health", description: "Provides health coverage up to ₹5 lakh per family per year." },
      { id: "HLT-002", title: "National Health Mission", field: "Health", amount: 37000 * 10000000, creator: "Ministry of Health", description: "Improves health systems and outcomes across India." },
      { id: "HLT-003", title: "PM Ayushman Bharat Digital Mission", field: "Health", amount: 1400 * 10000000, creator: "Ministry of Health", description: "Creates a digital health ecosystem for all citizens." },
      { id: "HLT-004", title: "Janani Suraksha Yojana", field: "Health", amount: 3000 * 10000000, creator: "Ministry of Health", description: "Promotes institutional deliveries to reduce maternal mortality." },
      { id: "HLT-005", title: "Mission Indradhanush", field: "Health", amount: 800 * 10000000, creator: "Ministry of Health", description: "Universal immunization of children under two years of age." },

      // Infrastructure
      { id: "INF-001", title: "Smart Cities Mission", field: "Infrastructure", amount: 48000 * 10000000, creator: "Ministry of Housing and Urban Affairs", description: "Develops 100 smart cities with modern infrastructure." },
      { id: "INF-002", title: "Bharatmala Pariyojana", field: "Infrastructure", amount: 531000 * 10000000, creator: "Ministry of Road Transport", description: "Improves road connectivity and logistics efficiency." },
      { id: "INF-003", title: "PM Gati Shakti", field: "Infrastructure", amount: 20000 * 10000000, creator: "NITI Aayog", description: "National master plan for multi-modal connectivity." },
      { id: "INF-004", title: "AMRUT 2.0", field: "Infrastructure", amount: 27600 * 10000000, creator: "Ministry of Urban Affairs", description: "Focuses on water supply and sewage systems." },
      { id: "INF-005", title: "Pradhan Mantri Awas Yojana (Urban)", field: "Infrastructure", amount: 80000 * 10000000, creator: "Ministry of Housing", description: "Affordable housing for all urban citizens by 2025." },

      // Environment
      { id: "ENV-001", title: "National Clean Air Programme", field: "Environment", amount: 472 * 10000000, creator: "Ministry of Environment", description: "Aims to reduce air pollution by 20–30% in cities by 2025." },
      { id: "ENV-002", title: "Green India Mission", field: "Environment", amount: 3000 * 10000000, creator: "Ministry of Environment", description: "Increases forest cover and ecosystem restoration." },
      { id: "ENV-003", title: "Namami Gange", field: "Environment", amount: 20000 * 10000000, creator: "Ministry of Jal Shakti", description: "Clean and rejuvenate River Ganga and its tributaries." },
      { id: "ENV-004", title: "Swachh Bharat Mission", field: "Environment", amount: 14100 * 10000000, creator: "Ministry of Urban Affairs", description: "Promotes cleanliness and waste management." },
      { id: "ENV-005", title: "National Mission on Himalayan Studies", field: "Environment", amount: 500 * 10000000, creator: "MoEFCC", description: "Supports research on Himalayan ecosystem and communities." },

      // Technology
      { id: "TEC-001", title: "Digital India Programme", field: "Technology", amount: 25000 * 10000000, creator: "Ministry of Electronics and IT", description: "Transforms India into a digitally empowered society." },
      { id: "TEC-002", title: "Startup India Seed Fund", field: "Technology", amount: 945 * 10000000, creator: "DPIIT", description: "Provides capital support to early-stage startups." },
      { id: "TEC-003", title: "National AI Mission", field: "Technology", amount: 10000 * 10000000, creator: "NITI Aayog", description: "Promotes research and deployment of AI applications." },
      { id: "TEC-004", title: "MeitY FutureSkills PRIME", field: "Technology", amount: 400 * 10000000, creator: "Ministry of IT", description: "Online skilling platform for emerging tech roles." },
      { id: "TEC-005", title: "Atal Innovation Mission", field: "Technology", amount: 700 * 10000000, creator: "NITI Aayog", description: "Encourages innovation and entrepreneurship across schools and MSMEs." },

      // Women & Child
      { id: "WOM-001", title: "Beti Bachao Beti Padhao", field: "Women & Child", amount: 1500 * 10000000, creator: "Ministry of WCD", description: "Promotes gender equality and girl child education." },
      { id: "WOM-002", title: "Pradhan Mantri Matru Vandana Yojana", field: "Women & Child", amount: 1200 * 10000000, creator: "Ministry of WCD", description: "Provides financial assistance to pregnant women." },
      { id: "WOM-003", title: "Poshan Abhiyaan", field: "Women & Child", amount: 9000 * 10000000, creator: "Ministry of WCD", description: "Improves nutritional outcomes for children and women." },
      { id: "WOM-004", title: "One Stop Centre Scheme", field: "Women & Child", amount: 700 * 10000000, creator: "Ministry of WCD", description: "Support for women affected by violence." },
      { id: "WOM-005", title: "Mission Shakti", field: "Women & Child", amount: 3000 * 10000000, creator: "Ministry of WCD", description: "Umbrella scheme for safety and empowerment of women." },
    ];

    setGrants([...sampleGrants, ...stored]);
  }, []);

  const filtered = grants.filter((g) => g.field === sectorName);

  return (
    <div className="flex-center">
      <div className="glass max-w-5xl w-full p-8">
        <h1 className="text-gradient text-3xl font-bold text-center mb-6">
          {sectorName} Grants
        </h1>

        {filtered.length ? (
          <div className="grid md:grid-cols-2 gap-6">
            {filtered.map((g) => (
              <div key={g.id} className="glass p-4 text-left">
                <h3 className="text-cyan text-xl font-bold mb-2">{g.title}</h3>
                <p className="text-sm text-gray mb-2"><strong>Grant ID:</strong> {g.id}</p>
                <p className="mb-1"><strong>Amount:</strong> ₹{g.amount.toLocaleString()}</p>
                <p className="mb-1"><strong>Implementing Body:</strong> {g.creator}</p>
                <p className="text-gray text-sm mt-2">{g.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray text-center">No grants found for this sector.</p>
        )}

        <Link to="/chart" className="btn-glass block text-center mt-8">
          ⬅ Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default SectorDetails;
