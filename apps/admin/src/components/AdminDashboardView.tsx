'use client';

import React from 'react';
import { ShieldCheck, Server, DollarSign, Activity, TrendingUp, Cpu, Database } from 'lucide-react';
import { ProvisionedVpsNode } from '../hooks/useAdminProvisioner';

interface Props {
  nodes: ProvisionedVpsNode[];
}

export const AdminDashboardView = ({ nodes }: Props) => {
  return (
    <div className="space-y-4 text-xs">
      {/* Top Welcome Banner */}
      <div className="p-5 bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 rounded-3xl border border-sky-800/40 shadow-xl space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-sky-800/40 pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-sky-500/20 text-sky-400 rounded-2xl border border-sky-500/30">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span>Main Developer Super Admin Provisioner</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-500/20 text-sky-300 border border-sky-400/30 font-mono">
                  Level-1 Master Control
                </span>
              </h2>
              <p className="text-[11px] text-slate-300">
                Pusat Pengelolaan Provisioning Database Terisolasi & Automated VPS Deployment Klien Holding.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-xl border border-emerald-500/30 font-bold flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" /> MRR: Rp 48.500.000 / bln
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div>
            <div className="text-[10px] text-slate-400">Total Klien Parent Company</div>
            <div className="text-lg font-bold text-white font-mono">{nodes.length} Holding Groups</div>
          </div>
          <div>
            <div className="text-[10px] text-slate-400">VPS Nodes Online</div>
            <div className="text-lg font-bold text-emerald-400 font-mono">{nodes.length} Servers Active</div>
          </div>
          <div>
            <div className="text-[10px] text-slate-400">Database Schemas</div>
            <div className="text-lg font-bold text-sky-400 font-mono">{nodes.length} Isolated DBs</div>
          </div>
          <div>
            <div className="text-[10px] text-slate-400">System Availability</div>
            <div className="text-lg font-bold text-amber-400 font-mono">99.98% High Availability</div>
          </div>
        </div>
      </div>

      {/* Infrastructure Node Summary List */}
      <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <span className="font-bold text-white flex items-center gap-2">
            <Server className="w-4 h-4 text-sky-400" />
            <span>Infra Server VPS Node Per Parent Company</span>
          </span>
          <span className="text-[10px] text-slate-400 font-mono">Real-time Node Telemetry</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {nodes.map((node) => (
            <div key={node.id} className="p-3 bg-slate-800/60 rounded-xl border border-slate-700 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-sky-400">{node.subdomain}.yourbrand-erp.com</span>
                <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {node.status}
                </span>
              </div>

              <div className="font-bold text-white">{node.companyName}</div>
              <div className="text-[11px] text-slate-400 flex items-center gap-2">
                <span>IP: <strong className="font-mono text-slate-200">{node.vpsIpAddress}</strong></span>
                <span>DB: <strong className="font-mono text-amber-400">{node.dbSchema}</strong></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
