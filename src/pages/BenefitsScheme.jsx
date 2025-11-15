import { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";

const schemesData = [
  {
    schemeName: "Beti Bachao Beti Padhao",
    category: "Women & Girl Child",
    launchedBy: "Government of India",
    launchDate: "22 January 2015",
    objectives: "Address declining child sex ratio, promote education and empowerment of girls.",
    benefits: ["Awareness campaigns", "Inter-ministerial coordination", "Girls' education support"],
    moreInfoLink: "https://www.highcourt.jharkhand.gov.in/jdc/sc.html"
  },
  {
    schemeName: "Sukanya Samriddhi Yojana",
    category: "Girl Child / Savings",
    launchedBy: "Government of India",
    launchDate: "22 January 2015",
    objectives: "Encourage parents of girl children to build a fund for her education/marriage.",
    benefits: ["High interest savings account", "Tax benefits", "For girl child up to age 10"],
    moreInfoLink: "https://cleartax.in/s/women-empowerment-schemes-in-india"
  },
  {
    schemeName: "Pradhan Mantri Matru Vandana Yojana (PMMVY)",
    category: "Women – Maternity & Health",
    launchedBy: "Government of India",
    launchDate: "2010 (renamed 2017)",
    objectives: "Provide maternity benefit to pregnant & lactating women for first live birth.",
    benefits: ["Cash transfer for women", "Improved health & nutrition", "Encourage institutional delivery"],
    moreInfoLink: "https://en.wikipedia.org/wiki/Pradhan_Mantri_Matri_Vandana_Yojana"
  },
  {
    schemeName: "Integrated Child Protection Scheme (ICPS)",
    category: "Children – Protection & Welfare",
    launchedBy: "Government of India",
    launchDate: "2009",
    objectives: "Provide institutional & non-institutional care to children in need of protection.",
    benefits: ["Child protection services", "Shelter homes", "Rehabilitation of vulnerable children"],
    moreInfoLink: "https://en.wikipedia.org/wiki/Integrated_Child_Protection_Scheme"
  },
  {
    schemeName: "PM CARES for Children",
    category: "Children – Welfare",
    launchedBy: "Government of India",
    launchDate: "29 May 2021",
    objectives: "Support children who lost parent/guardian to COVID-19 with health, education & financial security.",
    benefits: ["Financial support up to ₹10 lakh", "Health insurance cover", "Scholarship support"],
    moreInfoLink: "https://pmcaresforchildren.in/"
  },
  {
    schemeName: "Women Entrepreneurship Platform (WEP)",
    category: "Women – Entrepreneurship & Skill",
    launchedBy: "Government of India",
    launchDate: "—",
    objectives: "Enable women entrepreneurs via training, networking & funding support.",
    benefits: ["Skill upgradation", "Access to markets", "Funding & mentoring support"],
    moreInfoLink: "https://startupindia.gov.in/content/sih/en/women_entrepreneurs.html"
  },
  {
    schemeName: "Pradhan Mantri Suraksha Bima Yojana (PMSBY)",
    category: "General Welfare – Insurance",
    launchedBy: "Government of India",
    launchDate: "2015",
    objectives: "Provide affordable accident insurance cover to people in bank accounts.",
    benefits: ["Insurance cover ₹2 lakh for accidental death/full disability", "Low premium (₹20/year)"],
    moreInfoLink: "https://eshram.gov.in/social-security-welfare-schemes"
  },
  {
    schemeName: "Atal Pension Yojana (APY)",
    category: "General Welfare – Pension",
    launchedBy: "Government of India",
    launchDate: "2015",
    objectives: "Provide pension to citizens in unorganised sector post 60 years of age.",
    benefits: ["Guaranteed pension of ₹1,000-₹5,000/month", "Low contribution starting early age"],
    moreInfoLink: "https://eshram.gov.in/social-security-welfare-schemes"
  },
  {
    schemeName: "Sarva Shiksha Abhiyan (SSA)",
    category: "Children – Education",
    launchedBy: "Government of India",
    launchDate: "2001",
    objectives: "Universalise elementary education for children 6-14 years.",
    benefits: ["Free textbooks & uniforms", "New schools & teacher training", "Bridge courses for excluded children"],
    moreInfoLink: "https://en.wikipedia.org/wiki/Sarva_Shiksha_Abhiyan"
  },
  {
    schemeName: "Chief Minister's Girl Child Protection Scheme (Tamil Nadu)",
    category: "Girl Child Welfare",
    launchedBy: "Government of Tamil Nadu",
    launchDate: "1992",
    objectives: "Prevent gender discrimination, enforce later marriage for girls and encourage education.",
    benefits: ["Financial incentives for girls", "Education upto intermediate", "Promote family planning norms"],
    moreInfoLink: "https://www.tnsocialwelfare.tn.gov.in/website-345/en/specilisationschild-welfare/chief-ministers-girl-child-protection-scheme"
  },
  {
    schemeName: "MSME Scheme (Micro, Small & Medium Enterprises)",
    category: "General Welfare – Business/Entrepreneurs",
    launchedBy: "Government of India – Ministry of MSME",
    launchDate: "Ongoing scheme (various sub-schemes)",
    objectives: "Support micro, small and medium enterprises through registration, access to credit, subsidies, technology upgrades, market access and infrastructure.",
    benefits: [
      "Easier access to business loans at lower interest rates and collateral-free loans",
      "Subsidies and incentives for technology upgradation, ISO certification, bar-code registration, etc.",
      "Registration under the Udyam Registration Portal gives priority access to schemes, bank credit, and procurement benefits",
      "Protection from delayed payments from buyers (as per MSMED Act)",
      "Support for innovation, design, and export competitiveness (via sub-schemes like ZED certification)"
    ],
    moreInfoLink: "https://msme.gov.in/sites/default/files/MSME_Schemes_English_0.pdf"
  }
];

export default function BenefitsScheme() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Get unique categories
  const categories = ["All", ...new Set(schemesData.map(scheme => scheme.category))];

  // Filter schemes
  const filteredSchemes = schemesData.filter(scheme => {
    const matchesSearch = scheme.schemeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         scheme.objectives.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || scheme.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="benefits-page reveal">
      <div className="benefits-container">
        {/* Header */}
        <div className="benefits-header glassy">
          <div className="benefits-header-icon">🇮🇳</div>
          <h1 className="gradient benefits-title">Benefits Offered by Govt of India</h1>
          <p className="muted benefits-subtitle">
            Explore comprehensive government schemes and benefits designed to empower citizens across all sectors.
          </p>
          
          <div className="benefits-stats">
            <div className="benefits-stat">
              <div className="benefits-stat-value">{schemesData.length}</div>
              <div className="benefits-stat-label">Total Schemes</div>
            </div>
            <div className="benefits-stat">
              <div className="benefits-stat-value">{categories.length - 1}</div>
              <div className="benefits-stat-label">Categories</div>
            </div>
            <div className="benefits-stat">
              <div className="benefits-stat-value">100%</div>
              <div className="benefits-stat-label">Transparency</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="benefits-filters glassy">
          <div className="benefits-search">
            <div className="search-icon">🔍</div>
            <input
              type="text"
              placeholder="Search schemes..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="benefits-category-filters">
            {categories.map(category => (
              <button
                key={category}
                className={`category-filter-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Schemes Grid */}
        <div className="benefits-schemes-grid">
          {filteredSchemes.length > 0 ? (
            filteredSchemes.map((scheme, index) => (
              <div key={index} className="benefits-scheme-card glassy">
                <div className="scheme-card-header">
                  <div className="scheme-card-icon">
                    {scheme.category.includes("Women") ? "👩" : 
                     scheme.category.includes("Girl") ? "👧" : 
                     scheme.category.includes("Children") ? "🧒" : 
                     scheme.category.includes("Business") || scheme.category.includes("Entrepreneurs") ? "💼" :
                     scheme.category.includes("General") ? "🤝" : "📋"}
                  </div>
                  <div className="scheme-card-badge">{scheme.category}</div>
                </div>
                
                <h3 className="gradient scheme-card-title">{scheme.schemeName}</h3>
                
                <div className="scheme-card-info">
                  <div className="scheme-info-item">
                    <span className="scheme-info-label">Launched By:</span>
                    <span className="scheme-info-value">{scheme.launchedBy}</span>
                  </div>
                  <div className="scheme-info-item">
                    <span className="scheme-info-label">Launch Date:</span>
                    <span className="scheme-info-value">{scheme.launchDate}</span>
                  </div>
                </div>

                <div className="scheme-card-objectives">
                  <strong>Objectives:</strong>
                  <p className="muted">{scheme.objectives}</p>
                </div>

                <div className="scheme-card-benefits">
                  <strong>Key Benefits:</strong>
                  <ul className="benefits-list">
                    {scheme.benefits.map((benefit, idx) => (
                      <li key={idx} className="benefit-item">
                        <span className="benefit-icon">✓</span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href={scheme.moreInfoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="scheme-card-link"
                >
                  Learn More →
                </a>
              </div>
            ))
          ) : (
            <div className="benefits-no-results glassy">
              <div className="no-results-icon">🔍</div>
              <h3 className="gradient no-results-title">No Schemes Found</h3>
              <p className="muted no-results-text">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="benefits-footer">
          <Link to="/" className="login-footer-link">← Back to Home</Link>
        </div>
      </div>
    </div>
  );
}

