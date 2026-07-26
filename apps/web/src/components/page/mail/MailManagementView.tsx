'use client';

import React, { useState } from 'react';
import { Mail, Plus, Send, HelpCircle, X, Car, ShieldCheck, AlertTriangle, FileText, CheckCircle2, QrCode, PenTool } from 'lucide-react';
import { useSpecializedIndustries } from '@/hooks/useSpecializedIndustries';
import { useGeneralAffairs } from '@/hooks/useGeneralAffairs';
import { SubTabNav, SubTabItem } from '@/components/ui/button/SubTabNav';
import { DynamicSearchFilter } from '@/components/ui/forms/DynamicSearchFilter';

export const MailManagementView = () => {
  const [activeTab, setActiveTab] = useState<'MAILS' | 'ATK' | 'CAR_POOL' | 'FACILITY' | 'VISITOR_QR'>('MAILS');
  const [showGlossary, setShowGlossary] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const { mails, addMailDisposition } = useSpecializedIndustries();
  const { atkReqs, carBookings, facilityApars, addCarPoolBooking, addAtkRequisition } = useGeneralAffairs();

  const subTabs: SubTabItem[] = [
    { id: 'MAILS', label: 'Surat & Disposisi', icon: Mail, count: mails.length },
    { id: 'ATK', label: 'Permintaan ATK GA', icon: PenTool },
    { id: 'CAR_POOL', label: 'Car Pool & Driver GA', icon: Car, count: carBookings.length },
    { id: 'FACILITY', label: 'Fasilitas & APAR Alert', icon: ShieldCheck },
    { id: 'VISITOR_QR', label: 'QR Visitor Badge', icon: QrCode }
  ];

  return (
    <div className="space-y-4 text-xs">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-sky-500/10 text-sky-600 dark:text-sky-400 rounded-xl shrink-0">
            <Mail className="w-5 h-5" />
          </div>
          <h1 className="text-lg font-bold text-slate-900 dark:text-white">Administrasi & General Affairs (GA)</h1>

          <div className="relative">
            <button onClick={() => setShowGlossary(!showGlossary)} className="text-slate-400 hover:text-sky-500 p-1 cursor-pointer">
              <HelpCircle className="w-4 h-4" />
            </button>
            {showGlossary && (
              <div className="absolute left-0 top-7 z-30 w-80 p-3.5 bg-slate-900 text-white rounded-2xl shadow-xl text-xs space-y-2 border border-slate-700">
                <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 font-bold text-sky-400">
                  <span>Administrasi & General Affairs Suite</span>
                  <button onClick={() => setShowGlossary(false)} className="text-slate-400 hover:text-white"><X className="w-3.5 h-3.5" /></button>
                </div>
                <p className="text-[11px] text-slate-300">
                  - <strong>Persuratan GA</strong>: Auto-numbering matrix & template SK/SPK/MOU.
                </p>
                <p className="text-[11px] text-slate-300">
                  - <strong>Car Pool & Driver</strong>: Penugasan driver shuttle bandara, purchasing, & laundry.
                </p>
              </div>
            )}
          </div>
        </div>

        <span className="px-3 py-1 bg-sky-100 text-sky-800 font-bold rounded-full font-mono">
          GA Operations Suite
        </span>
      </div>

      {/* SubTab Navigation */}
      <SubTabNav activeTab={activeTab} onTabChange={(t: any) => setActiveTab(t)} tabs={subTabs} colorScheme="sky" />

      {/* TAB 1: SURAT & DISPOSISI */}
      {activeTab === 'MAILS' && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Arsip Surat Masuk/Keluar & Auto-Numbering Matrix</h3>
              <button onClick={() => alert('Template Surat 1-Klik (SK/SPK/MOU) Siap Diterbitkan dengan Penomoran Otomatis 001/SK-DIR/BME/VII/2026')} className="px-3.5 py-2 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl flex items-center gap-1 cursor-pointer">
                <Plus className="w-4 h-4" />
                <span>Buat Surat SK/SPK Baru</span>
              </button>
            </div>
            <DynamicSearchFilter searchQuery={searchQuery} onSearchChange={setSearchQuery} searchPlaceholder="Cari perihal surat, nomor surat, atau pengirim..." />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mails.map((m) => (
              <div key={m.id} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded text-[10px] font-bold bg-sky-100 text-sky-800 font-mono">{m.mailType}</span>
                  <span className="font-mono text-xs font-bold text-slate-500">{m.mailNumber}</span>
                </div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">{m.subject}</h4>
                <div className="text-slate-500 text-xs">Pengirim: <strong>{m.sender}</strong> ➔ Penerima: <strong>{m.recipient}</strong></div>

                {m.dispositionNotes && (
                  <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200 text-amber-900 dark:text-amber-300 text-[11px] font-medium">
                    <strong>Catatan Disposisi Direksi:</strong> {m.dispositionNotes}
                  </div>
                )}

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">Tgl Terima: {m.receivedDate}</span>
                  <button onClick={() => addMailDisposition(m.id, 'Tindaklanjuti koordinasi ESDM & Operasional Site')} className="px-3 py-1.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl font-bold flex items-center gap-1 cursor-pointer">
                    <Send className="w-3.5 h-3.5" />
                    <span>Teruskan Disposisi</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: PERMINTAAN ATK */}
      {activeTab === 'ATK' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Formulir Permintaan ATK & Stok Opname GA</h3>
            <button onClick={() => addAtkRequisition('Dapur & Resto', 'Tinta Printer Epson L3110 Black (2 Botol)', 2)} className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl flex items-center gap-1 cursor-pointer">
              <Plus className="w-4 h-4" />
              <span>Pengajuan ATK Baru</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {atkReqs.map((a) => (
              <div key={a.id} className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2 shadow-sm">
                <div className="flex justify-between font-mono font-bold text-sky-600">
                  <span>{a.reqCode}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-100 text-emerald-800">{a.status}</span>
                </div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">{a.itemName}</h4>
                <div className="text-slate-500 text-xs">Departemen: <strong>{a.departmentName}</strong> | Qty: <strong className="text-emerald-600">{a.requestedQty} {a.unit}</strong></div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: CAR POOL & DRIVER GA */}
      {activeTab === 'CAR_POOL' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Manajemen Car Pool Booking & Driver GA Dispatcher</h3>
            <button onClick={() => addCarPoolBooking('LAUNDRY_TRANSFER', 'B 9102 SDU (Isuzu Box)', 'Pak Slamet', 'Vendor Laundry Eksternal')} className="px-3.5 py-2 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl flex items-center gap-1 cursor-pointer">
              <Plus className="w-4 h-4" />
              <span>Penugasan Driver Baru</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {carBookings.map((c) => (
              <div key={c.id} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded text-[10px] font-bold bg-amber-100 text-amber-800 font-mono">{c.purpose}</span>
                  <span className="font-mono text-xs font-bold text-emerald-600">{c.status}</span>
                </div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">{c.vehiclePlateNumber}</h4>
                <div className="text-slate-500 text-xs">Driver: <strong className="text-sky-600">{c.driverName}</strong></div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-1 text-slate-600 dark:text-slate-300">
                  <div>Rute / Tujuan: <strong>{c.destination}</strong></div>
                  <div className="flex justify-between text-[11px] font-mono">
                    <span>Voucher BBM: Rp {c.fuelVoucherAmount.toLocaleString('id-ID')}</span>
                    <span>Toll Card: Rp {c.tollCardAmount.toLocaleString('id-ID')}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: FACILITY & APAR ALERT */}
      {activeTab === 'FACILITY' && (
        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">Facility Management & APAR Expired Warning</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {facilityApars.map((f) => (
              <div key={f.id} className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <div>
                  <span className="font-mono font-bold text-sky-600">{f.unitCode}</span>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">{f.location}</h4>
                  <div className="text-slate-500 text-xs">Jadwal Expired: <strong className="text-amber-600 font-mono">{f.nextExpiryDate}</strong></div>
                </div>
                {f.conditionStatus === 'EXPIRED_WARNING' ? (
                  <span className="px-2.5 py-1 rounded text-[10px] font-bold bg-amber-100 text-amber-800 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" /> REFILL WARNING
                  </span>
                ) : (
                  <span className="px-2.5 py-1 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> OK SAFE
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: VISITOR QR BADGE */}
      {activeTab === 'VISITOR_QR' && (
        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4 text-center">
          <div className="p-4 bg-sky-50 dark:bg-sky-950/40 rounded-2xl border border-sky-200 dark:border-sky-900/60 max-w-md mx-auto space-y-3">
            <QrCode className="w-16 h-16 text-sky-600 mx-auto" />
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">QR Code Visitor Badge & Gate Control</h3>
            <p className="text-slate-500 text-xs">Penerbitan QR Code Visitor Badge untuk Kontraktor Site Tambang, Tamu VIP Hotel, & Vendor Suplai Dapur.</p>
            <button onClick={() => alert('QR Code Visitor Badge Diterbitkan & Dikirimkan Otomatis via WhatsApp!')} className="w-full py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl cursor-pointer">
              Terbitkan QR Visitor Pass
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
