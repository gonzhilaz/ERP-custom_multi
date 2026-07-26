'use client';

import React, { useState } from 'react';
import { LayoutGrid, Settings, Plus, RotateCcw, X, Sparkles, SlidersHorizontal } from 'lucide-react';
import { useWidgetCanvas } from '@/hooks/widgets/useWidgetCanvas';
import { WidgetGalleryModal } from './WidgetGalleryModal';
import { PosSalesWidget } from '@/components/widgets/PosSalesWidget';
import { StockAlertWidget } from '@/components/widgets/StockAlertWidget';
import { ProductionWorkOrdersWidget } from '@/components/widgets/ProductionWorkOrdersWidget';
import { FinanceCashflowWidget } from '@/components/widgets/FinanceCashflowWidget';
import { StaffAttendanceWidget } from '@/components/widgets/StaffAttendanceWidget';
import { HotelOccupancyWidget } from '@/components/widgets/HotelOccupancyWidget';
import { CrmOverviewWidget } from '@/components/widgets/CrmOverviewWidget';
import { VendorProcurementWidget } from '@/components/widgets/VendorProcurementWidget';
import { CateringFleetWidget } from '@/components/widgets/CateringFleetWidget';
import { MiningProductionWidget } from '@/components/widgets/MiningProductionWidget';
import { ManagerialProfitWidget } from '@/components/widgets/ManagerialProfitWidget';
import { SystemHealthWidget } from '@/components/widgets/SystemHealthWidget';

export const WidgetCanvasView = () => {
  const {
    activeWidgets,
    availableWidgets,
    isEditMode,
    setIsEditMode,
    searchQuery,
    setSearchQuery,
    addWidgetToCanvas,
    removeWidgetFromCanvas,
    resetToPreset
  } = useWidgetCanvas('RETAIL_STORE_MANAGER');

  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState('RETAIL_STORE_MANAGER');

  const renderWidgetComponent = (widgetId: string) => {
    switch (widgetId) {
      case 'wgt-pos-sales':
        return <PosSalesWidget />;
      case 'wgt-stock-alert':
        return <StockAlertWidget />;
      case 'wgt-mfg-wo':
        return <ProductionWorkOrdersWidget />;
      case 'wgt-fin-cashflow':
        return <FinanceCashflowWidget />;
      case 'wgt-hrd-attendance':
        return <StaffAttendanceWidget />;
      case 'wgt-htl-occupancy':
        return <HotelOccupancyWidget />;
      case 'wgt-crm-pipeline':
        return <CrmOverviewWidget />;
      case 'wgt-vendor-po':
        return <VendorProcurementWidget />;
      case 'wgt-cat-fleet':
        return <CateringFleetWidget />;
      case 'wgt-mne-production':
        return <MiningProductionWidget />;
      case 'wgt-mgt-profit':
        return <ManagerialProfitWidget />;
      case 'wgt-sys-health':
        return <SystemHealthWidget />;
      default:
        return <PosSalesWidget />;
    }
  };

  const handlePresetChange = (presetKey: string) => {
    setSelectedPreset(presetKey);
    resetToPreset(presetKey);
  };

  return (
    <div className="space-y-4">
      {/* Canvas Controls Header Bar */}
      <div className="p-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-sky-500/10 text-sky-600 dark:text-sky-400 rounded-xl shrink-0">
            <LayoutGrid className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 leading-tight">
              <span>Dashboard</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-500/10 text-sky-600 border border-sky-500/20 font-mono">
                Modular Canvas
              </span>
            </h1>
            <p className="text-[11px] text-slate-500">Susun & kustomisasi widget ERP.</p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Role Perspective Presets Dropdown */}
          <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400 ml-1.5" />
            <select
              value={selectedPreset}
              onChange={(e) => handlePresetChange(e.target.value)}
              className="bg-transparent font-bold text-xs focus:outline-none pr-1 cursor-pointer"
            >
              <option value="RETAIL_STORE_MANAGER">🍞 Preset: Toko Roti & Retail</option>
              <option value="HOLDING_EXECUTIVE">🏛️ Preset: Executive Holding BOD</option>
              <option value="SITE_MANAGER_MINING">⛏️ Preset: Engineer Tambang Emas</option>
              <option value="HOTEL_GENERAL_MANAGER">🏨 Preset: Hotel General Manager</option>
              <option value="CATERING_MANAGER">🍱 Preset: Catering Manager</option>
              <option value="FINANCE_DIRECTOR">💼 Preset: Finance Director</option>
              <option value="CRM_DIRECTOR">🎯 Preset: CRM & Sales Director</option>
              <option value="SYS_ADMIN">⚙️ Preset: System Administrator</option>
            </select>
          </div>

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
              isEditMode
                ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-sm animate-pulse'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>{isEditMode ? 'Selesai Kustomisasi' : 'Kustomisasi Layout'}</span>
          </button>
        </div>
      </div>

      {/* Mode Kustomisasi Active Banner */}
      {isEditMode && (
        <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-center justify-between text-xs text-amber-800 dark:text-amber-300">
          <div className="flex items-center gap-2 font-bold">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Mode Kustomisasi Aktif: Klik ikon [X] pada kartu untuk menyembunyikan widget dari canvas.</span>
          </div>
          <button
            onClick={() => resetToPreset(selectedPreset)}
            className="px-2.5 py-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-900 dark:text-amber-200 font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" /> Reset Ke Preset Initial
          </button>
        </div>
      )}

      {/* Dynamic Widget Grid Canvas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {activeWidgets.map((w) => (
          <div key={w.id} className={`relative group ${w.defaultColSpan === 2 ? 'lg:col-span-2' : ''}`}>
            {isEditMode && (
              <button
                onClick={() => removeWidgetFromCanvas(w.id)}
                className="absolute -top-2 -right-2 z-20 w-6 h-6 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center font-bold shadow-md transition-transform hover:scale-110 cursor-pointer"
                title="Sembunyikan Widget Ini"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}

            {renderWidgetComponent(w.id)}
          </div>
        ))}
      </div>

      {/* Widget Gallery Modal */}
      <WidgetGalleryModal
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        availableWidgets={availableWidgets}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onAddWidget={(id) => {
          addWidgetToCanvas(id);
          setIsGalleryOpen(false);
        }}
      />
    </div>
  );
};
