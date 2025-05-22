'use client';

import { useState, useEffect, useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import SectionContainer from '../SectionContainer';
import Button from '../ui/Button';
import Icon from '../ui/Icon';
import content from '@/data/content.json';

export default function MissionValueSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  const sectionRef = useRef(null);
  
  // Get mission section data directly from content.json
  const homePageData = content.pages.find(page => page.id === 'home');
  const missionSection = homePageData.sections.find(section => section.id === 'mission');
  
  // Add intersection observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Update visibility state based on intersection
        const isIntersecting = entries[0].isIntersecting;
        
        // Set visible state based on intersection
        setIsVisible(isIntersecting);
        
        // Once the section has been visible, mark it to enable animations
        if (isIntersecting && !hasBeenVisible) {
          setHasBeenVisible(true);
        }
      }, 
      { 
        threshold: 0.15,
        rootMargin: '0px 0px -10% 0px' 
      }
    );
    
    const section = sectionRef.current;
    if (section) observer.observe(section);
    
    return () => {
      if (section) observer.unobserve(section);
    };
  }, [hasBeenVisible]);
  
  // If section data is not found, don't display the component
  if (!missionSection) {
    return null;
  }

  return (
    <SectionContainer
      ref={sectionRef}
      className="mission-section-container py-6 position-relative overflow-hidden"
      backgroundVariant={missionSection.backgroundVariant || "dark"}
    >
      {/* Decorative elements */}
      <div className={`position-absolute mission-shape-1 ${isVisible ? 'animate-in' : 'animate-out'}`}></div>
      <div className={`position-absolute mission-shape-2 ${isVisible ? 'animate-in' : 'animate-out'}`}></div>
      
      <Container className="position-relative" style={{ zIndex: 2 }}>
        {/* Mission Statement */}
        <Row className="justify-content-center mb-5">
          <Col lg={10} xl={9} className={`mission-statement ${isVisible ? 'animate-in' : 'animate-out'}`}>
            <h2 className="h3 mb-4 mission-label">{missionSection.label || "Our Mission"}</h2>
            <h3 className="display-5 fw-bold mb-5 mission-text">
              {missionSection.mission}
            </h3>
          </Col>
        </Row>
        
        {/* Promise Section */}
        <Row className="mb-5">
          <Col lg={12}>
            <h3 className={`h4 mb-4 promise-label ${isVisible ? 'animate-in' : 'animate-out'}`} style={{ transitionDelay: '120ms' }}>
              {missionSection.promiseLabel || "Our Promise"}
            </h3>
            <Row className="g-4">
              {missionSection.promises && missionSection.promises.map((promise, index) => (
                <Col md={4} key={index} className={`promise-item ${isVisible ? 'animate-in' : 'animate-out'}`} 
                  style={{ transitionDelay: `${200 + index * 150}ms` }}>
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
          <Col lg={10} xl={9} className={`value-prop-container ${isVisible ? 'animate-in' : 'animate-out'}`} 
            style={{ transitionDelay: `${missionSection.promises?.length ? 200 + missionSection.promises.length * 150 + 100 : 650}ms` }}>
            <div className="value-prop-card">
              <h3 className="h4 mb-3">{missionSection.valuePropLabel || "Single-Line Value Prop"}</h3>
              <p className="value-prop-text">
                {missionSection.valueProp}
              </p>
              {missionSection.ctaButton && (
                <div className="mt-4 cta-button-wrapper">
                  <Button 
                    href={missionSection.ctaButton.href} 
                    variant="action"
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
        /* Core variables - using light theme values */
        :root {
          --mission-bg: var(--section-bg-light);
          --mission-title-color: #0f172a;
          --mission-text-color: #0f172a;
          --promise-card-bg: #ffffff;
          --promise-card-border: rgba(0, 0, 0, 0.06);
          --promise-icon-bg: rgba(67, 97, 238, 0.1);
          --value-prop-card-bg: #ffffff;
          --value-prop-card-border: rgba(0, 0, 0, 0.08);
          --feature-dot-color: rgba(0, 0, 0, 0.06);
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
          opacity: 0;
          border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
          filter: blur(60px);
          position: absolute;
          transform: translateX(-30px) scale(0.9);
          transition: opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), 
                      transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .mission-shape-1.animate-in {
          opacity: 0.035;
          transform: translateX(0) scale(1);
        }
        
        .mission-shape-1.animate-out {
          opacity: 0;
          transform: translateX(-30px) scale(0.9);
          transition-duration: 0.8s;
        }
        
        .mission-shape-2 {
          bottom: 5%;
          right: -5%;
          width: 300px;
          height: 300px;
          background: var(--primary-rgb, 67, 97, 238);
          opacity: 0;
          border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
          filter: blur(60px);
          position: absolute;
          transform: translateX(30px) scale(0.9);
          transition: opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), 
                      transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
          transition-delay: 0.2s;
        }
        
        .mission-shape-2.animate-in {
          opacity: 0.025;
          transform: translateX(0) scale(1);
        }
        
        .mission-shape-2.animate-out {
          opacity: 0;
          transform: translateX(30px) scale(0.9);
          transition-duration: 0.8s;
        }
        
        /* Mission Statement */
        .mission-statement {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .mission-statement.animate-in {
          opacity: 1;
          transform: translateY(0);
        }
        
        .mission-statement.animate-out {
          opacity: 0;
          transform: translateY(30px);
          transition-duration: 0.6s;
        }
        
        /* Smooth scroll behavior for anchors */
        html {
          scroll-behavior: smooth;
        }
        
        @media (prefers-reduced-motion: reduce) {
          html {
            scroll-behavior: auto;
          }
          
          .mission-statement,
          .promise-item,
          .value-prop-container,
          .mission-shape-1,
          .mission-shape-2,
          .promise-label {
            transition: none !important;
            transform: none !important;
            opacity: 1 !important;
          }
        }
        
        .mission-label {
          color: var(--primary);
          text-transform: uppercase;
          letter-spacing: 1px;
          font-weight: 600;
          font-size: 0.9rem;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.5s ease, transform 0.5s ease;
          transition-delay: 0.05s;
        }
        
        .mission-statement.animate-in .mission-label {
          opacity: 1;
          transform: translateY(0);
        }
        
        .mission-statement.animate-out .mission-label {
          opacity: 0;
          transform: translateY(20px);
        }
        
        .mission-text {
          color: var(--mission-text-color);
          line-height: 1.4;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.5s ease, transform 0.5s ease;
          transition-delay: 0.15s;
        }
        
        .mission-statement.animate-in .mission-text {
          opacity: 1;
          transform: translateY(0);
        }
        
        .mission-statement.animate-out .mission-text {
          opacity: 0;
          transform: translateY(20px);
        }
        
        /* Promise Section */
        .promise-label {
          color: var(--mission-text-color);
          font-weight: 600;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .promise-label.animate-in {
          opacity: 1;
          transform: translateY(0);
        }
        
        .promise-label.animate-out {
          opacity: 0;
          transform: translateY(20px);
          transition-duration: 0.6s;
        }
        
        .promise-item {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .promise-item.animate-in {
          opacity: 1;
          transform: translateY(0);
        }
        
        .promise-item.animate-out {
          opacity: 0;
          transform: translateY(30px);
          transition-duration: 0.6s;
        }
        
        .promise-card {
          background: var(--promise-card-bg);
          border: 1px solid var(--promise-card-border);
          border-radius: 16px;
          padding: 1.75rem;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
          transition: transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), 
                      box-shadow 0.5s ease;
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(10px);
          transform: translateY(0) scale(1);
          will-change: transform, box-shadow;
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
            var(--feature-dot-color) 1px,
            transparent 0
          );
          background-size: 12px 12px;
        }
        
        .pattern-left {
          left: 0;
          right: auto;
          background-image: radial-gradient(
            var(--feature-dot-color) 1px,
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
          color: white !important;
          position: relative;
          z-index: 1;
          width: 20px;
          height: 20px;
          transition: color 0.3s ease;
          fill: currentColor;
          will-change: transform;
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
          transform: translateY(30px);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .value-prop-container.animate-in {
          opacity: 1;
          transform: translateY(0);
        }
        
        .value-prop-container.animate-out {
          opacity: 0;
          transform: translateY(30px);
          transition-duration: 0.6s;
        }
        
        .value-prop-card {
          background: var(--value-prop-card-bg);
          border: 1px solid var(--value-prop-card-border);
          border-radius: 16px;
          padding: 2rem;
          text-align: center;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.07);
          backdrop-filter: blur(10px);
          position: relative;
          overflow: hidden;
        }
        
        .value-prop-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(
            90deg,
            rgba(99, 102, 241, 0.5) 0%,
            rgba(139, 92, 246, 0.5) 100%
          );
          opacity: 0;
          transition: opacity 0.6s ease;
        }
        
        .cta-button-wrapper {
          opacity: 0;
          transform: translateY(10px);
          transition: opacity 0.6s ease, transform 0.6s ease;
          transition-delay: 0.6s;
        }
        
        .value-prop-container.animate-in .cta-button-wrapper {
          opacity: 1;
          transform: translateY(0);
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