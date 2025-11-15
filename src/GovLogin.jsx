import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./App.css";

export default function GovLogin() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email === "gov@grant.in" && pass === "Secure123!") {
      localStorage.setItem("govAuth", "true");
      navigate("/gov-dashboard");
    } else {
      alert("❌ Invalid credentials");
    }
  };

  return (
    <main className="login-page reveal">
      <div className="login-page-container">
        <div className="login-left gov-login-left">
          <div className="login-hero">
            <h1 className="login-hero-title gradient">Government Dashboard</h1>
            <p className="login-hero-subtitle muted">
              Upload proofs, update milestones, and maintain trust through transparent governance.
            </p>
            <div className="login-features">
              <div className="login-feature">
                <div className="login-feature-icon">📋</div>
                <div className="login-feature-text">
                  <strong>Upload Proofs</strong>
                  <span>Document grant milestones securely</span>
                </div>
              </div>
              <div className="login-feature">
                <div className="login-feature-icon">✅</div>
                <div className="login-feature-text">
                  <strong>Verify Grants</strong>
                  <span>Review and validate grant applications</span>
                </div>
              </div>
              <div className="login-feature">
                <div className="login-feature-icon">📈</div>
                <div className="login-feature-text">
                  <strong>Monitor Progress</strong>
                  <span>Track grant implementation status</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="login-right">
          <div className="login-card glassy reveal-right">
            <div className="login-card-header">
              <div className="login-icon-wrapper gov-icon">
                🏛️
              </div>
              <h2 className="login-card-title gradient">Govt Official Login</h2>
              <p className="login-card-subtitle muted">
                Authorized personnel only — secure access to government portal.
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
                value={pass}
                onChange={(e) => setPass(e.target.value)}
              />

              <button
                className="btn-primary login-btn"
                onClick={handleLogin}
              >
                Access Dashboard
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
