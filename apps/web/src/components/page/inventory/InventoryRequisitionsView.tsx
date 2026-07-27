'use client';

import React, { useState } from 'react';
import { FileText, Plus, CheckCircle2, Clock, Building2, HelpCircle, X } from 'lucide-react';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';

export const InventoryRequisitionsView = () => {
  const [showGlossary, setShowGlossary] = useState(false);
  const [requisitions, setRequisitions] = useState([
    {
      id: 'req-001',
      reqNumber: 'PR-DEPT/2026/07/012',
      department: 'Central Kitchen BOH',
      requester: 'Chef Jaka (Head Cook)',
      date: '2026-07-23',
      itemName: 'Daging Sapi Ribeye Wagyu MB5',
      requestedQty: 15,
      uom: 'Kg',
      status: 'PENDING',
      purpose: 'Persiapan Event Executive Catering Dinner'
    },
    {
      id: 'req-002',
      reqNumber: 'PR-DEPT/2026/07/013',
      department: 'Heavy Fleet Site',
      requester: 'Ir. Heru Mining',
      date: '2026-07-22',
      itemName: 'Filter Oli Heavy Machinery CAT 777D',
      requestedQty: 4,
      uom: 'Pcs',
      status: 'APPROVED',
      purpose: 'Perawatan Berkala 500 HM Fleet #4'
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    department: 'Central Kitchen BOH',
    requester: 'Chef Jaka',
    itemName: 'Tepung Terigu Cakra Kembar Premium',
    requestedQty: 10,
    uom: 'Karung',
    purpose: 'Stok Dapur Roti Shift Pagi'
  });

  const handleCreateRequest = (e: React.FormEvent) => {
    e.preventDefault();
    const created = {
      id: `req-${Date.now()}`,
      reqNumber: `PR-DEPT/2026/07/0${requisitions.length + 14}`,
      date: new Date().toISOString().split('T')[0],
      status: 'PENDING',
      ...formData
    };
    setRequisitions([created, ...requisitions]);
    setIsModalOpen(false);
  };

  const handleApprove = (id: string) => {
    setRequisitions((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'APPROVED' } : r))
    );
  };

  return (
    <div className="space-y-4">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-sky-500" />
            <span>Permintaan Gudang</span>
          </h1>

          {/* Glossary Popup Trigger */}
          <div className="relative">
            <button
              onClick={() => setShowGlossary(!showGlossary)}
              className="text-slate-400 hover:text-sky-500 transition-colors p-1 cursor-pointer"
              title="Informasi & Glossary Permintaan Gudang"
            >
              <HelpCircle className="w-4 h-4" />
            </button>

            {showGlossary && (
              <div className="absolute left-0 top-7 z-30 w-80 p-3.5 bg-slate-900 text-white rounded-2xl shadow-xl text-xs space-y-2 border border-slate-700">
                <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 font-bold text-sky-400">
                  <span>Glossary Permintaan Gudang</span>
                  <button onClick={() => setShowGlossary(false)} className="text-slate-400 hover:text-white cursor-pointer">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-[11px] text-slate-300">
                  - <strong>Internal Requisition (PR-DEPT)</strong>: Form pengajuan barang antar departemen operasional.
                </p>
                <p className="text-[11px] text-slate-300">
                  - <strong>Approval Gudang</strong>: Otorisasi penyerahan stok dari gudang utama ke departemen pemohon.
                </p>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-3.5 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Form Permintaan</span>
        </button>
      </div>

      <DataTable
        headerTitle={`Daftar Permintaan Pengeluaran Gudang (${requisitions.length})`}
        columns={[
          { key: 'reqNumber', header: 'No. Requisition', className: 'font-mono font-bold text-sky-600 dark:text-sky-400', render: (req) => req.reqNumber },
          {
            key: 'department',
            header: 'Departemen Pemohon',
            className: 'font-semibold text-slate-900 dark:text-white',
            render: (req) => (
              <div className="flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-sky-500" />
                <span>{req.department}</span>
              </div>
            )
          },
          { key: 'requester', header: 'Pemohon', className: 'text-slate-600 dark:text-slate-300', render: (req) => req.requester },
          { key: 'itemName', header: 'Barang & Qty Diminta', className: 'font-bold text-slate-900 dark:text-white', render: (req) => `${req.itemName} (${req.requestedQty} ${req.uom})` },
          { key: 'purpose', header: 'Keperluan / Purpose', className: 'text-slate-500', render: (req) => req.purpose },
          {
            key: 'status',
            header: 'Status',
            align: 'center',
            render: (req) => (
              req.status === 'APPROVED' ? (
                <span className="px-2 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 rounded-full text-[10px] font-bold inline-flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Disetujui</span>
                </span>
              ) : (
                <span className="px-2 py-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 rounded-full text-[10px] font-bold inline-flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>Menunggu ACC</span>
                </span>
              )
            )
          },
          {
            key: 'actions',
            header: 'Aksi Approval',
            align: 'center',
            sortable: false,
            render: (req) => (
              req.status === 'PENDING' ? (
                <button
                  onClick={() => handleApprove(req.id)}
                  className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-[11px] font-semibold transition-all shadow-sm cursor-pointer"
                >
                  ACC Pengeluaran
                </button>
              ) : (
                <span className="text-slate-400 text-[11px] font-mono">Selesai</span>
              )
            )
          }
        ]}
        data={requisitions}
        keyExtractor={(req) => req.id}
      />

      {/* Modal Add Requisition */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 w-full max-w-md shadow-2xl space-y-4 text-slate-900 dark:text-white">
            <h3 className="text-base font-bold">Buat Form Permintaan Barang</h3>
            <form onSubmit={handleCreateRequest} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Departemen Pemohon</label>
                <input
                  type="text"
                  required
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Nama Pemohon</label>
                <input
                  type="text"
                  required
                  value={formData.requester}
                  onChange={(e) => setFormData({ ...formData, requester: e.target.value })}
                  className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Nama Item Barang</label>
                <input
                  type="text"
                  required
                  value={formData.itemName}
                  onChange={(e) => setFormData({ ...formData, itemName: e.target.value })}
                  className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold mb-1">Jumlah Qty</label>
                  <input
                    type="number"
                    value={formData.requestedQty}
                    onChange={(e) => setFormData({ ...formData, requestedQty: Number(e.target.value) })}
                    className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Satuan UOM</label>
                  <input
                    type="text"
                    value={formData.uom}
                    onChange={(e) => setFormData({ ...formData, uom: e.target.value })}
                    className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Keperluan / Purpose</label>
                <input
                  type="text"
                  value={formData.purpose}
                  onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                  className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-200 dark:bg-slate-800 rounded-xl font-semibold"
                >
                  Batal
                </button>
                <button type="submit" className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-xl font-semibold">
                  Kirim Permintaan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
