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
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
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
    ...style,
    // Apply background color directly in the style object
    ...(backgroundVariant === 'light' ? { backgroundColor: 'var(--section-bg-light)' } : {}),
    ...(backgroundVariant === 'dark' ? { backgroundColor: 'var(--section-bg-dark)' } : {})
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