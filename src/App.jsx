import { Routes, Route, Navigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";

import Home from "./Home.jsx";                      // <-- NEW HOME PAGE
import GrantSectorChart from "./components/GrantSectorChart.jsx";
import CreateGrant from "./createGrant.jsx";
import GovLogin from "./GovLogin.jsx";
import GovDashboard from "./GovDashboard.jsx";
import PublicView from "./PublicView.jsx";
import SectorDetails from "./pages/SectorDetails.jsx";
import CreatorLogin from "./CreatorLogin.jsx";

import "./App.css";

export default function App() {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />  {/* <-- NEW SCROLL HOMEPAGE */}
        <Route path="/chart" element={<GrantSectorChart />} />
        <Route path="/creator-login" element={<CreatorLogin />} />
        <Route path="/create-grant" element={<CreateGrant />} />
        <Route path="/gov-login" element={<GovLogin />} />
        <Route path="/gov-dashboard" element={<GovDashboard />} />
        <Route path="/view/:id" element={<PublicView />} />
        <Route path="/sectors/:sectorName" element={<SectorDetails />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Footer />
    </div>
  );
}

/* ---------- NAVBAR ---------- */
function Navbar() {
  const [isCreator, setIsCreator] = useState(false);

  useEffect(() => {
    try {
      setIsCreator(localStorage.getItem("creatorAuth") === "true");
    } catch {
      setIsCreator(false);
    }
  }, []);

  const logout = () => {
    try {
      localStorage.removeItem("creatorAuth");
    } catch {}
    window.location.href = "/";
  };

  return (
    <header className="nav glassy fade-in">
      <Link to="/" className="brand">
        <span className="flag">🇮🇳</span>
        <span className="brand-text">GrantTracker</span>
      </Link>

      <nav className="nav-links">
        <Link to="/chart" className="nav-link">Dashboard</Link>

        {isCreator ? (
          <button className="btn btn-ghost" onClick={logout}>Logout</button>
        ) : (
          <Link to="/creator-login" className="btn btn-primary">Creator Login</Link>
        )}
      </nav>
    </header>
  );
}

/* ---------- FOOTER ---------- */
function Footer() {
  return (
    <footer className="footer fade-in">
      <p>
        Built with ❤️ by <span className="gradient-ink">GrantTracker Portal</span>
      </p>
    </footer>
  );
}
