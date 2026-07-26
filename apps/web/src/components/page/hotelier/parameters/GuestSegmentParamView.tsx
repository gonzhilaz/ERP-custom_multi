'use client';

import React, { useState } from 'react';
import { Tag, Plus, Trash2, CheckCircle2, Edit3, ShieldAlert } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';
import { UniversalSearchBar } from '@/components/ui/forms/UniversalSearchBar';

export interface GuestSegmentMaster {
  id: string;
  segmentCode: string;
  segmentName: string;
  defaultDiscountPct: string;
  taxExempt: boolean;
  requiresCrmLink: boolean;
  description: string;
  status: 'ACTIVE' | 'ARCHIVED';
}

const INITIAL_SEGMENTS: GuestSegmentMaster[] = [
  { id: 'seg-01', segmentCode: 'GOVERNMENT', segmentName: 'Government (Dinas / Instansi Negara)', defaultDiscountPct: '20%', taxExempt: true, requiresCrmLink: true, description: 'Segmen tamu dinas instansi pemerintah dengan bebas pajak DIPA', status: 'ACTIVE' },
  { id: 'seg-02', segmentCode: 'WALK_IN', segmentName: 'Walk-In Guest (Front Desk Direct)', defaultDiscountPct: '0%', taxExempt: false, requiresCrmLink: false, description: 'Tamu umum yang datang langsung tanpa pemesanan awal', status: 'ACTIVE' },
  { id: 'seg-03', segmentCode: 'OTA', segmentName: 'Online Travel Agent (Traveloka/Booking.com)', defaultDiscountPct: '15%', taxExempt: false, requiresCrmLink: false, description: 'Pemesanan kamar melalui kanal OTA Traveloka, Agoda, Booking.com', status: 'ACTIVE' },
  { id: 'seg-04', segmentCode: 'CORPORATE', segmentName: 'Corporate (Perusahaan B2B Contract Rate)', defaultDiscountPct: '30%', taxExempt: false, requiresCrmLink: true, description: 'Tamu perusahaan langganan dengan rate kontrak khusus', status: 'ACTIVE' },
  { id: 'seg-05', segmentCode: 'INTERNAL', segmentName: 'Internal Holding (Direksi & Staf Group)', defaultDiscountPct: '50%', taxExempt: false, requiresCrmLink: true, description: 'Staf atau Direksi Holding Group yang berdinas', status: 'ACTIVE' },
  { id: 'seg-06', segmentCode: 'MICE', segmentName: 'MICE (Peserta Konferensi & Event Group)', defaultDiscountPct: '25%', taxExempt: false, requiresCrmLink: true, description: 'Tamu rombongan event, wedding, atau seminar MICE', status: 'ACTIVE' }
];

export const GuestSegmentParamView = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [segments, setSegments] = useState<GuestSegmentMaster[]>(INITIAL_SEGMENTS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState({
    segmentCode: '',
    segmentName: '',
    defaultDiscountPct: '0%',
    taxExempt: false,
    requiresCrmLink: false,
    description: ''
  });

  const filtered = segments.filter(
    (s) =>
      s.segmentCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.segmentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenAdd = () => {
    setEditingId(null);
    setForm({ segmentCode: '', segmentName: '', defaultDiscountPct: '0%', taxExempt: false, requiresCrmLink: false, description: '' });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: GuestSegmentMaster) => {
    setEditingId(item.id);
    setForm({
      segmentCode: item.segmentCode,
      segmentName: item.segmentName,
      defaultDiscountPct: item.defaultDiscountPct,
      taxExempt: item.taxExempt,
      requiresCrmLink: item.requiresCrmLink,
      description: item.description
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Apakah Anda yakin ingin mengarsipkan segmentasi tipe tamu ini?')) {
      setSegments(segments.filter((s) => s.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.segmentCode || !form.segmentName) {
      alert('Kode dan Nama Segmentasi Tamu wajib diisi!');
      return;
    }

    if (editingId) {
      setSegments(
        segments.map((s) =>
          s.id === editingId ? { ...s, ...form } : s
        )
      );
    } else {
      const created: GuestSegmentMaster = {
        id: `seg-${Date.now()}`,
        status: 'ACTIVE',
        ...form
      };
      setSegments([created, ...segments]);
    }

    setIsModalOpen(false);
  };

  const columns: ColumnDef<GuestSegmentMaster>[] = [
    { key: 'segmentCode', header: 'Kode Segmentasi', className: 'font-mono font-bold text-sky-600 dark:text-sky-400', render: (i) => i.segmentCode },
    { key: 'segmentName', header: 'Nama Tipe Segmentasi Tamu', className: 'font-bold text-slate-900 dark:text-white', render: (i) => i.segmentName },
    { key: 'defaultDiscountPct', header: 'Diskon Rate Standar', align: 'center', className: 'font-mono font-bold text-emerald-600 dark:text-emerald-400', render: (i) => i.defaultDiscountPct },
    {
      key: 'taxExempt',
      header: 'Bebas Pajak (DIPA)',
      align: 'center',
      render: (i) => (
        <span className={`px-2 py-0.5 font-bold font-mono text-[10px] rounded ${i.taxExempt ? 'bg-amber-500/10 text-amber-600' : 'bg-slate-100 text-slate-600'}`}>
          {i.taxExempt ? 'BEBAS PAJAK' : 'KENA PAJAK (PB1)'}
        </span>
      )
    },
    {
      key: 'requiresCrmLink',
      header: 'Wajib Link CRM Sales',
      align: 'center',
      render: (i) => (
        <span className={`px-2 py-0.5 font-bold font-mono text-[10px] rounded ${i.requiresCrmLink ? 'bg-sky-500/10 text-sky-600' : 'bg-slate-100 text-slate-600'}`}>
          {i.requiresCrmLink ? 'REQUIRED B2B' : 'OPTIONAL'}
        </span>
      )
    },
    { key: 'description', header: 'Deskripsi Keterangan', render: (i) => i.description },
    {
      key: 'actions',
      header: 'Kelola Aksi',
      align: 'center',
      render: (i) => (
        <div className="flex justify-center items-center gap-1.5">
          <button onClick={() => handleOpenEdit(i)} className="p-1.5 text-sky-600 hover:bg-sky-500/10 rounded-lg cursor-pointer">
            <Edit3 className="w-3.5 h-3.5" />
          </button>
          <button onClick={() => handleDelete(i.id)} className="p-1.5 text-rose-500 hover:bg-rose-500/10 rounded-lg cursor-pointer">
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-4 text-xs">
      <ModuleHeader
        title="Manage Dynamic Guest Segmentations Master"
        icon={Tag}
        iconBgColor="bg-sky-500/10 text-sky-600 dark:text-sky-400"
        glossaryTitle="Glossary Dynamic Guest Segments"
        glossaryItems={[
          { term: 'Master Segmentasi Tamu', description: 'Pengelompokan tipe tamu dinamis (Government, Corporate, MICE, OTA, Walk-in) yang dapat ditambah/diubah oleh Manajer Hotel.' },
          { term: 'Diskon Rate Standar', description: 'Persentase potongan harga bawaan dari tarif publish kamar saat memilih segmentasi.' }
        ]}
        badges={[
          { label: `${segments.length} Segmentations Configured`, variant: 'sky' },
          { label: 'Dynamic Master CRUD (Zero Hardcode)', variant: 'emerald' }
        ]}
        actions={
          <button onClick={handleOpenAdd} className="px-3.5 py-2 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl flex items-center gap-1.5 cursor-pointer text-xs">
            <Plus className="w-4 h-4" />
            <span>Tambah Segmentasi Baru</span>
          </button>
        }
      />

      <div className="p-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between gap-4">
        <div className="w-full md:w-96">
          <UniversalSearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Cari kode atau nama segmentasi..."
          />
        </div>
      </div>

      <DataTable
        headerTitle={`Daftar Master Dynamic Segmentasi Tamu Hotelier (${filtered.length})`}
        columns={columns}
        data={filtered}
        keyExtractor={(i) => i.id}
      />

      {/* Modal Add/Edit Guest Segment */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex justify-center items-center p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-2xl animate-in zoom-in-95 duration-150 text-xs">
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                {editingId ? 'Edit Master Segmentasi Tamu' : 'Tambah Master Segmentasi Tamu Baru'}
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Kode Segmentasi</label>
                  <input type="text" value={form.segmentCode} onChange={(e) => setForm({ ...form, segmentCode: e.target.value.toUpperCase() })} placeholder="Contoh: DIPLOMAT_VIP" className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono font-bold text-sky-600 text-xs" required />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Diskon Rate (%)</label>
                  <input type="text" value={form.defaultDiscountPct} onChange={(e) => setForm({ ...form, defaultDiscountPct: e.target.value })} placeholder="20%" className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono font-bold text-emerald-600 text-xs" required />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Nama Tipe Segmentasi Tamu</label>
                <input type="text" value={form.segmentName} onChange={(e) => setForm({ ...form, segmentName: e.target.value })} placeholder="Contoh: Diplomat & Tamu Negara VIP" className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white font-bold" required />
              </div>

              <div className="flex items-center gap-4 py-2 border-y border-slate-100 dark:border-slate-800">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.taxExempt} onChange={(e) => setForm({ ...form, taxExempt: e.target.checked })} className="rounded text-sky-600 focus:ring-sky-500" />
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Bebas Pajak (Tax Exempt)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.requiresCrmLink} onChange={(e) => setForm({ ...form, requiresCrmLink: e.target.checked })} className="rounded text-sky-600 focus:ring-sky-500" />
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Wajib Link CRM Sales B2B</span>
                </label>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Deskripsi Keterangan</label>
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} placeholder="Penjelasan syarat dan skop penggunaan segmentasi ini..." className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white" />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-slate-200 dark:bg-slate-800 text-slate-700 font-bold rounded-xl text-xs cursor-pointer">
                  Batal
                </button>
                <button type="submit" className="px-5 py-2 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl text-xs shadow-md cursor-pointer flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{editingId ? 'Simpan Perubahan' : 'Buat Segmentasi'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
