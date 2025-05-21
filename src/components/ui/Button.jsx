'use client';

import Link from 'next/link';
import React from 'react';

/**
 * Universal button component that supports both regular buttons and link buttons.
 * Supports various style variants and sizes.
 * 
 * Variants:
 * - primary: Deep Blue (#0052CC) - Default, used for most buttons
 * - secondary: Outlined version of primary
 * - white: White background with primary text
 * - dark: Dark slate background with white text
 * - action: Warm Coral (#FF6F61) - For key CTAs and important actions
 */
const Button = ({
  children,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  startIcon,
  endIcon,
  isIconOnly = false,
  disabled = false,
  onClick,
  type = 'button',
  ...props
}) => {
  // Define base class
  const baseClass = 'btn';
  
  // Define classes based on variant
  const variantClass = `btn-${variant}`;
  
  // Define classes based on size
  const sizeClass = size === 'lg' ? 'btn-lg' : size === 'sm' ? 'btn-sm' : '';
  
  // Define class for button with icon
  const iconClass = startIcon || endIcon ? 'btn-icon' : '';
  const iconOnlyClass = isIconOnly ? 'btn-icon-only' : '';
  
  // Combine all classes together
  const classes = [
    baseClass,
    variantClass,
    sizeClass,
    iconClass,
    iconOnlyClass,
    className,
  ].filter(Boolean).join(' ');
  
  // If we have href, render Link
  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        {...props}
      >
        {startIcon && <span className="btn-icon-start">{startIcon}</span>}
        {!isIconOnly && children}
        {endIcon && <span className="btn-icon-end">{endIcon}</span>}
      </Link>
    );
  }
  
  // Otherwise render button
  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {startIcon && <span className="btn-icon-start">{startIcon}</span>}
      {!isIconOnly && children}
      {endIcon && <span className="btn-icon-end">{endIcon}</span>}
    </button>
  );
};

export default Button; 