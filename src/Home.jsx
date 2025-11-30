// src/Home.jsx
import { Link } from "react-router-dom";
import "./App.css";

function IconNetwork() {
  return (
    <svg className="big-icon" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g1">
          <stop offset="0" stopColor="#06b6d4" />
          <stop offset="1" stopColor="#a855f7" />
        </linearGradient>
      </defs>
      <g stroke="url(#g1)" strokeWidth="4" fill="none" strokeLinecap="round">
        <circle cx="60" cy="20" r="8" />
        <circle cx="20" cy="60" r="8" />
        <circle cx="60" cy="100" r="8" />
        <circle cx="100" cy="60" r="8" />
        <path d="M60 28 L60 92" />
        <path d="M28 60 L92 60" />
        <path d="M34 34 L86 86" />
        <path d="M86 34 L34 86" />
      </g>
    </svg>
  );
}

function IconLight() {
  return (
    <svg className="big-icon" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g2">
          <stop offset="0" stopColor="#06b6d4" />
          <stop offset="1" stopColor="#a855f7" />
        </linearGradient>
      </defs>
      <g stroke="url(#g2)" strokeWidth="4" fill="none" strokeLinecap="round">
        <path d="M60 20 a18 18 0 0 1 18 18 18 18 0 0 1 -18 18 18 18 0 0 1 -18 -18 18 18 0 0 1 18 -18z" />
        <path d="M50 56 L70 56" />
        <path d="M58 72 L62 72 L62 88 L58 88 Z" />
        <path d="M60 6 L60 18" />
        <path d="M30 36 L40 44" />
        <path d="M90 36 L80 44" />
      </g>
    </svg>
  );
}

function IconCloud() {
  return (
    <svg className="big-icon" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g3">
          <stop offset="0" stopColor="#06b6d4" />
          <stop offset="1" stopColor="#a855f7" />
        </linearGradient>
      </defs>
      <g stroke="url(#g3)" strokeWidth="4" fill="none" strokeLinecap="round">
        <path d="M30 70 Q20 50 40 44 Q45 30 62 32 Q78 22 92 38 Q106 45 100 62 Q110 66 102 76 Q70 92 30 70 Z" />
      </g>
    </svg>
  );
}

function IconBell() {
  return (
    <svg className="big-icon" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g4">
          <stop offset="0" stopColor="#06b6d4" />
          <stop offset="1" stopColor="#a855f7" />
        </linearGradient>
      </defs>
      <g stroke="url(#g4)" strokeWidth="4" fill="none" strokeLinecap="round">
        <path d="M60 26 a20 20 0 0 0 -20 20 v12 a8 8 0 0 1 -4 6 l-4 4 72 0 -4 -4 a8 8 0 0 1 -4 -6 V46 a20 20 0 0 0 -20 -20z"/>
        <circle cx="60" cy="92" r="6" fill="url(#g4)" />
      </g>
    </svg>
  );
}

function IconRobot() {
  return (
    <svg className="big-icon" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g5">
          <stop offset="0" stopColor="#06b6d4" />
          <stop offset="1" stopColor="#a855f7" />
        </linearGradient>
      </defs>
      <g stroke="url(#g5)" strokeWidth="4" fill="none" strokeLinecap="round">
        <rect x="36" y="30" width="48" height="44" rx="8" />
        <circle cx="52" cy="50" r="4" fill="url(#g5)"/>
        <circle cx="68" cy="50" r="4" fill="url(#g5)"/>
        <path d="M52 70 L68 70" />
        <path d="M46 26 L46 18" />
        <path d="M74 26 L74 18" />
        <rect x="50" y="76" width="20" height="12" rx="4" />
      </g>
    </svg>
  );
}

export default function Home() {
  return (
    <main className="page-scroll" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Dynamic animated background */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none',
        overflow: 'hidden'
      }}>
        {/* Animated gradient orbs */}
        <div style={{
          position: 'absolute',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.3) 0%, transparent 70%)',
          top: '-100px',
          left: '-100px',
          animation: 'float 20s ease-in-out infinite',
          filter: 'blur(60px)'
        }} />
        <div style={{
          position: 'absolute',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, transparent 70%)',
          bottom: '-150px',
          right: '-150px',
          animation: 'float 25s ease-in-out infinite reverse',
          filter: 'blur(80px)'
        }} />
        <div style={{
          position: 'absolute',
          width: '350px',
          height: '350px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.2) 0%, transparent 70%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          animation: 'float 30s ease-in-out infinite',
          filter: 'blur(70px)'
        }} />

        {/* Add keyframes animation via style tag */}
        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px) translateX(0px); }
            25% { transform: translateY(-30px) translateX(20px); }
            50% { transform: translateY(-60px) translateX(-20px); }
            75% { transform: translateY(-30px) translateX(30px); }
          }
          @keyframes float-alt {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-40px); }
          }
          @keyframes pulse-glow {
            0%, 100% { opacity: 0.5; }
            50% { opacity: 1; }
          }
        `}</style>
      </div>

      {/* HERO */}
      <section className="panel panel-hero reveal visible" style={{ position: 'relative', overflow: 'hidden', zIndex: 1 }}>
        <div 
          style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%', 
            zIndex: -1,
            pointerEvents: 'none',
            background: 'radial-gradient(circle at 30% 30%, rgba(6, 182, 212, 0.1), transparent 50%), radial-gradient(circle at 70% 70%, rgba(168, 85, 247, 0.1), transparent 50%)'
          }}
        />
        <div className="panel-left">
          <div className="hero-badge">
            <span className="badge-dot"></span>
            <span>Transparency • Accountability • Trust</span>
          </div>
          <h1 className="big-title gradient">GrantTracker Portal</h1>
          <p className="lead muted">
            A transparent digital system connecting officials, creators, and the public with verified grant activity. Track, verify, and ensure accountability in real-time.
          </p>

          <div className="panel-ctas">
            <Link to="/chart" className="cta cta-primary wide-btn">Explore Dashboard</Link>

            <Link to="/creator-login" className="cta cta-secondary">
              <span className="creator-dot"></span> Creator Login
            </Link>
          </div>

          <div className="hero-stats">
            <div className="hero-stat">
              <div className="hero-stat-number">500+</div>
              <div className="hero-stat-label">Active Grants</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-number">₹50M+</div>
              <div className="hero-stat-label">Total Allocation</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-number">100%</div>
              <div className="hero-stat-label">Transparency</div>
            </div>
          </div>
        </div>

        <div className="panel-right reveal-right hero-image-container" style={{ position: 'relative' }}>
          <div className="hero-image-wrapper" style={{ position: 'relative', zIndex: 2 }}>
            <img 
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80&auto=format&fit=crop" 
              alt="Digital Network" 
              className="hero-image"
            />
            <div className="hero-image-overlay"></div>
          </div>
          <div 
            style={{ 
              position: 'absolute', 
              width: '300px', 
              height: '300px', 
              top: '50%', 
              left: '50%', 
              transform: 'translate(-50%, -50%)', 
              zIndex: 1, 
              opacity: 0.7,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <div 
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #06b6d440, #a855f780)',
                border: '2px solid #06b6d4',
                boxShadow: '0 0 30px rgba(6, 182, 212, 0.4)',
                animation: 'rotate-fallback 3s linear infinite'
              }}
            />
          </div>
          <div className="hero-decoration" style={{ zIndex: 0 }}>
            <IconNetwork />
          </div>
        </div>
      </section>

      {/* Public Suggestions */}
      <section className="panel reveal">
        <div className="panel-left">
          <div className="feature-card glassy" style={{ position: 'relative' }}>
            <div className="feature-icon-wrapper" style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 1 }}>
              <div 
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #06b6d440, #06b6d480)',
                  border: '2px solid #06b6d4',
                  boxShadow: '0 0 20px #06b6d440',
                  animation: 'pulse-fallback 2s ease-in-out infinite'
                }}
              />
            </div>
            <div style={{ marginTop: '20px' }}>
              <IconLight />
            </div>
            <h2 className="panel-title gradient">Public Suggestions</h2>
            <p className="muted">Submit feedback about any grant for better transparency. Your voice matters in building a more accountable system.</p>
            <Link to="/suggestions" className="cta cta-primary">Submit Feedback</Link>
          </div>
        </div>
        <div className="panel-right reveal-right delay">
          <div className="feature-image-container">
            <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80&auto=format&fit=crop" 
              alt="Transparency and Feedback" 
              className="feature-image"
            />
            <div className="feature-image-overlay"></div>
          </div>
        </div>
      </section>

      {/* Government Panel */}
      <section className="panel reveal">
        <div className="panel-right reveal-left delay-1">
          <div className="feature-image-container">
            <img 
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&q=80&auto=format&fit=crop" 
              alt="Government Dashboard" 
              className="feature-image"
            />
            <div className="feature-image-overlay"></div>
          </div>
        </div>
        <div className="panel-left">
          <div className="feature-card glassy" style={{ position: 'relative' }}>
            <div className="feature-icon-wrapper" style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 1 }}>
              <div 
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #a855f740, #a855f780)',
                  border: '2px solid #a855f7',
                  boxShadow: '0 0 20px #a855f740',
                  animation: 'pulse-fallback 2s ease-in-out infinite'
                }}
              />
            </div>
            <div style={{ marginTop: '20px' }}>
              <IconCloud />
            </div>
            <h2 className="panel-title gradient">Government Dashboard</h2>
            <p className="muted">Officials can upload proofs, update milestones and maintain trust. Real-time tracking for better governance.</p>
            <Link to="/gov-login" className="cta cta-primary">Official Login</Link>
          </div>
        </div>
      </section>

      {/* Public Dashboard */}
      <section className="panel reveal">
        <div className="panel-left">
          <div className="feature-card glassy" style={{ position: 'relative' }}>
            <div className="feature-icon-wrapper" style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 1 }}>
              <div 
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #ec489940, #ec489980)',
                  border: '2px solid #ec4899',
                  boxShadow: '0 0 20px #ec489940',
                  animation: 'pulse-fallback 2s ease-in-out infinite'
                }}
              />
            </div>
            <div style={{ marginTop: '20px' }}>
              <IconBell />
            </div>
            <h2 className="panel-title gradient">Public Dashboard</h2>
            <p className="muted">Explore live charts, distribution & analytics. Get insights into grant allocations across sectors in real-time.</p>
            <Link to="/chart" className="cta cta-primary">View Dashboard</Link>
          </div>
        </div>
        <div className="panel-right reveal-right delay-2">
          <div className="feature-image-container">
            <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80&auto=format&fit=crop" 
              alt="Analytics Dashboard" 
              className="feature-image"
            />
            <div className="feature-image-overlay"></div>
          </div>
        </div>
      </section>

      {/* Creator Portal */}
      <section className="panel reveal">
        <div className="panel-right reveal-left delay-3">
          <div className="feature-image-container">
            <img 
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80&auto=format&fit=crop" 
              alt="Creator Portal" 
              className="feature-image"
            />
            <div className="feature-image-overlay"></div>
          </div>
        </div>
        <div className="panel-left">
          <div className="feature-card glassy" style={{ position: 'relative' }}>
            <div className="feature-icon-wrapper" style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 1 }}>
              <div 
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #10b98140, #10b98180)',
                  border: '2px solid #10b981',
                  boxShadow: '0 0 20px #10b98140',
                  animation: 'pulse-fallback 2s ease-in-out infinite'
                }}
              />
            </div>
            <div style={{ marginTop: '20px' }}>
              <IconRobot />
            </div>
            <h2 className="panel-title gradient">Creator Portal</h2>
            <p className="muted">Creators can register grants and manage entries. Streamlined process for grant application and tracking.</p>
            <Link to="/creator-login" className="cta cta-primary">Creator Login</Link>
          </div>
        </div>
      </section>

      {/* Government Benefits Section */}
      <section className="panel reveal">
        <div className="panel-left">
          <div className="feature-card glassy">
            <div className="feature-icon-wrapper">
              <span style={{ fontSize: "3rem" }}>🇮🇳</span>
            </div>
            <h2 className="panel-title gradient">Government Benefits</h2>
            <p className="muted">Explore comprehensive government schemes and benefits designed to empower citizens across all sectors.</p>
            <Link to="/benefits" className="cta cta-primary">View All Benefits</Link>
          </div>
        </div>
        <div className="panel-right reveal-right delay-2">
          <div className="feature-image-container">
            <img 
              src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80&auto=format&fit=crop" 
              alt="Government Benefits" 
              className="feature-image"
            />
            <div className="feature-image-overlay"></div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="features-grid-section reveal" style={{ position: 'relative' }}>
        <div 
          style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%', 
            zIndex: -1,
            pointerEvents: 'none',
            opacity: 0.3,
            background: 'radial-gradient(circle at 30% 30%, rgba(6, 182, 212, 0.1), transparent 50%), radial-gradient(circle at 70% 70%, rgba(168, 85, 247, 0.1), transparent 50%)'
          }}
        />
        <h2 className="panel-title gradient text-center">Why Choose GrantTracker?</h2>
        <div className="features-grid">
          <div className="feature-item glassy" style={{ position: 'relative', overflow: 'visible' }}>
            <div style={{ position: 'absolute', top: '-20px', right: '-20px', zIndex: 1 }}>
              <div 
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #06b6d440, #06b6d480)',
                  border: '2px solid #06b6d4',
                  boxShadow: '0 0 20px #06b6d440',
                  animation: 'pulse-fallback 2s ease-in-out infinite'
                }}
              />
            </div>
            <div className="feature-item-icon">🔒</div>
            <h3 className="feature-item-title">Secure & Verified</h3>
            <p className="feature-item-desc">All grants are blockchain-verified and tamper-proof</p>
          </div>
          <div className="feature-item glassy" style={{ position: 'relative', overflow: 'visible' }}>
            <div style={{ position: 'absolute', top: '-20px', right: '-20px', zIndex: 1 }}>
              <div 
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #a855f740, #a855f780)',
                  border: '2px solid #a855f7',
                  boxShadow: '0 0 20px #a855f740',
                  animation: 'pulse-fallback 2s ease-in-out infinite'
                }}
              />
            </div>
            <div className="feature-item-icon">📊</div>
            <h3 className="feature-item-title">Real-Time Tracking</h3>
            <p className="feature-item-desc">Monitor grant progress with live updates and analytics</p>
          </div>
          <div className="feature-item glassy" style={{ position: 'relative', overflow: 'visible' }}>
            <div style={{ position: 'absolute', top: '-20px', right: '-20px', zIndex: 1 }}>
              <div 
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #ec489940, #ec489980)',
                  border: '2px solid #ec4899',
                  boxShadow: '0 0 20px #ec489940',
                  animation: 'pulse-fallback 2s ease-in-out infinite'
                }}
              />
            </div>
            <div className="feature-item-icon">🌐</div>
            <h3 className="feature-item-title">Public Transparency</h3>
            <p className="feature-item-desc">Open access to all grant information and allocations</p>
          </div>
          <div className="feature-item glassy" style={{ position: 'relative', overflow: 'visible' }}>
            <div style={{ position: 'absolute', top: '-20px', right: '-20px', zIndex: 1 }}>
              <div 
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #10b98140, #10b98180)',
                  border: '2px solid #10b981',
                  boxShadow: '0 0 20px #10b98140',
                  animation: 'pulse-fallback 2s ease-in-out infinite'
                }}
              />
            </div>
            <div className="feature-item-icon">⚡</div>
            <h3 className="feature-item-title">Fast Processing</h3>
            <p className="feature-item-desc">Quick grant registration and approval workflows</p>
          </div>
        </div>
      </section>

      <footer className="footer fade-in">
        Built with ❤️ by <span className="gradient-ink">GrantTracker Portal</span>
      </footer>

    </main>
  );
}
