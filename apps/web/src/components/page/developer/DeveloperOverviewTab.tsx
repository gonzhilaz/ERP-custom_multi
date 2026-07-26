'use client';

import React from 'react';
import { DollarSign, Building2, Users, Activity, ShieldCheck, TrendingUp, Sparkles } from 'lucide-react';
import { SaaSDeveloperMetrics, ClientParentCompany } from '@/lib/mock/developer';

interface Props {
  metrics: SaaSDeveloperMetrics;
  clients: ClientParentCompany[];
}

export const DeveloperOverviewTab = ({ metrics, clients }: Props) => {
  return (
    <div className="space-y-4 text-xs">
      {/* SaaS Developer Banner */}
      <div className="p-4 bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white rounded-2xl border border-sky-800/40 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-sky-800/40 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-sky-500/20 text-sky-400 rounded-xl border border-sky-500/30">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <span>Main Developer SaaS Control Center</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-500/20 text-sky-300 border border-sky-400/30 font-mono">
                  Level-1 Super Admin
                </span>
              </h2>
              <p className="text-[11px] text-slate-300">
                Pusat pengawasan langganan SaaS, penjualan lisensi modul, & pendapatan berulang (MRR).
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-xl border border-emerald-500/30 font-bold flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" /> MRR: Rp {metrics.monthlyRecurringRevenue.toLocaleString('id-ID')}
            </span>
          </div>
        </div>

        {/* Global Uptime & Active Tenant Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div>
            <div className="text-[10px] text-slate-400">Total Klien Parent Company</div>
            <div className="text-lg font-bold text-white font-mono">{metrics.totalActiveHoldingClients} Holding</div>
          </div>
          <div>
            <div className="text-[10px] text-slate-400">Total Tenant Unit Bisnis</div>
            <div className="text-lg font-bold text-sky-400 font-mono">{metrics.totalOperatingTenants} Tenants</div>
          </div>
          <div>
            <div className="text-[10px] text-slate-400">Total Pengguna Aktif</div>
            <div className="text-lg font-bold text-emerald-400 font-mono">{metrics.totalGlobalUsers} User Accounts</div>
          </div>
          <div>
            <div className="text-[10px] text-slate-400">System Cloud Uptime</div>
            <div className="text-lg font-bold text-amber-400 font-mono">{metrics.systemUptimePercentage}% SLA</div>
          </div>
        </div>
      </div>

      {/* Financial SaaS Analytics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <div className="text-xs text-slate-400 font-semibold flex justify-between">
            <span>Monthly Recurring Revenue (MRR)</span>
            <DollarSign className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400 font-mono">
            Rp {metrics.monthlyRecurringRevenue.toLocaleString('id-ID')}
          </div>
          <div className="text-[11px] text-slate-500">Pendapatan Langganan Bulanan SaaS</div>
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <div className="text-xs text-slate-400 font-semibold flex justify-between">
            <span>Annual Recurring Revenue (ARR)</span>
            <TrendingUp className="w-4 h-4 text-sky-500" />
          </div>
          <div className="text-xl font-bold text-sky-600 dark:text-sky-400 font-mono">
            Rp {metrics.annualRecurringRevenue.toLocaleString('id-ID')}
          </div>
          <div className="text-[11px] text-slate-500">Proyeksi Pendapatan Tahunan</div>
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <div className="text-xs text-slate-400 font-semibold flex justify-between">
            <span>Status SLA Uptime Server</span>
            <Activity className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-xl font-bold text-amber-600 dark:text-amber-400 font-mono">
            {metrics.systemUptimePercentage}% High Availability
          </div>
          <div className="text-[11px] text-slate-500">Node API Express & Cloud Multi-Tenant</div>
        </div>
      </div>

      {/* Top Holding Clients List */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
          <span className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Building2 className="w-4 h-4 text-sky-500" />
            <span>Klien Parent Company Teratas</span>
          </span>
          <span className="text-[10px] text-slate-400 font-mono">Active Subscriptions</span>
        </div>

        <div className="space-y-2">
          {clients.map((c) => (
            <div key={c.id} className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between flex-wrap gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] text-sky-600 dark:text-sky-400 font-bold">{c.clientCode}</span>
                  <h4 className="font-bold text-slate-900 dark:text-white">{c.companyName}</h4>
                </div>
                <div className="text-[11px] text-slate-400">{c.contactPerson} • {c.email}</div>
              </div>

              <div className="flex items-center gap-3">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-500/10 text-sky-600 border border-sky-500/20 font-mono">
                  {c.subscriptionPlan}
                </span>
                <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  Rp {c.monthlyFee.toLocaleString('id-ID')}/bln
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
