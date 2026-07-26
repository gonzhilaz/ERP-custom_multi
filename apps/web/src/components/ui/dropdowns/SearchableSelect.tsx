'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, Check, X } from 'lucide-react';

export interface SearchSelectOption {
  id: string | number;
  label: string;
  subLabel?: string;
  badge?: string;
}

interface SearchableSelectProps {
  options: SearchSelectOption[];
  value: string | number;
  onChange: (selectedId: any) => void;
  placeholder?: string;
  label?: string;
  className?: string;
  disabled?: boolean;
}

export const SearchableSelect: React.FC<SearchableSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Pilih atau ketik kata kunci pencarian...',
  label,
  className = '',
  disabled = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => String(opt.id) === String(value));

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter options based on search query (case-insensitive)
  const filteredOptions = options.filter(
    (opt) =>
      opt.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (opt.subLabel && opt.subLabel.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (opt.badge && opt.badge.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div ref={dropdownRef} className={`relative w-full text-xs ${className}`}>
      {label && (
        <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
          {label}
        </label>
      )}

      {/* Trigger Box */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 rounded-xl text-left flex items-center justify-between transition-all shadow-sm ${
          disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
        }`}
      >
        <span className="truncate font-medium text-slate-900 dark:text-white">
          {selectedOption ? (
            <span className="flex items-center gap-2 truncate">
              <span className="truncate font-bold">{selectedOption.label}</span>
              {selectedOption.subLabel && (
                <span className="text-slate-400 font-normal text-[11px] truncate">({selectedOption.subLabel})</span>
              )}
            </span>
          ) : (
            <span className="text-slate-400 font-normal">{placeholder}</span>
          )}
        </span>
        <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 ml-1" />
      </button>

      {/* Floating Quick Search Popover Dropdown */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-1.5 z-50 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden p-2 space-y-2 animate-in fade-in-50 duration-100 min-w-[320px]">
          {/* Quick Search Live Input */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari kata kunci master data..."
              autoFocus
              className="w-full pl-8 pr-7 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 font-medium"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Options List View */}
          <div className="max-h-60 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800 pr-1">
            {filteredOptions.length > 0 ? (
              filteredOptions.slice(0, 100).map((opt) => {
                const isSelected = String(opt.id) === String(value);
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => {
                      onChange(opt.id);
                      setIsOpen(false);
                      setSearchQuery('');
                    }}
                    className={`w-full px-3 py-2 text-left flex items-center justify-between rounded-xl transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-50 dark:bg-slate-800 text-emerald-700 dark:text-emerald-400 font-bold'
                        : 'hover:bg-slate-100 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div className="flex flex-col truncate pr-2">
                      <span className="truncate text-xs font-bold text-slate-900 dark:text-white">
                        {opt.label}
                      </span>
                      {opt.subLabel && (
                        <span className="text-[10px] text-slate-400 font-normal truncate">
                          {opt.subLabel}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      {opt.badge && (
                        <span className="px-2 py-0.5 bg-slate-500/10 text-slate-600 font-mono text-[10px] rounded font-bold">
                          {opt.badge}
                        </span>
                      )}
                      {isSelected && <Check className="w-4 h-4 text-emerald-600 shrink-0" />}
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="p-4 text-center text-slate-400 text-xs">
                Tidak ada data yang cocok dengan &quot;{searchQuery}&quot;
              </div>
            )}
          </div>
          {filteredOptions.length > 100 && (
            <div className="text-[10px] text-center text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800">
              Menampilkan 100 hasil pertama. Persempit pencarian Anda.
            </div>
          )}
        </div>
      )}
    </div>
  );
};
