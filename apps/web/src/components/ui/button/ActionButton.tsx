'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ActionButtonProps {
  label: string;
  icon?: LucideIcon;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  disabled?: boolean;
}

export function ActionButton({
  label,
  icon: Icon,
  onClick,
  type = 'button',
  className = '',
  disabled = false
}: ActionButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-[11px] rounded-lg transition active:scale-95 disabled:opacity-50 disabled:pointer-events-none ${className}`}
    >
      {Icon && <Icon className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />}
      <span>{label}</span>
    </button>
  );
}
