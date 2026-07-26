import React from 'react';

interface StatusBadgeProps {
  type: 'ASSET' | 'LIABILITY' | 'EQUITY' | 'REVENUE' | 'EXPENSE' | 'ACTIVE' | 'ALERT' | 'APPROVED' | 'PENDING' | string;
  label?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ type, label }) => {
  const displayLabel = label || type;

  let colorClasses = 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300';

  if (type === 'ASSET' || type === 'APPROVED' || type === 'ACTIVE') {
    colorClasses = 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300';
  } else if (type === 'LIABILITY' || type === 'ALERT' || type === 'WAITING_APPROVAL_DIREKTUR') {
    colorClasses = 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300';
  } else if (type === 'REVENUE') {
    colorClasses = 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300';
  } else if (type === 'EXPENSE') {
    colorClasses = 'bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300';
  }

  return (
    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${colorClasses}`}>
      {displayLabel}
    </span>
  );
};
