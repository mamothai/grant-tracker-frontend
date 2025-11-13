import { Link } from "react-router-dom";
import "./App.css";

export default function Home() {
  return (
    <div>

      {/* HERO SECTION */}
      <div className="hero-wrapper fade-up">
        <div className="hero-left float-up">
          <h1 className="hero-title gradient">GrantTracker Portal</h1>

          <p className="hero-sub">
            Streamlining transparency, empowering creators, and enabling
            real-time public visibility — all in one digital ecosystem.
          </p>

          <div className="hero-buttons">
            <Link to="/chart" className="btn-primary big-btn">
              Explore Dashboard
            </Link>

            <Link to="/creator-login" className="btn-ghost small-btn">
              Creator Login
            </Link>
          </div>
        </div>

        <div className="hero-right fade-right delay-1">
          <img
            src="https://i.ibb.co/dkXZVds/neon-network-icon.png"
            alt="icon"
            className="hero-icon"
          />
        </div>
      </div>

      {/* SCROLL SECTION 1 */}
      <section className="scroll-section fade-up">
        <h2 className="scroll-title gradient">Why GrantTracker?</h2>

        <p className="scroll-sub muted">
          A simple and powerful interface for citizens, creators and officials.
        </p>

        <div className="scroll-features">
          <div className="scroll-card glassy fade-left">
            <h3>📊 Real-time Analytics</h3>
            <p>View sector allocations and government spending instantly.</p>
          </div>

          <div className="scroll-card glassy fade-up delay-1">
            <h3>🔎 Transparency</h3>
            <p>Anyone can verify project progress and fund usage easily.</p>
          </div>

          <div className="scroll-card glassy fade-right delay-2">
            <h3>💬 Public Suggestions</h3>
            <p>Submit concerns tied to grant IDs directly to project creators.</p>
          </div>
        </div>
      </section>

      {/* SCROLL SECTION 2 */}
      <section className="scroll-section fade-up">
        <h2 className="scroll-title gradient">Quick Grant Lookup</h2>

        <div className="search-row fade-up">
          <input
            id="public-id"
            placeholder="Enter Grant ID (e.g. GT-2025-1024)"
            className="input"
          />
          <button
            className="btn-primary"
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
