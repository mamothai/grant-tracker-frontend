import { Link } from "react-router-dom";
import "./scrollAnimations.css";
import "./App.css";

export default function Home() {
  return (
    <div className="home-wrapper">

      {/* ================= HERO AREA ================= */}
      <section className="hero-section premium-hero">
        <div className="floating-sphere sphere-1"></div>
        <div className="floating-sphere sphere-2"></div>

        <div className="hero-inner fade-up">
          <h1 className="hero-title">
            <span className="muted">IN</span>{" "}
            <span className="gradient">GrantTracker Portal</span>
          </h1>

          <p className="hero-sub">
            Monitor India’s government grants with real-time transparency, 
            powerful analytics, and public engagement.
          </p>

          <div className="hero-buttons">
            <Link to="/chart" className="btn btn-primary">Explore Dashboard</Link>
            <Link to="/suggestions" className="btn btn-ghost">Suggestion Box</Link>
          </div>
        </div>

        <svg className="wave-svg" viewBox="0 0 1440 320">
          <path 
            fill="#4f46e5" 
            fillOpacity="0.3"
            d="M0,160L48,165.3C96,171,192,181,288,192C384,203,480,213,576,197.3C672,181,768,139,864,117.3C960,96,1056,96,1152,122.7C1248,149,1344,203,1392,229.3L1440,256V0H0Z"
          ></path>
        </svg>
      </section>



      {/* ================= SECTOR PREVIEW ================= */}
      <section className="section fade-in">
        <h2 className="section-title gradient">Explore Key Sectors</h2>

        <div className="preview-grid">
          <div className="preview-card glassy float-up">
            <div className="icon">🏥</div>
            <h3>Health</h3>
            <p>Track medical infrastructure grants, public health missions, and funding trends.</p>
          </div>

          <div className="preview-card glassy float-up delay-1">
            <div className="icon">📚</div>
            <h3>Education</h3>
            <p>View allocations for schools, digital learning, and youth empowerment.</p>
          </div>

          <div className="preview-card glassy float-up delay-2">
            <div className="icon">🌾</div>
            <h3>Agriculture</h3>
            <p>Check crop subsidies, farmer schemes, irrigation projects and more.</p>
          </div>
        </div>

        <Link to="/chart" className="btn btn-primary center-btn">View All Sectors</Link>
      </section>



      {/* ================= HOW IT WORKS ================= */}
      <section className="section fade-in">
        <h2 className="section-title gradient">How GrantTracker Works</h2>

        <div className="timeline">
          <div className="timeline-item glassy float-up">
            <span className="step-number">1</span>
            <h3>Grant Created</h3>
            <p>The creator registers a new grant with budget, sectors and details.</p>
          </div>

          <div className="timeline-item glassy float-up delay-1">
            <span className="step-number">2</span>
            <h3>Gov Official Updates</h3>
            <p>Authorized officers upload progress, documents and milestone proofs.</p>
          </div>

          <div className="timeline-item glassy float-up delay-2">
            <span className="step-number">3</span>
            <h3>Public Transparency</h3>
            <p>Citizens can view updates and provide suggestions for improvements.</p>
          </div>
        </div>
      </section>



      {/* ================= SEARCH ================= */}
      <section className="section fade-in">
        <h2 className="section-title gradient">Quick Grant Lookup</h2>

        <p className="muted">Enter a grant ID to instantly view its details.</p>

        <div className="search-row">
          <input 
            id="public-id"
            placeholder="e.g. GT-2025-1024"
            className="input"
          />
          <button
            className="btn btn-primary"
            onClick={() => {
              const id = document.getElementById("public-id").value.trim();
              if (!id) return alert("Please enter a Grant ID");
              window.location.href = `/view/${encodeURIComponent(id)}`;
            }}
          >
            View
          </button>
        </div>
      </section>



      {/* ================= CALL TO ACTION ================= */}
      <section className="cta-section fade-in">
        <div className="cta-card glassy float-up">
          <h2 className="gradient">Help Build Transparency</h2>
          <p>
            Contribute by exploring grants or sending suggestions to improve 
            public projects.
          </p>

          <div className="cta-buttons">
            <Link to="/chart" className="btn btn-primary">Open Dashboard</Link>
            <Link to="/suggestions" className="btn btn-ghost">Submit Suggestion</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
