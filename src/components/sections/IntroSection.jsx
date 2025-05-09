'use client';

import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Button from '../ui/Button';
import SectionContainer from '../SectionContainer';
import { getSectionById } from '@/utils/contentUtils';

export default function IntroSection() {
  const [isVisible, setIsVisible] = useState(false);
  
  // Получаем данные секции из JSON-файла
  const introSection = getSectionById('home', 'intro');

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setIsVisible(true);
      }
    }, { threshold: 0.1 });
    
    const section = document.querySelector('.intro-section-container');
    if (section) observer.observe(section);
    
    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  // Если данные секции не найдены, не отображаем компонент
  if (!introSection) {
    return null;
  }

  return (
    <SectionContainer className="intro-section-container position-relative overflow-hidden py-7" backgroundVariant={introSection.backgroundVariant || "dark"}>
      {/* Decorative elements */}
      <div className="position-absolute intro-shape-1"></div>
      <div className="position-absolute intro-shape-2"></div>
      
      <Container className="position-relative" style={{ zIndex: 2 }}>
        <Row className="justify-content-center text-center">
          <Col lg={10} xl={9} className={`intro-content ${isVisible ? 'visible' : ''}`}>
            <h1 className="display-4 fw-bold mb-4 intro-title-animation">
              {introSection.title}
            </h1>
            <p className="lead mb-5 intro-subtitle-animation" style={{ fontSize: '1.3rem' }}>
              {introSection.subtitle}
            </p>
            <div className="intro-cta-animation">
              <Button 
                href={introSection.ctaButton.href} 
                variant="primary" 
                size="lg"
              >
                {introSection.ctaButton.text}
              </Button>
              <div className="btn-glow"></div>
            </div>
          </Col>
        </Row>
      </Container>
      
      <style jsx global>{`
        /* Core variables for theme compatibility */
        :root {
          --intro-bg: var(--dark-bg);
          --intro-text: #fff;
          --intro-subtitle: rgba(255, 255, 255, 0.85);
          --intro-shape-color-1: rgba(99, 102, 241, 0.15);
          --intro-shape-color-2: rgba(139, 92, 246, 0.1);
          --btn-glow-color: rgba(99, 102, 241, 0.4);
        }
        
        [data-bs-theme="light"] {
          --intro-bg: var(--light-bg);
          --intro-text: #1e293b;
          --intro-subtitle: #475569;
          --intro-shape-color-1: rgba(99, 102, 241, 0.1);
          --intro-shape-color-2: rgba(139, 92, 246, 0.06);
          --btn-glow-color: rgba(99, 102, 241, 0.25);
        }
        
        /* Section styling */
        .intro-section-container {
          min-height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--intro-bg);
        }
        
        /* Animations */
        .intro-content {
          opacity: 0;
          transform: translateY(30px);
          transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .intro-content.visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        .intro-title-animation {
          color: var(--intro-text);
          margin-bottom: 1.5rem;
          line-height: 1.3;
        }
        
        .intro-subtitle-animation {
          color: var(--intro-subtitle);
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.6;
        }
        
        /* Decorative shapes */
        .intro-shape-1 {
          top: 15%;
          right: -5%;
          width: 600px;
          height: 600px;
          background: var(--intro-shape-color-1);
          border-radius: 43% 57% 64% 36% / 43% 36% 64% 57%;
          filter: blur(80px);
          animation: floatShape 20s ease-in-out infinite alternate;
          z-index: 0;
        }
        
        .intro-shape-2 {
          bottom: 10%;
          left: -5%;
          width: 500px;
          height: 500px;
          background: var(--intro-shape-color-2);
          border-radius: 36% 64% 43% 57% / 64% 57% 43% 36%;
          filter: blur(80px);
          animation: floatShape 15s ease-in-out infinite alternate-reverse;
          z-index: 0;
        }
        
        @keyframes floatShape {
          0% {
            transform: translate(0, 0) rotate(0deg);
          }
          100% {
            transform: translate(40px, 40px) rotate(10deg);
          }
        }
        
        /* CTA button */
        .intro-cta-animation {
          position: relative;
          display: inline-block;
        }
        
        .btn-glow {
          position: absolute;
          bottom: -15px;
          left: 50%;
          transform: translateX(-50%);
          width: 70%;
          height: 25px;
          background: var(--btn-glow-color);
          border-radius: 50%;
          filter: blur(25px);
          z-index: -1;
        }
        
        /* Responsive adjustments */
        @media (max-width: 991.98px) {
          .intro-section-container {
            min-height: 60vh;
            padding-top: 5rem;
            padding-bottom: 5rem;
          }
          
          .intro-shape-1, .intro-shape-2 {
            width: 300px;
            height: 300px;
          }
        }
        
        @media (max-width: 767.98px) {
          .intro-title-animation {
            font-size: calc(1.4rem + 2.1vw);
          }
          
          .intro-subtitle-animation {
            font-size: 1.1rem;
          }
        }
      `}</style>
    </SectionContainer>
  );
} 