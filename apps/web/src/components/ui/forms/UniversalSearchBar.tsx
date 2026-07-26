'use client';

import React, { useRef } from 'react';
import { Search, X } from 'lucide-react';

interface UniversalSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  shortcutHint?: string;
}

export const UniversalSearchBar: React.FC<UniversalSearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Cari kata kunci master data...',
  className = '',
  shortcutHint
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClear = () => {
    onChange('');
    inputRef.current?.focus();
  };

  return (
    <div className={`relative flex items-center w-full ${className}`}>
      <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 focus:border-emerald-500 dark:focus:border-emerald-500 rounded-xl pl-9 pr-9 py-2 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all font-medium"
      />
      {value ? (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer rounded-md"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      ) : shortcutHint ? (
        <kbd className="hidden sm:inline-block absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-200/50 dark:bg-slate-700/50 rounded border border-slate-300/50 dark:border-slate-600/50 pointer-events-none">
          {shortcutHint}
        </kbd>
      ) : null}
    </div>
  );
};
