'use client';

import React from 'react';

interface StatusBadgeProps {
  type: string;
  label?: string;
  className?: string;
}

export function StatusBadge({ type, label, className = '' }: StatusBadgeProps) {
  const colorMap: Record<string, string> = {
    ACTIVE: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
    SUCCESS: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
    APPROVED: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
    WARNING: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30',
    ALERT: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30',
    PENDING: 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/30',
    INFO: 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/30',
    DRAFT: 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/30',
    NEUTRAL: 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/30',
    ERROR: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/30',
    REJECTED: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/30',
    CANCELLED: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/30'
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full border ${colorMap[type] || colorMap.DRAFT} ${className}`}
    >
      {label || type}
    </span>
  );
}
