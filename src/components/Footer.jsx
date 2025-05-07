'use client';

import { Container, Row, Col } from 'react-bootstrap';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="py-5 mt-5">
      <Container>
        <Row className="mb-4">
          <Col md={3} className="mb-4 mb-md-0">
            <h5 className="text-primary-color mb-4">PRODUCT</h5>
            <p className="text-muted">
              Transform your workflow and boost productivity with our all-in-one platform.
            </p>
            <div className="d-flex gap-3 mb-3">
              <a href="#" aria-label="Facebook" className="text-muted">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-facebook" viewBox="0 0 16 16">
                  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
                </svg>
              </a>
              <a href="#" aria-label="Twitter" className="text-muted">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-twitter-x" viewBox="0 0 16 16">
                  <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
                </svg>
              </a>
              <a href="#" aria-label="Instagram" className="text-muted">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-instagram" viewBox="0 0 16 16">
                  <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm.003 1.065h.001c2.172 0 2.428.01 3.29.048.791.038 1.22.17 1.505.28.375.148.663.327.966.626.302.303.484.592.627.966.11.285.241.714.279 1.503.038.872.046 1.127.046 3.293 0 2.176-.008 2.422-.046 3.295-.038.79-.17 1.218-.28 1.504a2.6 2.6 0 0 1-.627.965 2.6 2.6 0 0 1-.965.627c-.285.11-.714.241-1.505.279-.872.037-1.128.046-3.298.046-2.17 0-2.425-.009-3.298-.046-.792-.038-1.22-.17-1.505-.279a2.6 2.6 0 0 1-.965-.627 2.6 2.6 0 0 1-.627-.965c-.11-.286-.242-.716-.28-1.504-.037-.872-.046-1.128-.046-3.295 0-2.167.009-2.413.046-3.285.038-.79.17-1.218.28-1.504.148-.375.323-.663.627-.965.303-.304.59-.482.965-.627.286-.11.714-.242 1.506-.28.87-.037 1.125-.046 3.292-.046" />
                  <path d="M8 3.953a4.03 4.03 0 0 0-.898 7.983A4.03 4.03 0 0 0 8 3.94zm0 1.064a2.97 2.97 0 1 1 0 5.94 2.97 2.97 0 0 1 0-5.94z" />
                  <circle cx="12.25" cy="3.75" r=".875" />
                </svg>
              </a>
              <a href="#" aria-label="LinkedIn" className="text-muted">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-linkedin" viewBox="0 0 16 16">
                  <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2 3.226 2 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
                </svg>
              </a>
            </div>
          </Col>
          
          <Col md={3} className="mb-4 mb-md-0">
            <h5 className="mb-4">Product</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link href="/features" className="text-muted text-decoration-none">Features</Link>
              </li>
              <li className="mb-2">
                <Link href="/pricing" className="text-muted text-decoration-none">Pricing</Link>
              </li>
              <li className="mb-2">
                <Link href="/integrations" className="text-muted text-decoration-none">Integrations</Link>
              </li>
              <li className="mb-2">
                <Link href="/updates" className="text-muted text-decoration-none">Updates</Link>
              </li>
            </ul>
          </Col>
          
          <Col md={3} className="mb-4 mb-md-0">
            <h5 className="mb-4">Resources</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link href="/documentation" className="text-muted text-decoration-none">Documentation</Link>
              </li>
              <li className="mb-2">
                <Link href="/tutorials" className="text-muted text-decoration-none">Tutorials</Link>
              </li>
              <li className="mb-2">
                <Link href="/faq" className="text-muted text-decoration-none">FAQ</Link>
              </li>
              <li className="mb-2">
                <Link href="/community" className="text-muted text-decoration-none">Community</Link>
              </li>
            </ul>
          </Col>
          
          <Col md={3}>
            <h5 className="mb-4">Company</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link href="/about" className="text-muted text-decoration-none">About</Link>
              </li>
              <li className="mb-2">
                <Link href="/blog" className="text-muted text-decoration-none">Blog</Link>
              </li>
              <li className="mb-2">
                <Link href="/careers" className="text-muted text-decoration-none">Careers</Link>
              </li>
              <li className="mb-2">
                <Link href="/contact" className="text-muted text-decoration-none">Contact</Link>
              </li>
            </ul>
          </Col>
        </Row>
        
        <hr className="my-4" />
        
        <Row>
          <Col className="text-center text-md-start">
            <p className="text-muted small">
              © {new Date().getFullYear()} Company Name. All rights reserved.
            </p>
          </Col>
          <Col className="text-center text-md-end">
            <ul className="list-inline small mb-0">
              <li className="list-inline-item">
                <Link href="/privacy-policy" className="text-muted text-decoration-none">Privacy Policy</Link>
              </li>
              <li className="list-inline-item ms-3">
                <Link href="/terms-of-service" className="text-muted text-decoration-none">Terms of Service</Link>
              </li>
              <li className="list-inline-item ms-3">
                <Link href="/cookies" className="text-muted text-decoration-none">Cookies</Link>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
} 