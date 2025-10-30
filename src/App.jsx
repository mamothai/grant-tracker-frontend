import { Link, Routes, Route, useParams, useNavigate, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

// ROOT APP
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/creator-login" element={<CreatorLogin />} />
        <Route path="/creator-dashboard" element={<CreatorDashboard />} />
        <Route path="/gov-login" element={<GovLogin />} />
        <Route path="/gov-dashboard" element={<GovDashboard />} />
        <Route path="/view/:id" element={<PublicView />} />
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
      <p className="text-lg text-gray">
        Transparent monitoring of government grants for public accountability.
      </p>

      <div className="space-y-4">
        <Link to="/creator-login" className="btn-primary">Grant Creator</Link>
        <Link to="/gov-login" className="btn-glass">Government Official</Link>

        <div className="glass space-y-4">
          <h3 className="text-cyan text-lg font-semibold">Public View</h3>
          <input
            placeholder="GT-2025-XXXX"
            id="public-id"
            className="w-full p-3 rounded border-none outline-none"
          />
          <button
            className="btn-primary"
            onClick={() => {
              const id = document.getElementById("public-id").value || "GT-2025-1001";
              window.location.href = `/view/${id}`;
            }}
          >
            View Grant
          </button>
        </div>
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
        <h2 className="text-2xl font-bold text-gradient mb-6">Creator Login</h2>
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
          placeholder="Field (e.g. Education, Health)"
          value={field}
          onChange={(e) => setField(e.target.value)}
          className="w-full p-3 mb-6 rounded border-none outline-none"
        />
        <button className="btn-primary" onClick={createGrant}>Generate Grant ID</button>
      </div>
    </div>
  );
};

// 🏛️ GOV LOGIN (Placeholder)
const GovLogin = () => (
  <div className="flex-center">
    <div className="glass max-w-md w-full text-center">
      <h2 className="text-2xl font-bold text-gradient mb-6">Government Login</h2>
      <p>Coming soon — only verified govt officers will be able to update grant progress.</p>
    </div>
  </div>
);

// 🗂️ GOV DASHBOARD (Placeholder)
const GovDashboard = () => (
  <div className="flex-center">
    <div className="glass max-w-md w-full text-center">
      <h2 className="text-2xl font-bold text-gradient mb-6">Gov Dashboard</h2>
      <p>Under development...</p>
    </div>
  </div>
);

// 🌍 PUBLIC VIEW
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
      <div className="glass max-w-3xl w-full space-y-6">
        <h1 className="text-3xl font-bold text-gradient text-center">
          Grant ID: {grant.id}
        </h1>
        <p className="text-lg text-center">💰 ₹{grant.amount?.toLocaleString()}</p>
        <p className="text-center text-gray">Field: {grant.field}</p>
        <p className="text-center text-gray">Created by: {grant.creator}</p>

        <div className="glass">
          <h2 className="text-xl font-semibold text-cyan mb-4">Updates</h2>
          {grant.updates.length ? (
            grant.updates.map((u, i) => (
              <div key={i} className="space-y-2 border-t border-white/20 pt-3">
                <p className="font-bold">{u.title}</p>
                <p className="text-sm text-gray">{u.date}</p>
                {u.image && <img src={u.image} alt="update" className="rounded mt-2 max-w-md" />}
              </div>
            ))
          ) : (
            <p className="text-gray">No updates yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
