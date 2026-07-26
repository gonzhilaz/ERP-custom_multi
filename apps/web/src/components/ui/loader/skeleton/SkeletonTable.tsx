import React from 'react';

export const SkeletonTable = () => (
  <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 animate-pulse space-y-4">
    <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-1/4 mb-4"></div>
    {[1, 2, 3, 4, 5].map((i) => (
      <div key={i} className="flex gap-4">
        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded flex-1"></div>
        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded flex-1"></div>
        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-24"></div>
      </div>
    ))}
  </div>
);
