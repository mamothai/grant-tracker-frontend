import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./App.css";

export default function CreatorLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    // Hidden but enforced creator credentials
    if (email === "arm.official168@gmail.com" && password === "Grant123!") {
      localStorage.setItem("creatorAuth", "true");
      navigate("/create-grant");
    } else {
      alert("❌ Invalid credentials");
    }
  };

  return (
    <main className="login-page reveal">
      <div className="login-page-container">
        <div className="login-left">
          <div className="login-hero">
            <h1 className="login-hero-title gradient">Creator Portal</h1>
            <p className="login-hero-subtitle muted">
              Register and manage grants with transparency and accountability.
            </p>
            <div className="login-features">
              <div className="login-feature">
                <div className="login-feature-icon">✨</div>
                <div className="login-feature-text">
                  <strong>Easy Grant Creation</strong>
                  <span>Quick and simple grant registration</span>
                </div>
              </div>
              <div className="login-feature">
                <div className="login-feature-icon">📊</div>
                <div className="login-feature-text">
                  <strong>Track Progress</strong>
                  <span>Monitor your grants in real-time</span>
                </div>
              </div>
              <div className="login-feature">
                <div className="login-feature-icon">🔒</div>
                <div className="login-feature-text">
                  <strong>Secure & Verified</strong>
                  <span>Blockchain-verified grant records</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="login-right">
          <div className="login-card glassy reveal-right">
            <div className="login-card-header">
              <div className="login-icon-wrapper">
                <span className="creator-dot"></span>
              </div>
              <h2 className="login-card-title gradient">Creator Login</h2>
              <p className="login-card-subtitle muted">
                Authorized personnel only — please log in to access the creator dashboard.
              </p>
            </div>

            <div className="login-form">
              <label className="form-label">Email Address</label>
              <input
                className="input"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <label className="form-label">Password</label>
              <input
                className="input"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                className="btn-primary login-btn"
                onClick={handleLogin}
              >
                Login to Dashboard
              </button>
            </div>

            <div className="login-footer">
              <Link to="/" className="login-footer-link">← Back to Home</Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
