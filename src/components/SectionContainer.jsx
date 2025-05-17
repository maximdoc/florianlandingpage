'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * SectionContainer - A wrapper component for all page sections
 * This component ensures proper background color alternation
 * 
 * @param {object} props Component props
 * @param {React.ReactNode} props.children - Content to display inside the section
 * @param {string} props.className - Additional CSS classes to apply
 * @param {string} props.id - ID attribute for the section
 * @param {string} props.backgroundVariant - Optional override for background style ('light' or 'dark')
 * @param {object} props.style - Additional inline styles
 */
export default function SectionContainer({ 
  children, 
  className = '', 
  id,
  backgroundVariant,
  style = {},
  ...rest 
}) {
  const sectionRef = useRef(null);
  const [theme, setTheme] = useState('dark');
  
  useEffect(() => {
    // Get initial theme
    const htmlElement = document.documentElement;
    setTheme(htmlElement.getAttribute('data-bs-theme') || 'dark');

    // Listen for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'data-bs-theme'
        ) {
          setTheme(htmlElement.getAttribute('data-bs-theme') || 'dark');
        }
      });
    });

    // Start observing
    observer.observe(htmlElement, { attributes: true });
    
    // Apply background variant if specified
    applyBackgroundVariant();
    
    // Cleanup
    return () => observer.disconnect();
  }, [backgroundVariant, theme]);
  
  const applyBackgroundVariant = () => {
    if (sectionRef.current) {
      // Set background color based on variant
      if (backgroundVariant === 'light') {
        sectionRef.current.style.backgroundColor = 'var(--section-bg-light)';
      } else if (backgroundVariant === 'dark') {
        sectionRef.current.style.backgroundColor = 'var(--section-bg-dark)';
      }
    }
  };

  // Define base styles to prevent layout shifts
  const baseStyles = {
    position: 'relative',
    width: '100%', 
    display: 'block',
    overflow: 'hidden',
    minHeight: style.minHeight || '100px', // Set a default minimum height
    paddingTop: style.padding ? style.padding : (style.paddingTop || '5rem'),
    paddingBottom: style.padding ? style.padding : (style.paddingBottom || '5rem'),
    boxSizing: 'border-box', // Ensure padding is included in width calculation
    ...style
  };
  
  return (
    <section 
      ref={sectionRef}
      id={id}
      className={`section-container ${className}`}
      style={baseStyles}
      data-section-container
      {...rest}
    >
      {children}
    </section>
  );
} 