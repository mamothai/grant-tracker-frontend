// src/App.jsx
import { Routes, Route, Navigate, Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

import Home from "./Home.jsx";
import SuggestionBox from "./SuggestionBox.jsx";
import GrantSectorChart from "./components/GrantSectorChart.jsx";
import CreatorLogin from "./CreatorLogin.jsx";
import CreateGrant from "./createGrant.jsx";
import GovLogin from "./GovLogin.jsx";
import GovDashboard from "./GovDashboard.jsx";
import PublicView from "./PublicView.jsx";
import SectorDetails from "./pages/SectorDetails.jsx";

import "./App.css";
import "./scrollAnimations.css";

// Initialize scroll animations using Intersection Observer
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        // Once visible, we can unobserve to improve performance
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all elements with reveal classes
  const revealElements = document.querySelectorAll(
    ".reveal, .reveal-right, .reveal-left, .fade-in"
  );
  
  revealElements.forEach((el) => {
    // Only observe elements that aren't already visible
    if (!el.classList.contains("visible")) {
      observer.observe(el);
    }
  });

  return observer;
}

export default function App() {
  const location = useLocation();
  
  useEffect(() => {
    let observer = null;
    
    // Initialize animations after DOM is ready
    const timeoutId = setTimeout(() => {
      observer = initScrollAnimations();
    }, 100);

    // Cleanup function
    return () => {
      clearTimeout(timeoutId);
      if (observer) {
        observer.disconnect();
      }
    };
  }, [location]); // Re-initialize when route changes

  return (
    <div className="app-root">
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
    <header className="nav glassy">
      <Link to="/" className="brand">
        <span className="brand-flag">IN</span> 
        <span className="brand-text">GrantTracker</span>
      </Link>

      <nav className="nav-links">
        <Link className="nav-link" to="/chart">Dashboard</Link>
        <Link className="nav-cta" to="/creator-login">Creator Login</Link>
      </nav>
    </header>
  );
}
