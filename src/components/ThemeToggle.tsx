'use client';

import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  variant?: 'icon' | 'dropdown-item' | 'pill';
  className?: string;
}

export function ThemeToggle({ variant = 'icon', className = '' }: ThemeToggleProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const isDark = document.documentElement.classList.contains('dark');
    setTheme(isDark ? 'dark' : 'light');

    // Listen for theme changes across components
    const handleThemeChange = () => {
      const darkNow = document.documentElement.classList.contains('dark');
      setTheme(darkNow ? 'dark' : 'light');
    };

    window.addEventListener('theme-changed', handleThemeChange);
    return () => window.removeEventListener('theme-changed', handleThemeChange);
  }, []);

  const toggleTheme = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);

    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      localStorage.setItem('peerloop_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      localStorage.setItem('peerloop_theme', 'light');
    }

    window.dispatchEvent(new Event('theme-changed'));
  };

  if (!mounted) {
    if (variant === 'dropdown-item') {
      return (
        <div className="w-full h-8 px-3 py-2 flex items-center justify-between text-xs text-slate-400">
          <span>Theme</span>
          <div className="w-6 h-3 bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse" />
        </div>
      );
    }
    return (
      <div className={`w-8 h-8 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 ${className}`} />
    );
  }

  if (variant === 'dropdown-item') {
    return (
      <button
        onClick={toggleTheme}
        type="button"
        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${className}`}
      >
        <span className="flex items-center gap-2">
          {theme === 'dark' ? (
            <Sun className="w-3.5 h-3.5 text-amber-400" />
          ) : (
            <Moon className="w-3.5 h-3.5 text-slate-500" />
          )}
          <span>Appearance</span>
        </span>
        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
          {theme === 'dark' ? 'Dark' : 'Light'}
        </span>
      </button>
    );
  }

  if (variant === 'pill') {
    return (
      <button
        onClick={toggleTheme}
        type="button"
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-all shadow-xs ${className}`}
        title={`Current: ${theme === 'dark' ? 'Dark' : 'Light'} mode. Click to toggle.`}
      >
        {theme === 'dark' ? (
          <>
            <Sun className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[11px]">Dark Mode</span>
          </>
        ) : (
          <>
            <Moon className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-[11px]">Light Mode</span>
          </>
        )}
      </button>
    );
  }

  // Default 'icon' variant for header
  return (
    <button
      onClick={toggleTheme}
      type="button"
      className={`p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-800/90 text-slate-600 dark:text-amber-400 hover:bg-slate-100 dark:hover:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-all shadow-2xs flex items-center justify-center group ${className}`}
      title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Theme`}
      aria-label="Toggle Dark / Light Theme"
    >
      {theme === 'dark' ? (
        <Sun className="w-4 h-4 text-amber-400 group-hover:rotate-45 transition-transform" />
      ) : (
        <Moon className="w-4 h-4 text-slate-600 group-hover:-rotate-12 transition-transform" />
      )}
    </button>
  );
}
