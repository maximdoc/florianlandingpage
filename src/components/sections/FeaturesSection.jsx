"use client";

import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Button from "../ui/Button";
import SectionContainer from "../SectionContainer";
import Icon from "../ui/Icon";
import { getSectionById } from "@/utils/contentUtils";

export default function FeaturesSection() {
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [featuresSection, setFeaturesSection] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFeaturesSection() {
      try {
        setLoading(true);
        const sectionData = await getSectionById("home", "features");
        setFeaturesSection(sectionData);
      } catch (error) {
        console.error("Error loading features section:", error);
      } finally {
        setLoading(false);
      }
    }

    loadFeaturesSection();
  }, []);

  if (loading || !featuresSection) {
    return (
      <SectionContainer
        id="features"
        className="features-section py-8 position-relative overflow-hidden"
        backgroundVariant="light"
      >
        <div className="position-absolute decorative-blob blob-1"></div>
        <div className="position-absolute decorative-blob blob-2"></div>

        {/* Decorative dot patterns */}
        <div
          className="position-absolute dots-grid dots-grid-top-left"
          style={{
            top: "15%",
            left: "7%",
            width: "170px",
            height: "170px",
            zIndex: -1,
          }}
        ></div>

        <div
          className="position-absolute dots-grid dots-grid-bottom-right"
          style={{
            bottom: "12%",
            right: "5%",
            width: "200px",
            height: "200px",
            zIndex: -1,
          }}
        ></div>

        <div
          className="position-absolute dots-grid dots-grid-center-left"
          style={{
            top: "50%",
            left: "15%",
            width: "130px",
            height: "130px",
            zIndex: -1,
            transform: "translateY(-50%) rotate(-8deg)",
            backgroundSize: "14px 14px",
          }}
        ></div>

        <Container className="position-relative" style={{ zIndex: 2 }}>
          <Row className="text-center mb-4">
            <Col lg={8} className="mx-auto">
              {/* Skeleton for section title */}
              <div className="skeleton-section-title mb-3"></div>
              {/* Skeleton for subtitle */}
              <div className="skeleton-section-subtitle mb-1"></div>
              <div
                className="skeleton-section-subtitle"
                style={{ width: "85%" }}
              ></div>
            </Col>
          </Row>

          <Row className="features-grid g-3 mb-5 mx-0">
            {/* Создаем 6 карточек-скелетонов */}
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <Col
                  lg={index === 5 ? 12 : 6}
                  key={index}
                  className={`mb-3 ${index === 5 ? "text-center" : ""}`}
                  style={{ padding: "0 0.75rem" }}
                >
                  <div
                    className={`feature-card skeleton-feature-card ${
                      index === 5
                        ? "feature-card-center mx-auto"
                        : index % 2 === 0
                        ? "feature-card-left"
                        : "feature-card-right"
                    }`}
                    style={index === 5 ? { maxWidth: "100%" } : {}}
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
                            <div className="skeleton-icon-wrapper"></div>
                          </div>
                          <div className="feature-content">
                            <div className="skeleton-feature-title"></div>
                            <div className="skeleton-feature-description"></div>
                            <div
                              className="skeleton-feature-description"
                              style={{ width: "70%" }}
                            ></div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="feature-content order-2 order-md-1">
                            <div className="skeleton-feature-title"></div>
                            <div className="skeleton-feature-description"></div>
                            <div
                              className="skeleton-feature-description"
                              style={{ width: "70%" }}
                            ></div>
                          </div>
                          <div className="feature-icon-container order-1 order-md-2">
                            <div className="skeleton-icon-wrapper"></div>
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
            >
              <div className="cta-section w-100 skeleton-cta-section">
                <div className="cta-glow"></div>
                <div className="cta-content">
                  <div className="skeleton-cta-title"></div>
                  <div className="skeleton-cta-button"></div>
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

          .skeleton-section-title,
          .skeleton-section-subtitle,
          .skeleton-feature-title,
          .skeleton-feature-description,
          .skeleton-icon-wrapper,
          .skeleton-cta-title,
          .skeleton-cta-button {
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

          [data-bs-theme="dark"] .skeleton-section-title,
          [data-bs-theme="dark"] .skeleton-section-subtitle,
          [data-bs-theme="dark"] .skeleton-feature-title,
          [data-bs-theme="dark"] .skeleton-feature-description,
          [data-bs-theme="dark"] .skeleton-icon-wrapper,
          [data-bs-theme="dark"] .skeleton-cta-title,
          [data-bs-theme="dark"] .skeleton-cta-button {
            background: linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.05) 25%,
              rgba(255, 255, 255, 0.1) 50%,
              rgba(255, 255, 255, 0.05) 75%
            );
            background-size: 200px 100%;
          }

          .skeleton-section-title {
            height: 48px;
            width: 70%;
            margin: 0 auto 16px;
          }

          .skeleton-section-subtitle {
            height: 20px;
            width: 100%;
            margin: 0 auto 8px;
          }

          .skeleton-feature-card {
            opacity: 1 !important;
            transform: none !important;
          }

          .skeleton-icon-wrapper {
            width: 56px;
            height: 56px;
            border-radius: 16px;
          }

          .skeleton-feature-title {
            height: 24px;
            width: 70%;
            margin-bottom: 12px;
          }

          .skeleton-feature-description {
            height: 16px;
            width: 90%;
            margin-bottom: 8px;
          }

          .skeleton-cta-section {
            opacity: 1 !important;
            transform: none !important;
          }

          .skeleton-cta-title {
            height: 30px;
            width: 70%;
            margin: 0 auto 20px;
          }

          .skeleton-cta-button {
            height: 48px;
            width: 160px;
            border-radius: 24px;
            margin: 0 auto;
          }
        `}</style>
      </SectionContainer>
    );
  }

  return (
    <SectionContainer
      id="features"
      className="features-section py-8 position-relative overflow-hidden"
      backgroundVariant={featuresSection.backgroundVariant || "light"}
    >
      <div className="position-absolute decorative-blob blob-1"></div>
      <div className="position-absolute decorative-blob blob-2"></div>

      {/* New balanced decorative dot patterns */}
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
          opacity: "0.2",
        }}
      ></div>

      <Container className="position-relative" style={{ zIndex: 2 }}>
        <Row className="text-center mb-4">
          <Col lg={8} className="mx-auto">
            <h2
              className="display-5 mb-3 fade-in"
              dangerouslySetInnerHTML={{ __html: featuresSection.title }}
            />
            <p className="lead text-body-secondary mb-4">
              {featuresSection.subtitle}
            </p>
          </Col>
        </Row>

        <Row className="features-grid g-3 mb-5 mx-0">
          {featuresSection.tiles &&
            featuresSection.tiles.map((feature, index) => (
              <Col
                lg={feature.id === 7 ? 12 : 6}
                key={feature.id}
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
                  }`}
                  onMouseEnter={() => setHoveredFeature(feature.id)}
                  onMouseLeave={() => setHoveredFeature(null)}
                  style={feature.id === 7 ? { maxWidth: "100%" } : {}}
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
            className="mx-auto text-center slide-up"
            style={{ animationDelay: "0.3s", padding: "0 0.75rem" }}
          >
            {featuresSection.ctaSection && (
              <div className="cta-section w-100">
                <div className="cta-content">
                  <h3
                    dangerouslySetInnerHTML={{
                      __html: featuresSection.ctaSection.title,
                    }}
                  />
                  {featuresSection.ctaSection.ctaButton && (
                    <Button
                      href={featuresSection.ctaSection.ctaButton.href}
                      variant="white"
                    >
                      {featuresSection.ctaSection.ctaButton.text}
                    </Button>
                  )}
                </div>
              </div>
            )}
          </Col>
        </Row>
      </Container>

      <style jsx global>{`
        /* Variables for theme compatibility */
        :root {
          --feature-card-bg: rgba(255, 255, 255, 0.02);
          --feature-card-border: rgba(255, 255, 255, 0.08);
          --feature-card-hover-bg: rgba(255, 255, 255, 0.05);
          --feature-icon-bg: rgba(67, 97, 238, 0.1);
          --feature-icon-color: var(--primary);
          --feature-title-color: rgba(255, 255, 255, 0.95);
          --feature-description-color: rgba(255, 255, 255, 0.7);
          --feature-dot-color: rgba(255, 255, 255, 0.15);
          --cta-bg: var(--primary);
          --cta-text: #ffffff;
          --cta-button-bg: #ffffff;
          --cta-button-text: var(--primary);
        }

        [data-bs-theme="light"] {
          --feature-card-bg: rgba(255, 255, 255, 1);
          --feature-card-border: rgba(0, 0, 0, 0.08);
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

        /* Section styling */
        .features-section {
          position: relative;
          background: var(--dark-bg, #111827);
          padding: 5rem 0;
        }

        [data-bs-theme="light"] .features-section {
          background: #f8fafc;
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
          box-shadow: var(--card-shadow),
            0 0 20px rgba(var(--primary-rgb), 0.03);
          backdrop-filter: blur(10px);
          background: var(--card-bg);
          border: 1px solid var(--card-border);
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
            var(--feature-dot-color) 1px,
            transparent 1px
          );
          background-size: 16px 16px;
        }

        .pattern-left {
          left: 0;
          background-image: radial-gradient(
            var(--feature-dot-color) 1px,
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
          color: var(--feature-title-color);
        }

        .feature-description {
          font-size: 0.95rem;
          color: var(--feature-description-color);
          margin-bottom: 0;
          line-height: 1.6;
        }

        /* CTA section styling */
        .cta-section {
          background: var(--cta-bg);
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

        [data-bs-theme="light"] .cta-section h3 {
          color: #ffffff !important;
        }

        .cta-section .btn {
          background: var(--cta-button-bg);
          color: var(--cta-button-text);
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
            align-items: flex-start;
            text-align: left;
          }

          .feature-icon-container {
            margin-right: 0;
            margin-bottom: 1rem;
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

        @media (min-width: 835px) {
          .feature-card-center {
            max-width: 600px !important;
          }
        }

        /* Dots grid styles */
        .dots-grid {
          background-image: radial-gradient(
            var(--feature-dot-color) 1.8px,
            transparent 1.8px
          );
          background-size: 18px 18px;
          opacity: 0.25;
        }

        .dots-grid-top-left {
          transform: rotate(-8deg);
        }

        .dots-grid-bottom-right {
          transform: rotate(7deg);
        }

        [data-bs-theme="light"] .dots-grid {
          opacity: 0.35;
          background-image: radial-gradient(
            var(--primary) 2.5px,
            transparent 2.5px
          );
          filter: brightness(0.8);
        }

        [data-bs-theme="dark"] .dots-grid {
          opacity: 0.25;
          background-image: radial-gradient(
            rgba(255, 255, 255, 0.9) 1.8px,
            transparent 1.8px
          );
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
