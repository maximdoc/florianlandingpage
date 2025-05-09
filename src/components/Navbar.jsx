'use client';

import { Navbar as BootstrapNavbar, Nav, Container, Button } from 'react-bootstrap';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import { useState, useEffect, useRef } from 'react';
import { getGlobalSettings } from '@/utils/contentUtils';

export default function Navbar() {
  const [expanded, setExpanded] = useState(false);
  const [navbarHeight, setNavbarHeight] = useState(0);
  const navLinksRef = useRef([]);
  
  // Получаем данные навигации из JSON
  const globalSettings = getGlobalSettings();
  const headerData = globalSettings?.header || {};
  const navigationItems = headerData?.navigationItems || [];
  const logoText = headerData?.logo || globalSettings?.title?.split(' ')[0] || "PRODUCT";

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

  // Обработчик для плавной прокрутки при клике на якорные ссылки
  const smoothScrollToAnchor = (e) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href');
    if (targetId && targetId.startsWith('#')) {
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Учитываем высоту навбара при прокрутке
        const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20;
        
        // Используем requestAnimationFrame вместо прямого вызова scrollTo
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

  return (
    <BootstrapNavbar 
      expand="lg" 
      className="navbar-main py-2 py-lg-3"
      expanded={expanded}
      onToggle={(expanded) => setExpanded(expanded)}
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
            {navigationItems.map((item, index) => (
              <a 
                key={index}
                href={item.href} 
                className="nav-link py-2 px-3" 
                onClick={smoothScrollToAnchor}
                ref={el => navLinksRef.current[index] = el}
              >
                {item.text}
              </a>
            ))}
            
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