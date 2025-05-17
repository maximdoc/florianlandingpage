"use client";

import { useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Button from "../ui/Button";
import SectionContainer from "../SectionContainer";
import Icon from "../ui/Icon";
import { getSectionById } from "@/utils/contentUtils";
import { addThemeChangeObserver, refreshIconColors } from "@/utils/themeUtils";

export default function BenefitsSection() {
  const [hoveredBenefit, setHoveredBenefit] = useState(null);
  const [isVisible, setIsVisible] = useState(true);
  const [currentTheme, setCurrentTheme] = useState("dark");
  const [benefitsSection, setBenefitsSection] = useState(null);
  const [loading, setLoading] = useState(false);
  const observerRef = useRef(null);

  useEffect(() => {
    async function loadBenefitsSection() {
      try {
        setLoading(true);
        const sectionData = await getSectionById("home", "benefits");
        if (sectionData) {
          setBenefitsSection(sectionData);
        }
      } catch (error) {
        console.error("Error loading benefits section:", error);
      } finally {
        setLoading(false);
      }
    }

    loadBenefitsSection();
  }, []);

  useEffect(() => {
    // Get initial theme
    const htmlElement = document.documentElement;
    setCurrentTheme(htmlElement.getAttribute("data-bs-theme") || "dark");

    // Create observer to watch for theme attribute changes
    observerRef.current = addThemeChangeObserver((newTheme) => {
      setCurrentTheme(newTheme);

      // Force icon color refresh after theme change
      setTimeout(() => {
        refreshIconColors(".benefit-icon-wrapper svg");
      }, 50);
    });

    // Cleanup observer on unmount
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Set up intersection observer for animations
  useEffect(() => {
    // Simple intersection observer for animation on scroll
    const visibilityObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.querySelector(".benefits-section");
    if (section) visibilityObserver.observe(section);

    return () => {
      if (section) visibilityObserver.unobserve(section);
    };
  }, []);

  if (!benefitsSection || loading) {
    return (
      <SectionContainer
        id="benefits"
        className="benefits-section py-6 position-relative overflow-hidden"
        backgroundVariant="light"
      >
        <Container className="position-relative" style={{ zIndex: 2 }}>
          <Row className="text-center mb-5">
            <Col lg={8} className="mx-auto">
              {/* Skeleton for title */}
              <div className="skeleton-title mb-3"></div>
              {/* Skeleton for subtitle */}
              <div className="skeleton-subtitle"></div>
            </Col>
          </Row>

          <Row className="g-4 benefits-cards">
            {/* Skeleton for benefit cards - generating 4 placeholders */}
            {[1, 2, 3, 4].map((_, index) => (
              <Col lg={6} className="benefit-col" key={index}>
                <div className="benefit-card skeleton-benefit-card">
                  <div className="benefit-header">
                    <div className="skeleton-icon-wrapper"></div>
                    <div className="benefit-content">
                      <div className="skeleton-benefit-title"></div>
                      <div className="skeleton-benefit-description"></div>
                      <div
                        className="skeleton-benefit-description"
                        style={{ width: "70%" }}
                      ></div>
                    </div>
                  </div>

                  <div className="magic-box skeleton-magic-box">
                    <div className="skeleton-magic-label"></div>
                    <div className="skeleton-magic-description"></div>
                    <div
                      className="skeleton-magic-description"
                      style={{ width: "60%" }}
                    ></div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>

          <Row>
            <Col className="text-center">
              <div className="cta-wrapper mt-5 pt-3">
                <div className="skeleton-cta-button"></div>
                <div className="btn-glow"></div>
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
          .skeleton-benefit-title,
          .skeleton-benefit-description,
          .skeleton-magic-label,
          .skeleton-magic-description,
          .skeleton-cta-button,
          .skeleton-icon-wrapper {
            background: linear-gradient(
              90deg,
              rgba(0, 0, 0, 0.04) 25%,
              rgba(0, 0, 0, 0.06) 50%,
              rgba(0, 0, 0, 0.04) 75%
            );
            background-size: 200px 100%;
            animation: skeleton-loading 1.5s infinite linear;
            border-radius: 4px;
            display: block;
          }

          [data-bs-theme="dark"] .skeleton-title,
          [data-bs-theme="dark"] .skeleton-subtitle,
          [data-bs-theme="dark"] .skeleton-benefit-title,
          [data-bs-theme="dark"] .skeleton-benefit-description,
          [data-bs-theme="dark"] .skeleton-magic-label,
          [data-bs-theme="dark"] .skeleton-magic-description,
          [data-bs-theme="dark"] .skeleton-cta-button,
          [data-bs-theme="dark"] .skeleton-icon-wrapper {
            background: linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.05) 25%,
              rgba(255, 255, 255, 0.1) 50%,
              rgba(255, 255, 255, 0.05) 75%
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

          .skeleton-benefit-card {
            opacity: 1 !important;
            transform: none !important;
          }

          .skeleton-icon-wrapper {
            width: 48px;
            height: 48px;
            border-radius: 16px;
            margin-right: 18px;
            flex-shrink: 0;
          }

          .skeleton-benefit-title {
            height: 24px;
            width: 70%;
            margin-bottom: 12px;
          }

          .skeleton-benefit-description {
            height: 16px;
            width: 90%;
            margin-bottom: 8px;
          }

          .skeleton-magic-box {
            margin-top: auto;
            opacity: 1 !important;
          }

          .skeleton-magic-label {
            height: 16px;
            width: 120px;
            margin-bottom: 12px;
          }

          .skeleton-magic-description {
            height: 16px;
            width: 90%;
            margin-bottom: 8px;
          }

          .skeleton-cta-button {
            height: 48px;
            width: 160px;
            border-radius: 12px;
            margin: 0 auto;
          }
        `}</style>
      </SectionContainer>
    );
  }

  return (
    <SectionContainer
      id="benefits"
      className="benefits-section py-6 position-relative overflow-hidden"
      backgroundVariant={benefitsSection.backgroundVariant || "light"}
    >
      {/* Decorative elements */}
      <div className="position-absolute shape-1"></div>
      <div className="position-absolute shape-2"></div>
      <div className="position-absolute shape-3"></div>

      {/* Decorative dot patterns */}
      <div
        className="position-absolute dots-grid dots-grid-top-right"
        style={{
          top: "10%",
          right: "5%",
          width: "180px",
          height: "180px",
          zIndex: -4,
        }}
      ></div>
      
      <div
        className="position-absolute dots-grid dots-grid-bottom-left"
        style={{
          bottom: "15%",
          left: "8%",
          width: "200px",
          height: "200px",
          zIndex: -4,
        }}
      ></div>
      
      <div
        className="position-absolute dots-grid dots-grid-center-right"
        style={{
          top: "45%",
          right: "8%",
          width: "150px",
          height: "150px",
          zIndex: -4,
        }}
      ></div>

      <Container className="position-relative" style={{ zIndex: 2 }}>
        <Row className={`text-center mb-5 ${isVisible ? "visible" : ""}`}>
          <Col lg={8} className="mx-auto">
            <h2
              className="display-5 mb-3 title-animation"
              dangerouslySetInnerHTML={{ __html: benefitsSection.title }}
            />
            <p className="lead subtitle-animation">
              {benefitsSection.subtitle}
            </p>
          </Col>
        </Row>

        <Row className="g-4 benefits-cards">
          {benefitsSection.tiles &&
            benefitsSection.tiles.map((benefit, index) => (
              <Col
                lg={6}
                className={`benefit-col ${isVisible ? "visible" : ""}`}
                style={{ animationDelay: `${index * 0.15}s` }}
                key={benefit.id}
              >
                <div
                  className={`benefit-card ${
                    hoveredBenefit === benefit.id ? "active" : ""
                  }`}
                  onMouseEnter={() => setHoveredBenefit(benefit.id)}
                  onMouseLeave={() => setHoveredBenefit(null)}
                >
                  <div className="benefit-header">
                    <div className="benefit-icon-wrapper">
                      <Icon name={benefit.icon} width={20} height={20} />
                    </div>
                    <div className="benefit-content">
                      <h3 className="benefit-title">{benefit.title}</h3>
                      <p className="benefit-description">
                        {benefit.description}
                      </p>
                    </div>
                  </div>

                  <div className="magic-box">
                    <div className="magic-label">{benefit.magicTitle}</div>
                    <p className="magic-description">
                      {benefit.magicDescription}
                    </p>
                  </div>

                  <div
                    className={`benefit-dot-pattern ${
                      index % 2 === 0 ? "pattern-right" : "pattern-left"
                    }`}
                  ></div>
                </div>
              </Col>
            ))}
        </Row>

        <Row className={`${isVisible ? "visible" : ""}`}>
          <Col className="text-center cta-animation">
            {benefitsSection.ctaButton && (
              <div className="cta-wrapper mt-5 pt-3">
                <Button
                  href={benefitsSection.ctaButton.href}
                  variant="primary"
                  size="lg"
                >
                  {benefitsSection.ctaButton.text}
                </Button>
                <div className="btn-glow"></div>
              </div>
            )}
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
          --feature-dot-color: rgba(255, 255, 255, 0.15);
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
          --feature-dot-color: rgba(67, 97, 238, 0.15);
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
        .title-animation,
        .subtitle-animation,
        .cta-animation {
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
          box-shadow: var(--card-shadow),
            0 0 20px rgba(var(--primary-rgb), 0.03);
          backdrop-filter: blur(10px);
        }

        /* Dot pattern styling */
        .benefit-dot-pattern {
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

        .benefit-card::before {
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

        .benefit-card::after {
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

        .benefit-card.active,
        .benefit-card:hover {
          transform: translateY(-8px) scale(1.01);
          box-shadow: var(--card-hover-shadow),
            0 15px 35px rgba(var(--primary-rgb), 0.08);
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
          width: 48px;
          height: 48px;
          border-radius: 16px;
          margin-right: 18px;
          transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
          flex-shrink: 0;
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          /* 3D эффект с улучшенными тенями */
          box-shadow: 0 5px 15px rgba(99, 102, 241, 0.4),
            0 0 0 1px rgba(255, 255, 255, 0.1),
            inset 0 -2px 5px rgba(0, 0, 0, 0.2),
            inset 0 2px 5px rgba(255, 255, 255, 0.3);
        }

        /* Эффект свечения */
        .benefit-icon-wrapper::before {
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

        .benefit-icon-wrapper::after {
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

        .benefit-icon-wrapper svg {
          color: white;
          position: relative;
          z-index: 1;
          width: 20px;
          height: 20px;
          transition: color 0.3s ease;
          fill: currentColor;
          will-change: transform;
        }

        [data-bs-theme="light"] .benefit-icon-wrapper svg {
          color: white !important; /* Important to override any inline styles */
        }

        [data-bs-theme="dark"] .benefit-icon-wrapper svg {
          color: white !important; /* Important to override any inline styles */
        }

        /* Улучшенный эффект при наведении */
        .benefit-card:hover .benefit-icon-wrapper,
        .benefit-card.active .benefit-icon-wrapper {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(99, 102, 241, 0.5),
            0 0 0 1px rgba(255, 255, 255, 0.15),
            inset 0 -2px 5px rgba(0, 0, 0, 0.2),
            inset 0 2px 5px rgba(255, 255, 255, 0.4);
        }

        .benefit-card:hover .benefit-icon-wrapper::before,
        .benefit-card.active .benefit-icon-wrapper::before {
          opacity: 1;
          filter: blur(10px);
        }

        .benefit-content {
          flex: 1;
        }

        .benefit-title {
          font-size: 1.15rem;
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
          z-index: 10;
        }

        .magic-box::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            135deg,
            rgba(var(--primary-rgb), 0.03),
            transparent 60%
          );
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
          content: "";
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 100%;
          height: 1px;
          background: linear-gradient(
            90deg,
            rgba(var(--primary-rgb), 0.3),
            transparent
          );
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
            width: 36px;
            height: 36px;
            border-radius: 10px;
            margin-right: 14px;
          }

          .benefit-icon-wrapper svg {
            width: 16px;
            height: 16px;
          }

          .benefit-title {
            font-size: 1.1rem;
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
            width: 32px;
            height: 32px;
            border-radius: 8px;
            margin-right: 12px;
          }

          .benefit-icon-wrapper svg {
            width: 20px;
            height: 20px;
          }

          .benefit-title {
            font-size: 1rem;
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

        /* Dots grid styles */
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
        
        [data-bs-theme="light"] .dots-grid {
          opacity: 0.35;
          background-image: radial-gradient(var(--primary) 2.5px, transparent 2.5px);
          filter: brightness(0.8);
        }
        
        [data-bs-theme="dark"] .dots-grid {
          opacity: 0.25;
          background-image: radial-gradient(rgba(255, 255, 255, 0.9) 1.8px, transparent 1.8px);
        }
        
        /* Hide decorative dots on mobile devices */
        @media (max-width: 992px) {
          .dots-grid {
            display: none;
          }
        }
        
        /* Display only some dots on medium devices */
        @media (min-width: 993px) and (max-width: 1200px) {
          .dots-grid-center-right {
            display: none;
          }
          
          .dots-grid-top-right,
          .dots-grid-bottom-left {
            width: 120px;
            height: 120px;
          }
        }
      `}</style>
    </SectionContainer>
  );
}
