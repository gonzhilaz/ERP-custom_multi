'use client';

import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useThemeContext } from '@/context/ThemeContext';

export const ThemeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useThemeContext();

  return (
    <button
      onClick={toggleDarkMode}
      className="flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
    >
      {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
      <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
    </button>
  );
};
