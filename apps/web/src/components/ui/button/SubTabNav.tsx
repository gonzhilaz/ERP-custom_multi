'use client';

import React from 'react';
import { LucideIcon, Plus, Tag } from 'lucide-react';

export interface SubTabItem {
  id: string;
  label: string;
  icon?: LucideIcon;
  count?: number;
  isAction?: boolean;
}

interface Props {
  activeTab: string;
  onTabChange: (tabId: any) => void;
  tabs: SubTabItem[];
  colorScheme?: 'sky' | 'indigo' | 'amber' | 'emerald';
}

export const SubTabNav: React.FC<Props> = ({
  activeTab,
  onTabChange,
  tabs,
  colorScheme = 'sky'
}) => {
  const activeColorClasses = {
    sky: 'bg-white dark:bg-slate-900 text-sky-600 dark:text-sky-400 shadow-sm',
    indigo: 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm',
    amber: 'bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-400 shadow-sm',
    emerald: 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm'
  };

  const actionColorClasses = {
    sky: 'bg-sky-600 text-white shadow-sm hover:bg-sky-500',
    indigo: 'bg-indigo-600 text-white shadow-sm hover:bg-indigo-500',
    amber: 'bg-amber-500 text-slate-950 shadow-sm hover:bg-amber-400',
    emerald: 'bg-emerald-600 text-white shadow-sm hover:bg-emerald-500'
  };

  return (
    <div className="flex items-center gap-1.5 p-1 bg-slate-200/60 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 shrink-0">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        if (tab.isAction) {
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                isActive
                  ? actionColorClasses[colorScheme]
                  : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-300/50 dark:hover:bg-slate-700/50'
              }`}
            >
              {Icon && <Icon className="w-4 h-4" />}
              <span>{tab.label}</span>
            </button>
          );
        }

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              isActive
                ? activeColorClasses[colorScheme]
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {Icon && <Icon className="w-4 h-4" />}
            <span>
              {tab.label}
              {tab.count !== undefined && ` (${tab.count})`}
            </span>
          </button>
        );
      })}
    </div>
  );
};
