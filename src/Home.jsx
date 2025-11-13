// src/Home.jsx
import { Link } from "react-router-dom";
import "./App.css";

/* ---------------- ICONS ---------------- */

function IconNetwork() {
  return (
    <svg className="big-icon" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="g1" x1="0" x2="1">
          <stop offset="0" stopColor="#06b6d4" />
          <stop offset="1" stopColor="#a855f7" />
        </linearGradient>
      </defs>

      <g stroke="url(#g1)" strokeWidth="4" fill="none" strokeLinecap="round">
        <circle cx="60" cy="20" r="8" />
        <circle cx="20" cy="60" r="8" />
        <circle cx="60" cy="100" r="8" />
        <circle cx="100" cy="60" r="8" />
        <path d="M60 28 L60 92" />
        <path d="M28 60 L92 60" />
        <path d="M34 34 L86 86" />
        <path d="M86 34 L34 86" />
      </g>
    </svg>
  );
}

function IconLight() {
  return (
    <svg className="big-icon" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="g2" x1="0" x2="1">
          <stop offset="0" stopColor="#06b6d4" />
          <stop offset="1" stopColor="#a855f7" />
        </linearGradient>
      </defs>

      <g stroke="url(#g2)" strokeWidth="4" fill="none" strokeLinecap="round">
        <path d="M60 20 a18 18 0 0 1 18 18 18 18 0 0 1 -18 18 18 18 0 0 1 -18 -18 18 18 0 0 1 18 -18z" />
        <path d="M50 56 L70 56" />
        <path d="M58 72 L62 72 L62 88 L58 88 Z" />
        <path d="M60 6 L60 18" />
        <path d="M30 36 L40 44" />
        <path d="M90 36 L80 44" />
      </g>
    </svg>
  );
}

function IconCloud() {
  return (
    <svg className="big-icon" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="g3" x1="0" x2="1">
          <stop offset="0" stopColor="#06b6d4" />
          <stop offset="1" stopColor="#a855f7" />
        </linearGradient>
      </defs>

      <g stroke="url(#g3)" strokeWidth="4" fill="none" strokeLinecap="round">
        <path d="M30 70 Q20 50 40 44 Q45 30 62 32 Q78 22 92 38 Q106 45 100 62 Q110 66 102 76 Q70 92 30 70 Z" />
      </g>
    </svg>
  );
}

function IconBell() {
  return (
    <svg className="big-icon" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="g4" x1="0" x2="1">
          <stop offset="0" stopColor="#06b6d4" />
          <stop offset="1" stopColor="#a855f7" />
        </linearGradient>
      </defs>

      <g stroke="url(#g4)" strokeWidth="4" fill="none" strokeLinecap="round">
        <path d="M60 26 a20 20 0 0 0 -20 20 v12 a8 8 0 0 1 -4 6 l-4 4 72 0 -4 -4 a8 8 0 0 1 -4 -6 V46 a20 20 0 0 0 -20 -20z"/>
        <circle cx="60" cy="92" r="6" fill="url(#g4)" />
      </g>
    </svg>
  );
}

function IconRobot() {
  return (
    <svg className="big-icon" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="g5" x1="0" x2="1">
          <stop offset="0" stopColor="#06b6d4" />
          <stop offset="1" stopColor="#a855f7" />
        </linearGradient>
      </defs>

      <g stroke="url(#g5)" strokeWidth="4" fill="none" strokeLinecap="round">
        <rect x="36" y="30" width="48" height="44" rx="8" />
        <circle cx="52" cy="50" r="4" fill="url(#g5)"/>
        <circle cx="68" cy="50" r="4" fill="url(#g5)"/>
        <path d="M52 70 L68 70" />
        <path d="M46 26 L46 18" />
        <path d="M74 26 L74 18" />
        <rect x="50" y="76" width="20" height="12" rx="4" />
      </g>
    </svg>
  );
}

/* ---------------- HOME PAGE ---------------- */

export default function Home() {
  return (
    <main className="page-scroll">

      {/* HERO */}
      <section className="panel panel-hero reveal" id="panel-hero">
        <div className="panel-left">
          <h1 className="big-title gradient">GrantTracker Portal</h1>
          <p className="lead muted">
            Streamlining transparency, empowering creators, and enabling real-time public visibility — all in one digital ecosystem.
          </p>

          <div className="panel-ctas">
            <Link to="/chart" className="cta cta-primary">Explore Dashboard</Link>
            <Link to="/creator-login" className="cta cta-ghost">Creator Login</Link>
          </div>
        </div>

        <div className="panel-right reveal-right">
          <IconNetwork />
        </div>
      </section>

      {/* SUGGESTIONS */}
      <section className="panel panel-suggest reveal">
        <div className="panel-left">
          <h2 className="panel-title gradient">Public Suggestions</h2>
          <p className="muted">Citizens can provide feedback or suggestions on any grant to ensure healthier communication and transparency.</p>
          <Link to="/suggestions" className="cta cta-primary">Submit Feedback</Link>
        </div>

        <div className="panel-right reveal-right delay">
          <IconLight />
        </div>
      </section>

      {/* GOV DASHBOARD */}
      <section className="panel panel-gov reveal">
        <div className="panel-left">
          <h2 className="panel-title gradient">Government Dashboard</h2>
          <p className="muted">Officials can upload progress proofs, update milestones, and maintain public trust with verified data.</p>
          <Link to="/gov-login" className="cta cta-primary">Official Login</Link>
        </div>

        <div className="panel-right reveal-right delay-1">
          <IconCloud />
        </div>
      </section>

      {/* PUBLIC DASHBOARD */}
      <section className="panel panel-public reveal">
        <div className="panel-left">
          <h2 className="panel-title gradient">Public Dashboard</h2>
          <p className="muted">Explore live charts, sector distribution and grant activity. Designed for transparency and public engagement.</p>
          <Link to="/chart" className="cta cta-primary">View Dashboard</Link>
        </div>

        <div className="panel-right reveal-right delay-2">
          <IconBell />
        </div>
      </section>

      {/* CREATOR PORTAL */}
      <section className="panel panel-creator reveal">
        <div className="panel-left">
          <h2 className="panel-title gradient">Creator Portal</h2>
          <p className="muted">Authorized creators can register new grants and manage all core entries. Secure, digital and powerful.</p>
          <Link to="/creator-login" className="cta cta-primary">Creator Login</Link>
        </div>

        <div className="panel-right reveal-right delay-3">
          <IconRobot />
        </div>
      </section>

    </main>
  );
}
