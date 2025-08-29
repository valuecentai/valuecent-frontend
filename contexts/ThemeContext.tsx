import React, { createContext, useState, useContext, useEffect } from 'react';

export type Theme = 'light' | 'dark' | 'system';
type EffectiveTheme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  effectiveTheme: EffectiveTheme;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * Provides theme state and functionality to its children.
 * Manages theme switching, persistence in localStorage, and synchronization
 * with the operating system's theme preference.
 */
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem('theme') as Theme) || 'system';
  });
  const [effectiveTheme, setEffectiveTheme] = useState<EffectiveTheme>('light');

  useEffect(() => {
    const root = window.document.documentElement;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const themeMetaTag = document.querySelector('meta[name="theme-color"]');

    const applyTheme = (currentTheme: Theme) => {
      const isDark =
        currentTheme === 'dark' ||
        (currentTheme === 'system' && mediaQuery.matches);
      
      root.classList.toggle('dark', isDark);
      setEffectiveTheme(isDark ? 'dark' : 'light');
      localStorage.setItem('theme', currentTheme);

      if (themeMetaTag) {
        themeMetaTag.setAttribute('content', isDark ? '#121212' : '#F9FAFB');
      }
    };

    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      if (theme === 'system') {
        applyTheme('system');
      }
    };

    applyTheme(theme);

    mediaQuery.addEventListener('change', handleSystemThemeChange);

    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, effectiveTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Custom hook to easily access the theme context.
 */
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};