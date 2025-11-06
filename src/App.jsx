import { Routes, Route, Navigate, Link } from "react-router-dom";
import GrantSectorChart from "./components/GrantSectorChart.jsx";
import createGrant from "./pages/createGrant.jsx";
import GovLogin from "./pages/GovLogin.jsx";
import GovDashboard from "./pages/GovDashboard.jsx";
import PublicView from "./pages/PublicView.jsx";
import SectorDetails from "./pages/SectorDetails.jsx";
import "./App.css";

const App = () => {
  return (
    <div className="site-bg">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chart" element={<GrantSectorChart />} />
        <Route path="/create-grant" element={<createGrant />} />
        <Route path="/gov-login" element={<GovLogin />} />
        <Route path="/gov-dashboard" element={<GovDashboard />} />
        <Route path="/sectors/:sectorName" element={<SectorDetails />} />
        <Route path="/view/:id" element={<PublicView />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </div>
  );
};

const Navbar = () => (
  <header className="nav glass fade-in">
    <Link to="/" className="brand">
      <span className="flag">🇮🇳</span>
      <span className="brand-text">GrantTracker</span>
    </Link>
    <nav className="nav-links">
      <Link to="/chart" className="nav-link">Dashboard</Link>
      <Link to="/create-grant" className="btn btn-primary btn-sm">Creator</Link>
    </nav>
  </header>
);

const Home = () => (
  <main className="container hero fade-up">
    <div className="glassy hero-card float-up">
      <h1 className="hero-title">
        <span className="muted">IN</span> <span className="gradient">GrantTracker Portal</span>
      </h1>
      <p className="hero-sub">
        Transparent monitoring of government grants for accountability.
      </p>
      <div className="cta-row">
        <Link to="/create-grant" className="btn btn-primary">Grant Creator</Link>
        <Link to="/chart" className="btn btn-ghost">Public Dashboard</Link>
      </div>
    </div>

    <div className="glassy search-box float-up delay-1">
      <h3 className="gradient">Search Grant</h3>
      <p className="muted">Example: GT-2025-1024 or AGR-001</p>
      <div className="search-row">
        <input id="public-id" placeholder="Enter Grant ID" className="input" />
        <button
          className="btn btn-primary"
          onClick={() => {
            const id = document.getElementById("public-id").value.trim();
            if (!id) return alert("Please enter a grant ID");
            window.location.href = `/view/${id}`;
          }}
        >
          View
        </button>
      </div>
    </div>
  </main>
);

const Footer = () => (
  <footer className="footer fade-in">
    <p>
      Built with ❤️ by <span className="gradient-ink">GrantTracker</span>
    </p>
  </footer>
);

export default App;
