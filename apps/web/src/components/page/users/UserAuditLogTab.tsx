'use client';

import React, { useState } from 'react';
import { History, ShieldAlert, CheckCircle2, Lock, UserCheck, Search } from 'lucide-react';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';
import { SearchableSelect } from '@/components/ui/dropdowns/SearchableSelect';

interface UserAuditLogItem {
  id: string;
  timestamp: string;
  operator: string;
  actionType: 'LOGIN_SUCCESS' | 'LOGIN_FAILED' | 'ROLE_CHANGED' | 'PASSWORD_RESET' | 'TENANT_ASSIGNED' | 'ACCOUNT_LOCKED';
  targetUser: string;
  ipAddress: string;
  details: string;
}

export const UserAuditLogTab = () => {
  const [actionFilter, setActionFilter] = useState<string>('ALL');

  const [logs] = useState<UserAuditLogItem[]>([
    {
      id: 'log-u-001',
      timestamp: '2026-07-27 18:00:15',
      operator: 'System Admin (gonzhilaz@gmail.com)',
      actionType: 'LOGIN_SUCCESS',
      targetUser: 'Bayu Yanuar (Super Admin)',
      ipAddress: '180.252.112.44',
      details: 'Autentikasi Super Admin berhasil via credential 2FA Enterprise Session.'
    },
    {
      id: 'log-u-002',
      timestamp: '2026-07-27 16:45:00',
      operator: 'Budi Santoso (Holding Executive)',
      actionType: 'ROLE_CHANGED',
      targetUser: 'Siti Aminah',
      ipAddress: '180.252.98.12',
      details: 'Pengubahan peran unit Resto dari CASHIER menjadi RESTO_MANAGER.'
    },
    {
      id: 'log-u-003',
      timestamp: '2026-07-27 14:20:10',
      operator: 'SECURITY_AUTOMATION',
      actionType: 'LOGIN_FAILED',
      targetUser: 'unknown.hacker@gmail.com',
      ipAddress: '103.44.12.90',
      details: '3x Salah Password berturut-turut. IP otomatis di-blacklist sementara (Rate Limit).'
    },
    {
      id: 'log-u-004',
      timestamp: '2026-07-26 11:10:00',
      operator: 'System Admin (gonzhilaz@gmail.com)',
      actionType: 'TENANT_ASSIGNED',
      targetUser: 'Rudi Hermawan',
      ipAddress: '180.252.112.44',
      details: 'Penugasan akses tenant baru: [HOTEL-01] Grand Royal Hotel & Resort.'
    }
  ]);

  const filteredLogs = logs.filter((item) => {
    if (actionFilter !== 'ALL' && item.actionType !== actionFilter) return false;
    return true;
  });

  const columns: ColumnDef<UserAuditLogItem>[] = [
    {
      key: 'timestamp',
      header: 'Waktu Event',
      className: 'font-mono font-bold text-slate-500',
      render: (l) => l.timestamp
    },
    {
      key: 'operator',
      header: 'Operator System',
      className: 'font-bold text-slate-900 dark:text-white',
      render: (l) => l.operator
    },
    {
      key: 'actionType',
      header: 'Jenis Tindakan',
      align: 'center',
      render: (l) => (
        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border flex items-center justify-center gap-1 ${
          l.actionType === 'LOGIN_SUCCESS' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30' :
          l.actionType === 'LOGIN_FAILED' || l.actionType === 'ACCOUNT_LOCKED' ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30' :
          'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30'
        }`}>
          {l.actionType}
        </span>
      )
    },
    {
      key: 'targetUser',
      header: 'Target User',
      className: 'font-semibold text-slate-700 dark:text-slate-300',
      render: (l) => l.targetUser
    },
    {
      key: 'ipAddress',
      header: 'IP Security',
      align: 'center',
      className: 'font-mono text-slate-400',
      render: (l) => l.ipAddress
    },
    {
      key: 'details',
      header: 'Rincian Log Otorisasi',
      className: 'text-slate-500 text-[11px]',
      render: (l) => l.details
    }
  ];

  return (
    <div className="space-y-4 text-xs">
      <DataTable
        headerTitle={`Log Audit Keamanan Otorisasi User (${filteredLogs.length})`}
        columns={columns}
        data={filteredLogs}
        filterComponent={
          <SearchableSelect
            value={actionFilter}
            onChange={(val) => setActionFilter(val)}
            options={[
              { id: 'ALL', label: 'Semua Event Audit' },
              { id: 'LOGIN_SUCCESS', label: 'Login Berhasil' },
              { id: 'LOGIN_FAILED', label: 'Gagal Password' },
              { id: 'ROLE_CHANGED', label: 'Pengubahan Role' },
              { id: 'TENANT_ASSIGNED', label: 'Penugasan Tenant' }
            ]}
            className="w-52"
          />
        }
        keyExtractor={(l) => l.id}
      />
    </div>
  );
};
