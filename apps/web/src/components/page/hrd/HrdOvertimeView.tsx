'use client';

import React, { useState } from 'react';
import { Clock, CheckCircle2, Clock3, XCircle, HelpCircle, X } from 'lucide-react';
import { SearchableSelect } from '@/components/ui/dropdowns/SearchableSelect';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';

interface OvertimeLogItem {
  id: string;
  empName: string;
  dept: string;
  date: string;
  hours: number;
  reason: string;
  status: string;
  approvedBy: string;
}

export const HrdOvertimeView = () => {
  const [filterStatus, setFilterStatus] = useState<'ALL' | 'APPROVED' | 'PENDING' | 'REJECTED'>('APPROVED');
  const [showGlossary, setShowGlossary] = useState(false);

  const mockOvertimeLogs: OvertimeLogItem[] = [
    { id: 'ot-01', empName: 'Budi Santoso', dept: 'Holding Central', date: '2026-07-24', hours: 3, reason: 'Closing Laporan Keuangan Konsolidasi Q2', status: 'APPROVED', approvedBy: 'Director of HR' },
    { id: 'ot-02', empName: 'Rudi Hermawan', dept: 'Mining Operations', date: '2026-07-23', hours: 4, reason: 'Perbaikan Fleet Excavator Pit Site-B', status: 'APPROVED', approvedBy: 'Pit Manager' },
    { id: 'ot-03', empName: 'Dewi Lestari', dept: 'Culinary & Catering', date: '2026-07-22', hours: 2, reason: 'Persiapan Event Katering Corporate 500 Pax', status: 'PENDING', approvedBy: '-' },
    { id: 'ot-04', empName: 'Ahmad Subagyo', dept: 'Retail Store', date: '2026-07-21', hours: 2.5, reason: 'Stock Opname Bulanan Gudang', status: 'REJECTED', approvedBy: 'Store Head' }
  ];

  const filteredLogs = mockOvertimeLogs.filter((l) => (filterStatus === 'ALL' ? true : l.status === filterStatus));

  const columns: ColumnDef<OvertimeLogItem>[] = [
    {
      key: 'empName',
      header: 'Nama Karyawan',
      render: (l) => (
        <div>
          <div className="font-bold text-slate-900 dark:text-white">{l.empName}</div>
          <div className="text-[10px] text-slate-400">{l.dept}</div>
        </div>
      )
    },
    { key: 'date', header: 'Tanggal', align: 'center', className: 'font-mono text-[11px]', render: (l) => l.date },
    { key: 'hours', header: 'Durasi Lembur', align: 'center', className: 'font-bold text-amber-600 font-mono', render: (l) => `${l.hours} Jam` },
    { key: 'reason', header: 'Alasan / Pekerjaan Lembur', className: 'text-slate-700 dark:text-slate-300', render: (l) => l.reason },
    {
      key: 'status',
      header: 'Status',
      align: 'center',
      render: (l) => (
        l.status === 'APPROVED' ? (
          <span className="px-2.5 py-1 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold rounded-full text-[10px] inline-flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Approved
          </span>
        ) : l.status === 'PENDING' ? (
          <span className="px-2.5 py-1 bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 font-bold rounded-full text-[10px] inline-flex items-center gap-1">
            <Clock3 className="w-3 h-3" /> Pending
          </span>
        ) : (
          <span className="px-2.5 py-1 bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 font-bold rounded-full text-[10px] inline-flex items-center gap-1">
            <XCircle className="w-3 h-3" /> Rejected
          </span>
        )
      )
    },
    { key: 'approvedBy', header: 'Approver', className: 'font-semibold text-slate-600 dark:text-slate-400', render: (l) => l.approvedBy }
  ];

  return (
    <div className="space-y-4 text-xs">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-xl shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <h1 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>Data Lembur</span>
          </h1>

          <div className="relative">
            <button
              onClick={() => setShowGlossary(!showGlossary)}
              className="text-slate-400 hover:text-amber-500 transition-colors p-1 cursor-pointer"
              title="Informasi & Glossary Data Lembur"
            >
              <HelpCircle className="w-4 h-4" />
            </button>

            {showGlossary && (
              <div className="absolute left-0 top-7 z-30 w-80 p-3.5 bg-slate-900 text-white rounded-2xl shadow-xl text-xs space-y-2 border border-slate-700">
                <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 font-bold text-amber-400">
                  <span>Glossary Overtime & Persetujuan</span>
                  <button onClick={() => setShowGlossary(false)} className="text-slate-400 hover:text-white cursor-pointer">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-[11px] text-slate-300">
                  Hanya jam lembur berstatus <strong>APPROVED</strong> yang dimasukkan ke kalkulasi pembayaran Payroll. Jam lembur PENDING & REJECTED tetap dapat dipantau oleh HRD untuk audit kinerja.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex items-center gap-2 w-64">
          <SearchableSelect
            options={[
              { id: 'ALL', label: 'Semua Status Lembur' },
              { id: 'APPROVED', label: 'Disetujui (Approved)' },
              { id: 'PENDING', label: 'Menunggu (Pending)' },
              { id: 'REJECTED', label: 'Ditolak (Rejected)' }
            ]}
            value={filterStatus}
            onChange={(val) => setFilterStatus(val as any)}
            placeholder="Filter Status Lembur..."
          />
        </div>
      </div>

      <DataTable
        headerTitle={`Data Pengajuan & Eksekusi Lembur (${filteredLogs.length})`}
        columns={columns}
        data={filteredLogs}
        keyExtractor={(l) => l.id}
      />
    </div>
  );
};
