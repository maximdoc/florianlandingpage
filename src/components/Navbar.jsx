'use client';

import { Navbar as BootstrapNavbar, Nav, Container } from 'react-bootstrap';
import Link from 'next/link';
import { useState, useEffect, useRef, useMemo } from 'react';
import content from '@/data/content.json';

export default function Navbar() {
  // Directly use content from JSON file
  const globalContent = content.global;
  
  // Combine related state to reduce state updates
  const [navState, setNavState] = useState({
    expanded: false,
    navbarHeight: 0
  });
  
  // State for active section
  const [activeSection, setActiveSection] = useState('');
  
  const navLinksRef = useRef([]);
  
  // Extract values from state for readability
  const { expanded, navbarHeight } = navState;
  
  // Extract header data from content file
  const logoText = globalContent.header.logo;
  const navigationItems = globalContent.header.navigationItems;
  const ctaButton = globalContent.header.ctaButton;

  // Get navbar height for positioning the dropdown correctly
  useEffect(() => {
    const updateNavbarHeight = () => {
      const navbar = document.querySelector('.navbar-main');
      if (navbar) {
        setNavState(prev => ({ 
          ...prev, 
          navbarHeight: navbar.offsetHeight 
        }));
      }
    };
    
    // Initial measurement
    updateNavbarHeight();
    
    // Update on resize
    window.addEventListener('resize', updateNavbarHeight);
    return () => window.removeEventListener('resize', updateNavbarHeight);
  }, []);

  // Set CSS variable for item indices after menu is expanded
  useEffect(() => {
    if (expanded) {
      // Set CSS variables after a small delay for smooth animation
      setTimeout(() => {
        navLinksRef.current.forEach((link, index) => {
          if (link) {
            link.style.setProperty('--item-index', index);
          }
        });
      }, 10);
    }
  }, [expanded]);

  // Prevent scrolling when menu is open on mobile
  useEffect(() => {
    document.body.style.overflow = (expanded && window.innerWidth < 992) ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [expanded]);

  // Observe sections for active state
  useEffect(() => {
    if (navigationItems.length === 0) return;
    
    const sections = {};
    navigationItems.forEach(item => {
      const sectionId = item.href.replace('#', '');
      const element = document.getElementById(sectionId);
      if (element) {
        sections[sectionId] = element;
      }
    });

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100; // Add offset to improve UX
      
      // Find the section that is currently visible
      let currentActiveSection = '';
      Object.entries(sections).forEach(([id, element]) => {
        const offsetTop = element.offsetTop;
        const offsetHeight = element.offsetHeight;
        
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          currentActiveSection = id;
        }
      });
      
      setActiveSection(currentActiveSection);
    };
    
    // Initial check
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navigationItems]);

  // Animated menu hiding when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const navbarCollapse = document.querySelector('.custom-navbar-collapse');
      const hamburgerButton = document.querySelector('.hamburger-menu');
      
      if (expanded && navbarCollapse && 
          !navbarCollapse.contains(event.target) && 
          !hamburgerButton.contains(event.target)) {
        setNavState(prev => ({ ...prev, expanded: false }));
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [expanded]);

  // Handle toggle expanded state
  const toggleExpanded = () => {
    setNavState(prev => ({ ...prev, expanded: !prev.expanded }));
  };
  
  // Close menu when clicking a link on mobile
  const handleNavLinkClick = () => {
    if (window.innerWidth < 992) {
      setNavState(prev => ({ ...prev, expanded: false }));
    }
  };

  // Handler for smooth scrolling when clicking anchor links
  const smoothScrollToAnchor = (e) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href');
    if (targetId && targetId.startsWith('#')) {
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Account for navbar height when scrolling
        const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20;
        
        // Use requestAnimationFrame instead of direct scrollTo call
        requestAnimationFrame(() => {
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        });
      }
    }
    handleNavLinkClick();
  };

  // Memoize navigation items to prevent unnecessary re-renders
  const navLinks = useMemo(() => {
    return navigationItems.map((item, index) => {
      const sectionId = item.href.replace('#', '');
      const isActive = activeSection === sectionId;
      
      return (
        <a 
          key={index}
          href={item.href} 
          className={`nav-link py-2 px-3 ${isActive ? 'active' : ''}`}
          onClick={smoothScrollToAnchor}
          ref={el => navLinksRef.current[index] = el}
          data-section={sectionId}
        >
          {item.text}
        </a>
      );
    });
  }, [navigationItems, activeSection]);

  return (
    <BootstrapNavbar 
      expand="lg" 
      className="navbar-main py-2 py-lg-3"
      expanded={expanded}
      onToggle={toggleExpanded}
    >
      <Container>
        <Link href="/" className="navbar-brand fw-bold">
          <span className="text-primary-color">{logoText}</span>
        </Link>
        
        <div className="d-flex align-items-center">
          <button 
            className={`hamburger-menu d-lg-none ${expanded ? 'active' : ''}`}
            onClick={toggleExpanded}
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
            {navLinks}
            
            <div 
              className="d-flex align-items-center mt-3 mt-lg-0 px-3 px-lg-0"
              ref={el => navLinksRef.current[navigationItems.length] = el}
            >
              {/* Add Get Started CTA button - solid primary blue */}
              <div className="ms-lg-3 mobile-cta-wrapper">
                <a 
                  href={ctaButton.href} 
                  className="btn btn-primary w-100"
                  onClick={smoothScrollToAnchor}
                >
                  {ctaButton.text}
                </a>
              </div>
            </div>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
      
      <style jsx global>{`
        /* Mobile menu CTA button styling */
        @media (max-width: 991.98px) {
          .mobile-cta-wrapper {
            width: 100%;
            margin-top: 0.5rem;
            margin-bottom: 0.5rem;
          }
          
          .custom-navbar-collapse .nav-link {
            padding-left: 0.75rem !important;
            padding-right: 0.75rem !important;
          }
          
          .custom-navbar-collapse .d-flex.align-items-center {
            padding-left: 0.75rem !important;
            padding-right: 0.75rem !important;
            margin-top: 1rem !important;
          }
        }
      `}</style>
    </BootstrapNavbar>
  );
} 