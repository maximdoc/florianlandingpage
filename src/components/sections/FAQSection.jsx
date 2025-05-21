'use client';

import { useState, useRef, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Link from 'next/link';
import { FiChevronDown, FiPlus } from 'react-icons/fi';
import Button from '../ui/Button';
import SectionContainer from '../SectionContainer';
import { getSectionById } from '@/utils/contentUtils';

// Custom FAQ Accordion Item component
const FAQAccordionItem = ({ item, isActive, onClick }) => {
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);
  
  useEffect(() => {
    if (contentRef.current) {
      setHeight(isActive ? contentRef.current.scrollHeight : 0);
    }
  }, [isActive]);

  return (
    <div className={`faq-item ${isActive ? 'active' : ''}`}>
      <button 
        className="faq-button"
        onClick={onClick}
        aria-expanded={isActive}
      >
        <span className="faq-question">{item.question}</span>
        <span className="faq-icon">
          {isActive ? <FiChevronDown /> : <FiPlus />}
        </span>
      </button>
      
      <div 
        className="faq-collapse" 
        style={{ height: `${height}px` }}
      >
        <div className="faq-answer" ref={contentRef}>
          <p>{item.answer}</p>
        </div>
      </div>
    </div>
  );
};

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState('1');
  const [faqSection, setFaqSection] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Load section data from API
  useEffect(() => {
    async function loadFaqSection() {
      try {
        setLoading(true);
        const sectionData = await getSectionById('home', 'faq');
        setFaqSection(sectionData);
      } catch (error) {
        console.error('Error loading FAQ section:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadFaqSection();
  }, []);

  if (loading || !faqSection) {
    return (
      <SectionContainer 
        className="faq-section" 
        id="faq" 
        backgroundVariant="light"
      >
        <Container>
          <Row className="justify-content-center text-center mb-5">
            <Col lg={8} className="mx-auto">
              {/* Skeleton for title */}
              <div className="skeleton-title mb-3"></div>
              {/* Skeleton for subtitle */}
              <div className="skeleton-subtitle"></div>
              <div className="skeleton-subtitle" style={{ width: "85%" }}></div>
            </Col>
          </Row>
          
          <Row className="justify-content-center mb-5">
            <Col lg={9} xl={8} className="mx-auto">
              <div className="position-relative faq-wrapper">
                <div className="faq-container">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <div key={item} className="faq-item skeleton-faq-item">
                      <div className="faq-button">
                        <div className="skeleton-question"></div>
                        <div className="skeleton-icon"></div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Decorative elements */}
                <div className="faq-decoration faq-blob-1"></div>
                <div className="faq-decoration faq-blob-2"></div>
              </div>
            </Col>
          </Row>
          
          <Row>
            <Col lg={10} xl={7} className="mx-auto text-center">
              <div className="compact-cta-card skeleton-cta-card">
                <div className="compact-cta-bg"></div>
                <div className="skeleton-cta-title mb-3"></div>
                <div className="skeleton-cta-subtitle mb-4"></div>
                <div className="skeleton-cta-button"></div>
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
          .skeleton-question,
          .skeleton-icon,
          .skeleton-cta-title,
          .skeleton-cta-subtitle,
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
          
          [data-bs-theme="dark"] .skeleton-title,
          [data-bs-theme="dark"] .skeleton-subtitle,
          [data-bs-theme="dark"] .skeleton-question,
          [data-bs-theme="dark"] .skeleton-icon,
          [data-bs-theme="dark"] .skeleton-cta-title,
          [data-bs-theme="dark"] .skeleton-cta-subtitle,
          [data-bs-theme="dark"] .skeleton-cta-button {
            background: linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.05) 25%, 
              rgba(255, 255, 255, 0.1) 50%, 
              rgba(255, 255, 255, 0.05) 75%
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
            margin: 0 auto 8px;
          }
          
          /* FAQ item styling */
          .skeleton-faq-item {
            margin-bottom: 1rem;
            border-radius: 1rem;
            overflow: hidden;
            background-color: var(--faq-item-bg);
            transition: all 0.3s ease;
            border: 1px solid transparent;
            padding: 1.5rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          
          .skeleton-faq-item .faq-button {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0;
          }
          
          .skeleton-question {
            height: 24px;
            width: 80%;
            border-radius: 4px;
          }
          
          .skeleton-icon {
            width: 36px;
            height: 36px;
            border-radius: 50%;
          }
          
          /* CTA card styling */
          .skeleton-cta-card {
            padding: 40px;
            position: relative;
            overflow: hidden;
          }
          
          .skeleton-cta-title {
            height: 36px;
            width: 60%;
            margin: 0 auto 16px;
          }
          
          .skeleton-cta-subtitle {
            height: 20px;
            width: 80%;
            margin: 0 auto 24px;
          }
          
          .skeleton-cta-button {
            height: 48px;
            width: 160px;
            border-radius: 30px;
            margin: 0 auto;
          }
        `}</style>
      </SectionContainer>
    );
  }
  
  const faqItems = faqSection.items || [];
  
  const handleAccordionClick = (id) => {
    setActiveIndex(activeIndex === id ? null : id);
  };
  
  return (
    <SectionContainer 
      className="faq-section" 
      id="faq" 
      backgroundVariant={faqSection.backgroundVariant || "light"}
    >
      <Container>
        <Row className="justify-content-center text-center mb-5">
          <Col lg={8} className="mx-auto">
            <h2 className="display-5 mb-3 fade-in" dangerouslySetInnerHTML={{ __html: faqSection.title }} />
            <p className="lead text-secondary mb-5">
              {faqSection.subtitle}
            </p>
          </Col>
        </Row>
        
        {/* Decorative dot patterns */}
        <div
          className="position-absolute dots-grid dots-grid-top-right"
          style={{
            top: "8%",
            right: "6%",
            width: "180px",
            height: "180px",
            zIndex: 0,
          }}
        ></div>
        
        <div
          className="position-absolute dots-grid dots-grid-bottom-left"
          style={{
            bottom: "12%",
            left: "5%",
            width: "200px",
            height: "200px",
            zIndex: 0,
          }}
        ></div>
        
        <div
          className="position-absolute dots-grid dots-grid-center-left"
          style={{
            top: "40%",
            left: "12%",
            width: "140px",
            height: "140px",
            zIndex: 0,
            transform: "translateY(-50%) rotate(-12deg)",
            backgroundSize: "16px 16px",
          }}
        ></div>
        
        <Row className="justify-content-center mb-5">
          <Col lg={9} xl={8} className="mx-auto">
            <div className="position-relative faq-wrapper">
              <div className="faq-container">
                {faqItems.length > 0 && faqItems.map((faq) => (
                  <FAQAccordionItem 
                    key={faq.id}
                    item={faq}
                    isActive={activeIndex === faq.id}
                    onClick={() => handleAccordionClick(faq.id)}
                  />
                ))}
              </div>
              
              {/* Decorative elements */}
              <div className="faq-decoration faq-blob-1"></div>
              <div className="faq-decoration faq-blob-2"></div>
            </div>
          </Col>
        </Row>
        
        <Row>
          <Col lg={10} xl={7} className="mx-auto text-center slide-up" style={{ animationDelay: "0.3s" }}>
            {faqSection.ctaSection && (
              <div className="compact-cta-card">
                <div className="compact-cta-bg"></div>
                <h3 dangerouslySetInnerHTML={{ __html: faqSection.ctaSection.title }} />
                <p>{faqSection.ctaSection.subtitle}</p>
                {faqSection.ctaSection.button && (
                  <Button 
                    href={faqSection.ctaSection.button.href} 
                    variant="white"
                  >
                    {faqSection.ctaSection.button.text}
                  </Button>
                )}
              </div>
            )}
          </Col>
        </Row>
      </Container>
      
      <style jsx global>{`
        /* Variables for theme compatibility */
        :root {
          --faq-bg: rgba(255, 255, 255, 0.02);
          --faq-border: rgba(255, 255, 255, 0.1);
          --faq-shadow: rgba(0, 0, 0, 0.1);
          --faq-item-bg: rgba(255, 255, 255, 0.04);
          --faq-item-active-bg: var(--primary-light);
          --faq-question-color: var(--text-primary);
          --faq-answer-color: var(--text-body);
          --faq-icon-bg: rgba(var(--primary-rgb), 0.1);
          --faq-icon-color: var(--primary);
          --cta-bg: var(--primary);
          --cta-text: #ffffff;
        }
        
        [data-bs-theme="light"] {
          --faq-bg: #ffffff;
          --faq-border: rgba(0, 0, 0, 0.08);
          --faq-shadow: rgba(67, 97, 238, 0.08);
          --faq-item-bg: #f8f9fa;
          --faq-item-active-bg: rgba(67, 97, 238, 0.08);
          --faq-question-color: #1e293b;
          --faq-answer-color: #475569;
          --faq-icon-bg: rgba(67, 97, 238, 0.12);
          --faq-icon-color: var(--primary);
          --cta-bg: var(--primary);
          --cta-text: #ffffff;
        }

        /* Section styling */
        .faq-section {
          position: relative;
          padding: 5rem 0;
          background-color: var(--background);
        }
        
        /* FAQ Container */
        .faq-wrapper {
          position: relative;
          z-index: 1;
        }
        
        .faq-container {
          position: relative;
          z-index: 2;
          background: var(--faq-bg);
          border-radius: 1.5rem;
          padding: 0.5rem;
          box-shadow: 0 10px 40px var(--faq-shadow);
          backdrop-filter: blur(10px);
          border: 1px solid var(--faq-border);
        }
        
        /* FAQ Items */
        .faq-item {
          margin-bottom: 1rem;
          border-radius: 1rem;
          overflow: hidden;
          background-color: var(--faq-item-bg);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          border: 1px solid transparent;
        }
        
        .faq-item:last-child {
          margin-bottom: 0;
        }
        
        .faq-item.active {
          background-color: var(--faq-item-active-bg);
          border-color: rgba(var(--primary-rgb), 0.15);
        }

        [data-bs-theme="light"] .faq-item:hover:not(.active) {
          border-color: rgba(var(--primary-rgb), 0.1);
          background-color: #f1f5f9;
        }
        
        /* FAQ Button */
        .faq-button {
          width: 100%;
          text-align: left;
          background: transparent;
          border: none;
          padding: 1.5rem;
          font-weight: 600;
          color: var(--faq-question-color);
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .faq-question {
          flex: 1;
          font-size: 1.1rem;
        }
        
        .faq-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 50%;
          background-color: var(--faq-icon-bg);
          color: var(--faq-icon-color);
          font-size: 1.25rem;
          margin-left: 1rem;
          transition: all 0.3s ease;
          flex-shrink: 0;
        }
        
        .faq-item.active .faq-icon {
          transform: rotate(180deg);
          background-color: rgba(var(--primary-rgb), 0.2);
        }
        
        /* FAQ Answer */
        .faq-collapse {
          height: 0;
          overflow: hidden;
          transition: height 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .faq-answer {
          padding: 0 1.5rem 1.5rem;
          color: var(--faq-answer-color);
        }
        
        .faq-answer p {
          margin-bottom: 0;
          line-height: 1.6;
        }
        
        /* Decorative elements */
        .faq-decoration {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          z-index: -1;
          opacity: 0.5;
        }
        
        .faq-blob-1 {
          top: -10%;
          left: -15%;
          width: 300px;
          height: 300px;
          background: var(--primary-light);
          transform: rotate(-15deg);
        }
        
        .faq-blob-2 {
          bottom: -5%;
          right: -10%;
          width: 250px;
          height: 250px;
          background: var(--primary-light);
          transform: rotate(30deg);
        }
        
        /* CTA Card */
        .compact-cta-card {
          position: relative;
          padding: 1.5rem;
          border-radius: 16px;
          background: var(--cta-bg);
          color: var(--cta-text);
          overflow: hidden;
          box-shadow: 0 15px 30px rgba(var(--primary-rgb), 0.2);
          z-index: 1;
          margin-top: 1rem;
        }
        
        .compact-cta-card h3 {
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 0.75rem;
          color: #ffffff !important;
        }

        .compact-cta-card p {
          margin-bottom: 1rem;
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.9) !important;
        }

        [data-bs-theme="light"] .compact-cta-card h3,
        [data-bs-theme="light"] .compact-cta-card p {
          color: #ffffff !important;
        }

        .highlight-text {
          color: #ffffff;
          font-weight: 700;
          position: relative;
          display: inline-block;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
          background: linear-gradient(90deg, #ffffff, #f0f4ff);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3));
        }
        
        .cta-glow {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.2) 50%, transparent 70%);
          animation: glow 5s linear infinite;
          z-index: -1;
        }
        
        .cta-button {
          display: inline-block;
          background: #ffffff;
          color: var(--primary);
          padding: 0.75rem 1.75rem;
          border-radius: 30px;
          font-weight: 600;
          transition: all 0.3s ease;
          text-decoration: none;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        
        .cta-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
          background: #f0f4ff;
          color: var(--primary-hover);
          border: none;
        }
        
        .cta-button:active {
          transform: translateY(-1px);
          box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
        }
        
        @keyframes glow {
          0% {
            transform: translateX(-100%) rotate(45deg);
          }
          100% {
            transform: translateX(100%) rotate(45deg);
          }
        }
        
        @media (max-width: 768px) {
          .faq-question {
            font-size: 1rem;
          }
          
          .faq-icon {
            width: 2rem;
            height: 2rem;
          }
          
          .faq-button {
            padding: 1.25rem;
          }
          
          .faq-answer {
            padding: 0 1.25rem 1.25rem;
          }
          
          .compact-cta-card {
            padding: 1.5rem;
          }
          
          .compact-cta-card h3 {
            font-size: 1.1rem;
          }
        }

        [data-bs-theme="light"] .faq-decoration {
          opacity: 0.3;
        }

        [data-bs-theme="light"] .compact-cta-card h3 .text-gradient {
          background: linear-gradient(90deg, #ffffff, #f0f4ff);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.1));
        }

        /* Dots grid styles */
        .dots-grid {
          background-image: radial-gradient(rgba(var(--primary-rgb), 0.2) 1.8px, transparent 1.8px);
          background-size: 18px 18px;
          opacity: 0.25;
        }
        
        .dots-grid-top-right {
          transform: rotate(10deg);
        }
        
        .dots-grid-bottom-left {
          transform: rotate(-8deg);
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
          .dots-grid-center-left {
            display: none;
          }
          
          .dots-grid-top-right,
          .dots-grid-bottom-left {
            width: 140px;
            height: 140px;
          }
        }
      `}</style>
    </SectionContainer>
  );
} 