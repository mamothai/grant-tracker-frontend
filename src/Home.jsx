// src/Home.jsx
import { Link } from "react-router-dom";
import "./App.css";

//
// 🔥 Premium Animated Gradient Icons
//

function IconNetwork() {
  return (
    <svg className="big-icon float-icon" viewBox="0 0 200 200">
      <defs>
        <linearGradient id="grad-net" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
      </defs>
      <circle cx="100" cy="30" r="12" stroke="url(#grad-net)" strokeWidth="6" fill="none"/>
      <circle cx="30" cy="100" r="12" stroke="url(#grad-net)" strokeWidth="6" fill="none"/>
      <circle cx="170" cy="100" r="12" stroke="url(#grad-net)" strokeWidth="6" fill="none"/>
      <circle cx="100" cy="170" r="12" stroke="url(#grad-net)" strokeWidth="6" fill="none"/>

      <line x1="100" y1="42" x2="100" y2="158" stroke="url(#grad-net)" strokeWidth="6"/>
      <line x1="42" y1="100" x2="158" y2="100" stroke="url(#grad-net)" strokeWidth="6"/>
      <line x1="55" y1="55" x2="145" y2="145" stroke="url(#grad-net)" strokeWidth="6"/>
      <line x1="145" y1="55" x2="55" y2="145" stroke="url(#grad-net)" strokeWidth="6"/>
    </svg>
  );
}

function IconLight() {
  return (
    <svg className="big-icon float-icon" viewBox="0 0 200 200">
      <defs>
        <linearGradient id="grad-light" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
      </defs>

      <circle cx="100" cy="70" r="40" stroke="url(#grad-light)" strokeWidth="8" fill="none"/>
      <line x1="100" y1="115" x2="100" y2="160" stroke="url(#grad-light)" strokeWidth="8"/>
      <line x1="100" y1="20" x2="100" y2="40" stroke="url(#grad-light)" strokeWidth="8"/>
      <line x1="50" y1="70" x2="70" y2="70" stroke="url(#grad-light)" strokeWidth="8"/>
      <line x1="130" y1="70" x2="150" y2="70" stroke="url(#grad-light)" strokeWidth="8"/>
    </svg>
  );
}

function IconCloud() {
  return (
    <svg className="big-icon float-icon" viewBox="0 0 200 200">
      <defs>
        <linearGradient id="grad-cloud" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
      </defs>

      <path
        d="M50 120 Q30 70 80 60 Q90 30 130 40 Q160 40 170 70 Q190 75 185 110 Q150 150 80 140 Q60 140 50 120"
        stroke="url(#grad-cloud)" strokeWidth="8" fill="none"
      />
    </svg>
  );
}

function IconBell() {
  return (
    <svg className="big-icon float-icon" viewBox="0 0 200 200">
      <defs>
        <linearGradient id="grad-bell" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
      </defs>

      <path
        d="M100 40 a40 40 0 0 0 -40 40 v30 a15 15 0 0 1 -8 10 l-8 6 h112 l-8 -6 a15 15 0 0 1 -8 -10 v-30 a40 40 0 0 0 -40 -40z"
        stroke="url(#grad-bell)" strokeWidth="8" fill="none"
      />
      <circle cx="100" cy="160" r="12" fill="url(#grad-bell)" />
    </svg>
  );
}

function IconRobot() {
  return (
    <svg className="big-icon float-icon" viewBox="0 0 200 200">
      <defs>
        <linearGradient id="grad-robot" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
      </defs>

      <rect x="60" y="50" width="80" height="70" rx="14"
        stroke="url(#grad-robot)" strokeWidth="8" fill="none" />

      <circle cx="85" cy="85" r="10" fill="url(#grad-robot)"/>
      <circle cx="115" cy="85" r="10" fill="url(#grad-robot)"/>

      <line x1="85" y1="110" x2="115" y2="110"
        stroke="url(#grad-robot)" strokeWidth="8"/>

      <rect x="85" y="130" width="30" height="20" rx="6"
        stroke="url(#grad-robot)" strokeWidth="8" fill="none" />
    </svg>
  );
}

//
// 🔥 FINAL HOME PAGE
//

export default function Home() {
  return (
    <main className="page-scroll">

      {/* HERO */}
      <section className="panel panel-hero reveal">
        <div className="panel-left">
          <h1 className="big-title gradient">GrantTracker Portal</h1>
          <p className="lead muted">
            A transparent digital system connecting officials, creators,  
            and the public with verified grant activity.
          </p>

          <div className="panel-ctas">
            <Link to="/chart" className="cta cta-primary wide-btn">Explore Dashboard</Link>

            <Link to="/creator-login" className="cta cta-secondary">
              <span className="creator-dot"></span> Creator Login
            </Link>
          </div>
        </div>

        <div className="panel-right reveal-right">
          <IconNetwork />
        </div>
      </section>

      {/* SUGGESTIONS */}
      <section className="panel reveal">
        <div className="panel-left">
          <h2 className="panel-title gradient">Public Suggestions</h2>
          <p className="muted">Submit feedback on any grant for better transparency.</p>
          <Link to="/suggestions" className="cta cta-primary">Submit Feedback</Link>
        </div>
        <div className="panel-right reveal-right delay">
          <IconLight />
        </div>
      </section>

      {/* GOV */}
      <section className="panel reveal">
        <div className="panel-left">
          <h2 className="panel-title gradient">Government Dashboard</h2>
          <p className="muted">Upload progress proofs, update milestones and maintain trust.</p>
          <Link to="/gov-login" className="cta cta-primary">Official Login</Link>
        </div>
        <div className="panel-right reveal-right delay-1">
          <IconCloud />
        </div>
      </section>

      {/* PUBLIC DASHBOARD */}
      <section className="panel reveal">
        <div className="panel-left">
          <h2 className="panel-title gradient">Public Dashboard</h2>
          <p className="muted">Explore live charts, grant distribution, and analytics.</p>
          <Link to="/chart" className="cta cta-primary">View Dashboard</Link>
        </div>
        <div className="panel-right reveal-right delay-2">
          <IconBell />
        </div>
      </section>

      {/* CREATOR */}
      <section className="panel reveal">
        <div className="panel-left">
          <h2 className="panel-title gradient">Creator Portal</h2>
          <p className="muted">Creators can register new grants and manage all entries.</p>
          <Link to="/creator-login" className="cta cta-primary">Creator Login</Link>
        </div>
        <div className="panel-right reveal-right delay-3">
          <IconRobot />
        </div>
      </section>

      <footer className="footer fade-in">
        Built with ❤️ by <span className="gradient-ink">GrantTracker Portal</span>
      </footer>

    </main>
  );
}
