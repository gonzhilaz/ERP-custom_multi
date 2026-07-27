'use client';

import React from 'react';
import { X, Printer, FileText, QrCode, Utensils, Music, Projector, Users, Calendar } from 'lucide-react';

interface BeoDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  beoData: {
    beoNumber: string;
    eventName: string;
    clientCompany: string;
    functionRoom: string;
    setupStyle: string;
    attendeeCount: number;
    eventDate: string;
    fnbMenuPackage: string;
    avEquipment: string;
  } | null;
}

export const BeoDocumentModal: React.FC<BeoDocumentModalProps> = ({ isOpen, onClose, beoData }) => {
  if (!isOpen || !beoData) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Lembar Resmi Banquet Event Order (BEO Sheet)</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-3 py-1.5 bg-purple-600 text-white rounded-xl font-bold text-xs hover:bg-purple-500 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak BEO Sheet</span>
            </button>
            <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-rose-500 transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* BEO Body Document */}
        <div className="p-6 md:p-8 space-y-6 overflow-y-auto font-sans text-slate-900 dark:text-slate-100 text-xs">
          {/* Header Kop Hotel */}
          <div className="border-b-2 border-purple-600 pb-4 text-center space-y-1">
            <div className="text-base font-extrabold tracking-widest uppercase">RESORT HOTEL & CONVENTION CENTER BALI</div>
            <div className="text-[11px] text-slate-500">Jl. Nusa Dua Utama No. 88, Bali • Telp: (0361) 889000 • Email: mice@hotelresort.com</div>
            <div className="text-sm font-bold text-purple-600 dark:text-purple-400 pt-2 tracking-wider uppercase underline">
              BANQUET EVENT ORDER (BEO) SHEET
            </div>
            <div className="font-mono text-slate-500 font-bold">No: {beoData.beoNumber}</div>
          </div>

          {/* Event Details Grid */}
          <div className="grid grid-cols-2 gap-4 p-4 bg-purple-50/50 dark:bg-purple-950/30 rounded-2xl border border-purple-200 dark:border-purple-800">
            <div>
              <span className="text-slate-400 text-[10px] block">Nama Acara / Event:</span>
              <span className="font-bold text-sm text-slate-900 dark:text-white">{beoData.eventName}</span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] block">Klien B2B / Perusahaan:</span>
              <span className="font-bold text-indigo-600 dark:text-indigo-400">{beoData.clientCompany}</span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] block">Ruangan (Function Room):</span>
              <span className="font-semibold text-slate-900 dark:text-white">{beoData.functionRoom}</span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] block">Layout Ruangan & Peserta:</span>
              <span className="font-bold text-purple-600">{beoData.setupStyle} ({beoData.attendeeCount} Pax)</span>
            </div>
          </div>

          {/* Departmental Instructions */}
          <div className="space-y-4">
            {/* Kitchen & F&B Specs */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1">
              <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Utensils className="w-4 h-4 text-emerald-500" />
                <span>Instruksi Kitchen & Paket F&B Catering:</span>
              </div>
              <p className="font-mono text-slate-700 dark:text-slate-200 pl-6">{beoData.fnbMenuPackage}</p>
            </div>

            {/* AV & Sound Setup Specs */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1">
              <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Music className="w-4 h-4 text-sky-500" />
                <span>Spesifikasi Sound System & AV Property:</span>
              </div>
              <p className="font-mono text-slate-700 dark:text-slate-200 pl-6">{beoData.avEquipment}</p>
            </div>
          </div>

          {/* Signatures & QR Code */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200 dark:border-slate-800 text-center">
            <div className="space-y-8">
              <span className="text-slate-400 text-[10px] block">Sales & Event Manager</span>
              <div className="font-bold underline">Dewi Lestari</div>
            </div>
            <div className="space-y-8">
              <span className="text-slate-400 text-[10px] block">Executive Chef Banquet</span>
              <div className="font-bold text-emerald-600">Chef Ahmad Dahlan</div>
            </div>
            <div className="space-y-2 flex flex-col items-center justify-center">
              <div className="p-2 bg-slate-900 rounded-xl text-white">
                <QrCode className="w-8 h-8 text-purple-400" />
              </div>
              <span className="font-mono text-[9px] text-slate-400 font-bold">BEO-VERIFIED-SAH</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
