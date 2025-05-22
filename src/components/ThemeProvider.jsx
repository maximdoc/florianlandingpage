'use client';

import { useEffect } from 'react';

export default function ThemeProvider({ children }) {
  // Apply light theme on mount
  useEffect(() => {
    // Set light theme
    document.documentElement.setAttribute('data-bs-theme', 'light');
  }, []);

  return <>{children}</>;
} 