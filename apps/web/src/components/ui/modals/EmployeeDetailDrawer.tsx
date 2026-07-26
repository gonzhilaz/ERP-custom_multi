'use client';

import React from 'react';
import { X, User, HeartPulse, DollarSign, Award, Calendar, ShieldCheck } from 'lucide-react';
import { EmployeeItem } from '@/lib/mock/hrd';

export interface EmployeeDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  employee: EmployeeItem | null;
}

export const EmployeeDetailDrawer: React.FC<EmployeeDetailDrawerProps> = ({ isOpen, onClose, employee }) => {
  if (!isOpen || !employee) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex justify-center items-center p-4">
      <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-2xl animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex justify-between items-start border-b border-slate-200 dark:border-slate-800 pb-3">
          <div>
            <span className="font-mono text-xs font-bold text-sky-600 dark:text-sky-400">{employee.nik}</span>
            <h3 className="font-bold text-base text-slate-900 dark:text-white mt-0.5">{employee.fullName}</h3>
            <p className="text-xs text-slate-400">{employee.role} • {employee.unitUsaha}</p>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Employee Grid Info */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-200">
              <DollarSign className="w-4 h-4 text-emerald-500" />
              <span>Skema Gaji & Take Home Pay</span>
            </div>
            <div className="text-[11px] text-slate-500">Skema: <strong>{employee.salaryType}</strong></div>
            <div className="text-[11px] text-slate-500">Gaji Pokok: Rp {employee.baseSalary.toLocaleString('id-ID')}</div>
            <div className="text-xs font-bold text-emerald-600 mt-1">THP Net: Rp {employee.netSalary.toLocaleString('id-ID')}</div>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-200">
              <HeartPulse className="w-4 h-4 text-purple-500" />
              <span>Pajak PPh 21 TER & BPJS</span>
            </div>
            <div className="text-[11px] text-slate-500">Rate PPh 21: <strong>{employee.pph21Rate}% TER</strong></div>
            <div className="text-[11px] text-slate-500">BPJS Kesehatan: Rp {employee.bpjsKesehatan.toLocaleString('id-ID')}</div>
            <div className="text-[11px] text-slate-500">BPJS TK: Rp {employee.bpjsKetenagakerjaan.toLocaleString('id-ID')}</div>
          </div>
        </div>

        {/* Status Badges */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs">
          <span className="text-emerald-600 font-bold flex items-center gap-1">
            <ShieldCheck className="w-4 h-4" /> KARYAWAN AKTIF TERVERIFIKASI
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-bold shadow-md shadow-sky-600/20 transition-all"
          >
            Tutup (Close)
          </button>
        </div>
      </div>
    </div>
  );
};
