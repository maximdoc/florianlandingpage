'use client';

import { Container, Row, Col } from 'react-bootstrap';
import Link from 'next/link';
import { useEffect, useState, useMemo } from 'react';
import { getGlobalSettings } from '@/utils/contentUtils';

export default function Footer() {
  // Combined state for all footer data
  const [footerState, setFooterState] = useState({
    theme: 'dark',
    navbarHeight: 0,
    loading: true,
    footerData: {
      socialLinks: [],
      navigationLinks: [],
      supportLinks: [],
      legalLinks: [],
      contactEmail: "support@example.com",
      copyright: ""
    },
    globalSettings: {
      title: "PRODUCT",
      description: "Transform your business with efficient solutions"
    }
  });

  // Get footer data from API
  useEffect(() => {
    async function loadFooterData() {
      try {
        const globalSettings = await getGlobalSettings();
        const footerData = globalSettings?.footer || {};
        const title = globalSettings?.title?.split(' ')[0] || "PRODUCT";
        
        setFooterState(prev => ({
          ...prev,
          loading: false,
          footerData: {
            socialLinks: footerData?.socialLinks || [],
            navigationLinks: footerData?.navigationLinks || [],
            supportLinks: footerData?.supportLinks || [],
            legalLinks: footerData?.legalLinks || [],
            contactEmail: footerData?.contactEmail || "support@example.com",
            copyright: footerData?.copyright || `© ${new Date().getFullYear()} ${title}. All rights reserved.`
          },
          globalSettings: {
            title,
            description: globalSettings?.description || "Transform your business with efficient solutions"
          }
        }));
      } catch (error) {
        console.error('Error loading footer data:', error);
        setFooterState(prev => ({ ...prev, loading: false }));
      }
    }
    
    loadFooterData();
  }, []);

  // Track current theme
  useEffect(() => {
    const htmlElement = document.documentElement;
    setFooterState(prev => ({
      ...prev,
      theme: htmlElement.getAttribute('data-bs-theme') || 'dark'
    }));

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'data-bs-theme'
        ) {
          setFooterState(prev => ({
            ...prev,
            theme: htmlElement.getAttribute('data-bs-theme') || 'dark'
          }));
        }
      });
    });

    observer.observe(htmlElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  // Get navbar height for correct scrolling
  useEffect(() => {
    const navbar = document.querySelector('.navbar-main');
    if (navbar) {
      setFooterState(prev => ({
        ...prev,
        navbarHeight: navbar.offsetHeight
      }));
    }
  }, []);

  // Handler for smooth scrolling when clicking anchor links
  const smoothScrollToAnchor = (e) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href');
    if (targetId && targetId.startsWith('#')) {
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Account for navbar height when scrolling
        const offsetTop = targetElement.getBoundingClientRect().top + 
          window.pageYOffset - 
          footerState.navbarHeight - 20;
        
        // Use requestAnimationFrame for safe execution
        requestAnimationFrame(() => {
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        });
      }
    }
  };

  // Function to render social icons based on name
  const renderSocialIcon = (iconName) => {
    switch (iconName) {
      case 'twitter':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-twitter-x" viewBox="0 0 16 16">
            <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
          </svg>
        );
      case 'linkedin':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-linkedin" viewBox="0 0 16 16">
            <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2 3.226 2 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
          </svg>
        );
      default:
        return null;
    }
  };

  // Destructure for easier access
  const { theme, loading } = footerState;
  const { socialLinks, navigationLinks, supportLinks, contactEmail, copyright } = footerState.footerData;
  const { title, description } = footerState.globalSettings;

  // Memoize social links to reduce re-renders
  const socialLinksElements = useMemo(() => {
    return socialLinks.map((link, index) => (
      <a 
        key={index} 
        href={link.url} 
        aria-label={link.platform} 
        className="social-link"
        target="_blank"
        rel="noopener noreferrer"
      >
        {renderSocialIcon(link.icon)}
      </a>
    ));
  }, [socialLinks]);

  // Memoize navigation links to reduce re-renders
  const navigationLinksElements = useMemo(() => {
    return navigationLinks.map((item, index) => (
      <li key={index}>
        <a 
          href={item.href} 
          className="footer-link" 
          onClick={smoothScrollToAnchor}
        >
          {item.text}
        </a>
      </li>
    ));
  }, [navigationLinks]);

  // Memoize support links to reduce re-renders
  const supportLinksElements = useMemo(() => {
    return supportLinks.map((item, index) => (
      <li key={index}>
        <a 
          href={item.href} 
          className="footer-link" 
          onClick={smoothScrollToAnchor}
        >
          {item.text}
        </a>
      </li>
    ));
  }, [supportLinks]);

  if (loading) {
    return null; // Don't render anything while loading
  }

  return (
    <footer className={`site-footer ${theme === 'light' ? 'footer-light' : 'footer-dark'}`}>
      <div className="footer-top">
        <Container>
          <Row className="gy-4 gy-lg-0">
            <Col lg={4} md={6}>
              <div className="footer-brand">
                <Link href="/" className="footer-logo">
                  {title}
                </Link>
                <p className="footer-description">
                  {description}
                </p>
                <div className="social-links">
                  {socialLinksElements}
                </div>
              </div>
            </Col>
            
            <Col lg={2} md={6} xs={6}>
              <div className="footer-nav">
                <h5 className="footer-heading">Product</h5>
                <ul className="footer-links">
                  {navigationLinksElements}
                </ul>
              </div>
            </Col>
            
            <Col lg={3} md={6} xs={6}>
              <div className="footer-nav">
                <h5 className="footer-heading">Support</h5>
                <ul className="footer-links">
                  {supportLinksElements}
                </ul>
              </div>
            </Col>
            
            <Col lg={3} md={6}>
              <div className="footer-nav">
                <h5 className="footer-heading">Contact</h5>
                <div className="contact-info">
                  <p className="contact-email">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-envelope-fill" viewBox="0 0 16 16">
                      <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z"/>
                    </svg>
                    <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      
      <div className="footer-bottom">
        <Container>
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
            <p className="copyright mb-2 mb-md-0">
              {copyright}
            </p>
            <div className="legal-links">
              <a href="/privacy" className="legal-link">Privacy Policy</a>
              <a href="/terms" className="legal-link">Terms of Service</a>
            </div>
          </div>
        </Container>
      </div>
      
      <style jsx global>{`
        /* Основные стили футера */
        .site-footer {
          position: relative;
          font-size: 0.95rem;
          transition: all 0.3s ease;
        }
        
        /* Стили для темной темы */
        .footer-dark {
          background-color: #0f172a;
          color: rgba(255, 255, 255, 0.75);
        }
        
        /* Стили для светлой темы */
        .footer-light {
          background-color: #f1f5f9;
          color: #1e293b;
          box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.08);
        }
        
        /* Верхняя часть футера */
        .footer-top {
          padding: 4rem 0 3rem;
          position: relative;
        }
        
        /* Нижняя часть футера */
        .footer-bottom {
          padding: 1.5rem 0;
          position: relative;
        }
        
        .footer-dark .footer-bottom {
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .footer-light .footer-bottom {
          border-top: 1px solid rgba(0, 0, 0, 0.06);
        }
        
        /* Брендинг */
        .footer-brand {
          margin-bottom: 1.5rem;
        }
        
        .footer-logo {
          display: inline-block;
          font-size: 1.75rem;
          font-weight: 700;
          margin-bottom: 1rem;
          text-decoration: none;
          transition: all 0.2s ease;
          background: linear-gradient(90deg, #6366f1, #8b5cf6);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          -webkit-text-fill-color: transparent;
          position: relative;
        }
        
        .footer-logo:hover {
          transform: translateY(-2px);
          filter: brightness(1.1);
        }
        
        .footer-dark .footer-description {
          color: rgba(255, 255, 255, 0.7);
        }
        
        .footer-light .footer-description {
          color: #475569;
        }
        
        .footer-description {
          font-size: 0.95rem;
          margin-bottom: 1.5rem;
          line-height: 1.6;
          max-width: 320px;
        }
        
        /* Социальные ссылки */
        .social-links {
          display: flex;
          gap: 0.8rem;
          margin-bottom: 1rem;
        }
        
        .footer-dark .social-link {
          background-color: rgba(255, 255, 255, 0.08);
          color: rgba(255, 255, 255, 0.85);
        }
        
        .footer-light .social-link {
          background-color: rgba(0, 0, 0, 0.04);
          color: #475569;
        }
        
        .social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 8px;
          transition: all 0.3s ease;
        }
        
        .social-link:hover {
          background-color: #6366f1;
          color: white;
          transform: translateY(-3px);
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.25);
        }
        
        /* Заголовки в футере */
        .footer-dark .footer-heading {
          color: white;
        }
        
        .footer-light .footer-heading {
          color: #0f172a;
        }
        
        .footer-heading {
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 1.2rem;
          position: relative;
          letter-spacing: 0.01em;
        }
        
        .footer-heading::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 30px;
          height: 2px;
          background: linear-gradient(90deg, #6366f1, transparent);
          border-radius: 2px;
        }
        
        /* Группы навигационных ссылок */
        .footer-nav {
          margin-bottom: 1.5rem;
        }
        
        .footer-links {
          list-style: none;
          padding-left: 0;
          margin-bottom: 0;
        }
        
        .footer-links li {
          margin-bottom: 0.75rem;
        }
        
        .footer-dark .footer-link {
          color: rgba(255, 255, 255, 0.7);
        }
        
        .footer-light .footer-link {
          color: #475569;
        }
        
        .footer-link {
          text-decoration: none;
          transition: all 0.2s ease;
          position: relative;
            display: inline-block;
          padding: 2px 0;
        }
        
        .footer-dark .footer-link:hover {
          color: white;
        }
        
        .footer-light .footer-link:hover {
          color: #6366f1;
        }
        
        .footer-link:hover {
          transform: translateX(3px);
        }
        
        .footer-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1px;
          background-color: #6366f1;
          transition: width 0.3s ease;
        }
        
        .footer-link:hover::after {
          width: 100%;
        }
        
        /* Контактная информация */
        .contact-info {
          margin-bottom: 1rem;
        }
        
        .contact-email {
          display: flex;
          align-items: center;
          gap: 0.7rem;
          margin-bottom: 0.75rem;
        }
        
        .footer-dark .contact-email a {
          color: rgba(255, 255, 255, 0.7);
        }
        
        .footer-light .contact-email a {
          color: #475569;
        }
        
        .contact-email a {
          text-decoration: none;
          transition: all 0.2s ease;
          position: relative;
        }
        
        .footer-dark .contact-email a:hover {
          color: white;
        }
        
        .footer-light .contact-email a:hover {
          color: #6366f1;
        }
        
        .contact-email a::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1px;
          background-color: #6366f1;
          transition: width 0.3s ease;
        }
        
        .contact-email a:hover::after {
          width: 100%;
        }
        
        .contact-email svg {
          flex-shrink: 0;
          color: #6366f1;
        }
        
        /* Copyright и легальные ссылки */
        .footer-dark .copyright {
          color: rgba(255, 255, 255, 0.6);
        }
        
        .footer-light .copyright {
          color: #64748b;
        }
        
        .copyright {
          font-size: 0.85rem;
          margin-bottom: 0;
        }
        
        .legal-links {
          display: flex;
          justify-content: flex-end;
          gap: 1.5rem;
        }
        
        .footer-dark .legal-link {
          color: rgba(255, 255, 255, 0.6);
        }
        
        .footer-light .legal-link {
          color: #64748b;
        }
        
        .legal-link {
          font-size: 0.85rem;
          text-decoration: none;
          transition: all 0.2s ease;
          position: relative;
        }
        
        .footer-dark .legal-link:hover {
          color: white;
        }
        
        .footer-light .legal-link:hover {
          color: #6366f1;
        }
        
        .legal-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1px;
          background-color: currentColor;
          transition: width 0.3s ease;
        }
        
        .legal-link:hover::after {
          width: 100%;
        }
        
        /* Адаптивность */
        @media (max-width: 991.98px) {
          .footer-top {
            padding: 3.5rem 0 2rem;
          }
          
          .footer-brand {
            margin-bottom: 2rem;
          }
          
          .footer-description {
            max-width: 100%;
          }
        }
        
        @media (max-width: 767.98px) {
          .footer-top {
            padding: 3rem 0 1.5rem;
          }
          
          .footer-nav {
            margin-bottom: 2rem;
          }
          
          .legal-links {
            justify-content: flex-start;
            margin-top: 1rem;
            gap: 1rem;
            flex-wrap: wrap;
          }
          
          .copyright {
            text-align: center;
          }
          
          .legal-links {
            justify-content: center;
          }
        }
      `}</style>
    </footer>
  );
} 