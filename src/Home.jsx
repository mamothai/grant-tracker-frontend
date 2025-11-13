import { Link } from "react-router-dom";
import "./scrollAnimations.css";
import "./App.css";

export default function Home() {
  return (
    <div className="home-wrapper">

      {/* ================= HERO SECTION ================= */}
      <section className="hero-section fade-up">
        <div className="hero-content glassy float-up">
          <h1 className="hero-title">
            <span className="muted">IN</span>{" "}
            <span className="gradient">GrantTracker Portal</span>
          </h1>

          <p className="hero-sub">
            A transparent digital platform for monitoring India’s government grants,
            ensuring accountability and public visibility.
          </p>

          <div className="hero-buttons">
            <Link to="/chart" className="btn btn-primary">
              View Dashboard
            </Link>
            <Link to="/suggestions" className="btn btn-ghost">
              Suggestion Box
            </Link>
          </div>
        </div>
      </section>

      {/* ================= FEATURES SECTION ================= */}
      <section className="section fade-in">
        <h2 className="section-title gradient">Why GrantTracker?</h2>

        <div className="features-grid">
          <div className="feature-card glassy float-up">
            <h3 className="feature-title">📊 Real-time Data</h3>
            <p className="feature-text">
              Access up-to-date grant allocations, schemes, and sector-wide
              statistics in a clean visual dashboard.
            </p>
          </div>

          <div className="feature-card glassy float-up delay-1">
            <h3 className="feature-title">🔍 Public Transparency</h3>
            <p className="feature-text">
              View how public funds are used, updated by registered government officials.
            </p>
          </div>

          <div className="feature-card glassy float-up delay-2">
            <h3 className="feature-title">💬 Public Suggestions</h3>
            <p className="feature-text">
              Citizens can submit concerns or suggestions using a grant ID,
              directly reaching the project creator.
            </p>
          </div>
        </div>
      </section>

      {/* ================= SEARCH SECTION ================= */}
      <section className="section fade-in">
        <h2 className="section-title gradient">Quick Grant Lookup</h2>
        <p className="muted">Easily access grant details using its ID.</p>

        <div className="search-row">
          <input
            id="public-id"
            placeholder="Enter Grant ID (e.g. GT-2025-1024)"
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

      {/* ================= ABOUT SECTION ================= */}
      <section className="section fade-in">
        <h2 className="section-title gradient">About the Platform</h2>

        <p className="about-text">
          GrantTracker Portal is a modern digital system designed to bring
          clarity and structured monitoring to government-funded projects.
          Whether you're a citizen, creator, or official, our platform
          helps you track progress, review financial allocation,
          and contribute suggestions.
        </p>
      </section>

    </div>
  );
}
