'use client';

import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Link from 'next/link';
import { FiChevronDown, FiPlus } from 'react-icons/fi';
import Button from '../ui/Button';

// FAQ data structure for maintainability
const faqData = [
  {
    id: '0',
    question: 'Do we need any certifications beforehand?',
    answer: `No. We'll identify what's missing (e.g., ISO, WOSB) and guide you through obtaining each one.`
  },
  {
    id: '1',
    question: "What if we've never sold to government?",
    answer: `Perfect. 80% of our clients were brand-new to B2G. We handle education, paperwork, and positioning.`
  },
  {
    id: '2',
    question: 'How is pricing structured?',
    answer: `$10K onboarding covers profile creation & first bid cycle, then success-based fees tied to contract value.`
  },
  {
    id: '3',
    question: 'How soon can we bid?',
    answer: `Most clients have a qualifying profile ready in 30 days and submit their first proposal within 45.`
  },
  {
    id: '4',
    question: 'Do we keep all data and templates?',
    answer: `Yes. You own every document, certificate, and proposal we create.`
  }
];

// Custom FAQ Accordion Item component
const FAQAccordionItem = ({ item, isActive, onClick }) => {
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
      
      <div className={`faq-collapse ${isActive ? 'show' : ''}`}>
        <div className="faq-answer">
          <p>{item.answer}</p>
        </div>
      </div>
    </div>
  );
};

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState('0');
  
  const handleAccordionClick = (id) => {
    setActiveIndex(activeIndex === id ? null : id);
  };
  
  return (
    <section className="faq-section" id="faq">
      <Container>
        <Row className="justify-content-center text-center mb-5">
          <Col lg={8} className="mx-auto">
            <h2 className="display-5 mb-3 fade-in">
              <span className="text-gradient">FAQs</span>
            </h2>
            <p className="lead text-secondary mb-5">
              Common questions about getting started with SlingRFP
            </p>
          </Col>
        </Row>
        
        <Row className="justify-content-center mb-5">
          <Col lg={9} xl={8} className="mx-auto">
            <div className="position-relative faq-wrapper">
              <div className="faq-container">
                {faqData.map((faq) => (
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
            <div className="compact-cta-card">
              <div className="compact-cta-bg"></div>
              <h3>Still have questions? <span className="highlight-text">Let's talk</span></h3>
              <p>Our team is ready to answer all your questions about government contracting</p>
              <Button 
                href="#contact" 
                variant="white"
              >
                Get in Touch
              </Button>
            </div>
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
          padding: 6rem 0;
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
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .faq-collapse.show {
          max-height: 500px;
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
      `}</style>
    </section>
  );
} 