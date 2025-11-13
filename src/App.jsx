import { Routes, Route, Navigate, Link } from "react-router-dom";
import Home from "./Home.jsx";
import GrantSectorChart from "./components/GrantSectorChart.jsx";
import SuggestionBox from "./SuggestionBox.jsx";
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
        <Route path="/" element={<Home />} />
        <Route path="/chart" element={<GrantSectorChart />} />
        <Route path="/suggestions" element={<SuggestionBox />} />
        <Route path="/creator-login" element={<CreatorLogin />} />
        <Route path="/create-grant" element={<CreateGrant />} />
        <Route path="/gov-login" element={<GovLogin />} />
        <Route path="/gov-dashboard" element={<GovDashboard />} />
        <Route path="/view/:id" element={<PublicView />} />
        <Route path="/sectors/:sectorName" element={<SectorDetails />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

function Navbar() {
  return (
    <header className="nav fade-in">
      <Link to="/" className="brand">
        <span className="brand-flag">IN</span>
        <span className="brand-gradient">GrantTracker</span>
      </Link>

      <nav className="nav-links">
        <Link className="nav-link" to="/chart">Dashboard</Link>
        <Link className="nav-btn" to="/creator-login">Creator Login</Link>
      </nav>
    </header>
  );
}
