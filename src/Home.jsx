import { Link } from "react-router-dom";
import "./App.css";
import "./scrollAnimations.css"; // <-- new animation file

export default function Home() {
  return (
    <main className="home-scroll">

      {/* ---------- HERO PARALLAX ---------- */}
      <section id="hero" className="section hero-section fade-in-up">
        <div className="text-block slide-left">
          <h1 className="gradient" style={{ fontSize: "3.2rem", fontWeight: 800 }}>
            GrantTracker Portal
          </h1>
          <p className="muted text-lg" style={{ maxWidth: "500px" }}>
            Streamlining transparency, empowering creators, and enabling
            real-time public visibility — all in one digital ecosystem.
          </p>

          <div className="cta-row" style={{ display: "flex", gap: "12px", marginTop: "22px" }}>
            <Link to="/chart" className="btn btn-primary">
              Explore Dashboard
            </Link>
            <Link to="/creator-login" className="btn btn-ghost">
              Creator Login
            </Link>
          </div>

          {/* Floating icons */}
          <div className="floating-icons">
            <img src="https://cdn-icons-png.flaticon.com/512/4712/4712105.png" />
            <img src="https://cdn-icons-png.flaticon.com/512/3602/3602145.png" />
            <img src="https://cdn-icons-png.flaticon.com/512/2674/2674729.png" />
          </div>
        </div>

        <img
          src="https://cdn-icons-png.flaticon.com/512/2631/2631335.png"
          className="hero-img parallax"
        />
      </section>

      {/* ---------- COUNTERS SECTION ---------- */}
      <section className="section glassy fade-in-up">
        <div className="counter-container">
          <div className="counter-item pop-in">
            <h2 className="gradient counter" data-target="120">0</h2>
            <p className="muted">Active Grants</p>
          </div>
          <div className="counter-item pop-in delay-1">
            <h2 className="gradient counter" data-target="56000000">0</h2>
            <p className="muted">₹ Distributed</p>
          </div>
          <div className="counter-item pop-in delay-2">
            <h2 className="gradient counter" data-target="18">0</h2>
            <p className="muted">Sectors Covered</p>
          </div>
        </div>
      </section>

      {/* ---------- PUBLIC DASHBOARD ---------- */}
      <section id="public" className="section glassy fade-in-up">
        <div className="section-content">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3602/3602145.png"
            className="section-img slide-right"
          />

          <div className="text-block slide-left">
            <h2 className="gradient">Public Dashboard</h2>
            <p className="muted">
              Explore live charts, sector distribution and grant activity.
              Designed for transparency and public engagement.
            </p>

            <Link to="/chart" className="btn btn-primary mt-4">
              View Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- CREATOR PORTAL ---------- */}
      <section id="creator" className="section glassy fade-in-up">
        <div className="section-content reverse">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4712/4712105.png"
            className="section-img slide-left"
          />

          <div className="text-block slide-right">
            <h2 className="gradient">Creator Portal</h2>
            <p className="muted">
              Authorized creators can register new grants and manage all core entries.
              Secure, digital and powerful.
            </p>

            <Link to="/creator-login" className="btn btn-primary mt-4">
              Creator Login
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- GOVERNMENT DASHBOARD ---------- */}
      <section id="gov" className="section glassy fade-in-up">
        <div className="section-content">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2674/2674729.png"
            className="section-img slide-right"
          />

          <div className="text-block slide-left">
            <h2 className="gradient">Government Dashboard</h2>
            <p className="muted">
              Officials can upload progress proofs, update milestones, and maintain
              public trust with verified data.
            </p>

            <Link to="/gov-login" className="btn btn-primary mt-4">
              Official Login
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- FEEDBACK ---------- */}
      <section id="feedback" className="section glassy fade-in-up">
        <div className="section-content reverse">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2767/2767187.png"
            className="section-img slide-left"
          />

          <div className="text-block slide-right">
            <h2 className="gradient">Public Suggestions</h2>
            <p className="muted">
              Citizens can provide feedback or suggestions on any grant to ensure
              healthier communication and transparency.
            </p>

            <a href="/chart#suggestions" className="btn btn-primary mt-4">
              Submit Feedback
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
