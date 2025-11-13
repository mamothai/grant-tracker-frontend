import { Link } from "react-router-dom";
import "./scrollAnimations.css";
import "./App.css";

export default function Home() {
  return (
    <div className="home">

      {/* HERO SECTION */}
      <section className="hero-section fade-up">
        <div className="glassy hero-box float-up">
          <h1 className="hero-title">
            <span className="muted">IN</span>{" "}
            <span className="gradient">GrantTracker Portal</span>
          </h1>

          <p className="hero-sub">
            Transparent monitoring of India’s government grants with powerful dashboards,
            real-time updates, and public accountability.
          </p>

          <div className="hero-buttons">
            <Link to="/chart" className="btn btn-primary hero-main-btn">
              Explore Dashboard
            </Link>

            <Link to="/suggestions" className="btn btn-ghost hero-sub-btn">
              Suggestion Box
            </Link>
          </div>
        </div>
      </section>


      {/* SEARCH SECTION */}
      <section className="search-section fade-up">
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
