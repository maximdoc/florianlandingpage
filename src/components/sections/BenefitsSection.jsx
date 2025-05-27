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

export default function BenefitsSection() {
  const [hoveredBenefit, setHoveredBenefit] = useState(null);

  // Get benefits section data directly from content.json
  const homePageData = content.pages.find((page) => page.id === "home");
  const benefitsSection = homePageData.sections.find(
    (section) => section.id === "benefits"
  );

  // Refs for animation tracking
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const benefitsGridRef = useRef(null);
  const quotesRef = useRef(null);
  const ctaRef = useRef(null);

  // Track visibility of each section
  const isSectionVisible = useIsVisible(sectionRef);
  const isTitleVisible = useIsVisible(titleRef);
  const areBenefitsVisible = useIsVisible(benefitsGridRef);
  const areQuotesVisible = useIsVisible(quotesRef);
  const isCtaVisible = useIsVisible(ctaRef);

  // If section data is not found, don't display the component
  if (!benefitsSection) {
    return null;
  }

  return (
    <SectionContainer
      id="benefits"
      className="benefits-section py-6 position-relative overflow-hidden"
      backgroundVariant={benefitsSection.backgroundVariant || "light"}
      ref={sectionRef}
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
        <Row className="text-center mb-5" ref={titleRef}>
          <Col lg={8} className="mx-auto">
            <h2
              className={`display-5 mb-3 transition-all duration-1000 ${
                isTitleVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              dangerouslySetInnerHTML={{ __html: benefitsSection.title }}
            />
            <p
              className={`lead transition-all duration-1000 delay-100 ${
                isTitleVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              {benefitsSection.subtitle}
            </p>
          </Col>
        </Row>

        <Row className="g-4 benefits-cards" ref={benefitsGridRef}>
          {benefitsSection.tiles &&
            benefitsSection.tiles.map((benefit, index) => (
              <Col lg={4} className="benefit-col" key={benefit.id}>
                <div
                  className={`benefit-card ${
                    hoveredBenefit === benefit.id ? "active" : ""
                  } transition-all duration-1000 ${
                    areBenefitsVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${150 + index * 100}ms` }}
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

        {/* Additional Copy Options */}
        <Row className="mt-5 additional-copy" ref={quotesRef}>
          <Col lg={10} className="mx-auto">
            <div
              className={`quote-container transition-all duration-1000 ${
                areQuotesVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <div className="quote-grid">
                {benefitsSection.quotes && benefitsSection.quotes.map((quote, index) => (
                  <div
                    key={quote.id}
                    className="quote-item"
                    style={{
                      transitionDelay: `${150 + index * 100}ms`,
                      opacity: areQuotesVisible ? 1 : 0,
                      transform: areQuotesVisible
                        ? "translateY(0)"
                        : "translateY(40px)",
                      transition: "all 1000ms cubic-bezier(0.2, 0.8, 0.2, 1)",
                    }}
                  >
                    <div className="quote-icon-wrapper">
                      <div className="quote-icon">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9.59 4.59A2 2 0 1 1 11 8H8a6 6 0 0 0 6 6v2a8 8 0 0 1-8-8V4.59z"
                            fill="currentColor"
                          />
                          <path
                            d="M15.59 4.59A2 2 0 1 1 17 8h-3a6 6 0 0 0 6 6v2a8 8 0 0 1-8-8V4.59z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                    </div>
                    <p className="quote-text">
                      {quote.text}
                    </p>
                    <div className={`quote-dot-pattern ${index % 2 === 0 ? 'pattern-right' : 'pattern-left'}`}></div>
                  </div>
                ))}
              </div>
            </div>
          </Col>
        </Row>

        <Row ref={ctaRef}>
          <Col className="text-center">
            {benefitsSection.ctaButton && (
              <div
                className={`cta-wrapper mt-5 pt-3 transition-all duration-1000 ${
                  isCtaVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
              >
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
        /* Variables with light theme values */
        :root {
          --feature-card-bg: rgba(255, 255, 255, 1);
          --feature-card-border: rgba(0, 0, 0, 0.06);
          --feature-card-hover-bg: rgba(255, 255, 255, 1);
          --feature-icon-bg: rgba(67, 97, 238, 0.08);
          --feature-icon-color: var(--primary);
          --feature-title-color: #0f172a;
          --feature-description-color: #4b5563;
          --feature-dot-color: rgba(67, 97, 238, 0.15);
          --cta-bg: var(--primary);
          --cta-text: #ffffff;
          --cta-button-bg: #ffffff;
          --cta-button-text: var(--primary);
        }

        /* Animation utilities */
        .transition-all {
          transition-property: all;
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
          position: relative;
          overflow: hidden;
          box-shadow: var(--card-shadow),
            0 0 20px rgba(var(--primary-rgb), 0.03);
          backdrop-filter: blur(10px);
          will-change: transform, opacity;
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
            transparent
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
          transform: translateY(-8px) scale(1.01) !important;
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
          /* 3D effect with enhanced shadows */
          box-shadow: 0 5px 15px rgba(99, 102, 241, 0.4),
            0 0 0 1px rgba(255, 255, 255, 0.1),
            inset 0 -2px 5px rgba(0, 0, 0, 0.2),
            inset 0 2px 5px rgba(255, 255, 255, 0.3);
        }

        /* Glow effect */
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

        /* Improved hover effect */
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

        @media screen and (max-width: 834px) {
          .benefits-cards {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 1.5rem;
          }
          
          .benefit-col {
            width: calc(50% - 0.75rem);
            min-width: 280px;
            flex: 0 1 auto;
          }
          
          /* Ensure center alignment when there's a single card in the last row */
          .benefit-col:last-child:nth-child(2n + 1) {
            margin-left: auto;
            margin-right: auto;
            max-width: 330px;
          }

          .benefit-header {
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            gap: 1rem;
          }
        }
        
        @media screen and (max-width: 600px) {
          .benefit-col {
            width: 100%;
            max-width: 330px;
            margin-left: auto;
            margin-right: auto;
          }
        }

        @media (max-width: 767.98px) {
          .benefits-section {
            padding: 4rem 0;
          }

          .benefit-icon-wrapper {
            width: 48px;
            height: 48px;
            border-radius: 16px;
            margin-right: 12px;
          }

          .benefit-icon-wrapper::after {
            left: 50%;
            transform: translate(-50%, -50%);
            width: 95%;
            height: 45%;
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
          background-image: radial-gradient(
            rgba(200, 200, 200, 0.5) 2.5px,
            transparent 2.5px
          );
          background-size: 18px 18px;
          opacity: 0.5;
          filter: none;
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

        /* Hide decorative dots on mobile devices */
        @media (max-width: 1200px) {
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

        /* Add styles for the additional copy section */
        .quote-container {
          background: transparent;
          border-radius: 20px;
          padding: 1rem 0;
          position: relative;
          overflow: hidden;
          will-change: transform, opacity;
          border: none;
          box-shadow: none;
        }

        .quote-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          position: relative;
          z-index: 1;
        }

        .quote-item {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding: 28px;
          background: var(--card-bg);
          border-radius: 18px;
          border: 1px solid var(--card-border);
          overflow: hidden;
          transition: transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1),
            box-shadow 0.5s ease;
          box-shadow: var(--card-shadow),
            0 0 20px rgba(var(--primary-rgb), 0.03);
          backdrop-filter: blur(10px);
          will-change: transform, opacity;
          height: 100%;
        }

        .quote-item::before {
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

        .quote-item::after {
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

        .quote-item:hover {
          transform: translateY(-8px) scale(1.01);
          box-shadow: var(--card-hover-shadow),
            0 15px 35px rgba(var(--primary-rgb), 0.08);
        }

        .quote-item:hover::before {
          opacity: 1;
        }

        .quote-item:hover::after {
          opacity: 1;
        }

        /* Quote dot pattern styling */
        .quote-dot-pattern {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          width: 40%;
          z-index: 0;
          opacity: 0.3;
        }

        .quote-icon-wrapper {
          display: flex;
          align-items: center;
          margin-bottom: 18px;
          position: relative;
          z-index: 2;
        }

        .quote-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          border-radius: 16px;
          transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
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
        .quote-icon::before {
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

        .quote-icon::after {
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

        .quote-icon svg {
          color: white;
          position: relative;
          z-index: 1;
          transition: color 0.3s ease;
          fill: currentColor;
          will-change: transform;
        }

        .quote-item:hover .quote-icon {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(99, 102, 241, 0.5),
            0 0 0 1px rgba(255, 255, 255, 0.15),
            inset 0 -2px 5px rgba(0, 0, 0, 0.2),
            inset 0 2px 5px rgba(255, 255, 255, 0.4);
        }

        .quote-item:hover .quote-icon::before {
          opacity: 1;
          filter: blur(10px);
        }

        .quote-text {
          font-size: 1.1rem;
          line-height: 1.6;
          color: var(--text-primary);
          margin: 0;
          font-weight: 600;
          position: relative;
          z-index: 1;
        }

        @media (max-width: 991.98px) {
          .quote-item {
            padding: 22px;
          }

          .quote-icon {
            width: 36px;
            height: 36px;
          }

          .quote-text {
            font-size: 1rem;
          }
          
          .quote-grid {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 1.5rem;
          }
          
          .quote-item {
            width: calc(50% - 0.75rem);
            min-width: 280px;
            flex: 0 1 auto;
          }
          
          /* Ensure center alignment when there's a single quote in the last row */
          .quote-item:last-child:nth-child(2n + 1) {
            margin-left: auto;
            margin-right: auto;
            max-width: 330px;
          }
        }

        @media (max-width: 768px) {
          .quote-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .quote-item {
            padding: 18px;
            width: 100%;
            max-width: 330px;
            margin-left: auto;
            margin-right: auto;
          }

          .quote-icon {
            width: 42px;
            height: 42px;
          }

          .quote-text {
            font-size: 0.95rem;
          }
        }

        @media (max-width: 576px) {
          .benefits-cards {
            grid-template-columns: repeat(1, 1fr);
          }
        }
      `}</style>
    </SectionContainer>
  );
}
