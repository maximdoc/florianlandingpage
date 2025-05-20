'use client';

import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import SectionContainer from '../SectionContainer';
import Button from '../ui/Button';
import { getSectionById } from '@/utils/contentUtils';
import Icon from '../ui/Icon';

// Skeleton Loader Component
function MissionSkeleton() {
  return (
    <SectionContainer
      className="mission-section-container py-6 position-relative overflow-hidden"
      backgroundVariant="dark"
    >
      <Container className="position-relative" style={{ zIndex: 2 }}>
        {/* Mission Statement Skeleton */}
        <Row className="justify-content-center mb-5">
          <Col lg={10} xl={9} className="mission-statement visible">
            <div className="skeleton-label mb-4" style={{ width: '120px', height: '24px' }}></div>
            <div className="skeleton-heading mb-5" style={{ height: '120px' }}></div>
          </Col>
        </Row>
        
        {/* Promise Section Skeleton */}
        <Row className="mb-5">
          <Col lg={12}>
            <div className="skeleton-label mb-4" style={{ width: '150px', height: '24px' }}></div>
            <Row className="g-4">
              {[1, 2, 3].map((item) => (
                <Col md={4} key={item} className="promise-item visible">
                  <div className="promise-card h-100">
                    <div className="skeleton-icon mb-4"></div>
                    <div className="skeleton-title mb-3"></div>
                    <div className="skeleton-text mb-1"></div>
                    <div className="skeleton-text mb-1"></div>
                    <div className="skeleton-text" style={{ width: '70%' }}></div>
                  </div>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
        
        {/* Value Proposition Skeleton */}
        <Row className="justify-content-center mt-5">
          <Col lg={10} xl={9} className="value-prop-container visible">
            <div className="value-prop-card">
              <div className="skeleton-label mb-3" style={{ width: '200px', height: '24px' }}></div>
              <div className="skeleton-text mb-1" style={{ height: '24px' }}></div>
              <div className="skeleton-text mb-4" style={{ width: '90%', height: '24px' }}></div>
              <div className="mt-4">
                <div className="skeleton-button"></div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      
      <style jsx global>{`
        /* Skeleton loader animation */
        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }
        
        .skeleton-label,
        .skeleton-heading,
        .skeleton-icon,
        .skeleton-title,
        .skeleton-text,
        .skeleton-button {
          background: linear-gradient(90deg, rgba(255, 255, 255, 0.05) 25%, rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0.05) 75%);
          background-size: 1000px 100%;
          animation: shimmer 2s infinite linear;
          border-radius: 8px;
        }
        
        .skeleton-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
        }
        
        .skeleton-title {
          width: 70%;
          height: 24px;
        }
        
        .skeleton-text {
          width: 100%;
          height: 16px;
        }
        
        .skeleton-button {
          width: 120px;
          height: 40px;
          border-radius: 20px;
        }
      `}</style>
    </SectionContainer>
  );
}

export default function MissionValueSection() {
  const [missionSection, setMissionSection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  
  // Load section data from API
  useEffect(() => {
    async function loadMissionSection() {
      try {
        setLoading(true);
        const sectionData = await getSectionById('home', 'mission');
        setMissionSection(sectionData);
      } catch (error) {
        console.error('Error loading mission section:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadMissionSection();
  }, []);
  
  // Add intersection observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setIsVisible(true);
      }
    }, { threshold: 0.1, rootMargin: '0px 0px -10% 0px' });
    
    const section = document.querySelector('.mission-section-container');
    if (section) observer.observe(section);
    
    // Ensure visibility after a timeout as fallback
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);
    
    return () => {
      if (section) observer.unobserve(section);
      clearTimeout(timer);
    };
  }, []);
  
  // If section data is not found, don't display the component
  if (loading) {
    return <MissionSkeleton />;
  }
  
  if (!missionSection) {
    return null;
  }

  return (
    <SectionContainer
      className="mission-section-container py-6 position-relative overflow-hidden"
      backgroundVariant={missionSection.backgroundVariant || "dark"}
    >
      {/* Decorative elements */}
      <div className="position-absolute mission-shape-1"></div>
      <div className="position-absolute mission-shape-2"></div>
      
      <Container className="position-relative" style={{ zIndex: 2 }}>
        {/* Mission Statement */}
        <Row className="justify-content-center mb-5">
          <Col lg={10} xl={9} className={`mission-statement ${isVisible ? 'visible' : ''}`}>
            <h2 className="h3 mb-4 mission-label">{missionSection.label || "Our Mission"}</h2>
            <h3 className="display-5 fw-bold mb-5 mission-text">
              {missionSection.mission}
            </h3>
          </Col>
        </Row>
        
        {/* Promise Section */}
        <Row className="mb-5">
          <Col lg={12}>
            <h3 className="h4 mb-4 promise-label">{missionSection.promiseLabel || "Our Promise"}</h3>
            <Row className="g-4">
              {missionSection.promises && missionSection.promises.map((promise, index) => (
                <Col md={4} key={index} className={`promise-item ${isVisible ? 'visible' : ''}`} style={{ animationDelay: `${0.2 + index * 0.15}s` }}>
                  <div className="promise-card h-100">
                    <div className="promise-icon-wrapper">
                      <div className="promise-icon">
                        <Icon name={promise.icon} width={20} height={20} />
                      </div>
                    </div>
                    <h4 className="promise-title">{promise.title}</h4>
                    <p className="promise-description">{promise.description}</p>
                    <div className={`promise-dot-pattern ${index % 2 === 0 ? "pattern-right" : "pattern-left"}`}></div>
                  </div>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
        
        {/* Value Proposition */}
        <Row className="justify-content-center mt-5">
          <Col lg={10} xl={9} className={`value-prop-container ${isVisible ? 'visible' : ''}`} style={{ animationDelay: "0.6s" }}>
            <div className="value-prop-card">
              <h3 className="h4 mb-3">{missionSection.valuePropLabel || "Single-Line Value Prop"}</h3>
              <p className="value-prop-text">
                {missionSection.valueProp}
              </p>
              {missionSection.ctaButton && (
                <div className="mt-4">
                  <Button 
                    href={missionSection.ctaButton.href} 
                    variant="primary"
                  >
                    {missionSection.ctaButton.text}
                  </Button>
                </div>
              )}
            </div>
          </Col>
        </Row>
      </Container>
      
      <style jsx global>{`
        /* Core variables for theme compatibility */
        :root {
          --mission-bg: var(--section-bg-light);
          --mission-title-color: var(--foreground);
          --mission-text-color: var(--foreground);
          --promise-card-bg: rgba(255, 255, 255, 0.03);
          --promise-card-border: rgba(255, 255, 255, 0.1);
          --promise-icon-bg: rgba(67, 97, 238, 0.15);
          --value-prop-card-bg: rgba(30, 41, 59, 0.6);
          --value-prop-card-border: rgba(255, 255, 255, 0.08);
        }
        
        [data-bs-theme="light"] {
          --mission-bg: var(--section-bg-light);
          --mission-title-color: #0f172a;
          --mission-text-color: #0f172a;
          --promise-card-bg: #ffffff;
          --promise-card-border: rgba(0, 0, 0, 0.06);
          --promise-icon-bg: rgba(67, 97, 238, 0.1);
          --value-prop-card-bg: #ffffff;
          --value-prop-card-border: rgba(0, 0, 0, 0.08);
        }

        /* Section styling */
        .mission-section-container {
          position: relative;
          width: 100%;
        }
        
        /* Animated shapes */
        .mission-shape-1 {
          top: 10%;
          left: -5%;
          width: 350px;
          height: 350px;
          background: var(--primary-rgb, 67, 97, 238);
          opacity: 0.035;
          border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
          filter: blur(60px);
          position: absolute;
        }
        
        .mission-shape-2 {
          bottom: 5%;
          right: -5%;
          width: 300px;
          height: 300px;
          background: var(--primary-rgb, 67, 97, 238);
          opacity: 0.025;
          border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
          filter: blur(60px);
          position: absolute;
        }
        
        /* Mission Statement */
        .mission-statement {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .mission-statement.visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        /* Force visibility on load with a delay */
        @media (prefers-reduced-motion: no-preference) {
          .mission-statement {
            animation: fadeInUp 1s ease-out 0.3s forwards;
          }
          
          .promise-item {
            animation: fadeInUp 1s ease-out 0.5s forwards;
          }
          
          .value-prop-container {
            animation: fadeInUp 1s ease-out 0.7s forwards;
          }
          
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        }
        
        .mission-label {
          color: var(--primary);
          text-transform: uppercase;
          letter-spacing: 1px;
          font-weight: 600;
          font-size: 0.9rem;
        }
        
        .mission-text {
          color: var(--mission-text-color);
          line-height: 1.4;
        }
        
        /* Promise Section */
        .promise-label {
          color: var(--mission-text-color);
          font-weight: 600;
        }
        
        .promise-item {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .promise-item.visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        .promise-card {
          background: var(--promise-card-bg);
          border: 1px solid var(--promise-card-border);
          border-radius: 16px;
          padding: 1.75rem;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
          transition: transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.5s ease;
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(10px);
        }
        
        .promise-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(
            90deg,
            rgba(var(--primary-rgb), 0.8) 0%,
            rgba(139, 92, 246, 0.8) 100%
          );
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        
        .promise-card::after {
          content: "";
          position: absolute;
          bottom: 0;
          right: 0;
          width: 40%;
          height: 30%;
          background: radial-gradient(
            circle at bottom right,
            rgba(var(--primary-rgb), 0.03),
            transparent 70%
          );
          opacity: 0;
          transition: opacity 0.5s ease;
          z-index: 0;
        }
        
        .promise-card:hover {
          transform: translateY(-8px) scale(1.01);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
        }
        
        .promise-card:hover::before {
          opacity: 1;
        }
        
        .promise-card:hover::after {
          opacity: 1;
        }
        
        /* Promise dot pattern styling */
        .promise-dot-pattern {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          width: 40%;
          z-index: 0;
          opacity: 0.3;
        }
        
        .pattern-right {
          right: 0;
          background-image: radial-gradient(
            var(--feature-dot-color, rgba(255, 255, 255, 0.15)) 1px,
            transparent 0
          );
          background-size: 12px 12px;
        }
        
        .pattern-left {
          left: 0;
          right: auto;
          background-image: radial-gradient(
            var(--feature-dot-color, rgba(255, 255, 255, 0.15)) 1px,
            transparent 0
          );
          background-size: 12px 12px;
        }
        
        .promise-icon-wrapper {
          display: flex;
          align-items: center;
          margin-bottom: 1.25rem;
          position: relative;
          z-index: 2;
        }
        
        .promise-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          border-radius: 16px;
          margin-right: 0;
          transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
          flex-shrink: 0;
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          /* 3D effect with improved shadows */
          box-shadow: 0 5px 15px rgba(99, 102, 241, 0.4),
            0 0 0 1px rgba(255, 255, 255, 0.1),
            inset 0 -2px 5px rgba(0, 0, 0, 0.2),
            inset 0 2px 5px rgba(255, 255, 255, 0.3);
        }
        
        /* Glow effect */
        .promise-icon::before {
          content: "";
          position: absolute;
          inset: -3px;
          background: linear-gradient(
            135deg,
            rgba(99, 102, 241, 0.2),
            rgba(139, 92, 246, 0.1)
          );
          border-radius: 18px;
          z-index: -1;
          filter: blur(8px);
          opacity: 0.8;
          transition: opacity 0.3s ease;
        }
        
        .promise-icon::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 50%;
          background: linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0.5),
            transparent
          );
          border-radius: 16px 16px 0 0;
          opacity: 0.7;
        }
        
        .promise-icon svg {
          color: white;
          position: relative;
          z-index: 1;
          width: 20px;
          height: 20px;
          transition: color 0.3s ease;
          fill: currentColor;
          will-change: transform;
        }
        
        [data-bs-theme="light"] .promise-icon svg {
          color: white !important; /* Important to override any inline styles */
        }
        
        [data-bs-theme="dark"] .promise-icon svg {
          color: white !important; /* Important to override any inline styles */
        }
        
        /* Enhanced hover effect */
        .promise-card:hover .promise-icon {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(99, 102, 241, 0.5),
            0 0 0 1px rgba(255, 255, 255, 0.15),
            inset 0 -2px 5px rgba(0, 0, 0, 0.2),
            inset 0 2px 5px rgba(255, 255, 255, 0.4);
        }
        
        .promise-card:hover .promise-icon::before {
          opacity: 1;
          filter: blur(10px);
        }
        
        .promise-title {
          font-weight: 600;
          font-size: 1.25rem;
          margin-bottom: 0.75rem;
          color: var(--mission-title-color);
          position: relative;
          z-index: 1;
        }
        
        .promise-description {
          color: var(--text-secondary);
          font-size: 1rem;
          line-height: 1.6;
          margin-bottom: 0;
          position: relative;
          z-index: 1;
        }
        
        /* Value Proposition */
        .value-prop-container {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .value-prop-container.visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        .value-prop-card {
          background: var(--value-prop-card-bg);
          border: 1px solid var(--value-prop-card-border);
          border-radius: 16px;
          padding: 2rem;
          text-align: center;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.07);
          backdrop-filter: blur(10px);
        }
        
        .value-prop-text {
          font-size: 1.25rem;
          font-weight: 500;
          color: var(--mission-text-color);
          line-height: 1.5;
          margin-bottom: 0;
        }
        
        /* Responsive styles */
        @media (max-width: 768px) {
          .mission-text {
            font-size: 1.75rem;
          }
          
          .promise-card {
            padding: 1.25rem;
          }
          
          .value-prop-text {
            font-size: 1.1rem;
          }
        }
      `}</style>
    </SectionContainer>
  );
} 