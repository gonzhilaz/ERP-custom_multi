import React from 'react';

export const SkeletonCard = () => (
  <div className="p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 animate-pulse space-y-3">
    <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/3"></div>
    <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded w-2/3"></div>
    <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-1/2"></div>
  </div>
);
