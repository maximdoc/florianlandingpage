'use client';

import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

export default function ComparisonSection() {
  const [activeCard, setActiveCard] = useState(null);
  
  // Define comparison items for easier maintenance
  const beforeItems = [
    { id: 1, text: "Weeks hunting for paperwork" },
    { id: 2, text: "Surprise 'non-responsive' rejections" },
    { id: 3, text: "5% win rate" },
    { id: 4, text: "No insight into why you lost" }
  ];
  
  const afterItems = [
    { id: 1, text: "Profile auto-compiled & stored" },
    { id: 2, text: "100% compliance checklist hit" },
    { id: 3, text: "Target 10%+ win rate in 18 months", highlight: true },
    { id: 4, text: "AI analytics + coach debrief" }
  ];

  return (
    <section className="comparison-section py-6 position-relative overflow-hidden">
      {/* Decorative elements */}
      <div className="position-absolute decorative-shape top-shape"></div>
      <div className="position-absolute decorative-shape bottom-shape"></div>
      
      <Container className="position-relative" style={{ zIndex: 2 }}>
        <Row className="text-center mb-5">
          <Col lg={8} className="mx-auto">
            <h2 className="display-5 mb-3 fade-in">
              Life <span className="text-gradient">Before vs. After</span> SlingRFP
            </h2>
            <p className="lead text-body-secondary mb-5">
              See the transformative impact of our B2G contracting solution
            </p>
          </Col>
        </Row>
        
        <div className="comparison-container">
          {/* BEFORE CARD */}
          <div 
            className={`comparison-card before-card ${activeCard === 'before' ? 'active' : ''}`}
            onMouseEnter={() => setActiveCard('before')}
            onMouseLeave={() => setActiveCard(null)}
          >
            <div className="card-header">
              <h3 className="card-title before">Before</h3>
            </div>
            
            <ul className="comparison-list">
              {beforeItems.map(item => (
                <li key={item.id} className="comparison-item negative">
                  <div className="icon-wrapper">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
                    </svg>
                  </div>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
            
            <div className="result-box negative">
              <p>Result: Frustration, wasted resources, and missed opportunities</p>
            </div>
          </div>
          
          {/* AFTER CARD */}
          <div 
            className={`comparison-card after-card ${activeCard === 'after' ? 'active' : ''}`}
            onMouseEnter={() => setActiveCard('after')}
            onMouseLeave={() => setActiveCard(null)}
          >
            <div className="card-header">
              <h3 className="card-title after">After <span className="text-gradient">SlingRFP</span></h3>
            </div>
            
            <ul className="comparison-list">
              {afterItems.map(item => (
                <li key={item.id} className="comparison-item positive">
                  <div className="icon-wrapper">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.5.5 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                    </svg>
                  </div>
                  <span className={item.highlight ? 'highlight' : ''}>{item.text}</span>
                </li>
              ))}
            </ul>
            
            <div className="result-box positive">
              <p>Result: Predictable revenue from public sector contracts</p>
            </div>
          </div>
        </div>
        
        <Row>
          <Col lg={10} className="mx-auto text-center">
            <div className="bottom-line-box">
              <div className="glow-effect"></div>
              <h3 className="bottom-line-title">The <span className="text-gradient">Bottom Line</span></h3>
              <p className="bottom-line-text">
                SlingRFP transforms government contracting from a high-effort, low-reward gamble into a streamlined, predictable revenue channel for your business.
              </p>
            </div>
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
        }
        
        /* Section styling */
        .comparison-section {
          position: relative;
          background: var(--dark-bg, #111827);
          padding: 7rem 0;
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
        }
        
        .comparison-card.active, 
        .comparison-card:hover {
          transform: translateY(-8px) scale(1.01);
          box-shadow: 0 20px 40px var(--card-hover-shadow);
        }
        
        .comparison-card::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 18px;
          padding: 1px;
          background: linear-gradient(
            to bottom, 
            transparent, 
            transparent,
            rgba(255, 255, 255, 0.1)
          );
          -webkit-mask: 
            linear-gradient(#fff 0 0) content-box, 
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }
        
        .before-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--before-color), transparent);
          opacity: 0.5;
        }
        
        .after-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--after-color), transparent);
          opacity: 0.5;
        }
        
        .before-card.active::before, 
        .before-card:hover::before {
          opacity: 1;
        }
        
        .after-card.active::before, 
        .after-card:hover::before {
          opacity: 1;
        }
        
        /* Card headers */
        .card-header {
          padding: 1.75rem;
          text-align: center;
          border-bottom: 1px solid var(--card-border);
          position: relative;
          overflow: hidden;
        }
        
        .card-header::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
        }
        
        .card-title {
          font-size: 1.75rem;
          font-weight: 700;
          margin: 0;
          position: relative;
          display: inline-block;
        }
        
        .card-title.before {
          color: var(--before-color);
        }
        
        .card-title.after {
          color: var(--after-color);
        }
        
        .card-title.before::after,
        .card-title.after::after {
          content: '';
          position: absolute;
          bottom: -6px;
          left: 25%;
          width: 50%;
          height: 2px;
          border-radius: 2px;
          opacity: 0.7;
        }
        
        .card-title.before::after {
          background: var(--before-color);
        }
        
        .card-title.after::after {
          background: var(--after-color);
        }
        
        /* List styling */
        .comparison-list {
          list-style: none;
          padding: 1.75rem;
          margin: 0;
          flex: 1;
        }
        
        .comparison-item {
          display: flex;
          align-items: center;
          margin-bottom: 1.5rem;
          position: relative;
          padding-left: 2.75rem;
          transition: transform 0.3s ease;
        }
        
        .comparison-item:last-child {
          margin-bottom: 0;
        }
        
        .comparison-item:hover {
          transform: translateX(5px);
        }
        
        .icon-wrapper {
          position: absolute;
          left: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: var(--icon-bg);
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .comparison-item:hover .icon-wrapper {
          transform: scale(1.1);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        
        .comparison-item.negative .icon-wrapper {
          color: var(--before-color);
        }
        
        .comparison-item.positive .icon-wrapper {
          color: var(--after-color);
        }
        
        .icon-wrapper svg {
          width: 20px;
          height: 20px;
          display: block;
          /* Ensure SVG is perfectly centered */
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        
        .comparison-item span {
          line-height: 1.5;
          font-size: 1.05rem;
        }
        
        .comparison-item .highlight {
          font-weight: 700;
          position: relative;
          display: inline-block;
        }
        
        .comparison-item .highlight::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background: rgba(var(--primary-rgb), 0.2);
          border-radius: 2px;
          z-index: -1;
        }
        
        /* Result box styling */
        .result-box {
          padding: 1.25rem 1.75rem;
          text-align: center;
          font-weight: 600;
          margin-top: auto;
          position: relative;
          overflow: hidden;
        }
        
        .result-box p {
          margin: 0;
          color: var(--result-text);
          font-size: 1.1rem;
        }
        
        .result-box.negative {
          background-color: var(--before-bg);
          border-top: 1px solid var(--before-border);
          color: var(--before-color);
        }
        
        .result-box.positive {
          background-color: var(--after-bg);
          border-top: 1px solid var(--after-border);
          color: var(--after-color);
        }
        
        .result-box::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
        }
        
        /* Bottom line styling */
        .bottom-line-box {
          background: var(--bottom-line-bg);
          backdrop-filter: blur(10px);
          border-radius: 18px;
          padding: 2.5rem;
          position: relative;
          overflow: hidden;
          border-left: 5px solid var(--primary);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1), 0 0 15px rgba(var(--primary-rgb), 0.05);
          transform: translateY(0);
          transition: transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        
        .bottom-line-box:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15), 0 0 20px rgba(var(--primary-rgb), 0.1);
        }
        
        .glow-effect {
          position: absolute;
          width: 200px;
          height: 200px;
          background: var(--primary-light);
          filter: blur(60px);
          opacity: 0.1;
          border-radius: 50%;
          top: -100px;
          right: -100px;
          transition: opacity 0.5s ease;
        }
        
        .bottom-line-box:hover .glow-effect {
          opacity: 0.15;
        }
        
        .bottom-line-title {
          font-size: 1.75rem;
          font-weight: 700;
          margin-bottom: 1.25rem;
          position: relative;
          display: inline-block;
        }
        
        .bottom-line-title::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 0;
          width: 50%;
          height: 2px;
          background: linear-gradient(90deg, rgba(var(--primary-rgb), 0.5), transparent);
          border-radius: 2px;
        }
        
        .bottom-line-text {
          font-size: 1.2rem;
          line-height: 1.7;
          margin-bottom: 0;
          font-weight: 500;
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
          .comparison-container {
            grid-template-columns: 1fr;
          }
          
          .comparison-card {
            margin-bottom: 1.5rem;
          }
          
          .card-title {
            font-size: 1.25rem;
          }
          
          .bottom-line-title {
            font-size: 1.25rem;
          }
          
          .bottom-line-text {
            font-size: 1rem;
          }
        }
      `}</style>
    </section>
  );
} 