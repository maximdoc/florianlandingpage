"use client";

import { Container, Row, Col, Button } from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="pt-5 pb-0 position-relative overflow-hidden">
      {/* Background elements */}
      <div
        className="position-absolute"
        style={{
          top: "5%",
          right: "10%",
          width: "300px",
          height: "300px",
          background: "var(--primary-light)",
          borderRadius: "40% 60% 70% 30% / 40% 50% 60% 50%",
          zIndex: -1,
          filter: "blur(60px)",
          opacity: 0.6,
          animation: "float 8s ease-in-out infinite",
        }}
      ></div>

      <div
        className="position-absolute"
        style={{
          bottom: "15%",
          left: "5%",
          width: "200px",
          height: "200px",
          background: "var(--primary-light)",
          borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
          zIndex: -1,
          filter: "blur(50px)",
          opacity: 0.5,
          animation: "float 6s ease-in-out infinite reverse",
        }}
      ></div>

      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
          100% {
            transform: translateY(0) rotate(0deg);
          }
        }
      `}</style>

      <Container>
        <Row className="align-items-center">
          <Col lg={6} className="mb-5 mb-lg-0">
            <div className="mb-4 fade-in">
              {/* <span className="badge-primary px-3 py-2 rounded-pill mb-3 d-inline-block">
                The Ultimate Productivity Solution
              </span> */}

              <h1 className="display-4 fw-bold mb-3">
                Land <span className="text-gradient">Government</span> <br />
                <span className="text-gradient">Contracts</span> on <br />
                <span className="fw-bold">Autopilot</span>
              </h1>

              <p className="lead mb-5 text-secondary">
                SlingRFP's full‑service AI platform <strong>builds your gov‑ready profile, plugs every compliance gap, and writes winning proposals</strong>—so you capture predictable B2G revenue with almost zero lift.
              </p>

              <div className="d-flex flex-column gap-3 mb-5 slide-up">
                <div className="d-flex align-items-center">
                  <div className="me-3 text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-check-circle-fill" viewBox="0 0 16 16">
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                    </svg>
                  </div>
                  <p className="mb-0">We create (and maintain) your complete vendor dossier</p>
                </div>
                <div className="d-flex align-items-center">
                  <div className="me-3 text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-check-circle-fill" viewBox="0 0 16 16">
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                    </svg>
                  </div>
                  <p className="mb-0">Automated gap analysis flags missing certs & docs—then we secure them for you</p>
                </div>
                <div className="d-flex align-items-center">
                  <div className="me-3 text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-check-circle-fill" viewBox="0 0 16 16">
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                    </svg>
                  </div>
                  <p className="mb-0">Proposals drafted, submitted, and iterated until the win rate climbs</p>
                </div>
              </div>

              <div className="d-grid gap-3 d-sm-flex mb-5 slide-up">
                <Link
                  href="/signup"
                  className="btn btn-primary btn-lg px-5 py-3 glow-effect"
                >
                  Book a 15-min Strategy Call
                </Link>
              </div>

              <div
                className="d-flex align-items-center slide-up"
                style={{ animationDelay: "0.2s" }}
              >
                <div className="d-flex me-3">
                  <div style={{ marginRight: "-8px" }}>
                    <div
                      className="position-relative rounded-circle border border-2 border-white"
                      style={{
                        width: "36px",
                        height: "36px",
                        overflow: "hidden",
                      }}
                    >
                      <Image
                        src="/images/user-1.jpg"
                        alt="User 1"
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  </div>
                  <div style={{ marginRight: "-8px" }}>
                    <div
                      className="position-relative rounded-circle border border-2 border-white"
                      style={{
                        width: "36px",
                        height: "36px",
                        overflow: "hidden",
                      }}
                    >
                      <Image
                        src="/images/user-2.jpg"
                        alt="User 2"
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  </div>
                  <div style={{ marginRight: "-8px" }}>
                    <div
                      className="position-relative rounded-circle border border-2 border-white"
                      style={{
                        width: "36px",
                        height: "36px",
                        overflow: "hidden",
                      }}
                    >
                      <Image
                        src="/images/user-3.jpg"
                        alt="User 3"
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  </div>
                  <div
                    className="position-relative d-flex align-items-center justify-content-center rounded-circle bg-primary text-white border border-2 border-white fs-xs fw-bold"
                    style={{ width: "36px", height: "36px" }}
                  >
                    +5k
                  </div>
                </div>
                <div className="text-secondary">
                  <strong className="text-dark">5,000+</strong> professionals
                  trust our platform daily
                </div>
              </div>
            </div>
          </Col>

          <Col lg={6} className="position-relative">
            <div
              className="position-relative slide-up"
              style={{ animationDelay: "0.3s", zIndex: 1 }}
            >
              <div
                className="p-2 rounded-4 bg-white shadow-lg"
                style={{
                  transform:
                    "perspective(1000px) rotateY(-8deg) rotateX(5deg) rotate(1deg)",
                }}
              >
                <div
                  className="dashboard-mockup position-relative rounded-3 overflow-hidden"
                  style={{ aspectRatio: "16/10" }}
                >
                  <Image
                    src="/images/dashboard.jpg"
                    alt="Platform dashboard showing productivity tools"
                    fill
                    style={{ objectFit: "cover" }}
                    className="rounded-3"
                    priority
                  />
                </div>
              </div>

              {/* Floating elements */}
              <div
                className="position-absolute top-0 start-0 translate-middle slide-up"
                style={{ animationDelay: "0.5s" }}
              >
                <div
                  className="card shadow-lg border-0 rounded-4 p-3"
                  style={{ width: "200px" }}
                >
                  <div className="d-flex align-items-center">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center"
                      style={{
                        width: "40px",
                        height: "40px",
                        background: "var(--primary-light)",
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="var(--primary)"
                        className="bi bi-lightning-charge-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09z" />
                      </svg>
                    </div>
                    <div className="ms-3">
                      <p className="mb-0 fw-semibold">Productivity Boost</p>
                      <p className="mb-0 fs-5 fw-bold text-primary">+43%</p>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="position-absolute bottom-0 end-0 translate-middle-y slide-up"
                style={{ animationDelay: "0.6s" }}
              >
                <div
                  className="card shadow-lg border-0 rounded-4 p-3"
                  style={{ width: "200px" }}
                >
                  <div className="d-flex align-items-center">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center"
                      style={{
                        width: "40px",
                        height: "40px",
                        background: "rgba(46, 204, 113, 0.1)",
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="#2ecc71"
                        className="bi bi-bar-chart-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M1 11a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1zm5-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1z" />
                      </svg>
                    </div>
                    <div className="ms-3">
                      <p className="mb-0 fw-semibold">Time Saved</p>
                      <p
                        className="mb-0 fs-5 fw-bold"
                        style={{ color: "#2ecc71" }}
                      >
                        12hrs/week
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>

        <Row className="py-5 mt-5">
          <Col
            className="text-center slide-up"
            style={{ animationDelay: "0.7s" }}
          >
            <p className="text-secondary mb-4">
              Trusted by innovative teams from companies like
            </p>
            <div className="d-flex justify-content-center align-items-center flex-wrap gap-5 opacity-75">
              {[
                "COMPANY A",
                "COMPANY B",
                "COMPANY C",
                "COMPANY D",
                "COMPANY E",
              ].map((company, index) => (
                <div key={index} className="fw-bold fs-5">
                  {company}
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
