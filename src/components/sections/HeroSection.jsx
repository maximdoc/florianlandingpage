"use client";

import { useState, useRef, useEffect } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";
import Button from "../ui/Button";
import SectionContainer from '../SectionContainer';
import { getPageBySlug, getSectionById } from '@/utils/contentUtils';

export default function HeroSection() {
  const [theme, setTheme] = useState('dark');
  const [isLoaded, setIsLoaded] = useState(false);
  const [heroSection, setHeroSection] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Load section data from API
  useEffect(() => {
    async function loadHeroSection() {
      try {
        setLoading(true);
        const sectionData = await getSectionById('home', 'hero');
        setHeroSection(sectionData);
      } catch (error) {
        console.error('Error loading hero section:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadHeroSection();
  }, []);
  
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
    
    // Set loaded state after a small delay
    // to give the browser time to apply styles
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    // Cleanup
    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);
  
  if (loading || !heroSection) {
    return (
      <SectionContainer 
        className="hero-section" 
        backgroundVariant="dark" 
        style={{ 
          padding: "5rem 0",
          minHeight: "600px" // Set a minimum height to prevent layout shift
        }}
      >
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

        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="mb-5 mb-lg-0">
              {/* Skeleton for Hero Title */}
              <div className="skeleton-hero-title mb-4"></div>
              
              {/* Skeleton for subtitle */}
              <div className="skeleton-hero-subtitle mb-2"></div>
              <div className="skeleton-hero-subtitle mb-2" style={{ width: "85%" }}></div>
              <div className="skeleton-hero-subtitle mb-4" style={{ width: "70%" }}></div>
              
              {/* Skeleton for buttons */}
              <div className="d-flex flex-wrap gap-3 mb-4">
                <div className="skeleton-button"></div>
                <div className="skeleton-button"></div>
              </div>
              
              {/* Skeleton for metrics */}
              <div className="d-flex flex-wrap gap-4 mt-4">
                <div className="skeleton-metric"></div>
                <div className="skeleton-metric"></div>
                <div className="skeleton-metric"></div>
              </div>
            </Col>
            
            <Col lg={6} className="text-center">
              {/* Skeleton for hero image */}
              <div className="skeleton-hero-image"></div>
            </Col>
          </Row>
        </Container>
       
        <style jsx global>{`
          /* Base skeleton animation */
          @keyframes skeleton-loading {
            0% {
              background-position: -200px 0;
            }
            100% {
              background-position: calc(200px + 100%) 0;
            }
          }
         
          .skeleton-hero-title,
          .skeleton-hero-subtitle,
          .skeleton-button,
          .skeleton-metric,
          .skeleton-hero-image {
            background: linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.05) 25%, 
              rgba(255, 255, 255, 0.1) 50%, 
              rgba(255, 255, 255, 0.05) 75%
            );
            background-size: 200px 100%;
            animation: skeleton-loading 1.5s infinite linear;
            border-radius: 4px;
            display: block;
          }
          
          [data-bs-theme="light"] .skeleton-hero-title,
          [data-bs-theme="light"] .skeleton-hero-subtitle,
          [data-bs-theme="light"] .skeleton-button,
          [data-bs-theme="light"] .skeleton-metric,
          [data-bs-theme="light"] .skeleton-hero-image {
            background: linear-gradient(
              90deg,
              rgba(0, 0, 0, 0.04) 25%, 
              rgba(0, 0, 0, 0.06) 50%, 
              rgba(0, 0, 0, 0.04) 75%
            );
            background-size: 200px 100%;
          }
       
          .skeleton-hero-title {
            height: 60px;
            width: 90%;
            margin-bottom: 24px;
          }
          
          .skeleton-hero-subtitle {
            height: 20px;
            width: 100%;
            margin-bottom: 12px;
          }
          
          .skeleton-button {
            height: 48px;
            width: 160px;
            border-radius: 12px;
          }
          
          .skeleton-metric {
            height: 60px;
            width: 80px;
          }
          
          .skeleton-hero-image {
            height: 330px;
            width: 100%;
            border-radius: 12px;
            margin: 0 auto;
          }
          
          /* Add more responsive skeleton sizes */
          @media (max-width: 576px) {
            .skeleton-hero-title {
              height: 45px;
              margin-bottom: 16px;
            }
            
            .skeleton-hero-subtitle {
              height: 18px;
              margin-bottom: 8px;
            }
            
            .skeleton-button {
              height: 40px;
              width: 130px;
            }
            
            .skeleton-hero-image {
              height: 240px;
            }
          }
        `}</style>
      </SectionContainer>
    );
  }

  // Cache the user images based on theme
  const userOneImage = theme === 'light' ? "/images/people-one-light.png" : "/images/optimized/people-one.webp";
  const userTwoImage = theme === 'light' ? "/images/people-two-light.png" : "/images/optimized/people-two.webp";
  const userThreeImage = theme === 'light' ? "/images/people-three-light.png" : "/images/optimized/people-three.webp";
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
          opacity: 0.2,
          animation: "float 8s ease-in-out infinite",
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
        }}
      ></div>
      
      <div
        className="position-absolute dots-grid dots-grid-bottom-left"
        style={{
          bottom: "15%",
          left: "10%",
          width: "180px",
          height: "180px",
          zIndex: -4,
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
        
        /* Remove any backgrounds from hero-section class */
        .hero-section {
          position: relative;
          width: 100%;
        }
        
        /* Декоративная сетка точек */
        .dots-grid {
          background-image: radial-gradient(var(--primary) 1.5px, transparent 1.5px);
          background-size: 18px 18px;
          opacity: 0.2;
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
        
        /* Убираем анимацию для статичности
        @keyframes floatDots {
          0% {
            transform-origin: center;
            transform: rotate(0deg);
          }
          50% {
            transform-origin: center;
            transform: rotate(5deg);
          }
          100% {
            transform-origin: center;
            transform: rotate(0deg);
          }
        }
        */
        
        [data-bs-theme="light"] .dots-grid {
          opacity: 0.35;
          background-image: radial-gradient(var(--primary) 2.5px, transparent 2.5px);
          filter: brightness(0.8); /* Makes dots darker for better visibility */
        }
        
        [data-bs-theme="dark"] .dots-grid {
          opacity: 0.25;
          background-image: radial-gradient(rgba(255, 255, 255, 0.9) 1.8px, transparent 1.8px);
        }
        
        /* Скрываем декоративные точки на мобильных устройствах */
        @media (max-width: 992px) {
          .dots-grid {
            display: none;
          }
        }
        
        /* Показываем только некоторые точки на средних устройствах */
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
        
        /* Dashboard image container with explicit styles */
        .dashboard-container {
          transform: perspective(1000px) rotateY(-8deg) rotateX(5deg) rotate(1deg);
          transform-origin: center center;
          transition: transform 0.5s ease;
          will-change: transform;
          max-width: 100%;
          width: 100%;
          height: auto;
          position: relative;
        }
        
        /* Fix for mobile layouts */
        @media (max-width: 992px) {
          .dashboard-container {
            transform: none !important;
          }
        }

        /* Add aspect ratio explicitly to prevent CLS */
        .dashboard-mockup {
          aspect-ratio: 16/10;
          width: 100%;
          height: auto;
          position: relative;
        }
        
        /* Image placeholders to prevent layout shifts */
        .user-avatar {
          position: relative;
          width: 44px !important;
          height: 44px !important;
          border-radius: 50%;
          overflow: hidden;
          display: block;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        /* Fix for text color in different themes */
        [data-bs-theme="light"] .text-dark {
          color: #0f172a !important;
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
              <h1 className="display-4 fw-bold mb-3 hero-title" dangerouslySetInnerHTML={{ __html: heroSection.title }} />

              <p className="lead mb-4 text-secondary hero-lead" dangerouslySetInnerHTML={{ __html: heroSection.subtitle }} />

              <div className="d-flex flex-column gap-3 mb-4 slide-up feature-items">
                {heroSection.features && heroSection.features.map((feature, index) => (
                  <div key={index} className="d-flex align-items-start feature-item">
                    <p className="mb-0">{feature}</p>
                  </div>
                ))}
              </div>

              {/* Add CTA Button */}
              {heroSection.ctaButton && (
                <div className="mb-4">
                  <Button 
                    href={heroSection.ctaButton.href} 
                    variant="primary" 
                    size="lg"
                  >
                    {heroSection.ctaButton.text}
                  </Button>
                </div>
              )}

              {heroSection.userStats && (
                <div
                  className="d-flex align-items-center slide-up flex-wrap"
                  style={{ animationDelay: "0.2s" }}
                >
                  <div className="d-flex me-3 mb-2 mb-sm-0 user-avatars-container">
                    <div style={{ marginRight: "-8px" }}>
                      <div className="user-avatar border border-2 border-white">
                        <Image
                          src={userOneImage}
                          alt="User 1"
                          width={44}
                          height={44}
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                    </div>
                    <div style={{ marginRight: "-8px" }}>
                      <div className="user-avatar border border-2 border-white">
                        <Image
                          src={userTwoImage}
                          alt="User 2"
                          width={44}
                          height={44}
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                    </div>
                    <div style={{ marginRight: "-8px" }}>
                      <div className="user-avatar border border-2 border-white">
                        <Image
                          src={userThreeImage}
                          alt="User 3"
                          width={44}
                          height={44}
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
                    <strong className="text-dark">{heroSection.userStats.count}</strong> {heroSection.userStats.text}
                  </div>
                </div>
              )}
            </div>
          </Col>

          <Col lg={6} className="position-relative">
            <div
              className={`position-relative slide-up ${!isLoaded ? 'loading-state' : ''}`}
              style={{ 
                animationDelay: "0.3s", 
                zIndex: 1,
                opacity: isLoaded ? 1 : 0,
                transition: "opacity 0.3s ease-in-out"
              }}
            >
              <div className="p-2 rounded-4 bg-white shadow-lg dashboard-container">
                <div className="dashboard-mockup rounded-3 overflow-hidden">
                  <Image
                    src={dashboardSrc}
                    alt="Platform dashboard showing productivity tools"
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
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAEPgIvMxPSXgAAAABJRU5ErkJggg=="
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
