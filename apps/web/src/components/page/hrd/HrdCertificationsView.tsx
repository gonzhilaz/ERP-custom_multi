'use client';

import React, { useState } from 'react';
import { Award, HelpCircle, X } from 'lucide-react';
import { useHrExtended } from '@/hooks/hrd/useHrExtended';
import { EmployeeCertification } from '@/lib/mock/hr-extended';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';

export const HrdCertificationsView = () => {
  const { certifications } = useHrExtended();
  const [showGlossary, setShowGlossary] = useState(false);

  const columns: ColumnDef<EmployeeCertification>[] = [
    { key: 'employeeName', header: 'Nama Karyawan', className: 'font-bold text-slate-900 dark:text-white', render: (c) => c.employeeName },
    { key: 'departmentName', header: 'Departemen', className: 'text-slate-600 dark:text-slate-300', render: (c) => c.departmentName },
    { key: 'certificateName', header: 'Nama Lisensi / Sertifikasi', className: 'font-bold text-indigo-600 dark:text-indigo-400', render: (c) => c.certificateName },
    { key: 'issuer', header: 'Penerbit Lisensi', className: 'text-slate-500', render: (c) => c.issuer },
    { key: 'expiryDate', header: 'Tanggal Kedaluwarsa', align: 'center', className: 'font-mono font-semibold', render: (c) => c.expiryDate },
    {
      key: 'status',
      header: 'Status SIO',
      align: 'center',
      render: (c) => (
        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
          c.status === 'VALID' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 animate-pulse'
        }`}>
          {c.status === 'VALID' ? 'BERLAKU' : 'SEGERA RE-SERTIFIKASI'}
        </span>
      )
    }
  ];

  return (
    <div className="space-y-4 text-xs">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-xl shrink-0">
            <Award className="w-5 h-5" />
          </div>
          <h1 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>Pelatihan & Sertifikasi</span>
          </h1>

          <div className="relative">
            <button onClick={() => setShowGlossary(!showGlossary)} className="text-slate-400 hover:text-indigo-500 p-1 cursor-pointer">
              <HelpCircle className="w-4 h-4" />
            </button>
            {showGlossary && (
              <div className="absolute left-0 top-7 z-30 w-80 p-3.5 bg-slate-900 text-white rounded-2xl shadow-xl text-xs space-y-2 border border-slate-700">
                <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 font-bold text-indigo-400">
                  <span>Sertifikasi & SIO K3</span>
                  <button onClick={() => setShowGlossary(false)} className="text-slate-400 hover:text-white"><X className="w-3.5 h-3.5" /></button>
                </div>
                <p className="text-[11px] text-slate-300">
                  Pelacakan lisensi SIO K3 Operator Alat Berat (Mining), Sertifikasi Hygiene Pangan (Resto/Hotel), & riwayat pelatihan karyawan.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <DataTable
        headerTitle={`Katalog Sertifikasi & SIO K3 (${certifications.length})`}
        columns={columns}
        data={certifications}
        keyExtractor={(c) => c.id}
      />
    </div>
  );
};
