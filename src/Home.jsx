import { Link } from "react-router-dom";
import "./App.css";

export default function Home() {
  return (
    <main className="home-scroll">
      {/* Hero Section */}
      <section id="hero" className="section hero-section">
        <div className="text-block">
          <h1 className="gradient" style={{ fontSize: "3rem", fontWeight: "800" }}>
            Welcome to GrantTracker
          </h1>
          <p className="muted text-lg">
            A transparent, digital way to monitor and manage government grants —
            connecting officials, creators, and the public for accountability.
          </p>
          <div className="cta-row" style={{ marginTop: "20px" }}>
            <Link to="/chart" className="btn btn-primary">
              Explore Dashboard
            </Link>
            <Link to="/creator-login" className="btn btn-ghost">
              Creator Login
            </Link>
          </div>
        </div>
        <img
          src="https://cdn-icons-png.flaticon.com/512/2631/2631335.png"
          alt="hero illustration"
          className="hero-img"
        />
      </section>

      {/* Public Dashboard Section */}
      <section id="public" className="section glassy fade-up">
        <div className="section-content">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3602/3602145.png"
            alt="dashboard"
            className="section-img"
          />
          <div className="text-block">
            <h2 className="gradient">Public Dashboard</h2>
            <p className="muted">
              Anyone can view live data and sector-wise allocation of government
              grants. It’s a transparent window into public spending.
            </p>
            <Link to="/chart" className="btn btn-primary mt-4">
              View Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* Creator Portal Section */}
      <section id="creator" className="section glassy fade-up">
        <div className="section-content reverse">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4712/4712105.png"
            alt="creator"
            className="section-img"
          />
          <div className="text-block">
            <h2 className="gradient">Creator Portal</h2>
            <p className="muted">
              Authorized creators can register new grants, assign budgets, and
              monitor progress. It’s secure, digital, and efficient.
            </p>
            <Link to="/creator-login" className="btn btn-primary mt-4">
              Creator Login
            </Link>
          </div>
        </div>
      </section>

      {/* Government Dashboard Section */}
      <section id="gov" className="section glassy fade-up">
        <div className="section-content">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2674/2674729.png"
            alt="gov"
            className="section-img"
          />
          <div className="text-block">
            <h2 className="gradient">Government Dashboard</h2>
            <p className="muted">
              Officials can update project progress, attach proofs, and keep
              citizens informed — ensuring real-time accountability.
            </p>
            <Link to="/gov-login" className="btn btn-primary mt-4">
              Official Login
            </Link>
          </div>
        </div>
      </section>

      {/* Feedback Section */}
      <section id="feedback" className="section glassy fade-up">
        <div className="section-content reverse">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2767/2767187.png"
            alt="feedback"
            className="section-img"
          />
          <div className="text-block">
            <h2 className="gradient">Public Suggestions</h2>
            <p className="muted">
              Citizens can submit feedback or suggestions for any grant ID —
              promoting open communication and collaboration.
            </p>
            <Link to="/chart#suggestions" className="btn btn-primary mt-4">
              Give Feedback
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
