'use client';

import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Link from 'next/link';
import Button from '../ui/Button';

export default function FeaturesSection() {
  const [hoveredFeature, setHoveredFeature] = useState(null);
  
  // Define features with custom icons and descriptions
  const features = [
    {
      id: 1,
      title: 'Vendor Profile Builder',
      description: 'Comprehensive solution for licenses, insurances, NAICS codes, and SAM.gov registration',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"/>
        </svg>
      )
    },
    {
      id: 2,
      title: 'Qualification Gap Tracker',
      description: 'Auto-reminders and concierge filing to ensure compliance',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
          <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
          <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zM1.5 8a6.5 6.5 0 1 1 13 0 6.5 6.5 0 0 1-13 0z"/>
        </svg>
      )
    },
    {
      id: 3,
      title: 'Nationwide RFP Crawler',
      description: 'Covers 50 states and 30,000+ agencies for complete opportunity sourcing',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
          <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"/>
        </svg>
      )
    },
    {
      id: 4,
      title: 'Smart Eligibility Scoring',
      description: 'Intelligent filtering to skip unwinnable bids and focus on viable opportunities',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
        </svg>
      )
    },
    {
      id: 5,
      title: 'One-Click Proposal Generator',
      description: 'Creates Word/PDF documents with automated e-signature routing',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
          <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"/>
          <path d="M4.5 12.5A.5.5 0 0 1 5 12h3a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zm0-2A.5.5 0 0 1 5 10h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zm1.639-3.708 1.33.886 1.854-1.855a.25.25 0 0 1 .289-.047l1.888.974V7.5a.5.5 0 0 1-.5.5H5a.5.5 0 0 1-.5-.5V7s1.54-1.274 1.639-1.208zM6.25 6a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5z"/>
        </svg>
      )
    },
    {
      id: 6,
      title: 'Post-Award Analytics Dashboard',
      description: 'Tracks win factors and ROI for continuous improvement',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
          <path d="M0 0h1v15h15v1H0V0Zm14.817 3.113a.5.5 0 0 1 .07.704l-4.5 5.5a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61 4.15-5.073a.5.5 0 0 1 .704-.07Z"/>
        </svg>
      )
    },
    {
      id: 7,
      title: 'SOC 2-compliant security',
      description: 'Enterprise-grade protection with role-based access controls',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
          <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
        </svg>
      )
    }
  ];
  
  return (
    <section className="features-section py-6 position-relative overflow-hidden">
      {/* Decorative elements */}
      <div className="position-absolute decorative-blob blob-1"></div>
      <div className="position-absolute decorative-blob blob-2"></div>
      
      <Container className="position-relative" style={{ zIndex: 2 }}>
        <Row className="text-center mb-5">
          <Col lg={8} className="mx-auto">
            <h2 className="display-5 mb-3 fade-in">
              Feature <span className="text-gradient">Stack</span>
            </h2>
            <p className="lead text-body-secondary mb-5">
              Our comprehensive toolset for government contracting success
            </p>
          </Col>
        </Row>
        
        <div className="features-grid mb-5">
          {features.map((feature, index) => (
            <div 
              key={feature.id}
              className={`feature-card ${hoveredFeature === feature.id ? 'active' : ''}`}
              onMouseEnter={() => setHoveredFeature(feature.id)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              <div className="feature-check">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                </svg>
                </div>
                
              <div className="feature-content">
                <div className="feature-icon">
                  {feature.icon}
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
                </div>
            </div>
          ))}
            </div>
        
        <Row>
          <Col>
            <div className="cta-section">
              <div className="cta-glow"></div>
              <div className="cta-content">
                <h3>Ready to <span className="text-gradient">Transform</span> Your Government Contracting Journey?</h3>
                <Button 
                  href="/strategy-call" 
                  variant="white"
                >
                  Book Your Free Strategy Call
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      
      <style jsx global>{`
        /* Variables for theme compatibility */
        :root {
          --feature-card-bg: rgba(255, 255, 255, 0.02);
          --feature-card-border: rgba(255, 255, 255, 0.08);
          --feature-card-hover-bg: rgba(255, 255, 255, 0.05);
          --feature-check-bg: rgba(var(--primary-rgb), 0.15);
          --feature-icon-color: var(--primary);
          --feature-title-color: rgba(255, 255, 255, 0.95);
          --feature-description-color: rgba(255, 255, 255, 0.7);
          --cta-bg: var(--primary);
          --cta-text: #ffffff;
          --cta-button-bg: #ffffff;
          --cta-button-text: var(--primary);
        }
        
        [data-bs-theme="light"] {
          --feature-card-bg: rgba(255, 255, 255, 1);
          --feature-card-border: rgba(0, 0, 0, 0.08);
          --feature-card-hover-bg: rgba(255, 255, 255, 1);
          --feature-check-bg: rgba(var(--primary-rgb), 0.1);
          --feature-icon-color: var(--primary);
          --feature-title-color: #0f172a;
          --feature-description-color: #4b5563;
          --cta-bg: var(--primary);
          --cta-text: #ffffff;
          --cta-button-bg: #ffffff;
          --cta-button-text: var(--primary);
        }
        
        /* Section styling */
        .features-section {
          position: relative;
          background: var(--dark-bg, #111827);
        }
        
        [data-bs-theme="light"] .features-section {
          background: #f8fafc;
        }
        
        .decorative-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          z-index: 0;
          background: var(--primary-light);
          opacity: 0.03;
        }
        
        .blob-1 {
          top: 10%;
          right: -5%;
          width: 500px;
          height: 500px;
          animation: float 15s ease-in-out infinite alternate;
        }
        
        .blob-2 {
          bottom: 5%;
          left: -5%;
          width: 400px;
          height: 400px;
          animation: float 12s ease-in-out infinite alternate-reverse;
        }
        
        @keyframes float {
          0% {
            transform: translate(0, 0) rotate(0deg);
          }
          100% {
            transform: translate(30px, 30px) rotate(10deg);
          }
        }
        
        /* Features grid */
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
        }
        
        /* Feature card styling */
        .feature-card {
          background: var(--feature-card-bg);
          border: 1px solid var(--feature-card-border);
          border-radius: 16px;
          padding: 1.75rem;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        
        .feature-card:hover,
        .feature-card.active {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
          border-color: rgba(var(--primary-rgb), 0.3);
        }
        
        .feature-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--primary) 0%, var(--primary-light) 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .feature-card:hover::before,
        .feature-card.active::before {
          opacity: 1;
        }
        
        .feature-check {
          position: absolute;
          top: 1.75rem;
          right: 1.75rem;
          width: 26px;
          height: 26px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--primary);
          transition: all 0.3s ease;
        }
        
        .feature-card:hover .feature-check,
        .feature-card.active .feature-check {
          transform: scale(1.1);
        }
        
        .feature-content {
          padding-right: 2rem;
        }
        
        .feature-icon {
          margin-bottom: 1.25rem;
          color: var(--feature-icon-color);
          transition: all 0.3s ease;
        }
        
        .feature-card:hover .feature-icon,
        .feature-card.active .feature-icon {
          transform: translateY(-3px);
        }
        
        .feature-title {
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 0.75rem;
          color: var(--feature-title-color);
        }
        
        .feature-description {
          font-size: 0.95rem;
          color: var(--feature-description-color);
          margin-bottom: 0;
          line-height: 1.5;
        }
        
        /* CTA section styling */
        .cta-section {
          background: var(--cta-bg);
          border-radius: 16px;
          padding: 3rem 2rem;
          text-align: center;
          color: var(--cta-text);
          position: relative;
          overflow: hidden;
          box-shadow: 0 15px 30px rgba(var(--primary-rgb), 0.2);
        }
        
        .cta-glow {
          position: absolute;
          width: 200px;
          height: 200px;
          background: rgba(255, 255, 255, 0.1);
          filter: blur(60px);
          border-radius: 50%;
          top: -100px;
          right: -100px;
        }
        
        .cta-content {
          position: relative;
          z-index: 2;
        }
        
        .cta-section h3 {
          font-size: 1.75rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
        }
        
        .cta-button {
          display: inline-block;
          background: var(--cta-button-bg);
          color: var(--cta-button-text);
          padding: 0.875rem 2rem;
          border-radius: 30px;
          font-weight: 600;
          transition: all 0.3s ease;
          text-decoration: none;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        
        .cta-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
          background: #f0f4ff;
          color: var(--primary);
        }
        
        .cta-button:active {
          transform: translateY(-1px);
          box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
          .features-grid {
            grid-template-columns: 1fr;
          }
          
          .feature-card {
            padding: 1.5rem;
          }
          
          .cta-section {
            padding: 2rem 1.5rem;
          }
          
          .cta-section h3 {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
}