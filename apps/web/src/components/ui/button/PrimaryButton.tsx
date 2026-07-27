'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface PrimaryButtonProps {
  label: string;
  icon?: LucideIcon;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  disabled?: boolean;
}

export function PrimaryButton({
  label,
  icon: Icon,
  onClick,
  type = 'button',
  className = '',
  disabled = false
}: PrimaryButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-semibold text-xs rounded-xl shadow-md shadow-sky-500/20 hover:shadow-sky-500/30 transition active:scale-95 disabled:opacity-50 disabled:pointer-events-none ${className}`}
    >
      {Icon && <Icon className="w-4 h-4" />}
      <span>{label}</span>
    </button>
  );
}
