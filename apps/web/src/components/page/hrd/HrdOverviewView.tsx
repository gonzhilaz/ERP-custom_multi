'use client';

import React from 'react';
import { Users, TrendingUp, UserCheck, Award, AlertTriangle, BarChart3, PieChart } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { KpiCard } from '@/components/ui/cards/KpiCard';
import { MOCK_EMPLOYEES } from '@/lib/mock/hrd';

export const HrdOverviewView = () => {
  const totalEmployees = MOCK_EMPLOYEES.length;
  const monthlySalaryTotal = MOCK_EMPLOYEES.reduce((acc, e) => acc + e.netSalary, 0);

  return (
    <div className="space-y-4 text-xs">
      {/* Module Header */}
      <ModuleHeader
        title="Ringkasan Analitik SDM & Payroll (HRD Overview)"
        icon={Users}
        iconBgColor="bg-sky-500/10 text-sky-600 dark:text-sky-400"
        glossaryTitle="Glossary HRD & Payroll"
        glossaryItems={[
          { term: 'Overtime Ratio', description: 'Persentase rasio lembur staf operasional terhadap total beban gaji bulanan.' },
          { term: 'Attendance Punctuality', description: 'Tingkat kedisiplinan presensi GPS & Face ID tanpa keterlambatan.' }
        ]}
        badges={[
          { label: 'BPJS Ketenagakerjaan Active', variant: 'emerald' },
          { label: 'Face Recognition Attendance', variant: 'sky' }
        ]}
      />

      {/* Warning Banner */}
      <div className="p-3.5 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-amber-900 dark:text-amber-200">
        <div className="flex items-center gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
          <div>
            <div className="font-bold text-xs">Peringatan SDM: Kontrak Kerja Habis Masa & Peringatan Pph 21</div>
            <div className="text-[11px] text-amber-700 dark:text-amber-300">
              Terdapat 4 Kontrak Kerja (PKWT) karyawan akan berakhir dalam 14 hari ke depan dan membutuhkan tinjauan evaluasi HR.
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 font-mono text-[11px] font-bold shrink-0">
          <span className="px-2 py-1 bg-amber-500/20 rounded-lg">4 PKWT Due</span>
        </div>
      </div>

      {/* Top 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard title="Karyawan Aktif" value={`${totalEmployees} Karyawan`} subtitle="Holding & 5 Tenant Sektor" icon={Users} iconBgColor="bg-sky-50 text-sky-600 dark:bg-sky-950/50" />
        <KpiCard title="Tingkat Kehadiran" value="98.4%" subtitle="GPS & Face ID (On-Time)" icon={UserCheck} iconBgColor="bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50" />
        <KpiCard title="Alokasi Payroll" value={`Rp ${(monthlySalaryTotal / 1000000).toLocaleString('id-ID')} Jt`} subtitle="Net Pay Disbursement" icon={TrendingUp} iconBgColor="bg-purple-50 text-purple-600 dark:bg-purple-950/50" />
        <KpiCard title="Rata-rata KPI" value="92 / 100" subtitle="Penilaian Performa SDM" icon={Award} iconBgColor="bg-amber-50 text-amber-600 dark:bg-amber-950/50" />
      </div>

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Monthly Payroll Cost & Overtime Trend Chart */}
        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-sky-500" />
              <span>Tren Pengeluaran Payroll Gaji & Lembur (6 Bulan)</span>
            </h3>
            <span className="font-mono text-[10px] text-sky-600 font-bold bg-sky-50 dark:bg-sky-950/40 px-2 py-0.5 rounded-md">Beban Stabil</span>
          </div>

          <div className="h-44 flex items-end gap-3 pt-6 pb-2 px-2 border-b border-slate-100 dark:border-slate-800">
            {[
              { month: 'Jan', basePay: 70, otPay: 20 },
              { month: 'Feb', basePay: 72, otPay: 22 },
              { month: 'Mar', basePay: 75, otPay: 25 },
              { month: 'Apr', basePay: 74, otPay: 18 },
              { month: 'Mei', basePay: 78, otPay: 30 },
              { month: 'Jun', basePay: 82, otPay: 24 }
            ].map((d, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                <div className="w-full flex items-end justify-center gap-1 h-full">
                  <div className="w-3/7 bg-sky-500 rounded-t-md transition-all group-hover:bg-sky-400" style={{ height: `${d.basePay}%` }} />
                  <div className="w-3/7 bg-purple-400 rounded-t-md transition-all group-hover:bg-purple-300" style={{ height: `${d.otPay}%` }} />
                </div>
                <span className="text-[10px] font-mono text-slate-400 font-medium">{d.month}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between text-[11px] pt-1">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-sky-500" /><span>Gaji Pokok & Tunjangan</span></div>
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-purple-400" /><span>Upah Lembur</span></div>
            </div>
          </div>
        </div>

        {/* Demografi per Sektor Usaha */}
        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-2">
              <PieChart className="w-4 h-4 text-emerald-500" />
              <span>Demografi Distribusi SDM per Sektor</span>
            </h3>
            <span className="font-mono text-[10px] text-emerald-600 font-bold bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md">Total: {totalEmployees} Staf</span>
          </div>

          <div className="space-y-3 pt-2">
            {[
              { name: 'Restoran & Mass Catering', count: '45 Karyawan', pct: 36, color: 'bg-orange-500' },
              { name: 'Hotelier PMS & Hospitality', count: '38 Karyawan', pct: 30, color: 'bg-sky-500' },
              { name: 'Pertambangan Site & Fleet', count: '24 Karyawan', pct: 19, color: 'bg-indigo-500' },
              { name: 'Retail Store & Kasir Roti', count: '12 Karyawan', pct: 10, color: 'bg-emerald-500' },
              { name: 'Holding Executive & Directorship', count: '6 Karyawan', pct: 5, color: 'bg-purple-500' }
            ].map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="font-medium text-slate-700 dark:text-slate-300">{item.name}</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">{item.count} ({item.pct}%)</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className={`h-full ${item.color} rounded-full transition-all duration-500`} style={{ width: `${item.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
