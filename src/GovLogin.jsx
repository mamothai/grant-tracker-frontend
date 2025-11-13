import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
    <main className="login-container fade-in">
      <div className="glassy login-card float-up">

        <h1 className="gradient" style={{ fontWeight: 800, fontSize: "2rem", marginBottom: "10px" }}>
          Govt Official Login
        </h1>

        <p className="muted" style={{ marginBottom: "25px" }}>
          Authorized personnel only
        </p>

        <input
          className="input mb-3"
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="input mb-4"
          type="password"
          placeholder="Password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />

        <button className="btn btn-primary w-full" style={{ width: "100%" }} onClick={handleLogin}>
          Login
        </button>

      </div>
    </main>
  );
}
