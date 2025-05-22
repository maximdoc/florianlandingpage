"use client";

import { useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import SectionContainer from "../SectionContainer";
import Image from "next/image";
import content from "@/data/content.json";

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

export default function TrustSection() {
  // Get trust section data directly from content.json
  const homePageData = content.pages.find(page => page.id === 'home');
  const trustSection = homePageData.sections.find(section => section.id === 'trust');

  // Refs for animation tracking
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const featuredRef = useRef(null);
  const partnersRef = useRef(null);
  const certificationsRef = useRef(null);

  // Check if elements are visible
  const isSectionVisible = useIsVisible(sectionRef);
  const isHeaderVisible = useIsVisible(headerRef);
  const isFeaturedVisible = useIsVisible(featuredRef);
  const isPartnersVisible = useIsVisible(partnersRef);
  const isCertificationsVisible = useIsVisible(certificationsRef);

  return (
    <SectionContainer
      id="trust"
      className="trust-section position-relative"
      backgroundVariant="light"
      ref={sectionRef}
    >
      {/* Decorative elements */}
      <div className="position-absolute decorative-shape top-right"></div>
      <div className="position-absolute decorative-shape bottom-left"></div>

      <Container
        className="position-relative trust-container"
        style={{ zIndex: 2 }}
      >
        <Row className="text-center mb-md-5 mb-4" ref={headerRef}>
          <Col lg={8} className="mx-auto">
            <h2
              className={`display-5 mb-3 transition-all duration-1000 ${
                isHeaderVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              dangerouslySetInnerHTML={{ __html: trustSection.title }}
            />
            <p className={`lead mb-0 transition-all duration-1000 delay-100 ${
                isHeaderVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}>
              {trustSection.subtitle}
            </p>
          </Col>
        </Row>

        {/* Featured In Section */}
        {trustSection.featuredIn && (
          <Row
            className="mb-md-5 mb-4 text-center featured-section"
            ref={featuredRef}
          >
            <Col lg={12} className="mb-md-3 mb-2">
              <h3 className={`h4 mb-3 transition-all duration-1000 ${
                isFeaturedVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}>
                <span className="section-label">
                  {trustSection.featuredIn.title}
                </span>
                <div className="heading-underline"></div>
              </h3>
              <div className={`featured-logos-container transition-all duration-1000 delay-200 ${
                isFeaturedVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}>
                {trustSection.featuredIn.logos.map((logo, index) => (
                  <a
                    key={logo.id}
                    href={logo.url}
                    className="featured-logo"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={logo.name}
                    style={{ 
                      transitionDelay: `${150 + index * 50}ms`,
                      transition: "all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)"
                    }}
                  >
                    <div className="logo-wrapper">
                      <div className="logo-placeholder">
                        {!logo.image && logo.name}
                        {/* Use actual images when available, fallback to text */}
                        {logo.image && (
                          <Image
                            src={logo.image}
                            alt={logo.name}
                            width={140}
                            height={50}
                            className="logo-image"
                            style={{ width: "auto", height: "auto" }}
                          />
                        )}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </Col>
          </Row>
        )}

        {/* Partners Section */}
        {trustSection.partners && (
          <Row
            className="mb-md-5 mb-4 text-center partners-section"
            ref={partnersRef}
          >
            <Col lg={12} className="mb-md-3 mb-2">
              <h3 className={`h4 mb-3 transition-all duration-1000 ${
                isPartnersVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}>
                <span className="section-label">
                  {trustSection.partners.title}
                </span>
                <div className="heading-underline"></div>
              </h3>
              <div className={`partners-logos-container transition-all duration-1000 delay-200 ${
                isPartnersVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}>
                {trustSection.partners.logos.map((logo, index) => (
                  <a
                    key={logo.id}
                    href={logo.url}
                    className="partner-logo"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={logo.name}
                    style={{ 
                      transitionDelay: `${150 + index * 50}ms`,
                      transition: "all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)"
                    }}
                  >
                    <div className="logo-wrapper">
                      <div className="logo-placeholder">
                        {!logo.image && logo.name}
                        {/* Use actual images when available, fallback to text */}
                        {logo.image && (
                          <Image
                            src={logo.image}
                            alt={logo.name}
                            width={120}
                            height={60}
                            className="logo-image"
                            style={{ width: "auto", height: "auto" }}
                          />
                        )}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </Col>
          </Row>
        )}

        {/* Certifications Section */}
        {trustSection.certifications && (
          <Row
            className="text-center certifications-section"
            ref={certificationsRef}
          >
            <Col lg={12} className="mb-md-3 mb-2">
              <h3 className={`h4 mb-3 transition-all duration-1000 ${
                isCertificationsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}>
                <span className="section-label">
                  {trustSection.certifications.title}
                </span>
                <div className="heading-underline"></div>
              </h3>
              <div className={`certifications-container transition-all duration-1000 delay-200 ${
                isCertificationsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}>
                {trustSection.certifications.badges.map((badge, index) => (
                  <div 
                    key={badge.id} 
                    className="certification-badge"
                    style={{ 
                      transitionDelay: `${150 + index * 100}ms`,
                      transition: "all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)"
                    }}
                  >
                    <div className="badge-wrapper">
                      <div className="badge-placeholder">
                        {/* Show icon or first letter of the badge name as fallback */}
                        {!badge.image && badge.name.charAt(0)}
                        {/* Use actual images when available */}
                        {badge.image && (
                          <Image
                            src={badge.image}
                            alt={badge.name}
                            width={80}
                            height={80}
                            className="badge-image"
                            style={{ width: "auto", height: "auto" }}
                          />
                        )}
                      </div>
                    </div>
                    <p className="badge-name">{badge.name}</p>
                    <p className="badge-description">{badge.description}</p>
                  </div>
                ))}
              </div>
            </Col>
          </Row>
        )}
      </Container>

      <style jsx global>{`
        /* Core variables */
        :root {
          --trust-section-bg: #f8fafc;
          --logo-bg: #ffffff;
          --logo-border: rgba(0, 0, 0, 0.08);
          --logo-hover-shadow: rgba(0, 0, 0, 0.1);
          --badge-bg: #ffffff;
          --badge-border: rgba(0, 0, 0, 0.08);
          --badge-hover-shadow: rgba(99, 102, 241, 0.15);
          --text-primary: #0f172a;
          --text-secondary: #64748b;
          --card-bg-rgb: 255, 255, 255;
          --card-border-rgb: 0, 0, 0;
          --section-highlight: rgba(99, 102, 241, 0.03);
          --badge-glow: rgba(99, 102, 241, 0.2);
        }

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

        .delay-300 {
          transition-delay: 300ms;
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

        /* Section styling with improved responsiveness */
        .trust-section {
          position: relative;
          overflow: hidden;
          padding-top: 5rem;
          padding-bottom: 3rem;
          background-color: #f8fafc;
        }

        @media (max-width: 991.98px) {
          .trust-section {
            padding-top: 4rem;
            padding-bottom: 2.5rem;
          }
        }

        @media (max-width: 767.98px) {
          .trust-section {
            padding-top: 3.5rem;
            padding-bottom: 2rem;
          }
        }

        /* Decorative shapes */
        .decorative-shape {
          position: absolute;
          z-index: 0;
          filter: blur(80px);
          opacity: 0.03;
        }

        .top-right {
          top: -10%;
          right: -10%;
          width: 40%;
          height: 40%;
          background: rgba(99, 102, 241, 0.5);
          border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
          animation: floatMovement 25s infinite alternate ease-in-out;
        }

        .bottom-left {
          bottom: -10%;
          left: -10%;
          width: 35%;
          height: 35%;
          background: rgba(99, 102, 241, 0.5);
          border-radius: 50% 50% 30% 70% / 50% 70% 30% 50%;
          animation: floatMovement 20s infinite alternate-reverse ease-in-out;
        }

        @keyframes floatMovement {
          0% {
            transform: translate(0, 0) rotate(0deg);
          }
          100% {
            transform: translate(40px, 40px) rotate(10deg);
          }
        }

        /* Featured Logos styling with improved spacing */
        .featured-logos-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          gap: 1.5rem;
          margin-top: 1.5rem;
          position: relative;
          z-index: 1;
        }

        .featured-logo {
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .featured-logo:hover {
          transform: translateY(-5px);
        }

        /* Logo placeholder for development */
        .logo-placeholder {
          color: var(--text-secondary);
          font-weight: 600;
          text-align: center;
          font-size: 0.9rem;
        }

        .logo-image {
          max-width: 100%;
          height: auto;
          object-fit: contain;
        }

        /* Partners logos styling with improved spacing */
        .partners-logos-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          gap: 1.25rem;
          margin-top: 1.5rem;
          position: relative;
          z-index: 1;
        }

        .partner-logo {
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .partner-logo:hover {
          transform: translateY(-5px);
        }

        .partner-logo .logo-wrapper {
          min-height: 70px;
          min-width: 160px;
        }

        /* Certifications styling with improved responsiveness */
        .certifications-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 1.5rem;
          width: 100%;
          max-width: 900px;
          margin: 1.5rem auto 0;
        }

        .certification-badge {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 1rem 0.75rem;
          width: 220px;
          transition: all 0.3s ease;
          background-color: transparent;
          border-radius: 12px;
          border: none;
        }

        .certification-badge:hover {
          transform: translateY(-5px);
        }

        /* Badge wrapper styling */
        .badge-wrapper {
          background-color: var(--badge-bg);
          border: 1px solid var(--badge-border);
          border-radius: 50%;
          width: 90px;
          height: 90px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 0.75rem;
          transition: all 0.3s ease;
          box-shadow: none;
          position: relative;
          z-index: 1;
        }

        .badge-wrapper::before {
          content: "";
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.2), transparent);
          border-radius: 50%;
          z-index: -1;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .certification-badge:hover .badge-wrapper {
          box-shadow: none;
        }

        .certification-badge:hover .badge-wrapper::before {
          opacity: 1;
        }

        /* Ensure section labels are visible */
        .section-label {
          display: inline-block;
          position: relative;
          font-weight: 600;
          color: var(--text-primary);
          letter-spacing: 0.5px;
          text-transform: uppercase;
          font-size: 1rem;
        }

        .heading-underline::after {
          background: linear-gradient(
            90deg,
            transparent,
            rgba(99, 102, 241, 0.3),
            transparent
          );
        }

        /* Responsive adjustments */
        @media (max-width: 991.98px) {
          .featured-logos-container,
          .partners-logos-container {
            gap: 1rem;
            margin-top: 1.25rem;
          }

          .logo-wrapper {
            width: 160px;
            height: 70px;
            padding: 0.875rem 1rem;
          }

          .certification-badge {
            width: 180px;
            padding: 0.75rem 0.5rem;
          }
          
          .certifications-container {
            gap: 1.25rem;
            margin-top: 1.25rem;
          }
        }

        @media (max-width: 767.98px) {
          .featured-logos-container,
          .partners-logos-container {
            gap: 0.75rem;
            margin-top: 1rem;
          }

          .logo-wrapper {
            width: 140px;
            height: 60px;
            padding: 0.75rem 0.875rem;
          }

          .certification-badge {
            width: 160px;
            padding: 0.5rem 0.25rem;
          }
          
          .certifications-container {
            gap: 1rem;
            margin-top: 1rem;
          }
          
          .heading-underline {
            margin: 0.5rem auto 1rem;
          }
        }

        @media (max-width: 575.98px) {
          .logo-wrapper {
            width: 130px;
            height: 55px;
            padding: 0.625rem 0.75rem;
          }

          .certification-badge {
            width: 140px;
          }
          
          .heading-underline {
            width: 50px;
            margin: 0.5rem auto 0.75rem;
          }
        }

        /* Section highlight backgrounds with reduced padding */
        .featured-section,
        .partners-section,
        .certifications-section {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          background-color: transparent;
          box-shadow: none;
        }

        /* Section heading styling */
        .heading-underline {
          width: 60px;
          height: 3px;
          margin: 0.5rem auto 1.5rem;
          background: linear-gradient(
            to right,
            rgba(99, 102, 241, 0.8),
            rgba(139, 92, 246, 0.8)
          );
          border-radius: 3px;
          position: relative;
          overflow: hidden;
        }

        .heading-underline::after {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.4),
            transparent
          );
          animation: shimmer 3s infinite;
        }

        @keyframes shimmer {
          0% {
            left: -100%;
          }
          100% {
            left: 100%;
          }
        }

        /* Enhanced logo wrapper styling */
        .logo-wrapper {
          background-color: transparent;
          border: 1px solid var(--logo-border);
          border-radius: 12px;
          padding: 1rem 1.25rem;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 180px;
          height: 80px;
          box-shadow: none;
          backdrop-filter: none;
          margin: 0 auto;
        }

        .logo-wrapper:hover {
          box-shadow: none;
          transform: translateY(-5px);
          border-color: rgba(99, 102, 241, 0.3);
        }

        /* Update section background highlight for better visibility in light theme */
        .featured-section::before,
        .partners-section::before,
        .certifications-section::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(
            circle at center,
            var(--section-highlight) 0%,
            transparent 70%
          );
          z-index: 0;
          display: block;
        }

        /* Badge placeholder for development */
        .badge-placeholder {
          width: 60px;
          height: 60px;
          background: rgba(99, 102, 241, 0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #6366f1;
          font-weight: 700;
          font-size: 1.5rem;
        }

        .badge-image {
          border-radius: 50%;
          object-fit: cover;
        }

        .badge-name {
          font-weight: 600;
          color: var(--text-primary);
          font-size: 0.95rem;
          margin-bottom: 0.5rem;
          text-align: center;
        }

        .badge-description {
          color: var(--text-secondary);
          font-size: 0.85rem;
          margin-bottom: 0;
          text-align: center;
          line-height: 1.4;
        }

        .certification-badge {
          box-shadow: none;
        }

        .badge-placeholder {
          box-shadow: inset 0 0 0 1px rgba(99, 102, 241, 0.2);
        }

        /* Custom container styles for better responsiveness */
        .trust-container {
          width: 100%;
          padding-right: var(--container-padding, 15px);
          padding-left: var(--container-padding, 15px);
          margin-right: auto;
          margin-left: auto;
        }

        @media (max-width: 767.98px) {
          .trust-container {
            --container-padding: 12px;
          }
          
          h3.h4 {
            font-size: 1.1rem;
            margin-top: 1rem;
          }

          .section-label {
            font-size: 0.9rem;
          }

          .badge-wrapper {
            width: 80px;
            height: 80px;
            margin-bottom: 0.5rem;
          }
        }

        @media (max-width: 575.98px) {
          .trust-container {
            --container-padding: 10px;
          }
          
          h3.h4 {
            font-size: 1rem;
            margin-top: 0.75rem;
          }
          
          .badge-placeholder {
            width: 45px;
            height: 45px;
            font-size: 1.25rem;
          }

          .badge-name {
            font-size: 0.85rem;
            margin-bottom: 0.25rem;
          }

          .badge-description {
            font-size: 0.75rem;
          }

          .badge-wrapper {
            width: 70px;
            height: 70px;
            margin-bottom: 0.375rem;
          }
        }
      `}</style>
    </SectionContainer>
  );
}
