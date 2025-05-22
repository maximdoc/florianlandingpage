/**
 * Utility functions for SVG handling
 */

/**
 * Force repaint of SVG icons to ensure proper coloring
 * @param {string} selector - CSS selector for SVGs to repaint (default: 'svg')
 */
export const refreshIconColors = (selector = 'svg') => {
  const iconElements = document.querySelectorAll(selector);
  iconElements.forEach(icon => {
    // Store original transform
    const originalTransform = icon.style.transform;
    
    // Force hardware acceleration to trigger repaint
    icon.style.transform = 'translateZ(0)';
    
    // Reset to original state after a short delay
    setTimeout(() => {
      icon.style.transform = originalTransform;
    }, 10);
  });
};

/**
 * Manages theme transition by adding/removing theme-transition class
 * @param {Function} callback - Callback to run during transition (e.g., theme change)
 * @param {number} duration - Duration in ms to wait before removing transition class
 */
export const handleThemeTransition = (callback, duration = 700) => {
  // Add transition class
  document.documentElement.classList.add('theme-transition');
  
  // Run callback if provided
  if (callback && typeof callback === 'function') {
    callback();
  }
  
  // Remove transition class after animation completes
  setTimeout(() => {
    document.documentElement.classList.remove('theme-transition');
    // Refresh icon colors after transition completes
    refreshIconColors();
  }, duration);
};

/**
 * Get current theme or detect from system preference
 * @returns {string} 'dark' or 'light'
 */
export const getCurrentTheme = () => {
  try {
    // Try to get from localStorage
    let theme = localStorage.getItem('theme');
    
    // If using system preference or no theme set
    if (!theme || theme === 'system') {
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      theme = systemPrefersDark ? 'dark' : 'light';
    }
    
    return theme;
  } catch (e) {
    // Fallback to dark theme
    return 'dark';
  }
};

/**
 * Add a mutation observer to watch for theme changes
 * @param {Function} callback - Callback to run when theme changes
 * @returns {MutationObserver} The observer instance
 */
export const addThemeChangeObserver = (callback) => {
  if (typeof window === 'undefined') return null;
  
  const htmlElement = document.documentElement;
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (
        mutation.type === 'attributes' &&
        mutation.attributeName === 'data-bs-theme'
      ) {
        const newTheme = htmlElement.getAttribute('data-bs-theme') || 'dark';
        if (callback && typeof callback === 'function') {
          callback(newTheme);
        }
      }
    });
  });
  
  // Start observing
  observer.observe(htmlElement, { attributes: true });
  
  return observer;
}; 