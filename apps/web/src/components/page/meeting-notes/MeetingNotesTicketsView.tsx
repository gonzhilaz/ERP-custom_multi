'use client';

import React, { useState } from 'react';
import { Plus, Search, Filter, AlertTriangle, CheckCircle2, ArrowUpRight, Trash2 } from 'lucide-react';
import { PrimaryButton } from '@/components/ui/button/PrimaryButton';
import { ActionButton } from '@/components/ui/button/ActionButton';
import { StatusBadge } from '@/components/ui/badge/StatusBadge';
import { GlossaryPopover } from '@/components/ui/popover/GlossaryPopover';
import { SearchableSelect } from '@/components/ui/dropdowns/SearchableSelect';
import { useMeetingNotes } from '@/hooks/meeting/useMeetingNotes';

export function MeetingNotesTicketsView() {
  const {
    tickets,
    searchQuery,
    setSearchQuery,
    selectedBranch,
    setSelectedBranch,
    selectedPriority,
    setSelectedPriority,
    addTicket,
    resolveTicketBySupervisor,
    escalateTicketToHO,
    softDeleteTicket
  } = useMeetingNotes();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resolveModalTicketId, setResolveModalTicketId] = useState<string | null>(null);

  // Form states for new ticket
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<'HEAVY_EQUIPMENT' | 'RAW_MATERIAL' | 'HOSPITALITY_AC' | 'SECURITY' | 'FINANCE_APPROVAL'>('HEAVY_EQUIPMENT');
  const [priority, setPriority] = useState<'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'>('MEDIUM');
  const [branchLocation, setBranchLocation] = useState('Head Office Jakarta & Central Kitchen');
  const [createdByName, setCreatedByName] = useState('Budi Supervisor');

  // Form state for resolution
  const [solutionNote, setSolutionNote] = useState('');
  const [resolvedByName, setResolvedByName] = useState('Manager Operasional');

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;
    addTicket({ title, description, category, priority, branchLocation, createdByName });
    setTitle('');
    setDescription('');
    setIsModalOpen(false);
  };

  const handleResolveTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resolveModalTicketId || !solutionNote) return;
    resolveTicketBySupervisor(resolveModalTicketId, solutionNote, resolvedByName);
    setSolutionNote('');
    setResolveModalTicketId(null);
  };

  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">Tiket Kendala</h1>
          <GlossaryPopover
            title="Tiket Kendala Operasional"
            description="Manajemen pembuatan tiket kendala lapangan oleh staf, resolusi langsung oleh manager cabang, atau eskalasi ke rapat Direksi HO."
          />
        </div>
        <PrimaryButton icon={Plus} label="Buat Tiket" onClick={() => setIsModalOpen(true)} />
      </div>

      {/* Filter & Live Search Bar */}
      <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari Kode Tiket, Judul, Pelapor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-sky-500"
            />
          </div>

          <SearchableSelect
            options={[
              { id: 'ALL', label: 'Semua Cabang' },
              { id: 'Berau', label: 'Site East Borneo Facility (Berau)' },
              { id: 'Jakarta', label: 'Resto & Kitchen Jakarta' },
              { id: 'Bogor', label: 'Hotel Alam Pakuan (Bogor)' }
            ]}
            value={selectedBranch}
            onChange={(val) => setSelectedBranch(val)}
            placeholder="Pilih Cabang"
          />

          <SearchableSelect
            options={[
              { id: 'ALL', label: 'Semua Prioritas' },
              { id: 'CRITICAL', label: 'CRITICAL' },
              { id: 'HIGH', label: 'HIGH' },
              { id: 'MEDIUM', label: 'MEDIUM' },
              { id: 'LOW', label: 'LOW' }
            ]}
            value={selectedPriority}
            onChange={(val) => setSelectedPriority(val)}
            placeholder="Pilih Prioritas"
          />
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="p-3">Kode & Tanggal</th>
                <th className="p-3">Judul Kendala & Deskripsi</th>
                <th className="p-3">Prioritas</th>
                <th className="p-3">Status Workflow</th>
                <th className="p-3">Lokasi Cabang</th>
                <th className="p-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-xs">
              {tickets.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-400">Tidak ada tiket kendala ditemukan.</td>
                </tr>
              ) : (
                tickets.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition">
                    <td className="p-3 font-mono font-bold text-sky-600 dark:text-sky-400">
                      <div>{t.ticketCode}</div>
                      <div className="text-[10px] text-slate-400 font-normal">{t.createdAt}</div>
                    </td>
                    <td className="p-3 space-y-0.5">
                      <div className="font-bold text-slate-900 dark:text-white">{t.title}</div>
                      <div className="text-[11px] text-slate-500 line-clamp-1">{t.description}</div>
                      {t.solutionNote && (
                        <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">Solusi: {t.solutionNote}</div>
                      )}
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full border ${
                        t.priority === 'CRITICAL' ? 'bg-red-500/10 text-red-600 border-red-500/30' :
                        t.priority === 'HIGH' ? 'bg-amber-500/10 text-amber-600 border-amber-500/30' :
                        'bg-slate-500/10 text-slate-600 border-slate-500/30'
                      }`}>
                        {t.priority}
                      </span>
                    </td>
                    <td className="p-3">
                      <StatusBadge
                        type={t.status === 'RESOLVED' || t.status === 'CLOSED' ? 'ACTIVE' : t.status === 'ESCALATED_TO_HO' ? 'WARNING' : 'PENDING'}
                        label={t.status}
                      />
                    </td>
                    <td className="p-3 text-slate-600 dark:text-slate-400">{t.branchLocation}</td>
                    <td className="p-3 text-right space-x-1">
                      {t.status === 'OPEN' && (
                        <>
                          <ActionButton icon={CheckCircle2} label="Selesaikan" onClick={() => setResolveModalTicketId(t.id)} />
                          <ActionButton icon={ArrowUpRight} label="Eskalasi HO" onClick={() => escalateTicketToHO(t.id)} />
                        </>
                      )}
                      <button onClick={() => softDeleteTicket(t.id)} className="p-1 text-slate-400 hover:text-red-500 transition">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Buat Tiket */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white dark:bg-slate-900 rounded-xl max-w-lg w-full p-6 space-y-4 shadow-xl border border-slate-200 dark:border-slate-800">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Buat Tiket Kendala Baru</h3>
            <form onSubmit={handleCreateTicket} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Judul Kendala *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Contoh: Stok Solar Kritis di Pit Berau"
                  className="w-full mt-1 p-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Detail Rincian Kendala *</label>
                <textarea
                  required
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Jelaskan kendala operasional secara rinci..."
                  className="w-full mt-1 p-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Prioritas</label>
                  <SearchableSelect
                    options={[
                      { id: 'LOW', label: 'LOW' },
                      { id: 'MEDIUM', label: 'MEDIUM' },
                      { id: 'HIGH', label: 'HIGH' },
                      { id: 'CRITICAL', label: 'CRITICAL' }
                    ]}
                    value={priority}
                    onChange={(val) => setPriority(val as any)}
                    placeholder="Pilih Prioritas"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Pelapor / Staf</label>
                  <input
                    type="text"
                    value={createdByName}
                    onChange={(e) => setCreatedByName(e.target.value)}
                    className="w-full mt-1 p-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <ActionButton icon={Trash2} label="Batal" onClick={() => setIsModalOpen(false)} />
                <PrimaryButton icon={Plus} label="Simpan Tiket" onClick={() => {}} />
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Selesaikan Tiket */}
      {resolveModalTicketId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white dark:bg-slate-900 rounded-xl max-w-md w-full p-6 space-y-4 shadow-xl border border-slate-200 dark:border-slate-800">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Resolusi Solusi Tiket</h3>
            <form onSubmit={handleResolveTicket} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Catatan Solusi / Penyelesaian *</label>
                <textarea
                  required
                  rows={3}
                  value={solutionNote}
                  onChange={(e) => setSolutionNote(e.target.value)}
                  placeholder="Masukkan tindakan/solusi yang dilakukan..."
                  className="w-full mt-1 p-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Penanggung Jawab / Manager</label>
                <input
                  type="text"
                  value={resolvedByName}
                  onChange={(e) => setResolvedByName(e.target.value)}
                  className="w-full mt-1 p-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <ActionButton icon={Trash2} label="Batal" onClick={() => setResolveModalTicketId(null)} />
                <PrimaryButton icon={CheckCircle2} label="Simpan Solusi" onClick={() => {}} />
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
