import { Link } from "react-router-dom";
import "./App.css";

export default function Home() {
  return (
    <div className="hero-wrapper fade-up">

      {/* LEFT SIDE */}
      <div className="hero-left float-up">
        <h1 className="hero-title gradient">
          GrantTracker Portal
        </h1>

        <p className="hero-sub">
          Streamlining transparency, empowering creators, and enabling real-time public visibility 
          — all in one digital ecosystem.
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

      {/* RIGHT SIDE ICON */}
      <div className="hero-right fade-up delay-1">
        <img 
          src="https://i.ibb.co/dkXZVds/neon-network-icon.png"
          alt="neon-icon"
          className="hero-icon"
        />
      </div>

    </div>
  );
}
