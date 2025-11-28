// src/About.jsx
import "./App.css";

export default function About() {
  return (
    <main className="page-scroll about-page">
      {/* HERO */}
      <section className="panel panel-hero reveal" style={{ position: "relative", overflow: "hidden" }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: -1,
            pointerEvents: "none",
            background:
              "radial-gradient(circle at 20% 0%, rgba(56, 189, 248, 0.25), transparent 55%)," +
              "radial-gradient(circle at 80% 100%, rgba(139, 92, 246, 0.3), transparent 60%)",
          }}
        />

        <div className="panel-left">
          <div className="hero-badge">
            <span className="badge-dot"></span>
            <span>About the GrantTracker team</span>
          </div>
          <h1 className="big-title gradient">
            Transparent grants
            <br />
            start with honest data.
          </h1>
          <p className="lead muted">
            GrantTracker brings every stakeholder&nbsp;&mdash; officials, creators and citizens&nbsp;&mdash; onto a
            single, verifiable source of truth for how public and institutional funds are planned, approved and used.
          </p>

          <div className="panel-ctas">
            <a href="/chart" className="cta cta-primary wide-btn">
              Explore live analytics
            </a>
            <a href="/creator-login" className="cta cta-secondary">
              Meet the creator workflow
            </a>
          </div>

          <div className="hero-stats">
            <div className="hero-stat">
              <div className="hero-stat-number">50K+</div>
              <div className="hero-stat-label">Grants mapped in pilots</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-number">12</div>
              <div className="hero-stat-label">Sectors supported</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-number">3x</div>
              <div className="hero-stat-label">Faster reporting cycles</div>
            </div>
          </div>
        </div>

        <div className="panel-right hero-image-container">
          <div className="hero-image-wrapper">
            <img
              src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=900&q=80&auto=format&fit=crop"
              loading="lazy"
              alt="People collaborating around data dashboards"
              className="hero-image"
            />
            <div className="hero-image-overlay"></div>
          </div>

          <div
            className="about-hero-card glassy"
            aria-label="At-a-glance view of tracked programmes"
          >
            <div className="about-hero-card-header">
              <span className="about-dot about-dot--green" aria-hidden="true"></span>
              <span className="muted">Live programme health</span>
            </div>
            <div className="about-hero-row">
              <span className="muted">On‑track initiatives</span>
              <span className="about-hero-pill">82%</span>
            </div>
            <div className="about-hero-row">
              <span className="muted">Pending reports</span>
              <span className="about-hero-pill about-hero-pill--warning">13</span>
            </div>
            <div className="about-hero-row">
              <span className="muted">Citizen feedback</span>
              <span className="about-hero-pill about-hero-pill--accent">4.7 / 5</span>
            </div>
          </div>
        </div>
      </section>

      {/* WHO WE ARE + MISSION */}
      <section className="panel reveal">
        <div className="panel-left">
          <div className="feature-card glassy about-block">
            <h2 className="panel-title gradient">Who we are</h2>
            <p className="muted">
              GrantTracker is a small, product‑first team of engineers, policy analysts and designers who have worked
              inside public institutions, nonprofits and donor organisations. We&apos;ve seen first‑hand how complex,
              fragmented and opaque grant processes can be&nbsp;&mdash; especially once programmes move beyond
              spreadsheets and email threads.
            </p>
            <p className="muted">
              Our experience ranges from building citizen‑facing portals for state departments to designing analytics
              stacks for multilateral funding agencies. GrantTracker is the tool we always wished those teams had:
              simple to adopt, hard to game, and built for accountability from day one.
            </p>
          </div>
        </div>

        <div className="panel-right reveal-right">
          <div className="feature-card glassy about-block">
            <h2 className="panel-title gradient">Why GrantTracker exists</h2>
            <p className="muted">
              Every rupee of grant funding is a promise&nbsp;&mdash; to farmers, students, researchers, communities.
              Yet too often, the story between &quot;sanctioned&quot; and &quot;impact&quot; is scattered across PDF
              reports, siloed dashboards and offline approvals.
            </p>
            <p className="muted">
              GrantTracker exists to make that story visible in real‑time. By linking approvals, disbursements,
              milestones and evidence in one auditable trail, we help administrators prove impact, auditors verify
              claims, and citizens understand how commitments translate into outcomes.
            </p>
          </div>
        </div>
      </section>

      {/* WHAT WE DO + FEATURES */}
      <section className="features-grid-section reveal" style={{ position: "relative" }}>
        <h2 className="panel-title gradient text-center">What GrantTracker does</h2>
        <p className="section-intro text-center muted">
          GrantTracker centralises the full lifecycle of a grant&nbsp;&mdash; from concept note to final report&nbsp;&mdash;
          so that every stakeholder is working off the same, current picture.
        </p>

        <div className="features-grid">
          <div className="feature-item glassy">
            <div className="feature-item-icon">📡</div>
            <h3 className="feature-item-title">End‑to‑end grant status</h3>
            <p className="feature-item-desc">
              Track every programme in one place&nbsp;&mdash; approvals, disbursements, milestones and supporting
              documents. GrantTracker builds a living profile for each grant so that updates never get lost in inboxes
              again.
            </p>
            <ul className="about-list">
              <li>Unified status timeline for each grant</li>
              <li>Role‑aware views for departments, implementers and auditors</li>
              <li>Automatic audit trail for every change</li>
            </ul>
          </div>

          <div className="feature-item glassy">
            <div className="feature-item-icon">⏰</div>
            <h3 className="feature-item-title">Deadline &amp; compliance guardrails</h3>
            <p className="feature-item-desc">
              Never miss a reporting deadline or utilisation certificate again. GrantTracker surfaces what needs
              attention, when, and for whom.
            </p>
            <ul className="about-list">
              <li>Smart reminders for milestones and expiries</li>
              <li>Configurable workflows that match your schemes</li>
              <li>Dashboard tiles for overdue actions and risks</li>
            </ul>
          </div>

          <div className="feature-item glassy">
            <div className="feature-item-icon">📊</div>
            <h3 className="feature-item-title">Analytics &amp; public transparency</h3>
            <p className="feature-item-desc">
              Administrators see performance by sector, region and implementer. Citizens get a clean, human‑readable
              view of where grants are flowing and what impact they are driving.
            </p>
            <ul className="about-list">
              <li>Sector and geography drill‑downs in a few clicks</li>
              <li>Export‑ready reports for committees and audits</li>
              <li>Optional public transparency portal out‑of‑the‑box</li>
            </ul>
          </div>
        </div>
      </section>

      {/* TIMELINE / MILESTONES */}
      <section className="about-timeline-section reveal">
        <div className="about-timeline-header">
          <h2 className="panel-title gradient">Our journey so far</h2>
          <p className="muted">
            GrantTracker is shaped hand‑in‑hand with administrators, auditors and creators. Each phase has been
            anchored in real pilots with real constraints.
          </p>
        </div>

        <ol className="about-timeline" aria-label="GrantTracker product milestones">
          <li className="about-timeline-item">
            <div className="about-timeline-dot"></div>
            <div className="about-timeline-card glassy">
              <p className="about-timeline-meta">2022 · Discovery</p>
              <h3 className="about-timeline-title">From spreadsheets to a single source of truth</h3>
              <p className="muted">
                We interviewed grant officers across departments and donor agencies to map their day‑to‑day pain
                points: scattered files, inconsistent templates, and no shared view of &quot;where things stand&quot;.
              </p>
            </div>
          </li>

          <li className="about-timeline-item">
            <div className="about-timeline-dot"></div>
            <div className="about-timeline-card glassy">
              <p className="about-timeline-meta">2023 · Pilot</p>
              <h3 className="about-timeline-title">Live pilots with multi‑sector schemes</h3>
              <p className="muted">
                Early prototypes ran across agriculture, education and health schemes, helping teams consolidate
                status tracking and evidence uploads into one workflow.
              </p>
            </div>
          </li>

          <li className="about-timeline-item">
            <div className="about-timeline-dot"></div>
            <div className="about-timeline-card glassy">
              <p className="about-timeline-meta">2024 · Public portal</p>
              <h3 className="about-timeline-title">Citizen‑facing transparency &amp; feedback</h3>
              <p className="muted">
                We layered in a public view with grant cards, progress updates and a structured suggestion box so
                communities can respond to what they see on the ground.
              </p>
            </div>
          </li>

          <li className="about-timeline-item">
            <div className="about-timeline-dot"></div>
            <div className="about-timeline-card glassy">
              <p className="about-timeline-meta">Today</p>
              <h3 className="about-timeline-title">Scaling to new partners</h3>
              <p className="muted">
                GrantTracker is now being adapted for state departments, philanthropic foundations and multilateral
                programmes that want a transparent, modern backbone for their grant operations.
              </p>
            </div>
          </li>
        </ol>
      </section>

      {/* FOUNDER / TEAM NOTE */}
      <section className="panel reveal">
        <div className="panel-left">
          <div className="feature-card glassy about-block">
            <h2 className="panel-title gradient">A note from the team</h2>
            <p className="muted">
              GrantTracker is built by a small, hands‑on team led by{" "}
              <strong className="gradient-ink">Ayush GS</strong>, an engineer‑designer who has worked on accountability
              tools for public systems and citizen platforms.
            </p>
            <p className="muted">
              We believe software should make it easier&nbsp;&mdash; not harder&nbsp;&mdash; for honest teams to do
              transparent work. That&apos;s why GrantTracker is designed to plug into your existing processes,
              generate evidence automatically, and give oversight bodies a clear, verifiable narrative.
            </p>
          </div>
        </div>

        <div className="panel-right reveal-right">
          <div className="feature-card glassy about-block about-team-card">
            <h3 className="panel-title">How we work with partners</h3>
            <ul className="about-list">
              <li>Short diagnostic to map your schemes, roles and data sources</li>
              <li>Phased rollout: start with 1–2 departments, then expand</li>
              <li>Hands‑on onboarding for officials, creators and auditors</li>
              <li>Jointly defined success metrics and reporting templates</li>
            </ul>
            <p className="muted">
              Every deployment includes a dedicated partner channel and periodic reviews so that what we ship reflects
              ground realities, not just product assumptions.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="features-grid-section reveal about-cta-section">
        <div className="about-cta glassy">
          <div className="about-cta-text">
            <h2 className="panel-title gradient">Ready to bring radical clarity to your grants?</h2>
            <p className="muted">
              Whether you manage a single flagship scheme or a portfolio of hundreds, GrantTracker can help you see
              the full picture in weeks, not years.
            </p>
          </div>
          <div className="about-cta-actions">
            <a href="/chart" className="cta cta-primary">
              Request a guided walkthrough
            </a>
            <a href="/suggestions" className="cta cta-secondary">
              Talk to the team
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}


