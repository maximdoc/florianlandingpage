'use client';

import { Container, Row, Col, Form } from 'react-bootstrap';
import Button from '../ui/Button';

export default function CTASection() {
  return (
    <section id="strategy-call" className="cta-section-container py-6">
      <Container>
        <div className="cta-card-enhanced">
          <Row className="g-0">
            <Col lg={6} className="cta-content-col">
              <div className="content-wrapper">
                <h2 className="display-5 fw-bold mb-4">
                  Ready to turn <span className="text-gradient">government contracting</span> into a <span className="text-gradient">growth engine</span>?
                </h2>
                
                <p className="lead mb-4">
                  Join businesses that are securing predictable B2G revenue streams with SlingRFP's full-service approach.
                </p>
                
                <div className="benefits-grid">
                  <div className="benefit-item">
                    <div className="benefit-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                      </svg>
                    </div>
                    <span>Bid-ready in 30 days</span>
                  </div>
                  
                  <div className="benefit-item">
                    <div className="benefit-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                      </svg>
                    </div>
                    <span>No experience needed</span>
                  </div>
                  
                  <div className="benefit-item">
                    <div className="benefit-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                      </svg>
                    </div>
                    <span>Full-service approach</span>
                  </div>
                  
                  <div className="benefit-item">
                    <div className="benefit-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                      </svg>
                    </div>
                    <span>Target 10%+ win rate</span>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="decorative-shape shape-1"></div>
              <div className="decorative-shape shape-2"></div>
            </Col>
            
            <Col lg={6} className="cta-form-col">
              <div className="form-wrapper">
                <h3 className="form-title mb-4">Book Your Free Strategy Call</h3>
                
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control 
                      type="text" 
                      placeholder="Enter your full name" 
                      className="form-control-enhanced"
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                      type="email" 
                      placeholder="Enter your email" 
                      className="form-control-enhanced"
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-4">
                    <Form.Label>Company Name</Form.Label>
                    <Form.Control 
                      type="text" 
                      placeholder="Enter your company name" 
                      className="form-control-enhanced"
                    />
                  </Form.Group>
                  
                  <div className="d-grid">
                    <Button 
                      type="submit" 
                      variant="primary"
                      endIcon={<span>→</span>}
                      className="w-100"
                    >
                      Schedule My Call
                    </Button>
                  </div>
                  
                  <div className="form-disclaimer mt-3 text-center">
                    No obligation, 15-minute consultation
                  </div>
                </Form>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
      
      <style jsx global>{`
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
          gap: 0.75rem;
        }
        
        .benefit-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background-color: var(--benefit-icon-bg);
          color: var(--benefit-icon-color);
          flex-shrink: 0;
          box-shadow: 0 3px 10px rgba(var(--primary-rgb), 0.1);
          transition: all 0.3s ease;
        }
        
        .benefit-item:hover .benefit-icon {
          transform: scale(1.05);
          box-shadow: 0 4px 12px rgba(var(--primary-rgb), 0.15);
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
    </section>
  );
} 