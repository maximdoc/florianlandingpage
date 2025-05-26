'use client';

import { useState, useRef, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Link from 'next/link';
import { FiChevronDown, FiPlus } from 'react-icons/fi';
import Button from '../ui/Button';
import SectionContainer from '../SectionContainer';
import content from '@/data/content.json';

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

// Custom FAQ Accordion Item component
const FAQAccordionItem = ({ item, isActive, onClick, index, isVisible }) => {
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);
  
  useEffect(() => {
    if (contentRef.current) {
      setHeight(isActive ? contentRef.current.scrollHeight : 0);
    }
  }, [isActive]);

  return (
    <div 
      className={`faq-item ${isActive ? 'active' : ''} transition-all duration-1000`}
      style={{ 
        transitionDelay: `${150 + index * 100}ms`,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)'
      }}
    >
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
  
  // Get FAQ section data directly from content.json
  const homePageData = content.pages.find(page => page.id === 'home');
  const faqSection = homePageData.sections.find(section => section.id === 'faq');
  const faqItems = faqSection.items || [];
  
  // Refs for animation tracking
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const faqContainerRef = useRef(null);
  const ctaRef = useRef(null);

  // Check if elements are visible
  const isSectionVisible = useIsVisible(sectionRef);
  const isHeaderVisible = useIsVisible(headerRef);
  const isFaqContainerVisible = useIsVisible(faqContainerRef);
  const isCtaVisible = useIsVisible(ctaRef);
  
  const handleAccordionClick = (id) => {
    setActiveIndex(activeIndex === id ? null : id);
  };
  
  return (
    <SectionContainer 
      className="faq-section" 
      id="faq" 
      backgroundVariant="light"
      ref={sectionRef}
    >
      <Container>
        <Row className="justify-content-center text-center mb-5" ref={headerRef}>
          <Col lg={8} className="mx-auto">
            <h2 
              className={`display-5 mb-3 transition-all duration-1000 ${
                isHeaderVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`} 
              dangerouslySetInnerHTML={{ __html: faqSection.title }} 
            />
            <p 
              className={`lead text-secondary mb-5 transition-all duration-1000 delay-100 ${
                isHeaderVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
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
            <div className="position-relative faq-wrapper" ref={faqContainerRef}>
              <div 
                className={`faq-container transition-all duration-1000 ${
                  isFaqContainerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
              >
                {faqItems.length > 0 && faqItems.map((faq, index) => (
                  <FAQAccordionItem 
                    key={faq.id}
                    item={faq}
                    index={index}
                    isActive={activeIndex === faq.id}
                    isVisible={isFaqContainerVisible}
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
        
        <Row ref={ctaRef}>
          <Col lg={10} xl={7} className="mx-auto text-center">
            {faqSection.ctaSection && (
              <div className={`compact-cta-card transition-all duration-1000 ${
                isCtaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}>
                <div className="compact-cta-bg"></div>
                <h3 dangerouslySetInnerHTML={{ __html: faqSection.ctaSection.title }} />
                <p>{faqSection.ctaSection.subtitle}</p>
                {faqSection.ctaSection.button && (
                  <Button 
                    href={faqSection.ctaSection.button.href} 
                    variant="white"
                    className="faq-cta-button"
                  >
                    {faqSection.ctaSection.button.text || "Explore More Success Stories"}
                  </Button>
                )}
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

        .duration-1000 {
          transition-duration: 1000ms;
        }

        .delay-100 {
          transition-delay: 100ms;
        }

        .delay-200 {
          transition-delay: 200ms;
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
        .faq-section {
          position: relative;
          padding: 5rem 0;
          background-color: #f8fafc;
        }
        
        /* FAQ Container */
        .faq-wrapper {
          position: relative;
          z-index: 1;
        }
        
        .faq-container {
          position: relative;
          z-index: 2;
          background: #ffffff;
          border-radius: 1.5rem;
          padding: 0.5rem;
          box-shadow: 0 10px 40px rgba(67, 97, 238, 0.08);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(0, 0, 0, 0.08);
        }
        
        /* FAQ Items */
        .faq-item {
          margin-bottom: 1rem;
          border-radius: 1rem;
          overflow: hidden;
          background-color: #f8f9fa;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          border: 1px solid transparent;
          will-change: transform, opacity;
        }
        
        .faq-item:last-child {
          margin-bottom: 0;
        }
        
        .faq-item.active {
          background-color: rgba(99, 102, 241, 0.08);
          border-color: rgba(99, 102, 241, 0.15);
        }

        .faq-item:hover:not(.active) {
          border-color: rgba(99, 102, 241, 0.1);
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
          color: #1e293b;
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
          background-color: rgba(99, 102, 241, 0.12);
          color: #6366f1;
          font-size: 1.25rem;
          margin-left: 1rem;
          transition: all 0.3s ease;
          flex-shrink: 0;
        }
        
        .faq-item.active .faq-icon {
          transform: rotate(180deg);
          background-color: rgba(99, 102, 241, 0.2);
        }
        
        /* FAQ Answer */
        .faq-collapse {
          height: 0;
          overflow: hidden;
          transition: height 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .faq-answer {
          padding: 0 1.5rem 1.5rem;
          color: #475569;
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
          opacity: 0.3;
        }
        
        .faq-blob-1 {
          top: -10%;
          left: -15%;
          width: 300px;
          height: 300px;
          background: rgba(99, 102, 241, 0.08);
          transform: rotate(-15deg);
        }
        
        .faq-blob-2 {
          bottom: -5%;
          right: -10%;
          width: 250px;
          height: 250px;
          background: rgba(99, 102, 241, 0.08);
          transform: rotate(30deg);
        }
        
        /* CTA Card */
        .compact-cta-card {
          position: relative;
          padding: 1.5rem;
          border-radius: 16px;
          background: var(--secondary);
          color: #ffffff;
          overflow: hidden;
          box-shadow: 0 15px 30px rgba(255, 111, 97, 0.2);
          z-index: 1;
          margin-top: 1rem;
          will-change: transform, opacity;
        }
        
        /* FAQ CTA button styling */
        .faq-cta-button {
          background-color: #ffffff;
          color: var(--secondary);
          border: 2px solid #ffffff;
          transition: all 0.3s ease;
          font-weight: 600;
          padding: 0.75rem 1.5rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        
        .faq-cta-button:hover {
          background-color: rgba(255, 255, 255, 0.9);
          color: var(--secondary);
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        }
        
        .faq-cta-button:active {
          transform: translateY(-1px);
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
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

        .compact-cta-card h3,
        .compact-cta-card p {
          color: #ffffff !important;
        }

        .compact-cta-card h3 .text-gradient {
          background: linear-gradient(90deg, #ffffff, #f0f4ff);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.1));
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
          color: #6366f1;
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
          color: #4f46e5;
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
          transform: rotate(-8deg);
        }
        
        /* Hide decorative dots on mobile devices */
        @media (max-width: 1200px) {
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