import { useState } from "react";
import { Link } from "react-router-dom";
import { GRANTS } from "../data/grants";
import "../App.css";

// Transform GRANTS data to match the expected format
const schemesData = GRANTS.map(grant => ({
  schemeName: grant.name,
  category: grant.sector,
  launchedBy: "Government of India",
  launchDate: grant.yearLaunched || "Ongoing",
  objectives: grant.description,
  benefits: [grant.amount, grant.details].filter(Boolean),
  moreInfoLink: grant.officialLink || "#"
}));

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
                    {scheme.category.includes("Agriculture") ? "🌾" : 
                     scheme.category.includes("Education") ? "📚" : 
                     scheme.category.includes("Health") ? "⚕️" : 
                     scheme.category.includes("Infrastructure") ? "🏗️" : 
                     scheme.category.includes("Environment") ? "🌱" : 
                     scheme.category.includes("Technology") ? "💻" : 
                     scheme.category.includes("Women & Child") ? "👨‍👩‍👧" : "📋"}
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
                  style={{
                    display: 'inline-block',
                    padding: '8px 16px',
                    background: 'linear-gradient(135deg, #06b6d4, #a855f7)',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '8px',
                    fontWeight: '600',
                    marginTop: '16px',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(6, 182, 212, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
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
