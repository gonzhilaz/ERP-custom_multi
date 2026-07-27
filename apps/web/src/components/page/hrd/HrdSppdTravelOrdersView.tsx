'use client';

import React, { useState } from 'react';
import { Plane, Plus, CheckCircle2, FileText, ShieldAlert, ArrowRight, Building2, UserCheck, Eye, Search } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { KpiCard } from '@/components/ui/cards/KpiCard';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';
import { INITIAL_SPPD_ORDERS, SppdOrder, generateSppdNumber } from '@/lib/hrd/sppd-governance';
import { SppdDocumentModal } from '@/components/ui/modals/SppdDocumentModal';

export const HrdSppdTravelOrdersView = () => {
  const [orders, setOrders] = useState<SppdOrder[]>(INITIAL_SPPD_ORDERS);
  const [selectedOrder, setSelectedOrder] = useState<SppdOrder | null>(null);
  const [isDocModalOpen, setIsDocModalOpen] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const [form, setForm] = useState({
    employeeName: 'Budi Santoso (NIP: EMP-009)',
    employeePosition: 'Field Sales & Marketing Executive',
    department: 'Sales & Distribution',
    originBranch: 'Jakarta HQ Holding',
    destinationBranch: 'Resto & Bakery Surabaya Branch',
    purpose: 'Penjajakan Kerjasama Catering Massal Industri & Ekspansi Distributor',
    startDate: '2026-08-15',
    endDate: '2026-08-18',
    daysCount: 4,
    allowancePerDiem: 2000000,
    transportAllowance: 1500000
  });

  const handleApprove = (id: string) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === id
          ? {
              ...o,
              status: 'ISSUED',
              approvedByManager: 'Direksi HRD Holding',
              issuedDate: new Date().toISOString().split('T')[0]
            }
          : o
      )
    );
    alert('Disposisi Surat Perintah Perjalanan Dinas (SPPD) Berhasil Disetujui!');
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const newOrder: SppdOrder = {
      id: `sppd-${Date.now()}`,
      sppdNumber: generateSppdNumber(orders.length + 46),
      employeeId: 'EMP-009',
      employeeName: 'Budi Santoso',
      employeePosition: form.employeePosition,
      department: form.department,
      originBranch: form.originBranch,
      destinationBranch: form.destinationBranch,
      purpose: form.purpose,
      startDate: form.startDate,
      endDate: form.endDate,
      daysCount: form.daysCount,
      allowancePerDiem: form.allowancePerDiem,
      transportAllowance: form.transportAllowance,
      status: 'WAITING_SPV_APPROVAL',
      qrVerificationToken: `SPPD-VERIFY-${Math.floor(1000 + Math.random() * 9000)}`
    };

    setOrders([newOrder, ...orders]);
    setShowCreateModal(false);
    alert(`Surat Perintah Perjalanan Dinas [${newOrder.sppdNumber}] Berhasil Diajukan! Menunggu Approval Supervisor.`);
  };

  const columns: ColumnDef<SppdOrder>[] = [
    { key: 'sppdNumber', header: 'No. Surat SPPD', className: 'font-mono font-bold text-indigo-600 dark:text-indigo-400', render: (i) => i.sppdNumber },
    { key: 'employeeName', header: 'Karyawan Terperintah', className: 'font-bold text-slate-900 dark:text-white', render: (i) => i.employeeName },
    { key: 'destinationBranch', header: 'Unit Tujuan (Cabang)', className: 'text-slate-700 dark:text-slate-300 font-semibold', render: (i) => i.destinationBranch },
    { key: 'startDate', header: 'Masa Perintah Dinas', className: 'font-mono text-slate-500', render: (i) => `${i.startDate} s/d ${i.endDate} (${i.daysCount} Hr)` },
    { key: 'allowancePerDiem', header: 'Total Per-Diem (Rp)', align: 'right', className: 'font-mono font-bold text-emerald-600 dark:text-emerald-400', render: (i) => `Rp ${(i.allowancePerDiem + i.transportAllowance).toLocaleString('id-ID')}` },
    {
      key: 'status',
      header: 'Status Disposisi',
      align: 'center',
      render: (i) => (
        <span
          className={`px-2 py-0.5 font-bold font-mono text-[10px] rounded-full border ${
            i.status === 'ISSUED'
              ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/30'
              : 'bg-amber-500/10 text-amber-600 border-amber-500/30 animate-pulse'
          }`}
        >
          {i.status === 'ISSUED' ? 'Terbit & Sah' : 'Pending Approval'}
        </span>
      )
    },
    {
      key: 'actions',
      header: 'Aksi',
      align: 'center',
      render: (i) => (
        <div className="flex items-center justify-center gap-1.5">
          <button
            onClick={() => {
              setSelectedOrder(i);
              setIsDocModalOpen(true);
            }}
            className="px-2 py-1 bg-sky-500/10 text-sky-600 dark:text-sky-400 hover:bg-sky-500/20 rounded-lg font-bold text-[11px] flex items-center gap-1 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Lihat SPPD</span>
          </button>
          {i.status !== 'ISSUED' && (
            <button
              onClick={() => handleApprove(i.id)}
              className="px-2 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold text-[11px] flex items-center gap-1 cursor-pointer shadow-sm"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Approve</span>
            </button>
          )}
        </div>
      )
    }
  ];

  return (
    <div className="space-y-4 text-xs">
      <ModuleHeader
        title="SPPD Dinas"
        icon={Plane}
        iconBgColor="bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
        glossaryTitle="Glossary SPPD Inter-Branch"
        glossaryItems={[
          { term: 'SPPD / Surat Jalan Perintah', description: 'Surat disposisi tugas resmi dari atasan untuk perjalanan keluar unit usaha/cabang.' },
          { term: 'Per-Diem Allowance', description: 'Uang saku harian karyawan selama menjalankan perintah tugas dinas resmi.' }
        ]}
        badges={[
          { label: 'Multi-Tier Managerial Approval', variant: 'emerald' },
          { label: 'QR Code Document Verification', variant: 'sky' }
        ]}
      />

      {/* Top Action Bar */}
      <div className="flex justify-between items-center bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h2 className="text-sm font-bold text-slate-900 dark:text-white">Daftar Disposisi Tugas Keluar Cabang (SPPD)</h2>
          <p className="text-[11px] text-slate-400">Penerbitan Surat Tugas Resmi & Alokasi Per-Diem Inter-Branch</p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Buat Pengajuan SPPD Baru</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard title="SPPD Aktif Bulan Ini" value={`${orders.length} Dokumen`} subtitle="Tugas Inter-Branch" icon={Plane} iconBgColor="bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50" />
        <KpiCard title="Pending Disposisi ACC" value={`${orders.filter((o) => o.status !== 'ISSUED').length} Request`} subtitle="Menunggu Manager" icon={ShieldAlert} iconBgColor="bg-amber-50 text-amber-600 dark:bg-amber-950/50" />
        <KpiCard title="SPPD Terbit & Sah" value={`${orders.filter((o) => o.status === 'ISSUED').length} Terbit`} subtitle="QR Verified" icon={CheckCircle2} iconBgColor="bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50" />
        <KpiCard title="Alokasi Per-Diem" value="Rp 9.500.000" subtitle="Total Uang Saku Dinas" icon={Building2} iconBgColor="bg-purple-50 text-purple-600 dark:bg-purple-950/50" />
      </div>

      {/* Reusable Data Table */}
      <DataTable headerTitle="Tabel Dokumen Surat Perintah Perjalanan Dinas (SPPD)" columns={columns} data={orders} keyExtractor={(i) => i.id} />

      {/* Document Viewer Modal */}
      <SppdDocumentModal isOpen={isDocModalOpen} onClose={() => setIsDocModalOpen(false)} order={selectedOrder} />

      {/* Create SPPD Modal Form */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <form onSubmit={handleCreate} className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Plane className="w-4 h-4 text-indigo-500" />
                <span>Form Pengajuan Surat Perintah Perjalanan Dinas (SPPD)</span>
              </h3>
              <button type="button" onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-rose-500">✕</button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">Nama Karyawan Terperintah:</label>
                <input
                  type="text"
                  value={form.employeeName}
                  onChange={(e) => setForm({ ...form, employeeName: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">Unit Asal (Origin):</label>
                  <input
                    type="text"
                    value={form.originBranch}
                    onChange={(e) => setForm({ ...form, originBranch: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
                    required
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">Unit Tujuan (Destination):</label>
                  <input
                    type="text"
                    value={form.destinationBranch}
                    onChange={(e) => setForm({ ...form, destinationBranch: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">Maksud & Alasan Instruksi Perjalanan Dinas:</label>
                <textarea
                  value={form.purpose}
                  onChange={(e) => setForm({ ...form, purpose: e.target.value })}
                  rows={2}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">Tgl Berangkat:</label>
                  <input
                    type="date"
                    value={form.startDate}
                    onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">Tgl Kembali:</label>
                  <input
                    type="date"
                    value={form.endDate}
                    onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">Jumlah Hari:</label>
                  <input
                    type="number"
                    value={form.daysCount}
                    onChange={(e) => setForm({ ...form, daysCount: Number(e.target.value) })}
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold"
              >
                Batal
              </button>
              <button type="submit" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-md">
                Terbitkan SPPD
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
