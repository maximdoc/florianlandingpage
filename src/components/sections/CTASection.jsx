'use client';

import { useState, useEffect } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import Button from '../ui/Button';
import SectionContainer from '../SectionContainer';
import Icon from '../ui/Icon';
import { getSectionById } from '@/utils/contentUtils';

export default function CTASection() {
  const [ctaSection, setCtaSection] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Загружаем данные секции из API
  useEffect(() => {
    async function loadCtaSection() {
      try {
        setLoading(true);
        const sectionData = await getSectionById('home', 'cta');
        setCtaSection(sectionData);
      } catch (error) {
        console.error('Error loading CTA section:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadCtaSection();
  }, []);
  
  // Если данные загружаются, показываем индикатор загрузки
  if (loading) {
    return <div className="p-5 text-center">Loading...</div>;
  }

  // Если данные секции не найдены, не отображаем компонент
  if (!ctaSection) {
    return null;
  }

  return (
    <SectionContainer 
      id="strategy-call" 
      className="cta-section-container py-6" 
      backgroundVariant={ctaSection.backgroundVariant || "dark"}
    >
      <Container>
        <div className="cta-card-enhanced">
          <Row className="g-0">
            <Col lg={6} className="cta-content-col">
              <div className="content-wrapper">
                <h2 className="display-5 fw-bold mb-4" dangerouslySetInnerHTML={{ __html: ctaSection.title }} />
                
                <p className="lead mb-4">
                  {ctaSection.subtitle}
                </p>
                
                <div className="benefits-grid">
                  {ctaSection.benefits && ctaSection.benefits.map((benefit, index) => (
                    <div className="benefit-item" key={index}>
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
            
            <Col lg={6} className="cta-form-col">
              <div className="form-wrapper">
                <h3 className="form-title mb-4">{ctaSection.formTitle}</h3>
                
                <Form>
                  {ctaSection.formFields && ctaSection.formFields.map((field, index) => (
                    <Form.Group className="mb-3" key={index}>
                      <Form.Label>{field.label}</Form.Label>
                      <Form.Control 
                        type={field.type} 
                        placeholder={field.placeholder} 
                        className="form-control-enhanced"
                      />
                    </Form.Group>
                  ))}
                  
                  {ctaSection.submitButton && (
                    <div className="d-grid">
                      <Button 
                        type="submit" 
                        variant="primary"
                        endIcon={ctaSection.submitButton.endIcon && <Icon name={ctaSection.submitButton.endIcon} width={16} height={16} />}
                        className="w-100"
                      >
                        {ctaSection.submitButton.text}
                      </Button>
                    </div>
                  )}
                  
                  <div className="form-disclaimer mt-3 text-center">
                    {ctaSection.disclaimer}
                  </div>
                </Form>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
      
      <style jsx global>{`
        /* Базовые CSS-переменные для совместимости с темами */
        :root {
          --cta-bg: var(--primary);
          --cta-card-bg: #ffffff;
          --cta-form-bg: #f8f9ff;
          --cta-text: var(--text-primary);
          --benefit-icon-bg: rgba(var(--primary-rgb), 0.1);
          --benefit-icon-color: var(--primary);
          --form-accent: var(--primary);
          --form-text: var(--text-primary);
          --form-bg: #ffffff;
          --form-label: var(--text-secondary);
          --form-shadow: rgba(0, 0, 0, 0.05);
          --shape-color-1: rgba(var(--primary-rgb), 0.1);
          --shape-color-2: rgba(var(--primary-rgb), 0.05);
          --cta-card-border: rgba(var(--primary-rgb), 0.15);
          --cta-card-shadow: 0 20px 60px rgba(var(--primary-rgb), 0.12), 0 1px 3px rgba(0, 0, 0, 0.05);
        }
        
        [data-bs-theme="dark"] {
          --cta-card-bg: var(--card-bg);
          --cta-form-bg: rgba(255, 255, 255, 0.02);
          --benefit-icon-bg: rgba(var(--primary-rgb), 0.2);
          --form-shadow: rgba(0, 0, 0, 0.2);
          --shape-color-1: rgba(var(--primary-rgb), 0.15);
          --shape-color-2: rgba(var(--primary-rgb), 0.1);
          --form-bg: rgba(30, 41, 59, 0.2);
          --cta-card-border: rgba(255, 255, 255, 0.05);
          --cta-card-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }
        
        .cta-section-container {
          position: relative;
          overflow: hidden;
          padding: 5rem 0;
        }
        
        .cta-card-enhanced {
          border-radius: 1.5rem;
          overflow: hidden;
          box-shadow: var(--cta-card-shadow);
          background: var(--cta-card-bg);
          border: 1px solid var(--cta-card-border);
          position: relative;
          z-index: 1;
        }
        
        .cta-content-col {
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          padding: 4rem 3rem;
          color: var(--cta-text);
          z-index: 1;
        }
        
        /* Responsive adjustments for CTA section */
        @media (max-width: 991px) {
          .cta-content-col {
            padding: 3rem 2rem;
          }
          
          .cta-card-enhanced {
            border-radius: 1rem;
          }
          
          .benefits-grid {
            gap: 1rem;
          }
          
          .display-5 {
            font-size: calc(1.425rem + 2.1vw);
          }
        }
        
        @media (max-width: 768px) {
          .cta-section-container {
            padding: 3rem 0;
          }
          
          .cta-content-col, 
          .cta-form-col {
            padding: 2.5rem 1.5rem;
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
        }
        
        .benefit-item {
          display: flex;
          align-items: center;
          font-size: 0.95rem;
          margin-bottom: 0.75rem;
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
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: white;
          /* 3D effect with enhanced shadows */
          box-shadow: 
            0 3px 10px rgba(99, 102, 241, 0.3),
            0 0 0 1px rgba(255, 255, 255, 0.1),
            inset 0 -1px 3px rgba(0, 0, 0, 0.15),
            inset 0 1px 3px rgba(255, 255, 255, 0.3);
        }
        
        /* Glowing effect */
        .benefit-icon::before {
          content: '';
          position: absolute;
          inset: -2px;
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(139, 92, 246, 0.1));
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
            0 5px 12px rgba(99, 102, 241, 0.4),
            0 0 0 1px rgba(255, 255, 255, 0.15),
            inset 0 -1px 3px rgba(0, 0, 0, 0.15),
            inset 0 1px 3px rgba(255, 255, 255, 0.4);
        }
        
        .benefit-item span {
          font-weight: 500;
          font-size: 0.95rem;
          color: var(--cta-text);
        }
        
        [data-bs-theme="light"] .benefit-item span {
          color: #1e293b !important;
        }
        
        [data-bs-theme="dark"] .benefit-item span {
          color: rgba(255, 255, 255, 0.9) !important;
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
          background: var(--shape-color-1);
          animation: floatSlow 15s ease-in-out infinite alternate;
        }
        
        .shape-2 {
          width: 300px;
          height: 300px;
          top: -150px;
          left: -150px;
          background: var(--shape-color-2);
          animation: floatSlow 20s ease-in-out infinite alternate-reverse;
        }
        
        @keyframes floatSlow {
          0% { transform: translate(0, 0) rotate(0deg); }
          100% { transform: translate(30px, 30px) rotate(15deg); }
        }
        
        /* Form column styling */
        .cta-form-col {
          background: var(--cta-form-bg);
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
        }
        
        .form-title {
          font-weight: 700;
          color: var(--cta-text);
          font-size: 1.75rem;
        }
        
        .form-control-enhanced {
          background: var(--form-bg);
          border: 1px solid rgba(var(--primary-rgb), 0.1);
          color: var(--form-text);
          padding: 0.75rem 1rem;
          height: auto;
          border-radius: 0.75rem;
          box-shadow: 0 2px 4px var(--form-shadow);
          transition: all 0.3s ease;
        }
        
        .form-control-enhanced:focus {
          border-color: var(--form-accent);
          box-shadow: 0 0 0 3px rgba(var(--primary-rgb), 0.1);
        }
        
        .form-control-enhanced::placeholder {
          color: rgba(var(--text-secondary-rgb), 0.5);
        }
        
        .form-label {
          font-weight: 500;
          color: var(--form-label);
          margin-bottom: 0.5rem;
        }
        
        .form-disclaimer {
          color: var(--text-secondary);
          font-size: 0.875rem;
        }
      `}</style>
    </SectionContainer>
  );
} 