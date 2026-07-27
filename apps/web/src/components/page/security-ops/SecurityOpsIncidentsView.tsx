'use client';

import React, { useState } from 'react';
import { ShieldAlert, Plus, ArrowUpRight, CheckCircle2, Trash2 } from 'lucide-react';
import { PrimaryButton } from '@/components/ui/button/PrimaryButton';
import { ActionButton } from '@/components/ui/button/ActionButton';
import { StatusBadge } from '@/components/ui/badge/StatusBadge';
import { GlossaryPopover } from '@/components/ui/popover/GlossaryPopover';
import { SearchableSelect } from '@/components/ui/dropdowns/SearchableSelect';
import { useSecurityOps } from '@/hooks/security/useSecurityOps';
import { useMeetingNotes } from '@/hooks/meeting/useMeetingNotes';

export function SecurityOpsIncidentsView() {
  const { incidents, reportIncident, escalateIncidentToTicket } = useSecurityOps();
  const { addTicket } = useMeetingNotes();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [escalateIncidentId, setEscalateIncidentId] = useState<string | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [severity, setSeverity] = useState<'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'>('MEDIUM');
  const [patrolOfficerName, setPatrolOfficerName] = useState('Satpam Danru');
  const [branchLocation, setBranchLocation] = useState('Site East Borneo Facility (Berau)');

  const handleReportIncident = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !location) return;
    reportIncident({
      title,
      description,
      location,
      branchLocation,
      severity,
      patrolOfficerName
    });
    setTitle('');
    setDescription('');
    setLocation('');
    setIsModalOpen(false);
  };

  const handleConfirmEscalation = (incId: string) => {
    const targetInc = incidents.find((i) => i.id === incId);
    if (!targetInc) return;

    // 1-Click Create Ticket in Meeting Notes Module!
    const newTicket = addTicket({
      title: `[INCIDENT SECURITY] ${targetInc.title}`,
      description: `Lokasi: ${targetInc.location}. Deskripsi Insiden: ${targetInc.description}`,
      category: 'SECURITY',
      priority: targetInc.severity,
      branchLocation: targetInc.branchLocation,
      createdByName: targetInc.patrolOfficerName
    });

    // Mark Incident as Escalated
    escalateIncidentToTicket(incId, newTicket.ticketCode);
    setEscalateIncidentId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">Laporan Insiden Patroli</h1>
          <GlossaryPopover
            title="Laporan Insiden Patroli Shift"
            description="Pencatatan temuan insiden oleh satpam patroli serta fitur 1-Click Escalation menjadi Tiket Kendala Meeting Notes."
          />
        </div>
        <PrimaryButton icon={Plus} label="Laporkan Insiden" onClick={() => setIsModalOpen(true)} />
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 font-bold text-slate-500 uppercase tracking-wider text-[11px]">
                <th className="p-3">Kode Insiden</th>
                <th className="p-3">Judul Insiden & Lokasi</th>
                <th className="p-3">Tingkat Bahaya</th>
                <th className="p-3">Petugas Patroli</th>
                <th className="p-3">Status Workflow</th>
                <th className="p-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {incidents.map((inc) => (
                <tr key={inc.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                  <td className="p-3 font-mono font-bold text-red-600 dark:text-red-400">{inc.incidentCode}</td>
                  <td className="p-3 space-y-0.5">
                    <div className="font-bold text-slate-900 dark:text-white">{inc.title}</div>
                    <div className="text-[11px] text-slate-500">{inc.description}</div>
                    <div className="text-[10px] text-slate-400 font-medium">Lokasi: {inc.location} ({inc.branchLocation})</div>
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full border ${
                      inc.severity === 'CRITICAL' || inc.severity === 'HIGH'
                        ? 'bg-red-500/10 text-red-600 border-red-500/30'
                        : 'bg-amber-500/10 text-amber-600 border-amber-500/30'
                    }`}>
                      {inc.severity}
                    </span>
                  </td>
                  <td className="p-3 text-slate-600 dark:text-slate-400">{inc.patrolOfficerName}</td>
                  <td className="p-3">
                    <StatusBadge
                      type={inc.status === 'ESCALATED_TO_TICKET' ? 'WARNING' : 'ACTIVE'}
                      label={inc.status}
                    />
                    {inc.linkedTicketCode && (
                      <div className="text-[10px] text-sky-600 font-mono font-bold mt-1">Tiket: {inc.linkedTicketCode}</div>
                    )}
                  </td>
                  <td className="p-3 text-right">
                    {inc.status === 'REPORTED' && (
                      <ActionButton icon={ArrowUpRight} label="Eskalasi ke Meeting" onClick={() => handleConfirmEscalation(inc.id)} />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white dark:bg-slate-900 rounded-xl max-w-lg w-full p-6 space-y-4 shadow-xl border border-slate-200 dark:border-slate-800">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Laporkan Insiden Patroli Baru</h3>
            <form onSubmit={handleReportIncident} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Judul Temuan Insiden *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Lampu pos mati / pagar kawat rusak"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full mt-1 p-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Detail Rincian Insiden *</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Jelaskan kondisi temuan insiden..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full mt-1 p-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Spesifikasi Lokasi *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Patok 45 Pagar Barat"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full mt-1 p-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Tingkat Bahaya (Severity)</label>
                  <SearchableSelect
                    options={[
                      { id: 'LOW', label: 'LOW' },
                      { id: 'MEDIUM', label: 'MEDIUM' },
                      { id: 'HIGH', label: 'HIGH' },
                      { id: 'CRITICAL', label: 'CRITICAL' }
                    ]}
                    value={severity}
                    onChange={(val) => setSeverity(val as any)}
                    placeholder="Pilih Severity"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <ActionButton icon={Trash2} label="Batal" onClick={() => setIsModalOpen(false)} />
                <PrimaryButton icon={Plus} label="Simpan Laporan Insiden" onClick={() => {}} />
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
