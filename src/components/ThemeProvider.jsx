'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { useState, useEffect, useCallback } from 'react';
import { handleThemeTransition, refreshIconColors, getCurrentTheme } from '@/utils/themeUtils';

export default function ThemeProvider({ children }) {
  // Use useState to track if the component is mounted
  const [mounted, setMounted] = useState(false);
  const [disableTransitions, setDisableTransitions] = useState(true);
  const [initialTheme, setInitialTheme] = useState(null);

  // Set mounted to true when component mounts
  useEffect(() => {
    // Add class to block transitions during initial load
    document.documentElement.classList.add('no-transitions');
    
    // Set initial styles to prevent CLS (Content Layout Shift)
    const setInitialStyleProps = () => {
      if (typeof window !== 'undefined') {
        // Set CSS variable to control loading visibility
        document.documentElement.style.setProperty('--initial-load', '1');
        
        // Ensure transformations are applied before hydration
        const dashboards = document.querySelectorAll('.dashboard-container');
        dashboards.forEach((el) => {
          if (window.innerWidth > 992) {
            el.style.transform = "perspective(1000px) rotateY(-8deg) rotateX(5deg) rotate(1deg)";
          } else {
            el.style.transform = "none";
          }
        });
        
        // Get initial theme
        const theme = getCurrentTheme();
        setInitialTheme(theme);
      }
    };
    
    setInitialStyleProps();
    setMounted(true);
    
    // Enable transitions after a short delay after loading
    // This prevents initial flashing when the page loads
    const timer = setTimeout(() => {
      setDisableTransitions(false);
      document.documentElement.classList.remove('no-transitions');
      document.documentElement.style.setProperty('--initial-load', '0');
      
      // Force repaint of all SVG icons after theme is applied
      refreshIconColors();
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  // Listen for system color scheme changes
  useEffect(() => {
    if (!mounted) return;
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleMediaChange = (e) => {
      const theme = localStorage.getItem('theme');
      // Only update if the user has selected system theme
      if (theme === 'system') {
        handleThemeTransition();
      }
    };
    
    mediaQuery.addEventListener('change', handleMediaChange);
    return () => mediaQuery.removeEventListener('change', handleMediaChange);
  }, [mounted]);

  // Avoid rendering with server-side theme to prevent hydration mismatch
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <NextThemesProvider
      attribute="data-bs-theme" // The HTML attribute to apply the theme with
      defaultTheme={initialTheme || "system"} // Use detected theme or system preference
      enableSystem={true} // Enable system preference
      storageKey="theme" // Key to use for localStorage
      themes={['light', 'dark']} // Available themes
      disableTransitionOnChange={disableTransitions} // Disable transitions only at initial load
      onChangeStart={() => document.documentElement.classList.add('theme-transition')}
      onChangeComplete={(theme) => {
        // Apply additional logic for specific theme updates
        setTimeout(() => {
          // Force repaint of SVG icons across the site
          refreshIconColors();
          
          // Remove the transition class
          document.documentElement.classList.remove('theme-transition');
        }, 600);
      }}
    >
      {children}
    </NextThemesProvider>
  );
} 