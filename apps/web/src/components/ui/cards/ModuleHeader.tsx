'use client';

import React, { useState } from 'react';
import { LucideIcon, HelpCircle, X } from 'lucide-react';

export interface GlossaryItem {
  term?: string;
  description: string;
}

export interface HeaderBadge {
  label: string;
  variant?: 'sky' | 'emerald' | 'amber' | 'rose' | 'slate' | 'purple';
}

export interface ModuleHeaderProps {
  title: string;
  icon?: LucideIcon;
  iconBgColor?: string;
  glossaryTitle?: string;
  glossaryItems?: (GlossaryItem | string)[];
  badges?: HeaderBadge[];
  actions?: React.ReactNode;
  children?: React.ReactNode;
}

const badgeVariantStyles: Record<NonNullable<HeaderBadge['variant']>, string> = {
  sky: 'bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-800',
  emerald: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
  amber: 'bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800',
  rose: 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800',
  slate: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700',
  purple: 'bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800'
};

export const ModuleHeader: React.FC<ModuleHeaderProps> = ({
  title,
  icon: Icon,
  iconBgColor = 'bg-sky-500/10 text-sky-600 dark:text-sky-400',
  glossaryTitle,
  glossaryItems,
  badges,
  actions,
  children
}) => {
  const [showGlossary, setShowGlossary] = useState(false);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm text-xs">
      {/* Title & Glossary Left Slot */}
      <div className="flex items-center gap-2.5">
        {Icon && (
          <div className={`p-2.5 rounded-xl shrink-0 ${iconBgColor}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}

        <div>
          <h1 className="text-base font-bold text-slate-900 dark:text-white leading-tight flex items-center gap-2">
            <span>{title}</span>
          </h1>
        </div>

        {/* Universal Glossary Popover */}
        {glossaryItems && glossaryItems.length > 0 && (
          <div className="relative">
            <button
              onClick={() => setShowGlossary(!showGlossary)}
              className="text-slate-400 hover:text-sky-500 transition-colors p-1 cursor-pointer"
              title="Informasi & Glossary Modul"
            >
              <HelpCircle className="w-4 h-4" />
            </button>

            {showGlossary && (
              <div className="absolute left-0 top-7 z-40 w-80 sm:w-96 p-4 bg-slate-900 text-white rounded-2xl shadow-xl text-xs space-y-2 border border-slate-700">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2 font-bold text-sky-400">
                  <span>{glossaryTitle || `Glossary ${title}`}</span>
                  <button onClick={() => setShowGlossary(false)} className="text-slate-400 hover:text-white cursor-pointer">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="space-y-2 text-[11px] text-slate-300">
                  {glossaryItems.map((item, idx) => (
                    <p key={idx}>
                      {typeof item === 'string' ? (
                        item
                      ) : (
                        <>
                          {item.term && <strong>{item.term}: </strong>}
                          {item.description}
                        </>
                      )}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Badges & Actions Right Slot */}
      <div className="flex items-center gap-2 flex-wrap shrink-0">
        {badges && badges.map((b, idx) => (
          <span
            key={idx}
            className={`px-3 py-1 font-bold rounded-xl border font-mono text-[11px] ${
              badgeVariantStyles[b.variant || 'sky']
            }`}
          >
            {b.label}
          </span>
        ))}

        {actions}
        {children}
      </div>
    </div>
  );
};
