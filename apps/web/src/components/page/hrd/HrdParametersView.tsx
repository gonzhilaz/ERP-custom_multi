'use client';

import React, { useState } from 'react';
import { Sliders, CalendarDays, Clock, DollarSign, Users, HelpCircle, X } from 'lucide-react';

export const HrdParametersView = () => {
  const [activeTab, setActiveTab] = useState<'LEAVE' | 'SHIFT' | 'OVERTIME' | 'COMPONENTS' | 'WORKER'>('LEAVE');
  const [showGlossary, setShowGlossary] = useState(false);

  return (
    <div className="space-y-4 text-xs">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-xl shrink-0">
            <Sliders className="w-5 h-5" />
          </div>
          <h1 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>Aturan & Parameter</span>
          </h1>

          <div className="relative">
            <button onClick={() => setShowGlossary(!showGlossary)} className="text-slate-400 hover:text-purple-500 p-1 cursor-pointer">
              <HelpCircle className="w-4 h-4" />
            </button>
            {showGlossary && (
              <div className="absolute left-0 top-7 z-30 w-80 p-3.5 bg-slate-900 text-white rounded-2xl shadow-xl text-xs space-y-2 border border-slate-700">
                <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 font-bold text-purple-400">
                  <span>Parameter Acuan HRD Terpadu</span>
                  <button onClick={() => setShowGlossary(false)} className="text-slate-400 hover:text-white"><X className="w-3.5 h-3.5" /></button>
                </div>
                <p className="text-[11px] text-slate-300">
                  Pusat konfigurasi parameter kebijakan Cuti, Roster Shift, Ketentuan Lembur, Komponen Gaji, dan Aturan Tipe Pekerja dalam 1 modul terpadu.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Sub Tabs */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl overflow-x-auto">
          <button
            onClick={() => setActiveTab('LEAVE')}
            className={`px-3 py-1.5 rounded-xl font-semibold transition-all flex items-center gap-1 cursor-pointer shrink-0 ${
              activeTab === 'LEAVE' ? 'bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-400 shadow-sm' : 'text-slate-500'
            }`}
          >
            <CalendarDays className="w-3.5 h-3.5" />
            <span>Cuti & Izin</span>
          </button>
          <button
            onClick={() => setActiveTab('SHIFT')}
            className={`px-3 py-1.5 rounded-xl font-semibold transition-all flex items-center gap-1 cursor-pointer shrink-0 ${
              activeTab === 'SHIFT' ? 'bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-400 shadow-sm' : 'text-slate-500'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Shift Kerja</span>
          </button>
          <button
            onClick={() => setActiveTab('OVERTIME')}
            className={`px-3 py-1.5 rounded-xl font-semibold transition-all flex items-center gap-1 cursor-pointer shrink-0 ${
              activeTab === 'OVERTIME' ? 'bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-400 shadow-sm' : 'text-slate-500'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Lembur</span>
          </button>
          <button
            onClick={() => setActiveTab('COMPONENTS')}
            className={`px-3 py-1.5 rounded-xl font-semibold transition-all flex items-center gap-1 cursor-pointer shrink-0 ${
              activeTab === 'COMPONENTS' ? 'bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-400 shadow-sm' : 'text-slate-500'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>Tunjangan & Potongan</span>
          </button>
          <button
            onClick={() => setActiveTab('WORKER')}
            className={`px-3 py-1.5 rounded-xl font-semibold transition-all flex items-center gap-1 cursor-pointer shrink-0 ${
              activeTab === 'WORKER' ? 'bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-400 shadow-sm' : 'text-slate-500'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Status Pekerja</span>
          </button>
        </div>
      </div>

      {/* Tab Panels */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <h3 className="font-bold text-sm text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
          Konfigurasi Parameter: {activeTab}
        </h3>
        <p className="text-slate-500 text-xs">
          Seluruh parameter di atas dikonsolidasi secara terpusat untuk mempermudah tata kelola aturan HRD perusahaan.
        </p>
      </div>
    </div>
  );
};
