'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
  isProjectModalOpen: boolean;
  setProjectModalOpen: (isOpen: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    // Simpan preference ke localStorage
    localStorage.setItem('theme', !isDark ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, isProjectModalOpen, setProjectModalOpen: setIsProjectModalOpen }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme harus digunakan dalam ThemeProvider');
  }
  return context;
}
