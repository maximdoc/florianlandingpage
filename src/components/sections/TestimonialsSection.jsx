'use client';

import { useState, useRef, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Image from 'next/image';
import SectionContainer from '../SectionContainer';
import { getSectionById } from '@/utils/contentUtils';

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [theme, setTheme] = useState('dark');
  const [testimonialsSection, setTestimonialsSection] = useState(null);
  const [loading, setLoading] = useState(true);
  const sliderRef = useRef(null);
  
  // Load section data from API
  useEffect(() => {
    async function loadTestimonialsSection() {
      try {
        setLoading(true);
        const sectionData = await getSectionById('home', 'testimonials');
        setTestimonialsSection(sectionData);
      } catch (error) {
        console.error('Error loading testimonials section:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadTestimonialsSection();
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
  
    // Cleanup
    return () => observer.disconnect();
  }, []);
  
  // Handle swipe functionality - MOVED UP before conditional returns
  useEffect(() => {
    if (!sliderRef.current) return;
    
    const handleTouchStart = (e) => {
      setTouchStart(e.targetTouches[0].clientX);
    };
    
    const handleTouchMove = (e) => {
      setTouchEnd(e.targetTouches[0].clientX);
    };
    
    const handleTouchEnd = () => {
      if (touchStart - touchEnd > 50) {
        // Swipe left - go to next slide
        setActiveIndex(prevIndex => {
          const testimonials = testimonialsSection?.testimonials || [];
          return prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1;
        });
      }
      
      if (touchEnd - touchStart > 50) {
        // Swipe right - go to previous slide
        setActiveIndex(prevIndex => {
          const testimonials = testimonialsSection?.testimonials || [];
          return prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1;
        });
      }
    };
    
    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener('touchstart', handleTouchStart, { passive: true });
      slider.addEventListener('touchmove', handleTouchMove, { passive: true });
      slider.addEventListener('touchend', handleTouchEnd, { passive: true });
      
      return () => {
        slider.removeEventListener('touchstart', handleTouchStart);
        slider.removeEventListener('touchmove', handleTouchMove);
        slider.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [touchStart, touchEnd, testimonialsSection]);
  
  if (loading || !testimonialsSection) {
    return (
      <SectionContainer 
        id="testimonials" 
        className="testimonials-section py-6 position-relative overflow-hidden" 
        backgroundVariant="dark"
      > 
        <Container className="position-relative">
          <Row className="mb-5 text-center">
            <Col lg={8} className="mx-auto">
              {/* Skeleton for section label */}
              <div className="skeleton-section-label mb-2"></div>
              {/* Skeleton for title */}
              <div className="skeleton-title mb-3"></div>
              {/* Skeleton for subtitle */}
              <div className="skeleton-subtitle"></div>
              <div className="skeleton-subtitle" style={{ width: "85%" }}></div>
            </Col>
          </Row>
          
          <div className="testimonial-carousel position-relative">
            <div className="testimonial-slider">
              {[0, 1, 2].map((index) => (
                <div 
                  key={index}
                  className={`testimonial-card skeleton-card ${index === 0 ? 'active' : index === 1 ? 'next' : 'prev'}`}
                >
                  {/* Skeleton for stars */}
                  <div className="skeleton-stars"></div>
                  
                  {/* Skeleton for testimonial content */}
                  <div className="testimonial-content">
                    <div className="skeleton-text-line"></div>
                    <div className="skeleton-text-line"></div>
                    <div className="skeleton-text-line"></div>
                    <div className="skeleton-text-line" style={{ width: "70%" }}></div>
                  </div>
                  
                  {/* Skeleton for author */}
                  <div className="testimonial-author">
                    <div className="skeleton-avatar"></div>
                    <div>
                      <div className="skeleton-author-name"></div>
                      <div className="skeleton-author-position"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="dots-container">
              {[0, 1, 2].map((index) => (
                <div 
                  key={index} 
                  className={`dot skeleton-dot ${index === 0 ? 'active' : ''}`}
                ></div>
              ))}
            </div>
            
            {/* Skeleton navigation arrows */}
            <div className="nav-arrow prev-arrow d-none d-md-flex skeleton-arrow">
              <div className="skeleton-arrow-inner"></div>
            </div>
            
            <div className="nav-arrow next-arrow d-none d-md-flex skeleton-arrow">
              <div className="skeleton-arrow-inner"></div>
            </div>
          </div>
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
          
          /* Common skeleton styles */
          .skeleton-section-label,
          .skeleton-title,
          .skeleton-subtitle,
          .skeleton-stars,
          .skeleton-text-line,
          .skeleton-avatar,
          .skeleton-author-name,
          .skeleton-author-position,
          .skeleton-arrow-inner {
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
          
          [data-bs-theme="light"] .skeleton-section-label,
          [data-bs-theme="light"] .skeleton-title,
          [data-bs-theme="light"] .skeleton-subtitle,
          [data-bs-theme="light"] .skeleton-stars,
          [data-bs-theme="light"] .skeleton-text-line,
          [data-bs-theme="light"] .skeleton-avatar,
          [data-bs-theme="light"] .skeleton-author-name,
          [data-bs-theme="light"] .skeleton-author-position,
          [data-bs-theme="light"] .skeleton-arrow-inner {
            background: linear-gradient(
              90deg,
              rgba(0, 0, 0, 0.04) 25%, 
              rgba(0, 0, 0, 0.06) 50%, 
              rgba(0, 0, 0, 0.04) 75%
            );
            background-size: 200px 100%;
          }
          
          /* Specific skeleton sizes */
          .skeleton-section-label {
            height: 16px;
            width: 100px;
            margin: 0 auto 16px;
          }
          
          .skeleton-title {
            height: 48px;
            width: 70%;
            margin: 0 auto 16px;
          }
          
          .skeleton-subtitle {
            height: 20px;
            width: 100%;
            margin: 0 auto 8px;
          }
          
          /* Testimonial card styling */
          .skeleton-card {
            opacity: 1 !important;
          }
          
          .skeleton-stars {
            height: 20px;
            width: 110px;
            margin-bottom: 16px;
          }
          
          .skeleton-text-line {
            height: 16px;
            width: 100%;
            margin-bottom: 12px;
          }
          
          .skeleton-avatar {
            width: 56px;
            height: 56px;
            border-radius: 50%;
            margin-right: 16px;
          }
          
          .skeleton-author-name {
            height: 18px;
            width: 120px;
            margin-bottom: 8px;
          }
          
          .skeleton-author-position {
            height: 14px;
            width: 160px;
          }
          
          .skeleton-dot {
            opacity: 0.5;
          }
          
          .skeleton-dot.active {
            opacity: 1;
          }
          
          .skeleton-arrow {
            display: flex;
            align-items: center;
            justify-content: center;
          }
          
          .skeleton-arrow-inner {
            width: 20px;
            height: 20px;
            border-radius: 50%;
          }
        `}</style>
      </SectionContainer>
    );
  }
  
  const testimonials = testimonialsSection.testimonials || [];

  const handlePrev = () => {
    setActiveIndex(prevIndex => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setActiveIndex(prevIndex => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <span key={i} className="star">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
        </svg>
      </span>
    ));
  };

  return (
    <SectionContainer 
      id="testimonials" 
      className="testimonials-section py-6 position-relative overflow-hidden" 
      backgroundVariant={testimonialsSection.backgroundVariant || "dark"}
    >
      <div className="position-absolute bg-shape shape-1"></div>
      <div className="position-absolute bg-shape shape-2"></div>
      <div className="position-absolute bg-shape shape-3"></div>
      
      <Container className="position-relative">
        <Row className="mb-5 text-center">
          <Col lg={8} className="mx-auto">
            <div className="section-label text-uppercase mb-2">{testimonialsSection.sectionLabel}</div>
            <h2 className="section-title mb-3" dangerouslySetInnerHTML={{ __html: testimonialsSection.title }} />
            <p className="section-subtitle">
              {testimonialsSection.subtitle}
            </p>
          </Col>
        </Row>
        
        <div className="testimonial-carousel position-relative">
          <div className="testimonial-slider" ref={sliderRef}>
            {testimonials.length > 0 && testimonials.map((testimonial, index) => {
              // Calculate position classes
              let positionClass = '';
              if (index === activeIndex) {
                positionClass = 'active';
              } else if (index === (activeIndex - 1 + testimonials.length) % testimonials.length) {
                positionClass = 'prev';
              } else if (index === (activeIndex - 2 + testimonials.length) % testimonials.length) {
                positionClass = 'prev-2';
              } else if (index === (activeIndex + 1) % testimonials.length) {
                positionClass = 'next';
              } else if (index === (activeIndex + 2) % testimonials.length) {
                positionClass = 'next-2';
              } else {
                positionClass = 'hidden';
              }
              
              // Choose avatar based on current theme
              const avatarSrc = theme === 'light' ? testimonial.avatarLight : testimonial.avatarDark;
              
              return (
                <div 
                  key={testimonial.id}
                  className={`testimonial-card ${positionClass}`}
                >
                  <div className="stars-container">
                    {renderStars(testimonial.rating)}
                  </div>
                  
                  <div className="testimonial-content">
                    <p className="testimonial-text">
                      "{testimonial.quote}"
                    </p>
                    </div>
                    
                    <div className="testimonial-author">
                    <div className="avatar-wrapper">
                          <Image 
                        src={avatarSrc} 
                            alt={testimonial.author} 
                        width={56} 
                        height={56}
                            className="avatar-image"
                          />
                      </div>
                      <div className="author-info">
                        <h5 className="author-name">{testimonial.author}</h5>
                        <p className="author-position">{testimonial.position}</p>
                      </div>
                    </div>
                  </div>
              );
            })}
                </div>
              
          <div className="dots-container">
                  {testimonials.length > 0 && testimonials.map((_, index) => (
                    <button 
                      key={index} 
                className={`dot ${activeIndex === index ? 'active' : ''}`}
                onClick={() => setActiveIndex(index)}
                aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>
          
          <button 
            className="nav-arrow prev-arrow d-none d-md-flex" 
            onClick={handlePrev}
            aria-label="Previous testimonial"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
            </svg>
          </button>
          
          <button 
            className="nav-arrow next-arrow d-none d-md-flex" 
            onClick={handleNext}
            aria-label="Next testimonial"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
            </svg>
          </button>
            </div>
      </Container>
      
      <style jsx global>{`
        /* Variables for theme compatibility */
        :root {
          --testimonial-bg: rgba(255, 255, 255, 0.04);
          --testimonial-border: rgba(255, 255, 255, 0.08);
          --testimonial-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
          --testimonial-active-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
          --testimonial-text: rgba(255, 255, 255, 0.9);
          --star-color: #FFD700;
          --author-name-color: #ffffff;
          --author-position-color: rgba(255, 255, 255, 0.7);
          --nav-arrow-bg: rgba(255, 255, 255, 0.08);
          --nav-arrow-color: #ffffff;
          --nav-arrow-hover-bg: rgba(255, 255, 255, 0.15);
          --nav-arrow-hover-color: #ffffff;
          --dot-inactive: rgba(255, 255, 255, 0.3);
          --dot-active: #ffffff;
          --section-label-color: rgba(255, 255, 255, 0.6);
        }
        
        [data-bs-theme="light"] {
          --testimonial-bg: #ffffff;
          --testimonial-border: rgba(0, 0, 0, 0.06);
          --testimonial-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
          --testimonial-active-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
          --testimonial-text: rgba(0, 0, 0, 0.8);
          --star-color: #FFD700;
          --author-name-color: #0f172a;
          --author-position-color: rgba(0, 0, 0, 0.6);
          --nav-arrow-bg: rgba(0, 0, 0, 0.05);
          --nav-arrow-color: #0f172a;
          --nav-arrow-hover-bg: rgba(0, 0, 0, 0.1);
          --nav-arrow-hover-color: #0f172a;
          --dot-inactive: rgba(0, 0, 0, 0.2);
          --dot-active: #0f172a;
          --section-label-color: rgba(0, 0, 0, 0.5);
        }
        
        /* Section styling */
        .testimonials-section {
          position: relative;
          background: var(--section-bg);
          padding: 5rem 0;
        }
        
        [data-bs-theme="light"] .testimonials-section {
          background: #f8fafc;
        }
        
        /* Background shapes */
        .bg-shape {
          position: absolute;
          background: rgba(99, 102, 241, 0.3);
          filter: blur(80px);
          opacity: 0.06;
          border-radius: 50%;
        }
        
        .shape-1 {
          width: 600px;
          height: 600px;
          top: -100px;
          right: -200px;
        }
        
        .shape-2 {
          width: 500px;
          height: 500px;
          bottom: -100px;
          left: -200px;
        }
        
        .shape-3 {
          width: 300px;
          height: 300px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: rgba(99, 102, 241, 0.4);
          opacity: 0.03;
        }
        
        /* Section headers */
        .section-label {
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 2px;
          color: var(--section-label-color);
        }
        
        .section-title {
          font-size: 2.6rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: var(--text-primary);
        }
        
        .section-subtitle {
          font-size: 1.1rem;
          color: var(--text-secondary);
          max-width: 700px;
          margin: 0 auto;
        }
        
        /* Testimonial carousel */
        .testimonial-carousel {
          position: relative;
          max-width: 1200px;
          margin: 0 auto;
          padding: 3rem 0;
        }
        
        .testimonial-slider {
          position: relative;
          height: 420px;
          margin-bottom: 2rem;
        }
        
        /* Testimonial cards */
        .testimonial-card {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          background: var(--testimonial-bg);
          border: 1px solid var(--testimonial-border);
          border-radius: 16px;
          padding: 2.5rem;
          width: 100%;
          max-width: 650px;
          margin: 0 auto;
          box-shadow: var(--testimonial-shadow);
          transition: transform 0.5s cubic-bezier(0.25, 1, 0.5, 1),
                      opacity 0.5s cubic-bezier(0.25, 1, 0.5, 1),
                      box-shadow 0.5s ease-out;
          opacity: 0;
          transform: scale(0.8) translateX(100px);
          pointer-events: none;
          backdrop-filter: blur(10px);
          z-index: 1;
          will-change: transform, opacity;
          transform-style: preserve-3d;
          backface-visibility: hidden;
          perspective: 1000px;
        }
        
        .testimonial-card.active {
          opacity: 1;
          transform: scale(1) translateX(0) translateZ(0);
          box-shadow: var(--testimonial-active-shadow);
          z-index: 5;
          pointer-events: auto;
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4);
          background: rgba(18, 24, 41, 0.9);
        }
        
        .testimonial-card.prev,
        .testimonial-card.next {
          opacity: 0.15;
          transform: scale(0.85) translateX(-30%) translateZ(0);
          z-index: 4;
          background: rgba(5, 10, 25, 0.95);
          backdrop-filter: blur(15px) brightness(0.3);
          pointer-events: none;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        
        .testimonial-card.next {
          transform: scale(0.85) translateX(30%) translateZ(0);
        }
        
        .testimonial-card.prev-2,
        .testimonial-card.next-2 {
          opacity: 0.05;
          transform: scale(0.7) translateX(-55%) translateZ(0);
          z-index: 3;
          background: rgba(5, 10, 25, 0.98);
          backdrop-filter: blur(20px) brightness(0.1);
          pointer-events: none;
          border: 1px solid rgba(255, 255, 255, 0.02);
        }
        
        .testimonial-card.next-2 {
          transform: scale(0.7) translateX(55%) translateZ(0);
        }
        
        .testimonial-card.hidden {
          opacity: 0;
          transform: scale(0.7) translateX(0);
          z-index: 1;
        }
        
        /* For light theme */
        [data-bs-theme="light"] .testimonial-card.active {
          border: 1px solid rgba(0, 0, 0, 0.1);
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.25);
          background: rgba(255, 255, 255, 0.98);
        }
        
        [data-bs-theme="light"] .testimonial-card.prev,
        [data-bs-theme="light"] .testimonial-card.next {
          background: rgba(220, 225, 230, 0.4);
          backdrop-filter: blur(15px) brightness(0.5);
          border: 1px solid rgba(0, 0, 0, 0.03);
        }
        
        [data-bs-theme="light"] .testimonial-card.prev-2,
        [data-bs-theme="light"] .testimonial-card.next-2 {
          background: rgba(200, 205, 210, 0.3);
          backdrop-filter: blur(20px) brightness(0.3);
          border: 1px solid rgba(0, 0, 0, 0.01);
        }
        
        /* Stars styling */
        .stars-container {
          display: flex;
          margin-bottom: 1.25rem;
        }
        
        .star {
          color: var(--star-color);
          margin-right: 4px;
        }
        
        /* Testimonial content */
        .testimonial-text {
          font-size: 1.25rem;
          line-height: 1.7;
          color: var(--testimonial-text);
          margin-bottom: 2rem;
          font-weight: 400;
        }
        
        /* Author info */
        .testimonial-author {
          display: flex;
          align-items: center;
        }
        
        .avatar-wrapper {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          overflow: hidden;
          margin-right: 1rem;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
          border: 2px solid rgba(255, 255, 255, 0.2);
          flex-shrink: 0;
        }
        
        [data-bs-theme="light"] .avatar-wrapper {
          border-color: rgba(0, 0, 0, 0.1);
        }
        
        .avatar-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .author-info {
          display: flex;
          flex-direction: column;
        }
        
        .author-name {
          font-size: 1.1rem;
          font-weight: 600;
          margin: 0;
          color: var(--author-name-color);
        }
        
        .author-position {
          font-size: 0.9rem;
          color: var(--author-position-color);
          margin: 0;
        }
        
        /* Navigation arrows */
        .nav-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--nav-arrow-bg);
          color: var(--nav-arrow-color);
          border: none;
          cursor: pointer;
          z-index: 10;
          transition: all 0.3s ease;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          opacity: 0.8;
        }
        
        .prev-arrow {
          left: -35px;
        }
        
        .next-arrow {
          right: -35px;
        }
        
        .nav-arrow:hover {
          background: var(--nav-arrow-hover-bg);
          color: var(--nav-arrow-hover-color);
          opacity: 1;
          transform: translateY(-50%) scale(1.05);
        }
        
        /* Dots navigation */
        .dots-container {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
          margin-top: 2.5rem;
          position: relative;
          z-index: 20;
        }
        
        .dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: none;
          padding: 0;
          background-color: var(--dot-inactive);
          cursor: pointer;
          transition: all 0.3s ease;
          margin: 0 4px;
        }
        
        .dot.active {
          background-color: var(--dot-active);
          transform: scale(1.3);
        }
        
        /* Responsive adjustments */
        @media (max-width: 991px) {
          .testimonials-section {
            padding: 5rem 0;
          }
          
          .testimonial-slider {
            height: 420px;
          }
          
          .section-title {
            font-size: 2.2rem;
          }
          
          .testimonial-text {
            font-size: 1.15rem;
          }
          
          .testimonial-card.prev,
          .testimonial-card.next {
            display: none;
          }
          
          .testimonial-card.prev-2,
          .testimonial-card.next-2 {
            display: none;
          }
        }
        
        /* Специальные настройки для средних и больших экранов */
        @media (min-width: 992px) and (max-width: 1200px) {
          .testimonial-slider {
            height: 460px;
          }
          
          .testimonial-card {
            max-width: 620px;
          }
          
          .testimonial-card.active {
            transform: scale(1) translateX(0);
            z-index: 5;
          }
          
          .testimonial-card.prev,
          .testimonial-card.next {
            opacity: 0.25;
            transform: scale(0.88) translateX(-25%);
          }
          
          .testimonial-card.next {
            transform: scale(0.88) translateX(25%);
          }
          
          .testimonial-card.prev-2,
          .testimonial-card.next-2 {
            opacity: 0.08;
            transform: scale(0.75) translateX(-45%);
          }
          
          .testimonial-card.next-2 {
            transform: scale(0.75) translateX(45%);
          }
          
          /* Унифицируем позиции стрелок */
          .prev-arrow {
            left: -30px;
          }
          
          .next-arrow {
            right: -30px;
          }
        }
        
        /* Специальные настройки для планшетов */
        @media (min-width: 768px) and (max-width: 992px) {
          .testimonial-slider {
            height: 480px;
          }
          
          .testimonial-card {
            max-width: 580px;
          }
          
          .testimonial-card.active {
            transform: scale(1) translateX(0);
            z-index: 5;
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
            background: rgba(18, 24, 41, 0.95);
          }
          
          [data-bs-theme="light"] .testimonial-card.active {
            background: rgba(255, 255, 255, 0.98);
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.18);
          }
          
          .testimonial-card.prev,
          .testimonial-card.next {
            display: block;
            opacity: 0.3;
            transform: scale(0.85) translateX(-20%);
            z-index: 4;
        }
        
          .testimonial-card.next {
            transform: scale(0.85) translateX(20%);
          }
          
          .testimonial-card.prev-2,
          .testimonial-card.next-2 {
            display: none;
          }
          
          .nav-arrow {
            width: 44px;
            height: 44px;
            opacity: 0.9;
          }
          
          .prev-arrow {
            left: -50px;
          }
          
          .next-arrow {
            right: -50px;
          }
          
          .testimonial-text {
            font-size: 1.1rem;
            line-height: 1.6;
          }
          
          .dots-container {
            margin-top: -0.5rem;
          }
        }
        
        @media (max-width: 767px) {
          .testimonials-section {
            padding: 5rem 0;
          }
          
          .testimonial-slider {
            height: auto;
            min-height: 350px;
            margin-bottom: 1rem;
            /* Enable touch events */
            touch-action: pan-y;
            user-select: none;
            -webkit-user-drag: none;
            cursor: grab;
            position: relative;
            transform: translateZ(0); /* Hardware acceleration */
          }
          
          .testimonial-slider:active {
            cursor: grabbing;
          }
          
          .testimonial-slider::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M15.4 16.6L10.8 12L15.4 7.4L14 6L8 12L14 18L15.4 16.6Z' fill='rgba(255,255,255,0.1)'/%3E%3C/svg%3E") left center no-repeat, 
                      url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8.6 16.6L13.2 12L8.6 7.4L10 6L16 12L10 18L8.6 16.6Z' fill='rgba(255,255,255,0.1)'/%3E%3C/svg%3E") right center no-repeat;
            background-size: 36px;
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.3s ease;
          }
          
          .testimonial-slider:hover::after {
            opacity: 1;
          }
          
          .testimonial-card {
            position: relative;
            max-width: 100%;
            padding: 1.5rem;
            margin: 0 auto;
            box-shadow: 0 15px 25px rgba(0, 0, 0, 0.2);
            border: 1px solid rgba(255, 255, 255, 0.15);
            transform: none;
          }
          
          .testimonial-card.active {
            transform: none;
            position: relative;
            left: 0;
            right: 0;
            margin: 0 auto;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
            border: 1px solid rgba(255, 255, 255, 0.2);
            background: rgba(18, 24, 41, 0.98);
          }
          
          [data-bs-theme="light"] .testimonial-card.active {
            border: 1px solid rgba(0, 0, 0, 0.1);
            background: rgba(255, 255, 255, 0.98);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
          }
          
          .testimonial-text {
            font-size: 1rem;
            line-height: 1.5;
            margin-bottom: 1.5rem;
          }
          
          .testimonial-card.prev,
          .testimonial-card.next,
          .testimonial-card.prev-2,
          .testimonial-card.next-2 {
            display: none;
          }
          
          .section-title {
            font-size: 1.8rem;
          }
          
          /* Полностью скрываем стрелки на мобильных */
          .nav-arrow {
            display: none !important;
          }
          
          .stars-container {
            margin-bottom: 1rem;
          }
          
          .avatar-wrapper {
            width: 40px;
            height: 40px;
            margin-right: 0.75rem;
          }
          
          .author-name {
            font-size: 0.95rem;
          }
          
          .author-position {
            font-size: 0.8rem;
          }
          
          .section-subtitle {
            font-size: 1rem;
            padding: 0 1rem;
          }
          
          .dots-container {
            margin-top: 0.5rem;
          }

          .testimonial-carousel {
            padding: 0;
          }
        }
        
        @media (max-width: 576px) {
          .testimonials-section {
            padding: 2.5rem 0 3.5rem;
          }
          
          .testimonial-slider {
            min-height: 320px;
          }
          
          .testimonial-card {
            padding: 1.25rem;
            border-radius: 12px;
          }
          
          .testimonial-text {
            font-size: 0.95rem;
            margin-bottom: 1.25rem;
          }
          
          .avatar-wrapper {
            width: 36px;
            height: 36px;
          }
          
          .author-name {
            font-size: 0.9rem;
          }
          
          .author-position {
            font-size: 0.75rem;
          }
          
          .stars-container svg {
            width: 14px;
            height: 14px;
          }

          .dot {
            width: 8px;
            height: 8px;
          }

          .dots-container {
            margin-top: 0;
          }

          .section-title {
            font-size: 1.6rem;
            margin-bottom: 0.5rem;
          }

          .section-subtitle {
            font-size: 0.9rem;
          }

          .mb-5 {
            margin-bottom: 2rem !important;
          }
        }
      `}</style>
    </SectionContainer>
  );
} 