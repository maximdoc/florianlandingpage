"use client";

import { useState, useRef, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Image from "next/image";
import SectionContainer from "../SectionContainer";
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

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const sliderRef = useRef(null);

  // Refs for animations
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const carouselRef = useRef(null);

  // Check if elements are visible
  const isSectionVisible = useIsVisible(sectionRef);
  const isHeaderVisible = useIsVisible(headerRef);
  const isCarouselVisible = useIsVisible(carouselRef);

  // Get testimonials section data directly from content.json
  const homePageData = content.pages.find((page) => page.id === "home");
  const testimonialsSection = homePageData.sections.find(
    (section) => section.id === "testimonials"
  );
  const testimonials = testimonialsSection.testimonials || [];

  // Handle swipe functionality
  useEffect(() => {
    if (!sliderRef.current) return;

    const handleTouchStart = (e) => {
      setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e) => {
      setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
      if (touchStart - touchEnd > 50) {
        // Swipe left - go to next slide
        setActiveIndex((prevIndex) => {
          return prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1;
        });
      }

      if (touchEnd - touchStart > 50) {
        // Swipe right - go to previous slide
        setActiveIndex((prevIndex) => {
          return prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1;
        });
      }
    };

    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener("touchstart", handleTouchStart, {
        passive: true,
      });
      slider.addEventListener("touchmove", handleTouchMove, { passive: true });
      slider.addEventListener("touchend", handleTouchEnd, { passive: true });

      return () => {
        slider.removeEventListener("touchstart", handleTouchStart);
        slider.removeEventListener("touchmove", handleTouchMove);
        slider.removeEventListener("touchend", handleTouchEnd);
      };
    }
  }, [touchStart, touchEnd, testimonials]);

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const renderStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <span key={i} className="star">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
          </svg>
        </span>
      ));
  };

  return (
    <SectionContainer
      id="testimonials"
      className="testimonials-section py-6 position-relative overflow-hidden"
      backgroundVariant={testimonialsSection.backgroundVariant || "light"}
      ref={sectionRef}
    >
      <div className="position-absolute bg-shape shape-1"></div>
      <div className="position-absolute bg-shape shape-2"></div>
      <div className="position-absolute bg-shape shape-3"></div>

      <Container className="position-relative">
        <Row className="mb-5 text-center" ref={headerRef}>
          <Col lg={8} className="mx-auto">
            <div
              className={`section-label text-uppercase mb-2 transition-all duration-1000 ${
                isHeaderVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              {testimonialsSection.sectionLabel}
            </div>
            <h2
              className={`section-title mb-3 transition-all duration-1000 delay-100 ${
                isHeaderVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              dangerouslySetInnerHTML={{ __html: testimonialsSection.title }}
            />
            <p
              className={`section-subtitle transition-all duration-1000 delay-200 ${
                isHeaderVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              {testimonialsSection.subtitle}
            </p>
          </Col>
        </Row>

        <div
          className={`testimonial-carousel position-relative transition-all duration-1000 delay-300 ${
            isCarouselVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
          ref={carouselRef}
        >
          <div className="testimonial-slider" ref={sliderRef}>
            {testimonials.length > 0 &&
              testimonials.map((testimonial, index) => {
                // Calculate position classes
                let positionClass = "";
                if (index === activeIndex) {
                  positionClass = "active";
                } else if (
                  index ===
                  (activeIndex - 1 + testimonials.length) % testimonials.length
                ) {
                  positionClass = "prev";
                } else if (
                  index ===
                  (activeIndex - 2 + testimonials.length) % testimonials.length
                ) {
                  positionClass = "prev-2";
                } else if (index === (activeIndex + 1) % testimonials.length) {
                  positionClass = "next";
                } else if (index === (activeIndex + 2) % testimonials.length) {
                  positionClass = "next-2";
                } else {
                  positionClass = "hidden";
                }

                return (
                  <div
                    key={testimonial.id}
                    className={`testimonial-card ${positionClass}`}
                  >
                    <div className="stars-container">
                      {renderStars(testimonial.rating)}
                    </div>

                    <div className="testimonial-content">
                      <p className="testimonial-text">"{testimonial.quote}"</p>
                    </div>

                    <div className="testimonial-author">
                      <div className="avatar-wrapper">
                        <Image
                          src={testimonial.avatar}
                          alt={testimonial.author}
                          width={56}
                          height={56}
                          className="avatar-image"
                        />
                      </div>
                      <div className="author-info">
                        <h5 className="author-name">{testimonial.author}</h5>
                        <p className="author-position">
                          {testimonial.position}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>

          <div className="dots-container">
            {testimonials.length > 0 &&
              testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`dot ${activeIndex === index ? "active" : ""}`}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
          </div>

          <button
            className="nav-arrow prev-arrow d-none d-md-flex"
            onClick={handlePrev}
            aria-label="Previous testimonial"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
              />
            </svg>
          </button>

          <button
            className="nav-arrow next-arrow d-none d-md-flex"
            onClick={handleNext}
            aria-label="Next testimonial"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
              />
            </svg>
          </button>
        </div>
      </Container>

      <style jsx global>{`
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

        /* Section styling */
        .testimonials-section {
          position: relative;
          background: #f8fafc;
          padding: 5rem 0;
        }

        /* Background shapes */
        .bg-shape {
          position: absolute;
          background: rgba(99, 102, 241, 0.3);
          filter: blur(80px);
          opacity: 0.06;
          border-radius: 50%;
        }

        .shape-1 {
          width: 600px;
          height: 600px;
          top: -100px;
          right: -200px;
        }

        .shape-2 {
          width: 500px;
          height: 500px;
          bottom: -100px;
          left: -200px;
        }

        .shape-3 {
          width: 300px;
          height: 300px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: rgba(99, 102, 241, 0.4);
          opacity: 0.03;
        }

        /* Section headers */
        .section-label {
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 2px;
          color: rgba(0, 0, 0, 0.5);
        }

        .section-title {
          font-size: 2.6rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: #0f172a;
        }

        .section-subtitle {
          font-size: 1.1rem;
          color: rgba(0, 0, 0, 0.7);
          max-width: 700px;
          margin: 0 auto;
        }

        /* Testimonial carousel */
        .testimonial-carousel {
          position: relative;
          max-width: 1200px;
          margin: 0 auto;
          padding: 3rem 0;
        }

        .testimonial-slider {
          position: relative;
          height: 450px; /* Fixed height for slider container */
          margin-bottom: 2rem;
        }

        /* Testimonial cards */
        .testimonial-card {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          background: #ffffff;
          border: 1px solid rgba(0, 0, 0, 0.06);
          border-radius: 16px;
          padding: 2.5rem;
          width: 100%;
          height: 380px; /* Fixed height for all cards */
          max-width: 650px;
          margin: 0 auto;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
          transition: transform 0.5s cubic-bezier(0.25, 1, 0.5, 1),
            opacity 0.5s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.5s ease-out;
          opacity: 0;
          transform: scale(0.8) translateX(100px);
          pointer-events: none;
          backdrop-filter: blur(10px);
          z-index: 1;
          will-change: transform, opacity;
          transform-style: preserve-3d;
          backface-visibility: hidden;
          perspective: 1000px;
          display: flex;
          flex-direction: column;
        }

        .testimonial-card.active {
          opacity: 1;
          transform: scale(1) translateX(0) translateZ(0);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
          z-index: 5;
          pointer-events: auto;
          border: 1px solid rgba(0, 0, 0, 0.1);
          background: rgba(255, 255, 255, 0.98);
        }

        .testimonial-card.prev,
        .testimonial-card.next {
          opacity: 0.15;
          transform: scale(0.85) translateX(-30%) translateZ(0);
          z-index: 4;
          background: rgba(220, 225, 230, 0.4);
          backdrop-filter: blur(15px) brightness(0.5);
          pointer-events: none;
          border: 1px solid rgba(0, 0, 0, 0.03);
        }

        .testimonial-card.next {
          transform: scale(0.85) translateX(30%) translateZ(0);
        }

        .testimonial-card.prev-2,
        .testimonial-card.next-2 {
          opacity: 0.05;
          transform: scale(0.7) translateX(-55%) translateZ(0);
          z-index: 3;
          background: rgba(200, 205, 210, 0.3);
          backdrop-filter: blur(20px) brightness(0.3);
          pointer-events: none;
          border: 1px solid rgba(0, 0, 0, 0.01);
        }

        .testimonial-card.next-2 {
          transform: scale(0.7) translateX(55%) translateZ(0);
        }

        .testimonial-card.hidden {
          opacity: 0;
          transform: scale(0.7) translateX(0);
          z-index: 1;
        }

        /* Stars styling */
        .stars-container {
          display: flex;
          margin-bottom: 1.25rem;
        }

        .star {
          color: #ffd700;
          margin-right: 4px;
        }

        /* Testimonial content */
        .testimonial-content {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .testimonial-text {
          font-size: 1.25rem;
          line-height: 1.7;
          color: rgba(0, 0, 0, 0.8);
          margin-bottom: 2rem;
          font-weight: 400;
          flex-grow: 1;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 5;
          -webkit-box-orient: vertical;
        }

        /* Author info */
        .testimonial-author {
          display: flex;
          align-items: center;
          margin-top: auto;
        }

        .avatar-wrapper {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          overflow: hidden;
          margin-right: 1rem;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
          border: 2px solid rgba(0, 0, 0, 0.1);
          flex-shrink: 0;
        }

        .avatar-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .author-info {
          display: flex;
          flex-direction: column;
        }

        .author-name {
          font-size: 1.1rem;
          font-weight: 600;
          margin: 0;
          color: #0f172a;
        }

        .author-position {
          font-size: 0.9rem;
          color: rgba(0, 0, 0, 0.6);
          margin: 0;
        }

        /* Navigation arrows */
        .nav-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.05);
          color: #0f172a;
          border: none;
          cursor: pointer;
          z-index: 10;
          transition: all 0.3s ease;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          opacity: 0.8;
        }

        .prev-arrow {
          left: -35px;
        }

        .next-arrow {
          right: -35px;
        }

        .nav-arrow:hover {
          background: rgba(0, 0, 0, 0.1);
          color: #0f172a;
          opacity: 1;
          transform: translateY(-50%) scale(1.05);
        }

        /* Dots navigation */
        .dots-container {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
          margin-top: 2.5rem;
          position: relative;
          z-index: 20;
        }

        .dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: none;
          padding: 0;
          background-color: rgba(0, 0, 0, 0.2);
          cursor: pointer;
          transition: all 0.3s ease;
          margin: 0 4px;
        }

        .dot.active {
          background-color: #0f172a;
          transform: scale(1.3);
        }

        /* Responsive adjustments */
        @media (max-width: 991px) {
          .testimonials-section {
            padding: 5rem 0;
          }

          .testimonial-slider {
            height: 450px;
          }

          .section-title {
            font-size: 2.2rem;
          }

          .testimonial-text {
            font-size: 1.15rem;
          }

          .testimonial-card.prev,
          .testimonial-card.next {
            display: none;
          }

          .testimonial-card.prev-2,
          .testimonial-card.next-2 {
            display: none;
          }
        }

        @media screen and (max-width: 1200px) {
          .nav-arrow {
            display: none !important;
          }
        }

        @media (min-width: 992px) and (max-width: 1200px) {
          .testimonial-slider {
            height: 450px;
          }

          .testimonial-card {
            max-width: 620px;
            height: 380px;
          }

          .testimonial-card.active {
            transform: scale(1) translateX(0);
            z-index: 5;
          }

          .testimonial-card.prev,
          .testimonial-card.next {
            opacity: 0.25;
            transform: scale(0.88) translateX(-25%);
          }

          .testimonial-card.next {
            transform: scale(0.88) translateX(25%);
          }

          .testimonial-card.prev-2,
          .testimonial-card.next-2 {
            opacity: 0.08;
            transform: scale(0.75) translateX(-45%);
          }

          .testimonial-card.next-2 {
            transform: scale(0.75) translateX(45%);
          }

          .prev-arrow {
            left: -30px;
          }

          .next-arrow {
            right: -30px;
          }
        }

        @media (min-width: 768px) and (max-width: 992px) {
          .testimonial-slider {
            height: 450px;
          }

          .testimonial-card {
            max-width: 580px;
            height: 350px;
          }

          .testimonial-card.active {
            transform: scale(1) translateX(0);
            z-index: 5;
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.18);
            background: rgba(255, 255, 255, 0.98);
          }

          .testimonial-card.prev,
          .testimonial-card.next {
            display: block;
            opacity: 0.3;
            transform: scale(0.85) translateX(-20%);
            z-index: 4;
          }

          .testimonial-card.next {
            transform: scale(0.85) translateX(20%);
          }

          .testimonial-card.prev-2,
          .testimonial-card.next-2 {
            display: none;
          }

          /* Hide navigation arrows on tablet */
          .nav-arrow {
            display: none !important;
          }

          .testimonial-text {
            font-size: 1.1rem;
            line-height: 1.6;
            -webkit-line-clamp: 4;
          }

          .dots-container {
            margin-top: -3rem;
          }
        }

        @media (max-width: 767px) {
          .testimonials-section {
            padding: 5rem 0;
          }

          .testimonial-slider {
            height: 400px;
            min-height: 400px;
            margin-bottom: -1.5rem;
            /* Enable touch events */
            touch-action: pan-y;
            user-select: none;
            -webkit-user-drag: none;
            cursor: grab;
            position: relative;
            transform: translateZ(0); /* Hardware acceleration */
          }

          .testimonial-slider:active {
            cursor: grabbing;
          }

          .testimonial-slider::after {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M15.4 16.6L10.8 12L15.4 7.4L14 6L8 12L14 18L15.4 16.6Z' fill='rgba(0,0,0,0.1)'/%3E%3C/svg%3E")
                left center no-repeat,
              url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8.6 16.6L13.2 12L8.6 7.4L10 6L16 12L10 18L8.6 16.6Z' fill='rgba(0,0,0,0.1)'/%3E%3C/svg%3E")
                right center no-repeat;
            background-size: 36px;
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.3s ease;
          }

          .testimonial-slider:hover::after {
            opacity: 1;
          }

          .testimonial-card {
            position: relative;
            max-width: 100%;
            width: 100%;
            height: 330px;
            padding: 1.5rem;
            margin: 0 auto;
            box-shadow: 0 15px 25px rgba(0, 0, 0, 0.2);
            border: 1px solid rgba(0, 0, 0, 0.1);
            transform: none;
          }

          .testimonial-card.active {
            transform: none;
            position: relative;
            left: 0;
            right: 0;
            margin: 0 auto;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
            border: 1px solid rgba(0, 0, 0, 0.1);
            background: rgba(255, 255, 255, 0.98);
          }

          .testimonial-text {
            font-size: 1rem;
            line-height: 1.5;
            margin-bottom: 1.5rem;
            -webkit-line-clamp: 3;
          }

          .testimonial-card.prev,
          .testimonial-card.next,
          .testimonial-card.prev-2,
          .testimonial-card.next-2 {
            display: none;
          }

          .section-title {
            font-size: 1.8rem;
          }

          .nav-arrow {
            display: none !important;
          }

          .stars-container {
            margin-bottom: 1rem;
          }

          .avatar-wrapper {
            width: 40px;
            height: 40px;
            margin-right: 0.75rem;
          }

          .author-name {
            font-size: 0.95rem;
          }

          .author-position {
            font-size: 0.8rem;
          }

          .section-subtitle {
            font-size: 1rem;
            padding: 0 1rem;
          }

          .dots-container {
            margin-top: 0;
            margin-bottom: 1rem;
          }

          .testimonial-carousel {
            padding: 0;
          }
        }

        @media (max-width: 576px) {
          .testimonials-section {
            padding: 2.5rem 0 2.5rem;
          }

          .testimonial-slider {
            min-height: 380px;
            height: 380px;
          }

          .testimonial-card {
            padding: 1.25rem;
            border-radius: 12px;
            height: 300px;
          }

          .testimonial-text {
            font-size: 0.95rem;
            margin-bottom: 1.25rem;
            -webkit-line-clamp: 3;
          }

          .avatar-wrapper {
            width: 36px;
            height: 36px;
          }

          .author-name {
            font-size: 0.9rem;
          }

          .author-position {
            font-size: 0.75rem;
          }

          .stars-container svg {
            width: 14px;
            height: 14px;
          }

          .dot {
            width: 8px;
            height: 8px;
          }

          .dots-container {
            margin-top: -0.5rem;
            margin-bottom: 0;
          }

          .section-title {
            font-size: 1.6rem;
            margin-bottom: 0.5rem;
          }

          .section-subtitle {
            font-size: 0.9rem;
          }

          .mb-5 {
            margin-bottom: 2rem !important;
          }
        }
      `}</style>
    </SectionContainer>
  );
}
