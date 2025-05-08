"use client";

import { useState, useRef, useEffect } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";
import Button from "../ui/Button";

export default function HeroSection() {
  const [theme, setTheme] = useState('dark');
  
  // Listen for theme changes
  useEffect(() => {
    // Get initial theme
    const htmlElement = document.documentElement;
    setTheme(htmlElement.getAttribute('data-bs-theme') || 'dark');

    // Create observer to watch for theme attribute changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'data-bs-theme'
        ) {
          setTheme(htmlElement.getAttribute('data-bs-theme') || 'dark');
        }
      });
    });

    // Start observing
    observer.observe(htmlElement, { attributes: true });

    // Cleanup
    return () => observer.disconnect();
  }, []);

  return (
    <section className="hero-section position-relative overflow-hidden">
      {/* Background elements */}
      <div
        className="position-absolute background-blob"
        style={{
          top: "5%",
          right: "10%",
          width: "150px",
          height: "150px",
          background: "var(--primary-light)",
          borderRadius: "40% 60% 70% 30% / 40% 50% 60% 50%",
          zIndex: -5,
          filter: "blur(40px)",
          opacity: 0.2,
          animation: "float 8s ease-in-out infinite",
          overflow: "hidden",
        }}
      ></div>

      <div
        className="position-absolute background-blob"
        style={{
          bottom: "15%",
          left: "5%",
          width: "120px",
          height: "120px",
          background: "var(--primary-light)",
          borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
          zIndex: -5,
          filter: "blur(35px)",
          opacity: 0.2,
          animation: "float 6s ease-in-out infinite reverse",
          overflow: "hidden",
        }}
      ></div>

      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
          100% {
            transform: translateY(0) rotate(0deg);
          }
        }
        
        /* Responsive adjustments for hero section */
        @media (max-width: 992px) {
          .dashboard-container {
            transform: none !important;
            margin-top: 1rem;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
          }
          
          .mobile-stats-container {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 0.75rem;
          }
          
          .mobile-stats-container p {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
        
        @media (max-width: 768px) {
          .hero-title {
            font-size: calc(1.5rem + 1.5vw) !important;
            margin-top: 0.5rem;
          }
          
          .hero-lead {
            font-size: 1rem !important;
          }
          
          .feature-item p {
            font-size: 0.9rem;
          }
          
          .user-avatars-container {
            display: flex;
            align-items: center;
          }
          
          .user-avatar {
            width: 40px !important;
            height: 40px !important;
          }
          
          .user-counter {
            width: 40px !important;
            height: 40px !important;
            font-size: 0.75rem;
          }
          
          .user-count {
            margin-top: 0.5rem;
            font-size: 0.9rem;
          }
          
          .section-companies {
            margin-top: 2rem !important;
            padding-top: 2rem !important;
          }
        }
        
        /* Dark theme improvements */
        [data-bs-theme="dark"] .feature-item p {
          color: rgba(255, 255, 255, 0.9);
        }
        
        [data-bs-theme="dark"] .hero-lead {
          color: rgba(255, 255, 255, 0.8) !important;
        }
        
        [data-bs-theme="dark"] .text-secondary {
          color: rgba(255, 255, 255, 0.7) !important;
        }
        
        [data-bs-theme="dark"] .text-dark {
          color: #ffffff !important;
        }
        
        [data-bs-theme="dark"] .user-counter {
          background-color: var(--primary);
          border-color: #111827;
        }
        
        [data-bs-theme="dark"] .dashboard-container {
          background-color: #1a1f2c !important;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .feature-item .me-3 {
          flex-shrink: 0;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: var(--primary-light);
          border-radius: 50%;
          margin-top: 2px !important;
        }
        
        .feature-item svg {
          width: 16px;
          height: 16px;
        }
        
        /* Improved mobile stats styles */
        .mobile-stats-container .card {
          padding: 0.75rem;
        }
        
        .mobile-stats-container .rounded-circle {
          width: 32px !important;
          height: 32px !important;
        }
        
        .mobile-stats-container svg {
          width: 16px;
          height: 16px;
        }
        
        [data-bs-theme="dark"] .mobile-stats-container .card {
          box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
        }
        
        [data-bs-theme="dark"] .mobile-stats-container p {
          color: rgba(255, 255, 255, 0.9);
        }
        
        /* Fix for background blob */
        .background-blob {
          max-width: 150px;
          max-height: 150px;
          opacity: 0.4;
        }
      `}</style>

      <Container>
        <Row className="align-items-center gy-4 gy-lg-5">
          <Col lg={6} className="mb-3 mb-lg-5">
            <div className="mb-4 fade-in">
              {/* <span className="badge-primary px-3 py-2 rounded-pill mb-3 d-inline-block">
                The Ultimate Productivity Solution
              </span> */}

              <h1 className="display-4 fw-bold mb-3 hero-title">
                Land <span className="text-gradient">Government</span>{" "}
                <br className="d-none d-sm-block" />
                <span className="text-gradient">Contracts</span> on{" "}
                <br className="d-none d-sm-block" />
                <span className="fw-bold">Autopilot</span>
              </h1>

              <p className="lead mb-4 text-secondary hero-lead">
                SlingRFP's full‑service AI platform{" "}
                <strong>
                  builds your gov‑ready profile, plugs every compliance gap, and
                  writes winning proposals
                </strong>
                —so you capture predictable B2G revenue with almost zero lift.
              </p>

              <div className="d-flex flex-column gap-3 mb-4 slide-up feature-items">
                <div className="d-flex align-items-start feature-item">
                  <p className="mb-0">
                    We create (and maintain) your complete vendor dossier
                  </p>
                </div>
                <div className="d-flex align-items-start feature-item">
                  <p className="mb-0">
                    Automated gap analysis flags missing certs & docs—then we
                    secure them for you
                  </p>
                </div>
                <div className="d-flex align-items-start feature-item">
                  <p className="mb-0">
                    Proposals drafted, submitted, and iterated until the win rate
                    climbs
                  </p>
                </div>
              </div>

              <div className="d-grid gap-3 d-sm-flex mb-4 slide-up">
                <Button
                  href="/signup"
                  variant="primary"
                  size="lg"
                  className="glow-effect"
                >
                  Book a 15-min Strategy Call
                </Button>
              </div>

              <div
                className="d-flex align-items-center slide-up flex-wrap"
                style={{ animationDelay: "0.2s" }}
              >
                <div className="d-flex me-3 mb-2 mb-sm-0 user-avatars-container">
                  <div style={{ marginRight: "-8px" }}>
                    <div
                      className="position-relative rounded-circle border border-2 border-white user-avatar"
                      style={{
                        width: "44px",
                        height: "44px",
                        overflow: "hidden",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                      }}
                    >
                      <Image
                        src={theme === 'light' ? "/images/people-one-light.png" : "/images/people-one.png"}
                        alt="User 1"
                        fill
                        sizes="44px"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  </div>
                  <div style={{ marginRight: "-8px" }}>
                    <div
                      className="position-relative rounded-circle border border-2 border-white user-avatar"
                      style={{
                        width: "44px",
                        height: "44px",
                        overflow: "hidden",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                      }}
                    >
                      <Image
                        src={theme === 'light' ? "/images/people-two-light.png" : "/images/people-two.png"}
                        alt="User 2"
                        fill
                        sizes="44px"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  </div>
                  <div style={{ marginRight: "-8px" }}>
                    <div
                      className="position-relative rounded-circle border border-2 border-white user-avatar"
                      style={{
                        width: "44px",
                        height: "44px",
                        overflow: "hidden",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                      }}
                    >
                      <Image
                        src={theme === 'light' ? "/images/people-three-light.png" : "/images/people-three.png"}
                        alt="User 3"
                        fill
                        sizes="44px"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  </div>
                  <div
                    className="position-relative d-flex align-items-center justify-content-center rounded-circle bg-primary text-white border border-2 border-white fs-xs fw-bold user-counter"
                    style={{ 
                      width: "44px", 
                      height: "44px",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    }}
                  >
                    <span>+5k</span>
                  </div>
                </div>
                <div className="text-secondary user-count">
                  <strong className="text-dark">5,000+</strong> professionals
                  trust our platform daily
                </div>
              </div>
            </div>
          </Col>

          <Col lg={6} className="position-relative">
            <div
              className="position-relative slide-up"
              style={{ animationDelay: "0.3s", zIndex: 1 }}
            >
              <div
                className="p-2 rounded-4 bg-white shadow-lg dashboard-container"
                style={{
                  transform: "perspective(1000px) rotateY(-8deg) rotateX(5deg) rotate(1deg)",
                  maxWidth: "100%",
                }}
              >
                <div
                  className="dashboard-mockup position-relative rounded-3 overflow-hidden"
                  style={{ aspectRatio: "16/10" }}
                >
                  <Image
                    src="/images/dashboard.png"
                    alt="Platform dashboard showing productivity tools"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ objectFit: "cover" }}
                    className="rounded-3"
                    priority
                  />
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
