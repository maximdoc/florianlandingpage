"use client";

import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import SectionContainer from "../SectionContainer";
import { getSectionById } from "@/utils/contentUtils";

export default function ComparisonSection() {
  const [activeCard, setActiveCard] = useState(null);
  const [comparisonSection, setComparisonSection] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadComparisonSection() {
      try {
        setLoading(true);
        const sectionData = await getSectionById("home", "comparison");
        setComparisonSection(sectionData);
      } catch (error) {
        console.error("Error loading comparison section:", error);
      } finally {
        setLoading(false);
      }
    }

    loadComparisonSection();
  }, []);

  if (loading || !comparisonSection) {
    return (
      <SectionContainer
        id="comparison"
        className="comparison-section py-8 position-relative overflow-hidden"
        backgroundVariant="dark"
      >
        {/* Decorative elements */}
        <div className="position-absolute decorative-shape top-shape"></div>
        <div className="position-absolute decorative-shape bottom-shape"></div>

        <Container className="position-relative" style={{ zIndex: 2 }}>
          <Row className="text-center mb-5">
            <Col lg={8} className="mx-auto">
              {/* Skeleton for title */}
              <div className="skeleton-title mb-3"></div>
              {/* Skeleton for subtitle */}
              <div className="skeleton-subtitle mb-2"></div>
              <div
                className="skeleton-subtitle mb-4"
                style={{ width: "85%" }}
              ></div>
            </Col>
          </Row>

          <div className="comparison-container">
            {/* BEFORE CARD SKELETON */}
            <div className="comparison-card before-card skeleton-card">
              <div className="card-header">
                <div className="skeleton-card-title before"></div>
              </div>

              <ul className="comparison-list">
                {[1, 2, 3, 4, 5].map((item) => (
                  <li
                    key={item}
                    className="comparison-item negative skeleton-item"
                  >
                    <div className="skeleton-icon"></div>
                    <div className="skeleton-text"></div>
                  </li>
                ))}
              </ul>

              <div className="result-box negative">
                <div className="skeleton-result-text"></div>
              </div>

              <div className="card-dot-pattern pattern-left"></div>
            </div>

            {/* AFTER CARD SKELETON */}
            <div className="comparison-card after-card skeleton-card">
              <div className="card-header">
                <div className="skeleton-card-title after"></div>
              </div>

              <ul className="comparison-list">
                {[1, 2, 3, 4, 5].map((item) => (
                  <li
                    key={item}
                    className="comparison-item positive skeleton-item"
                  >
                    <div className="skeleton-icon"></div>
                    <div className="skeleton-text"></div>
                  </li>
                ))}
              </ul>

              <div className="result-box positive">
                <div className="skeleton-result-text"></div>
              </div>

              <div className="card-dot-pattern pattern-right"></div>
            </div>
          </div>

          <Row>
            <Col lg={10} className="mx-auto text-center">
              <div className="bottom-line-box skeleton-bottom-line">
                <div className="glow-effect"></div>
                <div className="skeleton-bottom-title"></div>
                <div className="skeleton-bottom-text"></div>
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

          /* Common skeleton styles */
          .skeleton-title,
          .skeleton-subtitle,
          .skeleton-card-title,
          .skeleton-icon,
          .skeleton-text,
          .skeleton-result-text,
          .skeleton-bottom-title,
          .skeleton-bottom-text {
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
          [data-bs-theme="light"] .skeleton-card-title,
          [data-bs-theme="light"] .skeleton-icon,
          [data-bs-theme="light"] .skeleton-text,
          [data-bs-theme="light"] .skeleton-result-text,
          [data-bs-theme="light"] .skeleton-bottom-title,
          [data-bs-theme="light"] .skeleton-bottom-text {
            background: linear-gradient(
              90deg,
              rgba(0, 0, 0, 0.04) 25%,
              rgba(0, 0, 0, 0.06) 50%,
              rgba(0, 0, 0, 0.04) 75%
            );
            background-size: 200px 100%;
          }

          /* Specific skeleton sizes */
          .skeleton-title {
            height: 48px;
            width: 70%;
            margin: 0 auto;
          }

          .skeleton-subtitle {
            height: 20px;
            width: 100%;
            margin: 0 auto;
          }

          .skeleton-card {
            opacity: 1 !important;
            transform: none !important;
          }

          .skeleton-card-title {
            height: 28px;
            width: 40%;
          }

          .skeleton-card-title.before {
            background-color: rgba(231, 76, 60, 0.1);
          }

          .skeleton-card-title.after {
            background-color: rgba(46, 204, 113, 0.1);
          }

          .skeleton-item {
            display: flex;
            align-items: center;
          }

          .skeleton-icon {
            width: 24px;
            height: 24px;
            border-radius: 50%;
            flex-shrink: 0;
            margin-right: 12px;
          }

          .skeleton-text {
            height: 16px;
            width: 85%;
          }

          .skeleton-result-text {
            height: 20px;
            width: 80%;
            margin: 0 auto;
          }

          .skeleton-bottom-line {
            opacity: 1 !important;
            transform: none !important;
          }

          .skeleton-bottom-title {
            height: 32px;
            width: 60%;
            margin: 0 auto 16px;
          }

          .skeleton-bottom-text {
            height: 16px;
            width: 80%;
            margin: 0 auto;
          }
        `}</style>
      </SectionContainer>
    );
  }

  return (
    <SectionContainer
      id="comparison"
      className="comparison-section py-8 position-relative overflow-hidden"
      backgroundVariant={comparisonSection.backgroundVariant || "dark"}
    >
      {/* Decorative elements */}
      <div className="position-absolute decorative-shape top-shape"></div>
      <div className="position-absolute decorative-shape bottom-shape"></div>

      <Container className="position-relative" style={{ zIndex: 2 }}>
        <Row className="text-center mb-5">
          <Col lg={8} className="mx-auto">
            <h2
              className="display-5 mb-3 fade-in"
              dangerouslySetInnerHTML={{ __html: comparisonSection.title }}
            />
            <p className="lead text-body-secondary mb-5">
              {comparisonSection.subtitle}
            </p>
          </Col>
        </Row>

        <div className="comparison-container">
          {/* BEFORE CARD */}
          <div
            className={`comparison-card before-card ${
              activeCard === "before" ? "active" : ""
            }`}
            onMouseEnter={() => setActiveCard("before")}
            onMouseLeave={() => setActiveCard(null)}
          >
            <div className="card-header">
              <h3 className="card-title before">Before</h3>
            </div>

            <ul className="comparison-list">
              {comparisonSection.beforeItems &&
                comparisonSection.beforeItems.map((item) => (
                  <li key={item.id} className="comparison-item negative">
                    <div className="icon-wrapper">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
                      </svg>
                    </div>
                    <span>{item.text}</span>
                  </li>
                ))}
            </ul>

            <div className="result-box negative">
              <p>{comparisonSection.beforeResult}</p>
            </div>

            <div className="card-dot-pattern pattern-left"></div>
          </div>

          {/* AFTER CARD */}
          <div
            className={`comparison-card after-card ${
              activeCard === "after" ? "active" : ""
            }`}
            onMouseEnter={() => setActiveCard("after")}
            onMouseLeave={() => setActiveCard(null)}
          >
            <div className="card-header">
              <h3 className="card-title after">
                After <span className="text-gradient">SlingRFP</span>
              </h3>
            </div>

            <ul className="comparison-list">
              {comparisonSection.afterItems &&
                comparisonSection.afterItems.map((item) => (
                  <li key={item.id} className="comparison-item positive">
                    <div className="icon-wrapper">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.5.5 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                      </svg>
                    </div>
                    <span className={item.highlight ? "highlight" : ""}>
                      {item.text}
                    </span>
                  </li>
                ))}
            </ul>

            <div className="result-box positive">
              <p>{comparisonSection.afterResult}</p>
            </div>

            <div className="card-dot-pattern pattern-right"></div>
          </div>
        </div>

        <Row>
          <Col lg={10} className="mx-auto text-center">
            {comparisonSection.bottomLine && (
              <div className="bottom-line-box">
                <div className="glow-effect"></div>
                <h3
                  className="bottom-line-title"
                  dangerouslySetInnerHTML={{
                    __html: comparisonSection.bottomLine.title,
                  }}
                />
                <p className="bottom-line-text">
                  {comparisonSection.bottomLine.text}
                </p>
              </div>
            )}
          </Col>
        </Row>
      </Container>

      <style jsx global>{`
        /* Variables for theme compatibility */
        :root {
          --before-color: #e74c3c;
          --before-bg: rgba(231, 76, 60, 0.05);
          --before-border: rgba(231, 76, 60, 0.3);
          --after-color: #2ecc71;
          --after-bg: rgba(46, 204, 113, 0.05);
          --after-border: rgba(46, 204, 113, 0.3);
          --card-bg: rgba(255, 255, 255, 0.02);
          --card-border: rgba(255, 255, 255, 0.08);
          --card-hover-shadow: rgba(0, 0, 0, 0.15);
          --icon-bg: rgba(255, 255, 255, 0.1);
          --result-text: rgba(255, 255, 255, 0.9);
          --bottom-line-bg: rgba(30, 41, 59, 0.8);
          --feature-dot-color: rgba(255, 255, 255, 0.15);
        }

        [data-bs-theme="light"] {
          --before-color: #e74c3c;
          --before-bg: rgba(231, 76, 60, 0.05);
          --before-border: rgba(231, 76, 60, 0.3);
          --after-color: #2ecc71;
          --after-bg: rgba(46, 204, 113, 0.05);
          --after-border: rgba(46, 204, 113, 0.3);
          --card-bg: rgba(255, 255, 255, 1);
          --card-border: rgba(0, 0, 0, 0.08);
          --card-hover-shadow: rgba(0, 0, 0, 0.1);
          --icon-bg: rgba(0, 0, 0, 0.05);
          --result-text: rgba(0, 0, 0, 0.8);
          --bottom-line-bg: rgba(255, 255, 255, 0.9);
          --feature-dot-color: rgba(67, 97, 238, 0.15);
        }

        /* Section styling */
        .comparison-section {
          position: relative;
          background: var(--section-bg);
          padding: 5rem 0;
        }

        [data-bs-theme="light"] .comparison-section {
          background: #f8fafc;
        }

        .decorative-shape {
          position: absolute;
          z-index: 0;
          filter: blur(80px);
        }

        .top-shape {
          top: 5%;
          right: -5%;
          width: 500px;
          height: 500px;
          background: var(--primary-light);
          opacity: 0.03;
          border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
          animation: floatAnimation 15s ease-in-out infinite alternate;
        }

        .bottom-shape {
          bottom: 5%;
          left: -5%;
          width: 400px;
          height: 400px;
          background: var(--primary-light);
          opacity: 0.03;
          border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
          animation: floatAnimation 12s ease-in-out infinite alternate-reverse;
        }

        @keyframes floatAnimation {
          0% {
            transform: translate(0, 0) rotate(0deg);
          }
          100% {
            transform: translate(30px, 30px) rotate(5deg);
          }
        }

        /* Comparison container styling */
        .comparison-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2.5rem;
          margin-bottom: 3rem;
          perspective: 1000px;
        }

        /* Card styling */
        .comparison-card {
          background: var(--card-bg);
          border-radius: 18px;
          border: 1px solid var(--card-border);
          overflow: hidden;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
          transition: all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
          display: flex;
          flex-direction: column;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          z-index: 10;
        }

        /* Dot pattern styling */
        .card-dot-pattern {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          width: 40%;
          z-index: 0;
          opacity: 0.15;
        }

        .pattern-left {
          left: 0;
          width: 40%;
          background-image: radial-gradient(
            var(--feature-dot-color) 1px,
            transparent 1px
          );
          background-size: 16px 16px;
        }

        .pattern-right {
          right: 0;
          background-image: radial-gradient(
            var(--feature-dot-color) 1px,
            transparent 1px
          );
          background-size: 16px 16px;
        }

        .comparison-card:hover,
        .comparison-card.active {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 15px 30px var(--card-hover-shadow);
        }

        .before-card {
          border-top: 3px solid var(--before-color);
          background: var(--before-bg);
          border-color: var(--before-border);
        }

        .after-card {
          border-top: 3px solid var(--after-color);
          background: var(--after-bg);
          border-color: var(--after-border);
        }

        /* Card header */
        .card-header {
          padding: 1.5rem 1.5rem 1rem;
          position: relative;
          z-index: 1;
        }

        .card-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin: 0;
        }

        .card-title.before {
          color: var(--before-color);
        }

        .card-title.after {
          color: var(--after-color);
        }

        .text-gradient {
          background: linear-gradient(to right, #6366f1, #8b5cf6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          color: transparent;
        }

        /* Comparison list */
        .comparison-list {
          list-style: none;
          padding: 0 1.5rem;
          margin: 0;
          flex: 1;
          position: relative;
          z-index: 1;
        }

        .comparison-item {
          display: flex;
          align-items: center;
          padding: 0.75rem 0;
          font-size: 0.95rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        [data-bs-theme="light"] .comparison-item {
          border-bottom-color: rgba(0, 0, 0, 0.05);
        }

        .comparison-item:last-child {
          border-bottom: none;
        }

        .comparison-item.negative {
          color: var(--result-text);
        }

        .comparison-item.positive {
          color: var(--result-text);
        }

        .comparison-item .icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          background: var(--icon-bg);
          border-radius: 50%;
          margin-right: 12px;
          flex-shrink: 0;
        }

        .comparison-item.negative .icon-wrapper {
          color: var(--before-color);
        }

        .comparison-item.positive .icon-wrapper {
          color: var(--after-color);
        }

        /* Ensure SVG icons are properly centered and sized */
        .comparison-item .icon-wrapper svg {
          width: 16px;
          height: 16px;
          display: block;
          position: relative;
          top: 0;
          left: 0;
        }

        .comparison-item span.highlight {
          font-weight: 700;
          color: var(--after-color);
        }

        /* Result box */
        .result-box {
          padding: 1.5rem;
          margin-top: auto;
          text-align: center;
          position: relative;
          z-index: 1;
        }

        .result-box p {
          margin: 0;
          font-weight: 600;
          color: var(--result-text);
        }

        .result-box.negative {
          background: rgba(231, 76, 60, 0.05);
          border-top: 1px dashed rgba(231, 76, 60, 0.3);
        }

        .result-box.positive {
          background: rgba(46, 204, 113, 0.05);
          border-top: 1px dashed rgba(46, 204, 113, 0.3);
        }

        /* Bottom line box */
        .bottom-line-box {
          background-color: var(--faq-item-active-bg);
          border-color: rgba(var(--primary-rgb), 0.15);
          border-radius: 16px;
          padding: 2.5rem 2rem;
          margin-top: 2rem;
          position: relative;
          overflow: hidden;
          z-index: 1;
        }

        .bottom-line-title {
          font-size: 1.75rem;
          font-weight: 700;
          margin-bottom: 1.25rem;
          position: relative;
          z-index: 1;
          color: #ffffff !important;
          display: inline-block;
        }

        .bottom-line-title::after {
          content: "";
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 30px;
          height: 2px;
          background: linear-gradient(90deg, #6366f1, transparent);
          border-radius: 2px;
        }

        .bottom-line-text {
          margin: 0;
          font-size: 1.15rem;
          line-height: 1.6;
          position: relative;
          z-index: 1;
          color: rgba(255, 255, 255, 0.85) !important;
        }

        .glow-effect {
          position: absolute;
          top: -100px;
          right: -100px;
          width: 300px;
          height: 300px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          filter: blur(60px);
          opacity: 0.6;
          z-index: 0;
        }

        [data-bs-theme="light"] .bottom-line-box {
          color: #ffffff !important;
          background: var(--feature-card-bg);
          border: 1px solid var(--feature-card-border);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
        }

        [data-bs-theme="light"] .bottom-line-title {
          color: #000000 !important;
        }

        [data-bs-theme="light"] .bottom-line-text {
          color: var(--feature-description-color) !important;
        }

        /* Responsive adjustments */
        @media (max-width: 991px) {
          .comparison-section {
            padding: 5rem 0;
          }

          .comparison-container {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .comparison-card {
            transform: none !important;
          }

          .bottom-line-box {
            padding: 1.5rem;
          }
        }

        @media (max-width: 768px) {
          .comparison-section {
            padding: 4rem 0;
          }

          .card-title {
            font-size: 1.3rem;
          }

          .comparison-item {
            font-size: 0.9rem;
            padding: 0.6rem 0;
          }

          .bottom-line-title {
            font-size: 1.2rem;
          }

          .bottom-line-text {
            font-size: 0.9rem;
          }
        }
      `}</style>
    </SectionContainer>
  );
}
