'use client';

import { useState, useRef, useEffect } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import Button from '../ui/Button';
import SectionContainer from '../SectionContainer';
import Icon from '../ui/Icon';
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

export default function CTASection() {
  // Get CTA section data directly from content.json
  const homePageData = content.pages.find(page => page.id === 'home');
  const ctaSection = homePageData.sections.find(section => section.id === 'cta');

  // Refs for animation tracking
  const sectionRef = useRef(null);
  const contentColRef = useRef(null);
  const formColRef = useRef(null);
  const benefitsRef = useRef(null);

  // Check if elements are visible
  const isSectionVisible = useIsVisible(sectionRef);
  const isContentVisible = useIsVisible(contentColRef);
  const isFormVisible = useIsVisible(formColRef);
  const isBenefitsVisible = useIsVisible(benefitsRef);

  // If section data not found, don't display component
  if (!ctaSection) {
    return null;
  }

  return (
    <SectionContainer 
      id="strategy-call" 
      className="cta-section-container py-6" 
      backgroundVariant="light"
      ref={sectionRef}
    >
      <Container>
        <div className="cta-card-enhanced">
          <Row className="g-0">
            <Col lg={6} className="cta-content-col" ref={contentColRef}>
              <div className="content-wrapper">
                <h2 
                  className={`display-5 fw-bold mb-4 transition-all duration-1000 ${
                    isContentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`} 
                  dangerouslySetInnerHTML={{ __html: ctaSection.title }} 
                />
                
                <p 
                  className={`lead mb-4 transition-all duration-1000 delay-100 ${
                    isContentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                >
                  {ctaSection.subtitle}
                </p>
                
                <div 
                  className={`benefits-grid transition-all duration-1000 delay-200 ${
                    isBenefitsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`} 
                  ref={benefitsRef}
                >
                  {ctaSection.benefits && ctaSection.benefits.map((benefit, index) => (
                    <div 
                      className="benefit-item transition-all duration-1000" 
                      key={index}
                      style={{ 
                        transitionDelay: `${250 + index * 100}ms`,
                        opacity: isBenefitsVisible ? 1 : 0,
                        transform: isBenefitsVisible ? 'translateY(0)' : 'translateY(20px)'
                      }}
                    >
                      <div className="benefit-icon">
                        <Icon name="check" width={14} height={14} />
                      </div>
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="decorative-shape shape-1"></div>
              <div className="decorative-shape shape-2"></div>
            </Col>
            
            <Col lg={6} className="cta-form-col" ref={formColRef}>
              <div 
                className={`form-wrapper transition-all duration-1000 ${
                  isFormVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
              >
                <h3 
                  className={`form-title mb-4 transition-all duration-1000 ${
                    isFormVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                >
                  {ctaSection.formTitle}
                </h3>
                
                <Form>
                  {ctaSection.formFields && ctaSection.formFields.map((field, index) => (
                    <Form.Group 
                      className="mb-3" 
                      key={index}
                      style={{ 
                        transitionDelay: `${150 + index * 100}ms`,
                        opacity: isFormVisible ? 1 : 0,
                        transform: isFormVisible ? 'translateY(0)' : 'translateY(20px)',
                        transition: 'all 1000ms'
                      }}
                    >
                      <Form.Label>{field.label}</Form.Label>
                      <Form.Control 
                        type={field.type} 
                        placeholder={field.placeholder} 
                        className="form-control-enhanced"
                      />
                    </Form.Group>
                  ))}
                  
                  {ctaSection.submitButton && (
                    <div 
                      className="d-grid"
                      style={{ 
                        transitionDelay: `${150 + ((ctaSection.formFields?.length || 0) + 1) * 100}ms`,
                        opacity: isFormVisible ? 1 : 0,
                        transform: isFormVisible ? 'translateY(0)' : 'translateY(20px)',
                        transition: 'all 1000ms'
                      }}
                    >
                      <Button 
                        type="submit" 
                        variant="action"
                        endIcon={ctaSection.submitButton.endIcon && <Icon name={ctaSection.submitButton.endIcon} width={16} height={16} />}
                        className="w-100 consultation-cta-button"
                      >
                        {ctaSection.submitButton.text || "Book Your Free Consultation"}
                      </Button>
                    </div>
                  )}
                  
                  <div 
                    className="form-disclaimer mt-3 text-center"
                    style={{ 
                      transitionDelay: `${150 + ((ctaSection.formFields?.length || 0) + 1) * 100}ms`,
                      opacity: isFormVisible ? 1 : 0,
                      transform: isFormVisible ? 'translateY(0)' : 'translateY(20px)',
                      transition: 'all 1000ms'
                    }}
                  >
                    {ctaSection.disclaimer}
                  </div>
                </Form>
              </div>
            </Col>
          </Row>
        </div>
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
        
        .cta-section-container {
          position: relative;
          overflow: hidden;
          padding: 5rem 0;
          background-color: var(--section-bg-light);
        }
        
        .cta-card-enhanced {
          border-radius: 1.5rem;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(99, 102, 241, 0.12), 0 1px 3px rgba(0, 0, 0, 0.05);
          background: #ffffff;
          border: 1px solid rgba(99, 102, 241, 0.15);
          position: relative;
          z-index: 1;
        }
        
        .cta-content-col {
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          padding: 4rem 3rem;
          color: #1e293b;
          z-index: 1;
        }
        
        /* Responsive adjustments for CTA section */
        @media (min-width: 768px) and (max-width: 991px) {
          /* Tablet-specific layout (768-991px) */
          .cta-card-enhanced {
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
            overflow-x: auto;
          }

          .cta-card-enhanced .row {
            flex-direction: row;
            flex-wrap: nowrap;
            width: max-content;
            min-width: 100%;
          }

          .cta-content-col,
          .cta-form-col {
            min-width: 600px;
            width: 50%;
            padding: 3rem 2rem;
          }

          .benefits-grid {
            gap: 1rem;
            grid-template-columns: 1fr;
            max-width: 450px;
          }

          .content-wrapper {
            max-width: 500px;
          }

          .form-wrapper {
            max-width: 450px;
          }

          /* Adjust font sizes for better readability */
          .display-5 {
            font-size: calc(1.375rem + 1.5vw);
          }
        }
        
        @media (max-width: 991px) {
          .cta-content-col {
            padding: 3rem 2rem;
          }
          
          .cta-card-enhanced {
            border-radius: 1rem;
          }
          
          .benefits-grid {
            gap: 1rem;
            grid-template-columns: 1fr;
          }
          
          .display-5 {
            font-size: calc(1.425rem + 1.8vw);
          }
          
          .form-title {
            font-size: 1.5rem;
          }

          .cta-form-col {
            padding: 3rem 2rem;
          }

          .form-wrapper {
            max-width: 100%;
          }

          /* Improved form spacing on tablets */
          .form-control-enhanced {
            padding: 0.8rem;
            font-size: 0.95rem;
          }

          /* Better column stacking for tablet */
          .cta-card-enhanced .row {
            flex-direction: column;
          }

          .cta-content-col,
          .cta-form-col {
            width: 100%;
            max-width: 100%;
            flex: 0 0 100%;
          }

          /* Center content on tablets */
          .content-wrapper {
            max-width: 100%;
            text-align: center;
            margin: 0 auto;
          }

          /* Center benefits grid on tablets */
          .benefits-grid {
            max-width: 450px;
            margin-left: auto;
            margin-right: auto;
          }

          .benefit-item {
            justify-content: flex-start;
            text-align: left;
          }
        }
        
        @media (max-width: 767.98px) {
          .cta-section-container {
            padding: 5rem 0;
          }
          
          .cta-content-col, 
          .cta-form-col {
            padding: 2.5rem !important;
          }
          
          .content-wrapper {
            max-width: 100% !important;
          }
          
          .benefits-grid {
            grid-template-columns: 1fr !important;
            gap: 0.75rem !important;
          }
          
          .display-5 {
            font-size: calc(1.35rem + 1.2vw);
            overflow-wrap: break-word;
            word-wrap: break-word;
          }
          
          .form-wrapper {
            padding: 0 !important;
          }
          
          .form-title {
            font-size: 1.35rem;
            margin-bottom: 1.25rem;
            word-wrap: break-word;
            overflow-wrap: break-word;
          }
        }
        
        @media (max-width: 575.98px) {
          .form-title {
            font-size: 1.25rem;
            margin-bottom: 1rem;
          }
        }
        
        .content-wrapper {
          position: relative;
          z-index: 2;
          max-width: 500px;
        }
        
        .benefits-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
          margin-top: 2rem;
          will-change: transform, opacity;
        }
        
        .benefit-item {
          display: flex;
          align-items: center;
          font-size: 0.95rem;
          margin-bottom: 0.75rem;
          will-change: transform, opacity;
        }
        
        .benefit-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: 10px;
          margin-right: 0.75rem;
          flex-shrink: 0;
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, #0052CC, #1C68E0);
          color: white;
          /* 3D effect with enhanced shadows */
          box-shadow: 
            0 3px 10px rgba(0, 82, 204, 0.3),
            0 0 0 1px rgba(255, 255, 255, 0.1),
            inset 0 -1px 3px rgba(0, 0, 0, 0.15),
            inset 0 1px 3px rgba(255, 255, 255, 0.3);
        }
        
        /* Glowing effect */
        .benefit-icon::before {
          content: '';
          position: absolute;
          inset: -2px;
          background: linear-gradient(135deg, rgba(0, 82, 204, 0.2), rgba(28, 104, 224, 0.1));
          border-radius: 12px;
          z-index: -1;
          filter: blur(6px);
          opacity: 0.8;
        }
        
        /* Upper highlight for 3D effect */
        .benefit-icon::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 50%;
          background: linear-gradient(to bottom, rgba(255, 255, 255, 0.5), transparent);
          border-radius: 10px 10px 0 0;
          opacity: 0.7;
        }
        
        .benefit-icon svg {
          position: relative;
          z-index: 1;
        }
        
        .benefit-item:hover .benefit-icon {
          transform: translateY(-1px);
          box-shadow: 
            0 5px 12px rgba(0, 82, 204, 0.4),
            0 0 0 1px rgba(255, 255, 255, 0.15),
            inset 0 -1px 3px rgba(0, 0, 0, 0.15),
            inset 0 1px 3px rgba(255, 255, 255, 0.4);
        }
        
        .benefit-item span {
          font-weight: 500;
          font-size: 0.95rem;
          color: #1E293B;
        }
        
        .decorative-shape {
          position: absolute;
          border-radius: 50%;
          filter: blur(50px);
          z-index: 0;
          opacity: 0.6;
        }
        
        .shape-1 {
          width: 400px;
          height: 400px;
          bottom: -200px;
          right: -200px;
          background: rgba(99, 102, 241, 0.1);
          animation: floatSlow 15s ease-in-out infinite alternate;
        }
        
        .shape-2 {
          width: 300px;
          height: 300px;
          top: -150px;
          left: -150px;
          background: rgba(99, 102, 241, 0.05);
          animation: floatSlow 20s ease-in-out infinite alternate-reverse;
        }
        
        @keyframes floatSlow {
          0% { transform: translate(0, 0) rotate(0deg); }
          100% { transform: translate(30px, 30px) rotate(15deg); }
        }
        
        /* Form column styling */
        .cta-form-col {
          background: #f8f9ff;
          backdrop-filter: blur(10px);
          padding: 4rem 3rem;
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .form-wrapper {
          width: 100%;
          max-width: 400px;
          will-change: transform, opacity;
        }
        
        .form-title {
          font-weight: 700;
          color: #1e293b;
          font-size: 1.75rem;
          will-change: transform, opacity;
          line-height: 1.3;
        }
        
        .form-control-enhanced {
          background: #ffffff;
          border: 1px solid rgba(99, 102, 241, 0.1);
          color: #1e293b;
          padding: 0.75rem 1rem;
          height: auto;
          border-radius: 0.75rem;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
        }
        
        .form-control-enhanced:focus {
          border-color: #6366f1;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
        }
        
        .form-control-enhanced::placeholder {
          color: rgba(100, 116, 139, 0.5);
        }
        
        .form-label {
          font-weight: 500;
          color: #64748b;
          margin-bottom: 0.5rem;
        }
        
        .form-disclaimer {
          color: #64748b;
          font-size: 0.875rem;
          will-change: transform, opacity;
        }
        
        /* Post-Mission Section CTA */
        .consultation-cta-button {
          background-color: var(--secondary);
          color: white;
          transition: all 0.3s ease;
          font-weight: 600;
          box-shadow: 0 4px 14px rgba(255, 111, 97, 0.25);
          border: none;
          padding: 0.75rem 1.5rem;
        }
        
        .consultation-cta-button:hover {
          background-color: var(--btn-action-hover-bg);
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(255, 111, 97, 0.35);
        }
        
        .consultation-cta-button:active {
          background-color: var(--btn-action-active-bg);
          transform: translateY(-1px);
          box-shadow: 0 4px 10px rgba(255, 111, 97, 0.25);
        }
      `}</style>
    </SectionContainer>
  );
} 