'use client';

import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Image from 'next/image';

export default function TestimonialsSection() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  
  // Данные отзывов
  const testimonials = [
    {
      id: 1,
      quote: "SlingRFP stood up our entire vendor profile—including a <strong>Women‑Owned Small Business cert</strong>—then won us a $1.8M facilities contract.",
      author: "Tracy Mills",
      position: "COO, CleanEdge Services",
      avatar: "/images/user-1.jpg", // Путь к фото или null для плейсхолдера
      highlight: "Women‑Owned Small Business cert"
    },
    {
      id: 2,
      quote: "They handle everything: sourcing, gaps, writing, negotiations. We just deliver the work.",
      author: "Raj Patel",
      position: "CTO, OptiCloud IT",
      avatar: "/images/user-2.jpg", // Путь к фото или null для плейсхолдера
    }
  ];

  return (
    <section className="testimonials-section py-6 position-relative overflow-hidden">
      {/* Декоративные элементы */}
      <div className="position-absolute decorative-shape shape-top"></div>
      <div className="position-absolute decorative-shape shape-bottom"></div>
      
      <Container className="position-relative" style={{ zIndex: 2 }}>
        <Row className="text-center mb-5">
          <Col lg={8} className="mx-auto">
            <h2 className="display-5 mb-3 fade-in">
              <span className="text-gradient">Client</span> Proof
            </h2>
            <p className="lead text-body-secondary mb-4">
              Real results from businesses that partnered with SlingRFP
            </p>
            
            <div className="rating-container mt-4 mb-5">
              <div className="stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className="star">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                    </svg>
                  </span>
                ))}
              </div>
              <span className="rating-text">Helping businesses win government contracts</span>
            </div>
          </Col>
        </Row>
        
        <Row className="testimonials-container">
          <Col lg={10} className="mx-auto">
            <div className="testimonials-slider position-relative">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={testimonial.id}
                  className={`testimonial-card ${activeTestimonial === index ? 'active' : ''}`}
                  onClick={() => setActiveTestimonial(index)}
                >
                  <div className="testimonial-content">
                    <div className="quote-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 9 7.558V11a1 1 0 0 0 1 1h2Zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 3 7.558V11a1 1 0 0 0 1 1h2Z"/>
                      </svg>
                    </div>
                    
                    <p className="testimonial-quote" dangerouslySetInnerHTML={{ __html: testimonial.quote }}></p>
                    
                    <div className="testimonial-author">
                      <div className="author-avatar">
                        {testimonial.avatar ? (
                          <Image 
                            src={testimonial.avatar} 
                            alt={testimonial.author} 
                            width={50} 
                            height={50} 
                            className="avatar-image"
                          />
                        ) : (
                          <div className="avatar-placeholder">
                            {testimonial.author.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div className="author-info">
                        <h5 className="author-name">{testimonial.author}</h5>
                        <p className="author-position">{testimonial.position}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {testimonials.length > 1 && (
                <div className="testimonial-navigation">
                  {testimonials.map((_, index) => (
                    <button 
                      key={index} 
                      className={`nav-dot ${activeTestimonial === index ? 'active' : ''}`}
                      onClick={() => setActiveTestimonial(index)}
                      aria-label={`View testimonial ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </Col>
        </Row>
        
        <Row className="mt-5 pt-3">
          <Col className="text-center coming-soon">
            <p>More client success stories coming soon...</p>
          </Col>
        </Row>
      </Container>
      
      <style jsx global>{`
        /* Variables for theme compatibility */
        :root {
          --testimonial-bg: rgba(255, 255, 255, 0.02);
          --testimonial-border: rgba(255, 255, 255, 0.08);
          --testimonial-shadow: rgba(0, 0, 0, 0.2);
          --testimonial-text: rgba(255, 255, 255, 0.9);
          --quote-icon-color: rgba(var(--primary-rgb), 0.3);
          --author-name-color: rgba(255, 255, 255, 0.95);
          --author-position-color: rgba(255, 255, 255, 0.7);
          --star-color: var(--primary);
          --rating-text-color: rgba(255, 255, 255, 0.7);
          --dot-inactive: rgba(255, 255, 255, 0.2);
          --dot-active: var(--primary);
          --coming-soon-color: rgba(255, 255, 255, 0.5);
          --avatar-bg: rgba(var(--primary-rgb), 0.2);
        }
        
        [data-bs-theme="light"] {
          --testimonial-bg: rgba(255, 255, 255, 1);
          --testimonial-border: rgba(0, 0, 0, 0.08);
          --testimonial-shadow: rgba(0, 0, 0, 0.08);
          --testimonial-text: rgba(0, 0, 0, 0.8);
          --quote-icon-color: rgba(var(--primary-rgb), 0.2);
          --author-name-color: rgba(0, 0, 0, 0.9);
          --author-position-color: rgba(0, 0, 0, 0.6);
          --star-color: var(--primary);
          --rating-text-color: rgba(0, 0, 0, 0.6);
          --dot-inactive: rgba(0, 0, 0, 0.15);
          --dot-active: var(--primary);
          --coming-soon-color: rgba(0, 0, 0, 0.5);
          --avatar-bg: rgba(var(--primary-rgb), 0.1);
        }
        
        /* Section styling */
        .testimonials-section {
          position: relative;
          background: var(--dark-bg, #111827);
        }
        
        [data-bs-theme="light"] .testimonials-section {
          background: #f8fafc;
        }
        
        .decorative-shape {
          position: absolute;
          z-index: 0;
          background: var(--primary-light);
          filter: blur(100px);
          opacity: 0.03;
          border-radius: 50%;
        }
        
        .shape-top {
          top: 10%;
          right: -5%;
          width: 600px;
          height: 600px;
        }
        
        .shape-bottom {
          bottom: -5%;
          left: -5%;
          width: 400px;
          height: 400px;
        }
        
        /* Stars rating */
        .rating-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }
        
        .stars {
          display: flex;
          gap: 0.25rem;
        }
        
        .star {
          color: var(--star-color);
          transition: transform 0.3s ease;
        }
        
        .star:hover {
          transform: scale(1.2);
        }
        
        .rating-text {
          color: var(--rating-text-color);
          font-size: 0.95rem;
        }
        
        /* Testimonials container */
        .testimonials-container {
          position: relative;
        }
        
        .testimonials-slider {
          position: relative;
          padding: 1rem 0 3rem;
        }
        
        /* Testimonial card */
        .testimonial-card {
          background: var(--testimonial-bg);
          border: 1px solid var(--testimonial-border);
          border-radius: 16px;
          padding: 2.5rem;
          margin-bottom: 1rem;
          box-shadow: 0 10px 30px var(--testimonial-shadow);
          transition: all 0.4s ease;
          position: relative;
          cursor: pointer;
        }
        
        .testimonial-card:hover,
        .testimonial-card.active {
          transform: translateY(-5px);
          box-shadow: 0 15px 40px var(--testimonial-shadow);
          border-color: rgba(var(--primary-rgb), 0.2);
        }
        
        .testimonial-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--primary) 0%, var(--primary-light) 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
          border-radius: 16px 16px 0 0;
        }
        
        .testimonial-card:hover::before,
        .testimonial-card.active::before {
          opacity: 1;
        }
        
        .testimonial-content {
          position: relative;
        }
        
        .quote-icon {
          position: absolute;
          top: -10px;
          left: -10px;
          color: var(--quote-icon-color);
          opacity: 0.5;
        }
        
        .testimonial-quote {
          font-size: 1.125rem;
          line-height: 1.7;
          font-style: italic;
          color: var(--testimonial-text);
          margin-bottom: 1.5rem;
          padding-left: 1.5rem;
        }
        
        .testimonial-quote strong {
          color: var(--primary);
          font-weight: 600;
        }
        
        /* Author styling */
        .testimonial-author {
          display: flex;
          align-items: center;
          margin-top: 1.25rem;
        }
        
        .author-avatar {
          width: 50px;
          height: 50px;
          margin-right: 1rem;
          border-radius: 50%;
          background: var(--avatar-bg);
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }
        
        .avatar-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
        }
        
        .avatar-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--primary);
        }
        
        .author-info {
          display: flex;
          flex-direction: column;
        }
        
        .author-name {
          font-size: 1rem;
          font-weight: 600;
          margin: 0;
          color: var(--author-name-color);
        }
        
        .author-position {
          font-size: 0.875rem;
          color: var(--author-position-color);
          margin: 0;
        }
        
        /* Navigation dots */
        .testimonial-navigation {
          display: flex;
          justify-content: center;
          gap: 0.75rem;
          margin-top: 2rem;
        }
        
        .nav-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: var(--dot-inactive);
          border: none;
          padding: 0;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .nav-dot.active,
        .nav-dot:hover {
          background-color: var(--dot-active);
          transform: scale(1.2);
        }
        
        /* Coming soon text */
        .coming-soon {
          font-style: italic;
          color: var(--coming-soon-color);
          font-size: 0.95rem;
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
          .testimonial-card {
            padding: 1.75rem;
          }
          
          .testimonial-quote {
            font-size: 1rem;
            padding-left: 1rem;
          }
          
          .quote-icon {
            top: -5px;
            left: -5px;
          }
          
          .quote-icon svg {
            width: 24px;
            height: 24px;
          }
        }
      `}</style>
    </section>
  );
} 