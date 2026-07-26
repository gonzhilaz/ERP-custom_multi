'use client';

import React, { useState } from 'react';
import { CheckCircle, XCircle, Users, HelpCircle, X, Calendar, DollarSign } from 'lucide-react';
import { useEss } from '@/hooks/ess/useEss';

export const EssTeamApprovalsView = () => {
  const { leaves, reimbursements, approveLeaveBySupervisor, approveClaimBySupervisor, rejectLeave, rejectClaim } = useEss();
  const [activeTab, setActiveTab] = useState<'LEAVE' | 'CLAIM'>('LEAVE');
  const [showGlossary, setShowGlossary] = useState(false);

  const pendingLeaves = leaves.filter((l) => l.status === 'PENDING_SUPERVISOR');
  const pendingClaims = reimbursements.filter((c) => c.status === 'PENDING_SUPERVISOR');

  return (
    <div className="space-y-4 text-xs">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-xl shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <h1 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>Persetujuan Tim</span>
          </h1>

          <div className="relative">
            <button
              onClick={() => setShowGlossary(!showGlossary)}
              className="text-slate-400 hover:text-indigo-500 p-1 cursor-pointer"
              title="Informasi Persetujuan Atasan Direct"
            >
              <HelpCircle className="w-4 h-4" />
            </button>

            {showGlossary && (
              <div className="absolute left-0 top-7 z-30 w-80 p-3.5 bg-slate-900 text-white rounded-2xl shadow-xl text-xs space-y-2 border border-slate-700">
                <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 font-bold text-indigo-400">
                  <span>Persetujuan Level 1 (Atasan Direct)</span>
                  <button onClick={() => setShowGlossary(false)} className="text-slate-400 hover:text-white cursor-pointer">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-[11px] text-slate-300">
                  Sebagai Supervisor/Manager, Anda bertugas menyetujui permohonan Cuti, Lembur, dan Klaim anggota tim Anda sebelum diverifikasi final oleh HRD & Finance.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl">
          <button
            onClick={() => setActiveTab('LEAVE')}
            className={`px-3 py-1.5 rounded-xl font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'LEAVE'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Permohonan Cuti ({pendingLeaves.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('CLAIM')}
            className={`px-3 py-1.5 rounded-xl font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'CLAIM'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>Klaim Reimbursement ({pendingClaims.length})</span>
          </button>
        </div>
      </div>

      {/* Content Area */}
      {activeTab === 'LEAVE' && (
        <div className="space-y-3">
          {pendingLeaves.length === 0 ? (
            <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 text-slate-400">
              Tidak ada permohonan cuti anggota tim yang menunggu persetujuan Anda saat ini.
            </div>
          ) : (
            pendingLeaves.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-900 dark:text-white">{item.employeeName || 'Karyawan'}</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                      {item.departmentName || 'Departemen Operasional'}
                    </span>
                  </div>
                  <div className="text-slate-600 dark:text-slate-300 font-medium">
                    {item.type} ({item.startDate} s/d {item.endDate})
                  </div>
                  <p className="text-slate-400 text-[11px] italic">"{item.reason}"</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => rejectLeave(item.id)}
                    className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 dark:bg-rose-950/40 dark:hover:bg-rose-900/60 dark:text-rose-400 rounded-xl font-semibold transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Tolak</span>
                  </button>
                  <button
                    onClick={() => approveLeaveBySupervisor(item.id)}
                    className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold shadow-sm transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Setujui (Atasan)</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === 'CLAIM' && (
        <div className="space-y-3">
          {pendingClaims.length === 0 ? (
            <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 text-slate-400">
              Tidak ada klaim reimbursement tim yang menunggu persetujuan Anda.
            </div>
          ) : (
            pendingClaims.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-900 dark:text-white">{item.employeeName || 'Karyawan'}</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                      {item.claimCode}
                    </span>
                  </div>
                  <div className="text-slate-600 dark:text-slate-300 font-medium">
                    Klaim {item.category}: <span className="font-bold text-emerald-600">Rp {item.amount.toLocaleString('id-ID')}</span>
                  </div>
                  <p className="text-slate-400 text-[11px] italic">"{item.description}"</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => rejectClaim(item.id)}
                    className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 dark:bg-rose-950/40 dark:hover:bg-rose-900/60 dark:text-rose-400 rounded-xl font-semibold transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Tolak</span>
                  </button>
                  <button
                    onClick={() => approveClaimBySupervisor(item.id)}
                    className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold shadow-sm transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Setujui (Atasan)</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
