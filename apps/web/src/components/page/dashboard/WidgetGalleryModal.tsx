'use client';

import React from 'react';
import { Plus, Search, X, Sparkles, LayoutGrid } from 'lucide-react';
import { WidgetDefinition } from '@/lib/widgets/widget-registry';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  availableWidgets: WidgetDefinition[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onAddWidget: (widgetId: string) => void;
}

export const WidgetGalleryModal = ({
  isOpen,
  onClose,
  availableWidgets,
  searchQuery,
  setSearchQuery,
  onAddWidget
}: Props) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex justify-center items-center p-4 text-xs">
      <div className="bg-white dark:bg-slate-900 w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-4 shadow-2xl animate-in zoom-in-95 duration-150">
        <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-sky-500/10 text-sky-600 dark:text-sky-400 rounded-lg">
              <LayoutGrid className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Galeri Widget</h3>
            </div>
          </div>

          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari widget (POS, Inventory, Manufaktur, Finance, HRD, Hotel)..."
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        {/* Available Widgets List */}
        {availableWidgets.length === 0 ? (
          <div className="p-8 text-center text-slate-400 space-y-1">
            <Sparkles className="w-6 h-6 mx-auto text-sky-500" />
            <div className="font-bold text-slate-700 dark:text-slate-300">Seluruh Widget Telah Terpasang di Canvas!</div>
            <div className="text-[11px]">Tidak ada widget tambahan yang tersedia untuk dipasang saat ini.</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {availableWidgets.map((w) => (
              <div
                key={w.id}
                className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2 flex flex-col justify-between"
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
                      {w.moduleName}
                    </span>
                    <span className="font-mono text-[9px] text-slate-400 font-bold">{w.code}</span>
                  </div>
                  <h4 className="font-bold text-xs text-slate-900 dark:text-white">{w.name}</h4>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-2">{w.description}</p>
                </div>

                <button
                  onClick={() => {
                    onAddWidget(w.id);
                  }}
                  className="w-full py-1.5 bg-sky-600 hover:bg-sky-500 text-white rounded-lg font-bold text-xs transition-all flex items-center justify-center gap-1 cursor-pointer shadow-sm mt-2"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambah ke Canvas</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
