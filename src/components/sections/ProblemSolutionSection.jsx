'use client';

import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Link from 'next/link';
import Button from '../ui/Button';

export default function ProblemSolutionSection() {
  const [activeStep, setActiveStep] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  
  // Add intersection observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setIsVisible(true);
      }
    }, { threshold: 0.1 });
    
    const section = document.querySelector('.problem-solution-section');
    if (section) observer.observe(section);
    
    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);
  
  const handleStepHover = (index) => {
    setActiveStep(index);
  };

  // Define solution steps for easier maintenance
  const solutionSteps = [
    {
      number: 1,
      title: "Profile Builder",
      description: "We assemble every credential, past performance doc, and certificate you need."
    },
    {
      number: 2,
      title: "Gap Tracker",
      description: "Continuous scans reveal missing qualifications; our team closes them fast."
    },
    {
      number: 3,
      title: "Opportunity Match",
      description: "AI surfaces solicitations you're truly eligible for."
    },
    {
      number: 4,
      title: "Proposal Studio",
      description: "LLM‑powered writers craft and submit compliant bids."
    },
    {
      number: 5,
      title: "Win‑Analytics Loop",
      description: "Post‑award debriefs retrain the models, boosting future win odds."
    }
  ];

  return (
    <section className="problem-solution-section position-relative overflow-hidden">
      {/* Challenge Section */}
      <div className="challenge-section py-6 position-relative overflow-hidden">
        {/* Decorative elements */}
        <div className="position-absolute shape-1"></div>
        <div className="position-absolute shape-2"></div>
        
        <Container className="position-relative" style={{ zIndex: 1 }}>
          <Row className={`justify-content-center text-center mb-5 ${isVisible ? 'visible' : ''}`}>
            <Col lg={10} xl={8}>
              <h2 className="display-5 mb-3 title-animation">
                <span className="text-gradient">Breaking into government sales</span> is a maze of rules, portals, and paperwork.
              </h2>
              <p className="lead subtitle-animation">
                Most SMBs give up before they submit a single bid.
              </p>
            </Col>
          </Row>

          <Row className="justify-content-center">
            <Col lg={10} xl={9}>
              <div className={`challenge-card mb-5 ${isVisible ? 'visible' : ''}`} style={{ animationDelay: '0.2s' }}>
                <h3 className="fw-bold mb-3">Why it hurts</h3>
                <p className="lead mb-0">Without a spotless vendor profile, required certifications, and agency‑specific language, 95% of bids are disqualified on arrival.</p>
              </div>
            </Col>
          </Row>
          
          <Row className="stats-row justify-content-center mt-5">
            <Col md={5} lg={4} className={`mb-4 stat-col mx-2 ${isVisible ? 'visible' : ''}`} style={{ animationDelay: `${0.3}s` }}>
              <div className="stat-card text-center">
                <h3 className="stat-value">95%</h3>
                <p className="stat-description">Disqualification rate for unprepared vendors</p>
              </div>
            </Col>
            <Col md={5} lg={4} className={`mb-4 stat-col mx-2 ${isVisible ? 'visible' : ''}`} style={{ animationDelay: `${0.45}s` }}>
              <div className="stat-card text-center">
                <h3 className="stat-value">30+</h3>
                <p className="stat-description">Average documents needed per bid</p>
              </div>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col md={5} lg={4} className={`mb-4 stat-col mx-2 ${isVisible ? 'visible' : ''}`} style={{ animationDelay: `${0.6}s` }}>
              <div className="stat-card text-center">
                <h3 className="stat-value">5%</h3>
                <p className="stat-description">Average win rate without support</p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Solution Section */}
      <div className="solution-section py-6 position-relative overflow-hidden">
        {/* Decorative elements */}
        <div className="position-absolute shape-3"></div>
        <div className="position-absolute shape-4"></div>
        
        <Container className="position-relative" style={{ zIndex: 2 }}>
          <Row className={`justify-content-center text-center mb-5 ${isVisible ? 'visible' : ''}`}>
            <Col lg={10} xl={8}>
              <h2 className="display-5 mb-3 solution-title-animation">
                The <span className="text-gradient">SlingRFP</span> Solution
              </h2>
              <p className="lead solution-subtitle-animation">
                Our comprehensive approach transforms your business from having no government presence to securing repeat awards without hiring a dedicated capture team.
              </p>
            </Col>
          </Row>

          <Row className="justify-content-center mb-5">
            <Col lg={10} className="solution-steps-container">
                {solutionSteps.map((step, index) => (
                  <div 
                    key={step.number}
                  className={`solution-step-card ${activeStep === index ? 'active' : ''} ${isVisible ? 'visible' : ''}`}
                  style={{ animationDelay: `${0.4 + index * 0.15}s` }}
                    onMouseEnter={() => handleStepHover(index)}
                    onMouseLeave={() => handleStepHover(null)}
                  >
                    <div className="step-number">
                      <div className="number-circle">{step.number}</div>
                    </div>
                    <div className="step-content">
                      <h3 className="step-title">{step.title}</h3>
                      <p className="step-description">{step.description}</p>
                    </div>
                  </div>
                ))}
            </Col>
          </Row>

          <Row className="justify-content-center">
            <Col lg={10} className="text-center">
              <div className={`result-card ${isVisible ? 'visible' : ''}`} style={{ animationDelay: '0.9s' }}>
                <div className="glow-effect-1"></div>
                <div className="glow-effect-2"></div>
                
                <div className="result-content">
                  <h3 className="result-title">Result</h3>
                  <p className="result-description">
                    You move from <em>no presence</em> to <em>repeat awards</em> without hiring a capture team.
                  </p>
                  <Button 
                    href="#strategy-call" 
                    variant="white" 
                    size="lg" 
                    className="mt-2"
                  >
                    Book Your Free Strategy Call
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      
      <style jsx global>{`
        /* Core variables for theme compatibility */
        :root {
          --problem-section-bg: #121829;
          --solution-section-bg: #121829;
          --card-bg: rgba(255, 255, 255, 0.03);
          --card-border: rgba(255, 255, 255, 0.1);
          --card-hover-bg: rgba(255, 255, 255, 0.05);
          --card-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          --card-hover-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
          --text-primary: #fff;
          --text-secondary: rgba(255, 255, 255, 0.7);
          --stat-card-bg: rgba(30, 41, 59, 0.5);
          --stat-value-color: #6366f1;
          --stat-description-color: rgba(255, 255, 255, 0.7);
          --step-card-bg: rgba(30, 41, 59, 0.6);
          --step-card-border: rgba(255, 255, 255, 0.08);
          --step-icon-color: #6366f1;
          --result-card-bg: #6366f1;
          --result-text-color: #ffffff;
          --primary-rgb: 99, 102, 241;
        }
        
        [data-bs-theme="light"] {
          --problem-section-bg: #f8fafc;
          --solution-section-bg: #ffffff;
          --card-bg: #ffffff;
          --card-border: rgba(0, 0, 0, 0.06);
          --card-hover-bg: #ffffff;
          --card-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
          --card-hover-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
          --text-primary: #0f172a;
          --text-secondary: #4b5563;
          --stat-card-bg: #ffffff;
          --stat-value-color: #6366f1;
          --stat-description-color: #4b5563;
          --step-card-bg: #ffffff;
          --step-card-border: rgba(0, 0, 0, 0.08);
          --step-icon-color: #6366f1;
          --result-card-bg: #6366f1;
          --result-text-color: #ffffff;
        }
        
        /* Section styling */
        .problem-solution-section {
          position: relative;
        }
        
        .challenge-section {
          background: var(--problem-section-bg);
          padding: 5rem 0;
        }
        
        .solution-section {
          background: var(--solution-section-bg);
          padding: 5rem 0;
        }
        
        /* Animated shapes */
        .shape-1 {
          top: 5%;
          right: -10%;
          width: 500px;
          height: 500px;
          background: var(--primary-rgb, 99, 102, 241);
          opacity: 0.04;
          border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
          filter: blur(100px);
          animation: floatShape 15s ease-in-out infinite alternate;
          position: absolute;
        }
        
        .shape-2 {
          bottom: 10%;
          left: -15%;
          width: 600px;
          height: 600px;
          background: var(--primary-rgb, 99, 102, 241);
          opacity: 0.03;
          border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
          filter: blur(120px);
          animation: floatShape 20s ease-in-out infinite alternate-reverse;
          position: absolute;
        }
        
        .shape-3 {
          top: 15%;
          left: -10%;
          width: 450px;
          height: 450px;
          background: var(--primary-rgb, 99, 102, 241);
          opacity: 0.025;
          border-radius: 50% 50% 30% 70% / 50% 70% 30% 50%;
          filter: blur(90px);
          animation: floatShape 18s ease-in-out infinite alternate;
          position: absolute;
        }
        
        .shape-4 {
          bottom: 5%;
          right: -5%;
          width: 350px;
          height: 350px;
          background: var(--primary-rgb, 99, 102, 241);
          opacity: 0.02;
          border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
          filter: blur(80px);
          animation: pulse 8s ease-in-out infinite alternate;
          position: absolute;
        }
        
        @keyframes floatShape {
          0% {
            transform: translate(0, 0) rotate(0deg);
          }
          100% {
            transform: translate(40px, 40px) rotate(10deg);
          }
        }
        
        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 0.02;
          }
          100% {
            transform: scale(1.1);
            opacity: 0.04;
          }
        }
        
        /* Title animations */
        .title-animation, .subtitle-animation, .solution-title-animation, .solution-subtitle-animation, .challenge-card, .stat-col, .solution-step-card, .result-card {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .visible .title-animation, .visible .solution-title-animation {
          opacity: 1;
          transform: translateY(0);
        }
        
        .visible .subtitle-animation, .visible .solution-subtitle-animation {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 0.2s;
        }
        
        .challenge-card.visible, .stat-col.visible, .solution-step-card.visible, .result-card.visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        /* Text gradient styling */
        .text-gradient {
          background: linear-gradient(to right, #6366f1, #8b5cf6);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          -webkit-text-fill-color: transparent;
          display: inline;
        }
        
        /* Challenge section styling */
        .challenge-section h2 {
          color: var(--text-primary);
          font-weight: 800;
          letter-spacing: -0.02em;
        }
        
        .challenge-section .lead {
          color: var(--text-secondary);
          font-size: 1.25rem;
          line-height: 1.6;
        }
        
        .challenge-card {
          background: var(--card-bg);
          border: 1px solid var(--card-border);
          border-radius: 14px;
          padding: 26px;
          box-shadow: var(--card-shadow);
          backdrop-filter: blur(10px);
          border-left: 5px solid #6366f1;
          transition: all 0.4s ease;
        }
        
        .challenge-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--card-hover-shadow);
        }
        
        .challenge-card h3 {
          color: var(--text-primary);
          font-weight: 700;
        }
        
        .challenge-card p {
          color: var(--text-secondary);
        }
        
        /* Stats styling */
        .stats-row {
          margin-top: 3rem;
        }
        
        .stat-card {
          background: var(--stat-card-bg);
          border-radius: 16px;
          padding: 24px;
          box-shadow: var(--card-shadow), 0 0 15px rgba(var(--primary-rgb), 0.05);
          backdrop-filter: blur(10px);
          height: 100%;
          transition: all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
          border: 1px solid rgba(var(--primary-rgb), 0.1);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          position: relative;
          overflow: hidden;
        }
        
        .stat-card::before {
          content: '';
          position: absolute;
          top: -2px;
          left: 35%;
          right: 35%;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(var(--primary-rgb), 0.6), transparent);
          border-radius: 100%;
        }
        
        .stat-card:hover {
          transform: translateY(-8px);
          box-shadow: var(--card-hover-shadow), 0 10px 30px rgba(var(--primary-rgb), 0.1);
        }
        
        .stat-value {
          font-size: 3.5rem;
          font-weight: 800;
          color: var(--stat-value-color);
          margin-bottom: 0.5rem;
          margin-top: 0.5rem;
          position: relative;
          display: inline-block;
        }
        
        .stat-value::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 25%;
          width: 50%;
          height: 3px;
          background: linear-gradient(90deg, transparent, rgba(var(--primary-rgb), 0.4), transparent);
          border-radius: 3px;
        }
        
        .stat-description {
          font-size: 1.1rem;
          color: var(--stat-description-color);
          margin-bottom: 0;
          text-align: center;
          max-width: 90%;
          line-height: 1.4;
        }
        
        /* Solution steps styling */
        .solution-steps-container {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          justify-content: center;
        }
        
        .solution-step-card {
          display: flex;
          align-items: flex-start;
          background: var(--step-card-bg);
          border: 1px solid var(--step-card-border);
          border-radius: 16px;
          padding: 1.25rem;
          transition: all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
          position: relative;
          box-shadow: var(--card-shadow), 0 0 15px rgba(0, 0, 0, 0.03);
          backdrop-filter: blur(10px);
          overflow: hidden;
          width: calc(50% - 0.5rem);
          margin-bottom: 1rem;
        }
        
        .solution-step-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, rgba(var(--primary-rgb), 0.8) 0%, rgba(139, 92, 246, 0.8) 100%);
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        
        .solution-step-card::after {
          content: '';
          position: absolute;
          bottom: 0;
          right: 0;
          width: 40%;
          height: 30%;
          background: radial-gradient(circle at bottom right, rgba(var(--primary-rgb), 0.05), transparent 70%);
          opacity: 0;
          transition: opacity 0.5s ease;
          z-index: 0;
        }
        
        .solution-step-card:hover,
        .solution-step-card.active {
          transform: translateY(-6px) scale(1.01);
          box-shadow: var(--card-hover-shadow), 0 15px 35px rgba(var(--primary-rgb), 0.08);
        }
        
        .solution-step-card:hover::before,
        .solution-step-card.active::before {
          opacity: 1;
        }
        
        .solution-step-card:hover::after,
        .solution-step-card.active::after {
          opacity: 1;
        }
        
        .step-number {
          margin-right: 1rem;
        }
        
        .number-circle {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: white;
          border-radius: 50%;
          font-weight: 700;
          font-size: 1rem;
          transition: all 0.3s ease;
          box-shadow: 0 4px 10px rgba(99, 102, 241, 0.3), inset 0 -2px 5px rgba(0, 0, 0, 0.2), inset 0 2px 5px rgba(255, 255, 255, 0.3);
          position: relative;
          overflow: hidden;
        }
        
        .number-circle::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 50%;
          background: linear-gradient(to bottom, rgba(255, 255, 255, 0.3), transparent);
          border-radius: 50% 50% 0 0;
        }
        
        .step-content {
          flex: 1;
        }
        
        .step-title {
          font-size: 1.15rem;
          font-weight: 700;
          margin-bottom: 0.4rem;
          color: var(--text-primary);
        }
        
        .step-description {
          color: var(--text-secondary);
          margin-bottom: 0;
          line-height: 1.4;
          font-size: 0.95rem;
        }
        
        /* Result card styling */
        .result-card {
          background: var(--result-card-bg);
          border-radius: 14px;
          padding: 1.5rem;
          color: var(--result-text-color);
          position: relative;
          overflow: hidden;
          box-shadow: 0 15px 30px rgba(99, 102, 241, 0.25);
          transition: all 0.4s ease;
          margin-top: 0.5rem;
          max-width: 750px;
          margin-left: auto;
          margin-right: auto;
        }
        
        .glow-effect-1, .glow-effect-2 {
          position: absolute;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          filter: blur(40px);
        }
        
        .glow-effect-1 {
          top: -20%;
          right: -10%;
          width: 60%;
          height: 60%;
          animation: pulse 10s infinite alternate;
        }
        
        .glow-effect-2 {
          bottom: -20%;
          left: -10%;
          width: 40%;
          height: 40%;
          animation: pulse 15s infinite alternate-reverse;
        }
        
        .result-content {
          position: relative;
          z-index: 1;
        }
        
        .result-title {
          font-weight: 700;
          margin-bottom: 0.5rem;
          font-size: 1.3rem;
          color: #fff;
        }
        
        .result-description {
          font-size: 1.1rem;
          margin-bottom: 1rem;
          color: rgba(255, 255, 255, 0.9);
        }
        
        /* Responsive adjustments */
        @media (max-width: 991.98px) {
          .solution-step-card {
            width: 100%;
            padding: 1rem;
          }
          
          .number-circle {
            width: 36px;
            height: 36px;
            font-size: 0.9rem;
          }
                    
          .step-title {
            font-size: 1.1rem;
          }
          
          .result-card {
            padding: 1.25rem;
          }
          
          .result-description {
            font-size: 1rem;
            margin-bottom: 0.75rem;
          }
        }
        
        /* Восстанавливаем медиа-запрос для экранов до 767.98px */
        @media (max-width: 767.98px) {
          .challenge-section, .solution-section {
            padding: 3.5rem 0;
          }
                    
          .number-circle {
            width: 32px;
            height: 32px;
            font-size: 0.85rem;
            margin-right: 0.75rem;
          }
          
          .step-title {
            font-size: 1rem;
          }
          
          .result-card {
            padding: 1.25rem;
          }
          
          .result-title {
            font-size: 1.15rem;
            margin-bottom: 0.4rem;
          }
        }
        
        /* Дополнительные стили для маленьких экранов */
        @media (max-width: 576px) {
          .solution-step-card {
            width: 100%;
            margin-left: 0 !important;
            margin-right: 0 !important;
          }
        }
      `}</style>
    </section>
  );
} 