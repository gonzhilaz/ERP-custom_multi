'use client';

import React, { useState } from 'react';
import { ArrowDownLeft, History, CheckCircle2, ArrowRightLeft, X, HelpCircle } from 'lucide-react';
import { useInventory } from '@/hooks/inventory/useInventory';
import { SearchableSelect } from '@/components/ui/dropdowns/SearchableSelect';

export const InventoryMovementsView = () => {
  const { allItems } = useInventory();
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [isOpnameModalOpen, setIsOpnameModalOpen] = useState(false);
  const [showGlossary, setShowGlossary] = useState(false);

  const [mockMovements, setMockMovements] = useState([
    {
      id: 'mov-01',
      timestamp: '2026-07-23 16:15',
      type: 'GOODS_IN',
      code: 'SKU-TERIGU-01',
      name: 'Tepung Terigu Cakra Kembar Premium 25kg',
      qty: 100,
      uom: 'Karung',
      warehouse: 'Gudang Utama Sudirman',
      reference: 'PO/2026/07/0042 (Supplier PT Indofood)',
      operator: 'Eko Stok (Warehouse Keeper)'
    },
    {
      id: 'mov-02',
      timestamp: '2026-07-23 15:00',
      type: 'TRANSFER_STOCK',
      code: 'SKU-ROTI-TAWAR',
      name: 'Roti Tawar Kupas Premium',
      qty: -40,
      uom: 'Pack',
      warehouse: 'Gudang Central -> Cabang Kelapa Gading',
      reference: 'Mutasi Transfer #TRF-9921',
      operator: 'Maya Indah (Store Manager)'
    },
    {
      id: 'mov-03',
      timestamp: '2026-07-22 18:30',
      type: 'OPNAME_ADJUST',
      code: 'SKU-MENTEGA-02',
      name: 'Mentega Wijsman Butter 2kg Tin',
      qty: -2,
      uom: 'Kaleng',
      warehouse: 'Gudang Utama Sudirman',
      reference: 'Stock Opname (Kerusakan Kemasan)',
      operator: 'Budi Santoso (Internal Auditor)'
    }
  ]);

  const [transferForm, setTransferForm] = useState({
    itemId: allItems[0]?.id || '',
    fromWarehouse: 'Gudang Utama Central (HO)',
    toWarehouse: 'Gudang Cabang Senopati',
    qty: 10,
    operator: 'Maya Indah (Store Manager)'
  });

  const [opnameForm, setOpnameForm] = useState({
    itemId: allItems[0]?.id || '',
    warehouse: 'Gudang Utama Central (HO)',
    systemQty: 100,
    physicalQty: 96,
    reason: 'Rusak / Kadaluarsa (Spoilage)',
    auditor: 'Budi Santoso (Internal Audit Supervisor)'
  });

  const handleCreateTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    const item = allItems.find((i) => i.id === transferForm.itemId) || allItems[0];
    setMockMovements((prev) => [
      {
        id: `mov-${Date.now()}`,
        timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16),
        type: 'TRANSFER_STOCK',
        code: item?.code || 'SKU-TRF',
        name: item?.name || 'Barang Transfer',
        qty: -Number(transferForm.qty),
        uom: item?.uom || 'Unit',
        warehouse: `${transferForm.fromWarehouse} -> ${transferForm.toWarehouse}`,
        reference: `Transfer Stock #TRF-${Math.floor(Math.random() * 9000 + 1000)}`,
        operator: transferForm.operator
      },
      ...prev
    ]);
    alert('Stock Transfer Berhasil Diterbitkan!');
    setIsTransferModalOpen(false);
  };

  const handleCreateOpname = (e: React.FormEvent) => {
    e.preventDefault();
    const item = allItems.find((i) => i.id === opnameForm.itemId) || allItems[0];
    const diff = Number(opnameForm.physicalQty) - Number(opnameForm.systemQty);
    setMockMovements((prev) => [
      {
        id: `mov-${Date.now()}`,
        timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16),
        type: 'OPNAME_ADJUST',
        code: item?.code || 'SKU-OPN',
        name: item?.name || 'Barang Opname',
        qty: diff,
        uom: item?.uom || 'Unit',
        warehouse: opnameForm.warehouse,
        reference: `Stock Opname (${opnameForm.reason})`,
        operator: opnameForm.auditor
      },
      ...prev
    ]);
    alert('Hasil Audit Stock Opname Berhasil Disimpan!');
    setIsOpnameModalOpen(false);
  };

  return (
    <div className="space-y-4">
      {/* Header Bar & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <History className="w-5 h-5 text-sky-500" />
            <span>Stock Movement & Opname</span>
          </h1>

          {/* Glossary Popup Trigger */}
          <div className="relative">
            <button
              onClick={() => setShowGlossary(!showGlossary)}
              className="text-slate-400 hover:text-sky-500 transition-colors p-1"
              title="Informasi & Glossary Mutasi"
            >
              <HelpCircle className="w-4 h-4" />
            </button>

            {showGlossary && (
              <div className="absolute left-0 top-7 z-30 w-80 p-3.5 bg-slate-900 text-white rounded-2xl shadow-xl text-xs space-y-2 border border-slate-700">
                <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 font-bold text-sky-400">
                  <span>Glossary Mutasi & Opname</span>
                  <button onClick={() => setShowGlossary(false)} className="text-slate-400 hover:text-white">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-[11px] text-slate-300">
                  - <strong>Goods Receipt (GRN)</strong>: Mutasi penerimaan barang dari hasil PO supplier.
                </p>
                <p className="text-[11px] text-slate-300">
                  - <strong>Stock Transfer</strong>: Perpindahan persediaan stok antar gudang / cabang.
                </p>
                <p className="text-[11px] text-slate-300">
                  - <strong>Stock Opname Audit</strong>: Penyesuaian fisik persediaan dengan buku ledger.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setIsTransferModalOpen(true)}
            className="px-3.5 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-semibold shadow-sm flex items-center gap-1.5 cursor-pointer"
          >
            <ArrowRightLeft className="w-4 h-4" />
            <span>Mutasi Transfer</span>
          </button>
          <button
            onClick={() => setIsOpnameModalOpen(true)}
            className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-semibold shadow-sm flex items-center gap-1.5 cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Audit Opname</span>
          </button>
        </div>
      </div>

      {/* Movements Log Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="p-4 bg-slate-50/50 dark:bg-slate-800/40 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
            Log Mutasi ({mockMovements.length})
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Waktu</th>
                <th className="py-3.5 px-4 text-center">Tipe</th>
                <th className="py-3.5 px-4">Kode & Nama Barang</th>
                <th className="py-3.5 px-4 text-right">Jumlah Qty</th>
                <th className="py-3.5 px-4">Gudang asal / tujuan</th>
                <th className="py-3.5 px-4">Referensi</th>
                <th className="py-3.5 px-4 text-center">Petugas</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {mockMovements.map((mov) => (
                <tr key={mov.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-500">{mov.timestamp}</td>
                  <td className="py-3.5 px-4 text-center">
                    {mov.type === 'GOODS_IN' ? (
                      <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 rounded-full text-[10px] font-bold inline-flex items-center gap-1">
                        <ArrowDownLeft className="w-3 h-3" /> Barang Masuk
                      </span>
                    ) : mov.type === 'TRANSFER_STOCK' ? (
                      <span className="px-2.5 py-1 bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/30 rounded-full text-[10px] font-bold inline-flex items-center gap-1">
                        <ArrowRightLeft className="w-3 h-3" /> Transfer Mutasi
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 rounded-full text-[10px] font-bold inline-flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Stock Opname
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">
                    <span className="text-sky-600 dark:text-sky-400 font-mono block text-[11px]">{mov.code}</span>
                    <span>{mov.name}</span>
                  </td>
                  <td className={`py-3.5 px-4 text-right font-mono font-bold ${mov.qty > 0 ? 'text-emerald-600' : 'text-amber-600'}`}>
                    {mov.qty > 0 ? `+${mov.qty}` : mov.qty} {mov.uom}
                  </td>
                  <td className="py-3.5 px-4 text-slate-500">{mov.warehouse}</td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">{mov.reference}</td>
                  <td className="py-3.5 px-4 text-center font-semibold">{mov.operator}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Transfer Modal */}
      {isTransferModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 w-full max-w-md shadow-2xl space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-sm flex items-center gap-2">
                <ArrowRightLeft className="w-4 h-4 text-sky-500" /> Penerbitan Stock Transfer Antar Gudang
              </h3>
              <button onClick={() => setIsTransferModalOpen(false)}><X className="w-4 h-4 text-slate-400" /></button>
            </div>
            <form onSubmit={handleCreateTransfer} className="space-y-3">
              <div>
                <label className="block font-semibold mb-1">Pilih Barang SKU</label>
                <SearchableSelect
                  options={allItems.map((item) => ({ id: item.id, label: `${item.code} - ${item.name}` }))}
                  value={transferForm.itemId}
                  onChange={(val) => setTransferForm({ ...transferForm, itemId: val })}
                  placeholder="Pilih SKU Barang..."
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold mb-1">Gudang Asal</label>
                  <input type="text" required value={transferForm.fromWarehouse} onChange={(e) => setTransferForm({ ...transferForm, fromWarehouse: e.target.value })} className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700" />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Gudang Tujuan</label>
                  <input type="text" required value={transferForm.toWarehouse} onChange={(e) => setTransferForm({ ...transferForm, toWarehouse: e.target.value })} className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700" />
                </div>
              </div>
              <div>
                <label className="block font-semibold mb-1">Jumlah Mutasi Qty</label>
                <input type="number" required min={1} value={transferForm.qty} onChange={(e) => setTransferForm({ ...transferForm, qty: Number(e.target.value) })} className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 font-bold" />
              </div>
              <div>
                <label className="block font-semibold mb-1">Petugas Operator Penanggung Jawab</label>
                <input type="text" required value={transferForm.operator} onChange={(e) => setTransferForm({ ...transferForm, operator: e.target.value })} className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700" />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setIsTransferModalOpen(false)} className="px-4 py-2 bg-slate-200 dark:bg-slate-800 rounded-xl font-semibold">Batal</button>
                <button type="submit" className="px-4 py-2 bg-sky-600 text-white rounded-xl font-semibold">Proses Transfer</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Opname Modal */}
      {isOpnameModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 w-full max-w-md shadow-2xl space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-sm flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-500" /> Input Audit Stock Opname
              </h3>
              <button onClick={() => setIsOpnameModalOpen(false)}><X className="w-4 h-4 text-slate-400" /></button>
            </div>
            <form onSubmit={handleCreateOpname} className="space-y-3">
              <div>
                <label className="block font-semibold mb-1">Pilih Barang SKU</label>
                <SearchableSelect
                  options={allItems.map((item) => ({ id: item.id, label: `${item.code} - ${item.name}` }))}
                  value={opnameForm.itemId}
                  onChange={(val) => setOpnameForm({ ...opnameForm, itemId: val })}
                  placeholder="Pilih SKU Barang..."
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold mb-1">Qty Sistem (Buku)</label>
                  <input type="number" required value={opnameForm.systemQty} onChange={(e) => setOpnameForm({ ...opnameForm, systemQty: Number(e.target.value) })} className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700" />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Qty Hitung Fisik</label>
                  <input type="number" required value={opnameForm.physicalQty} onChange={(e) => setOpnameForm({ ...opnameForm, physicalQty: Number(e.target.value) })} className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 font-bold" />
                </div>
              </div>
              <div>
                <label className="block font-semibold mb-1">Alasan Penyesuaian</label>
                <SearchableSelect
                  options={[
                    { id: 'Rusak / Kadaluarsa (Spoilage)', label: 'Rusak / Kadaluarsa (Spoilage)' },
                    { id: 'Selisih Hitung Fisik Gudang', label: 'Selisih Hitung Fisik Gudang' },
                    { id: 'Sampel / Promosi Marketing', label: 'Sampel / Promosi Marketing' },
                    { id: 'Penyusutan Alami (Shrinkage)', label: 'Penyusutan Alami (Shrinkage)' }
                  ]}
                  value={opnameForm.reason}
                  onChange={(val) => setOpnameForm({ ...opnameForm, reason: val })}
                  placeholder="Pilih Alasan..."
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Auditor / Finance Supervisor</label>
                <input type="text" required value={opnameForm.auditor} onChange={(e) => setOpnameForm({ ...opnameForm, auditor: e.target.value })} className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700" />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setIsOpnameModalOpen(false)} className="px-4 py-2 bg-slate-200 dark:bg-slate-800 rounded-xl font-semibold">Batal</button>
                <button type="submit" className="px-4 py-2 bg-amber-500 text-slate-950 rounded-xl font-semibold">Simpan Stock Opname</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
