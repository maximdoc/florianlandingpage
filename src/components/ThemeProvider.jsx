'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { useState, useEffect } from 'react';

export default function ThemeProvider({ children }) {
  // Use useState to track if the component is mounted
  const [mounted, setMounted] = useState(false);

  // Set mounted to true when component mounts
  useEffect(() => {
    setMounted(true);
  }, []);

  // Remove duplicate script injection that was causing hydration errors
  // The script in layout.tsx already handles the initial theme setting

  // Avoid rendering with server-side theme to prevent hydration mismatch
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <NextThemesProvider
      attribute="data-bs-theme" // The HTML attribute to apply the theme with
      defaultTheme="system" // Default to system preference
      enableSystem={true} // Enable system preference
      storageKey="theme" // Key to use for localStorage
      themes={['light', 'dark']} // Available themes
      disableTransitionOnChange={false} // Enable transitions when theme changes
    >
      {children}
    </NextThemesProvider>
  );
} 