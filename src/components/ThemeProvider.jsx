'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { useState, useEffect } from 'react';

export default function ThemeProvider({ children }) {
  // Use useState to track if the component is mounted
  const [mounted, setMounted] = useState(false);
  const [disableTransitions, setDisableTransitions] = useState(true);

  // Set mounted to true when component mounts
  useEffect(() => {
    // Добавляем класс для блокировки переходов при начальной загрузке
    document.documentElement.classList.add('no-transitions');
    
    // Предустанавливаем стили для предотвращения CLS
    const setInitialStyleProps = () => {
      if (typeof window !== 'undefined') {
        // Устанавливаем CSS-переменную для контроля загрузки
        document.documentElement.style.setProperty('--initial-load', '1');
        
        // Убедимся, что трансформация применяется до гидратации
        const dashboards = document.querySelectorAll('.dashboard-container');
        dashboards.forEach((el) => {
          if (window.innerWidth > 992) {
            el.style.transform = "perspective(1000px) rotateY(-8deg) rotateX(5deg) rotate(1deg)";
          } else {
            el.style.transform = "none";
          }
        });
      }
    };
    
    setInitialStyleProps();
    setMounted(true);
    
    // Включаем переходы через небольшую задержку после загрузки
    // Это предотвращает начальное мерцание при загрузке страницы
    const timer = setTimeout(() => {
      setDisableTransitions(false);
      document.documentElement.classList.remove('no-transitions');
      document.documentElement.style.setProperty('--initial-load', '0');
    }, 300);
    
    return () => clearTimeout(timer);
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
      disableTransitionOnChange={disableTransitions} // Disable transitions only at initial load
      onChangeStart={() => document.documentElement.classList.add('theme-transition')}
      onChangeComplete={() => {
        // Удаляем класс theme-transition после завершения перехода
        setTimeout(() => {
          document.documentElement.classList.remove('theme-transition');
        }, 600); // Чуть больше времени чем тема-переход для надежности
      }}
    >
      {children}
    </NextThemesProvider>
  );
} 