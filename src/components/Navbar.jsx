'use client';

import { Navbar as BootstrapNavbar, Nav, Container, Button } from 'react-bootstrap';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <BootstrapNavbar 
      expand="lg" 
      className={`navbar-main py-3 ${scrolled ? 'navbar-scrolled' : ''}`}
      fixed="top"
      expanded={expanded}
      onToggle={(expanded) => setExpanded(expanded)}
    >
      <Container>
        <Link href="/" className="navbar-brand fw-bold">
          <span className="text-primary-color">PRODUCT</span>
        </Link>
        
        <button 
          className={`hamburger-menu d-lg-none ${expanded ? 'active' : ''}`}
          onClick={() => setExpanded(!expanded)}
          aria-controls="basic-navbar-nav"
          aria-expanded={expanded}
        >
          <span className="burger-line line-1"></span>
          <span className="burger-line line-2"></span>
          <span className="burger-line line-3"></span>
        </button>
        
        <BootstrapNavbar.Collapse id="basic-navbar-nav" className="custom-navbar-collapse">
          <Nav className="ms-auto align-items-lg-center">
            <Link href="/features" className="nav-link py-2 px-3">
              Features
            </Link>
            
            <Link href="/benefits" className="nav-link py-2 px-3">
              Benefits
            </Link>
            
            <Link href="/testimonials" className="nav-link py-2 px-3">
              Testimonials
            </Link>
            
            <Link href="/faq" className="nav-link py-2 px-3">
              FAQ
            </Link>
            
            <div className="d-flex align-items-center mt-3 mt-lg-0 px-3 px-lg-0">
              <ThemeToggle />
              
              <Link href="/get-started" className="btn btn-primary ms-3 glow-effect">
                Get Started
              </Link>
            </div>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
} 