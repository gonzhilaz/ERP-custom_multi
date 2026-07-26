'use client';

import React, { useState } from 'react';
import { Layers, Plus, Edit2, Trash2, HelpCircle, X, ShieldCheck, History, DollarSign } from 'lucide-react';
import { BomRecipeItem, BomComponent, BomOverheadCost, ManufacturingAuditLog } from '@/lib/mock/manufacturing';
import { BomFormModal } from './BomFormModal';

interface Props {
  recipes: BomRecipeItem[];
  auditLogs: ManufacturingAuditLog[];
  filterCategory: string;
  setFilterCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  addRecipe: (recipe: Omit<BomRecipeItem, 'id' | 'code' | 'updatedAt' | 'estimatedCogmPerUnit'>) => void;
  updateRecipe: (id: string, recipe: Partial<BomRecipeItem>) => void;
  softDeleteRecipe: (id: string) => void;
}

export const BomManagementTab = ({
  recipes,
  auditLogs,
  filterCategory,
  setFilterCategory,
  searchQuery,
  setSearchQuery,
  addRecipe,
  updateRecipe,
  softDeleteRecipe
}: Props) => {
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showGlossary, setShowGlossary] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    category: 'BAKERY' as BomRecipeItem['category'],
    outputItemName: '',
    outputQty: 10,
    outputUom: 'Pcs',
    suggestedSellingPrice: 20000,
    components: [
      { rawItemId: 'raw-1', rawItemCode: 'RAW-001', rawItemName: 'Bahan Utama A', requiredQty: 5, unitUom: 'Kg', costPerUnit: 12000, wastePercentage: 1 }
    ] as BomComponent[],
    overheads: [
      { id: 'ovh-1', costType: 'Beban Listrik & Tenaga Kerja', amount: 30000, coaAccount: '5-10201 - Beban Operasional Produksi' }
    ] as BomOverheadCost[]
  });

  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData({
      name: '',
      category: 'BAKERY',
      outputItemName: '',
      outputQty: 10,
      outputUom: 'Pcs',
      suggestedSellingPrice: 20000,
      components: [
        { rawItemId: 'raw-1', rawItemCode: 'RAW-001', rawItemName: 'Tepung Terigu / Bahan Utama', requiredQty: 5, unitUom: 'Kg', costPerUnit: 14000, wastePercentage: 1 }
      ],
      overheads: [
        { id: 'ovh-1', costType: 'Beban Listrik Oven & Tenaga Kerja', amount: 35000, coaAccount: '5-10201 - Beban Listrik Produksi' }
      ]
    });
    setShowModal(true);
  };

  const handleAddComponent = () => {
    setFormData((prev) => ({
      ...prev,
      components: [
        ...prev.components,
        {
          rawItemId: `raw-${Date.now()}`,
          rawItemCode: `RAW-${Math.floor(100 + Math.random() * 900)}`,
          rawItemName: 'Bahan Tambahan Baru',
          requiredQty: 1,
          unitUom: 'Kg',
          costPerUnit: 10000,
          wastePercentage: 0
        }
      ]
    }));
  };

  const handleRemoveComponent = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      components: prev.components.filter((_, i) => i !== index)
    }));
  };

  const handleAddOverhead = () => {
    setFormData((prev) => ({
      ...prev,
      overheads: [
        ...prev.overheads,
        {
          id: `ovh-${Date.now()}`,
          costType: 'Beban Overheads Produksi',
          amount: 15000,
          coaAccount: '5-10209 - Overhead Pabrik Lainya'
        }
      ]
    }));
  };

  const handleRemoveOverhead = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      overheads: prev.overheads.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.outputItemName) return;

    if (editingId) {
      updateRecipe(editingId, formData);
      alert(`BOM Recipe [${formData.name}] Berhasil Diperbarui!`);
    } else {
      addRecipe({
        ...formData,
        status: 'ACTIVE',
        outputItemId: `out-${Date.now()}`
      });
      alert(`BOM Recipe Baru [${formData.name}] Berhasil Ditambahkan!`);
    }
    setShowModal(false);
  };

  return (
    <div className="space-y-4 text-xs">
      {/* Top Action & Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-xl shrink-0">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>Formulasi BOM & Resep Produksi</span>
            </h2>
          </div>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-3.5 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Formulasi BOM Baru</span>
        </button>
      </div>

      {/* Grid Recipes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
              <div>
                <span className="text-[10px] font-mono text-sky-600 font-bold bg-sky-50 dark:bg-sky-950/50 px-2 py-0.5 rounded">{recipe.code}</span>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white mt-1">{recipe.name}</h3>
              </div>
              <span className="px-2.5 py-1 bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-bold rounded-lg text-[10px]">
                HPP: Rp {recipe.estimatedCogmPerUnit.toLocaleString('id-ID')} / {recipe.outputUom}
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block">Rincian Komponen Bahan Baku:</span>
              {recipe.components.map((comp, idx) => (
                <div key={idx} className="flex items-center justify-between text-[11px] text-slate-600 dark:text-slate-400">
                  <span>• {comp.rawItemName} ({comp.requiredQty} {comp.unitUom})</span>
                  <span className="font-mono text-slate-500">Rp {(comp.costPerUnit * comp.requiredQty).toLocaleString('id-ID')}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => softDeleteRecipe(recipe.id)}
                className="p-1.5 text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
                title="Soft Delete BOM"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Form Modal */}
      <BomFormModal
        showModal={showModal}
        setShowModal={setShowModal}
        editingId={editingId}
        formData={formData}
        setFormData={setFormData}
        handleAddComponent={handleAddComponent}
        handleRemoveComponent={handleRemoveComponent}
        handleAddOverhead={handleAddOverhead}
        handleRemoveOverhead={handleRemoveOverhead}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};
