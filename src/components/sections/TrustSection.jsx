"use client";

import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import SectionContainer from "../SectionContainer";
import Image from "next/image";
import { getSectionById } from "@/utils/contentUtils";

export default function TrustSection() {
  const [trustSection, setTrustSection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    async function loadTrustSection() {
      try {
        setLoading(true);
        const sectionData = await getSectionById("home", "trust");
        setTrustSection(sectionData);
      } catch (error) {
        console.error("Error loading trust section:", error);
      } finally {
        setLoading(false);
      }
    }

    loadTrustSection();
  }, []);

  // Add intersection observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.querySelector(".trust-section");
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  if (loading || !trustSection) {
    return (
      <SectionContainer
        id="trust"
        className="trust-section py-8 position-relative"
        backgroundVariant="light"
      >
        <Container>
          {/* Skeleton loader */}
          <Row className="text-center mb-5">
            <Col lg={8} className="mx-auto">
              <div className="skeleton-title mb-3"></div>
              <div className="skeleton-subtitle"></div>
            </Col>
          </Row>

          {/* Featured In skeleton */}
          <Row className="mb-5 text-center">
            <Col lg={12} className="mb-4">
              <div className="skeleton-section-title mb-4"></div>
              <div className="d-flex justify-content-center flex-wrap gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="skeleton-logo"></div>
                ))}
              </div>
            </Col>
          </Row>

          {/* Partners skeleton */}
          <Row className="mb-5 text-center">
            <Col lg={12} className="mb-4">
              <div className="skeleton-section-title mb-4"></div>
              <div className="d-flex justify-content-center flex-wrap gap-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="skeleton-logo"></div>
                ))}
              </div>
            </Col>
          </Row>

          {/* Certifications skeleton */}
          <Row>
            <Col lg={12} className="text-center mb-4">
              <div className="skeleton-section-title mb-4"></div>
              <div className="d-flex justify-content-center flex-wrap gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="skeleton-badge"></div>
                ))}
              </div>
            </Col>
          </Row>
        </Container>

        <style jsx global>{`
          /* Base skeleton animation */
          @keyframes skeleton-loading {
            0% {
              background-position: -200px 0;
            }
            100% {
              background-position: calc(200px + 100%) 0;
            }
          }

          .skeleton-title,
          .skeleton-subtitle,
          .skeleton-section-title,
          .skeleton-logo,
          .skeleton-badge {
            background: linear-gradient(
              90deg,
              rgba(0, 0, 0, 0.06) 25%,
              rgba(0, 0, 0, 0.12) 50%,
              rgba(0, 0, 0, 0.06) 75%
            );
            background-size: 200px 100%;
            animation: skeleton-loading 1.5s infinite linear;
            border-radius: 4px;
            display: block;
          }

          [data-bs-theme="dark"] .skeleton-title,
          [data-bs-theme="dark"] .skeleton-subtitle,
          [data-bs-theme="dark"] .skeleton-section-title,
          [data-bs-theme="dark"] .skeleton-logo,
          [data-bs-theme="dark"] .skeleton-badge {
            background: linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.05) 25%,
              rgba(255, 255, 255, 0.1) 50%,
              rgba(255, 255, 255, 0.05) 75%
            );
            background-size: 200px 100%;
          }

          .skeleton-title {
            height: 48px;
            width: 60%;
            margin: 0 auto;
          }

          .skeleton-subtitle {
            height: 24px;
            width: 80%;
            margin: 0 auto;
          }

          .skeleton-section-title {
            height: 28px;
            width: 200px;
            margin: 0 auto;
          }

          .skeleton-logo {
            height: 60px;
            width: 160px;
            border-radius: 8px;
          }

          .skeleton-badge {
            height: 100px;
            width: 100px;
            border-radius: 50%;
          }
        `}</style>
      </SectionContainer>
    );
  }

  return (
    <SectionContainer
      id="trust"
      className="trust-section py-5 px-3 position-relative"
      backgroundVariant={trustSection.backgroundVariant || "light"}
    >
      {/* Decorative elements */}
      <div className="position-absolute decorative-shape top-right"></div>
      <div className="position-absolute decorative-shape bottom-left"></div>

      <Container
        className="position-relative trust-container"
        style={{ zIndex: 2 }}
      >
        <Row className={`text-center mb-4 ${isVisible ? "fade-in" : ""}`}>
          <Col lg={8} className="mx-auto">
            <h2
              className="display-5 mb-3"
              dangerouslySetInnerHTML={{ __html: trustSection.title }}
            />
            <p className="lead mb-0">{trustSection.subtitle}</p>
          </Col>
        </Row>

        {/* Featured In Section */}
        {trustSection.featuredIn && (
          <Row
            className={`mb-4 pb-3 text-center featured-section ${
              isVisible ? "fade-in" : ""
            }`}
            style={{ animationDelay: "0.2s" }}
          >
            <Col lg={12} className="mb-4">
              <h3 className="h4 mb-3">
                <span className="section-label">
                  {trustSection.featuredIn.title}
                </span>
                <div className="heading-underline"></div>
              </h3>
              <div className="featured-logos-container">
                {trustSection.featuredIn.logos.map((logo) => (
                  <a
                    key={logo.id}
                    href={logo.url}
                    className="featured-logo"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={logo.name}
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
            className={`mb-4 pb-3 text-center partners-section ${
              isVisible ? "fade-in" : ""
            }`}
            style={{ animationDelay: "0.4s" }}
          >
            <Col lg={12} className="mb-4">
              <h3 className="h4 mb-3">
                <span className="section-label">
                  {trustSection.partners.title}
                </span>
                <div className="heading-underline"></div>
              </h3>
              <div className="partners-logos-container">
                {trustSection.partners.logos.map((logo) => (
                  <a
                    key={logo.id}
                    href={logo.url}
                    className="partner-logo"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={logo.name}
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
            className={`text-center mb-4 certifications-section ${
              isVisible ? "fade-in" : ""
            }`}
            style={{ animationDelay: "0.6s" }}
          >
            <Col lg={12} className="mb-4">
              <h3 className="h4 mb-3">
                <span className="section-label">
                  {trustSection.certifications.title}
                </span>
                <div className="heading-underline"></div>
              </h3>
              <div className="certifications-container">
                {trustSection.certifications.badges.map((badge) => (
                  <div key={badge.id} className="certification-badge">
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
        /* Core variables for theme compatibility */
        :root {
          --trust-section-bg: var(--section-bg-light);
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
          --section-padding: 3rem;
        }

        [data-bs-theme="dark"] {
          --trust-section-bg: var(--section-bg-dark);
          --logo-bg: rgba(255, 255, 255, 0.02);
          --logo-border: rgba(255, 255, 255, 0.08);
          --logo-hover-shadow: rgba(255, 255, 255, 0.05);
          --badge-bg: rgba(255, 255, 255, 0.03);
          --badge-border: rgba(255, 255, 255, 0.08);
          --badge-hover-shadow: rgba(99, 102, 241, 0.15);
          --text-primary: #ffffff;
          --text-secondary: rgba(255, 255, 255, 0.7);
          --card-bg-rgb: 30, 41, 59;
          --card-border-rgb: 255, 255, 255;
          --section-highlight: rgba(99, 102, 241, 0.05);
          --badge-glow: rgba(99, 102, 241, 0.3);
          --section-padding: 3rem;
        }

        /* Section styling with improved responsiveness */
        .trust-section {
          position: relative;
          overflow: hidden;
          padding: var(--section-padding) 0;
        }

        @media (max-width: 991.98px) {
          .trust-section {
            --section-padding: 2rem;
          }
        }

        @media (max-width: 767.98px) {
          .trust-section {
            --section-padding: 1.5rem;
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
          background: var(--primary-rgb, 99, 102, 241);
          border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
          animation: floatMovement 25s infinite alternate ease-in-out;
        }

        .bottom-left {
          bottom: -10%;
          left: -10%;
          width: 35%;
          height: 35%;
          background: var(--primary-rgb, 99, 102, 241);
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

        /* Animation effects */
        .fade-in {
          opacity: 0;
          transform: translateY(20px);
          animation: fadeInUp 0.6s ease-out forwards;
        }

        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Featured Logos styling with improved spacing */
        .featured-logos-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          gap: 1.5rem;
          margin-top: 1rem;
          position: relative;
          z-index: 1;
          padding: 0.5rem 0;
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
          margin-top: 1rem;
          position: relative;
          z-index: 1;
          padding: 0.5rem 0;
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
          margin: 1rem auto;
        }

        .certification-badge {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 1.25rem 1rem;
          width: 220px;
          transition: all 0.3s ease;
          background-color: transparent;
          border-radius: 12px;
          border: none;
        }

        [data-bs-theme="light"] .certification-badge {
          box-shadow: none;
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
          background: linear-gradient(135deg, var(--badge-glow), transparent);
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

        /* Ensure section labels are visible in both themes */
        .section-label {
          display: inline-block;
          position: relative;
          font-weight: 600;
          color: var(--text-primary);
          letter-spacing: 0.5px;
          text-transform: uppercase;
          font-size: 1rem;
        }

        [data-bs-theme="light"] .heading-underline::after {
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
          }

          .logo-wrapper {
            width: 160px;
            height: 70px;
            padding: 0.875rem 1rem;
          }

          .certification-badge {
            width: 180px;
          }
        }

        @media (max-width: 767.98px) {
          .featured-logos-container,
          .partners-logos-container {
            gap: 0.75rem;
          }

          .logo-wrapper {
            width: 140px;
            height: 60px;
            padding: 0.75rem 0.875rem;
          }

          .certification-badge {
            width: 160px;
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
        }

        /* Section highlight backgrounds with reduced padding */
        .featured-section,
        .partners-section,
        .certifications-section {
          position: relative;
          padding: 1.5rem 1.5rem;
          border-radius: 12px;
          overflow: hidden;
          background-color: transparent;
          box-shadow: none;
        }

        @media (max-width: 767.98px) {
          .featured-section,
          .partners-section,
          .certifications-section {
            padding: 1rem 1rem;
          }
        }

        /* Section heading styling */
        .heading-underline {
          width: 60px;
          height: 3px;
          margin: 0.5rem auto 1.5rem;
          background: linear-gradient(
            to right,
            rgba(var(--primary-rgb), 0.8),
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
          padding: 1.25rem 1.5rem;
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
          border-color: rgba(var(--primary-rgb), 0.3);
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

        /* Adjust heading underline for better visibility in light theme */
        .heading-underline {
          width: 60px;
          height: 3px;
          margin: 0.5rem auto 1.5rem;
          background: linear-gradient(
            to right,
            rgba(var(--primary-rgb), 0.8),
            rgba(139, 92, 246, 0.8)
          );
          border-radius: 3px;
          position: relative;
          overflow: hidden;
        }

        /* Enhance certification card styling for light theme */
        .certification-badge {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 1.25rem 1rem;
          width: 220px;
          transition: all 0.3s ease;
          background-color: transparent;
          border-radius: 12px;
          border: none;
        }

        [data-bs-theme="light"] .certification-badge {
          box-shadow: none;
        }

        .certification-badge:hover {
          transform: translateY(-5px);
        }

        /* Badge placeholder for development */
        .badge-placeholder {
          width: 60px;
          height: 60px;
          background: rgba(var(--primary-rgb, 99, 102, 241), 0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--primary, #6366f1);
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

        /* Section highlight backgrounds */
        .featured-section,
        .partners-section,
        .certifications-section {
          position: relative;
          padding: 2rem 0;
          border-radius: 16px;
          overflow: hidden;
        }

        [data-bs-theme="light"] .badge-placeholder {
          box-shadow: inset 0 0 0 1px rgba(var(--primary-rgb), 0.2);
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
        }

        @media (max-width: 575.98px) {
          .trust-container {
            --container-padding: 10px;
          }
        }

        @media (max-width: 767.98px) {
          h3.h4 {
            font-size: 1.1rem;
          }

          .section-label {
            font-size: 0.9rem;
          }

          .badge-wrapper {
            width: 80px;
            height: 80px;
          }
        }

        @media (max-width: 575.98px) {
          .badge-placeholder {
            width: 45px;
            height: 45px;
            font-size: 1.25rem;
          }

          .badge-name {
            font-size: 0.85rem;
          }

          .badge-description {
            font-size: 0.75rem;
          }

          .badge-wrapper {
            width: 70px;
            height: 70px;
          }
        }
      `}</style>
    </SectionContainer>
  );
}
