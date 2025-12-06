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
    moreInfoLink: "https://www.wcd.nic.in/schemes/beti-bachao-beti-padhao"
  },
  {
    schemeName: "Sukanya Samriddhi Yojana",
    category: "Girl Child / Savings",
    launchedBy: "Government of India",
    launchDate: "22 January 2015",
    objectives: "Encourage parents of girl children to build a fund for her education/marriage.",
    benefits: ["High interest savings account", "Tax benefits", "For girl child up to age 10"],
    moreInfoLink: "https://www.indiapost.gov.in/Financial_Services/Schemes_Information/Sukanya_Samriddhi_Account.aspx"
  },
  {
    schemeName: "Pradhan Mantri Matru Vandana Yojana (PMMVY)",
    category: "Women – Maternity & Health",
    launchedBy: "Government of India",
    launchDate: "2010 (renamed 2017)",
    objectives: "Provide maternity benefit to pregnant & lactating women for first live birth.",
    benefits: ["Cash transfer for women", "Improved health & nutrition", "Encourage institutional delivery"],
    moreInfoLink: "https://www.wcd.nic.in/schemes/pradhan-mantri-matru-vandana-yojana"
  },
  {
    schemeName: "Integrated Child Protection Scheme (ICPS)",
    category: "Children – Protection & Welfare",
    launchedBy: "Government of India",
    launchDate: "2009",
    objectives: "Provide institutional & non-institutional care to children in need of protection.",
    benefits: ["Child protection services", "Shelter homes", "Rehabilitation of vulnerable children"],
    moreInfoLink: "https://www.wcd.nic.in/schemes/integrated-child-protection-scheme-icps"
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
    launchDate: "2016",
    objectives: "Enable women entrepreneurs via training, networking & funding support.",
    benefits: ["Skill upgradation", "Access to markets", "Funding & mentoring support"],
    moreInfoLink: "https://www.wep.gov.in/"
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
    moreInfoLink: "https://enps.nsdl.com/"
  },
  {
    schemeName: "Sarva Shiksha Abhiyan (SSA)",
    category: "Children – Education",
    launchedBy: "Government of India",
    launchDate: "2001",
    objectives: "Universalise elementary education for children 6-14 years.",
    benefits: ["Free textbooks & uniforms", "New schools & teacher training", "Bridge courses for excluded children"],
    moreInfoLink: "https://www.education.gov.in/ssa"
  },
  {
    schemeName: "Chief Minister's Girl Child Protection Scheme (Tamil Nadu)",
    category: "Girl Child Welfare",
    launchedBy: "Government of Tamil Nadu",
    launchDate: "1992",
    objectives: "Prevent gender discrimination, enforce later marriage for girls and encourage education.",
    benefits: ["Financial incentives for girls", "Education upto intermediate", "Promote family planning norms"],
    moreInfoLink: "https://www.tnsocialwelfare.tn.gov.in/"
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
    moreInfoLink: "https://www.msme.gov.in/"
  },
  // Additional schemes with official government links
  {
    schemeName: "Pradhan Mantri Jan Dhan Yojana",
    category: "General Welfare – Financial Inclusion",
    launchedBy: "Government of India",
    launchDate: "2014",
    objectives: "Ensure access to financial services, particularly in rural areas.",
    benefits: ["Zero balance bank account", "Debit card", "Life insurance cover", "Accidental insurance cover"],
    moreInfoLink: "https://pmjdy.gov.in/"
  },
  {
    schemeName: "MUDRA Yojana",
    category: "General Welfare – Business/Entrepreneurs",
    launchedBy: "Government of India",
    launchDate: "2015",
    objectives: "Provide micro finance to non-corporate, non-farm small/micro enterprises.",
    benefits: ["Loans up to ₹10 lakh", "Three categories: Shishu, Kishor, Tarun", "Collateral-free loans"],
    moreInfoLink: "https://www.mudra.org.in/"
  },
  {
    schemeName: "Skill India Mission",
    category: "General Welfare – Skill Development",
    launchedBy: "Government of India",
    launchDate: "2015",
    objectives: "Skill the youth of India to enable them to get employment and entrepreneurship.",
    benefits: ["Skill development programs", "Industry partnerships", "Job placement assistance"],
    moreInfoLink: "https://www.skillindia.gov.in/"
  },
  {
    schemeName: "Make in India",
    category: "General Welfare – Manufacturing",
    launchedBy: "Government of India",
    launchDate: "2014",
    objectives: "Transform India into a global design and manufacturing hub.",
    benefits: ["Investment facilitation", "Technology transfer", "Manufacturing incentives"],
    moreInfoLink: "https://www.makeinindia.com/"
  },
  {
    schemeName: "Startup India",
    category: "General Welfare – Entrepreneurship",
    launchedBy: "Government of India",
    launchDate: "2016",
    objectives: "Promote entrepreneurship culture and create jobs.",
    benefits: ["Tax exemptions", "Fast-track patent examination", "Self-certification for labor laws"],
    moreInfoLink: "https://www.startupindia.gov.in/"
  },
  {
    schemeName: "Pradhan Mantri Awas Yojana (Gramin)",
    category: "General Welfare – Housing",
    launchedBy: "Government of India",
    launchDate: "2016",
    objectives: "Provide affordable housing to all rural households.",
    benefits: ["Construction assistance", "Toilet construction support", "Free house registration"],
    moreInfoLink: "https://pmayg.nic.in/"
  },
  {
    schemeName: "National Rural Employment Guarantee Act (MGNREGA)",
    category: "General Welfare – Employment",
    launchedBy: "Government of India",
    launchDate: "2005",
    objectives: "Guarantee 100 days of employment to rural households.",
    benefits: ["100 days guaranteed employment", "Wage employment", "Infrastructure development"],
    moreInfoLink: "https://nrega.nic.in/"
  },
  {
    schemeName: "Deen Dayal Upadhyaya Grameen Kaushalya Yojana (DDU-GKY)",
    category: "General Welfare – Skill Development",
    launchedBy: "Government of India",
    launchDate: "2014",
    objectives: "Provide skill training and placement to rural youth.",
    benefits: ["Skill training programs", "Placement assistance", "Living allowance during training"],
    moreInfoLink: "https://ddugky.gov.in/"
  },
  {
    schemeName: "National Rural Health Mission (NRHM)",
    category: "Health – Rural Healthcare",
    launchedBy: "Government of India",
    launchDate: "2005",
    objectives: "Improve health outcomes in rural areas.",
    benefits: ["Community health centers", "Accredited social health activists", "Mobile medical units"],
    moreInfoLink: "https://nhm.gov.in/"
  },
  {
    schemeName: "Rashtriya Swasthya Bima Yojana (RSBY)",
    category: "Health – Insurance",
    launchedBy: "Government of India",
    launchDate: "2008",
    objectives: "Provide health insurance to Below Poverty Line families.",
    benefits: ["₹30,000 annual health insurance", "Cashless treatment", "Portability across states"],
    moreInfoLink: "https://www.rsby.gov.in/"
  },
  {
    schemeName: "Janani Shishu Suraksha Karyakram (JSSK)",
    category: "Health – Maternal Health",
    launchedBy: "Government of India",
    launchDate: "2011",
    objectives: "Eliminate out-of-pocket expenses for pregnant women and sick newborns.",
    benefits: ["Free delivery", "Free medicines", "Free diagnostics", "Free transport"],
    moreInfoLink: "https://www.nhm.gov.in/"
  },
  {
    schemeName: "Pradhan Mantri Kaushal Vikas Yojana (PMKVY)",
    category: "General Welfare – Skill Development",
    launchedBy: "Government of India",
    launchDate: "2015",
    objectives: "Enable Indian youth to take up industry-relevant skill training.",
    benefits: ["Short term training", "Recognition of prior learning", "Placement assistance"],
    moreInfoLink: "https://www.pmkvyofficial.org/"
  },
  {
    schemeName: "National Programme for Control of Blindness (NPCB)",
    category: "Health – Eye Care",
    launchedBy: "Government of India",
    launchDate: "1976",
    objectives: "Reduce blindness prevalence to 0.3% by 2020.",
    benefits: ["Free cataract surgery", "Eye screening camps", "Training of eye care personnel"],
    moreInfoLink: "https://npcb.nic.in/"
  },
  {
    schemeName: "National Programme for Health Care of the Elderly (NPHCE)",
    category: "Health – Elderly Care",
    launchedBy: "Government of India",
    launchDate: "2010",
    objectives: "provide comprehensive healthcare to elderly people.",
    benefits: ["Geriatric care", "Specialized medical units", "Home-based care"],
    moreInfoLink: "https://nhm.gov.in/"
  },
  {
    schemeName: "Pradhan Mantri Ujjwala Yojana (PMUY)",
    category: "Women & Child – Health & Environment",
    launchedBy: "Government of India",
    launchDate: "2016",
    objectives: "Provide LPG connections to women from below poverty line families.",
    benefits: ["Free LPG connection", "Subsidized cooking gas", "Health and environmental benefits"],
    moreInfoLink: "https://www.pmujjwalayojana.com/"
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
                     scheme.category.includes("General") ? "🤝" : 
                     scheme.category.includes("Health") ? "🏥" : "📋"}
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
