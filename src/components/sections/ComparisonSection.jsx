"use client";

import { useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import SectionContainer from "../SectionContainer";
import content from "@/data/content.json";

export default function ComparisonSection() {
  const [activeCard, setActiveCard] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  const sectionRef = useRef(null);

  // Get comparison section data directly from content.json
  const homePageData = content.pages.find(page => page.id === 'home');
  const comparisonSection = homePageData.sections.find(section => section.id === 'comparison');
  
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
    setActiveCard(index);
  };

  return (
    <SectionContainer
      ref={sectionRef}
      id="comparison"
      className="comparison-section py-8 position-relative overflow-hidden"
      backgroundVariant={comparisonSection.backgroundVariant || "dark"}
    >
      {/* Decorative elements */}
      <div className={`position-absolute decorative-shape top-shape ${isVisible ? 'animate-in' : 'animate-out'}`}></div>
      <div className={`position-absolute decorative-shape bottom-shape ${isVisible ? 'animate-in' : 'animate-out'}`}></div>

      <Container className="position-relative" style={{ zIndex: 2 }}>
        <Row className="text-center mb-5">
          <Col lg={8} className="mx-auto">
            <div className={`title-container ${isVisible ? 'animate-in' : 'animate-out'}`}>
            <h2
                className="display-5 mb-3 section-title"
              dangerouslySetInnerHTML={{ __html: comparisonSection.title }}
            />
              <p className="lead text-body-secondary mb-5 section-subtitle">
              {comparisonSection.subtitle}
            </p>
            </div>
          </Col>
        </Row>

        <div className="comparison-container">
          {/* BEFORE CARD */}
          <div
            className={`comparison-card before-card ${
              activeCard === "before" ? "active" : ""
            } ${isVisible ? 'animate-in' : 'animate-out'}`}
            onMouseEnter={() => setActiveCard("before")}
            onMouseLeave={() => setActiveCard(null)}
            style={{ transitionDelay: "200ms" }}
          >
            <div className="card-header">
              <h3 className="card-title before">Before</h3>
            </div>

            <ul className="comparison-list">
              {comparisonSection.beforeItems &&
                comparisonSection.beforeItems.map((item, index) => (
                  <li 
                    key={item.id} 
                    className="comparison-item negative item-animated"
                    style={{ transitionDelay: `${300 + index * 80}ms` }}
                  >
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
            } ${isVisible ? 'animate-in' : 'animate-out'}`}
            onMouseEnter={() => setActiveCard("after")}
            onMouseLeave={() => setActiveCard(null)}
            style={{ transitionDelay: "350ms" }}
          >
            <div className="card-header">
              <h3 className="card-title after">
                After <span className="text-gradient">SlingRFP</span>
              </h3>
            </div>

            <ul className="comparison-list">
              {comparisonSection.afterItems &&
                comparisonSection.afterItems.map((item, index) => (
                  <li 
                    key={item.id} 
                    className="comparison-item positive item-animated"
                    style={{ transitionDelay: `${450 + index * 80}ms` }}
                  >
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
              <div className={`bottom-line-box ${isVisible ? 'animate-in' : 'animate-out'}`} 
                   style={{ transitionDelay: `${
                    Math.max(
                      (comparisonSection.beforeItems?.length || 0),
                      (comparisonSection.afterItems?.length || 0)
                    ) * 80 + 500}ms` }}
              >
                <div className={`glow-effect ${isVisible ? 'animate-in' : 'animate-out'}`}></div>
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
        /* Variables with light theme values */
        :root {
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
        
        /* Smooth scroll behavior for anchors */
        html {
          scroll-behavior: smooth;
        }
        
        @media (prefers-reduced-motion: reduce) {
          html {
            scroll-behavior: auto;
          }
          
          .title-container,
          .comparison-card,
          .bottom-line-box,
          .decorative-shape,
          .item-animated {
            transition: none !important;
            transform: none !important;
            opacity: 1 !important;
          }
        }

        /* Section styling */
        .comparison-section {
          position: relative;
          background: #f8fafc;
          padding: 5rem 0;
        }

        .decorative-shape {
          position: absolute;
          z-index: 0;
          filter: blur(80px);
          opacity: 0;
          transition: opacity 1.2s ease-out, transform 1.2s ease-out;
        }
        
        .decorative-shape.animate-in {
          opacity: 0.03;
        }
        
        .decorative-shape.animate-out {
          opacity: 0;
          transition-duration: 0.8s;
        }

        .top-shape {
          top: 5%;
          right: -5%;
          width: 500px;
          height: 500px;
          background: var(--primary-light);
          border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
          transform: translateX(30px) scale(0.9);
        }
        
        .top-shape.animate-in {
          transform: translateX(0) scale(1);
          animation: floatAnimation 15s ease-in-out infinite alternate;
        }
        
        .top-shape.animate-out {
          transform: translateX(30px) scale(0.9);
          animation: none;
        }

        .bottom-shape {
          bottom: 5%;
          left: -5%;
          width: 400px;
          height: 400px;
          background: var(--primary-light);
          border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
          transform: translateX(-30px) scale(0.9);
          transition-delay: 0.2s;
        }
        
        .bottom-shape.animate-in {
          transform: translateX(0) scale(1);
          animation: floatAnimation 12s ease-in-out infinite alternate-reverse;
        }
        
        .bottom-shape.animate-out {
          transform: translateX(-30px) scale(0.9);
          animation: none;
        }

        @keyframes floatAnimation {
          0% {
            transform: translate(0, 0) rotate(0deg);
          }
          100% {
            transform: translate(30px, 30px) rotate(5deg);
          }
        }
        
        /* Title container animation */
        .title-container {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .title-container.animate-in {
          opacity: 1;
          transform: translateY(0);
        }
        
        .title-container.animate-out {
          opacity: 0;
          transform: translateY(30px);
          transition-duration: 0.6s;
        }
        
        .section-title {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.5s ease, transform 0.5s ease;
          transition-delay: 0.05s;
        }
        
        .title-container.animate-in .section-title {
          opacity: 1;
          transform: translateY(0);
        }
        
        .title-container.animate-out .section-title {
          opacity: 0;
          transform: translateY(20px);
        }
        
        .section-subtitle {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.5s ease, transform 0.5s ease;
          transition-delay: 0.15s;
        }
        
        .title-container.animate-in .section-subtitle {
          opacity: 1;
          transform: translateY(0);
        }
        
        .title-container.animate-out .section-subtitle {
          opacity: 0;
          transform: translateY(20px);
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
          display: flex;
          flex-direction: column;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          z-index: 10;
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.8s cubic-bezier(0.16, 1, 0.3, 1),
                      box-shadow 0.5s cubic-bezier(0.2, 0.8, 0.2, 1),
                      border-color 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        
        .comparison-card.animate-in {
          opacity: 1;
          transform: translateY(0);
        }
        
        .comparison-card.animate-out {
          opacity: 0;
          transform: translateY(40px);
          transition-duration: 0.6s;
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
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        }
        
        .item-animated {
          opacity: 0;
          transform: translateX(-15px);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        .comparison-card.animate-in .item-animated {
          opacity: 1;
          transform: translateX(0);
        }
        
        .comparison-card.animate-out .item-animated {
          opacity: 0;
          transform: translateX(-15px);
        }
        
        .comparison-card.after-card .item-animated {
          transform: translateX(15px);
        }
        
        .comparison-card.after-card.animate-in .item-animated {
          transform: translateX(0);
        }
        
        .comparison-card.after-card.animate-out .item-animated {
          transform: translateX(15px);
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
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.8s cubic-bezier(0.16, 1, 0.3, 1),
                      box-shadow 0.5s ease;
          background: var(--card-bg);
          border: 1px solid var(--card-border);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
        }
        
        .bottom-line-box.animate-in {
          opacity: 1;
          transform: translateY(0);
        }
        
        .bottom-line-box.animate-out {
          opacity: 0;
          transform: translateY(40px);
          transition-duration: 0.6s;
        }

        .bottom-line-title {
          font-size: 1.75rem;
          font-weight: 700;
          margin-bottom: 1.25rem;
          position: relative;
          z-index: 1;
          color: #000000;
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
          color: var(--text-secondary);
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
          opacity: 0;
          z-index: 0;
          transform: scale(0.8);
          transition: opacity 1s ease-out, transform 1s ease-out;
          transition-delay: 0.4s;
        }
        
        .glow-effect.animate-in {
          opacity: 0.6;
          transform: scale(1);
        }
        
        .glow-effect.animate-out {
          opacity: 0;
          transform: scale(0.8);
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

          .comparison-card.animate-in:hover {
            transform: translateY(-5px) scale(1.01);
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
