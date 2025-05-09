"use client";

import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Button from "../ui/Button";
import SectionContainer from '../SectionContainer';
import Icon from '../ui/Icon';
import { getSectionById } from '@/utils/contentUtils';

export default function FeaturesSection() {
  const [hoveredFeature, setHoveredFeature] = useState(null);
  
  // Получаем данные секции из JSON-файла
  const featuresSection = getSectionById('home', 'features');

  // Если данные секции не найдены, не отображаем компонент
  if (!featuresSection) {
    return null;
  }

  return (
    <SectionContainer 
      id="features"
      className="features-section py-8 position-relative overflow-hidden" 
      backgroundVariant={featuresSection.backgroundVariant || "light"}
    >
      {/* Decorative elements */}
      <div className="position-absolute decorative-blob blob-1"></div>
      <div className="position-absolute decorative-blob blob-2"></div>

      <Container className="position-relative" style={{ zIndex: 2 }}>
        <Row className="text-center mb-4">
          <Col lg={8} className="mx-auto">
            <h2 className="display-5 mb-3 fade-in" dangerouslySetInnerHTML={{ __html: featuresSection.title }} />
            <p className="lead text-body-secondary mb-4">
              {featuresSection.subtitle}
            </p>
          </Col>
        </Row>

        <Row className="features-grid g-3 mb-5 mx-0">
          {featuresSection.tiles.map((feature, index) => (
            <Col 
              lg={feature.id === 7 ? 12 : 6} 
              key={feature.id} 
              className={`mb-3 ${feature.id === 7 ? "text-center" : ""}`}
              style={{ padding: "0 0.75rem" }}
            >
              <div
                className={`feature-card ${
                  hoveredFeature === feature.id ? "active" : ""
                } ${
                  feature.id === 7
                    ? "feature-card-center mx-auto"
                    : index % 2 === 0
                    ? "feature-card-left"
                    : "feature-card-right"
                }`}
                onMouseEnter={() => setHoveredFeature(feature.id)}
                onMouseLeave={() => setHoveredFeature(null)}
                style={feature.id === 7 ? { maxWidth: "100%" } : {}}
              >
                <div className="feature-card-inner">
                  <div
                    className={`feature-dot-pattern ${
                      index % 2 === 0 ? "pattern-right" : "pattern-left"
                    }`}
                  ></div>

                  {index % 2 === 0 ? (
                    <>
                      <div className="feature-icon-container">
                        <div className="feature-icon-wrapper">
                          <Icon name={feature.icon} />
                        </div>
                      </div>
                      <div className="feature-content">
                        <h3 className="feature-title">{feature.title}</h3>
                        <p className="feature-description">
                          {feature.description}
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="feature-content order-2 order-md-1">
                        <h3 className="feature-title">{feature.title}</h3>
                        <p className="feature-description">
                          {feature.description}
                        </p>
                      </div>
                      <div className="feature-icon-container order-1 order-md-2">
                        <div className="feature-icon-wrapper">
                          <Icon name={feature.icon} />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </Col>
          ))}
        </Row>

        <Row className="mx-0">
          <Col
            lg={10}
            xl={7}
            className="mx-auto text-center slide-up"
            style={{ animationDelay: "0.3s", padding: "0 0.75rem" }}
          >
            <div className="cta-section w-100">
              <div className="cta-glow"></div>
              <div className="cta-content">
                <h3 dangerouslySetInnerHTML={{ __html: featuresSection.ctaSection.title }} />
                <Button href={featuresSection.ctaSection.ctaButton.href} variant="white">
                  {featuresSection.ctaSection.ctaButton.text}
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      <style jsx global>{`
        /* Variables for theme compatibility */
        :root {
          --feature-card-bg: rgba(255, 255, 255, 0.02);
          --feature-card-border: rgba(255, 255, 255, 0.08);
          --feature-card-hover-bg: rgba(255, 255, 255, 0.05);
          --feature-icon-bg: rgba(67, 97, 238, 0.1);
          --feature-icon-color: var(--primary);
          --feature-title-color: rgba(255, 255, 255, 0.95);
          --feature-description-color: rgba(255, 255, 255, 0.7);
          --feature-dot-color: rgba(255, 255, 255, 0.15);
          --cta-bg: var(--primary);
          --cta-text: #ffffff;
          --cta-button-bg: #ffffff;
          --cta-button-text: var(--primary);
        }

        [data-bs-theme="light"] {
          --feature-card-bg: rgba(255, 255, 255, 1);
          --feature-card-border: rgba(0, 0, 0, 0.08);
          --feature-card-hover-bg: rgba(255, 255, 255, 1);
          --feature-icon-bg: rgba(67, 97, 238, 0.08);
          --feature-icon-color: var(--primary);
          --feature-title-color: #0f172a;
          --feature-description-color: #4b5563;
          --feature-dot-color: rgba(67, 97, 238, 0.15);
          --cta-bg: var(--primary);
          --cta-text: #ffffff;
          --cta-button-bg: #ffffff;
          --cta-button-text: var(--primary);
        }

        /* Section styling */
        .features-section {
          position: relative;
          background: var(--dark-bg, #111827);
          padding: 5rem 0;
        }

        [data-bs-theme="light"] .features-section {
          background: #f8fafc;
        }

        .decorative-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          z-index: 0;
          background: var(--primary-light);
          opacity: 0.03;
        }

        .blob-1 {
          top: 10%;
          right: -5%;
          width: 500px;
          height: 500px;
          animation: float 15s ease-in-out infinite alternate;
        }

        .blob-2 {
          bottom: 5%;
          left: -5%;
          width: 400px;
          height: 400px;
          animation: float 12s ease-in-out infinite alternate-reverse;
        }

        @keyframes float {
          0% {
            transform: translate(0, 0) rotate(0deg);
          }
          100% {
            transform: translate(30px, 30px) rotate(10deg);
          }
        }

        /* Feature card styling */
        .feature-card {
          background: var(--feature-card-bg);
          border: 1px solid var(--feature-card-border);
          border-radius: 12px;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          height: 100%;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
        }

        .feature-card:hover,
        .feature-card.active {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
          border-color: rgba(var(--primary-rgb), 0.3);
        }

        .feature-card-inner {
          padding: 2rem;
          display: flex;
          align-items: center;
          position: relative;
          z-index: 1;
        }

        .feature-dot-pattern {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          width: 40%;
          z-index: 0;
          opacity: 0.5;
        }

        .pattern-right {
          right: 0;
          background-image: radial-gradient(
            var(--feature-dot-color) 1px,
            transparent 0
          );
          background-size: 12px 12px;
        }

        .pattern-left {
          left: 0;
          right: auto;
          background-image: radial-gradient(
            var(--feature-dot-color) 1px,
            transparent 0
          );
          background-size: 12px 12px;
        }

        .feature-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(
            90deg,
            var(--primary) 0%,
            var(--primary-light) 100%
          );
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 2;
        }

        .feature-card:hover::before,
        .feature-card.active::before {
          opacity: 1;
        }

        .feature-icon-container {
          flex: 0 0 auto;
          margin-right: 1.5rem;
        }

        .feature-card-right .feature-icon-container {
          margin-right: 0;
          margin-left: 1.5rem;
        }

        .feature-icon-wrapper {
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          border-radius: 16px;
          color: white;
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
          /* 3D effect with enhanced shadows */
          box-shadow: 
            0 5px 15px rgba(99, 102, 241, 0.4),
            0 0 0 1px rgba(255, 255, 255, 0.1),
            inset 0 -2px 5px rgba(0, 0, 0, 0.2),
            inset 0 2px 5px rgba(255, 255, 255, 0.3);
        }
        
        /* Glowing effect */
        .feature-icon-wrapper::before {
          content: '';
          position: absolute;
          inset: -3px;
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(139, 92, 246, 0.1));
          border-radius: 18px;
          z-index: -1;
          filter: blur(8px);
          opacity: 0.8;
          transition: opacity 0.3s ease;
        }
        
        /* Upper highlight for 3D effect */
        .feature-icon-wrapper::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 50%;
          background: linear-gradient(to bottom, rgba(255, 255, 255, 0.5), transparent);
          border-radius: 16px 16px 0 0;
          opacity: 0.7;
        }
        
        .feature-icon-wrapper svg {
          position: relative;
          z-index: 1;
        }
        
        .feature-card:hover .feature-icon-wrapper,
        .feature-card.active .feature-icon-wrapper {
          transform: translateY(-5px);
          box-shadow: 
            0 8px 20px rgba(99, 102, 241, 0.5),
            0 0 0 1px rgba(255, 255, 255, 0.15),
            inset 0 -2px 5px rgba(0, 0, 0, 0.2),
            inset 0 2px 5px rgba(255, 255, 255, 0.4);
        }
        
        .feature-card:hover .feature-icon-wrapper::before,
        .feature-card.active .feature-icon-wrapper::before {
          opacity: 1;
          filter: blur(10px);
        }

        .feature-content {
          flex: 1;
          position: relative;
          z-index: 2;
        }

        .feature-title {
          font-size: 1.2rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          color: var(--feature-title-color);
        }

        .feature-description {
          font-size: 0.9rem;
          color: var(--feature-description-color);
          margin-bottom: 0;
          line-height: 1.5;
        }

        /* CTA section styling */
        .cta-section {
          background: var(--cta-bg);
          border-radius: 16px;
          padding: 2.5rem 2rem;
          text-align: center;
          color: var(--cta-text);
          position: relative;
          overflow: hidden;
          box-shadow: 0 15px 30px rgba(var(--primary-rgb), 0.2);
        }

        .cta-glow {
          position: absolute;
          width: 200px;
          height: 200px;
          background: rgba(255, 255, 255, 0.1);
          filter: blur(60px);
          border-radius: 50%;
          top: -100px;
          right: -100px;
        }

        .cta-content {
          position: relative;
          z-index: 2;
        }

        .cta-section h3 {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          color: #ffffff !important;
        }

        .cta-section .text-gradient {
          background: linear-gradient(90deg, #ffffff, #f0f0f0);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-fill-color: transparent;
        }

        [data-bs-theme="light"] .cta-section {
          color: #ffffff !important;
        }

        [data-bs-theme="light"] .cta-section h3 {
          color: #ffffff !important;
        }

        /* Responsive adjustments */
        @media (max-width: 991.98px) {
          .feature-card-inner {
            padding: 1.75rem;
          }
          
          .feature-icon-wrapper {
            width: 48px;
            height: 48px;
          }
          
          .features-grid {
            max-width: 100%;
          }
          
          /* Убираем лишние отступы */
          .features-grid > [class*="col-"] {
            padding-left: 0.5rem;
            padding-right: 0.5rem;
          }
          
          /* Увеличиваем ширину карточек */
          .feature-card {
            width: 100%;
          }
        }

        @media (max-width: 767.98px) {
          .feature-card-inner {
            flex-direction: column;
            text-align: center;
            padding: 2rem 1.5rem;
          }
          
          .feature-icon-container {
            margin: 0 0 1.5rem 0;
          }
          
          .feature-card-right .feature-icon-container {
            margin: 0 0 1.5rem 0;
          }
          
          .feature-dot-pattern {
            width: 30%;
            height: 30%;
            top: 10px;
          }
          
          .cta-section {
            padding: 2rem 1.5rem;
          }
          
          .cta-section h3 {
            font-size: 1.3rem;
          }
          
          /* Для карточек на мобильных устройствах */
          .feature-card {
            max-width: 100% !important;
            width: 100% !important;
            margin-left: 0 !important;
            margin-right: 0 !important;
          }
          
          /* Убираем отступы у колонок для полной ширины */
          .features-grid > [class*="col-"] {
            padding-left: 0.5rem;
            padding-right: 0.5rem;
          }
        }

        .feature-card-center .feature-card-inner {
          justify-content: center;
        }

        .feature-card-center .feature-icon-container {
          margin-right: 1.5rem;
        }

        @media (max-width: 834px) {
          .feature-card-center {
            max-width: 100% !important;
            width: 100% !important;
            margin-left: 0 !important;
            margin-right: 0 !important;
          }
          
          /* Дополнительная настройка для всех карточек */
          .feature-card {
            width: 100%;
            max-width: 100%;
            margin-left: 0;
            margin-right: 0;
          }
        }

        /* Стили для 7-го элемента на десктопе */
        @media (min-width: 835px) {
          .feature-card-center {
            max-width: 600px !important;
          }
        }
      `}</style>
    </SectionContainer>
  );
}
