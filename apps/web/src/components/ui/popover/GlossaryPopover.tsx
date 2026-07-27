'use client';

import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';

interface GlossaryPopoverProps {
  title: string;
  description: string;
}

export function GlossaryPopover({ title, description }: GlossaryPopoverProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className="p-1 text-slate-400 hover:text-sky-500 transition rounded-full focus:outline-none"
        aria-label="Glossary Information"
      >
        <HelpCircle className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full mt-1.5 w-64 p-3 bg-slate-900 text-white rounded-xl shadow-xl border border-slate-800 z-50 text-xs space-y-1">
          <div className="font-bold text-sky-400">{title}</div>
          <div className="text-[11px] text-slate-300 leading-relaxed">{description}</div>
        </div>
      )}
    </div>
  );
}
