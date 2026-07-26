'use client';

import React from 'react';
import { Search, Filter } from 'lucide-react';

export interface FilterOption {
  label: string;
  value: string;
}

export interface DynamicSearchFilterProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  categoryValue?: string;
  onCategoryChange?: (value: string) => void;
  categoryOptions?: FilterOption[];
  categoryPlaceholder?: string;
  statusValue?: string;
  onStatusChange?: (value: string) => void;
  statusOptions?: FilterOption[];
  showPills?: boolean;
  colorScheme?: string;
}

export const DynamicSearchFilter: React.FC<DynamicSearchFilterProps> = ({
  searchQuery,
  onSearchChange,
  searchPlaceholder = 'Cari data...',
  categoryValue,
  onCategoryChange,
  categoryOptions = [],
  categoryPlaceholder = 'Semua Kategori',
  statusValue,
  onStatusChange,
  statusOptions = [],
  showPills = false
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full">
      {/* Search Input Bar */}
      <div className="relative flex-1 w-full">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={searchPlaceholder}
          className="w-full pl-10 pr-4 py-2.5 bg-slate-50/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 rounded-2xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-sky-500/50 text-slate-800 dark:text-slate-100 placeholder-slate-400 transition-all shadow-sm"
        />
      </div>

      {/* Dynamic Category Dropdown */}
      {onCategoryChange && (
        <div className="relative w-full sm:w-auto shrink-0">
          <Filter className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none z-10" />
          <select
            value={categoryValue || 'ALL'}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full sm:w-auto pl-9 pr-8 py-2.5 bg-slate-50/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 rounded-2xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-sky-500/50 text-slate-800 dark:text-slate-100 cursor-pointer appearance-none shadow-sm"
          >
            <option value="ALL">{categoryPlaceholder}</option>
            {categoryOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-[10px]">
            ▼
          </div>
        </div>
      )}

      {/* Dynamic Status Dropdown */}
      {onStatusChange && statusOptions.length > 0 && (
        <div className="relative w-full sm:w-auto shrink-0">
          <select
            value={statusValue || 'ALL'}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full sm:w-auto px-4 py-2.5 bg-slate-50/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 rounded-2xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-sky-500/50 text-slate-800 dark:text-slate-100 cursor-pointer shadow-sm"
          >
            <option value="ALL">Semua Status</option>
            {statusOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};
