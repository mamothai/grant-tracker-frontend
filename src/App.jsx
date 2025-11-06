import { Link, Routes, Route, useNavigate, useParams, Navigate } from "react-router-dom";
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
        <Route path="/view/:id" element={<PublicView />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

// 🏠 HOME PAGE (clean + search bar + dashboard link)
const Home = () => (
  <div className="flex-center">
    <div className="glass max-w-4xl w-full text-center animate-fadeInUp">
      <h1 className="text-5xl font-extrabold mb-3">
        <span className="text-gray" style={{ letterSpacing: "4px" }}>IN</span>{" "}
        <span className="text-gradient">GrantTracker Portal</span>
      </h1>
      <p className="text-lg text-gray mb-8">
        Transparent monitoring of government grants.
      </p>

      <div className="space-y-4 mb-8">
        <Link to="/creator-login" className="btn-primary">Grant Creator</Link>
        <Link to="/chart" className="btn-glass">Public Dashboard</Link>
      </div>

      {/* 🔍 Search Grant ID section */}
      <div className="glass p-6 max-w-md mx-auto">
        <h3 className="text-gradient text-xl font-bold mb-3">Search Grant by ID</h3>
        <input
          placeholder="Enter Grant ID (e.g. GT-2025-1001)"
          id="public-id"
          className="w-full p-3 rounded border-none outline-none mb-4 text-black"
        />
        <button
          className="btn-primary w-full"
          onClick={() => {
            const id = document.getElementById("public-id").value.trim();
            if (!id) return alert("Please enter a valid Grant ID!");
            window.location.href = `/view/${id}`;
          }}
        >
          View Grant
        </button>
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
      alert("Please fill all fields");
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
    navigate(`/view/${id}`);
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
          placeholder="Field / Sector (e.g. Education, Health)"
          value={field}
          onChange={(e) => setField(e.target.value)}
          className="w-full p-3 mb-6 rounded border-none outline-none"
        />
        <button className="btn-primary" onClick={createGrant}>Generate Grant</button>
      </div>
    </div>
  );
};

// 👁️ PUBLIC VIEW (View Grant by ID)
const PublicView = () => {
  const { id } = useParams();
  const [grant, setGrant] = useState(null);

  useEffect(() => {
    const grants = JSON.parse(localStorage.getItem("grants") || "[]");
    const found = grants.find((g) => g.id === id);
    setGrant(found || { error: true });
  }, [id]);

  if (!grant) return <div className="flex-center"><p>Loading...</p></div>;
  if (grant.error) return <div className="flex-center"><p>Grant not found.</p></div>;

  return (
    <div className="flex-center">
      <div className="glass max-w-3xl w-full">
        <h1 className="text-gradient text-3xl font-bold text-center mb-4">
          Grant ID: {grant.id}
        </h1>
        <p className="text-xl text-gray text-center mb-2">{grant.title}</p>
        <p className="text-center text-cyan mb-2">Field: {grant.field}</p>
        <p className="text-center">Amount: ₹{grant.amount.toLocaleString()}</p>
        <p className="text-center text-sm text-gray mt-4">Created by: {grant.creator}</p>
      </div>
    </div>
  );
};

export default App;
