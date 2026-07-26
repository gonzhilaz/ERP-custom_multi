'use client';

import React from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import { BomRecipeItem, BomComponent, BomOverheadCost } from '@/lib/mock/manufacturing';

interface Props {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  editingId: string | null;
  formData: {
    name: string;
    category: BomRecipeItem['category'];
    outputItemName: string;
    outputQty: number;
    outputUom: string;
    suggestedSellingPrice: number;
    components: BomComponent[];
    overheads: BomOverheadCost[];
  };
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  handleAddComponent: () => void;
  handleRemoveComponent: (index: number) => void;
  handleAddOverhead: () => void;
  handleRemoveOverhead: (index: number) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

export const BomFormModal = ({
  showModal,
  setShowModal,
  editingId,
  formData,
  setFormData,
  handleAddComponent,
  handleRemoveComponent,
  handleAddOverhead,
  handleRemoveOverhead,
  handleSubmit
}: Props) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4 max-h-[90vh] overflow-y-auto text-xs">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">
            {editingId ? 'Edit Formulasi BOM' : 'Buat Formulasi Resep / BOM Baru'}
          </h3>
          <button onClick={() => setShowModal(false)} className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-500 font-semibold mb-1">Nama Resep / BOM</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-2 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 font-bold"
              />
            </div>
            <div>
              <label className="block text-slate-500 font-semibold mb-1">Kategori Produk</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                className="w-full p-2 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 font-bold"
              >
                <option value="BAKERY">Bakery & Roti</option>
                <option value="RESTO_FNB">Resto & F&B Main Course</option>
                <option value="MANUFACTURING">Manufaktur Umum</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-slate-500 font-semibold mb-1">Nama Produk Hasil (Output)</label>
              <input
                type="text"
                required
                value={formData.outputItemName}
                onChange={(e) => setFormData({ ...formData, outputItemName: e.target.value })}
                className="w-full p-2 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 font-bold"
              />
            </div>
            <div>
              <label className="block text-slate-500 font-semibold mb-1">Jumlah Output</label>
              <input
                type="number"
                required
                value={formData.outputQty}
                onChange={(e) => setFormData({ ...formData, outputQty: Number(e.target.value) })}
                className="w-full p-2 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 font-bold"
              />
            </div>
            <div>
              <label className="block text-slate-500 font-semibold mb-1">Satuan Output (UOM)</label>
              <input
                type="text"
                required
                value={formData.outputUom}
                onChange={(e) => setFormData({ ...formData, outputUom: e.target.value })}
                className="w-full p-2 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 font-bold"
              />
            </div>
          </div>

          {/* Components Section */}
          <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 dark:text-white">Bahan Baku (Raw Materials) & Wastage %</span>
              <button
                type="button"
                onClick={handleAddComponent}
                className="px-2.5 py-1 bg-sky-600 hover:bg-sky-500 text-white rounded-lg font-bold text-[10px] flex items-center gap-1"
              >
                <Plus className="w-3 h-3" />
                <span>Bahan Baku</span>
              </button>
            </div>

            {formData.components.map((comp, idx) => (
              <div key={idx} className="grid grid-cols-6 gap-2 p-2 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 items-center">
                <input
                  type="text"
                  placeholder="Nama Bahan"
                  value={comp.rawItemName}
                  onChange={(e) => {
                    const newComps = [...formData.components];
                    newComps[idx].rawItemName = e.target.value;
                    setFormData({ ...formData, components: newComps });
                  }}
                  className="col-span-2 p-1.5 bg-white dark:bg-slate-800 rounded border border-slate-300 dark:border-slate-600"
                />
                <input
                  type="number"
                  placeholder="Qty"
                  value={comp.requiredQty}
                  onChange={(e) => {
                    const newComps = [...formData.components];
                    newComps[idx].requiredQty = Number(e.target.value);
                    setFormData({ ...formData, components: newComps });
                  }}
                  className="p-1.5 bg-white dark:bg-slate-800 rounded border border-slate-300 dark:border-slate-600 font-bold text-right"
                />
                <input
                  type="text"
                  placeholder="Satuan"
                  value={comp.unitUom}
                  onChange={(e) => {
                    const newComps = [...formData.components];
                    newComps[idx].unitUom = e.target.value;
                    setFormData({ ...formData, components: newComps });
                  }}
                  className="p-1.5 bg-white dark:bg-slate-800 rounded border border-slate-300 dark:border-slate-600"
                />
                <input
                  type="number"
                  placeholder="Harga (Rp)"
                  value={comp.costPerUnit}
                  onChange={(e) => {
                    const newComps = [...formData.components];
                    newComps[idx].costPerUnit = Number(e.target.value);
                    setFormData({ ...formData, components: newComps });
                  }}
                  className="p-1.5 bg-white dark:bg-slate-800 rounded border border-slate-300 dark:border-slate-600 font-mono text-right"
                />
                <div className="flex items-center justify-between gap-1">
                  <input
                    type="number"
                    placeholder="Waste %"
                    value={comp.wastePercentage}
                    onChange={(e) => {
                      const newComps = [...formData.components];
                      newComps[idx].wastePercentage = Number(e.target.value);
                      setFormData({ ...formData, components: newComps });
                    }}
                    className="w-14 p-1.5 bg-white dark:bg-slate-800 rounded border border-slate-300 dark:border-slate-600 text-right"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveComponent(idx)}
                    className="p-1 text-slate-400 hover:text-rose-500"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl font-bold"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-xl font-bold shadow-md"
            >
              {editingId ? 'Simpan Perubahan' : 'Rilis Formulasi BOM'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
