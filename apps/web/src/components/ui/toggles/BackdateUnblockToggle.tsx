'use client';

import React, { useState } from 'react';
import { Lock, Unlock, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { useBackdateGovernance } from '@/hooks/auth/useBackdateGovernance';

export const BackdateUnblockToggle: React.FC = () => {
  const { isUserAuthorized, isBackdateUnblocked, toggleBackdateUnblock } = useBackdateGovernance();
  const [showModal, setShowModal] = useState(false);

  const handleToggleClick = () => {
    if (!isUserAuthorized) {
      alert('Akses Ditolak! Hanya Super-Admin dan Admin yang dapat membuka/menutup blokir backdate.');
      return;
    }
    setShowModal(true);
  };

  const handleConfirmToggle = () => {
    const res = toggleBackdateUnblock();
    if (res.success) {
      alert(res.message);
    }
    setShowModal(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={handleToggleClick}
        className={`px-2.5 py-1.5 rounded-xl font-medium text-xs flex items-center gap-1.5 transition-all cursor-pointer border ${
          isBackdateUnblocked
            ? 'bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400 font-bold shadow-sm'
            : 'bg-slate-100 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700/60 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
        }`}
        title={
          isUserAuthorized
            ? isBackdateUnblocked
              ? 'Status Backdate: Diizinkan (Klik untuk Mengunci)'
              : 'Status Backdate: Terkunci (Klik untuk Pengaturan Admin)'
            : 'Status Backdate: Terkunci (Akses Admin)'
        }
      >
        {isBackdateUnblocked ? (
          <>
            <Unlock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span className="font-mono text-[11px]">Backdate Open</span>
          </>
        ) : (
          <>
            <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-[11px]">Backdate</span>
          </>
        )}
      </button>

      {/* Confirmation Modal for Admin */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 w-full max-w-sm space-y-4 shadow-2xl animate-in zoom-in-95 text-xs">
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-sm">
              <ShieldAlert className="w-5 h-5 shrink-0" />
              <span>Otorisasi Akses Backdate</span>
            </div>

            <p className="text-slate-600 dark:text-slate-300">
              {isBackdateUnblocked ? (
                <>Apakah Anda yakin ingin <strong>MENGUNCI KEMBALI</strong> status penginputan transaksi backdate?</>
              ) : (
                <>Apakah Anda yakin ingin <strong>MEMBUKA BLOKIR</strong> penginputan transaksi backdate (*tanggal berlalu*)?</>
              )}
            </p>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-[11px] text-slate-500 space-y-1">
              <div><strong>Aturan Otorisasi:</strong> HANYA Super-Admin dan Admin yang dapat mengubah status ini.</div>
              <div><strong>Jejak Audit:</strong> Perubahan status dikirim ke Audit Log permanen.</div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded-xl text-xs cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleConfirmToggle}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl text-xs shadow-md cursor-pointer flex items-center gap-1"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{isBackdateUnblocked ? 'Kunci Kembali' : 'Buka Blokir Backdate'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
