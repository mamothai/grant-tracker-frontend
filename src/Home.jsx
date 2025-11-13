import { Link } from "react-router-dom";
import "./scrollAnimations.css";
import "./App.css";

export default function Home() {
  return (
    <div className="home-wrapper">

      {/* HERO SECTION — Clean + Lightweight */}
      <section className="hero-section fade-up">
        <div className="glassy hero-card float-up">

          <h1 className="hero-title">
            <span className="muted">IN</span>{" "}
            <span className="gradient">GrantTracker Portal</span>
          </h1>

          <p className="hero-sub">
            Monitor India’s government grants with real-time transparency,
            clear analytics, and public engagement tools.
          </p>

          <div className="cta-row">

            <Link to="/chart" className="btn btn-primary hero-btn">
              Explore Dashboard
            </Link>

            <Link to="/suggestions" className="btn btn-ghost hero-btn">
              Suggestion Box
            </Link>

          </div>
        </div>
      </section>


      {/* FEATURE SECTION — Clean original style */}
      <section className="section fade-in">
        <h2 className="section-title gradient">Why Use GrantTracker?</h2>

        <div className="features-grid">

          <div className="feature-card glassy float-up">
            <h3>📊 Real-Time Data</h3>
            <p>Accurate grant allocations with clean visualization.</p>
          </div>

          <div className="feature-card glassy float-up delay-1">
            <h3>🔍 Public Transparency</h3>
            <p>Direct insights into how government funds are used.</p>
          </div>

          <div className="feature-card glassy float-up delay-2">
            <h3>💬 Citizen Suggestions</h3>
            <p>Submit structured feedback tied to grant IDs.</p>
          </div>

        </div>
      </section>


      {/* SEARCH BAR — Clean and simple */}
      <section className="section fade-in">
        <h2 className="section-title gradient">Quick Grant Lookup</h2>

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

    </div>
  );
}
