'use client';

import React, { useState } from 'react';
import { Clock, ShieldCheck, DollarSign, Key, Plus, Trash2, Edit2 } from 'lucide-react';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';
import { DynamicSearchFilter } from '@/components/ui/forms/DynamicSearchFilter';

export interface CheckInCheckoutPolicy {
  id: string;
  policyCode: string;
  policyName: string;
  standardCheckInTime: string;
  standardCheckOutTime: string;
  earlyCheckInFeePct: number;
  lateCheckOutFeePerHour: number;
  securityDepositAmount: number;
  requireIdentityScan: boolean;
  autoEncoderRfid: boolean;
  description: string;
}

const INITIAL_POLICIES: CheckInCheckoutPolicy[] = [
  {
    id: 'pol-01',
    policyCode: 'STD_HOTEL_POLICY',
    policyName: 'Aturan Standar Check-in 14:00 & Checkout 12:00',
    standardCheckInTime: '14:00 WIB',
    standardCheckOutTime: '12:00 WIB',
    earlyCheckInFeePct: 50,
    lateCheckOutFeePerHour: 100000,
    securityDepositAmount: 250000,
    requireIdentityScan: true,
    autoEncoderRfid: true,
    description: 'Aturan standar operasional Front Desk untuk tamu reguler, corporate, dan reservasi OTA.'
  },
  {
    id: 'pol-02',
    policyCode: 'VIP_FLEXI_POLICY',
    policyName: 'Aturan Flexi Check-in VIP & Executive Suite',
    standardCheckInTime: '12:00 WIB',
    standardCheckOutTime: '14:00 WIB',
    earlyCheckInFeePct: 0,
    lateCheckOutFeePerHour: 0,
    securityDepositAmount: 500000,
    requireIdentityScan: true,
    autoEncoderRfid: true,
    description: 'Fasilitas fleksibilitas waktu check-in & checkout khusus untuk pemegang Platinum VIP dan Executive Suite.'
  }
];

export const CheckInCheckoutParamView: React.FC = () => {
  const [policies, setPolicies] = useState<CheckInCheckoutPolicy[]>(INITIAL_POLICIES);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState<Omit<CheckInCheckoutPolicy, 'id'>>({
    policyCode: 'NEW_POLICY',
    policyName: 'Aturan Operasional Baru',
    standardCheckInTime: '14:00 WIB',
    standardCheckOutTime: '12:00 WIB',
    earlyCheckInFeePct: 50,
    lateCheckOutFeePerHour: 100000,
    securityDepositAmount: 200000,
    requireIdentityScan: true,
    autoEncoderRfid: true,
    description: 'Keterangan kebijakan check-in dan checkout.'
  });

  const filtered = policies.filter((p) =>
    p.policyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.policyCode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      setPolicies(policies.map((p) => (p.id === editingId ? { ...form, id: editingId } : p)));
    } else {
      setPolicies([...policies, { ...form, id: `pol-${Date.now()}` }]);
    }
    setShowModal(false);
    setEditingId(null);
  };

  const columns: ColumnDef<CheckInCheckoutPolicy>[] = [
    { key: 'policyCode', header: 'Kode Aturan', className: 'font-mono font-bold text-sky-600 dark:text-sky-400', render: (i) => i.policyCode },
    { key: 'policyName', header: 'Nama Kebijakan Check-in / Checkout', className: 'font-bold text-slate-900 dark:text-white', render: (i) => i.policyName },
    { key: 'standardCheckInTime', header: 'Standar Check-in', align: 'center', className: 'font-mono font-bold text-emerald-600', render: (i) => i.standardCheckInTime },
    { key: 'standardCheckOutTime', header: 'Standar Checkout', align: 'center', className: 'font-mono font-bold text-amber-600', render: (i) => i.standardCheckOutTime },
    { key: 'earlyCheckInFeePct', header: 'Biaya Early Check-in', align: 'center', className: 'font-mono text-slate-700 dark:text-slate-300', render: (i) => `${i.earlyCheckInFeePct}% Rate` },
    { key: 'lateCheckOutFeePerHour', header: 'Denda Late Checkout / Jam', align: 'right', className: 'font-mono font-bold text-rose-600', render: (i) => `Rp ${i.lateCheckOutFeePerHour.toLocaleString('id-ID')}` },
    { key: 'securityDepositAmount', header: 'Deposit Jaminan (Rp)', align: 'right', className: 'font-mono font-bold text-sky-600', render: (i) => `Rp ${i.securityDepositAmount.toLocaleString('id-ID')}` },
    {
      key: 'actions',
      header: 'Aksi CRUD',
      align: 'center',
      render: (i) => (
        <div className="flex items-center justify-center gap-1">
          <button
            onClick={() => {
              setEditingId(i.id);
              setForm(i);
              setShowModal(true);
            }}
            className="p-1 text-sky-600 hover:bg-sky-50 dark:hover:bg-sky-950/40 rounded-lg transition-colors cursor-pointer"
            title="Edit Parameter"
          >
            <Edit2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setPolicies(policies.filter((p) => p.id !== i.id))}
            className="p-1 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors cursor-pointer"
            title="Hapus Parameter"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-4 text-xs">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Clock className="w-4 h-4 text-sky-500" />
            <span>Master Aturan Jam Check-in & Checkout Hotel</span>
          </h2>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Konfigurasi dinamis jam standar, formula denda late checkout, biaya early check-in, dan jaminan deposit.
          </p>
        </div>
        <button
          onClick={() => {
            setEditingId(null);
            setShowModal(true);
          }}
          className="px-3.5 py-2 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-sm text-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Aturan Check-in</span>
        </button>
      </div>

      <DynamicSearchFilter
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Cari kode aturan atau nama kebijakan..."
        categoryPlaceholder="Semua Kebijakan Check-in"
      />

      <DataTable
        headerTitle={`Daftar Kebijakan Waktu Check-in & Checkout Terdaftar (${filtered.length})`}
        columns={columns}
        data={filtered}
        keyExtractor={(i) => i.id}
      />

      {/* Modal CRUD Parameter */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 w-full max-w-lg space-y-4 shadow-2xl">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              {editingId ? 'Edit Parameter Check-in & Checkout' : 'Tambah Parameter Check-in & Checkout Baru'}
            </h3>
            <form onSubmit={handleSave} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">Kode Aturan</label>
                  <input type="text" value={form.policyCode} onChange={(e) => setForm({ ...form, policyCode: e.target.value })} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-mono font-bold" required />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">Nama Kebijakan</label>
                  <input type="text" value={form.policyName} onChange={(e) => setForm({ ...form, policyName: e.target.value })} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs" required />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-emerald-600 dark:text-emerald-400 mb-1">Standar Waktu Check-in</label>
                  <input type="text" value={form.standardCheckInTime} onChange={(e) => setForm({ ...form, standardCheckInTime: e.target.value })} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-mono font-bold" required />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-amber-600 dark:text-amber-400 mb-1">Standar Waktu Checkout</label>
                  <input type="text" value={form.standardCheckOutTime} onChange={(e) => setForm({ ...form, standardCheckOutTime: e.target.value })} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-mono font-bold" required />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">Denda Late Checkout (/Jam)</label>
                  <input type="number" value={form.lateCheckOutFeePerHour} onChange={(e) => setForm({ ...form, lateCheckOutFeePerHour: Number(e.target.value) })} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-mono font-bold" required />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">Deposit Jaminan Kamar (Rp)</label>
                  <input type="number" value={form.securityDepositAmount} onChange={(e) => setForm({ ...form, securityDepositAmount: Number(e.target.value) })} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-mono font-bold" required />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">Keterangan Aturan Operasional</label>
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs" rows={2} required />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded-xl text-xs cursor-pointer">Batal</button>
                <button type="submit" className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl text-xs cursor-pointer">Simpan Parameter</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
