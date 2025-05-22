'use client';

import { useEffect } from 'react';

export default function ThemeProvider({ children }) {
  // Apply light theme on mount
  useEffect(() => {
    // Set light theme
    document.documentElement.setAttribute('data-bs-theme', 'light');
    
    // Remove any transition classes that might be present
    document.documentElement.classList.remove('theme-transition');
    document.documentElement.classList.remove('no-transitions');
    
    // Clear any theme from localStorage to prevent conflicts
    if (typeof window !== 'undefined') {
      localStorage.removeItem('theme');
    }
  }, []);

  return <>{children}</>;
} 