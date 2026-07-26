'use client';

import React from 'react';
import { Server, RefreshCw, Terminal, CheckCircle2, ShieldCheck } from 'lucide-react';
import { ProvisionedVpsNode } from '../hooks/useAdminProvisioner';

interface Props {
  nodes: ProvisionedVpsNode[];
}

export const VpsDeploymentManager = ({ nodes }: Props) => {
  const handleRedeploy = (subdomain: string) => {
    alert(`Re-deploy Triggered untuk Server VPS [${subdomain}.yourbrand-erp.com]! Docker container dipicu.`);
  };

  return (
    <div className="space-y-4 text-xs">
      <div className="p-4 bg-slate-900 rounded-3xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Server className="w-5 h-5 text-sky-400" />
          <div>
            <h2 className="text-base font-bold text-white">Manajemen Server VPS Parent Company ({nodes.length} Nodes)</h2>
            <p className="text-[11px] text-slate-400">Pemantauan kesehatan node VPS terisolasi per Parent Company.</p>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-800 text-slate-400 font-semibold border-b border-slate-700">
              <tr>
                <th className="py-3 px-4 font-mono">Subdomain & Parent Name</th>
                <th className="py-3 px-4 font-mono">VPS Host IP</th>
                <th className="py-3 px-4 font-mono">Isolated DB Schema</th>
                <th className="py-3 px-4 text-center">Initial Admin PIC</th>
                <th className="py-3 px-4 text-center">Status VPS</th>
                <th className="py-3 px-4 text-center">Aksi Orchestration</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {nodes.map((n) => (
                <tr key={n.id} className="hover:bg-slate-800/50 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-mono font-bold text-sky-400">{n.subdomain}.yourbrand-erp.com</div>
                    <div className="font-bold text-white">{n.companyName}</div>
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-amber-400">{n.vpsIpAddress}</td>
                  <td className="py-3 px-4 font-mono text-emerald-400 font-semibold">{n.dbSchema}</td>
                  <td className="py-3 px-4 text-center font-mono text-[11px] text-slate-400">{n.initialAdminEmail}</td>
                  <td className="py-3 px-4 text-center">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      {n.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleRedeploy(n.subdomain)}
                      className="px-2.5 py-1 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-lg transition-all flex items-center gap-1 mx-auto cursor-pointer"
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span>Re-Deploy Node</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
