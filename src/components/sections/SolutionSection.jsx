"use client";

import { useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Button from "../ui/Button";
import SectionContainer from "../SectionContainer";
import Icon from "../ui/Icon";
import content from "@/data/content.json";

export default function SolutionSection() {
  const [activeStep, setActiveStep] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  const sectionRef = useRef(null);
  
  // Get solution section data directly from content.json
  const homePageData = content.pages.find(page => page.id === 'home');
  const solutionSection = homePageData.sections.find(section => section.id === 'solution');

  // Add intersection observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Update visibility state based on intersection
        const isIntersecting = entries[0].isIntersecting;
        
        // Set visible state based on intersection
        setIsVisible(isIntersecting);
        
        // Once the section has been visible, mark it 
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

  const handleStepHover = (index) => {
    setActiveStep(index);
  };

  // If section data is not found, don't display the component
  if (!solutionSection) {
    return null;
  }

  return (
    <SectionContainer
      ref={sectionRef}
      id="solution"
      className="solution-section-container"
      backgroundVariant={solutionSection.backgroundVariant || "dark"}
    >
      {/* Decorative elements */}
      <div className={`position-absolute shape-3 ${isVisible ? 'animate-in' : 'animate-out'}`}></div>
      <div className={`position-absolute shape-4 ${isVisible ? 'animate-in' : 'animate-out'}`}></div>

      <Container className="position-relative" style={{ zIndex: 2 }}>
        <Row className="justify-content-center text-center mb-5">
          <Col lg={10} xl={8}>
            <div className={`section-title-wrapper ${isVisible ? 'animate-in' : 'animate-out'}`}>
            <h2
              className="display-5 mb-3 solution-title-animation"
                dangerouslySetInnerHTML={{ __html: solutionSection.title }}
            />
            <p className="lead solution-subtitle-animation">
                {solutionSection.subtitle}
            </p>
            </div>
          </Col>
        </Row>

        <Row className="justify-content-center mb-5">
          <Col lg={10} className="solution-steps-container">
            {solutionSection.steps && solutionSection.steps.map((step, index) => (
              <div
                key={step.number}
                className={`solution-step-card ${
                  activeStep === index ? "active" : ""
                } ${isVisible ? 'animate-in' : 'animate-out'}`}
                style={{ transitionDelay: `${200 + index * 150}ms` }}
                onMouseEnter={() => handleStepHover(index)}
                onMouseLeave={() => handleStepHover(null)}
              >
                <div className="step-icon">
                  <div className="icon-wrapper">
                    <Icon name={step.icon || `number-${step.number}`} />
                  </div>
                  <span className="step-number">{step.number}</span>
                </div>
                <div className="step-content">
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-description">{step.description}</p>
                </div>
                <div
                  className={`step-dot-pattern ${
                    index % 2 === 0 ? "pattern-right" : "pattern-left"
                  }`}
                ></div>
              </div>
            ))}
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col lg={10} className="text-center">
            {solutionSection.result && (
              <div
                className={`result-card ${isVisible ? 'animate-in' : 'animate-out'}`}
                style={{ 
                  transitionDelay: `${solutionSection.steps?.length ? 
                    200 + solutionSection.steps.length * 150 + 100 : 600}ms` 
                }}
              >
                <div className={`glow-effect-1 ${isVisible ? 'animate-in' : 'animate-out'}`}></div>
                <div className={`glow-effect-2 ${isVisible ? 'animate-in' : 'animate-out'}`}></div>

                <div className="result-content">
                  <h3 className="result-title">{solutionSection.result.title}</h3>
                  <p className="result-description">
                    {solutionSection.result.description}
                  </p>
                  {solutionSection.result.ctaButton && (
                    <div className="cta-button-wrapper">
                    <Button
                      href={solutionSection.result.ctaButton.href}
                      variant="white"
                      size="lg"
                      className="mt-2"
                    >
                      {solutionSection.result.ctaButton.text}
                    </Button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </Col>
        </Row>
      </Container>

      <style jsx global>{`
        /* Core variables with light theme values */
        :root {
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
          --primary-rgb: 99, 102, 241;
          --feature-dot-color: rgba(67, 97, 238, 0.15);
        }

        /* Section styling */
        .solution-section-container {
          position: relative;
          width: 100%;
          overflow: hidden;
          padding: 5rem 0;
        }
        
        /* Smooth scroll behavior for anchors */
        html {
          scroll-behavior: smooth;
        }
        
        @media (prefers-reduced-motion: reduce) {
          html {
            scroll-behavior: auto;
          }
          
          .section-title-wrapper,
          .solution-step-card,
          .result-card,
          .shape-3,
          .shape-4 {
            transition: none !important;
            transform: none !important;
            opacity: 1 !important;
          }
        }

        /* Animated shapes */
        .shape-3 {
          top: 15%;
          left: -10%;
          width: 450px;
          height: 450px;
          background: var(--primary-rgb, 99, 102, 241);
          opacity: 0;
          border-radius: 50% 50% 30% 70% / 50% 70% 30% 50%;
          filter: blur(90px);
          position: absolute;
          transform: translateX(-40px) scale(0.9);
          transition: opacity 1.2s ease-out, transform 1.2s ease-out;
        }
        
        .shape-3.animate-in {
          opacity: 0.025;
          transform: translateX(0) scale(1);
          animation: floatShape 18s ease-in-out infinite alternate;
        }
        
        .shape-3.animate-out {
          opacity: 0;
          transform: translateX(-40px) scale(0.9);
          animation: none;
          transition-duration: 0.8s;
        }

        .shape-4 {
          bottom: 5%;
          right: -5%;
          width: 350px;
          height: 350px;
          background: var(--primary-rgb, 99, 102, 241);
          opacity: 0;
          border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
          filter: blur(80px);
          position: absolute;
          transform: translateX(40px) scale(0.9);
          transition: opacity 1.2s ease-out, transform 1.2s ease-out;
          transition-delay: 0.2s;
        }
        
        .shape-4.animate-in {
          opacity: 0.02;
          transform: translateX(0) scale(1);
          animation: pulse 8s ease-in-out infinite alternate;
        }
        
        .shape-4.animate-out {
          opacity: 0;
          transform: translateX(40px) scale(0.9);
          animation: none;
          transition-duration: 0.8s;
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

        /* Section title wrapper */
        .section-title-wrapper {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .section-title-wrapper.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        .section-title-wrapper.animate-out {
          opacity: 0;
          transform: translateY(30px);
          transition-duration: 0.6s;
        }

        /* Title animations */
        .solution-title-animation {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.5s ease, transform 0.5s ease;
          transition-delay: 0.05s;
          display: block;
        }
        
        .section-title-wrapper.animate-in .solution-title-animation {
          opacity: 1;
          transform: translateY(0);
        }
        
        .section-title-wrapper.animate-out .solution-title-animation {
          opacity: 0;
          transform: translateY(20px);
        }
        
        .solution-subtitle-animation {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.5s ease, transform 0.5s ease;
          transition-delay: 0.15s;
        }

        .section-title-wrapper.animate-in .solution-subtitle-animation {
          opacity: 1;
          transform: translateY(0);
        }
        
        .section-title-wrapper.animate-out .solution-subtitle-animation {
          opacity: 0;
          transform: translateY(20px);
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
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
          justify-content: center;
        }

        .solution-step-card {
          display: flex;
          align-items: flex-start;
          background: var(--step-card-bg);
          border: 1px solid var(--step-card-border);
          border-radius: 16px;
          padding: 1.5rem;
          position: relative;
          box-shadow: var(--card-shadow), 0 0 15px rgba(0, 0, 0, 0.03);
          backdrop-filter: blur(10px);
          overflow: hidden;
          height: 100%;
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.8s cubic-bezier(0.16, 1, 0.3, 1),
                      box-shadow 0.5s cubic-bezier(0.2, 0.8, 0.2, 1),
                      border-color 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
          will-change: transform, opacity, box-shadow;
        }
        
        .solution-step-card.animate-in {
          opacity: 1;
          transform: translateY(0);
        }
        
        .solution-step-card.animate-out {
          opacity: 0;
          transform: translateY(30px);
          transition-duration: 0.6s;
        }

        /* Dot pattern styling */
        .step-dot-pattern {
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

        .solution-step-card::before {
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

        .solution-step-card:hover,
        .solution-step-card.active {
          transform: translateY(-6px) scale(1.01);
          box-shadow: var(--card-hover-shadow),
            0 15px 35px rgba(var(--primary-rgb), 0.08);
        }

        .solution-step-card:hover::before,
        .solution-step-card.active::before {
          opacity: 1;
        }

        .solution-step-card:hover::after,
        .solution-step-card.active::after {
          opacity: 1;
        }

        .step-icon {
          margin-right: 1.25rem;
          position: relative;
        }

        .icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 56px;
          height: 56px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: white;
          border-radius: 16px;
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
          /* 3D effect with enhanced shadows */
          box-shadow: 0 5px 15px rgba(99, 102, 241, 0.4),
            0 0 0 1px rgba(255, 255, 255, 0.1),
            inset 0 -2px 5px rgba(0, 0, 0, 0.2),
            inset 0 2px 5px rgba(255, 255, 255, 0.3);
        }

        /* Glowing effect */
        .icon-wrapper::before {
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

        /* Upper highlight for 3D effect */
        .icon-wrapper::after {
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

        .icon-wrapper svg {
          position: relative;
          z-index: 1;
          width: 24px;
          height: 24px;
        }

        .step-number {
          position: absolute;
          top: -8px;
          right: -8px;
          width: 22px;
          height: 22px;
          background: #ffffff;
          color: #6366f1;
          border-radius: 50%;
          font-size: 0.75rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
          z-index: 2;
        }

        .solution-step-card:hover .icon-wrapper,
        .solution-step-card.active .icon-wrapper {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(99, 102, 241, 0.5),
            0 0 0 1px rgba(255, 255, 255, 0.15),
            inset 0 -2px 5px rgba(0, 0, 0, 0.2),
            inset 0 2px 5px rgba(255, 255, 255, 0.4);
        }

        .solution-step-card:hover .icon-wrapper::before,
        .solution-step-card.active .icon-wrapper::before {
          opacity: 1;
          filter: blur(10px);
        }

        .step-content {
          flex: 1;
        }

        .step-title {
          font-size: 1.2rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          color: var(--text-primary);
        }

        .step-description {
          color: var(--text-secondary);
          margin-bottom: 0;
          line-height: 1.5;
          font-size: 0.95rem;
        }

        /* Result card styling */
        .result-card {
          background: var(--result-card-bg);
          border-radius: 16px;
          padding: 2rem;
          color: var(--result-text-color);
          position: relative;
          overflow: hidden;
          box-shadow: 0 15px 30px rgba(99, 102, 241, 0.25);
          margin-top: 1rem;
          max-width: 750px;
          margin-left: auto;
          margin-right: auto;
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.8s cubic-bezier(0.16, 1, 0.3, 1),
                      box-shadow 0.4s ease;
        }
        
        .result-card.animate-in {
          opacity: 1;
          transform: translateY(0);
        }
        
        .result-card.animate-out {
          opacity: 0;
          transform: translateY(30px);
          transition-duration: 0.6s;
        }

        .glow-effect-1,
        .glow-effect-2 {
          position: absolute;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          filter: blur(40px);
          opacity: 0;
          transition: opacity 1s ease-out, transform 1s ease-out;
        }

        .glow-effect-1 {
          top: -20%;
          right: -10%;
          width: 60%;
          height: 60%;
          transform: scale(0.8);
        }
        
        .glow-effect-1.animate-in {
          opacity: 1;
          transform: scale(1);
          animation: pulse 10s infinite alternate;
          transition-delay: 0.7s;
        }
        
        .glow-effect-1.animate-out {
          opacity: 0;
          transform: scale(0.8);
          animation: none;
        }

        .glow-effect-2 {
          bottom: -20%;
          left: -10%;
          width: 40%;
          height: 40%;
          transform: scale(0.8);
        }
        
        .glow-effect-2.animate-in {
          opacity: 1;
          transform: scale(1);
          animation: pulse 15s infinite alternate-reverse;
          transition-delay: 0.9s;
        }
        
        .glow-effect-2.animate-out {
          opacity: 0;
          transform: scale(0.8);
          animation: none;
        }

        .result-content {
          position: relative;
          z-index: 1;
        }

        .result-title {
          font-weight: 700;
          margin-bottom: 0.75rem;
          font-size: 1.5rem;
          color: #fff;
          opacity: 0;
          transform: translateY(15px);
          transition: opacity 0.5s ease, transform 0.5s ease;
          transition-delay: 0.2s;
        }
        
        .result-card.animate-in .result-title {
          opacity: 1;
          transform: translateY(0);
        }
        
        .result-card.animate-out .result-title {
          opacity: 0;
          transform: translateY(15px);
        }

        .result-description {
          font-size: 1.1rem;
          margin-bottom: 1.5rem;
          color: rgba(255, 255, 255, 0.9);
          opacity: 0;
          transform: translateY(15px);
          transition: opacity 0.5s ease, transform 0.5s ease;
          transition-delay: 0.3s;
        }
        
        .result-card.animate-in .result-description {
          opacity: 1;
          transform: translateY(0);
        }
        
        .result-card.animate-out .result-description {
          opacity: 0;
          transform: translateY(15px);
        }
        
        .cta-button-wrapper {
          opacity: 0;
          transform: translateY(10px);
          transition: opacity 0.6s ease, transform 0.6s ease;
          transition-delay: 0.4s;
        }
        
        .result-card.animate-in .cta-button-wrapper {
          opacity: 1;
          transform: translateY(0);
        }
        
        .result-card.animate-out .cta-button-wrapper {
          opacity: 0;
          transform: translateY(10px);
        }

        /* Responsive adjustments */
        @media (max-width: 991.98px) {
          .solution-steps-container {
            grid-template-columns: 1fr;
          }

          .solution-step-card {
            padding: 1.25rem;
          }

          .icon-wrapper {
            width: 48px;
            height: 48px;
          }

          .icon-wrapper svg {
            width: 20px;
            height: 20px;
          }

          .step-title {
            font-size: 1.1rem;
          }

          .result-card {
            padding: 1.5rem;
          }

          .result-description {
            font-size: 1rem;
            margin-bottom: 1rem;
          }
        }

        @media (max-width: 767.98px) {
          .solution-section-container {
            padding: 4rem 0;
          }

          .icon-wrapper {
            width: 42px;
            height: 42px;
          }

          .icon-wrapper svg {
            width: 18px;
            height: 18px;
          }

          .step-number {
            width: 20px;
            height: 20px;
            font-size: 0.7rem;
            top: -6px;
            right: -6px;
          }

          .step-title {
            font-size: 1rem;
          }

          .result-card {
            padding: 1.25rem;
          }

          .result-title {
            font-size: 1.25rem;
            margin-bottom: 0.5rem;
          }
          
          .result-description {
            font-size: 0.95rem;
          }
        }

        /* Additional styles for small screens */
        @media (max-width: 576px) {
          .solution-step-card {
            margin-left: 0 !important;
            margin-right: 0 !important;
          }
        }
      `}</style>
    </SectionContainer>
  );
}
