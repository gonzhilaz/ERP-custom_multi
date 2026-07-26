'use client';

import React, { useState } from 'react';
import { Users, DollarSign, Briefcase, TrendingUp, Plus, Settings, Sparkles } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { KpiCard } from '@/components/ui/cards/KpiCard';
import { CrmOverviewWidget } from '@/components/widgets/CrmOverviewWidget';
import { FinanceCashflowWidget } from '@/components/widgets/FinanceCashflowWidget';
import { PosSalesWidget } from '@/components/widgets/PosSalesWidget';
import { WidgetGalleryModal } from '../dashboard/WidgetGalleryModal';
import { WIDGET_REGISTRY } from '@/lib/widgets/widget-registry';

export const CrmOverviewView = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeWidgetIds, setActiveWidgetIds] = useState(['wgt-crm-pipeline', 'wgt-fin-cashflow', 'wgt-pos-sales']);

  return (
    <div className="space-y-4 text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <ModuleHeader
          title="CRM Overview & Modular Analytics"
          icon={Users}
          iconBgColor="bg-sky-500/10 text-sky-600 dark:text-sky-400"
          glossaryTitle="Glossary CRM & Pipeline Penjualan"
          glossaryItems={[{ term: 'Pipeline Conversion', description: 'Rasio konversi dari prospek lead menjadi deals kontrak penjualan resmi.' }]}
        />
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsGalleryOpen(true)}
            className="px-3 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-xl font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Widget</span>
          </button>
          <button
            onClick={() => setIsEditMode(!isEditMode)}
            className={`px-3 py-2 rounded-xl font-bold transition-all flex items-center gap-1.5 cursor-pointer border ${
              isEditMode ? 'bg-amber-500 text-slate-950 border-amber-400 animate-pulse' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>{isEditMode ? 'Selesai' : 'Kustomisasi Layout'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard title="Total Klien Active" value="128 Klien" subtitle="Perusahaan Enterprise" icon={Users} iconBgColor="bg-blue-50 text-blue-600 dark:bg-blue-950/50" />
        <KpiCard title="Active Deals Pipeline" value="24 Deals" subtitle="Negosiasi Kontrak" icon={Briefcase} iconBgColor="bg-amber-50 text-amber-600 dark:bg-amber-950/50" />
        <KpiCard title="Estimasi Nilai Deals" value="Rp 4.250.000.000" subtitle="Pipeline Q3 2026" icon={DollarSign} iconBgColor="bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50" />
        <KpiCard title="Win Rate Penjualan" value="68.4%" subtitle="Bulan Ini" icon={TrendingUp} iconBgColor="bg-purple-50 text-purple-600 dark:bg-purple-950/50" />
      </div>

      {/* Dynamic Widget Grid Canvas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {activeWidgetIds.includes('wgt-crm-pipeline') && (
          <div className="lg:col-span-2">
            <CrmOverviewWidget />
          </div>
        )}
        {activeWidgetIds.includes('wgt-fin-cashflow') && (
          <div className="lg:col-span-2">
            <FinanceCashflowWidget />
          </div>
        )}
        {activeWidgetIds.includes('wgt-pos-sales') && <PosSalesWidget />}
      </div>

      <WidgetGalleryModal
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        availableWidgets={WIDGET_REGISTRY.filter(w => !activeWidgetIds.includes(w.id))}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onAddWidget={(id) => {
          if (!activeWidgetIds.includes(id)) setActiveWidgetIds([...activeWidgetIds, id]);
          setIsGalleryOpen(false);
        }}
      />
    </div>
  );
};
