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

export default function PartnersAndClientsSection() {
  // Get partnersAndClients section data directly from content.json
  const homePageData = content.pages.find((page) => page.id === "home");
  const partnersAndClientsSection = homePageData.sections.find(
    (section) => section.id === "partnersAndClients"
  );

  // Refs for animation tracking
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const partnersCarouselRef = useRef(null);
  const clientsCarouselRef = useRef(null);

  // Check if elements are visible
  const isSectionVisible = useIsVisible(sectionRef);
  const isHeaderVisible = useIsVisible(headerRef);
  const isPartnersCarouselVisible = useIsVisible(partnersCarouselRef);
  const isClientsCarouselVisible = useIsVisible(clientsCarouselRef);

  return (
    <SectionContainer
      id="partners-clients"
      className="logo-carousel-section position-relative"
      backgroundVariant="light"
      ref={sectionRef}
    >
      {/* Decorative dot patterns */}
      <div
        className="position-absolute dots-grid dots-grid-top-right"
        style={{
          top: "15%",
          right: "8%",
          width: "150px",
          height: "150px",
          zIndex: 0,
          opacity: 0.4,
        }}
      ></div>

      <div
        className="position-absolute dots-grid dots-grid-bottom-left"
        style={{
          bottom: "10%",
          left: "5%",
          width: "180px",
          height: "180px",
          zIndex: 0,
          opacity: 0.4,
        }}
      ></div>

      <Container className="position-relative py-5" style={{ zIndex: 2 }}>
        <Row className="text-center mb-md-5 mb-4" ref={headerRef}>
          <Col lg={8} className="mx-auto">
            <h2
              className={`display-5 mb-3 transition-all duration-1000 ${
                isHeaderVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              dangerouslySetInnerHTML={{
                __html: partnersAndClientsSection.title,
              }}
            />
            <p
              className={`lead mb-4 transition-all duration-1000 delay-100 ${
                isHeaderVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              {partnersAndClientsSection.subtitle}
            </p>
          </Col>
        </Row>

        {/* Partners Carousel Section */}
        <Row className="mb-5 text-center" ref={partnersCarouselRef}>
          <Col lg={12} className="mb-3">
            <h3
              className={`h4 mb-3 transition-all duration-1000 ${
                isPartnersCarouselVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <span className="section-label">Partners</span>
              <div className="heading-underline"></div>
            </h3>
            <p
              className={`section-description mb-4 transition-all duration-1000 delay-100 ${
                isPartnersCarouselVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              Platform integrations and strategic allies
            </p>

            <div
              className={`logo-carousel partners-carousel transition-all duration-1000 delay-200 ${
                isPartnersCarouselVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="logo-track">
                {/* First set of logos */}
                {partnersAndClientsSection.partners &&
                  partnersAndClientsSection.partners.logos.map(
                    (logo, index) => (
                      <div key={`partner-${logo.id}`} className="logo-item">
                        <div className="logo-wrapper">
                          {!logo.image ? (
                            <div className="logo-placeholder">{logo.name}</div>
                          ) : (
                            <Image
                              src={logo.image}
                              alt={logo.name}
                              width={120}
                              height={60}
                              className="logo-image"
                              style={{
                                width: "auto",
                                height: "auto",
                                maxHeight: "50px",
                              }}
                            />
                          )}
                        </div>
                      </div>
                    )
                  )}

                {/* Duplicate logos for continuous scrolling effect */}
                {partnersAndClientsSection.partners &&
                  partnersAndClientsSection.partners.logos.map(
                    (logo, index) => (
                      <div
                        key={`partner-duplicate-${logo.id}`}
                        className="logo-item"
                      >
                        <div className="logo-wrapper">
                          {!logo.image ? (
                            <div className="logo-placeholder">{logo.name}</div>
                          ) : (
                            <Image
                              src={logo.image}
                              alt={`${logo.name} (duplicate)`}
                              width={120}
                              height={60}
                              className="logo-image"
                              style={{
                                width: "auto",
                                height: "auto",
                                maxHeight: "50px",
                              }}
                            />
                          )}
                        </div>
                      </div>
                    )
                  )}
              </div>
            </div>
          </Col>
        </Row>

        {/* Clients Carousel Section */}
        <Row className="text-center" ref={clientsCarouselRef}>
          <Col lg={12} className="mb-3">
            <h3
              className={`h4 mb-3 transition-all duration-1000 ${
                isClientsCarouselVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <span className="section-label">Clients</span>
              <div className="heading-underline"></div>
            </h3>
            <p
              className={`section-description mb-4 transition-all duration-1000 delay-100 ${
                isClientsCarouselVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              Early adopters and success stories
            </p>

            <div
              className={`logo-carousel clients-carousel transition-all duration-1000 delay-200 ${
                isClientsCarouselVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="logo-track reverse">
                {/* First set of logos - use clients logos */}
                {partnersAndClientsSection.clients &&
                  partnersAndClientsSection.clients.logos.map((logo, index) => (
                    <div key={`client-${logo.id}`} className="logo-item">
                      <div className="logo-wrapper">
                        {!logo.image ? (
                          <div className="logo-placeholder">{logo.name}</div>
                        ) : (
                          <Image
                            src={logo.image}
                            alt={logo.name}
                            width={140}
                            height={70}
                            className="logo-image"
                            style={{
                              width: "auto",
                              height: "auto",
                              maxHeight: "50px",
                            }}
                          />
                        )}
                      </div>
                    </div>
                  ))}

                {/* Duplicate logos for continuous scrolling effect */}
                {partnersAndClientsSection.clients &&
                  partnersAndClientsSection.clients.logos.map((logo, index) => (
                    <div
                      key={`client-duplicate-${logo.id}`}
                      className="logo-item"
                    >
                      <div className="logo-wrapper">
                        {!logo.image ? (
                          <div className="logo-placeholder">{logo.name}</div>
                        ) : (
                          <Image
                            src={logo.image}
                            alt={`${logo.name} (duplicate)`}
                            width={140}
                            height={70}
                            className="logo-image"
                            style={{
                              width: "auto",
                              height: "auto",
                              maxHeight: "50px",
                            }}
                          />
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      <style jsx global>{`
        .logo-carousel-section {
          position: relative;
          overflow: hidden;
          background: var(--section-bg-light);
          padding: 5rem 0;
        }

        /* Decorative dot patterns */
        .dots-grid {
          background-image: radial-gradient(
            rgba(200, 200, 200, 0.5) 2px,
            transparent 2px
          );
          background-size: 18px 18px;
          opacity: 0.5;
          z-index: 0;
        }

        .heading-underline {
          height: 2px;
          width: 60px;
          background: linear-gradient(
            90deg,
            var(--primary),
            rgba(99, 102, 241, 0.3)
          );
          margin: 0.5rem auto 0;
        }

        .section-label {
          font-weight: 600;
          color: var(--primary);
          font-size: 1.1rem;
        }

        .section-description {
          color: var(--text-secondary);
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        /* Logo carousel styles */
        .logo-carousel {
          width: 100%;
          overflow: hidden;
          position: relative;
          padding: 1.5rem 0;
          margin: 1.5rem 0;
        }

        .logo-carousel::before,
        .logo-carousel::after {
          content: "";
          position: absolute;
          top: 0;
          width: 150px;
          height: 100%;
          z-index: 2;
          pointer-events: none;
        }

        .logo-carousel::before {
          left: 0;
          background: linear-gradient(
            to right,
            var(--section-bg-light),
            transparent
          );
        }

        .logo-carousel::after {
          right: 0;
          background: linear-gradient(
            to left,
            var(--section-bg-light),
            transparent
          );
        }

        .logo-track {
          display: flex;
          animation: scroll 30s linear infinite;
          width: max-content;
          animation-play-state: running;
        }

        .logo-carousel:hover .logo-track {
          animation-play-state: paused;
        }

        .logo-track.reverse {
          animation: scroll-reverse 25s linear infinite;
          animation-play-state: running;
        }

        .logo-carousel:hover .logo-track.reverse {
          animation-play-state: paused;
        }

        .logo-item {
          flex: 0 0 auto;
          padding: 0 2rem;
        }

        .logo-wrapper {
          background-color: white;
          border-radius: 12px;
          padding: 1rem 1.5rem;
          height: 80px;
          width: 180px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
          border: 1px solid rgba(0, 0, 0, 0.05);
        }

        .logo-wrapper:hover {
          transform: translateY(-5px) scale(1.03);
          box-shadow: 0 12px 20px rgba(0, 0, 0, 0.1);
          border-color: rgba(var(--primary-rgb), 0.2);
        }

        .logo-placeholder {
          color: var(--text-secondary);
          font-weight: 600;
          text-align: center;
          font-size: 0.9rem;
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes scroll-reverse {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .logo-carousel-section {
            padding: 3rem 0;
          }

          .logo-wrapper {
            height: 70px;
            width: 150px;
            padding: 0.75rem 1rem;
          }

          .logo-item {
            padding: 0 1.5rem;
          }
        }
      `}</style>
    </SectionContainer>
  );
}
