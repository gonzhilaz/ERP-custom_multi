'use client';

import React, { useState } from 'react';
import { ArrowDownLeft, History, CheckCircle2, ArrowRightLeft, X, HelpCircle } from 'lucide-react';
import { useInventory } from '@/hooks/inventory/useInventory';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { SearchableSelect } from '@/components/ui/dropdowns/SearchableSelect';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';

export const InventoryMovementsView = () => {
  const { allItems } = useInventory();
  const [movementTypeFilter, setMovementTypeFilter] = useState<string>('ALL');
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

  const filteredMovements = mockMovements.filter((mov) => {
    if (movementTypeFilter !== 'ALL' && mov.type !== movementTypeFilter) return false;
    return true;
  });

  return (
    <div className="space-y-4">
      {/* Universal Module Header */}
      <ModuleHeader
        title="Stock Movements & Mutasi Barang"
        icon={History}
        iconBgColor="bg-purple-500/10 text-purple-600 dark:text-purple-400"
        glossaryTitle="Glossary Mutasi & Audit Stok"
        glossaryItems={[
          { term: 'Goods Receipt', description: 'Penerimaan barang dari Vendor/Supplier ke Gudang Utama.' },
          { term: 'Stock Transfer', description: 'Perpindahan stok antar gudang cabang atau departemen.' },
          { term: 'Opname Adjustment', description: 'Penyesuaian selisih stok pisik hasil stock opname berkala.' }
        ]}
        actions={
          <div className="flex items-center gap-2">
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
        }
      />

      {/* Movements Log Table */}
      <DataTable
        headerTitle={`Log Mutasi Stock & Goods Receipt (${filteredMovements.length})`}
        data={filteredMovements}
        filterComponent={
          <SearchableSelect
            value={movementTypeFilter}
            onChange={(val) => setMovementTypeFilter(val)}
            options={[
              { id: 'ALL', label: 'Semua Tipe Mutasi' },
              { id: 'GOODS_IN', label: 'Barang Masuk (Goods Receipt)' },
              { id: 'TRANSFER_STOCK', label: 'Mutasi Transfer Antar Gudang' },
              { id: 'OPNAME_ADJUSTMENT', label: 'Penyesuaian Stock Opname' }
            ]}
            className="w-56"
          />
        }
        columns={[
          { key: 'timestamp', header: 'Waktu', className: 'font-mono font-bold text-slate-500', render: (mov) => mov.timestamp },
          {
            key: 'type',
            header: 'Tipe',
            align: 'center',
            render: (mov) => (
              mov.type === 'GOODS_IN' ? (
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
              )
            )
          },
          {
            key: 'code',
            header: 'Kode & Nama Barang',
            className: 'font-semibold text-slate-900 dark:text-white',
            render: (mov) => (
              <div>
                <span className="text-sky-600 dark:text-sky-400 font-mono block text-[11px]">{mov.code}</span>
                <span>{mov.name}</span>
              </div>
            )
          },
          {
            key: 'qty',
            header: 'Jumlah Qty',
            align: 'right',
            className: 'font-mono font-bold',
            render: (mov) => (
              <span className={mov.qty > 0 ? 'text-emerald-600' : 'text-amber-600'}>
                {mov.qty > 0 ? `+${mov.qty}` : mov.qty} {mov.uom}
              </span>
            )
          },
          { key: 'warehouse', header: 'Gudang asal / tujuan', className: 'text-slate-500', render: (mov) => mov.warehouse },
          { key: 'reference', header: 'Referensi', className: 'text-slate-600 dark:text-slate-300', render: (mov) => mov.reference },
          { key: 'operator', header: 'Petugas', align: 'center', className: 'font-semibold', render: (mov) => mov.operator }
        ]}
        keyExtractor={(mov) => mov.id}
      />

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
