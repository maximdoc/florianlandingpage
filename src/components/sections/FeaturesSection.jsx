"use client";

import { useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Button from "../ui/Button";
import SectionContainer from "../SectionContainer";
import Icon from "../ui/Icon";
import content from "@/data/content.json";

// Custom hook to detect if element is in viewport
const useIsVisible = (ref) => {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref]);

  return isIntersecting;
};

export default function FeaturesSection() {
  const [hoveredFeature, setHoveredFeature] = useState(null);

  // Refs for animation
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const featuresRef = useRef(null);
  const ctaRef = useRef(null);

  // Check if elements are visible
  const isSectionVisible = useIsVisible(sectionRef);
  const isTitleVisible = useIsVisible(titleRef);
  const areFeaturesVisible = useIsVisible(featuresRef);
  const isCtaVisible = useIsVisible(ctaRef);

  // Get features section data directly from content.json
  const homePageData = content.pages.find(page => page.id === 'home');
  const featuresSection = homePageData.sections.find(section => section.id === 'features');

  return (
    <SectionContainer
      id="features"
      className="features-section py-8 position-relative overflow-hidden"
      backgroundVariant={featuresSection.backgroundVariant || "light"}
      ref={sectionRef}
    >
      <div className="position-absolute decorative-blob blob-1"></div>
      <div className="position-absolute decorative-blob blob-2"></div>

      {/* Decorative dot patterns */}
      <div
        className="position-absolute dots-grid"
        style={{
          top: "8%",
          right: "10%",
          width: "190px",
          height: "190px",
          zIndex: -1,
          transform: "rotate(10deg)",
        }}
      ></div>
      
      <div
        className="position-absolute dots-grid"
        style={{
          bottom: "18%",
          left: "8%",
          width: "240px",
          height: "240px",
          zIndex: -1,
          transform: "rotate(-5deg)",
        }}
      ></div>
      
      <div
        className="position-absolute dots-grid"
        style={{
          top: "45%",
          right: "5%",
          width: "150px",
          height: "150px",
          zIndex: -1,
          transform: "translateY(-50%) rotate(8deg)",
          backgroundSize: "16px 16px",
        }}
      ></div>
      
      <div
        className="position-absolute dots-grid"
        style={{
          top: "20%",
          left: "12%",
          width: "120px",
          height: "120px",
          zIndex: -1,
          transform: "rotate(-10deg)",
          backgroundSize: "12px 12px",
          opacity: "0.8",
        }}
      ></div>

      <Container className="position-relative" style={{ zIndex: 2 }}>
        <Row className="text-center mb-4" ref={titleRef}>
          <Col lg={8} className="mx-auto">
            <h2
              className={`display-5 mb-3 transition-all duration-1000 transform ${
                isTitleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              dangerouslySetInnerHTML={{ __html: featuresSection.title }}
            />
            <p 
              className={`lead text-body-secondary mb-4 transition-all duration-1000 delay-100 transform ${
                isTitleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              {featuresSection.subtitle}
            </p>
          </Col>
        </Row>

        <Row className="features-grid g-3 mb-5 mx-0" ref={featuresRef}>
          {featuresSection.tiles &&
            featuresSection.tiles.map((feature, index) => (
              <Col
                lg={feature.id === 7 ? 12 : 6}
                key={feature.id || index}
                className={`mb-3 ${feature.id === 7 ? "text-center" : ""}`}
                style={{ padding: "0 0.75rem" }}
              >
                <div
                  className={`feature-card ${
                    hoveredFeature === feature.id ? "active" : ""
                  } ${
                    feature.id === 7
                      ? "feature-card-center mx-auto"
                      : index % 2 === 0
                      ? "feature-card-left"
                      : "feature-card-right"
                  } transition-all duration-1000 transform ${
                    areFeaturesVisible 
                      ? "opacity-100 translate-y-0" 
                      : "opacity-0 translate-y-10"
                  }`}
                  style={{
                    transitionDelay: `${150 + index * 100}ms`,
                    ...( feature.id === 7 ? { maxWidth: "100%" } : {})
                  }}
                  onMouseEnter={() => setHoveredFeature(feature.id)}
                  onMouseLeave={() => setHoveredFeature(null)}
                >
                  <div className="feature-card-inner">
                    <div
                      className={`feature-dot-pattern ${
                        index % 2 === 0 ? "pattern-right" : "pattern-left"
                      }`}
                    ></div>

                    {index % 2 === 0 ? (
                      <>
                        <div className="feature-icon-container">
                          <div className="feature-icon-wrapper">
                            <Icon name={feature.icon} />
                          </div>
                        </div>
                        <div className="feature-content">
                          <h3 className="feature-title">{feature.title}</h3>
                          <p className="feature-description">
                            {feature.description}
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="feature-content order-2 order-md-1">
                          <h3 className="feature-title">{feature.title}</h3>
                          <p className="feature-description">
                            {feature.description}
                          </p>
                        </div>
                        <div className="feature-icon-container order-1 order-md-2">
                          <div className="feature-icon-wrapper">
                            <Icon name={feature.icon} />
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </Col>
            ))}
        </Row>

        <Row className="mx-0">
          <Col
            lg={10}
            xl={7}
            className="mx-auto text-center"
            style={{ padding: "0 0.75rem" }}
            ref={ctaRef}
          >
            {featuresSection.ctaSection && (
              <div 
                className={`cta-section w-100 transition-all duration-1000 transform ${
                  isCtaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
              >
                <div className="cta-content">
                  <h3
                    dangerouslySetInnerHTML={{
                      __html: featuresSection.ctaSection.title,
                    }}
                  />
                  {featuresSection.ctaSection.ctaButton && (
                    <Button
                      href={featuresSection.ctaSection.ctaButton.href}
                      variant="primary"
                    >
                      {featuresSection.ctaSection.ctaButton.text || "Find Opportunities"}
                    </Button>
                  )}
                </div>
              </div>
            )}
          </Col>
        </Row>
      </Container>

      <style jsx global>{`
        /* Animation utilities */
        .transition-all {
          transition-property: all;
        }

        .transform {
          transform-origin: center;
        }

        .duration-1000 {
          transition-duration: 1000ms;
        }

        .delay-100 {
          transition-delay: 100ms;
        }

        .opacity-0 {
          opacity: 0;
        }

        .opacity-100 {
          opacity: 1;
        }

        .translate-y-0 {
          transform: translateY(0);
        }

        .translate-y-10 {
          transform: translateY(40px);
        }

        /* Section styling */
        .features-section {
          position: relative;
          background: #f8fafc;
          padding: 5rem 0;
        }

        .decorative-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          z-index: 0;
          background: var(--primary-light);
          opacity: 0.03;
        }

        .blob-1 {
          top: 10%;
          right: -5%;
          width: 500px;
          height: 500px;
          animation: float 15s ease-in-out infinite alternate;
        }

        .blob-2 {
          bottom: 5%;
          left: -5%;
          width: 400px;
          height: 400px;
          animation: float 12s ease-in-out infinite alternate-reverse;
        }

        @keyframes float {
          0% {
            transform: translate(0, 0) rotate(0deg);
          }
          100% {
            transform: translate(30px, 30px) rotate(10deg);
          }
        }

        /* Feature card styling */
        .feature-card {
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
          backdrop-filter: blur(10px);
          background: rgba(255, 255, 255, 1);
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 12px;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          height: 100%;
        }

        .feature-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(
            90deg,
            var(--primary) 0%,
            var(--primary-light) 100%
          );
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 2;
        }

        .feature-card:hover::before,
        .feature-card.active::before {
          opacity: 1;
        }

        .feature-card:hover,
        .feature-card.active {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
          border-color: rgba(var(--primary-rgb), 0.3);
        }

        .feature-card-inner {
          padding: 2rem;
          display: flex;
          align-items: center;
          position: relative;
          z-index: 1;
        }

        .feature-dot-pattern {
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
            rgba(67, 97, 238, 0.15) 1px,
            transparent 1px
          );
          background-size: 16px 16px;
        }

        .pattern-left {
          left: 0;
          background-image: radial-gradient(
            rgba(67, 97, 238, 0.15) 1px,
            transparent 1px
          );
          background-size: 16px 16px;
        }

        /* Feature content styling */
        .feature-icon-container {
          flex-shrink: 0;
          margin-right: 1.5rem;
        }

        .feature-icon-wrapper {
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
        .feature-icon-wrapper::before {
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
        .feature-icon-wrapper::after {
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

        .feature-icon-wrapper svg {
          position: relative;
          z-index: 1;
          width: 24px;
          height: 24px;
        }

        .feature-card:hover .feature-icon-wrapper,
        .feature-card.active .feature-icon-wrapper {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(99, 102, 241, 0.5),
            0 0 0 1px rgba(255, 255, 255, 0.15),
            inset 0 -2px 5px rgba(0, 0, 0, 0.2),
            inset 0 2px 5px rgba(255, 255, 255, 0.4);
        }

        .feature-card:hover .feature-icon-wrapper::before,
        .feature-card.active .feature-icon-wrapper::before {
          opacity: 1;
          filter: blur(10px);
        }

        .feature-content {
          flex: 1;
        }

        .feature-title {
          font-weight: 700;
          font-size: 1.2rem;
          margin-bottom: 0.75rem;
          color: #0f172a;
        }

        .feature-description {
          font-size: 0.95rem;
          color: #4b5563;
          margin-bottom: 0;
          line-height: 1.6;
        }

        /* CTA section styling */
        .cta-section {
          background: var(--primary);
          border-radius: 16px;
          padding: 2.5rem;
          position: relative;
          overflow: hidden;
          box-shadow: 0 10px 20px rgba(var(--primary-rgb), 0.25);
          z-index: 1;
        }

        .cta-glow {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            45deg,
            transparent 30%,
            rgba(255, 255, 255, 0.2) 50%,
            transparent 70%
          );
          animation: glow 5s linear infinite;
          z-index: 0;
        }

        @keyframes glow {
          0% {
            transform: translateX(-100%) rotate(45deg);
          }
          100% {
            transform: translateX(100%) rotate(45deg);
          }
        }

        .cta-content {
          position: relative;
          z-index: 1;
        }

        .cta-section h3 {
          color: #ffffff !important;
          margin-bottom: 1.5rem;
          font-weight: 700;
          font-size: 1.5rem;
        }

        .cta-section .btn {
          background: #ffffff;
          color: var(--primary);
          border: none;
        }

        .cta-section .btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
        }

        /* Responsive adjustments */
        @media (max-width: 992px) {
          .feature-card-inner {
            padding: 1.5rem;
          }

          .feature-icon-wrapper {
            width: 48px;
            height: 48px;
          }

          .feature-icon-wrapper svg {
            width: 20px;
            height: 20px;
          }

          .feature-title {
            font-size: 1.1rem;
            margin-bottom: 0.5rem;
          }

          .feature-description {
            font-size: 0.9rem;
          }

          .cta-section {
            padding: 2rem;
          }

          .cta-section h3 {
            font-size: 1.3rem;
            margin-bottom: 1.25rem;
          }

          .dots-grid {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .feature-card-inner {
            flex-direction: column;
            align-items: center;
            text-align: center;
          }

          .feature-icon-container {
            margin-right: 0;
            margin-bottom: 1rem;
          }

          .feature-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
          }

          .feature-icon-wrapper {
            width: 44px;
            height: 44px;
          }

          .feature-icon-wrapper svg {
            width: 18px;
            height: 18px;
          }

          .feature-title {
            font-size: 1rem;
          }

          .feature-description {
            font-size: 0.85rem;
          }

          .feature-card-center .feature-card-inner {
            align-items: center;
            text-align: center;
          }

          .cta-section {
            padding: 1.75rem;
          }

          .cta-section h3 {
            font-size: 1.2rem;
            margin-bottom: 1rem;
          }
        }

        /* Add a specific media query for tablets to maintain original layout */
        @media (min-width: 769px) and (max-width: 992px) {
          .feature-card-inner {
            flex-direction: row;
            align-items: center;
            text-align: left;
          }
          
          .feature-content {
            text-align: left;
            align-items: flex-start;
          }
          
          /* Ensure correct alignment for alternating cards */
          .feature-card-right .feature-content {
            text-align: left;
          }
          
          /* Keep icon to the right on right-aligned cards */
          .order-md-1 {
            order: 1;
          }
          
          .order-md-2 {
            order: 2;
          }
        }

        @media (min-width: 835px) {
          .feature-card-center {
            max-width: 600px !important;
          }
        }

        /* Dots grid styles */
        .dots-grid {
          background-image: radial-gradient(
            var(--primary) 2.5px,
            transparent 2.5px
          );
          background-size: 18px 18px;
          opacity: 0.35;
          filter: brightness(0.8); /* Makes dots darker for better visibility */
        }

        /* Display only some dots on medium devices */
        @media (min-width: 993px) and (max-width: 1200px) {
          .dots-grid-center-left {
            display: none;
          }

          .dots-grid-top-left,
          .dots-grid-bottom-right {
            width: 140px;
            height: 140px;
          }
        }
      `}</style>
    </SectionContainer>
  );
}
