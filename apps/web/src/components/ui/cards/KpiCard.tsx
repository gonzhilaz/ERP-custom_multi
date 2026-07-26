import React from 'react';

interface KpiCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: any;
  iconBgColor?: string;
  valueColor?: string;
}

export const KpiCard: React.FC<KpiCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  iconBgColor = 'bg-sky-50 text-sky-600 dark:bg-sky-950/50',
  valueColor = 'text-slate-900 dark:text-white'
}) => {
  return (
    <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{title}</span>
        <div className={`p-2 rounded-xl ${iconBgColor}`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>
      <div className="mt-3">
        <div className={`text-2xl font-bold ${valueColor}`}>{value}</div>
        <div className="flex items-center gap-1 mt-1 text-[11px] font-semibold text-slate-500">
          <span>{subtitle}</span>
        </div>
      </div>
    </div>
  );
};
