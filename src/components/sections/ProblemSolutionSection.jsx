'use client';

import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Link from 'next/link';
import Button from '../ui/Button';
import SectionContainer from '../SectionContainer';
import { getSectionById } from '@/utils/contentUtils';

export default function ProblemSolutionSection() {
  const [activeStep, setActiveStep] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  
  // Получаем данные секции из JSON-файла
  const solutionSection = getSectionById('home', 'solution');
  
  // Add intersection observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setIsVisible(true);
      }
    }, { threshold: 0.1 });
    
    const section = document.querySelector('.solution-section-container');
    if (section) observer.observe(section);
    
    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);
  
  const handleStepHover = (index) => {
    setActiveStep(index);
  };

  // Если данные секции не найдены, не отображаем компонент
  if (!solutionSection) {
    return null;
  }

  return (
    <SectionContainer 
      id="solution" 
      className="solution-section-container" 
      backgroundVariant={solutionSection.backgroundVariant || "light"}
    >
      {/* Decorative elements */}
      <div className="position-absolute shape-3"></div>
      <div className="position-absolute shape-4"></div>
      
      <Container className="position-relative" style={{ zIndex: 2 }}>
        <Row className={`justify-content-center text-center mb-5 ${isVisible ? 'visible' : ''}`}>
          <Col lg={10} xl={8}>
            <h2 className="display-5 mb-3 solution-title-animation" dangerouslySetInnerHTML={{ __html: solutionSection.title }} />
            <p className="lead solution-subtitle-animation">
              {solutionSection.subtitle}
            </p>
          </Col>
        </Row>

        <Row className="justify-content-center mb-5">
          <Col lg={10} className="solution-steps-container">
              {solutionSection.steps.map((step, index) => (
                <div 
                  key={step.number}
                  className={`solution-step-card ${activeStep === index ? 'active' : ''} ${isVisible ? 'visible' : ''}`}
                  style={{ animationDelay: `${0.4 + index * 0.15}s` }}
                  onMouseEnter={() => handleStepHover(index)}
                  onMouseLeave={() => handleStepHover(null)}
                >
                  <div className="step-number">
                    <div className="number-circle">{step.number}</div>
                  </div>
                  <div className="step-content">
                    <h3 className="step-title">{step.title}</h3>
                    <p className="step-description">{step.description}</p>
                  </div>
                </div>
              ))}
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col lg={10} className="text-center">
            <div className={`result-card ${isVisible ? 'visible' : ''}`} style={{ animationDelay: '0.9s' }}>
              <div className="glow-effect-1"></div>
              <div className="glow-effect-2"></div>
              
              <div className="result-content">
                <h3 className="result-title">{solutionSection.result.title}</h3>
                <p className="result-description" dangerouslySetInnerHTML={{ __html: solutionSection.result.description }} />
                <Button 
                  href={solutionSection.result.ctaButton.href} 
                  variant="white" 
                  size="lg" 
                  className="mt-2"
                >
                  {solutionSection.result.ctaButton.text}
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      
      <style jsx global>{`
        /* Core variables for theme compatibility */
        :root {
          --solution-section-bg: var(--section-bg-light);
          --card-bg: rgba(255, 255, 255, 0.03);
          --card-border: rgba(255, 255, 255, 0.1);
          --card-hover-bg: rgba(255, 255, 255, 0.05);
          --card-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          --card-hover-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
          --text-primary: #fff;
          --text-secondary: rgba(255, 255, 255, 0.7);
          --step-card-bg: rgba(30, 41, 59, 0.6);
          --step-card-border: rgba(255, 255, 255, 0.08);
          --step-icon-color: #6366f1;
          --result-card-bg: #6366f1;
          --result-text-color: #ffffff;
          --primary-rgb: 99, 102, 241;
        }
        
        [data-bs-theme="light"] {
          --solution-section-bg: var(--section-bg-light);
          --card-bg: #ffffff;
          --card-border: rgba(0, 0, 0, 0.06);
          --card-hover-bg: #ffffff;
          --card-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
          --card-hover-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
          --text-primary: #0f172a;
          --text-secondary: #4b5563;
          --step-card-bg: #ffffff;
          --step-card-border: rgba(0, 0, 0, 0.08);
          --step-icon-color: #6366f1;
          --result-card-bg: #6366f1;
          --result-text-color: #ffffff;
        }
        
        /* Section styling */
        .solution-section-container {
          position: relative;
          width: 100%;
          overflow: hidden;
        }
        
        /* Animated shapes */
        .shape-3 {
          top: 15%;
          left: -10%;
          width: 450px;
          height: 450px;
          background: var(--primary-rgb, 99, 102, 241);
          opacity: 0.025;
          border-radius: 50% 50% 30% 70% / 50% 70% 30% 50%;
          filter: blur(90px);
          animation: floatShape 18s ease-in-out infinite alternate;
          position: absolute;
        }
        
        .shape-4 {
          bottom: 5%;
          right: -5%;
          width: 350px;
          height: 350px;
          background: var(--primary-rgb, 99, 102, 241);
          opacity: 0.02;
          border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
          filter: blur(80px);
          animation: pulse 8s ease-in-out infinite alternate;
          position: absolute;
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
        .solution-title-animation, .solution-subtitle-animation, .solution-step-card, .result-card {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .visible .solution-title-animation {
          opacity: 1;
          transform: translateY(0);
        }
        
        .visible .solution-subtitle-animation {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 0.2s;
        }
        
        .solution-step-card.visible, .result-card.visible {
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
        
        /* Solution steps styling */
        .solution-steps-container {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          justify-content: center;
        }
        
        .solution-step-card {
          display: flex;
          align-items: flex-start;
          background: var(--step-card-bg);
          border: 1px solid var(--step-card-border);
          border-radius: 16px;
          padding: 1.25rem;
          transition: all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
          position: relative;
          box-shadow: var(--card-shadow), 0 0 15px rgba(0, 0, 0, 0.03);
          backdrop-filter: blur(10px);
          overflow: hidden;
          width: calc(50% - 0.5rem);
          margin-bottom: 1rem;
        }
        
        .solution-step-card::before {
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
        
        .solution-step-card:hover,
        .solution-step-card.active {
          transform: translateY(-6px) scale(1.01);
          box-shadow: var(--card-hover-shadow), 0 15px 35px rgba(var(--primary-rgb), 0.08);
        }
        
        .solution-step-card:hover::before,
        .solution-step-card.active::before {
          opacity: 1;
        }
        
        .solution-step-card:hover::after,
        .solution-step-card.active::after {
          opacity: 1;
        }
        
        .step-number {
          margin-right: 1rem;
        }
        
        .number-circle {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: white;
          border-radius: 50%;
          font-weight: 700;
          font-size: 1rem;
          transition: all 0.3s ease;
          box-shadow: 0 4px 10px rgba(99, 102, 241, 0.3), inset 0 -2px 5px rgba(0, 0, 0, 0.2), inset 0 2px 5px rgba(255, 255, 255, 0.3);
          position: relative;
          overflow: hidden;
        }
        
        .number-circle::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 50%;
          background: linear-gradient(to bottom, rgba(255, 255, 255, 0.3), transparent);
          border-radius: 50% 50% 0 0;
        }
        
        .step-content {
          flex: 1;
        }
        
        .step-title {
          font-size: 1.15rem;
          font-weight: 700;
          margin-bottom: 0.4rem;
          color: var(--text-primary);
        }
        
        .step-description {
          color: var(--text-secondary);
          margin-bottom: 0;
          line-height: 1.4;
          font-size: 0.95rem;
        }
        
        /* Result card styling */
        .result-card {
          background: var(--result-card-bg);
          border-radius: 14px;
          padding: 1.5rem;
          color: var(--result-text-color);
          position: relative;
          overflow: hidden;
          box-shadow: 0 15px 30px rgba(99, 102, 241, 0.25);
          transition: all 0.4s ease;
          margin-top: 0.5rem;
          max-width: 750px;
          margin-left: auto;
          margin-right: auto;
        }
        
        .glow-effect-1, .glow-effect-2 {
          position: absolute;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          filter: blur(40px);
        }
        
        .glow-effect-1 {
          top: -20%;
          right: -10%;
          width: 60%;
          height: 60%;
          animation: pulse 10s infinite alternate;
        }
        
        .glow-effect-2 {
          bottom: -20%;
          left: -10%;
          width: 40%;
          height: 40%;
          animation: pulse 15s infinite alternate-reverse;
        }
        
        .result-content {
          position: relative;
          z-index: 1;
        }
        
        .result-title {
          font-weight: 700;
          margin-bottom: 0.5rem;
          font-size: 1.3rem;
          color: #fff;
        }
        
        .result-description {
          font-size: 1.1rem;
          margin-bottom: 1rem;
          color: rgba(255, 255, 255, 0.9);
        }
        
        /* Responsive adjustments */
        @media (max-width: 991.98px) {
          .solution-step-card {
            width: 100%;
            padding: 1rem;
          }
          
          .number-circle {
            width: 36px;
            height: 36px;
            font-size: 0.9rem;
          }
                    
          .step-title {
            font-size: 1.1rem;
          }
          
          .result-card {
            padding: 1.25rem;
          }
          
          .result-description {
            font-size: 1rem;
            margin-bottom: 0.75rem;
          }
        }
        
        @media (max-width: 767.98px) {
          .solution-section-container {
            padding: 3.5rem 0;
          }
                    
          .number-circle {
            width: 32px;
            height: 32px;
            font-size: 0.85rem;
            margin-right: 0.75rem;
          }
          
          .step-title {
            font-size: 1rem;
          }
          
          .result-card {
            padding: 1.25rem;
          }
          
          .result-title {
            font-size: 1.15rem;
            margin-bottom: 0.4rem;
          }
        }
        
        /* Дополнительные стили для маленьких экранов */
        @media (max-width: 576px) {
          .solution-step-card {
            width: 100%;
            margin-left: 0 !important;
            margin-right: 0 !important;
          }
        }
      `}</style>
    </SectionContainer>
  );
} 