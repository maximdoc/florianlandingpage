'use client';

import { Navbar as BootstrapNavbar, Nav, Container } from 'react-bootstrap';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import { useState, useEffect, useRef, useMemo } from 'react';
import { getGlobalSettings } from '@/utils/contentUtils';

export default function Navbar() {
  // Combine related state to reduce state updates
  const [navState, setNavState] = useState({
    expanded: false,
    navbarHeight: 0,
    loading: true
  });
  
  // Use a single state object for header data
  const [headerData, setHeaderData] = useState({
    navigationItems: [],
    logoText: "PRODUCT"
  });
  
  // State for active section
  const [activeSection, setActiveSection] = useState('');
  
  const navLinksRef = useRef([]);
  const indicatorRef = useRef(null);
  
  // Extract values from state for readability
  const { expanded, navbarHeight, loading } = navState;
  const { navigationItems, logoText } = headerData;
  
  // Load global settings and navigation data
  useEffect(() => {
    async function loadGlobalSettings() {
      try {
        const globalSettings = await getGlobalSettings();
        const header = globalSettings?.header || {};
        
        setHeaderData({
          navigationItems: header?.navigationItems || [],
          logoText: header?.logo || globalSettings?.title?.split(' ')[0] || "PRODUCT"
        });
      } catch (error) {
        console.error('Error loading header data:', error);
      } finally {
        setNavState(prev => ({ ...prev, loading: false }));
      }
    }
    
    loadGlobalSettings();
  }, []);

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
          {/* Move ThemeToggle outside the collapsed menu for mobile */}
          <div className="d-lg-none me-2">
            <ThemeToggle />
          </div>
          
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