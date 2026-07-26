'use client';

import React from 'react';
import { Users, TrendingUp, UserCheck, Award } from 'lucide-react';
import { KpiCard } from '@/components/ui/cards/KpiCard';
import { MOCK_EMPLOYEES } from '@/lib/mock/hrd';

export const HrdOverviewView = () => {
  const totalEmployees = MOCK_EMPLOYEES.length;
  const monthlySalaryTotal = MOCK_EMPLOYEES.reduce((acc, e) => acc + e.netSalary, 0);

  return (
    <div className="space-y-4">
      {/* Ultra-Clean Header */}
      <div>
        <h1 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Users className="w-5 h-5 text-sky-500" />
          <span>HRD Overview</span>
        </h1>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Karyawan Aktif"
          value={`${totalEmployees} Karyawan`}
          subtitle="Holding & Subsidiaries"
          icon={Users}
          iconBgColor="bg-sky-50 text-sky-600 dark:bg-sky-950/50"
        />
        <KpiCard
          title="Kehadiran"
          value="98.4%"
          subtitle="GPS & Face ID"
          icon={UserCheck}
          iconBgColor="bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50"
        />
        <KpiCard
          title="Alokasi Payroll"
          value={`Rp ${(monthlySalaryTotal / 1000000).toLocaleString('id-ID')} Jt`}
          subtitle="Total Net Pay"
          icon={TrendingUp}
          iconBgColor="bg-purple-50 text-purple-600 dark:bg-purple-950/50"
        />
        <KpiCard
          title="Rata-rata KPI"
          value="92 / 100"
          subtitle="Performa SDM"
          icon={Award}
          iconBgColor="bg-amber-50 text-amber-600 dark:bg-amber-950/50"
        />
      </div>

      {/* Breakdown per Unit Usaha */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm">
        <h3 className="font-bold text-xs text-slate-900 dark:text-white">Demografi per Sektor</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl space-y-1">
            <div className="text-[10px] text-slate-400">Restoran & Catering</div>
            <div className="font-bold text-sm">45 Karyawan</div>
            <div className="text-[10px] text-emerald-600 font-semibold">Skema: Bulanan & Komisi</div>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl space-y-1">
            <div className="text-[10px] text-slate-400">Site Tambang Emas</div>
            <div className="font-bold text-sm">120 Operasional Site</div>
            <div className="text-[10px] text-amber-600 font-semibold">Skema: Daily Shift Rate</div>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl space-y-1">
            <div className="text-[10px] text-slate-400">Hotelier & Resort</div>
            <div className="font-bold text-sm">65 Staf Hotel</div>
            <div className="text-[10px] text-sky-600 font-semibold">Skema: Monthly Base</div>
          </div>
        </div>
      </div>
    </div>
  );
};
