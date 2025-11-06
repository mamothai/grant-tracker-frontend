import { Link, Routes, Route, useParams, useNavigate, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import GrantSectorChart from "./components/GrantSectorChart";
import SectorDetails from "./pages/SectorDetails";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/creator-login" element={<CreatorLogin />} />
        <Route path="/creator-dashboard" element={<CreatorDashboard />} />
        <Route path="/chart" element={<GrantSectorChart />} />
        <Route path="/sectors/:sectorName" element={<SectorDetails />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

// 🏠 HOME PAGE
const Home = () => (
  <div className="flex-center">
    <div className="glass max-w-4xl w-full space-y-6 text-center">
      <h1 className="text-gradient text-4xl font-bold">🇮🇳 GrantTracker Portal</h1>
      <p className="text-lg text-gray">Transparent monitoring of government grants.</p>

      <div className="space-y-4">
        <Link to="/creator-login" className="btn-primary">Grant Creator</Link>
        <Link to="/chart" className="btn-glass">Public Dashboard</Link>
      </div>
    </div>
  </div>
);

// 👤 CREATOR LOGIN
const CreatorLogin = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  const login = () => {
    if (email === "arm.official168@gmail.com" && pass === "Grant123!") {
      localStorage.setItem("creatorAuth", "true");
      navigate("/creator-dashboard");
    } else {
      alert("Invalid credentials. Try arm.official168@gmail.com / Grant123!");
    }
  };

  return (
    <div className="flex-center">
      <div className="glass max-w-md w-full text-center">
        <h2 className="text-gradient text-2xl font-bold mb-6">Creator Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 rounded border-none outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          className="w-full p-3 mb-6 rounded border-none outline-none"
        />
        <button className="btn-primary" onClick={login}>Login</button>
        <p className="text-sm text-gray mt-4">
          Use: <b>arm.official168@gmail.com / Grant123!</b>
        </p>
      </div>
    </div>
  );
};

// 🏗️ CREATOR DASHBOARD
const CreatorDashboard = () => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [field, setField] = useState("");
  const navigate = useNavigate();

  if (localStorage.getItem("creatorAuth") !== "true") {
    return <Navigate to="/creator-login" replace />;
  }

  const createGrant = () => {
    if (!title || !amount || !field) {
      alert("Please fill in all fields");
      return;
    }

    const id = `GT-2025-${Math.floor(1000 + Math.random() * 9000)}`;
    const grant = {
      id,
      title,
      amount: parseInt(amount),
      field,
      updates: [],
      creator: "arm.official168@gmail.com",
    };

    const grants = JSON.parse(localStorage.getItem("grants") || "[]");
    grants.push(grant);
    localStorage.setItem("grants", JSON.stringify(grants));

    navigate(`/chart`);
  };

  return (
    <div className="flex-center">
      <div className="glass max-w-2xl w-full">
        <h2 className="text-3xl font-bold text-gradient mb-6 text-center">Create New Grant</h2>
        <input
          placeholder="Grant Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 mb-4 rounded border-none outline-none"
        />
        <input
          type="number"
          placeholder="Amount (₹)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-3 mb-4 rounded border-none outline-none"
        />
        <input
          placeholder="Field (e.g. Education, Health)"
          value={field}
          onChange={(e) => setField(e.target.value)}
          className="w-full p-3 mb-6 rounded border-none outline-none"
        />
        <button className="btn-primary" onClick={createGrant}>Generate Grant</button>
      </div>
    </div>
  );
};

export default App;
