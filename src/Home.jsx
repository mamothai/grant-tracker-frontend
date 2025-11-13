import { Link } from "react-router-dom";
import "./App.css";
import "./scrollAnimations.css";

export default function Home() {
  return (
    <div className="home-scroll">

      {/* ===== HERO ===== */}
      <section className="fade-up">
        <div className="glassy hero-card">
          <h1 className="hero-title">
            <span className="muted">IN</span>{" "}
            <span className="gradient">GrantTracker Portal</span>
          </h1>

          <p className="hero-sub">
            Transparent monitoring of government grants with real-time updates
            and public visibility.
          </p>

          <div className="hero-buttons">
            <Link to="/creator-login" className="btn btn-primary hero-main-btn">
              Creator Login
            </Link>

            <Link to="/chart" className="btn btn-ghost hero-sub-btn">
              Public Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="section fade-up">
        <h2 className="section-title gradient">Why GrantTracker?</h2>

        <div className="features-grid">
          <div className="glassy feature-card float-up">
            <h3>📊 Real-time Tracking</h3>
            <p>Access live updates on government fund usage.</p>
          </div>

          <div className="glassy feature-card float-up delay-1">
            <h3>🔍 Search Grants Easily</h3>
            <p>Look up any grant using its unique Grant ID.</p>
          </div>

          <div className="glassy feature-card float-up delay-2">
            <h3>📑 Verified Data</h3>
            <p>Updates approved and submitted by officials.</p>
          </div>
        </div>
      </section>

      {/* ===== SEARCH GRANT ===== */}
      <section className="section fade-up">
        <h2 className="section-title gradient">Search Grant</h2>
        <p className="muted">Example: GT-2025-1024 or AGR-001</p>

        <div className="search-row">
          <input
            id="public-id"
            className="input"
            placeholder="Enter Grant ID"
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
