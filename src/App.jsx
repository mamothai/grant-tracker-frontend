// src/App.jsx
import { Routes, Route, Navigate, Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

import Home from "./Home.jsx";
import About from "./About.jsx";
import SuggestionBox from "./SuggestionBox.jsx";
import GrantSectorChart from "./components/GrantSectorChart.jsx";
import CreatorLogin from "./CreatorLogin.jsx";
import CreateGrant from "./createGrant.jsx";
import GovLogin from "./GovLogin.jsx";
import GovDashboard from "./GovDashboard.jsx";
import PublicView from "./PublicView.jsx";
import SectorDetails from "./pages/SectorDetails.jsx";
import BenefitsScheme from "./pages/BenefitsScheme.jsx";
import ChatBot from "./components/ChatBot.jsx";

import "./App.css";
import "./scrollAnimations.css";

// Initialize scroll animations using Intersection Observer
function initScrollAnimations() {
  // Check if IntersectionObserver is supported
  if (typeof IntersectionObserver === 'undefined') {
    // Fallback: make all elements visible immediately
    const revealElements = document.querySelectorAll(
      ".reveal, .reveal-right, .reveal-left, .fade-in"
    );
    revealElements.forEach((el) => {
      el.classList.add("visible");
    });
    return null;
  }

  const observerOptions = {
    threshold: 0.01, // Very low threshold to trigger almost immediately
    rootMargin: "50px" // Large margin to trigger before element enters viewport
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

  // Function to observe elements
  const observeElements = () => {
    const revealElements = document.querySelectorAll(
      ".reveal, .reveal-right, .reveal-left, .fade-in"
    );
    
    revealElements.forEach((el) => {
      // Check if element is already in viewport
      const rect = el.getBoundingClientRect();
      const isInViewport = rect.top < window.innerHeight + 100 && rect.bottom > -100;
      
      if (isInViewport && !el.classList.contains("visible")) {
        // Make visible immediately if in viewport
        el.classList.add("visible");
      } else if (!el.classList.contains("visible")) {
        // Observe if not in viewport
        observer.observe(el);
      }
    });
  };

  // Observe elements
  observeElements();
  
  // Retry if no elements found initially
  if (document.querySelectorAll(".reveal, .reveal-right, .reveal-left, .fade-in").length === 0) {
    setTimeout(observeElements, 200);
  }

  return observer;
}

export default function App() {
  const location = useLocation();
  
  useEffect(() => {
    let observer = null;
    
    // First, make all elements visible immediately as fallback
    const makeVisibleFallback = () => {
      const revealElements = document.querySelectorAll(
        ".reveal, .reveal-right, .reveal-left, .fade-in"
      );
      revealElements.forEach((el) => {
        if (!el.classList.contains("visible")) {
          el.classList.add("visible");
        }
      });
    };
    
    // Initialize animations after DOM is ready
    const timeoutId = setTimeout(() => {
      try {
        observer = initScrollAnimations();
        // Also check elements already in viewport and make them visible
        const checkViewport = () => {
          const revealElements = document.querySelectorAll(
            ".reveal, .reveal-right, .reveal-left, .fade-in"
          );
          revealElements.forEach((el) => {
            const rect = el.getBoundingClientRect();
            const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
            if (isInViewport && !el.classList.contains("visible")) {
              el.classList.add("visible");
            }
          });
        };
        checkViewport();
        // Fallback after 2 seconds if observer didn't trigger
        setTimeout(makeVisibleFallback, 2000);
      } catch (error) {
        console.error('Error initializing scroll animations:', error);
        makeVisibleFallback();
      }
    }, 50); // Reduced delay

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
        <Route path="/about" element={<About />} />
        <Route path="/chart" element={<GrantSectorChart />} />
        <Route path="/suggestions" element={<SuggestionBox />} />
        <Route path="/creator-login" element={<CreatorLogin />} />
        <Route path="/create-grant" element={<CreateGrant />} />
        <Route path="/gov-login" element={<GovLogin />} />
        <Route path="/gov-dashboard" element={<GovDashboard />} />
        <Route path="/view/:id" element={<PublicView />} />
        <Route path="/sectors/:sectorName" element={<SectorDetails />} />
        <Route path="/benefits" element={<BenefitsScheme />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <ChatBot />
    </div>
  );
}

function Navbar() {
  return (
    <header className="nav glassy" style={{ opacity: 1, transform: 'none' }}>
      <Link to="/" className="brand">
        <span className="brand-flag">IN</span> 
        <span className="brand-text">GrantTracker</span>
      </Link>

      <nav className="nav-links">
        <Link className="nav-link" to="/about">About</Link>
        <Link className="nav-link" to="/chart">Dashboard</Link>
        <Link className="nav-link" to="/benefits">Benefits</Link>
        <Link className="nav-cta" to="/creator-login">Creator Login</Link>
      </nav>
    </header>
  );
}
