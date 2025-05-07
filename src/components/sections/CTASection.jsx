'use client';

import { Container, Row, Col, Form } from 'react-bootstrap';
import Button from '../ui/Button';

export default function CTASection() {
  return (
    <section className="cta-section-container py-6">
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
                  
                  <Button 
                    type="submit" 
                    variant="primary"
                    endIcon={<span>→</span>}
                  >
                    Schedule My Call
                  </Button>
                  
                  <div className="form-disclaimer mt-3">
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
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          border-left: 1px solid var(--cta-card-border);
        }
        
        .form-wrapper {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 450px;
        }
        
        .form-title {
          font-size: 1.75rem;
          font-weight: 700;
          color: var(--form-text);
          text-align: center;
        }
        
        .form-control-enhanced {
          height: 56px;
          border-radius: 12px;
          border: 1px solid var(--border-color);
          background-color: var(--form-bg);
          color: var(--form-text);
          padding: 0.75rem 1rem;
          font-size: 1rem;
          transition: all 0.3s ease;
          box-shadow: 0 2px 4px var(--form-shadow);
        }
        
        .form-control-enhanced:focus {
          border-color: var(--form-accent);
          box-shadow: 0 0 0 3px rgba(var(--primary-rgb), 0.15);
          transform: translateY(-2px);
        }
        
        .form-control-enhanced::placeholder {
          color: var(--text-muted);
          opacity: 0.7;
        }
        
        .form-label {
          font-weight: 500;
          font-size: 0.9rem;
          margin-bottom: 0.5rem;
          color: var(--form-label);
        }
        
        .form-disclaimer {
          text-align: center;
          font-size: 0.85rem;
          color: var(--text-muted);
        }
        
        /* Make the content match the screenshot styling */
        .cta-content-col h2 {
          font-size: 2.75rem;
          line-height: 1.2;
        }
        
        .cta-content-col h2 span.text-gradient {
          color: #6366f1;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .cta-content-col .lead {
          font-size: 1.1rem;
          opacity: 0.9;
        }
        
        /* Add visual checkmarks that look like the screenshot */
        .benefit-icon {
          background-color: rgba(99, 102, 241, 0.1);
          color: #6366f1;
          font-weight: bold;
        }
        
        [data-bs-theme="dark"] .benefit-icon {
          background-color: rgba(99, 102, 241, 0.2);
          color: #818cf8;
        }
        
        /* Responsive adjustments */
        @media (max-width: 991.98px) {
          .cta-card-enhanced {
            border-radius: 1.25rem;
          }
          
          .cta-content-col, 
          .cta-form-col {
            padding: 3rem 2rem;
          }
          
          .cta-form-col {
            border-left: none;
            border-top: 1px solid var(--cta-card-border);
          }
          
          .benefits-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          
          .form-title {
            font-size: 1.5rem;
          }
          
          .cta-content-col h2 {
            font-size: 2.25rem;
          }
        }
        
        @media (max-width: 767.98px) {
          .cta-content-col, 
          .cta-form-col {
            padding: 2.5rem 1.5rem;
          }
          
          .cta-content-col h2 {
            font-size: 1.75rem;
          }
        }
      `}</style>
    </section>
  );
} 