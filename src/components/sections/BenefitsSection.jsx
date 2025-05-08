'use client';

import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Link from 'next/link';
import Button from '../ui/Button';

export default function BenefitsSection() {
  const [hoveredBenefit, setHoveredBenefit] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Simple intersection observer for animation on scroll
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setIsVisible(true);
      }
    }, { threshold: 0.1 });
    
    const section = document.querySelector('.benefits-section');
    if (section) observer.observe(section);
    
    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);
  
  // Define benefits data for easier maintenance
  const benefitsData = [
    {
      id: 1,
      title: "Turn-key Readiness",
      description: "Bid on Day 1—no months-long prep.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16">
          <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zM3.5 5h2V3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5V5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-.89l.24 1.17A5.5 5.5 0 0 1 9.98 12h-.96a5.53 5.53 0 0 0 1.83-3H8.5v3h-1V9H5.35a5.53 5.53 0 0 0 1.83 3h-.96a5.5 5.5 0 0 1-2.37-3.84L4.09 7h-.89a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5z"/>
        </svg>
      ),
      magicTitle: "UNDER-THE-HOOD MAGIC",
      magicDescription: "Automated profile & credential builder",
      iconBg: "var(--primary-light)"
    },
    {
      id: 2,
      title: "Higher Qualification Rate",
      description: "Fewer instant disqualifications.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16">
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
        </svg>
      ),
      magicTitle: "UNDER-THE-HOOD MAGIC",
      magicDescription: "Real-time gap detection + certificate concierge",
      iconBg: "var(--primary-light)"
    },
    {
      id: 3,
      title: "Compounding Win Rates",
      description: "Models learn from every loss and win.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16">
          <path d="M0 0h1v15h15v1H0V0Zm14.817 3.113a.5.5 0 0 1 .07.704l-4.5 5.5a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61 4.15-5.073a.5.5 0 0 1 .704-.07Z"/>
        </svg>
      ),
      magicTitle: "UNDER-THE-HOOD MAGIC",
      magicDescription: "Reinforcement learning + agency feedback ingestion",
      iconBg: "var(--primary-light)"
    },
    {
      id: 4,
      title: "Single Point of Contact",
      description: "One invoice, one dashboard, zero hand-offs.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16">
          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"/>
        </svg>
      ),
      magicTitle: "UNDER-THE-HOOD MAGIC",
      magicDescription: "Integrated full-service workflow",
      iconBg: "var(--primary-light)"
    }
  ];

  return (
    <section className="benefits-section py-6 position-relative overflow-hidden">
      {/* Decorative elements */}
      <div className="position-absolute shape-1"></div>
      <div className="position-absolute shape-2"></div>
      <div className="position-absolute shape-3"></div>
      
      <Container className="position-relative" style={{ zIndex: 2 }}>
        <Row className={`text-center mb-5 ${isVisible ? 'visible' : ''}`}>
          <Col lg={8} className="mx-auto">
            <h2 className="display-5 mb-3 title-animation">
              Core <span className="text-gradient">Benefits</span>
            </h2>
            <p className="lead subtitle-animation">
              Our unique approach delivers measurable advantages for your government contracting journey
            </p>
          </Col>
        </Row>
        
        <Row className="g-4 benefits-cards">
          {benefitsData.map((benefit, index) => (
            <Col lg={6} className={`benefit-col ${isVisible ? 'visible' : ''}`} 
                 style={{ animationDelay: `${index * 0.15}s` }} 
                 key={benefit.id}>
              <div 
                className={`benefit-card ${hoveredBenefit === benefit.id ? 'active' : ''}`}
                onMouseEnter={() => setHoveredBenefit(benefit.id)}
                onMouseLeave={() => setHoveredBenefit(null)}
              >
                <div className="benefit-header">
                  <div 
                    className="benefit-icon-wrapper"
                    style={{ background: benefit.iconBg }}
                  >
                    {benefit.icon}
                  </div>
                  <div className="benefit-content">
                    <h3 className="benefit-title">{benefit.title}</h3>
                    <p className="benefit-description">{benefit.description}</p>
                  </div>
                </div>
                
                <div className="magic-box">
                  <div className="magic-label">{benefit.magicTitle}</div>
                  <p className="magic-description">{benefit.magicDescription}</p>
                </div>
              </div>
            </Col>
          ))}
        </Row>
        
        <Row className={`${isVisible ? 'visible' : ''}`}>
          <Col className="text-center cta-animation">
            <div className="cta-wrapper mt-5 pt-3">
              <Button 
                href="#strategy-call" 
                variant="primary" 
                size="lg"
              >
                Book Your Free Strategy Call
              </Button>
              <div className="btn-glow"></div>
            </div>
          </Col>
        </Row>
      </Container>
      
      {/* Styling for the benefits section */}
      <style jsx global>{`
        /* Core variables for theme compatibility */
        :root {
          --card-bg: rgba(255, 255, 255, 0.03);
          --card-border: rgba(255, 255, 255, 0.1);
          --card-hover-bg: rgba(255, 255, 255, 0.05);
          --card-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          --card-hover-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
          --text-primary: #fff;
          --text-secondary: rgba(255, 255, 255, 0.7);
          --magic-bg: rgba(23, 33, 58, 0.5);
          --magic-border: rgba(255, 255, 255, 0.07);
          --magic-label-color: #6366f1;
          --icon-wrapper-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
          --section-bg: #121829;
          --title-color: #ffffff;
          --subtitle-color: rgba(255, 255, 255, 0.8);
          --icon-color: var(--primary);
          --btn-hover-bg: #5457ea;
          --btn-active-bg: #4547e0;
        }
        
        [data-bs-theme="light"] {
          --card-bg: #ffffff;
          --card-border: rgba(0, 0, 0, 0.06);
          --card-hover-bg: #ffffff;
          --card-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
          --card-hover-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
          --text-primary: #0f172a;
          --text-secondary: #4b5563;
          --magic-bg: rgba(243, 244, 246, 1);
          --magic-border: rgba(0, 0, 0, 0.04);
          --magic-label-color: #6366f1;
          --icon-wrapper-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
          --section-bg: #f8fafc;
          --title-color: #0f172a;
          --subtitle-color: #4b5563;
          --icon-color: var(--primary);
          --btn-hover-bg: #5457ea;
          --btn-active-bg: #4547e0;
        }
        
        /* Section styling */
        .benefits-section {
          position: relative;
          background: var(--section-bg);
          padding: 5rem 0;
        }
        
        /* Animated shapes */
        .benefits-section .shape-1 {
          top: 5%;
          right: -10%;
          width: 500px;
          height: 500px;
          background: var(--primary-rgb, 99, 102, 241);
          opacity: 0.04;
          border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
          filter: blur(100px);
          animation: floatShape 15s ease-in-out infinite alternate;
        }
        
        .benefits-section .shape-2 {
          bottom: 10%;
          left: -15%;
          width: 600px;
          height: 600px;
          background: var(--primary-rgb, 99, 102, 241);
          opacity: 0.03;
          border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
          filter: blur(120px);
          animation: floatShape 20s ease-in-out infinite alternate-reverse;
        }
        
        .benefits-section .shape-3 {
          top: 40%;
          left: 30%;
          width: 300px;
          height: 300px;
          background: var(--primary-rgb, 99, 102, 241);
          opacity: 0.025;
          border-radius: 50%;
          filter: blur(90px);
          animation: pulse 8s ease-in-out infinite alternate;
        }
        
        @keyframes floatShape {
          0% {
            transform: translate(0, 0) rotate(0deg);
          }
          100% {
            transform: translate(40px, 40px) rotate(10deg);
          }
        }
        
        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 0.02;
          }
          100% {
            transform: scale(1.1);
            opacity: 0.04;
          }
        }
        
        /* Title animations */
        .title-animation, .subtitle-animation, .cta-animation {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .visible .title-animation {
          opacity: 1;
          transform: translateY(0);
        }
        
        .visible .subtitle-animation {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 0.2s;
        }
        
        .visible .cta-animation {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 0.6s;
        }
        
        /* Card animations */
        .benefit-col {
          opacity: 0;
          transform: translateY(50px);
          transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .benefit-col.visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        /* Text gradient styling */
        .text-gradient {
          background: linear-gradient(to right, #6366f1, #8b5cf6);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          -webkit-text-fill-color: transparent;
          display: inline;
        }
        
        /* Title styling */
        .benefits-section h2 {
          color: var(--title-color);
          font-weight: 800;
          letter-spacing: -0.02em;
        }
        
        .benefits-section .lead {
          color: var(--subtitle-color);
          font-size: 1.25rem;
          max-width: 700px;
          margin: 0 auto;
          line-height: 1.6;
        }
        
        /* Benefit cards styling */
        .benefit-card {
          display: flex;
          flex-direction: column;
          background: var(--card-bg);
          border: 1px solid var(--card-border);
          border-radius: 18px;
          padding: 28px;
          height: 100%;
          transition: all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
          position: relative;
          overflow: hidden;
          box-shadow: var(--card-shadow), 0 0 20px rgba(var(--primary-rgb), 0.03);
          backdrop-filter: blur(10px);
        }
        
        .benefit-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, rgba(var(--primary-rgb), 0.8) 0%, rgba(139, 92, 246, 0.8) 100%);
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        
        .benefit-card::after {
          content: '';
          position: absolute;
          bottom: 0;
          right: 0;
          width: 40%;
          height: 30%;
          background: radial-gradient(circle at bottom right, rgba(var(--primary-rgb), 0.03), transparent 70%);
          opacity: 0;
          transition: opacity 0.5s ease;
          z-index: 0;
        }
        
        .benefit-card.active, 
        .benefit-card:hover {
          transform: translateY(-8px) scale(1.01);
          box-shadow: var(--card-hover-shadow), 0 15px 35px rgba(var(--primary-rgb), 0.08);
        }
        
        .benefit-card.active::before,
        .benefit-card:hover::before {
          opacity: 1;
        }
        
        .benefit-card.active::after,
        .benefit-card:hover::after {
          opacity: 1;
        }
        
        .benefit-header {
          display: flex;
          align-items: flex-start;
          margin-bottom: 28px;
        }
        
        .benefit-icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 64px;
          height: 64px;
          border-radius: 16px;
          margin-right: 18px;
          transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
          box-shadow: var(--icon-wrapper-shadow), 0 5px 15px rgba(var(--primary-rgb), 0.1);
          flex-shrink: 0;
          position: relative;
          overflow: hidden;
          background: var(--primary-light);
          opacity: 0.9;
        }
        
        .benefit-icon-wrapper::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 50%;
          background: linear-gradient(to bottom, rgba(255, 255, 255, 0.2), transparent);
          opacity: 0.6;
          transition: opacity 0.3s ease, transform 0.3s ease;
        }
        
        .benefit-card:hover .benefit-icon-wrapper::after {
          opacity: 1;
          transform: translateY(3px);
        }
        
        .benefit-icon-wrapper svg {
          width: 30px;
          height: 30px;
          color: var(--icon-color);
          position: relative;
          z-index: 1;
          filter: drop-shadow(0 2px 3px rgba(0, 0, 0, 0.1));
          transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        
        .benefit-content {
          flex: 1;
        }
        
        .benefit-card.active .benefit-icon-wrapper,
        .benefit-card:hover .benefit-icon-wrapper {
          transform: scale(1.08) translateY(-3px);
          box-shadow: 0 8px 25px rgba(var(--primary-rgb), 0.2);
        }
        
        .benefit-card:hover .benefit-icon-wrapper svg {
          transform: scale(1.1);
        }
        
        .benefit-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 8px;
          color: var(--text-primary);
          line-height: 1.3;
        }
        
        .benefit-description {
          font-size: 1rem;
          margin-bottom: 0;
          color: var(--text-secondary);
          line-height: 1.5;
        }
        
        .magic-box {
          margin-top: auto;
          background: var(--magic-bg);
          border-radius: 14px;
          padding: 18px;
          transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
          border: 1px solid var(--magic-border);
          position: relative;
          overflow: hidden;
        }
        
        .magic-box::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(var(--primary-rgb), 0.03), transparent 60%);
          opacity: 0;
          transition: opacity 0.5s ease;
        }
        
        .benefit-card:hover .magic-box::before {
          opacity: 1;
        }
        
        .magic-label {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--magic-label-color);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 10px;
          position: relative;
          display: inline-block;
        }
        
        .magic-label::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, rgba(var(--primary-rgb), 0.3), transparent);
        }
        
        .magic-description {
          font-size: 0.95rem;
          margin-bottom: 0;
          color: var(--text-secondary);
          line-height: 1.5;
        }
        
        /* CTA button styling */
        .cta-wrapper {
          position: relative;
          display: inline-block;
          margin-top: 1rem;
        }
        
        .btn-glow {
          position: absolute;
          bottom: -12px;
          left: 50%;
          transform: translateX(-50%);
          width: 80%;
          height: 16px;
          background: var(--primary);
          border-radius: 50%;
          filter: blur(20px);
          opacity: 0.3;
          z-index: 0;
        }
        
        /* Responsive adjustments */
        @media (max-width: 991.98px) {
          .benefit-card {
            padding: 22px;
          }
          
          .benefit-icon-wrapper {
            width: 46px;
            height: 46px;
            border-radius: 10px;
            margin-right: 14px;
          }
          
          .benefit-title {
            font-size: 1.25rem;
          }
          
          .magic-box {
            padding: 14px;
          }
          
          .btn-glow {
            width: 70%;
          }
        }
        
        @media (max-width: 767.98px) {
          .benefits-section {
            padding: 4rem 0;
          }
          
          .benefit-icon-wrapper {
            width: 42px;
            height: 42px;
            border-radius: 8px;
            margin-right: 12px;
          }
          
          .benefit-title {
            font-size: 1.15rem;
          }
          
          .benefit-card {
            padding: 18px;
          }
          
          .magic-box {
            padding: 12px;
          }
          
          .text-gradient {
            background-size: 200% auto;
          }
          
          .btn-glow {
            width: 60%;
          }
        }
      `}</style>
    </section>
  );
} 