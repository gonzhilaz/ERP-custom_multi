'use client';

import React, { useState } from 'react';
import { KeyRound, QrCode, CreditCard, UserCheck, ShieldCheck, CheckCircle2, Smartphone, FileText } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';

interface SelfCheckinRecord {
  id: string;
  resNumber: string;
  guestName: string;
  idCardNo: string;
  assignedRoomNo: string;
  keyCardRfidCode: string;
  checkInTime: string;
  kioskId: string;
  digitalSignatureStatus: 'VERIFIED' | 'PENDING';
}

export const SelfCheckinKioskTab = () => {
  const [kioskLogs, setKioskLogs] = useState<SelfCheckinRecord[]>([
    {
      id: 'KSK-2026-091',
      resNumber: 'RSV-2026-07-0091',
      guestName: 'Ir. Hendra Wijaya',
      idCardNo: '3174091802880001 (KTP)',
      assignedRoomNo: 'RM-301',
      keyCardRfidCode: 'RFID-KEY-88102',
      checkInTime: '2026-07-26 13:45',
      kioskId: 'Kiosk Lobby #01',
      digitalSignatureStatus: 'VERIFIED'
    },
    {
      id: 'KSK-2026-088',
      resNumber: 'RSV-2026-07-0082',
      guestName: 'Mr. Johnathan Smith',
      idCardNo: 'A-889102391 (Passport)',
      assignedRoomNo: 'RM-104',
      keyCardRfidCode: 'RFID-KEY-77192',
      checkInTime: '2026-07-25 15:10',
      kioskId: 'Kiosk Express #02',
      digitalSignatureStatus: 'VERIFIED'
    }
  ]);

  const columns: ColumnDef<SelfCheckinRecord>[] = [
    { key: 'id', header: 'ID Sesi Kiosk', className: 'font-mono font-bold text-sky-600 dark:text-sky-400', render: (i) => i.id },
    { key: 'resNumber', header: 'No. Reservasi', className: 'font-mono font-bold text-amber-600', render: (i) => i.resNumber },
    { key: 'guestName', header: 'Nama Tamu & KTP/Passport', render: (i) => <div><div className="font-bold text-slate-900 dark:text-white">{i.guestName}</div><div className="text-[10px] text-slate-400 font-mono">{i.idCardNo}</div></div> },
    { key: 'assignedRoomNo', header: 'Kamar & RFID Keycard', align: 'center', render: (i) => <div><div className="font-mono font-bold text-emerald-600">{i.assignedRoomNo}</div><div className="text-[9px] text-slate-400 font-mono">{i.keyCardRfidCode}</div></div> },
    { key: 'kioskId', header: 'Terminal Kiosk', className: 'font-mono text-slate-600 dark:text-slate-300', render: (i) => i.kioskId },
    { key: 'checkInTime', header: 'Waktu Check-In', className: 'font-mono text-slate-500', render: (i) => i.checkInTime },
    { key: 'digitalSignatureStatus', header: 'Signature & FaceID', align: 'center', render: (i) => <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-600 font-bold font-mono text-[10px] rounded border border-emerald-500/20">{i.digitalSignatureStatus}</span> }
  ];

  return (
    <div className="space-y-4 text-xs">
      <ModuleHeader
        title="Self-Checkin Kiosk & E-Keycard Management"
        icon={KeyRound}
        iconBgColor="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
        glossaryTitle="Glossary Self Check-In Kiosk & Smart Keycard"
        glossaryItems={[
          { term: 'Self Check-In Kiosk', description: 'Terminal mandiri lobby hotel untuk scan KTP/Passport, tanda tangan digital, & pencetakan kartu kunci RFID.' },
          { term: 'E-Keycard Bluetooth', description: 'Kunci kamar digital yang dikirimkan langsung ke smartphone tamu via Web Bluetooth API.' }
        ]}
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1 shadow-sm">
          <div className="text-[10px] text-slate-400 font-semibold">Total Kiosk Active</div>
          <div className="text-lg font-bold font-mono text-sky-600">3 Terminal (Lobby Utama & Express)</div>
        </div>
        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1 shadow-sm">
          <div className="text-[10px] text-slate-400 font-semibold">RFID Key Encoder Status</div>
          <div className="text-lg font-bold font-mono text-emerald-600">Connected Online (100%)</div>
        </div>
        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1 shadow-sm">
          <div className="text-[10px] text-slate-400 font-semibold">Digital Mobile Key Active</div>
          <div className="text-lg font-bold font-mono text-purple-600">18 Keycodes Issued</div>
        </div>
      </div>

      <DataTable headerTitle="History Sesi Self Check-In Kiosk & E-Keycard RFID" columns={columns} data={kioskLogs} keyExtractor={(i) => i.id} />
    </div>
  );
};
