'use client';

import { Navbar as BootstrapNavbar, Nav, Container, Button } from 'react-bootstrap';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import { useState, useEffect, useRef } from 'react';

export default function Navbar() {
  const [expanded, setExpanded] = useState(false);
  const [navbarHeight, setNavbarHeight] = useState(0);
  const navLinksRef = useRef([]);

  // Get navbar height for positioning the dropdown correctly
  useEffect(() => {
    const navbar = document.querySelector('.navbar-main');
    if (navbar) {
      setNavbarHeight(navbar.offsetHeight);
    }
    
    // Update on resize
    const handleResize = () => {
      const navbar = document.querySelector('.navbar-main');
      if (navbar) {
        setNavbarHeight(navbar.offsetHeight);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Set CSS variable for item indices after menu is expanded
  useEffect(() => {
    if (expanded) {
      // Чтобы анимация была плавной, устанавливаем CSS переменные после небольшой задержки
      setTimeout(() => {
        navLinksRef.current.forEach((link, index) => {
          if (link) {
            link.style.setProperty('--item-index', index);
          }
        });
      }, 10);
    }
  }, [expanded]);

  // Close menu when clicking a link on mobile
  const handleNavLinkClick = () => {
    if (window.innerWidth < 992) {
      setExpanded(false);
    }
  };

  // Prevent scrolling when menu is open on mobile
  useEffect(() => {
    if (expanded && window.innerWidth < 992) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [expanded]);

  // Анимированное скрытие меню при клике за его пределами
  useEffect(() => {
    const handleClickOutside = (event) => {
      const navbarCollapse = document.querySelector('.custom-navbar-collapse');
      const hamburgerButton = document.querySelector('.hamburger-menu');
      
      if (expanded && navbarCollapse && 
          !navbarCollapse.contains(event.target) && 
          !hamburgerButton.contains(event.target)) {
        setExpanded(false);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [expanded]);

  return (
    <BootstrapNavbar 
      expand="lg" 
      className="navbar-main py-2 py-lg-3"
      expanded={expanded}
      onToggle={(expanded) => setExpanded(expanded)}
    >
      <Container>
        <Link href="/" className="navbar-brand fw-bold">
          <span className="text-primary-color">PRODUCT</span>
        </Link>
        
        <div className="d-flex align-items-center">
          {/* Move ThemeToggle outside the collapsed menu for mobile */}
          <div className="d-lg-none me-2">
            <ThemeToggle />
          </div>
          
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
        </div>
        
        <BootstrapNavbar.Collapse id="basic-navbar-nav" className={`custom-navbar-collapse ${expanded ? 'show' : ''}`} style={{ top: navbarHeight + 'px' }}>
          <Nav className="ms-auto align-items-lg-center">
            <Link 
              href="/features" 
              className="nav-link py-2 px-3" 
              onClick={handleNavLinkClick}
              ref={el => navLinksRef.current[0] = el}
            >
              Features
            </Link>
            
            <Link 
              href="/benefits" 
              className="nav-link py-2 px-3" 
              onClick={handleNavLinkClick}
              ref={el => navLinksRef.current[1] = el}
            >
              Benefits
            </Link>
            
            <Link 
              href="/testimonials" 
              className="nav-link py-2 px-3" 
              onClick={handleNavLinkClick}
              ref={el => navLinksRef.current[2] = el}
            >
              Testimonials
            </Link>
            
            <Link 
              href="/faq" 
              className="nav-link py-2 px-3" 
              onClick={handleNavLinkClick}
              ref={el => navLinksRef.current[3] = el}
            >
              FAQ
            </Link>
            
            <div 
              className="d-flex align-items-center mt-3 mt-lg-0 px-3 px-lg-0"
              ref={el => navLinksRef.current[4] = el}
            >
              {/* Hide ThemeToggle on mobile - we moved it above */}
              <div className="d-none d-lg-block">
                <ThemeToggle />
              </div>
            </div>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
} 