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
      description: "We assemble every credential, past performance doc, and certificate you need.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
          <path d="M9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.825a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3zm-8.322.12C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139z"/>
        </svg>
      )
    },
    {
      number: 2,
      title: "Gap Tracker",
      description: "Continuous scans reveal missing qualifications; our team closes them fast.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
          <path d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09z"/>
        </svg>
      )
    },
    {
      number: 3,
      title: "Opportunity Match",
      description: "AI surfaces solicitations you're truly eligible for.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
          <path d="M5 10.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"/>
          <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z"/>
          <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z"/>
        </svg>
      )
    },
    {
      number: 4,
      title: "Proposal Studio",
      description: "LLM‑powered writers craft and submit compliant bids.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
          <path d="M13 0H6a2 2 0 0 0-2 2 2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 13V4a2 2 0 0 0-2-2H5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1zM3 4a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4z"/>
        </svg>
      )
    },
    {
      number: 5,
      title: "Win‑Analytics Loop",
      description: "Post‑award debriefs retrain the models, boosting future win odds.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z"/>
        </svg>
      )
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
            {[
              { value: "95%", description: "Disqualification rate for unprepared vendors" },
              { value: "30+", description: "Average documents needed per bid" },
              { value: "5%", description: "Average win rate without support" }
            ].map((stat, index) => (
              <Col md={4} key={index} className={`mb-4 stat-col ${isVisible ? 'visible' : ''}`} style={{ animationDelay: `${0.3 + index * 0.15}s` }}>
                <div className="stat-card text-center">
                  <h3 className="stat-value">{stat.value}</h3>
                  <p className="stat-description">{stat.description}</p>
              </div>
            </Col>
            ))}
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
                      <div className="step-icon">{step.icon}</div>
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
                    href="/strategy-call" 
                    variant="white" 
                    size="lg" 
                    className="mt-3"
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
          border-radius: 14px;
          padding: 26px;
          box-shadow: var(--card-shadow);
          backdrop-filter: blur(10px);
          height: 100%;
          transition: all 0.4s ease;
          border-top: 3px solid #6366f1;
        }
        
        .stat-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--card-hover-shadow);
        }
        
        .stat-value {
          font-size: 3rem;
          font-weight: 800;
          color: var(--stat-value-color);
          margin-bottom: 0.5rem;
        }
        
        .stat-description {
          font-size: 1rem;
          color: var(--stat-description-color);
          margin-bottom: 0;
        }
        
        /* Solution steps styling */
        .solution-steps-container {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .solution-step-card {
          display: flex;
          align-items: flex-start;
          background: var(--step-card-bg);
          border: 1px solid var(--step-card-border);
          border-radius: 14px;
          padding: 1.5rem;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          box-shadow: var(--card-shadow);
          backdrop-filter: blur(10px);
        }
        
        .solution-step-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #6366f1 0%, #8b5cf6 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .solution-step-card:hover,
        .solution-step-card.active {
          transform: translateY(-5px);
          box-shadow: var(--card-hover-shadow);
        }
        
        .solution-step-card:hover::before,
        .solution-step-card.active::before {
          opacity: 1;
        }
        
        .step-number {
          margin-right: 1.25rem;
        }
        
        .number-circle {
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: white;
          border-radius: 50%;
          font-weight: 700;
          font-size: 1.25rem;
          transition: all 0.3s ease;
          box-shadow: 0 4px 10px rgba(99, 102, 241, 0.3);
        }
        
        .solution-step-card:hover .number-circle,
        .solution-step-card.active .number-circle {
          transform: scale(1.1);
          box-shadow: 0 6px 15px rgba(99, 102, 241, 0.4);
        }
        
        .step-content {
          flex: 1;
        }
        
        .step-icon {
          position: absolute;
          right: 1.5rem;
          top: 1.5rem;
          color: var(--step-icon-color);
          opacity: 0.2;
          transition: all 0.3s ease;
        }
        
        .solution-step-card:hover .step-icon,
        .solution-step-card.active .step-icon {
          opacity: 0.5;
          transform: scale(1.1) rotate(5deg);
        }
        
        .step-title {
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          color: var(--text-primary);
        }
        
        .step-description {
          color: var(--text-secondary);
          margin-bottom: 0;
          line-height: 1.5;
        }
        
        /* Result card styling */
        .result-card {
          background: var(--result-card-bg);
          border-radius: 14px;
          padding: 2.5rem;
          color: var(--result-text-color);
          position: relative;
          overflow: hidden;
          box-shadow: 0 15px 30px rgba(99, 102, 241, 0.25);
          transition: all 0.4s ease;
        }
        
        .result-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(99, 102, 241, 0.3);
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
          margin-bottom: 1rem;
          font-size: 1.5rem;
          color: #fff;
        }
        
        .result-description {
          font-size: 1.25rem;
          margin-bottom: 1.5rem;
          color: rgba(255, 255, 255, 0.9);
        }
        
        .cta-button {
          display: inline-block;
          background: white;
          color: #6366f1;
          font-weight: 600;
          padding: 0.875rem 2rem;
          border-radius: 50px;
          text-decoration: none;
          transition: all 0.3s ease;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        
        .cta-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
          background: #f8f9ff;
          color: #5457ea;
        }
        
        /* Responsive adjustments */
        @media (max-width: 991.98px) {
          .challenge-card, .stat-card, .solution-step-card {
            padding: 1.25rem;
          }
          
          .stat-value {
            font-size: 2.5rem;
          }
          
          .number-circle {
            width: 40px;
            height: 40px;
            font-size: 1.1rem;
        }
        
          .step-title {
            font-size: 1.15rem;
          }
          
          .result-card {
            padding: 2rem;
          }
          
          .result-description {
            font-size: 1.15rem;
        }
        
          .cta-button {
            padding: 0.75rem 1.75rem;
          }
        }
        
        @media (max-width: 767.98px) {
          .challenge-section, .solution-section {
            padding: 4rem 0;
          }
          
          .challenge-card, .stat-card, .solution-step-card {
            padding: 1.1rem;
        }
        
          .stat-value {
            font-size: 2.25rem;
          }
          
          .number-circle {
            width: 35px;
            height: 35px;
            font-size: 1rem;
            margin-right: 0.75rem;
          }
          
          .step-icon {
            top: 1rem;
            right: 1rem;
          }
          
          .result-card {
            padding: 1.75rem;
          }
          
          .result-title {
            font-size: 1.35rem;
        }
        
          .result-description {
            font-size: 1.1rem;
          }
          
          .cta-button {
            padding: 0.7rem 1.5rem;
          }
        }
      `}</style>
    </section>
  );
} 