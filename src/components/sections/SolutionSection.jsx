"use client";

import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Button from "../ui/Button";
import SectionContainer from "../SectionContainer";
import Icon from "../ui/Icon";
import { getSectionById } from "@/utils/contentUtils";

export default function SolutionSection() {
  const [activeStep, setActiveStep] = useState(null);
  const [isVisible, setIsVisible] = useState(true);
  const [solutionSection, setSolutionSection] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadSolutionSection() {
      try {
        setLoading(true);
        const sectionData = await getSectionById("home", "solution");
        if (sectionData) {
          setSolutionSection(sectionData);
        }
      } catch (error) {
        console.error("Error loading solution section:", error);
      } finally {
        setLoading(false);
      }
    }

    loadSolutionSection();
  }, []);

  // Add intersection observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.querySelector(".solution-section-container");
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  const handleStepHover = (index) => {
    setActiveStep(index);
  };

  // Map the steps to the required format with proper emojis
  const howItWorksSteps = [
    {
      number: 1,
      icon: "search",
      title: "Discover",
      description: "AI-curated solicitations aligned with your strengths and goals."
    },
    {
      number: 2,
      icon: "check-circle",
      title: "Qualify",
      description: "Detailed win-rate scores and eligibility checks—no wasted effort."
    },
    {
      number: 3,
      icon: "edit",
      title: "Craft",
      description: "Persuasive proposal drafts with data-backed narratives."
    },
    {
      number: 4,
      icon: "rocket",
      title: "Submit & Win",
      description: "Full submission handling, compliance checks, and post-award support."
    }
  ];

  if (loading || !solutionSection) {
    return (
      <SectionContainer
        className="solution-section-container"
        backgroundVariant="dark"
      >
        <Container>
          <Row className="justify-content-center text-center mb-5">
            <Col lg={10} xl={8}>
              {/* Skeleton for title */}
              <div className="skeleton-title mb-3"></div>
              {/* Skeleton for subtitle */}
              <div className="skeleton-subtitle"></div>
            </Col>
          </Row>

          <Row className="justify-content-center mb-5">
            <Col lg={10} className="solution-steps-container">
              {/* Skeleton for steps - generating 4 placeholders */}
              {[1, 2, 3, 4].map((_, index) => (
                <div key={index} className="solution-step-card skeleton-card">
                  <div className="step-icon">
                    <div className="skeleton-icon-wrapper"></div>
                  </div>
                  <div className="step-content">
                    <div className="skeleton-step-title"></div>
                    <div className="skeleton-step-description"></div>
                  </div>
                </div>
              ))}
            </Col>
          </Row>

          <Row className="justify-content-center">
            <Col lg={10} className="text-center">
              <div className="result-card skeleton-result-card">
                <div className="result-content">
                  <div className="skeleton-result-title"></div>
                  <div className="skeleton-result-description"></div>
                  <div className="skeleton-button"></div>
                </div>
              </div>
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

          .skeleton-title,
          .skeleton-subtitle,
          .skeleton-step-title,
          .skeleton-step-description,
          .skeleton-result-title,
          .skeleton-result-description,
          .skeleton-button,
          .skeleton-icon-wrapper {
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

          [data-bs-theme="light"] .skeleton-title,
          [data-bs-theme="light"] .skeleton-subtitle,
          [data-bs-theme="light"] .skeleton-step-title,
          [data-bs-theme="light"] .skeleton-step-description,
          [data-bs-theme="light"] .skeleton-result-title,
          [data-bs-theme="light"] .skeleton-result-description,
          [data-bs-theme="light"] .skeleton-button,
          [data-bs-theme="light"] .skeleton-icon-wrapper {
            background: linear-gradient(
              90deg,
              rgba(0, 0, 0, 0.04) 25%,
              rgba(0, 0, 0, 0.06) 50%,
              rgba(0, 0, 0, 0.04) 75%
            );
            background-size: 200px 100%;
          }

          .skeleton-title {
            height: 48px;
            width: 280px;
            margin: 0 auto 16px;
          }

          .skeleton-subtitle {
            height: 24px;
            width: 450px;
            max-width: 80%;
            margin: 0 auto;
          }

          .skeleton-card {
            opacity: 1 !important;
            transform: none !important;
          }

          .skeleton-icon-wrapper {
            width: 56px;
            height: 56px;
            border-radius: 16px;
          }

          .skeleton-step-title {
            height: 24px;
            width: 70%;
            margin-bottom: 12px;
          }

          .skeleton-step-description {
            height: 18px;
            width: 90%;
            margin-bottom: 8px;
          }

          .skeleton-step-description:last-child {
            width: 60%;
          }

          .skeleton-result-card {
            opacity: 1 !important;
            transform: none !important;
          }

          .skeleton-result-title {
            height: 32px;
            width: 200px;
            margin: 0 auto 16px;
          }

          .skeleton-result-description {
            height: 20px;
            width: 80%;
            margin: 0 auto 12px;
          }

          .skeleton-result-description:nth-child(3) {
            width: 60%;
            margin-bottom: 24px;
          }

          .skeleton-button {
            height: 48px;
            width: 160px;
            border-radius: 12px;
            margin: 16px auto 0;
          }
        `}</style>
      </SectionContainer>
    );
  }

  return (
    <SectionContainer
      id="solution"
      className="solution-section-container"
      backgroundVariant={solutionSection.backgroundVariant || "dark"}
    >
      {/* Decorative elements */}
      <div className="position-absolute shape-3"></div>
      <div className="position-absolute shape-4"></div>

      <Container className="position-relative" style={{ zIndex: 2 }}>
        <Row
          className={`justify-content-center text-center mb-5 ${
            isVisible ? "visible" : ""
          }`}
        >
          <Col lg={10} xl={8}>
            <h2
              className="display-5 mb-3 solution-title-animation"
              dangerouslySetInnerHTML={{ __html: "How It <span class='text-gradient'>Works</span>" }}
            />
            <p className="lead solution-subtitle-animation">
              Our proven four-step process simplifies government contracting from discovery to award
            </p>
          </Col>
        </Row>

        <Row className="justify-content-center mb-5">
          <Col lg={10} className="solution-steps-container">
            {howItWorksSteps.map((step, index) => (
              <div
                key={step.number}
                className={`solution-step-card ${
                  activeStep === index ? "active" : ""
                } ${isVisible ? "visible" : ""}`}
                style={{ animationDelay: `${0.4 + index * 0.15}s` }}
                onMouseEnter={() => handleStepHover(index)}
                onMouseLeave={() => handleStepHover(null)}
              >
                <div className="step-icon">
                  <div className="icon-wrapper">
                    <Icon name={step.icon} />
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
                className={`result-card ${isVisible ? "visible" : ""}`}
                style={{ animationDelay: "0.9s" }}
              >
                <div className="glow-effect-1"></div>
                <div className="glow-effect-2"></div>

                <div className="result-content">
                  <h3 className="result-title">Ready to Start?</h3>
                  <p className="result-description">
                    Get personalized guidance on winning your first government contract
                  </p>
                  {solutionSection.result.ctaButton && (
                    <Button
                      href={solutionSection.result.ctaButton.href}
                      variant="white"
                      size="lg"
                      className="mt-2"
                    >
                      {solutionSection.result.ctaButton.text}
                    </Button>
                  )}
                </div>
              </div>
            )}
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
          --feature-dot-color: rgba(255, 255, 255, 0.15);
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
          --feature-dot-color: rgba(67, 97, 238, 0.15);
        }

        /* Section styling */
        .solution-section-container {
          position: relative;
          width: 100%;
          overflow: hidden;
          padding: 5rem 0;
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
        .solution-title-animation,
        .solution-subtitle-animation,
        .solution-step-card,
        .result-card {
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

        .solution-step-card.visible,
        .result-card.visible {
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
          transition: all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
          position: relative;
          box-shadow: var(--card-shadow), 0 0 15px rgba(0, 0, 0, 0.03);
          backdrop-filter: blur(10px);
          overflow: hidden;
          height: 100%;
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
          transition: all 0.4s ease;
          margin-top: 1rem;
          max-width: 750px;
          margin-left: auto;
          margin-right: auto;
        }

        .glow-effect-1,
        .glow-effect-2 {
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
          margin-bottom: 0.75rem;
          font-size: 1.5rem;
          color: #fff;
        }

        .result-description {
          font-size: 1.1rem;
          margin-bottom: 1.5rem;
          color: rgba(255, 255, 255, 0.9);
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
