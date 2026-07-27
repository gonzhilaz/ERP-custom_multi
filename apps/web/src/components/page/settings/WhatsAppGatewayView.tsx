'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, MessageSquare, PhoneCall, History } from 'lucide-react';
import { PrimaryButton } from '@/components/ui/button/PrimaryButton';
import { ActionButton } from '@/components/ui/button/ActionButton';
import { StatusBadge } from '@/components/ui/badge/StatusBadge';
import { GlossaryPopover } from '@/components/ui/popover/GlossaryPopover';

interface WhatsAppLog {
  id: string;
  phone: string;
  message: string;
  type: string;
  sentAt: string;
}

export function WhatsAppGatewayView() {
  const [phone, setPhone] = useState('+6281299008877');
  const [message, setMessage] = useState('🚨 [TEST ALERT] Sistem WhatsApp Gateway ERP Enterprise berhasil terhubung!');
  const [logs, setLogs] = useState<WhatsAppLog[]>([
    {
      id: 'wa-msg-101',
      phone: '+6281299008877',
      message: '🚨 [CRITICAL TICKET] TCK-202607-001: Solar B35 di Pit Berau Kritis Sisa 2 Hari! Membutuhkan Keputusan Direksi HO segera.',
      type: 'TICKET_ESCALATION',
      sentAt: '2026-07-27 08:31'
    },
    {
      id: 'wa-msg-102',
      phone: '+6281311223344',
      message: '🛡️ [SECURITY ALERT] INC-202607-004: Kerusakan Kawat Pagar Pembatas Barat Site Pit Berau. Ditemukan saat patroli shift malam.',
      type: 'SECURITY_INCIDENT',
      sentAt: '2026-07-27 03:31'
    }
  ]);
  const [isSending, setIsSending] = useState(false);

  const handleSendTestMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || !message) return;
    setIsSending(true);

    setTimeout(() => {
      const newLog: WhatsAppLog = {
        id: `wa-msg-${Date.now()}`,
        phone,
        message,
        type: 'TEST_DIRECT_ALERT',
        sentAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
      };
      setLogs((prev) => [newLog, ...prev]);
      setIsSending(false);
    }, 600);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">WhatsApp Gateway Engine</h1>
          <GlossaryPopover
            title="WhatsApp Alert & OpenClaw Gateway"
            description="Layanan pengiriman pesan notifikasi WhatsApp otomatis untuk tiket eskalasi rapat, insiden pos satpam, dan alarm AI."
          />
        </div>
        <StatusBadge type="ACTIVE" label="GATEWAY CONNECTED" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm space-y-1">
          <div className="text-xs font-semibold text-slate-400">Status Engine</div>
          <div className="text-xl font-black text-emerald-600 dark:text-emerald-400">ONLINE (PAIRED)</div>
          <div className="text-[11px] text-slate-400">+62 857-1122-3344</div>
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm space-y-1">
          <div className="text-xs font-semibold text-slate-400">Total Pesan Terkirim</div>
          <div className="text-xl font-black text-slate-900 dark:text-white">{logs.length} Notifikasi</div>
          <div className="text-[11px] text-sky-500 font-medium">Auto-dispatch aktif</div>
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm space-y-1">
          <div className="text-xs font-semibold text-slate-400">Kecepatan Pengiriman</div>
          <div className="text-xl font-black text-purple-600 dark:text-purple-400">&lt; 1.2 Detik</div>
          <div className="text-[11px] text-slate-400">Real-time WebSocket & API</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form Pengiriman Pesan Uji Coba */}
        <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white">Uji Coba Kirim Notifikasi WhatsApp</h2>
          <form onSubmit={handleSendTestMessage} className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Nomor WhatsApp Tujuan *</label>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+62812xxxxxxx"
                className="w-full mt-1 p-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Isi Pesan Notifikasi *</label>
              <textarea
                required
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tulis pesan..."
                className="w-full mt-1 p-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
              />
            </div>

            <div className="flex justify-end pt-1">
              <PrimaryButton icon={Send} label={isSending ? 'Mengirim...' : 'Kirim WhatsApp Alert'} onClick={() => {}} />
            </div>
          </form>
        </div>

        {/* Live Message Dispatch Logs */}
        <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white">Live WhatsApp Notification Logs</h2>
          <div className="space-y-3">
            {logs.map((log) => (
              <div key={log.id} className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1 text-xs">
                <div className="flex justify-between items-center font-mono font-bold text-sky-600 dark:text-sky-400">
                  <span>To: {log.phone}</span>
                  <span className="text-[10px] text-slate-400 font-normal">{log.sentAt}</span>
                </div>
                <div className="text-slate-800 dark:text-slate-200 whitespace-pre-line">{log.message}</div>
                <div className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 pt-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>DELIVERED (Status 200 OK)</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
