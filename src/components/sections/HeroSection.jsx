"use client";

import { useState, useEffect, useRef } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import Image from "next/image";
import Button from "../ui/Button";
import SectionContainer from '../SectionContainer';
import content from '@/data/content.json';

export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [animationStage, setAnimationStage] = useState(0);
  const animationTimerRef = useRef(null);
  
  // Get hero section data directly from content.json
  const homePageData = content.pages.find(page => page.id === 'home');
  const heroSection = homePageData.sections.find(section => section.id === 'hero');

  // Handle animation sequence
  useEffect(() => {
    // Progressive animation sequence
    const startAnimation = () => {
      // First set general loaded state
      setIsLoaded(true);
      
      // Then sequence through animation stages
      animationTimerRef.current = setTimeout(() => {
        setAnimationStage(1); // Title and subtitle
        
        animationTimerRef.current = setTimeout(() => {
          setAnimationStage(2); // Features and buttons
          
          animationTimerRef.current = setTimeout(() => {
            setAnimationStage(3); // User stats
            
            animationTimerRef.current = setTimeout(() => {
              setAnimationStage(4); // Dashboard
            }, 150);
          }, 150);
        }, 150);
      }, 300);
    };
    
    // Delay to ensure DOM is properly loaded
    const timer = setTimeout(() => {
      startAnimation();
    }, 300);

    // Cleanup
    return () => {
      clearTimeout(timer);
      if (animationTimerRef.current) {
        clearTimeout(animationTimerRef.current);
      }
    };
  }, []);
  
  // Handle image loaded event
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  // Get dashboard image from content
  const dashboardSrc = heroSection.dashboardImage || "/images/optimized/dashboard-second.webp";

  return (
    <SectionContainer className="hero-section" backgroundVariant={heroSection.backgroundVariant || "dark"}>
      {/* Background elements with explicit dimensions to prevent layout shift */}
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
          opacity: isLoaded ? 0.2 : 0,
          animation: isLoaded ? "float 8s ease-in-out infinite" : "none",
          transition: "opacity 0.8s ease-in-out",
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
          opacity: isLoaded ? 0.2 : 0,
          animation: isLoaded ? "float 6s ease-in-out infinite reverse" : "none",
          transition: "opacity 0.8s ease-in-out",
        }}
      ></div>

      {/* Dot grid decorations */}
      <div
        className="position-absolute dots-grid dots-grid-top-right"
        style={{
          top: "10%",
          right: "15%",
          width: "150px",
          height: "150px",
          zIndex: -4,
          opacity: isLoaded ? 1 : 0,
          transition: "opacity 1s ease-in-out",
          transitionDelay: "0.3s",
        }}
      ></div>
      
      {/* More dot grid decorations with similar transitions omitted for brevity */}
      <div
        className="position-absolute dots-grid dots-grid-bottom-left"
        style={{
          bottom: "15%",
          left: "10%",
          width: "180px",
          height: "180px",
          zIndex: -4,
          opacity: isLoaded ? 1 : 0,
          transition: "opacity 1s ease-in-out",
          transitionDelay: "0.4s",
        }}
      ></div>
      
      <div
        className="position-absolute dots-grid dots-grid-center-right"
        style={{
          top: "50%",
          right: "5%",
          width: "120px",
          height: "120px",
          zIndex: -4,
          opacity: isLoaded ? 1 : 0,
          transition: "opacity 1s ease-in-out",
          transitionDelay: "0.5s",
        }}
      ></div>
      
      <div
        className="position-absolute dots-grid dots-grid-top-left"
        style={{
          top: "15%",
          left: "5%",
          width: "100px",
          height: "100px",
          zIndex: -4,
          opacity: isLoaded ? 1 : 0,
          transition: "opacity 1s ease-in-out",
          transitionDelay: "0.6s",
        }}
      ></div>
      
      <div
        className="position-absolute dots-grid dots-grid-bottom-right"
        style={{
          bottom: "10%",
          right: "10%",
          width: "160px",
          height: "160px",
          zIndex: -4,
          opacity: isLoaded ? 1 : 0,
          transition: "opacity 1s ease-in-out",
          transitionDelay: "0.7s",
        }}
      ></div>

      <style jsx>{`
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
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
            opacity: 0;
          animation: fadeIn 0.8s ease-out forwards;
        }
        
        .animate-slide-up {
          opacity: 0;
          animation: slideUp 0.8s ease-out forwards;
        }
      `}</style>
      
      <style jsx global>{`
        /* Hero section styles */
        .hero-section {
          position: relative;
          width: 100%;
          overflow: hidden;
        }
        
        /* Dot grid patterns */
        .dots-grid {
          background-image: radial-gradient(var(--primary) 1.5px, transparent 1.5px);
          background-size: 18px 18px;
          opacity: 0.35;
          background-image: radial-gradient(var(--primary) 2.5px, transparent 2.5px);
          filter: brightness(0.8); /* Makes dots darker for better visibility */
        }
        
        .dots-grid-top-right {
          transform: rotate(10deg);
        }
        
        .dots-grid-bottom-left {
          transform: rotate(-5deg);
        }
        
        .dots-grid-center-right {
          transform: translateY(-50%) rotate(10deg);
          background-size: 15px 15px;
        }
        
        .dots-grid-top-left {
          transform: rotate(-8deg);
          background-size: 16px 16px;
        }
        
        .dots-grid-bottom-right {
          transform: rotate(7deg);
          background-size: 14px 14px;
        }
        
        /* Background blob styling */
        .background-blob {
          max-width: 150px;
          max-height: 150px;
          opacity: 0.4;
        }
        
        /* Dashboard image container styles */
        .dashboard-container {
          transform: perspective(1000px) rotateY(-8deg) rotateX(5deg) rotate(1deg);
          transform-origin: center center;
          transition: all 0.7s ease;
          will-change: transform;
          max-width: 100%;
          width: 100%;
          height: auto;
          position: relative;
          background-color: #ffffff !important;
          border: 1px solid rgba(0, 0, 0, 0.1);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
        }
        
        .dashboard-container:hover {
          transform: perspective(1000px) rotateY(-5deg) rotateX(3deg) rotate(0deg);
        }
        
        .dashboard-mockup {
          aspect-ratio: 16/10;
          width: 100%;
          height: auto;
          position: relative;
          transition: all 0.5s ease;
        }
        
        .dashboard-animation-container {
          position: relative;
          transition: all 0.8s ease-in-out;
        }
        
        .loading-state .dashboard-container {
          transform: perspective(1000px) rotateY(-3deg) rotateX(2deg) rotate(0deg) scale(0.95);
          opacity: 0.5;
        }
        
        /* Animations based on stages */
        .hero-content-stage-1 {
          opacity: 0;
          transform: translateY(15px);
        }
        
        .hero-content-stage-1.active {
          opacity: 1;
          transform: translateY(0);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        
        .hero-content-stage-2 {
          opacity: 0;
          transform: translateY(20px);
        }
        
        .hero-content-stage-2.active {
          opacity: 1;
          transform: translateY(0);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
          transition-delay: 0.15s;
        }
        
        .hero-content-stage-3 {
          opacity: 0;
          transform: translateY(20px);
        }
        
        .hero-content-stage-3.active {
          opacity: 1;
          transform: translateY(0);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
          transition-delay: 0.3s;
        }
        
        .hero-content-stage-4 {
          opacity: 0;
          transform: translateY(25px) scale(0.98);
        }
        
        .hero-content-stage-4.active {
          opacity: 1;
          transform: translateY(0) scale(1);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
          transition-delay: 0.2s;
        }
        
        /* User avatar styling */
        .user-avatar {
          position: relative;
          width: 44px !important;
          height: 44px !important;
          border-radius: 50%;
          overflow: hidden;
          display: block;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          z-index: 1;
          border: 2px solid #ffffff;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
          transform: translateZ(0);
          will-change: transform;
        }
        
        .user-avatar::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 50%;
          background: linear-gradient(135deg, #6366f1 0%, rgba(0,0,0,0) 60%);
          opacity: 0.7;
          z-index: 2;
          pointer-events: none;
        }
        
        .user-counter {
          border: 2px solid #ffffff;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
          transform: translateZ(0);
        }
        
        .user-avatars-container {
          display: flex;
          align-items: center;
        }
        
        .user-avatars-container > div {
          margin-right: -8px;
          transform: translateZ(0);
        }
        
        .user-avatars-container > div:nth-child(1) {
          z-index: 4;
        }
        
        .user-avatars-container > div:nth-child(2) {
          z-index: 3;
        }
        
        .user-avatars-container > div:nth-child(3) {
          z-index: 2;
        }
        
        .user-avatars-container > div:nth-child(4) {
          z-index: 1;
        }
        
        /* Feature item styling */
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
        
        /* Mobile stats container styles */
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
        
        .text-dark {
          color: #0f172a !important;
        }
        
        /* Animation shimmer effect */
        .shimmer-effect {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.05) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          animation: shimmer 2s infinite;
          z-index: 5;
          pointer-events: none;
        }
        
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        /* Responsive adjustments */
        @media (max-width: 1200px) {
          .dots-grid {
            display: none;
          }
          
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
        
        @media (min-width: 993px) and (max-width: 1200px) {
          .dots-grid-top-left,
          .dots-grid-bottom-right,
          .dots-grid-center-right {
            display: none;
          }
          
          .dots-grid-top-right,
          .dots-grid-bottom-left {
            width: 120px;
            height: 120px;
          }
        }
        
        @media (max-width: 991.98px) {
          .dashboard-container {
            max-width: 90%;
            margin: 0 auto;
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
      `}</style>

      <Container>
        <Row className="align-items-center gy-4 gy-lg-5">
          {/* Left column: headline, tagline, features, CTAs */}
          <Col lg={6} className="mb-3 mb-lg-0">
            <div className="mb-4">
              <div className={`hero-content-stage-1 ${animationStage >= 1 ? 'active' : ''}`}>
              <h1 className="display-4 fw-bold mb-3 hero-title" dangerouslySetInnerHTML={{ __html: heroSection.title }} />
              <p className="lead mb-4 text-secondary hero-lead" dangerouslySetInnerHTML={{ __html: heroSection.subtitle }} />
              </div>

              <div className={`hero-content-stage-2 ${animationStage >= 2 ? 'active' : ''}`}>
                <div className="d-flex flex-column gap-3 mb-4 feature-items">
                {heroSection.features && heroSection.features.map((feature, index) => (
                  <div key={index} className="d-flex align-items-start feature-item">
                    <div className="me-3 feature-icon-circle">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="bi bi-check-circle-fill" width="16" height="16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                      </svg>
                    </div>
                    <p className="mb-0">{feature}</p>
                  </div>
                ))}
              </div>

              {/* Add CTA Buttons - Primary and Secondary side by side */}
              {heroSection.ctaButton && (
                <div className="mb-4 d-flex flex-wrap gap-3">
                  <Button 
                    href={heroSection.ctaButton.href} 
                    variant="primary" 
                    size="lg"
                    className="hero-primary-cta"
                  >
                    {heroSection.ctaButton.text}
                  </Button>
                  
                  {/* Add Secondary CTA Button */}
                  {heroSection.secondaryCtaButton && (
                    <Button 
                      href={heroSection.secondaryCtaButton.href} 
                      variant="secondary" 
                      size="lg"
                      className="hero-secondary-cta"
                    >
                      {heroSection.secondaryCtaButton.text}
                    </Button>
                  )}
                </div>
              )}
              </div>

              {heroSection.userStats && (
                <div
                  className={`d-flex align-items-center flex-wrap hero-content-stage-3 ${animationStage >= 3 ? 'active' : ''}`}
                >
                  <div className="d-flex me-3 mb-2 mb-sm-0 user-avatars-container">
                    {heroSection.userStats.avatars && heroSection.userStats.avatars.map((avatar, index) => (
                      <div key={index}>
                        <div className="user-avatar">
                          <Image
                            src={avatar}
                            alt={`User ${index + 1}`}
                            width={44}
                            height={44}
                            style={{ 
                              objectFit: "cover",
                              width: "100%",
                              height: "100%"
                            }}
                          />
                        </div>
                      </div>
                    ))}
                    <div
                      className="position-relative d-flex align-items-center justify-content-center rounded-circle bg-primary text-white fs-xs fw-bold user-counter"
                      style={{ 
                        width: "44px", 
                        height: "44px",
                      }}
                    >
                      <span>+5k</span>
                    </div>
                  </div>
                  <div className="text-secondary user-count">
                    <strong className="text-dark">{heroSection.userStats.count}</strong> {heroSection.userStats.text}
                  </div>
                </div>
              )}
            </div>
          </Col>

          <Col lg={6} className="position-relative">
            {/* Right column: looping animation/illustration */}
            <div
              className={`position-relative hero-content-stage-4 ${animationStage >= 4 ? 'active' : ''} ${!imageLoaded ? 'loading-state' : ''}`}
            >
              <div className="p-2 rounded-4 shadow-lg dashboard-container">
                {!imageLoaded && <div className="shimmer-effect"></div>}
                <div className="dashboard-mockup rounded-3 overflow-hidden">
                  <Image
                    src={dashboardSrc}
                    alt="SlingRFP Dashboard"
                    width={1600}
                    height={1000}
                    style={{ 
                      objectFit: "cover",
                      width: "100%",
                      height: "auto" 
                    }}
                    className="rounded-3"
                    priority={true}
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88P/BfwAJMAOQn+GUHAAAAABJRU5ErkJggg=="
                    onLoad={handleImageLoad}
                  />
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </SectionContainer>
  );
}
