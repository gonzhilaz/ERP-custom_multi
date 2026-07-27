'use client';

import React, { useState, useEffect } from 'react';
import { ShieldCheck, Eye } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';
import { FinanceItemDetailModal } from '@/components/ui/modals/FinanceItemDetailModal';
import { getStoredAuditLogs, AuditLogEntry } from '@/lib/audit/audit-logger';

interface FinanceAuditLogItem {
  id: string;
  timestamp: string;
  userName: string;
  userRole: string;
  actionType: string;
  targetEntity: string;
  details: string;
}

const MOCK_FINANCE_AUDIT: FinanceAuditLogItem[] = [
  { id: 'fa-01', timestamp: '2026-07-25 11:20:15', userName: 'Bpk. Hendra Director', userRole: 'FINANCE_DIRECTOR', actionType: 'APPROVE_PAYMENT', targetEntity: 'BILL-SUP-2026-089', details: 'Persetujuan pelunasan AP PT Meat Prima Importindo sebesar Rp 45.000.000' }
];

export const FinanceAuditLogView = () => {
  const [selectedAudit, setSelectedAudit] = useState<FinanceAuditLogItem | null>(null);
  const [logs, setLogs] = useState<FinanceAuditLogItem[]>(MOCK_FINANCE_AUDIT);

  useEffect(() => {
    const stored = getStoredAuditLogs();
    if (stored.length > 0) {
      setLogs([...stored, ...MOCK_FINANCE_AUDIT]);
    }
  }, []);

  const columns: ColumnDef<FinanceAuditLogItem>[] = [
    { key: 'timestamp', header: 'Waktu Transaksi', className: 'font-mono text-slate-500', render: (i) => i.timestamp },
    { key: 'userName', header: 'User Pengakses', className: 'font-bold text-slate-900 dark:text-white', render: (i) => i.userName },
    { key: 'userRole', header: 'Role Hak Akses', render: (i) => <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-600 font-bold font-mono text-[10px] rounded">{i.userRole}</span> },
    { key: 'actionType', header: 'Jenis Tindakan', align: 'center', className: 'font-mono font-bold', render: (i) => i.actionType },
    { key: 'targetEntity', header: 'Target Dokumen ID', className: 'font-mono font-bold text-emerald-600 dark:text-emerald-400', render: (i) => i.targetEntity },
    { key: 'details', header: 'Rincian Perubahan Audit', render: (i) => i.details },
    {
      key: 'actions',
      header: 'Detail',
      align: 'center',
      render: (i) => (
        <button
          onClick={() => setSelectedAudit(i)}
          className="p-1.5 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-lg cursor-pointer transition-colors"
          title="Lihat Detail Log Audit"
        >
          <Eye className="w-4 h-4" />
        </button>
      )
    }
  ];

  return (
    <div className="space-y-4 text-xs">
      <ModuleHeader
        title="Audit Log"
        icon={ShieldCheck}
        iconBgColor="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
        glossaryTitle="Glossary Audit Log Finance"
        glossaryItems={[{ term: 'Immutable Audit Trail', description: 'Catatan permanen riwayat persetujuan, jurnal otomatis, & pelunasan kas bank.' }]}
      />
      <DataTable headerTitle="Catatan Jejak Audit Permanent Mutasi Keuangan & Settlement" columns={columns} data={logs} keyExtractor={(i) => i.id} />

      {/* Item Detail Modal */}
      <FinanceItemDetailModal
        isOpen={selectedAudit !== null}
        onClose={() => setSelectedAudit(null)}
        title="Detail Catatan Audit Log Finance"
        subtitle={selectedAudit ? `${selectedAudit.id} • ${selectedAudit.timestamp}` : ''}
        badgeLabel="IMMUTABLE AUDIT RECORD"
        badgeType="ACTIVE"
        summaryCards={[
          { label: 'Jenis Tindakan', value: selectedAudit?.actionType || '-' },
          { label: 'User Pengakses', value: selectedAudit?.userName || '-' },
          { label: 'Role Hak Akses', value: selectedAudit?.userRole || '-' }
        ]}
        metadata={[
          { label: 'Audit Record ID', value: selectedAudit?.id, mono: true, highlight: true },
          { label: 'Waktu Eksekusi System', value: selectedAudit?.timestamp, mono: true },
          { label: 'Dokumen Target ID', value: selectedAudit?.targetEntity, mono: true },
          { label: 'Rincian Perubahan', value: selectedAudit?.details }
        ]}
        footerNotes="Catatan Audit Log bersifat permanen, tidak dapat diubah maupun dihapus (compliance SOX/ISO 27001)."
      />
    </div>
  );
};

