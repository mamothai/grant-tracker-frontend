import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreatorLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email === "arm.official168@gmail.com" && password === "Grant123!") {
      localStorage.setItem("creatorAuth", "true");
      alert("✅ Logged in successfully!");
      navigate("/create-grant");
    } else {
      alert("❌ Invalid credentials.\nUse arm.official168@gmail.com / Grant123!");
    }
  };

  return (
    <main className="container fade-up">
      <div className="glassy" style={{ maxWidth: 480, margin: "40px auto" }}>
        <h1 className="gradient" style={{ fontWeight: 800, fontSize: "2rem", marginBottom: 8 }}>
          Creator Login
        </h1>
        <p className="muted mb-4">Only verified creators can add or edit grants.</p>

        <input
          className="input mb-3"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="input mb-4"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-primary w-full" style={{ width: "100%" }} onClick={handleLogin}>
          Login
        </button>

        <p className="muted center mt-4 text-sm">
          Creator access only • arm.official168@gmail.com / Grant123!
        </p>
      </div>
    </main>
  );
}
